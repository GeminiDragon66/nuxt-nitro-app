# 🚀 Nuxt Nitro App

[![Nuxt](https://img.shields.io/badge/Nuxt-4.4.8-00DC82?logo=nuxt)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-3.5.39-4FC08D?logo=vue.js)](https://vuejs.org)
[![Nitro](https://img.shields.io/badge/Nitro-2.13.4-00DC82)](https://nitro.unjs.io)
[![Nuxt UI](https://img.shields.io/badge/Nuxt_UI-4.x-00DC82)](https://ui.nuxt.com)
[![Node](https://img.shields.io/badge/Node-24.18.0-339933?logo=node.js)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

A modern, full-stack **Nuxt 4** application built with the **Nitro** engine and **Nuxt UI** components. Features hybrid rendering, file-based routing, auto-imports, and a powerful API layer.

## ✨ Features

- **Hybrid Rendering** — Mix SSR, SSG, and static generation
- **File-based Routing** — Automatic route generation from `app/pages/`
- **Nitro API Endpoints** — Built-in server API at `server/api/`
- **Nuxt UI v4** — Beautiful, accessible UI components with Tailwind CSS
- **Auto-imports** — Components, composables, and utilities auto-imported
- **TypeScript** — First-class TypeScript support with automatic type generation
- **Nuxt DevTools** — Debug with `Shift + Alt + D`
- **Dark Mode** — Sleek dark theme out of the box

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Nuxt](https://nuxt.com) | 4.4.8 | Vue framework |
| [Nitro](https://nitro.unjs.io) | 2.13.4 | Server engine |
| [Vue](https://vuejs.org) | 3.5.39 | UI framework |
| [Vite](https://vitejs.dev) | 7.3.6 | Build tool |
| [Nuxt UI](https://ui.nuxt.com) | 4.x | Component library |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility CSS |
| [Node.js](https://nodejs.org) | 24.18.0 | Runtime |

## 📁 Project Structure

```
nuxt-nitro-app/
├── app/                    # Application source
│   ├── app.vue             # Root layout with navigation
│   ├── assets/
│   │   └── css/
│   │       └── main.css    # Tailwind + Nuxt UI imports
│   ├── pages/
│   │   ├── index.vue       # Home page with hero and features
│   │   └── about.vue       # About page with tech stack
│   └── public/             # Static assets (favicon, robots.txt)
├── server/
│   └── api/
│       ├── hello.ts        # GET /api/hello - Greeting endpoint
│       └── ping.ts         # GET /api/ping - Health check
├── nuxt.config.ts          # Nuxt configuration
├── package.json            # Project dependencies
└── tsconfig.json           # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 22.x or later (recommended: 24.x)
- **npm**, **pnpm**, **yarn**, or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/GeminiDragon66/nuxt-nitro-app.git
cd nuxt-nitro-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at **http://localhost:3000**.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run generate` | Generate static site |
| `npm run preview` | Preview production build |
| `npm run postinstall` | Run Nuxt preparation steps |

## 🌐 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/hello` | GET | Returns a greeting with server info |
| `/api/ping` | GET | Health check with uptime and Node version |

### Example Response

**GET /api/hello**
```json
{
  "message": "Hello from Nuxt Nitro!",
  "timestamp": "2026-06-30T16:00:00.000Z",
  "framework": "Nuxt 4.4.8",
  "engine": "Nitro 2.13.4"
}
```

## 🧪 Development

### Add a New Page

Create a new `.vue` file in `app/pages/`:

```vue
<template>
  <div>
    <h1>New Page</h1>
  </div>
</template>
```

It will be automatically available at `/new-page`.

### Add a New API Endpoint

Create a new `.ts` or `.js` file in `server/api/`:

```typescript
export default defineEventHandler(async (event) => {
  return { data: 'Hello from new API!' }
})
```

It will be available at `/api/new-endpoint`.

## 📦 Deployment

Nuxt 4 applications can be deployed to:

- **Node.js servers** — Use `npm run build && node .output/server/index.mjs`
- **Serverless** — Vercel, Netlify, Cloudflare Pages, AWS Lambda
- **Docker** — Build and run the `.output/` directory
- **Edge** — Deploy to edge networks with Nitro presets

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ using <a href="https://nuxt.com">Nuxt 4</a></p>
