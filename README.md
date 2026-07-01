# 🚀 Nuxt Nitro App

[![Nuxt](https://img.shields.io/badge/Nuxt-4.4.8-00DC82?logo=nuxt)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-3.5.39-4FC08D?logo=vue.js)](https://vuejs.org)
[![Nitro](https://img.shields.io/badge/Nitro-2.13.4-00DC82)](https://nitro.unjs.io)
[![Nuxt UI](https://img.shields.io/badge/Nuxt_UI-4.x-00DC82)](https://ui.nuxt.com)
[![Supabase](https://img.shields.io/badge/Supabase-2.x-3FCF8E?logo=supabase)](https://supabase.com)
[![Node](https://img.shields.io/badge/Node-24.18.0-339933?logo=node.js)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

A modern, full-stack **Nuxt 4** application built with the **Nitro** engine, **Nuxt UI** components, and **Supabase** backend. Features hybrid rendering, file-based routing, auto-imports, a full CRUD blog API, contact form with validation, and a powerful server layer.

## ✨ Features

- **Hybrid Rendering** — Mix SSR, SSG, and static generation
- **File-based Routing** — Automatic route generation from `app/pages/`
- **Nitro API Endpoints** — Built-in server API with blog CRUD, contact form, and health checks
- **Supabase Integration** — PostgreSQL database with Row Level Security for blog posts and contact messages
- **Nuxt UI v4** — Beautiful, accessible UI components with Tailwind CSS v4
- **Zod Validation** — Type-safe request validation on both client and server
- **Blog Engine** — Full CRUD operations with Supabase, search, and fallback static data
- **Contact Form** — Server-validated submissions stored in Supabase
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
| [Supabase](https://supabase.com) | 2.x | Database & auth |
| [Zod](https://zod.dev) | 4.x | Schema validation |
| [Node.js](https://nodejs.org) | 24.18.0 | Runtime |
| [Vitest](https://vitest.dev) | 4.x | Unit testing |

## 📁 Project Structure

```
nuxt-nitro-app/
├── app/                               # Application source
│   ├── app.vue                        # Root layout with navigation and footer
│   ├── assets/
│   │   └── css/
│   │       └── main.css               # Tailwind + Nuxt UI imports
│   └── pages/
│       ├── index.vue                  # Home page with hero, features, API demo
│       ├── about.vue                  # About page with tech stack and features
│       ├── blog.vue                   # Blog listing with Supabase API + fallback data
│       └── contact.vue                # Contact form with Zod validation
├── components/
│   ├── AppFooter.vue                  # Footer with links
│   ├── FeatureCard.vue                # Reusable feature card component
│   └── NavBar.vue                     # Navigation bar with active state
├── composables/
│   └── useSupabase.ts                 # Client-side Supabase composable
├── server/
│   ├── api/
│   │   ├── hello.ts                   # GET /api/hello - Greeting endpoint
│   │   ├── ping.ts                    # GET /api/ping - Health check
│   │   ├── contact.post.ts            # POST /api/contact - Submit contact form
│   │   └── blog/
│   │       ├── index.get.ts           # GET /api/blog - List published posts
│   │       ├── index.post.ts          # POST /api/blog - Create a post
│   │       ├── [slug].get.ts          # GET /api/blog/:slug - Get post by slug
│   │       ├── [id].put.ts            # PUT /api/blog/:id - Update a post
│   │       └── [id].delete.ts         # DELETE /api/blog/:id - Delete a post
│   ├── utils/
│   │   └── supabase.ts               # Server-side Supabase client utility
│   └── database/
│       └── schema.sql                 # Full Supabase schema with RLS policies
├── test/
│   └── unit/
│       ├── app.test.ts                # App configuration tests
│       ├── blog.test.ts               # Blog API format and data tests
│       └── contact.test.ts            # Contact form validation tests
├── supabase/
│   └── migrations/
│       └── 20260701000000_initial_schema.sql  # Supabase migration
├── nuxt.config.ts                     # Nuxt configuration with runtime config
├── vitest.config.ts                   # Vitest test runner configuration
├── package.json                       # Project dependencies and scripts
├── tsconfig.json                      # TypeScript configuration
├── .env.example                       # Environment variable template
└── vercel.json                        # Vercel deployment configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 22.x or later (recommended: 24.x)
- **npm**, **pnpm**, **yarn**, or **bun**
- **Supabase** account (for database features)

### Installation

```bash
# Clone the repository
git clone https://github.com/GeminiDragon66/nuxt-nitro-app.git
cd nuxt-nitro-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials:
#   NUXT_SUPABASE_URL=<your-supabase-url>
#   NUXT_SUPABASE_ANON_KEY=<your-supabase-anon-key>
#   NUXT_SUPABASE_SERVICE_KEY=<your-supabase-service-role-key>

# Start development server
npm run dev
```

The application will be available at **http://localhost:3000**.

### Database Setup

Run the SQL from `server/database/schema.sql` in your Supabase SQL Editor to create the required tables (`blog_posts`, `contact_messages`) and set up Row Level Security policies.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run generate` | Generate static site |
| `npm run preview` | Preview production build |
| `npm run test` | Run unit tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:ui` | Run tests with Vitest UI |

## 🌐 Pages

| Route | Description |
|---|---|
| `/` | Home page — hero section, features grid, Nitro API demo |
| `/blog` | Blog listing — fetches from Supabase API, falls back to static data |
| `/contact` | Contact form — Zod-validated form submitted to Supabase |
| `/about` | About page — tech stack, features, and useful links |

## 🌐 API Endpoints

### Blog

| Endpoint | Method | Description |
|---|---|---|
| `/api/blog` | GET | List all published blog posts |
| `/api/blog` | POST | Create a new blog post |
| `/api/blog/:slug` | GET | Get a single blog post by slug |
| `/api/blog/:id` | PUT | Update a blog post by ID |
| `/api/blog/:id` | DELETE | Delete a blog post by ID |

### System

| Endpoint | Method | Description |
|---|---|---|
| `/api/hello` | GET | Returns a greeting with server info |
| `/api/ping` | GET | Health check with uptime and Node version |
| `/api/contact` | POST | Submit a contact form message |

### Example Responses

**GET /api/hello**
```json
{
  "message": "Hello from Nuxt Nitro!",
  "timestamp": "2026-06-30T16:00:00.000Z",
  "framework": "Nuxt 4.4.8",
  "engine": "Nitro 2.13.4"
}
```

**GET /api/ping**
```json
{
  "status": "ok",
  "uptime": 123.456,
  "nodeVersion": "v24.18.0",
  "timestamp": "2026-06-30T16:00:00.000Z"
}
```

**GET /api/blog**
```json
{
  "posts": [
    {
      "id": 1,
      "title": "Getting Started with Nuxt 4",
      "slug": "getting-started-nuxt-4",
      "excerpt": "Learn how to set up your first Nuxt 4 project.",
      "category": "Getting Started",
      "categoryColor": "green",
      "author": "Alex",
      "readTime": 8,
      "date": "Jun 28, 2026"
    }
  ]
}
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with Vitest UI
npm run test:ui
```

The test suite covers:

- **Blog**: API response format, slug uniqueness, data integrity
- **Contact**: Zod schema validation (valid data, empty fields, invalid email)
- **App**: Basic configuration and environment checks

## 🧑‍💻 Development

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

### Add a New Component

Create a new `.vue` file in `components/`. Nuxt will auto-import it:

```vue
<template>
  <div class="my-component">
    <slot />
  </div>
</template>
```

## 📦 Deployment

This project is configured for **Vercel** deployment via the `vercel.json` file. Nuxt 4 applications can also be deployed to:

- **Node.js servers** — Use `npm run build && node .output/server/index.mjs`
- **Serverless** — Vercel, Netlify, Cloudflare Pages, AWS Lambda
- **Docker** — Build and run the `.output/` directory
- **Edge** — Deploy to edge networks with Nitro presets

## 🗄️ Database Schema

The application uses **Supabase** (PostgreSQL) with the following tables:

- **`blog_posts`** — id, title, slug (unique), excerpt, content, category, category_color, author, read_time, published, created_at, updated_at, search_vector (full-text search)
- **`contact_messages`** — id, name, email, subject, message, is_read, created_at

Row Level Security (RLS) is enabled:
- Public can **read** published blog posts and **submit** contact messages
- Service role can **manage** all data

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ using <a href="https://nuxt.com">Nuxt 4</a></p>
