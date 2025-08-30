FROM php:8.2-fpm

# Устанавливаем необходимые пакеты
RUN apt-get update \
    && apt-get install -y libpq-dev git unzip zip vim nano sudo bash-completion \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql

# Устанавливаем Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Устанавливаем Xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Копируем конфиги PHP
COPY conf.d/* $PHP_INI_DIR/conf.d/

# Устанавливаем автодополнение для Git
RUN curl -o /etc/bash_completion.d/git \
    https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash \
    && echo "source /etc/bash_completion.d/git" >> /etc/bash.bashrc

# Создаем пользователя alex с UID и GID 1000
RUN groupadd -g 1000 alex && \
    useradd -u 1000 -g 1000 -s /bin/bash -m alex && \
    usermod -aG sudo alex && \
    echo 'alex:alex' | chpasswd

# Настраиваем Git глобально для пользователя alex
USER alex
RUN git config --global user.name "AxlexxBelous" && \
    git config --global user.email "connectionwithme@gmail.com" && \
    git config --global --add safe.directory /var/www/html

# Настраиваем Git глобально для всех пользователей (root и alex)
USER root
RUN git config --system --add safe.directory /var/www/html