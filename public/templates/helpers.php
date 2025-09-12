<?php
// public/templates/helpers.php
// предполагаем, что до подключения этого файла в index.php определён BASE_PATH

if (!function_exists('get_latest_file')) {
    /**
     * Возвращает basename последнего файла по паттерну prefix-*.ext в папке BASE_PATH/src/<dir>
     * Вернёт null если нет.
     */
    function get_latest_file(string $dir, string $prefix, string $ext): ?string
    {
        $pattern = BASE_PATH . "/src/{$dir}/{$prefix}-*.{$ext}";
        $files = glob($pattern);
        if (!$files) return null;

        // отфильтруем loader-ы если вдруг есть
        $files = array_filter($files, function($f) use ($prefix, $ext) {
            return !preg_match('/' . preg_quote($prefix . '-dynamicNumber.' . $ext, '/') . '$/', basename($f));
        });

        if (!$files) return null;

        // найдём максимальный номер в имени
        $numbers = [];
        foreach ($files as $f) {
            if (preg_match('/' . preg_quote($prefix, '/') . '-(\d+)\.' . preg_quote($ext, '/') . '$/', $f, $m)) {
                $numbers[$f] = (int)$m[1];
            }
        }
        if (!$numbers) return null;
        arsort($numbers);
        $keys = array_keys($numbers);
        return basename($keys[0]); // имя файла
    }
}

if (!function_exists('show_answer')) {
    /**
     * show_answer accepts either:
     *  - 'answer-dynamicNumber.phps' (special token) -> will display latest answer file
     *  - or any specific filename inside src/answers
     */
    function show_answer(string $filename): void
    {
        if ($filename === 'answer-dynamicNumber.phps') {
            $latest = get_latest_file('answers', 'answer', 'phps');
            if ($latest === null) {
                echo "<hr><p style='color:red;'>Ответов не найдено.</p>";
                return;
            }
            $filename = $latest;
        }

        $path = BASE_PATH . "/src/answers/" . $filename;
        if (file_exists($path)) {

            echo "<h3 class='answer-title'>Ответ смотреть ниже</h3>";
            // highlight_file безопасно покажет исходник (.phps)
            highlight_file($path);
            echo "<hr>";
        } else {
            echo "<hr>";
            echo "<p style='color:red;'>Файл $filename не найден.</p>";
        }
    }
}

// register_shutdown_function должен оставаться с тем же видом, как ты просил:
register_shutdown_function(function () {
    show_answer('answer-dynamicNumber.phps');
});
