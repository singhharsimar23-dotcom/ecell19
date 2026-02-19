
import React, { memo } from 'react';
import { TeamMember } from '../constants';

const TeamCard: React.FC<{ member: TeamMember }> = memo(({ member }) => {
  return (
    <div className="flex flex-col w-[300px] md:w-[320px] group">
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
      <div className="relative z-10 bg-[#141414] rounded-b-[2.5rem] p-6 pb-8 border-t border-white/5 shadow-2xl overflow-visible">
        {/* Quotes Icon */}
        <div className="absolute -top-3 left-6 text-[#76ABB8] text-4xl font-serif select-none">
          “
        </div>
        
        <div className="mt-4">
          <h4 className="text-white text-xl font-bold tracking-tight mb-1">{member.name}</h4>
          <p className="text-[#76ABB8] text-sm font-medium uppercase tracking-wider">{member.role}</p>
        </div>
        
        {/* LinkedIn Button */}
        <div className="absolute -bottom-5 left-6">
          <a 
            href={member.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 bg-[#347690] rounded-full flex items-center justify-center text-white border-2 border-black hover:bg-[#4a97b5] transition-all hover:scale-110 shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
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
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <h2 className="text-center text-6xl md:text-8xl font-black text-[#76ABB8] uppercase tracking-[-0.05em] leading-tight mb-24">
          MEET OUR TEAM
        </h2>

        <div className="flex flex-col items-center gap-16 md:gap-24">
          {/* Faculty Coordinators Row (2 items) */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {faculty.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

          {/* Student Leadership Row (3 items) */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-16 lg:gap-20">
            {leadership.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

          {/* More Button */}
          <div className="mt-20">
            <button 
              onClick={onMoreClick}
              className="bg-[#76ABB8]/60 hover:bg-[#76ABB8] text-white px-16 py-5 rounded-full text-xl font-bold transition-all flex items-center gap-3 backdrop-blur-sm group border border-white/5"
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
