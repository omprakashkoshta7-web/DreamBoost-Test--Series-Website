import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ReduxProvider, AuthProvider, ThemeProvider, QueryProvider } from '@app/providers';
import { router } from '@app/routes';
import { Loader } from '@shared/components';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
    <ReduxProvider>
      <AuthProvider>
        <ThemeProvider>
          <QueryProvider>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <Loader size="lg" label="Loading..." />
              </div>
            }>
              <RouterProvider router={router} />
            </Suspense>
          </QueryProvider>
        </ThemeProvider>
      </AuthProvider>
    </ReduxProvider>
    </HelmetProvider>
  </React.StrictMode>
);
