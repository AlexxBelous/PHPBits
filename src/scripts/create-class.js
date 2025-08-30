const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const SRC = path.join(ROOT, "src");
const classesDir = path.join(SRC, "classes");
const indexFile = path.join(ROOT, "public", "index.php");

const rawName = process.argv[2];
if (!rawName) {
    console.error("❌ Укажи имя класса. Пример: node create-class.js Test");
    process.exit(1);
}
const name = rawName.replace(/[^A-Za-z0-9_]/g, "");
if (!name) {
    console.error("❌ Неверное имя класса.");
    process.exit(1);
}

if (!fs.existsSync(classesDir)) fs.mkdirSync(classesDir, { recursive: true });

const filePath = path.join(classesDir, `${name}.php`);
if (fs.existsSync(filePath)) {
    console.log("⚠️ Файл уже существует:", filePath);
} else {
    const tpl = `<?php

class ${name}
{
    // ...
}
`;
    fs.writeFileSync(filePath, tpl, "utf8");
    console.log("✅ Создан:", filePath);
}

// ---- обновляем комментарий в index.php ----
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
        const anchorRe = /\$data\s*=\s*require\s+APP_PATH\s*\.\s*["']\/src\/database\/data_base-\d+\.php["'];?/;
        if (anchorRe.test(index)) {
            index = index.replace(anchorRe, (m) => `${m}\n\n${newComment}`);
        } else {
            index = index.trimEnd() + `\n\n${newComment}\n`;
        }
    }

    fs.writeFileSync(indexFile, index, "utf8");
    console.log(`✅ В index.php добавлен комментарий: ${newComment}`);
}

updateIndexComment(name);
