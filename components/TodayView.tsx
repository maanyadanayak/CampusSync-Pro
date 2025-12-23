
import React, { useState, useEffect } from 'react';
import { CampusEvent, StudentProfile, EventType, Notification } from '../types';
import { getSmartSuggestion } from '../services/gemini';

interface TodayViewProps {
  profile: StudentProfile;
  events: CampusEvent[];
  freeSlots: CampusEvent[];
  notifications: Notification[];
}

const TodayView: React.FC<TodayViewProps> = ({ profile, events, freeSlots, notifications }) => {
  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const fetchAiSuggestion = async () => {
    setIsAiLoading(true);
    const suggestion = await getSmartSuggestion(profile, [...events, ...freeSlots], new Date().toISOString());
    setAiSuggestion(suggestion || "");
    setIsAiLoading(false);
  };

  useEffect(() => {
    fetchAiSuggestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {/* Hero Welcome */}
      <section className="gradient-bg p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-sm font-medium opacity-80">Good morning,</h2>
        <h1 className="text-2xl font-bold">{profile.name.split(' ')[0]}! 👋</h1>
        
        <div className="mt-4 bg-white/20 backdrop-blur-md rounded-2xl p-4 flex justify-between items-center">
          <div>
            <p className="text-xs opacity-80">Next Class</p>
            <p className="font-semibold text-sm">Computer Networks (2:00 PM)</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-80">Free Slots</p>
            <p className="font-semibold text-sm">{freeSlots.length} detected</p>
          </div>
        </div>
      </section>

      {/* AI Button Hero */}
      <section className="bg-blue-50 border border-blue-100 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h3 className="font-bold text-blue-800">CampusSync AI</h3>
          </div>
          <button 
            onClick={fetchAiSuggestion}
            disabled={isAiLoading}
            className="text-[10px] font-bold text-blue-600 underline uppercase"
          >
            {isAiLoading ? 'Thinking...' : 'Refresh'}
          </button>
        </div>
        
        <p className="text-sm text-slate-700 leading-relaxed italic">
          {isAiLoading ? "Analyzing your schedule and profile..." : `"${aiSuggestion}"`}
        </p>

        <button 
          onClick={fetchAiSuggestion}
          className="mt-4 w-full bg-blue-600 text-white font-bold py-3 rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <span>🚀</span> What should I do now?
        </button>
      </section>

      {/* Notifications */}
      <section>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Urgent Updates</h3>
        <div className="space-y-3">
          {notifications.slice(0, 3).map(n => (
            <div key={n.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-4 shadow-sm">
              <div className={`w-1 h-auto rounded-full ${n.priority === 'high' ? 'bg-red-500' : 'bg-amber-500'}`} />
              <div>
                <h4 className="font-bold text-sm text-slate-800">{n.title}</h4>
                <p className="text-xs text-slate-500">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Today's Schedule */}
      <section>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 px-1 text-center">Your Timeline</h3>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className={`p-4 rounded-2xl border transition-all ${
              event.type === EventType.CANCELLED_CLASS ? 'bg-red-50 border-red-100' : 
              event.type === EventType.DEADLINE ? 'bg-purple-50 border-purple-100' : 'bg-white border-slate-100 shadow-sm'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    event.type === EventType.CLASS ? 'bg-blue-100 text-blue-600' :
                    event.type === EventType.CANCELLED_CLASS ? 'bg-red-200 text-red-700' :
                    event.type === EventType.DEADLINE ? 'bg-purple-200 text-purple-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {event.type.replace('_', ' ')}
                  </span>
                  <h4 className={`mt-1 font-bold text-slate-800 ${event.type === EventType.CANCELLED_CLASS ? 'line-through opacity-50' : ''}`}>
                    {event.title}
                  </h4>
                  <div className="flex gap-4 mt-1 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">📍 {event.location || 'Online'}</span>
                    <span className="flex items-center gap-1">⏰ {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                {event.type === EventType.DEADLINE && (
                  <button className="text-[10px] font-bold text-white bg-purple-600 px-3 py-1.5 rounded-xl">Apply</button>
                )}
              </div>
            </div>
          ))}
          
          {freeSlots.map((slot) => (
            <div key={slot.id} className="bg-emerald-50 border border-emerald-100 border-dashed p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-200 w-8 h-8 rounded-full flex items-center justify-center text-emerald-700">⌛</div>
                <div>
                  <h4 className="font-bold text-emerald-800 text-sm">Opportunity Detected!</h4>
                  <p className="text-[10px] text-emerald-600">{new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} — {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
              <button 
                onClick={fetchAiSuggestion}
                className="text-[10px] font-bold bg-white text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl shadow-sm"
              >
                Plan this Slot
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TodayView;
