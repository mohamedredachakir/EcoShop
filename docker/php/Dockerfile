FROM php:8.4-fpm

# Dépendances système
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Extensions PHP
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pgsql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd

# Redis extension
RUN pecl install redis \
    && docker-php-ext-enable redis

# Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Créer user non-root avec le même UID que l'hôte (évite les problèmes de permissions)
ARG UID=1000
ARG GID=1000

RUN groupadd -g ${GID} appgroup 2>/dev/null || true \
    && useradd -u ${UID} -g ${GID} -m -s /bin/bash appuser 2>/dev/null || true

# Répertoire de travail
WORKDIR /var/www/backend

# Donner les droits au user
RUN chown -R appuser:appgroup /var/www

USER appuser
