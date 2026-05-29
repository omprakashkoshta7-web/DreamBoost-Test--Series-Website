import React from 'react';

interface AuthSwitchFooterProps {
  mode: 'login' | 'register';
}

const AuthSwitchFooter: React.FC<AuthSwitchFooterProps> = ({ mode }) => {
  return (
    <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
      {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
      <a href={mode === 'login' ? "/app/auth/register" : "/?auth=login"} className="text-blue-600 font-semibold hover:text-blue-700">
        {mode === 'login' ? 'Create account' : 'Sign in'}
      </a>
    </p>
  );
};

export default AuthSwitchFooter;
