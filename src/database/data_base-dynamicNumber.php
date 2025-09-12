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