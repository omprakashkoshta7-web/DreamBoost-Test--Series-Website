import { Alert, Button, Input } from '@shared/components';
import { Check, GraduationCap, MapPin, Phone } from '@shared/icons';

interface AuthProfileSetupStepProps {
  name: string;
  profile: {
    phone: string;
    city: string;
    state: string;
    targetExam: string;
    education: string;
  };
  loading: boolean;
  error: string | null;
  errors: Record<string, string>;
  examOptions: string[];
  onSetField: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AuthProfileSetupStep = ({
  name, profile, loading, error, errors, examOptions,
  onSetField, onSubmit,
}: AuthProfileSetupStepProps) => (
  <div className="p-8">
    <div className="text-center mb-6">
      <div className="relative inline-block mb-4">
        <div className="w-20 h-20 bg-gradient-to-br from-tb-blue to-blue-700 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg">
          {name ? name.charAt(0).toUpperCase() : '?'}
        </div>
      </div>
      <h2 className="text-2xl font-bold text-tb-navy">Complete your profile</h2>
      <p className="text-sm text-tb-gray-500 mt-1">Help us personalize your learning experience</p>
    </div>

    {error && <Alert variant="danger" title="Setup Failed">{error}</Alert>}

    <form onSubmit={onSubmit} className="space-y-4">
      <Input label="Phone Number" type="tel" placeholder="10-digit mobile number" value={profile.phone} onChange={(e) => onSetField('phone', e.target.value.replace(/[^\d\s-]/g, ''))} icon={<Phone className="w-4 h-4" />} error={errors.phone} required />

      <div className="grid grid-cols-2 gap-3">
        <Input label="City" placeholder="Your city" value={profile.city} onChange={(e) => onSetField('city', e.target.value)} icon={<MapPin className="w-4 h-4" />} />
        <Input label="State" placeholder="Your state" value={profile.state} onChange={(e) => onSetField('state', e.target.value)} icon={<MapPin className="w-4 h-4" />} />
      </div>

      <div>
        <label className="block text-sm font-medium text-tb-gray-700 mb-1.5 flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4" /> Target Exam <span className="text-tb-red">*</span>
        </label>
        <select
          value={profile.targetExam}
          onChange={(e) => onSetField('targetExam', e.target.value)}
          className={`w-full px-4 py-2.5 border rounded-md text-sm text-tb-navy focus:outline-none focus:ring-2 focus:ring-tb-blue focus:border-transparent bg-white ${errors.targetExam ? 'border-red-300' : 'border-tb-gray-300'}`}
        >
          <option value="">Select your target exam</option>
          {examOptions.map((exam) => (<option key={exam} value={exam}>{exam}</option>))}
        </select>
        {errors.targetExam && <p className="text-xs text-red-500 mt-1">{errors.targetExam}</p>}
      </div>

      <Input label="Education" placeholder="e.g., B.Tech, 12th Pass" value={profile.education} onChange={(e) => onSetField('education', e.target.value)} icon={<GraduationCap className="w-4 h-4" />} />

      <Button type="submit" variant="primary" fullWidth isLoading={loading} className="py-3">
        Complete Setup <Check className="w-4 h-4" />
      </Button>
    </form>
  </div>
);

export default AuthProfileSetupStep;
