import React from 'react';
import SEO from '@shared/components/SEO';
import { Button, Input, Alert } from '@shared/components';
import BrandLogo from '@shared/components/BrandLogo';
import { useLoginForm } from '../hooks';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from '@shared/icons';
import AuthBrandingSidebar from '@features/auth/components/AuthBrandingSidebar';
import SocialLoginDivider from '@features/auth/components/SocialLoginDivider';

const LoginPage: React.FC = () => {
  const { email, password, showPassword, errors, loading, error,
    setEmail, setPassword, setShowPassword, setErrors,
    handleSubmit, handleGoogleLogin } = useLoginForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 flex">
      <SEO title="Login" description="Login to your DreamBoost account to access test series, track progress and continue your exam preparation." />
      <AuthBrandingSidebar />

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <BrandLogo className="lg:hidden flex items-center gap-1.5 mb-8" textClassName="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" />

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Sign in</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Enter your credentials to access your account</p>
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
            {error && (
              <Alert variant="danger" title="Login Failed" onClose={() => {}}>
                {error}
              </Alert>
            )}
            {errors.form && (
              <Alert variant="danger" title="Google Sign-in Failed" onClose={() => setErrors({})}>
                {errors.form}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                icon={<Mail className="w-4 h-4" />}
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  icon={<Lock className="w-4 h-4" />}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={loading}
                className="py-3"
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <SocialLoginDivider />

            <Button variant="secondary" fullWidth type="button" onClick={handleGoogleLogin} disabled={loading}>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <a href="/app/auth/register" className="text-blue-600 font-semibold hover:text-blue-700">
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
