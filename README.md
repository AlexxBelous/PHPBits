# Documentation

## Table of Contents
- [Version History](#version-history)
- [Container Commands](#container-commands)
- [Docker Command List](#docker-command-list)
- [BrowserSync Commands](#browsersync-commands)
- [PhpStorm Setup](#phpstorm-setup)

---

## Version History

### Version 2.3
- Базовая Docker-сборка: PHP-FPM, Nginx, MySQL, phpMyAdmin.

### Version 2.4
- В `docker-compose.yml` добавлен сервис **BrowserSync** (на базе Node.js).
- Настроено проксирование через `nginx:80` и автоматическая перезагрузка браузера при изменениях файлов PHP, CSS, JS.
- Проброшены порты:
    - `3000` — сайт с автообновлением
    - `3001` — панель управления BrowserSync

#### Как пользоваться
- Основной сайт: [http://localhost](http://localhost)
- Версия с автообновлением: [http://localhost:3000](http://localhost:3000)
- Панель управления: [http://localhost:3001](http://localhost:3001)

#### О сниппете
> ⚠️ Сниппет нужен только если страница **не содержит HTML-разметку** (например, чистый PHP-вывод или JSON).  
> В большинстве случаев он не нужен, т.к. BrowserSync автоматически внедряет клиентский код.  
> При необходимости актуальный вариант сниппета можно найти в [официальной документации BrowserSync](https://browsersync.io/docs#the-script-tag).

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


