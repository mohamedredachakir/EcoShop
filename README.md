# EcoShop

EcoShop is a full-stack e-commerce application built with a Laravel API backend and a React frontend.

## Stack

- Backend: Laravel 12, PHP 8.4, Sanctum, PostgreSQL, Redis
- Frontend: React 19, Vite, React Router, Axios
- Infra: Docker Compose (Nginx + PHP-FPM + PostgreSQL + Redis + Node)

## Features

- User registration, login, logout, and profile update
- Product and category listing
- Cart management (add, update, remove)
- Order placement and order history
- Admin routes for product/category management and order updates

## Project Structure

```text
EcoShop/
	backend/      # Laravel API
	frontend/     # React app (Vite)
	docker/       # Nginx + PHP container configuration
	docker-compose.yml
```

## Prerequisites

- Docker + Docker Compose
- Node.js 20+ and npm (only needed for local non-Docker frontend development)
- PHP 8.4 + Composer (only needed for local non-Docker backend development)

## Quick Start (Docker Recommended)

1. Clone the repository and open it in VS Code.
2. Create backend environment file:

```bash
cp backend/.env.example backend/.env
```

3. Configure `backend/.env` for Docker services:

```env
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=ejoutiya
DB_USERNAME=ejoutiya
DB_PASSWORD=secret

CACHE_STORE=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=database

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=null
```

4. Start containers:

```bash
docker compose up -d --build
```

5. Install backend dependencies and initialize Laravel:

```bash
docker compose exec php composer install
docker compose exec php php artisan key:generate
docker compose exec php php artisan migrate --seed
```

6. Frontend starts automatically in the `frontend` service (`npm run dev -- --host 0.0.0.0`).

## Access URLs

- Frontend: `http://localhost:5173`
- Backend API (through Nginx): `http://localhost:8000/api`

## Frontend Environment

The frontend API base URL is read from `VITE_API_BASE_URL` and defaults to:

```text
http://localhost:8000/api
```

To override, create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## API Overview

Main routes from `backend/routes/api.php`:

- Public:
	- `POST /api/register`
	- `POST /api/login`
	- `GET /api/categories`
	- `GET /api/categories/{id}`
	- `GET /api/products`
	- `GET /api/products/{id}`
- Authenticated (`auth:sanctum`):
	- `GET /api/user`
	- `PUT /api/user`
	- `POST /api/logout`
	- `GET|POST|PUT|DELETE /api/cart`
	- `GET /api/orders`
	- `POST /api/orders`
	- `GET /api/orders/{id}`
- Admin (`admin` middleware):
	- `GET /api/users`
	- CRUD write routes for categories/products
	- `PUT /api/orders/{id}`

## Useful Commands

### Docker

```bash
docker compose up -d
docker compose down
docker compose logs -f php
docker compose logs -f nginx
```

### Laravel (inside container)

```bash
docker compose exec php php artisan migrate
docker compose exec php php artisan db:seed
docker compose exec php php artisan test
docker compose exec php php artisan optimize:clear
```

### Frontend (inside container)

```bash
docker compose exec frontend npm run build
docker compose exec frontend npm run lint
```

## Local Development (Without Docker)

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Troubleshooting

- If API requests fail from frontend, verify `VITE_API_BASE_URL` in `frontend/.env`.
- If database connection fails in Docker, verify `DB_HOST=postgres` and matching credentials in `backend/.env`.
- If auth appears invalid, clear stale token in browser local storage and log in again.
