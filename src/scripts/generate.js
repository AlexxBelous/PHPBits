const fs = require("fs");
const path = require("path");

// Пути
const ROOT = path.resolve(__dirname, "../..");
const SRC = path.join(ROOT, "src");
const PUBLIC = path.join(ROOT, "public");

const questionsDir = path.join(SRC, "questions");
const answersDir = path.join(SRC, "answers");
const databaseDir = path.join(SRC, "database");
const helpersFile = path.join(SRC, "helpers", "helpers.php");
const indexFile = path.join(PUBLIC, "index.php");
const classesDir = path.join(SRC, "classes");

// Номер из аргументов
const n = process.argv[2];
if (!n) {
    console.error("❌ Укажи номер! Например: node generate.js 15");
    process.exit(1);
}

// ---------- Утилиты ----------
function createFile(filePath, content = "") {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log("✅ создан:", filePath);
    } else {
        console.log("⚠️ файл уже существует:", filePath);
    }
}

function getLastNumber() {
    if (!fs.existsSync(questionsDir)) return null;
    const nums = fs
        .readdirSync(questionsDir)
        .map(f => f.match(/^question-(\d+)\.php$/))
        .filter(Boolean)
        .map(m => parseInt(m[1], 10))
        .sort((a, b) => b - a);
    return nums[0] ?? null;
}

// ---------- Создание файлов (если их нет) ----------
createFile(
    path.join(questionsDir, `question-${n}.php`),
    `<?php\n// question-${n}\n?>\n<div class="question-template">\n    <p></p>\n</div>\n`
);
createFile(
    path.join(answersDir, `answer-${n}.phps`),
    `<?php\n// answer-${n}\n`
);
createFile(
    path.join(databaseDir, `data_base-${n}.php`),
    `<?php\n// database-${n}\n`
);

// ---------- Определяем «последний» номер по факту содержимого папки ----------
const lastN = getLastNumber();
if (!lastN) {
    console.error("❌ В папке src/questions нет файлов question-*.php");
    process.exit(1);
}
console.log(`ℹ️ Последний найденный номер: ${lastN}`);

// ---------- Обновление helpers.php ----------
let helpers = fs.readFileSync(helpersFile, "utf8");

// Пытаемся заменить существующий вызов show_answer('answer-*.phps')
const showAnswerRe = /show_answer\('answer-\d+\.phps'\)/g;
if (showAnswerRe.test(helpers)) {
    helpers = helpers.replace(showAnswerRe, `show_answer('answer-${lastN}.phps')`);
} else {
    // Если вызова нет — добавим безопасный shutdown-обработчик в конец
    helpers = helpers.trimEnd() + `

/** Автоматический вывод ответа */
register_shutdown_function(function () {
    show_answer('answer-${lastN}.phps');
});
`;
}
fs.writeFileSync(helpersFile, helpers, "utf8");
console.log(`✏️ helpers.php → answer-${lastN}.phps`);

// ---------- Обновление index.php ----------
let index = fs.readFileSync(indexFile, "utf8");

// Удаляем любые старые строки подключения question-* и data_base-*
index = index.replace(
    /include_once\s+APP_PATH\s*\.\s*["']\/src\/questions\/question-\d+\.php["'];?\s*/g,
    ""
);
index = index.replace(
    /\$data\s*=\s*require\s+APP_PATH\s*\.\s*["']\/src\/database\/data_base-\d+\.php["'];?\s*/g,
    ""
);

// Вставляем актуальные строки после autoload; если якорь не найден — после <?php, иначе в начало
const autoloadRe = /include_once\s+APP_PATH\s*\.\s*["']\/vendor\/autoload\.php["'];?/;
const injectBlock =
    `include_once APP_PATH . "/src/questions/question-${lastN}.php";\n` +
    `$data = require APP_PATH . "/src/database/data_base-${lastN}.php";`;

if (autoloadRe.test(index)) {
    index = index.replace(autoloadRe, m => `${m}\n${injectBlock}`);
} else if (/<\?php/.test(index)) {
    index = index.replace(/<\?php/, m => `${m}\n${injectBlock}\n`);
} else {
    index = `${injectBlock}\n${index}`;
}

fs.writeFileSync(indexFile, index, "utf8");
console.log(`✏️ index.php → question-${lastN}.php + data_base-${lastN}.php`);

// ---------- Комментарий о последнем классе ----------
if (fs.existsSync(classesDir)) {
    const phpClasses = fs.readdirSync(classesDir).filter(f => f.endsWith(".php"));
    if (phpClasses.length) {
        const lastFile = phpClasses
            .map(f => ({ f, t: fs.statSync(path.join(classesDir, f)).mtimeMs }))
            .sort((a, b) => b.t - a.t)[0].f;
        const className = path.basename(lastFile, ".php");
        const comment = `// класс ${className} готов к использованию!`;

        let idx = fs.readFileSync(indexFile, "utf8");
        if (/\/\/ класс .* готов к использованию!/.test(idx)) {
            idx = idx.replace(/\/\/ класс .* готов к использованию!/, comment);
        } else {
            idx = idx.trimEnd() + `\n${comment}\n`;
        }
        fs.writeFileSync(indexFile, idx, "utf8");
        console.log(`✏️ index.php: ${comment}`);
    }
}
