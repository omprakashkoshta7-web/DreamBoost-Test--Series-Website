# React + Redux TypeScript Project with Tailwind CSS

## Project Structure

This project follows a **feature-based folder structure** with a centralized Redux store setup and modern UI styling with Tailwind CSS.

### Key Directories

- **`src/app`** - Main app setup, routes, and providers
- **`src/store`** - Global Redux store configuration
- **`src/features`** - Feature-based modules (auth, dashboard, test-series, etc.)
- **`src/shared`** - Reusable components, hooks, utilities, and types

### Redux Architecture

Each feature has its own Redux slice with:
- `*.slice.ts` - Redux slice with reducers
- `*.thunks.ts` - Async thunks for API calls
- `*.selectors.ts` - Typed selectors for state access

## 🎨 UI & Styling

### Tailwind CSS Setup
- **Fully responsive** design for mobile, tablet, and desktop
- **Professional component library** with predefined variants
- **Dark mode ready** (can be extended)
- **Smooth animations** and transitions
- **Safe area support** for notched devices

### Available Components

1. **Button** - Multiple variants and sizes
2. **Card** - Container component with headers and footers
3. **Input** - Form input with validation and icons
4. **Modal** - Dialog component with animations
5. **Alert** - Status alerts (info, success, warning, danger)
6. **Badge** - Tag and status indicators
7. **Loader** - Loading spinner component

See [UI_DESIGN_SYSTEM.md](UI_DESIGN_SYSTEM.md) for complete documentation.

## Setup & Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Features Included

- ✅ Redux with Redux Toolkit
- ✅ React Router v6
- ✅ TypeScript support
- ✅ Vite for fast development
- ✅ Global UI state management (toasts, modals, loaders)
- ✅ Timer slice for test series
- ✅ Auth feature with thunks
- ✅ Responsive providers setup
- ✅ Tailwind CSS with custom theme
- ✅ Professional component library
- ✅ Mobile-first responsive design

## Type Safety

- Fully typed Redux hooks (`useAppDispatch`, `useAppSelector`)
- Path aliases for easy imports (`@features`, `@store`, `@shared`, etc.)
- Strict TypeScript configuration

## Project Routes

- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/dashboard` - Main dashboard
- `/test-series` - Test series page
- `/profile` - User profile
- `/leaderboard` - Global leaderboard

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=P2
VITE_APP_VERSION=0.0.1
```

## CSS Architecture

The project uses a layered Tailwind CSS approach:

1. **@tailwind base** - Reset and base styles
2. **@tailwind components** - Custom component classes (btn, card, input, etc.)
3. **@tailwind utilities** - Utility classes and animations

All styles are in `src/index.css` with organized @layer directives.

## Development Workflow

1. **Components** are in `src/shared/components/`
2. **Pages** are in `src/features/*/pages/`
3. **State management** is in `src/store/` and `src/features/*/store/`
4. **Styling** is handled through Tailwind classes and `src/index.css`

## Mobile Optimization

The app is fully optimized for mobile with:
- Responsive grid layouts (1 column on mobile, multiple on desktop)
- Touch-friendly button sizes
- Safe area padding for notched devices
- Mobile navigation toggle
- Flexible typography

## Performance

- **Optimized bundle size** - Tailwind purges unused styles
- **Fast HMR** - Vite's instant module replacement
- **Code splitting** - Lazy-loaded routes
- **Tree-shaking** - Unused code is removed

---

**For complete UI documentation, see [UI_DESIGN_SYSTEM.md](UI_DESIGN_SYSTEM.md)**

