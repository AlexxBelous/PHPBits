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