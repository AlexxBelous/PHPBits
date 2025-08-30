const fs = require("fs");
const path = require("path");

// пути
const ROOT = path.resolve(__dirname, "../..");
const SRC = path.join(ROOT, "src");
const PUBLIC = path.join(ROOT, "public");

const questionsDir = path.join(SRC, "questions");
const answersDir = path.join(SRC, "answers");
const databaseDir = path.join(SRC, "database");
const helpersFile = path.join(SRC, "helpers", "helpers.php");
const indexFile = path.join(PUBLIC, "index.php");
const classesDir = path.join(SRC, "classes");

// получаем номер из аргументов
const n = process.argv[2];
if (!n) {
    console.error("❌ Укажи номер! Например: node generate.js 15");
    process.exit(1);
}

// ---------------- Создание файлов ---------------- //
function createFile(filePath, content = "") {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log("✅ создан:", filePath);
    } else {
        console.log("⚠️ файл уже существует:", filePath);
    }
}

createFile(path.join(questionsDir, `question-${n}.php`), `<?php\n// question-${n}\n`);
createFile(path.join(answersDir, `answer-${n}.phps`), `<?php\n// answer-${n}\n`);
createFile(path.join(databaseDir, `data_base-${n}.php`), `<?php\n// database-${n}\n`);

// ---------------- Обновление helpers.php ---------------- //
let helpers = fs.readFileSync(helpersFile, "utf8");
helpers = helpers.replace(/show_answer\('answer-\d+\.phps'\)/, `show_answer('answer-${n}.phps')`);
fs.writeFileSync(helpersFile, helpers, "utf8");
console.log("✏️ обновлен helpers.php");

// ---------------- Обновление index.php ---------------- //
let index = fs.readFileSync(indexFile, "utf8");
index = index.replace(/include_once .*questions\/question-\d+\.php";/, `include_once APP_PATH . "/src/questions/question-${n}.php";`);
index = index.replace(/require .*database\/data_base-\d+\.php";/, `\$data = require APP_PATH . "/src/database/data_base-${n}.php";`);

// проверяем последний класс
let lastClassComment = "";
if (fs.existsSync(classesDir)) {
    const files = fs.readdirSync(classesDir).filter(f => f.endsWith(".php"));
    if (files.length > 0) {
        const lastFile = files
            .map(f => ({ file: f, time: fs.statSync(path.join(classesDir, f)).mtime }))
            .sort((a, b) => b.time - a.time)[0].file;
        const className = path.basename(lastFile, ".php");
        lastClassComment = `// класс ${className} готов к использованию!`;
    }
}

// если комментарий уже есть → обновляем
if (/\/\/ класс .* готов к использованию!/.test(index)) {
    index = index.replace(/\/\/ класс .* готов к использованию!/, lastClassComment);
} else {
    index += `\n${lastClassComment}\n`;
}

fs.writeFileSync(indexFile, index, "utf8");
console.log("✏️ обновлен index.php");
