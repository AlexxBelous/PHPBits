# PHP Docker Template

Готовая сборка для разработки на PHP 8.2 с поддержкой Nginx, MySQL, phpMyAdmin, BrowserSync и генератора файлов вопросов/ответов.

## 🚀 Запуск проекта

```bash
# 1. Собрать и запустить контейнеры
docker compose up -d

# 2. Установить зависимости
composer install
```
----
```
php/
├─ public/               # index.php, assets, templates
│   ├─ assets/
│   │   ├─ css/style.css
│   │   ├─ js/global.js
│   │   └─ img/
│   └─ templates/
│       ├─ header.php
│       ├─ footer.php
│       └─ helpers.php
├─ src/
│   ├─ questions/        # question-N.php
│   ├─ database/         # data_base-N.php
│   └─ answers/          # answer-N.phps
├─ generator.php         # генератор файлов
└─ composer.json

```
----
```bash

composer make:question 1 # (кроссплатформенно)Генератор создаёт связку файлов
make question 4 # (Linux/macOS) Генератор создаёт связку файлов
docker compose down    # Остановить контейнеры
docker compose exec php bash   # Консоль внутри контейнера PHP

```
----
# Container
| Command                               | Description                                                |
|---------------------------------------|------------------------------------------------------------|
| **Start Containers**                  | `docker compose up -d`                                     |
| **Stop All Containers**               | `docker stop $(docker ps -q)`                              |
| **Stop and Remove Containers**        | `docker compose down`                                      |
| **Grant 777 Permissions**             | `sudo chmod -R 777 src/`                                   |
| **Enter MySQL Container**             | `docker exec -it <container_name> bash`                    |
| **Rebuild and Start Containers**      | `docker-compose up -d --build`                             |
| **Remove Unused Resources**           | `docker system prune -a --volumes -f`                      |
| **Stop and Clean Docker**             | `docker stop $(docker ps -aq) && docker system prune -af --volumes` |



#  Docker Command List


| Command                                           | Description                         |
|---------------------------------------------------|-------------------------------------|
| `sudo systemctl status docker`                    | Check the status of Docker          |
| `sudo systemctl start docker`                     | Start Docker                        |
| `sudo systemctl stop docker`                      | Stop Docker                         |
| `sudo systemctl stop docker.socket`               | Stop the Docker socket              |


# BrowserSync Command List

| Command                               | Description                                                                 |
|---------------------------------------|-----------------------------------------------------------------------------|
| **Start BrowserSync**                 | `npm run browsersync` — запускает BrowserSync с настройками из `package.json` |
| **Stop BrowserSync**                  | `docker stop browsersync` — останавливает контейнер BrowserSync             |
| **Restart BrowserSync**               | `docker restart browsersync` — перезапускает сервис BrowserSync             |
| **View BrowserSync Logs**             | `docker logs -f browsersync` — показывает логи работы BrowserSync           |
| **Access Browser with LiveReload**    | Открыть http://localhost:3000                                               |
| **Access BrowserSync Dashboard**      | Открыть http://localhost:3001                                               |



# PhpStorm setup
### allows searching for variables outside the current file
| Step | Action                                                                                          |
|------|-------------------------------------------------------------------------------------------------|
| 1    | Go to File -> Settings (or PHPStorm -> Preferences on macOS).                                   |
| 2    | In the settings menu, select Editor -> Inspections.                                             |
| 3    | In the PHP section, find Undefined symbols and expand it.                                       |
| 4    | Select Undefined variable.                                                                      |
| 5    | Check the box Search for variables definition outside the current file.                         |
| 6    | Click Apply, then OK to save the changes.                                                       |


