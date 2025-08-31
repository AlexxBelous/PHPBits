<?php
class User
{
    public int $id;
    public string $name;
    public string $email;

    public function __construct(array $data)
    {
        $this->id = $data['id'];
        $this->name = $data['name'];
        $this->email = $data['email'];
    }

    // Метод для очистки данных
    public function clean(): self
    {
        $this->name = ucfirst(strtolower(trim($this->name)));
        $this->email = strtolower(trim($this->email));
        return $this; // возвращаем объект для цепочек
    }

    public function getData(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
        ];
    }
}

1. Преобразуем массив массивов в массив объектов User
$users = array_map(fn($data) => new User($data), $rawUsers);

2. Очистим все объекты с помощью array_map и метода clean()
$users = array_map(fn(User $user) => $user->clean(), $users);

3. Получаем массив массивов для вывода
$cleanUsers = array_map(fn(User $user) => $user->getData(), $users);
