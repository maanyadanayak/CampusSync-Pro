
import React, { useState } from 'react';
import { CampusEvent, EventType } from '../types';

interface AdminPanelProps {
  events: CampusEvent[];
  onAddEvent: (event: CampusEvent) => void;
  onCancelClass: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ events, onAddEvent, onCancelClass }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<EventType>(EventType.HACKATHON);

  const handlePush = () => {
    if (!newTitle) return;
    onAddEvent({
      id: Date.now().toString(),
      title: newTitle,
      type: newType,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 3600000).toISOString(),
      isOfficial: true
    });
    setNewTitle("");
  };

  return (
    <div className="space-y-6 pb-12">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>

      {/* Push New Event */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <span>📢</span> Broadcast Update
        </h3>
        
        <input 
          placeholder="Event Title (e.g. Free Pizza in Cafeteria)"
          className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />

        <div className="flex gap-2 overflow-x-auto pb-2">
          {[EventType.HACKATHON, EventType.WORKSHOP, EventType.EXAM, EventType.DEADLINE].map(type => (
            <button
              key={type}
              onClick={() => setNewType(type)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${
                newType === type ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <button 
          onClick={handlePush}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-colors shadow-lg active:scale-95"
        >
          Push to All Students
        </button>
      </div>

      {/* Class Management */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Today's Active Classes</h3>
        {events.filter(e => e.type === EventType.CLASS).map(e => (
          <div key={e.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
            <div>
              <h4 className="font-bold text-slate-800">{e.title}</h4>
              <p className="text-[10px] text-slate-500">{new Date(e.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} — {e.location}</p>
            </div>
            <button 
              onClick={() => onCancelClass(e.id)}
              className="bg-red-50 text-red-600 text-[10px] font-bold px-4 py-2 rounded-xl border border-red-100 hover:bg-red-100 transition-colors"
            >
              Cancel Class
            </button>
          </div>
        ))}
      </div>

      <div className="bg-blue-900 text-blue-100 p-6 rounded-3xl shadow-xl">
        <h4 className="font-bold text-white mb-2">System Health</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-800/50 p-3 rounded-2xl">
            <p className="text-[10px] opacity-70">Active Users</p>
            <p className="text-xl font-bold">1,248</p>
          </div>
          <div className="bg-blue-800/50 p-3 rounded-2xl">
            <p className="text-[10px] opacity-70">Push Delivers</p>
            <p className="text-xl font-bold">99.9%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
