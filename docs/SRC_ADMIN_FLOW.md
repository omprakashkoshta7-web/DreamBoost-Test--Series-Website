# Source And Admin Flow Documentation

Ye document project ke `src` user app, `admin` panel, aur `server` API ke end-to-end flow ko explain karta hai. App React + Redux Toolkit + React Router + Axios + Tailwind par based hai, backend Express + MongoDB/Mongoose par hai.

## 1. Project Map

```text
src/
  app/                  User app bootstrap, providers, routes
  features/             User-facing feature modules
  shared/               Shared UI, layout, hooks, utils, types
  store/                User app Redux store

admin/
  components/           Admin shared UI components
  context/              Admin theme/sidebar context
  features/             Admin modules
  layout/               Admin shell: sidebar, header, outlet
  routes/               Admin route definitions and protection
  store/                Admin Redux store
  types/                Admin API/domain types
  utils/                Admin API client and toast helpers

server/src/
  controllers/          API business logic
  routes/               Express route mapping
  middleware/           Auth, error, validation handlers
  models/               Mongoose models
  config/               DB and app config
```

## 2. App Bootstrap Flow

Entry point: `src/main.tsx`

1. React root create hota hai.
2. Global providers wrap hote hain:
   - `ReduxProvider` user app store provide karta hai.
   - `AuthProvider` auth context/state setup karta hai.
   - `ThemeProvider` theme handling karta hai.
   - `QueryProvider` query/data layer ke liye wrapper hai.
3. `RouterProvider` ko `src/app/routes.tsx` se router milta hai.
4. Lazy-loaded routes ke liye `Suspense` fallback me shared `Loader` show hota hai.

User app shell: `src/app/App.tsx`

`App` sirf `MainLayout` ke andar `Outlet` render karta hai. Isliye `/app/*` pages common user layout me render hote hain.

## 3. User App Routing Flow

Main route file: `src/app/routes.tsx`

Public routes:

- `/` -> Landing page
- `/app/auth/login`
- `/app/auth/register`
- `/app/auth/otp-verify`
- `/app/auth/profile-setup`
- `/app/auth/forgot-password`

Protected user routes:

- `/app/dashboard`
- `/app/exam-categories`
- `/app/exam-categories/:categorySlug`
- `/app/exam-landing/:examSlug`
- `/app/my-tests`
- `/app/test-series`
- `/app/test-instructions/:testId`
- `/app/test-exam/:testId`
- `/app/test-result/:testId`
- `/app/test-result/:testId/:resultId`
- `/app/profile`
- `/app/leaderboard`
- `/app/payment`
- `/app/settings`
- `/app/notifications`
- `/app/support`
- `/app/bookmarks`
- `/app/study-material`
- `/app/study-material/subject/:subjectId`
- `/app/study-material/view/:materialId`
- `/app/my-library`
- `/app/study-progress`

Protection: `src/shared/components/ProtectedRoute.tsx`

1. Route load par `localStorage.token` check hota hai.
2. Token hai aur Redux auth state authenticated nahi hai to `getMe()` dispatch hota hai.
3. Loading state me loader show hota hai.
4. Auth fail hone par user `/app/auth/login` par redirect hota hai.

## 4. User App Data Flow

Typical user feature folder:

```text
src/features/<feature>/
  pages/                Route-level page components
  components/           Feature-specific UI
  hooks/                Feature hooks
  services/api.ts       Axios API calls
  store/*.slice.ts      Redux state and async thunks
  store/*.selectors.ts  Typed state selectors
  constants.ts          Feature constants
  index.ts              Exports
```

Typical request flow:

```text
Page/Component
  -> feature hook
  -> Redux thunk or direct service call
  -> src/shared/utils/apiClient.ts
  -> Express route under /api
  -> controller
  -> Mongoose model
  -> JSON response
  -> Redux state update
  -> UI re-render
```

User API client: `src/shared/utils/apiClient.ts`

- Base URL: `VITE_API_URL` or `http://localhost:3000/api`
- Token key: `localStorage.token`
- Refresh token key: `localStorage.refreshToken`
- Every request me `Authorization: Bearer <token>` add hota hai.
- `401` aane par `/auth/refresh` hit hota hai.
- Refresh fail hone par tokens remove hote hain aur user `/app/auth/login` par redirect hota hai.

## 5. User Feature Flow Summary

Auth:

- Pages: login, register, OTP verify, profile setup, forgot/reset password.
- Services: `/auth/login`, `/auth/register`, `/auth/me`, `/auth/logout`, `/otp/*`, reset password endpoints.
- State: `src/features/auth/store/auth.slice.ts` and thunks.

Dashboard:

- Route: `/app/dashboard`
- API: `/dashboard/full`
- Components show welcome, tests, progress, analytics, notifications, recent activity.

Exam Discovery:

- Routes: exam categories, exam select, exam landing.
- API: `/exam/home`, `/exam/categories`, `/exam/categories/:slug/exams`, `/exam/exams/:slug`, `/exam/access/:testId`, `/exam/dashboard`.

Test Series And Exam:

- Routes: `/app/test-series`, `/app/my-tests`, instructions, exam, result.
- API: `/tests`, `/tests/:testId`, `/tests/:testId/submit`, `/tests/enroll`, `/tests/my`, `/tests/result/:resultId`.
- Timer state is separate in `timer.slice.ts`.

Study Material:

- Routes: material list, subject detail, material view, library, progress.
- API: `/study/subjects`, `/study/materials`, `/study/materials/:id`, `/study/subjects/:subjectId/chapters`, `/study/progress`, `/study/my-library`, `/study/profile-progress`, `/study/purchase`.

Payments:

- Route: `/app/payment`
- API: `/payments`, `/payments/current-plan`, `/payments/apply-coupon`.

Support:

- Route: `/app/support`
- API: `/faqs`, `/tickets`, `/tickets/:id`, `/tickets/:id/reply`.

Notifications:

- Route: `/app/notifications`
- API: `/notifications`, `/notifications/:id/read`, `/notifications/read-all`.

Bookmarks:

- Route: `/app/bookmarks`
- API: `/bookmarks`.
- Reusable button: `src/shared/components/BookmarkButton.tsx`.

## 6. Admin App Routing Flow

Admin routes are imported into main router from `admin/routes/AdminRoutes.tsx`.

Public admin route:

- `/admin/login`

Protected admin routes:

- `/admin/dashboard`
- `/admin/users`
- `/admin/users/:id`
- `/admin/tests`
- `/admin/payments`
- `/admin/analytics`
- `/admin/settings`
- `/admin/questions`
- `/admin/coupons`
- `/admin/notifications`
- `/admin/tickets`
- `/admin/tickets/:id`
- `/admin/banners`
- `/admin/faqs`
- `/admin/announcements`
- `/admin/batches`
- `/admin/activity-logs`
- `/admin/reports`
- `/admin/study-materials`
- `/admin/exam-categories`
- `/admin/exams`
- `/admin/subjects`
- `/admin/topics`
- `/admin/plans`
- `/admin/access-rules`
- `/admin/reviews`
- `/admin/bookmarks`
- `/admin/leaderboard`
- `/admin/home`

Admin protection: `admin/routes/AdminProtectedRoute.tsx`

1. `localStorage.adminToken` check hota hai.
2. Token missing ho to `/admin/login` redirect.
3. Token present ho to `AdminLayout` render hota hai.

Admin layout: `admin/layout/AdminLayout.tsx`

- Sidebar: `admin/layout/AdminSidebar.tsx`
- Header: `admin/layout/AdminHeader.tsx`
- Content outlet: child admin page render hota hai.

## 7. Admin Store And Auth Flow

Admin ka Redux store user app se separate hai: `admin/store/store.ts`.

Admin route tree me `AdminStoreProvider` wrap karta hai:

```text
/admin/login
  -> AdminStoreProvider
  -> AdminLoginPage

/admin/*
  -> AdminStoreProvider
  -> AdminProtectedRoute
  -> AdminLayout
  -> Admin page
```

Admin login flow:

1. `AdminLoginPage` credentials submit karta hai.
2. `loginUser` thunk dispatch hota hai.
3. `admin/features/auth/services/api.ts` calls `POST /admin/auth/admin-login`.
4. Backend validates email, password, role, disabled state.
5. Response me `token` and `user` aate hain.
6. Frontend saves:
   - `localStorage.adminToken`
   - `localStorage.adminUser`
7. Admin protected pages accessible ho jate hain.

Admin API client: `admin/utils/apiClient.ts`

- Base URL: `${VITE_API_URL}/admin`
- Token key: `localStorage.adminToken`
- Every request me `Authorization: Bearer <adminToken>` add hota hai.
- `401` par admin token/user remove hote hain aur `/admin/login` redirect hota hai.

## 8. Admin Sidebar Module Groups

Admin sidebar modules:

Main:

- Dashboard
- Users
- Payments

Exam:

- Categories
- Exams
- Subjects
- Topics

Content:

- Tests
- Questions
- Study Materials
- Home Content
- Banners
- FAQs
- Announcements

Engagement:

- Notifications
- Tickets
- Coupons
- Batches & Groups
- Bookmarks

Access:

- Access Rules
- Review & Approval

Monetization:

- Subscription Plans

Insights:

- Analytics
- Reports
- Activity Logs
- Leaderboard

System:

- Settings

## 9. Admin Backend Flow

Admin backend routes: `server/src/routes/admin.routes.ts`

Mounted at: `/api/admin` from `server/src/routes/index.ts`

Admin route protection:

```text
POST /api/admin/auth/admin-login
  -> public

All routes below
  -> authenticate
  -> authorize('super_admin', 'admin', 'editor', 'support')
```

Auth middleware: `server/src/middleware/auth.ts`

- `authenticate` reads bearer token.
- JWT verify hota hai.
- User DB se fetch hota hai.
- `req.user` set hota hai.
- `authorize` role allow-list check karta hai.

## 10. Admin API Map

Base: `/api/admin`

Auth:

- `POST /auth/admin-login`

Dashboard:

- `GET /dashboard`

Users:

- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `PATCH /users/:id/status`
- `PATCH /users/:id/batch`
- `DELETE /users/:id`
- `GET /users/:id/progress`

Batches And Groups:

- `GET /batches`
- `POST /batches`
- `PATCH /batches/:id`
- `DELETE /batches/:id`
- `GET /groups`
- `POST /groups`
- `PATCH /groups/:id`
- `DELETE /groups/:id`

Tests And Questions:

- `GET /tests`
- `POST /tests`
- `PATCH /tests/:id`
- `POST /tests/:id/duplicate`
- `DELETE /tests/:id`
- `GET /questions`
- `POST /questions`
- `PATCH /questions/:id`
- `DELETE /questions/:id`
- `POST /questions/bulk-upload`
- `POST /questions/bulk`

Results And Reports:

- `GET /results`
- `POST /results/:testId/ranks`
- `GET /results/export`
- `GET /reports/revenue`
- `GET /reports/attempts`
- `GET /reports/export/:type`

Payments:

- `GET /payments`
- `POST /payments/:id/refund`
- `GET /invoices`

Content:

- `GET /banners`
- `POST /banners`
- `PATCH /banners/:id`
- `DELETE /banners/:id`
- `GET /faqs`
- `POST /faqs`
- `PATCH /faqs/:id`
- `DELETE /faqs/:id`
- `GET /announcements`
- `POST /announcements`
- `PATCH /announcements/:id`
- `DELETE /announcements/:id`
- `GET /home-content`
- `POST /home-content`
- `PATCH /home-content/:id`
- `DELETE /home-content/:id`

Engagement:

- `GET /notifications`
- `POST /notifications`
- `PATCH /notifications/:id`
- `DELETE /notifications/:id`
- `POST /notifications/:id/send`
- `GET /tickets`
- `GET /tickets/:id`
- `PATCH /tickets/:id`
- `POST /tickets/:id/reply`
- `GET /bookmarks`
- `GET /leaderboard`

Exam Structure:

- `GET /exam-categories`
- `POST /exam-categories`
- `PATCH /exam-categories/:id`
- `DELETE /exam-categories/:id`
- `GET /exams`
- `POST /exams`
- `PATCH /exams/:id`
- `DELETE /exams/:id`
- `GET /subjects`
- `POST /subjects`
- `PATCH /subjects/:id`
- `DELETE /subjects/:id`
- `GET /topics`
- `POST /topics`
- `PATCH /topics/:id`
- `DELETE /topics/:id`

Monetization And Access:

- `GET /plans`
- `POST /plans`
- `PATCH /plans/:id`
- `DELETE /plans/:id`
- `GET /access-rules`
- `POST /access-rules`
- `PATCH /access-rules/:id`
- `DELETE /access-rules/:id`

Reviews:

- `GET /reviews`
- `POST /reviews`
- `PATCH /reviews/:id/status`
- `DELETE /reviews/:id`

Study:

- `GET /study/subjects`
- `GET /study/materials`
- `GET /study/materials/:id`
- `POST /study/subjects`
- `PATCH /study/subjects/:id`
- `DELETE /study/subjects/:id`
- `POST /study/materials/create`
- `PATCH /study/materials/:id`
- `DELETE /study/materials/:id`

System:

- `GET /activity-logs`
- `GET /analytics`
- `GET /settings`
- `PATCH /settings`

## 11. Bookmarks Flow Example

User side files:

- `src/features/bookmarks/hooks/useBookmarks.ts`
- `src/features/bookmarks/store/bookmarks.slice.ts`
- `src/features/bookmarks/services/api.ts`
- `src/features/bookmarks/pages/BookmarksPage.tsx`
- `src/shared/components/BookmarkButton.tsx`

User bookmark flow:

```text
BookmarksPage / BookmarkButton
  -> useBookmarks()
  -> fetchBookmarks/addBookmark/removeBookmark thunk
  -> src/features/bookmarks/services/api.ts
  -> apiClient
  -> /api/bookmarks
  -> server/src/routes/content.routes.ts
  -> content.controller
  -> User/Question data
```

Important behavior:

- `useBookmarks()` exposes `bookmarks`, `loading`, `error`, `refresh`, `toggleBookmark`, `isBookmarked`.
- `toggleBookmark(questionId)` current Redux bookmark list me question check karta hai.
- Already bookmarked hai to `removeBookmark(questionId)` dispatch hota hai.
- Nahi hai to `addBookmark(questionId)` dispatch hota hai.
- Slice `questions` and `count` update karta hai.

Backend user bookmark endpoints:

- `GET /api/bookmarks`
- `POST /api/bookmarks`
- `DELETE /api/bookmarks/:questionId`

Admin bookmark flow:

```text
AdminBookmarksPage
  -> admin/features/bookmarks/store/bookmarks.slice.ts
  -> admin/features/bookmarks/services/api.ts
  -> adminApiClient
  -> /api/admin/bookmarks
  -> admin.controller.getAllBookmarks
```

Admin view read-only hai, currently sirf `GET /admin/bookmarks` service me available hai.

## 12. Backend Main Route Mounting

Server route entry: `server/src/routes/index.ts`

```text
/api/auth           -> auth.routes
/api/otp            -> otp.routes
/api/dashboard      -> dashboard.routes
/api/tests          -> test.routes
/api/profile        -> profile.routes
/api/leaderboard    -> leaderboard.routes
/api/payments       -> payment.routes
/api/notifications  -> notification.routes
/api/settings       -> settings.routes
/api/study          -> study.routes
/api/admin          -> admin.routes
/api/exam           -> exam.routes
/api/subscription   -> plan.routes
/api/*              -> support and content routes also mount at root
```

Note: `support.routes` and `content.routes` root par mount hain, isliye `/api/faqs`, `/api/tickets`, `/api/bookmarks`, `/api/banners`, `/api/announcements`, `/api/home` direct available hain.

## 13. New User Feature Add Karne Ka Checklist

1. `src/features/<feature>/` folder banao.
2. `pages/`, `services/api.ts`, `store/<feature>.slice.ts`, `store/<feature>.selectors.ts`, `hooks/` add karo.
3. Slice ko `src/store/store.ts` me reducer ke under register karo.
4. Route ko `src/app/routes.tsx` me add karo.
5. Protected page hai to `ProtectedRoute` wrap karo.
6. Backend route/controller/model ready karo.
7. Service me `apiClient` use karo, direct axios nahi.
8. UI me shared components use karo.

## 14. New Admin Feature Add Karne Ka Checklist

1. `admin/features/<feature>/` folder banao.
2. `pages/`, `services/api.ts`, `store/<feature>.slice.ts`, selectors, constants, types add karo.
3. Slice ko `admin/store/store.ts` me register karo.
4. Page lazy import `admin/routes/AdminRoutes.tsx` me add karo.
5. Route child add karo under `/admin`.
6. Sidebar me nav item add karo: `admin/layout/AdminSidebar.tsx`.
7. Backend admin route `server/src/routes/admin.routes.ts` me add karo.
8. Controller function `server/src/controllers/admin.controller.ts` ya relevant controller me add karo.
9. Service me `adminApiClient` use karo.
10. Auth/role requirement verify karo.

## 15. Local Development

Install:

```bash
npm install
cd server
npm install
```

Frontend:

```bash
npm run dev
```

Backend:

```bash
cd server
npm run dev
```

Build:

```bash
npm run build
cd server
npm run build
```

Environment:

```text
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=P2
VITE_APP_VERSION=0.0.1
```

## 16. Important Conventions

- User token key: `token`
- User refresh token key: `refreshToken`
- Admin token key: `adminToken`
- Admin user key: `adminUser`
- User API client: `src/shared/utils/apiClient.ts`
- Admin API client: `admin/utils/apiClient.ts`
- User route base: `/app`
- Admin route base: `/admin`
- API base: `/api`
- Admin API base: `/api/admin`
- User Redux store: `src/store/store.ts`
- Admin Redux store: `admin/store/store.ts`

