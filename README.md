# 📘 Documentation
### Version 1.01
- Базовая Docker-сборка: PHP-FPM, Nginx, MySQL, phpMyAdmin, Node.js

---

# 🚀 PHP Questions Generator Project

Мини-фреймворк для автоматической генерации **вопросов**, **ответов**, **баз данных** и **классов**.  
Все процессы автоматизированы с помощью `Makefile` и Docker-контейнеров.

---

## 📂 Структура проекта
```
php/
│── src/
│   ├── questions/   # вопросы (question-n.php)
│   ├── answers/     # ответы (answer-n.phps)
│   ├── database/    # базы (data_base-n.php)
│   ├── classes/     # классы (Test.php и др.)
│   └── helpers/     # вспомогательные функции
│
│── public/
│   └── index.php    # главный файл
│
│── Makefile         # автоматизация
│── docker-compose.yml # окружение
```

---

## 🔹 Основные команды `make`

### 1. Создать вопрос
```bash

make question N=15
```
Создаст:
- `src/questions/question-15.php`
- `src/answers/answer-15.phps`
- `src/database/data_base-15.php`

И обновит:
- `src/helpers/helpers.php`
- `public/index.php` (подключит последний вопрос и базу)

---

### 2. Создать класс
```bash

make class NAME=Test
```
Создаст:
- `src/classes/Test.php`

И обновит:
- `public/index.php` (добавит комментарий `// класс Test готов к использованию!`)
---


## 🐳 Docker команды

| Command                                           | Description                         |
|---------------------------------------------------|-------------------------------------|
| `docker compose up -d`                            | Запуск контейнеров                  |
| `docker-compose up -d --build`                    | Пересобрать и запустить контейнеры  |
| `docker compose down`                             | Остановить и удалить контейнеры     |
| `docker stop $(docker ps -q)`                     | Остановить все контейнеры           |
| `docker stop $(docker ps -aq) && docker system prune -af --volumes` | Полная очистка Docker               |
| `docker system prune -a --volumes -f`             | Очистить неиспользуемые ресурсы     |
| `docker exec -it <container_name> bash`           | Войти в контейнер                   |

---

## 🖥️ Docker service (Linux systemctl)

| Command                                | Description                          |
|----------------------------------------|--------------------------------------|
| `sudo systemctl status docker`         | Проверить статус Docker              |
| `sudo systemctl start docker`          | Запустить Docker                     |
| `sudo systemctl stop docker`           | Остановить Docker                    |
| `sudo systemctl stop docker.socket`    | Остановить Docker socket             |

---

## 🔧 PhpStorm настройка

Позволяет искать переменные вне текущего файла:

1. File → Settings (или PHPStorm → Preferences на macOS).
2. Editor → Inspections.
3. В PHP-разделе найти **Undefined symbols**.
4. Развернуть и выбрать **Undefined variable**.
5. Включить опцию **Search for variables definition outside the current file**.
6. Apply → OK.

---
