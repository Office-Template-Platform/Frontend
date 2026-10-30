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

The document catalog is connected to the NestJS API for server-side search, category filtering, pagination, preview, and independent DOCX creation. Users can download a copy, edit it in Word or another compatible application, then upload the edited file to save it. The presentation catalog reads the API metadata endpoint; the current backend returns no PPTX templates and has no create/download workflow yet.

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

The frontend expects the API at `http://localhost:3001/api`. Override `VITE_API_BASE_URL` in a local `.env.local` file when the backend uses another address. Start the API and PostgreSQL using the setup instructions in [`../api/README.md`](../api/README.md).

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

RTK Query uses the shared Redux store for request state and cache. The create-document form uses React Hook Form with Zod validation, and Sonner reports API actions through the global Toaster.

## Application structure

```text
web/
├── .env.example                      # Default API base URL
├── public/
│   └── images/
│       └── office-template-logo.png
├── src/
│   ├── assets/
│   │   ├── icons/microsoft-365/       # Word and PowerPoint SVG marks
│   │   └── images/                    # Product banner
│   ├── components/
│   │   └── ui/                        # shadcn/ui primitives
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── skeleton.tsx
│   │       └── sonner.tsx
│   ├── layouts/
│   │   ├── empty-shell/
│   │   └── product-shell/             # Shared navigation and library shell
│   ├── config/
│   │   └── api.config.ts              # Single source for API base path and URL
│   ├── pages/                         # Route screens grouped by domain/workflow
│   │   ├── document-template-library/catalog/
│   │   │   ├── components/
│   │   │   │   ├── catalog/            # Heading, filters, pagination, loading and error
│   │   │   │   ├── create-document/    # Create and update a user's DOCX copy
│   │   │   │   ├── empty-state/        # Empty catalog state and illustration
│   │   │   │   └── template/           # Template card and preview dialog
│   │   │   ├── hooks/
│   │   │   ├── schemas/
│   │   │   └── types/                 # Page and form contracts
│   │   ├── home/components/
│   │   ├── presentation-template-library/catalog/
│   │   └── system/not-found/
│   ├── providers/
│   │   ├── app-providers.tsx            # Redux Provider and global Toaster
│   │   └── types/
│   ├── routes/
│   │   ├── modules/                     # Product route groups
│   │   └── router.tsx                   # Router composition
│   ├── services/                        # API modules grouped by business domain
│   │   ├── document-template/
│   │   │   ├── api/document-template.api.ts
│   │   │   ├── types/document-template.types.ts
│   │   │   └── index.ts                 # Stable public exports for pages
│   │   └── presentation-template/
│   │       ├── api/presentation-template.api.ts
│   │       ├── types/presentation-template.types.ts
│   │       └── index.ts
│   ├── shared/
│   │   ├── api/                         # RTK Query client and API envelope types
│   │   ├── config/                      # Route paths and stable app config
│   │   └── lib/                         # Shared technical utilities
│   ├── store/
│   │   ├── hooks.ts                     # Typed Redux hooks
│   │   └── store.ts                     # Redux Toolkit store
│   ├── styles/
│   │   └── global/globals.css           # Tailwind entry and global imports
│   └── main.tsx                         # React entry point
├── components.json                     # shadcn/ui configuration
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Organization principles

- `routes` owns URL definitions and connects routes to layouts and pages. Route modules use lazy loading so each screen can be split into its own bundle.
- `pages` groups screens by product domain and workflow. A large number of templates should be represented as data and dynamic route parameters, not one source file per record.
- Page components are grouped by responsibility (`catalog`, `template`, `create-document`, and `empty-state`) so related UI can grow without making one flat folder difficult to navigate.
- `layouts` contains shared application shells; `components/ui` contains reusable shadcn/ui primitives.
- `src/assets` holds images imported by frontend code; `public` holds assets served from a stable URL, such as the site logo.
- `config/api.config.ts` is the single source for the backend base URL; `services/<domain>/api` owns endpoint definitions and `services/<domain>/types` owns API contracts.
- RTK Query owns remote data cache in `shared/api`; transient search and dialog state stays local to the feature. Pages import API hooks and contracts through each service's `index.ts`.
- Form schemas and form types belong to their owning feature. Use React Hook Form with the Zod resolver for form state and validation.
- Import `toast` from `sonner` in a feature action and use the single global Toaster mounted by `AppProviders`.
- `styles/global/globals.css` is the Tailwind CSS entry point. Feature layouts use Tailwind utilities and share only the established glass surface tokens.

## Routes

| Path                      | Purpose                       | Current state                                                                             |
| ------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------- |
| `/`                       | Choose a template library     | Home screen and product links are available                                               |
| `/document-templates`     | Browse document templates     | API search, category filters, pagination, preview, create, download, and save edited DOCX |
| `/presentation-templates` | Browse presentation templates | Connected to list endpoint; backend currently returns an empty collection                 |
| Any unmatched path        | Handle invalid routes         | Not-found page is available                                                               |

## API integration

`VITE_API_BASE_URL` defaults to `http://localhost:3001/api`. RTK Query unwraps the API's `{ success, data, meta }` envelope and keeps feature request definitions beside their catalog. Preview images and DOCX downloads use the API's binary endpoints directly.

The DOCX API supports listing, categories, details, previews, creating a private copy, saving an edited DOCX, and downloading the result. The PPTX API currently exposes metadata listing only and returns an empty collection; search, template previews, creation, and download require backend endpoints and data before those workflows can be enabled.

## Adding shadcn/ui components

Use the installed CLI from the `web` directory:

```bash
npx shadcn add <component>
```

Review each generated component against the existing design tokens and primitives before using it in a page.
