export const AUTH_STEPS = ['login', 'register', 'otp-verify', 'profile-setup', 'forgot-password', 'forgot-code', 'forgot-reset'] as const;
export type AuthStep = (typeof AUTH_STEPS)[number];

export const AUTH_STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
} as const;
