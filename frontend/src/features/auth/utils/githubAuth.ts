const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_STATE_KEY = 'github_oauth_state';

export const getGithubRedirectUri = () => `${window.location.origin}/app/auth/github/callback`;

export const startGithubLogin = () => {
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  if (!clientId) {
    throw new Error('GitHub sign-in is not configured');
  }

  const state = crypto.randomUUID();
  sessionStorage.setItem(GITHUB_STATE_KEY, state);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getGithubRedirectUri(),
    scope: 'read:user user:email',
    state,
  });

  window.location.href = `${GITHUB_AUTH_URL}?${params.toString()}`;
};

export const validateGithubState = (state: string | null) => {
  const expectedState = sessionStorage.getItem(GITHUB_STATE_KEY);
  sessionStorage.removeItem(GITHUB_STATE_KEY);
  return Boolean(state && expectedState && state === expectedState);
};
