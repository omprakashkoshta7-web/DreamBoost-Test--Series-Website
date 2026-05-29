import { Alert, Button, Input } from '@shared/components';
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from '@shared/icons';

interface AuthRegisterStepProps {
  name: string;
  onNameChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  password: string;
  onPasswordChange: (value: string) => void;
  confirmPassword: string;
  onConfirmPasswordChange: (value: string) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  agreeTerms: boolean;
  onAgreeTermsChange: (checked: boolean) => void;
  errors: Record<string, string>;
  strength: { score: number; label: string; color: string };
  authError: string | null;
  onCloseAuthError: () => void;
  loading: boolean;
  onRegister: (e: React.FormEvent) => void;
  onSwitchToLogin: () => void;
}

const AuthRegisterStep = ({
  name, onNameChange, email, onEmailChange,
  password, onPasswordChange, confirmPassword, onConfirmPasswordChange,
  showPassword, onTogglePassword, agreeTerms, onAgreeTermsChange,
  errors, strength, authError, onCloseAuthError, loading,
  onRegister, onSwitchToLogin,
}: AuthRegisterStepProps) => (
  <>
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-tb-navy">Create your account</h2>
      <p className="text-sm text-tb-gray-500 mt-1">Start your 30-day free trial</p>
    </div>

    {authError && <Alert variant="danger" title="Registration Failed" onClose={onCloseAuthError} className="mb-4">{authError}</Alert>}

    <form onSubmit={onRegister} className="space-y-4">
      <Input label="Full Name" placeholder="John Doe" value={name} onChange={(e) => onNameChange(e.target.value)} icon={<User className="w-4 h-4" />} error={errors.name} required />
      <Input label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={(e) => onEmailChange(e.target.value)} icon={<Mail className="w-4 h-4" />} error={errors.email} required />

      <div className="relative">
        <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={password} onChange={(e) => onPasswordChange(e.target.value)} icon={<Lock className="w-4 h-4" />} error={errors.password} required />
        <button type="button" onClick={onTogglePassword} className="absolute right-3 top-9 text-tb-gray-400 hover:text-tb-gray-600 transition-colors">
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {password && (
        <div className="mt-1">
          <div className="flex gap-1 mb-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength.score ? strength.color : 'bg-gray-200'}`} />
            ))}
          </div>
          <p className="text-xs text-gray-500">{strength.label}</p>
        </div>
      )}

      <Input label="Confirm Password" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => onConfirmPasswordChange(e.target.value)} icon={<Lock className="w-4 h-4" />} error={errors.confirmPassword} required />

      <div>
        <label className="flex items-start gap-2 text-sm text-tb-gray-600 cursor-pointer">
          <input type="checkbox" checked={agreeTerms} onChange={(e) => onAgreeTermsChange(e.target.checked)} className="w-4 h-4 mt-0.5 rounded border-tb-gray-300 text-tb-blue focus:ring-tb-blue" />
          <span>I agree to the <span className="text-tb-blue font-medium">Terms</span> and <span className="text-tb-blue font-medium">Privacy Policy</span></span>
        </label>
        {errors.terms && <p className="text-sm text-red-500 mt-1">{errors.terms}</p>}
      </div>

      <Button type="submit" variant="primary" fullWidth isLoading={loading} className="py-3">
        Create Account <ArrowRight className="w-4 h-4" />
      </Button>
    </form>

    <p className="text-center text-sm text-tb-gray-500 mt-6">
      Already have an account?{' '}
      <Button variant="ghost" size="sm" onClick={onSwitchToLogin}>Login</Button>
    </p>
  </>
);

export default AuthRegisterStep;
