import React from 'react';

interface QueryProviderProps {
  children: React.ReactNode;
}

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  // React Query or similar setup
  return <>{children}</>;
};

export default QueryProvider;
