export const getAuthStepTitle = (step: string): string => {
  const titles: Record<string, string> = {
    login: 'Sign In',
    register: 'Create Account',
    'otp-verify': 'Verify OTP',
    'profile-setup': 'Complete Profile',
    'forgot-password': 'Forgot Password',
    'forgot-code': 'Verify Code',
    'forgot-reset': 'Reset Password',
  };
  return titles[step] || step;
};
