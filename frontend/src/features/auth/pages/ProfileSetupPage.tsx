import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Alert } from '@shared/components';
import BrandLogo from '@shared/components/BrandLogo';
import { useProfileSetup } from '../hooks';
import {
  User,
  Phone,
  MapPin,
  GraduationCap,
  ArrowLeft,
  Camera,
  Check,
} from '@shared/icons';
import AvatarUpload from '@features/auth/components/AvatarUpload';
import ExamSelect from '@features/auth/components/ExamSelect';

const ProfileSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email || '';
  const {
    profile,
    loading,
    error,
    errors,
    setField,
    handleSubmit: hookHandleSubmit,
  } = useProfileSetup();

  if (!email) {
    navigate('/app/auth/register');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    const success = await hookHandleSubmit(e);
    if (success) {
      navigate('/app/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <button
          onClick={() => navigate('/app/auth/register')}
          className="flex items-center gap-2 text-tb-gray-500 hover:text-tb-navy transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to register</span>
        </button>

        <BrandLogo className="flex items-center gap-1.5 mb-8" textClassName="text-xl font-bold bg-gradient-to-r from-tb-blue to-blue-700 bg-clip-text text-transparent" />

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
          <div className="text-center mb-6">
            <AvatarUpload name={profile.name} />
            <h1 className="text-2xl font-bold text-tb-navy">Complete your profile</h1>
            <p className="mt-1 text-sm text-tb-gray-500">Help us personalize your learning experience</p>
          </div>

          {error && (
            <div className="mb-4">
              <Alert variant="danger" title="Setup Failed">{error}</Alert>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={profile.name}
              onChange={(e) => setField('name', e.target.value)}
              error={errors.name}
              icon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="10-digit mobile number"
              value={profile.phone}
              onChange={(e) => setField('phone', e.target.value.replace(/[^\d\s-]/g, ''))}
              error={errors.phone}
              icon={<Phone className="w-4 h-4" />}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="City"
                placeholder="Your city"
                value={profile.city}
                onChange={(e) => setField('city', e.target.value)}
                icon={<MapPin className="w-4 h-4" />}
              />
              <Input
                label="State"
                placeholder="Your state"
                value={profile.state}
                onChange={(e) => setField('state', e.target.value)}
                icon={<MapPin className="w-4 h-4" />}
              />
            </div>

            <ExamSelect value={profile.targetExam} onChange={(value) => setField('targetExam', value)} error={errors.targetExam} />

            <Input
              label="Education"
              placeholder="e.g., B.Tech, 12th Pass, Graduate"
              value={profile.education}
              onChange={(e) => setField('education', e.target.value)}
              icon={<GraduationCap className="w-4 h-4" />}
            />

            <Button type="submit" variant="primary" fullWidth isLoading={loading} className="mt-2">
              Complete Setup
              <Check className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-xs text-tb-gray-400 mt-4">
            You can update these details later from your profile settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
