import React from 'react';
import { Card, Input, Button } from '@shared/components';
import { User, Mail, Phone, MapPin, Check } from '@shared/icons';

interface ProfileSectionProps {
  form: { name: string; email: string; phone: string; bio: string };
  onChange: (f: any) => void;
  saving: boolean;
  onSave: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ form, onChange, saving, onSave }) => (
  <Card title="Profile Information">
    <div className="space-y-4 mt-4">
      <Input label="Full Name" value={form.name} onChange={(e) => onChange({ ...form, name: e.target.value })} icon={<User className="w-4 h-4" />} />
      <Input label="Email" value={form.email} onChange={(e) => onChange({ ...form, email: e.target.value })} icon={<Mail className="w-4 h-4" />} />
      <Input label="Phone" value={form.phone} onChange={(e) => onChange({ ...form, phone: e.target.value })} icon={<Phone className="w-4 h-4" />} />
      <Input label="Bio" value={form.bio} onChange={(e) => onChange({ ...form, bio: e.target.value })} icon={<MapPin className="w-4 h-4" />} />
      <Button variant="primary" onClick={onSave} isLoading={saving}><Check className="w-4 h-4" /> Save Changes</Button>
    </div>
  </Card>
);

export default ProfileSection;
