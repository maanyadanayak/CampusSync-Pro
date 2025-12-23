
import React, { useState, useEffect } from 'react';
import { UserRole, StudentProfile, CampusEvent, EventType, Notification } from './types';
import { MOCK_USER, MOCK_EVENTS, MOCK_NOTIFICATIONS } from './constants';
import TodayView from './components/TodayView';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import Header from './components/Header';
import CareerGuidance from './components/CareerGuidance';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [profile, setProfile] = useState<StudentProfile>(MOCK_USER);
  const [events, setEvents] = useState<CampusEvent[]>(MOCK_EVENTS);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<'today' | 'profile' | 'career' | 'admin'>('today');

  // Logic to calculate free slots
  const getFreeSlots = () => {
    const sortedEvents = [...events]
      .filter(e => e.type !== EventType.CANCELLED_CLASS && e.type !== EventType.DEADLINE)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    
    // Simplification for MVP: Just detect gaps > 30 mins
    const slots: CampusEvent[] = [];
    
    // Add gaps for cancelled classes
    events.forEach(e => {
      if (e.type === EventType.CANCELLED_CLASS) {
        slots.push({
          id: `free-${e.id}`,
          title: `Free Slot (Was ${e.title})`,
          type: EventType.FREE_SLOT,
          startTime: e.startTime,
          endTime: e.endTime,
        });
      }
    });

    return slots;
  };

  const addEvent = (newEvent: CampusEvent) => {
    setEvents(prev => [...prev, newEvent]);
    const notification: Notification = {
      id: Date.now().toString(),
      title: `New ${newEvent.type}`,
      message: `${newEvent.title} has been scheduled for ${new Date(newEvent.startTime).toLocaleTimeString()}`,
      timestamp: new Date().toISOString(),
      priority: 'medium',
      read: false
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const cancelClass = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, type: EventType.CANCELLED_CLASS } : e));
    const cancelledClass = events.find(e => e.id === id);
    if (cancelledClass) {
      const notification: Notification = {
        id: Date.now().toString(),
        title: 'Class Cancelled',
        message: `${cancelledClass.title} is cancelled today. Enjoy your free time!`,
        timestamp: new Date().toISOString(),
        priority: 'high',
        read: false
      };
      setNotifications(prev => [notification, ...prev]);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <Header 
        role={role} 
        onSwitchRole={() => setRole(role === UserRole.STUDENT ? UserRole.ADMIN : UserRole.STUDENT)}
        notificationsCount={notifications.filter(n => !n.read).length}
      />

      <main className="max-w-xl mx-auto px-4 mt-6">
        {activeTab === 'today' && (
          <TodayView 
            profile={profile} 
            events={events} 
            freeSlots={getFreeSlots()}
            notifications={notifications}
          />
        )}
        {activeTab === 'profile' && (
          <Profile profile={profile} onUpdate={setProfile} />
        )}
        {activeTab === 'career' && (
          <CareerGuidance profile={profile} />
        )}
        {activeTab === 'admin' && role === UserRole.ADMIN && (
          <AdminPanel events={events} onAddEvent={addEvent} onCancelClass={cancelClass} />
        )}
      </main>

      {/* Persistent Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50 max-w-xl mx-auto rounded-t-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <NavItem active={activeTab === 'today'} icon="🏠" label="Today" onClick={() => setActiveTab('today')} />
        <NavItem active={activeTab === 'career'} icon="🚀" label="Career" onClick={() => setActiveTab('career')} />
        <NavItem active={activeTab === 'profile'} icon="👤" label="Profile" onClick={() => setActiveTab('profile')} />
        {role === UserRole.ADMIN && (
          <NavItem active={activeTab === 'admin'} icon="⚙️" label="Admin" onClick={() => setActiveTab('admin')} />
        )}
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; icon: string; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-blue-600 scale-110' : 'text-slate-400'}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

export default App;
