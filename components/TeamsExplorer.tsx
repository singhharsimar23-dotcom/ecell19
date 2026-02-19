
import React, { useState, memo } from 'react';
import { SUB_TEAMS, MOCK_TEAM_MEMBERS, TeamMember, LOGO_URL } from '../constants';

// --- Components ---

const TeamMemberCard: React.FC<{ member: TeamMember; index: number }> = memo(({ member, index }) => {
  // Stagger animation based on index
  const animationDelay = `${index * 50}ms`;

  return (
    <div 
      className="group relative w-full max-w-[280px] aspect-[3/4] rounded-[2rem] overflow-hidden cursor-pointer animate-fade-in-up border border-white/10 shadow-xl bg-[#0f172a]"
      style={{ animationDelay }}
    >
      {/* Background Image Layer - Grayscale to Color */}
      <div className="absolute inset-0">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
        />
      </div>

      {/* Default State Overlay (Darkening for legibility if needed, mostly clear) */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

      {/* Hover Gradient Overlay - Brand Colored */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#02142C] via-[#76ABB8]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Bottom Gradient for Text Readability (Always visible) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#02142C] via-transparent to-transparent opacity-90" />

      {/* Content Layer */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
           
           {/* Animated Brand Line */}
           <div className="w-8 h-1 bg-[#76ABB8] rounded-full mb-3 group-hover:w-16 transition-all duration-500 shadow-[0_0_10px_#76ABB8]"></div>
           
           {/* Name & Role */}
           <h3 className="text-2xl font-black text-white mb-1 leading-none uppercase tracking-tight drop-shadow-md">
             {member.name}
           </h3>
           <p className="text-[#A7EBF2] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
             {member.role}
           </p>

           {/* Connect Button - Slides up on hover */}
           <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
             <div className="overflow-hidden pt-2">
               <a 
                 href={member.linkedin} 
                 target="_blank" 
                 rel="noreferrer"
                 className="flex items-center justify-center gap-2 bg-white text-[#02142C] hover:bg-[#76ABB8] hover:text-white px-4 py-3 rounded-xl transition-all duration-300 w-full font-black text-[10px] uppercase tracking-widest shadow-lg"
               >
                 <span>View Profile</span>
                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
               </a>
             </div>
           </div>
        </div>
      </div>
      
      {/* Border Glow on Hover */}
      <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-[#76ABB8]/30 transition-colors duration-500 pointer-events-none" />
    </div>
  );
});

const TeamCategoryCard: React.FC<{ 
  team: string; 
  index: number; 
  onClick: () => void; 
}> = memo(({ team, index, onClick }) => {
  const animationDelay = `${index * 50}ms`;
  
  return (
    <button
      onClick={onClick}
      className="group relative h-36 w-full animate-fade-in-up overflow-hidden rounded-3xl"
      style={{ animationDelay }}
    >
      {/* Base Background */}
      <div className="absolute inset-0 bg-[#0f172a] border border-white/5 transition-all duration-500"></div>
      
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#26658C] to-[#02142C] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Decorative Blob */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#76ABB8]/20 rounded-full blur-3xl group-hover:bg-[#76ABB8]/40 transition-all duration-500"></div>

      <div className="relative h-full flex items-center justify-between px-8 z-10">
        <div className="text-left">
            <span className="block text-2xl font-black uppercase tracking-tighter text-white group-hover:translate-x-2 transition-transform duration-300">
            {team}
            </span>
            <span className="text-[10px] font-bold text-[#76ABB8] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 block mt-1 group-hover:translate-x-2">
                Explore Team
            </span>
        </div>
        
        <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/40 group-hover:bg-white group-hover:text-[#02142C] transition-all duration-300 group-hover:scale-110 shadow-lg">
          <svg className="w-4 h-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </div>
      
      {/* Border Glow */}
      <div className="absolute inset-0 rounded-3xl border border-white/5 group-hover:border-[#76ABB8]/50 transition-colors duration-500 pointer-events-none"></div>
    </button>
  );
});

interface TeamsExplorerProps {
  members: TeamMember[];
  onClose: () => void;
}

const TeamsExplorer: React.FC<TeamsExplorerProps> = memo(({ members, onClose }) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const getTeamMembers = (teamName: string) => {
    if (teamName === 'Board Members') {
      return members.filter(m => m.category === 'Board Members');
    }
    const filtered = members.filter(m => m.category === teamName);
    if (filtered.length > 0) return filtered;
    return MOCK_TEAM_MEMBERS[teamName] || [];
  };

  const handleTeamClick = (team: string) => {
    setSelectedTeam(team);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const LogoIcon = () => (
    <div className="w-14 h-14 drop-shadow-[0_0_15px_rgba(118,171,184,0.5)] animate-pulse-slow">
      <LOGO_URL width="100%" height="100%" />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[150] bg-[#02142C] overflow-y-auto custom-scrollbar">
      
      {/* Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#26658C]/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#76ABB8]/5 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 min-h-screen flex flex-col items-center">
        
        {/* Navigation / Header */}
        <header className="w-full flex justify-between items-center mb-12 animate-fade-in-down sticky top-0 z-50 py-4 mix-blend-difference">
           <button 
             onClick={selectedTeam ? () => setSelectedTeam(null) : onClose}
             className="group flex items-center gap-3 text-white/80 hover:text-[#76ABB8] transition-colors"
           >
             <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-[#76ABB8] group-hover:text-[#02142C] group-hover:border-[#76ABB8] transition-all duration-300">
               <svg className="w-3 h-3 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </svg>
             </span>
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">{selectedTeam ? 'Back to Teams' : 'Back Home'}</span>
           </button>
           
           <div className="hidden md:flex items-center gap-4">
             <div className="text-right">
               <h1 className="text-white text-base font-black uppercase tracking-tighter leading-none">E-Cell</h1>
               <p className="text-[#76ABB8] text-[8px] font-bold uppercase tracking-[0.3em]">Directory</p>
             </div>
             <div className="w-8 h-8 opacity-80"><LOGO_URL width="100%" height="100%" /></div>
           </div>
        </header>

        {!selectedTeam ? (
          /* === VIEW 1: CATEGORIES === */
          <div className="w-full max-w-6xl space-y-12">
            <div className="text-center space-y-4 animate-fade-in-up">
              <div className="flex justify-center mb-4"><LogoIcon /></div>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
                Our Teams
              </h2>
              <p className="text-[#A7EBF2] text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed tracking-wide opacity-80">
                The brilliant minds and relentless executors powering the entrepreneurial ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
              {SUB_TEAMS.map((team, idx) => (
                <TeamCategoryCard 
                  key={team} 
                  team={team} 
                  index={idx} 
                  onClick={() => handleTeamClick(team)} 
                />
              ))}
            </div>
          </div>
        ) : (
          /* === VIEW 2: MEMBERS GRID === */
          <div className="w-full space-y-12">
            <div className="text-center space-y-2 animate-fade-in-up">
              <span className="text-[#76ABB8] text-[10px] font-black uppercase tracking-[0.3em] bg-[#76ABB8]/10 px-4 py-2 rounded-full border border-[#76ABB8]/20 shadow-[0_0_15px_rgba(118,171,184,0.1)]">
                Meet the Team
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter drop-shadow-xl">
                {selectedTeam}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center pb-20 px-4">
              {getTeamMembers(selectedTeam).length > 0 ? (
                getTeamMembers(selectedTeam).map((member, idx) => (
                  <TeamMemberCard key={member.id} member={member} index={idx} />
                ))
              ) : (
                <div className="col-span-full text-[#76ABB8]/50 text-xl font-black uppercase tracking-widest py-32 text-center border-2 border-dashed border-white/5 rounded-3xl w-full">
                  Team details coming soon
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.95); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .animate-fade-in-down { animation: fade-in-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-blob { animation: blob 10s infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
});

export default TeamsExplorer;
