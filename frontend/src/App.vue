<script setup lang="ts">
const highlights = [
  {
    label: "Backend",
    value: "Laravel 13 + Sanctum",
    description: "API ready with PostgreSQL, Redis, and Dockerized PHP-FPM.",
  },
  {
    label: "Frontend",
    value: "Vue 3 + TypeScript",
    description: "Vite dev server with Tailwind, proxying API calls to Nginx.",
  },
  {
    label: "Container",
    value: "Permission-safe",
    description:
      "Non-root PHP container, bind mounts, and isolated node_modules.",
  },
];

const endpoints = [
  { label: "Laravel API", value: "http://localhost:8000" },
  { label: "Vue Frontend", value: "http://localhost:5173" },
  { label: "PostgreSQL", value: "localhost:5432" },
  { label: "Redis", value: "localhost:6379" },
];
</script>

<template>
  <main class="relative isolate overflow-hidden">
    <div
      class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(244,114,182,0.14),_transparent_30%)]"
    ></div>

    <section
      class="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-12"
    >
      <header
        class="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-slate-950/50 px-5 py-4 backdrop-blur-xl"
      >
        <div>
          <p
            class="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300/80"
          >
            Ejoutiya
          </p>
          <h1 class="mt-1 text-lg font-semibold text-white">
            Dockerized Laravel + Vue starter
          </h1>
        </div>
        <div
          class="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200"
        >
          Ready for `docker compose up`
        </div>
      </header>

      <div
        class="grid flex-1 gap-6 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-12"
      >
        <div class="space-y-8">
          <div class="space-y-5">
            <p
              class="inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm text-sky-100"
            >
              Laravel 13 backend, Vue 3 frontend, PostgreSQL, Redis, Nginx,
              PHP-FPM
            </p>
            <div class="space-y-4">
              <h2
                class="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                A clean Docker foundation for a real product, not a demo
                template.
              </h2>
              <p
                class="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg"
              >
                The stack is wired for local development with safe permissions,
                a stateful SPA/API setup, and a frontend that can grow without
                fighting the container layer.
              </p>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-3">
            <article
              v-for="item in highlights"
              :key="item.label"
              class="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl"
            >
              <p
                class="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300/80"
              >
                {{ item.label }}
              </p>
              <h3 class="mt-3 text-lg font-semibold text-white">
                {{ item.value }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-slate-300">
                {{ item.description }}
              </p>
            </article>
          </div>
        </div>

        <aside
          class="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl"
        >
          <div
            class="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6"
          >
            <p class="text-sm font-medium text-slate-300">Runtime endpoints</p>
            <div class="mt-5 grid gap-3">
              <div
                v-for="endpoint in endpoints"
                :key="endpoint.label"
                class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <span class="text-sm text-slate-300">{{ endpoint.label }}</span>
                <span class="text-sm font-medium text-white">{{
                  endpoint.value
                }}</span>
              </div>
            </div>

            <div
              class="mt-6 grid gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100"
            >
              <p class="font-medium">Quick verification</p>
              <p>
                Open the frontend, call `/api/user`, and verify the containers
                are healthy.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>
