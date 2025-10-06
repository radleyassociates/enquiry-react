# Enquiry React

Starter scaffold: Vite + React + TypeScript + Tailwind CSS.

What you get

- TypeScript React app (Vite)
- Tailwind CSS configured
- Pages: Login, MainScreen
- Components: Header, AssetSearch, AssetList

To run

1. Install deps:

```powershell
npm install
```

2. Dev server:

```powershell
npm run dev
```

Project structure (important files)

- `src/main.tsx` - app entry
- `src/App.tsx` - router + auth guard
- `src/pages` - `Login`, `MainScreen`
- `src/shared` - shared components (Header, AssetSearch, AssetList)
- `tailwind.config.cjs`, `postcss.config.cjs`

Next steps / recommendations

- Replace `useAuth` with a proper authentication flow
- Add unit tests (Vitest or Jest)
- Add API layer and state management (React Query / Redux Toolkit)
- Add form validation (React Hook Form + Zod)
