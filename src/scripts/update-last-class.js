const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const SRC = path.join(ROOT, "src");
const classesDir = path.join(SRC, "classes");
const indexFile = path.join(ROOT, "public", "index.php");

function getLastClassName() {
    if (!fs.existsSync(classesDir)) return null;
    const files = fs.readdirSync(classesDir).filter(f => f.endsWith(".php"));
    if (files.length === 0) return null;

    const newest = files
        .map(f => ({ f, t: fs.statSync(path.join(classesDir, f)).mtimeMs }))
        .sort((a, b) => b.t - a.t)[0].f;

    return path.basename(newest, ".php");
}

function updateIndexComment(className) {
    if (!fs.existsSync(indexFile)) {
        console.error("index.php не найден:", indexFile);
        process.exit(1);
    }
    let index = fs.readFileSync(indexFile, "utf8");
    const newComment = `// класс ${className} готов к использованию!`;

    if (/\/\/ класс .* готов к использованию!/.test(index)) {
        index = index.replace(/\/\/ класс .* готов к использованию!/, newComment);
    } else {
        // вставим после подключения data_base-n.php, если найдём
        const anchorRe = /\$data\s*=\s*require\s+APP_PATH\s*\.\s*["']\/src\/database\/data_base-\d+\.php["'];?/;
        if (anchorRe.test(index)) {
            index = index.replace(anchorRe, (m) => `${m}\n\n${newComment}`);
        } else {
            // или просто добавим в конец
            index = index.trimEnd() + `\n\n${newComment}\n`;
        }
    }

    fs.writeFileSync(indexFile, index, "utf8");
    console.log(`✅ В index.php добавлен комментарий: ${newComment}`);
}

const last = getLastClassName();
if (!last) {
    console.log("⚠️ В src/classes нет .php файлов — нечего обновлять.");
    process.exit(0);
}
updateIndexComment(last);
