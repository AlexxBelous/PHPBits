<?php

$cleanUsers = array_map(function($user) {
    return [
        'id' => $user['id'],
        'name' => ucfirst(strtolower(trim($user['name']))),
        'email' => strtolower(trim($user['email']))
    ];
}, $users);

trim() — убирает пробелы в начале и конце строки.
strtolower() — приводит строку к нижнему регистру.
ucfirst() — делает первую букву заглавной (для имени).
array_map() — проходит по каждому элементу массива $users и возвращает новый массив с обработанными данными.