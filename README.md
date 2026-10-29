<div align="center">
  <img src="src/assets/images/office-template-platform-banner.png" alt="Office Template Platform — Document and Presentation Template Management" width="1200" height="675" />

  <h1>Office Template Web</h1>

  <p><strong>A focused workspace for discovering document and presentation templates.</strong></p>

  <p>
    <img alt="React 19" src="https://img.shields.io/badge/React-19-149ECA?logo=react&amp;logoColor=white" />
    <img alt="TypeScript 5" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&amp;logoColor=white" />
    <img alt="Vite 8" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&amp;logoColor=white" />
    <img alt="Tailwind CSS 4" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&amp;logoColor=white" />
    <img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn%2Fui-configured-111827?logo=shadcnui&amp;logoColor=white" />
    <img alt="Redux Toolkit 2" src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&amp;logoColor=white" />
    <img alt="React Hook Form 7" src="https://img.shields.io/badge/React_Hook_Form-7-EC5990?logo=reacthookform&amp;logoColor=white" />
    <img alt="Zod 4" src="https://img.shields.io/badge/Zod-4-3E67B1?logo=zod&amp;logoColor=white" />
    <img alt="Sonner toast notifications" src="https://img.shields.io/badge/Toast-Sonner-111827" />
  </p>
</div>

## Overview

Office Template Web is the React frontend for a platform with two separate template libraries:

- **Document templates** — `/document-templates`
- **Presentation templates** — `/presentation-templates`

The current application provides product navigation, shared page layouts, route-level code splitting, a not-found page, and reusable UI foundations. The library screens are presentation-ready shells; template data, search, filtering, preview, and API workflows remain to be implemented.

## Getting started

### Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- npm

### Install and run

```bash
cd web
npm install
npm run dev
```

Vite serves the frontend at `http://localhost:3000`.

### Available commands

| Command              | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start the Vite development server        |
| `npm run type-check` | Check TypeScript types                   |
| `npm run lint`       | Run ESLint                               |
| `npm run build`      | Type-check and create a production build |
| `npm run preview`    | Preview the production build locally     |

## Technology

| Area                   | Technology                                  | Role                                                     |
| ---------------------- | ------------------------------------------- | -------------------------------------------------------- |
| UI                     | React 19, TypeScript 5                      | Component-based application with typed contracts         |
| Build and routing      | Vite 8, React Router 7                      | Development server, route modules, and lazy-loaded pages |
| Styling and primitives | Tailwind CSS 4, shadcn/ui, Radix UI         | Utility styling and accessible reusable components       |
| Global client state    | Redux Toolkit, React Redux                  | Shared state for workflows that span routes              |
| Forms and validation   | React Hook Form, Zod, `@hookform/resolvers` | Typed form state and schema-driven validation            |
| Notifications          | Sonner                                      | Application-wide toast notifications                     |
| Code quality           | ESLint, Prettier                            | Linting and consistent formatting                        |

The dependencies and base integrations for this stack are installed. The Redux store and global notification host are wired into the application. Form libraries are ready for feature forms; no placeholder form has been added while the product workflows are still being defined.

## Application structure

```text
web/
├── .env.example                      # Planned VITE_API_BASE_URL
├── public/
│   └── images/
│       └── office-template-logo.png
├── src/
│   ├── assets/
│   │   └── office-template-platform-banner.png
│   ├── components/
│   │   └── ui/                         # shadcn/ui primitives
│   │       ├── button.tsx
│   │       └── sonner.tsx
│   ├── layouts/
│   │   └── product-shell/ui/           # Shared navigation and page shell
│   ├── pages/                          # Route screens grouped by domain/workflow
│   │   ├── document-template-library/catalog/ui/
│   │   ├── home/ui/
│   │   ├── presentation-template-library/catalog/ui/
│   │   └── system/not-found/ui/
│   ├── providers/
│   │   ├── app-providers.tsx            # Redux Provider and global Toaster
│   │   └── types/
│   ├── routes/
│   │   ├── modules/                     # Product route groups
│   │   └── router.tsx                   # Router composition
│   ├── shared/
│   │   ├── config/                      # Route paths and stable app config
│   │   └── lib/                         # Shared technical utilities
│   ├── store/
│   │   ├── hooks.ts                     # Typed Redux hooks
│   │   └── store.ts                     # Redux Toolkit store
│   ├── styles/
│   │   └── globals.css                  # Tailwind entry, theme tokens, global styles
│   └── main.tsx                         # React entry point
├── components.json                     # shadcn/ui configuration
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Organization principles

- `routes` owns URL definitions and connects routes to layouts and pages. Route modules use lazy loading so each screen can be split into its own bundle.
- `pages` groups screens by product domain and workflow. A large number of templates should be represented as data and dynamic route parameters, not one source file per record.
- `layouts` contains shared application shells; `components/ui` contains reusable shadcn/ui primitives.
- `src/assets` holds images imported by frontend code; `public` holds assets served from a stable URL, such as the site logo.
- `store` is reserved for state shared across workflows. A feature should own its slice when that workflow is implemented; transient input state stays local to the relevant component or form.
- Form schemas and form types belong to their owning feature. Use React Hook Form with the Zod resolver for form state and validation.
- Import `toast` from `sonner` in a feature action and use the single global Toaster mounted by `AppProviders`.
- `styles/globals.css` is the Tailwind CSS entry point and the home for global tokens. Feature-specific styles should stay close to the feature where practical.

## Routes

| Path                      | Purpose                       | Current state                                          |
| ------------------------- | ----------------------------- | ------------------------------------------------------ |
| `/`                       | Choose a template library     | Home screen and product links are available            |
| `/document-templates`     | Browse document templates     | Library page shell is available; data is not connected |
| `/presentation-templates` | Browse presentation templates | Library page shell is available; data is not connected |
| Any unmatched path        | Handle invalid routes         | Not-found page is available                            |

## API integration

The frontend is not yet connected to the backend. `.env.example` documents the planned `VITE_API_BASE_URL`; the current pages do not send API requests yet. When API workflows are added, keep request and response contracts in the owning feature's service boundary and keep network calls out of presentational components.

## Adding shadcn/ui components

Use the installed CLI from the `web` directory:

```bash
npx shadcn add <component>
```

Review each generated component against the existing design tokens and primitives before using it in a page.
