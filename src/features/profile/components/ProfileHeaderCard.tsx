import React from 'react';
import { Card, Button, Input } from '@shared/components';
import { User, Mail, MapPin, Calendar, Edit, Camera, Check } from '@shared/icons';

interface Profile {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  bio?: string;
  createdAt?: string;
}

interface ProfileHeaderCardProps {
  profile: Profile | null;
  isEditing: boolean;
  editForm: { name: string; email: string; phone: string; city: string; targetExam: string; bio: string };
  setIsEditing: (v: boolean) => void;
  setEditForm: (f: any) => void;
  handleSaveProfile: () => void;
}

const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({ profile, isEditing, editForm, setIsEditing, setEditForm, handleSaveProfile }) => {
  const avatar = profile?.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';

  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-tb-blue via-blue-600 to-purple-600" />
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-tb-blue to-indigo-500 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-xl border-4 border-white">{avatar}</div>
            <button className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-lg shadow border border-tb-gray-200"><Camera className="w-4 h-4 text-tb-gray-500" /></button>
          </div>
          <div className="flex-1 text-center sm:text-left">
            {isEditing ? (
              <div className="space-y-3 max-w-md">
                <Input label="Name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} icon={<User className="w-4 h-4" />} />
                <Input label="Email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} icon={<Mail className="w-4 h-4" />} />
                <Input label="Phone" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} icon={<Mail className="w-4 h-4" />} />
                <div className="flex gap-3"><Button variant="primary" size="sm" onClick={handleSaveProfile}><Check className="w-4 h-4" /> Save</Button><Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button></div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-tb-navy">{profile?.name || 'User'}</h2>
                <p className="text-sm text-tb-gray-500">{profile?.email} • {profile?.phone}</p>
                <p className="text-sm text-tb-gray-500 mt-1">{profile?.bio || 'No bio set'}</p>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-tb-gray-500"><span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{profile?.city || 'Not set'}</span><span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Joined {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : '2026'}</span></div>
              </>
            )}
          </div>
          {!isEditing && <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}><Edit className="w-4 h-4" /> Edit</Button>}
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeaderCard;
