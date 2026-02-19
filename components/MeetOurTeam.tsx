
import React, { memo } from 'react';
import { TeamMember } from '../constants';

const TeamCard: React.FC<{ member: TeamMember }> = memo(({ member }) => {
  return (
    <div className="flex flex-col w-full max-w-[280px] sm:max-w-[300px] md:w-[320px] group mx-auto">
      {/* Image Block */}
      <div className="w-full aspect-square bg-[#D9D9D9] rounded-[2rem] overflow-hidden mb-[-2rem] relative z-0">
        <img 
          src={member.image} 
          alt={member.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Text Details Block */}
      <div className="relative z-10 bg-[#141414] rounded-b-[1.5rem] sm:rounded-b-[2rem] md:rounded-b-[2.5rem] p-4 sm:p-5 md:p-6 pb-6 sm:pb-7 md:pb-8 border-t border-white/5 shadow-2xl overflow-visible">
        {/* Quotes Icon */}
        <div className="absolute -top-2 sm:-top-3 left-4 sm:left-6 text-[#76ABB8] text-3xl sm:text-4xl font-serif select-none">
          "
        </div>
        
        <div className="mt-3 sm:mt-4">
          <h4 className="text-white text-lg sm:text-xl font-bold tracking-tight mb-1">{member.name}</h4>
          <p className="text-[#76ABB8] text-xs sm:text-sm font-medium uppercase tracking-wider">{member.role}</p>
        </div>
      </div>
    </div>
  );
});

interface MeetOurTeamProps {
  members: TeamMember[];
  onMoreClick: () => void;
}

const MeetOurTeam: React.FC<MeetOurTeamProps> = memo(({ members, onMoreClick }) => {
  const faculty = members.filter(m => m.category === 'faculty');
  const leadership = members.filter(m => m.category === 'Board Members');

  return (
    <section id="team" className="py-32 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <h2 className="text-center text-fluid-4xl md:text-fluid-8xl font-black text-[#76ABB8] uppercase tracking-[-0.05em] leading-tight mb-12 sm:mb-16 md:mb-24">
          MEET OUR TEAM
        </h2>

        <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-24">
          {/* Faculty Coordinators Row (2 items) */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-24 w-full">
            {faculty.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

          {/* Student Leadership Row (3 items) */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 w-full">
            {leadership.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

          {/* More Button */}
          <div className="mt-12 sm:mt-16 md:mt-20">
            <button 
              onClick={onMoreClick}
              className="bg-[#76ABB8]/60 hover:bg-[#76ABB8] active:bg-[#6a9ba8] text-white px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 rounded-full text-base sm:text-lg md:text-xl font-bold transition-all flex items-center gap-3 backdrop-blur-sm group border border-white/5 min-h-[48px] touch-manipulation"
            >
              More 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#76ABB8]/5 rounded-full blur-[160px] pointer-events-none"></div>
    </section>
  );
});

export default MeetOurTeam;
