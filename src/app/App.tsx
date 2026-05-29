import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '@shared/layout/MainLayout';
import { ToastProvider } from '@shared/components/ToastProvider';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </ToastProvider>
  );
};

export default App;
