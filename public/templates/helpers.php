<?php


if (!function_exists('show_answer')) {
    function show_answer(string $filename): void
    {
        $path = BASE_PATH . "/src/answers/" . $filename;
        if (file_exists($path)) {
            echo "<hr>";
            echo "<h3 class='answer-title'>Скрыть / Показать</h3>";
            highlight_file($path);
            echo "<hr>";
        } else {
            echo "<hr>";
            echo "<p style='color:red;'>Файл $filename не найден.</p>";
        }
    }
}

// Автоматический вывод ответа в конце работы скрипта
register_shutdown_function(function () {
    show_answer('answer-dynamicNumber.phps');
});
