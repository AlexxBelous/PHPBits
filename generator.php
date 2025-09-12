<?php
// php/generator.php
// Usage:
//  php generator.php 5        -> create question-5, data_base-5, answer-5.phps
//  php generator.php watch    -> watch (polling) folder src/questions и автосоздаёт пары
//  php generator.php help

define('BASE_PATH', __DIR__); // папка php/

function usage() {
    echo "Usage:\n";
    echo "  php generator.php <number>    Create files for given number\n";
    echo "  php generator.php watch       Watch src/questions (poll every 2s) and create pairs\n";
    echo "  php generator.php help\n";
}

function create_for_number(int $n) {
    $paths = [
        'questions' => BASE_PATH . "/src/questions/question-$n.php",
        'database'  => BASE_PATH . "/src/database/data_base-$n.php",
        'answers'   => BASE_PATH . "/src/answers/answer-$n.phps",
    ];

    foreach ($paths as $type => $file) {
        $dir = dirname($file);
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
            echo "mkdir $dir\n";
        }

        if (!file_exists($file)) {
            $content = "";
            if ($type === 'questions') {
                $content = "<!-- Вопрос номер - $n --> \n<div class=\"question-template\">\n    <p></p>\n</div>\n";
            } elseif ($type === 'database') {
                $content = "<?php\n// Данные для вопроса например  №$n \nreturn [\n\n];\n";
            } elseif ($type === 'answers') {
                $content = "<?php\n\n";
            }

            file_put_contents($file, $content);
            echo "Создан $file\n";
        } else {
            echo "Уже существует $file\n";
        }
    }

    create_loaders();
}

function create_loaders() {
    // loader for questions
    $qLoaderPath = BASE_PATH . "/src/questions/question-dynamicNumber.php";
    $qLoaderContent = <<<'PHP'
<?php
// loader: подключает последний question-<N>.php из той же папки
$files = glob(__DIR__ . '/question-*.php');
if ($files) {
    $files = array_filter($files, fn($f) => basename($f) !== 'question-dynamicNumber.php');
    if ($files) {
        $numbers = array_map(function($f){
            preg_match('/(\d+)/', basename($f), $m);
            return $m[1] ?? 0;
        }, $files);
        $maxNum = max($numbers);
        foreach ($files as $f) {
            if (preg_match('/question-' . $maxNum . '\.php$/', $f)) {
                include_once $f;
            }
        }
    }
}
PHP;
    file_put_contents($qLoaderPath, $qLoaderContent);
    echo "Обновлён loader: $qLoaderPath\n";

    // loader for database
    $dbLoaderPath = BASE_PATH . "/src/database/data_base-dynamicNumber.php";
    $dbLoaderContent = <<<'PHP'
<?php
// loader: возвращает содержимое последнего data_base-<N>.php
$files = glob(__DIR__ . '/data_base-*.php');
if ($files) {
    $files = array_filter($files, fn($f) => basename($f) !== 'data_base-dynamicNumber.php');
    if ($files) {
        $numbers = array_map(function($f){
            preg_match('/(\d+)/', basename($f), $m);
            return $m[1] ?? 0;
        }, $files);
        $maxNum = max($numbers);
        foreach ($files as $f) {
            if (preg_match('/data_base-' . $maxNum . '\.php$/', $f)) {
                return require $f;
            }
        }
    }
}
return [];
PHP;
    if (!is_dir(dirname($dbLoaderPath))) mkdir(dirname($dbLoaderPath), 0777, true);
    file_put_contents($dbLoaderPath, $dbLoaderContent);
    echo "Обновлён loader: $dbLoaderPath\n";
}

$cmd = $argv[1] ?? null;

if (!$cmd) {
    usage();
    exit;
}

if ($cmd === 'help') {
    usage();
    exit;
}

if ($cmd === 'watch') {
    echo "Watch mode: polling src/questions for new question-<N>.php ... (Ctrl+C to stop)\n";
    $seen = [];
    while (true) {
        $files = glob(BASE_PATH . '/src/questions/question-*.php');
        foreach ($files as $f) {
            if (basename($f) === 'question-dynamicNumber.php') continue;
            if (!isset($seen[$f])) {
                if (preg_match('/question-(\d+)\.php$/', $f, $m)) {
                    $n = (int)$m[1];
                    echo "Detected question-$n.php -> creating pair files...\n";
                    create_for_number($n);
                    $seen[$f] = true;
                }
            }
        }
        sleep(2);
    }
} elseif (is_numeric($cmd)) {
    $n = (int)$cmd;
    create_for_number($n);
    exit;
} else {
    echo "Unknown command\n";
    usage();
    exit(1);
}
