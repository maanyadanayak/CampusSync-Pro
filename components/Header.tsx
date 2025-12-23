
import React from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  role: UserRole;
  onSwitchRole: () => void;
  notificationsCount: number;
}

const Header: React.FC<HeaderProps> = ({ role, onSwitchRole, notificationsCount }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-40 backdrop-blur-md bg-white/80">
      <div className="max-w-xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <h1 className="font-bold text-lg tracking-tight">CampusSync<span className="text-blue-600">Pro</span></h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onSwitchRole}
            className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 px-2 py-1 rounded text-slate-600 hover:bg-slate-200 transition-colors"
          >
            {role === UserRole.STUDENT ? 'Student' : 'Admin'} Mode
          </button>
          
          <div className="relative">
            <span className="text-xl">🔔</span>
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {notificationsCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
