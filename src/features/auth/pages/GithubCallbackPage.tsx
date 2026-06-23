import { useEffect, useState } from 'react';
import SEO from '@shared/components/SEO';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Alert } from '@shared/components';
import BrandLogo from '@shared/components/BrandLogo';
import { useAppDispatch } from '@store/hooks';
import { githubLoginUser } from '../store/auth.thunks';
import { getGithubRedirectUri, validateGithubState } from '../utils/githubAuth';
import OAuthLoadingIndicator from '@features/auth/components/OAuthLoadingIndicator';
import OAuthErrorDisplay from '@features/auth/components/OAuthErrorDisplay';

const GithubCallbackPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const finishLogin = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const oauthError = searchParams.get('error_description') || searchParams.get('error');

      if (oauthError) {
        setError(oauthError);
        return;
      }

      if (!code || !validateGithubState(state)) {
        setError('GitHub sign-in session expired. Please try again.');
        return;
      }

      const result = await dispatch(githubLoginUser({ code, redirectUri: getGithubRedirectUri() }));
      if (githubLoginUser.fulfilled.match(result)) {
        navigate('/app/dashboard', { replace: true });
        return;
      }

      setError(result.payload || 'GitHub sign-in failed. Please try again.');
    };

    finishLogin();
  }, [dispatch, navigate, searchParams]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <SEO title="Signing in..." noIndex />
      <div className="w-full max-w-md bg-white border border-tb-gray-200 rounded-2xl shadow-xl p-8 text-center">
        <BrandLogo className="flex items-center justify-center gap-1.5 mb-6" logoClassName="h-12 w-16" textClassName="text-lg font-bold bg-gradient-to-r from-tb-blue to-blue-700 bg-clip-text text-transparent" />
        {error ? (
          <OAuthErrorDisplay error={error} onClose={() => setError('')} />
        ) : (
          <OAuthLoadingIndicator />
        )}
      </div>
    </div>
  );
};

export default GithubCallbackPage;
