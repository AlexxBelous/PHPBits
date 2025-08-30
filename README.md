# Documentation
### Version 1.00
- Базовая Docker-сборка: PHP-FPM, Nginx, MySQL, phpMyAdmin, Node.js
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
----

# Команды для работы с фреймворком.

#### make question N=1 : создаются question-1.php, data_base-1.php, answer-1.phps;
#### make class NAME=Test : создается класс в папке classes + создается комментарий в файле index.php

----


#  Docker Command List


| Command                                           | Description                         |
|---------------------------------------------------|-------------------------------------|
| `sudo systemctl status docker`                    | Check the status of Docker          |
| `sudo systemctl start docker`                     | Start Docker                        |
| `sudo systemctl stop docker`                      | Stop Docker                         |
| `sudo systemctl stop docker.socket`               | Stop the Docker socket              |



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


