
import React, { useState } from 'react';
import { getCareerGuidance } from '../services/gemini';
import { StudentProfile } from '../types';

interface CareerGuidanceProps {
  profile: StudentProfile;
}

const CareerGuidance: React.FC<CareerGuidanceProps> = ({ profile }) => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const topics = [
    { id: 'linkedin', title: 'LinkedIn Optimization', icon: '👔' },
    { id: 'github', title: 'GitHub for Students', icon: '🐙' },
    { id: 'hackathon', title: 'Hackathon PPT Hacks', icon: '💡' },
    { id: 'project', title: 'Choosing a Project', icon: '🛠️' },
  ];

  const handleTopicSelect = async (topicId: string, title: string) => {
    setActiveTopic(title);
    setIsLoading(true);
    const result = await getCareerGuidance(title, profile);
    setContent(result || "");
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Career Launchpad</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {topics.map(t => (
          <button
            key={t.id}
            onClick={() => handleTopicSelect(t.id, t.title)}
            className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 active:bg-blue-50 transition-colors"
          >
            <span className="text-3xl">{t.icon}</span>
            <span className="text-xs font-bold text-slate-700">{t.title}</span>
          </button>
        ))}
      </div>

      {activeTopic && (
        <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-blue-600">{activeTopic}</h3>
            <button onClick={() => setActiveTopic(null)} className="text-slate-400 text-lg">×</button>
          </div>
          
          {isLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-slate-100 rounded w-3/4"></div>
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-5/6"></div>
            </div>
          ) : (
            <div className="prose prose-sm prose-slate max-w-none text-slate-600">
               {content.split('\n').map((line, i) => (
                 <p key={i} className="mb-2 text-sm leading-relaxed">{line}</p>
               ))}
            </div>
          )}
        </div>
      )}

      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="font-bold mb-2">Resume Score: 85/100</h4>
          <p className="text-xs opacity-70 mb-4">Your current profile matches 3 upcoming campus placements.</p>
          <button className="bg-blue-600 px-4 py-2 rounded-xl text-xs font-bold">Optimize for Placements</button>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default CareerGuidance;
