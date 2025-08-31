<?php

$parsedUrls = array_map(function($url) {
    // Разбираем URL на части
    $parts = parse_url($url);

    // Если есть query, превращаем в массив, иначе пустой массив
    $query = [];
    if (isset($parts['query'])) {
        parse_str($parts['query'], $query);
    }

    return [
        'scheme' => $parts['scheme'] ?? null,
        'host'   => $parts['host'] ?? null,
        'port'   => $parts['port'] ?? null,
        'path'   => $parts['path'] ?? '/',
        'query'  => $query
    ];
}, $urls);

arse_url($url) разбивает URL на части.
parse_str($parts['query'], $query) превращает query-строку в массив.
array_map проходит по каждому URL и возвращает новый массив с нужной структурой.
