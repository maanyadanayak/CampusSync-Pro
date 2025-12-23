
import React, { useState } from 'react';
import { StudentProfile } from '../types';

interface ProfileProps {
  profile: StudentProfile;
  onUpdate: (profile: StudentProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Reusable Profile</h2>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
          {isEditing ? (
            <input 
              className="w-full mt-1 bg-slate-50 p-3 rounded-xl border border-slate-200 text-sm"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          ) : (
            <p className="font-semibold text-slate-800">{profile.name}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Branch</label>
            <p className="font-semibold text-slate-800">{profile.branch}</p>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Year</label>
            <p className="font-semibold text-slate-800">{profile.year}</p>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Skills</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.skills.map(skill => (
              <span key={skill} className="bg-blue-50 text-blue-600 text-[11px] font-bold px-3 py-1 rounded-full border border-blue-100">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Professional Links</label>
          <div className="space-y-2">
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-sm font-medium">GitHub</span>
              <span className="text-blue-500 text-xs">View</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-sm font-medium">LinkedIn</span>
              <span className="text-blue-500 text-xs">View</span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
        <span className="text-xl">🔒</span>
        <p className="text-[11px] text-amber-700 leading-relaxed">
          Your data is encrypted and used only for campus forms. You have full control over what is shared with event organizers.
        </p>
      </div>
    </div>
  );
};

export default Profile;
