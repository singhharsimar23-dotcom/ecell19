
import React, { useState, useEffect, memo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Initiatives from './components/Initiatives';
import LandingBlogs from './components/LandingBlogs';
import OurEvents from './components/OurEvents';
import PastSpeakers from './components/PastSpeakers';
import MeetOurTeam from './components/MeetOurTeam';
import Sponsors from './components/Sponsors';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import TeamsExplorer from './components/TeamsExplorer';
import BlogsExplorer from './components/BlogsExplorer';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import { TEAM, MOCK_TEAM_MEMBERS, EVENTS, BLOG_POSTS, TeamMember, EventItem, BlogPost } from './constants';

type ViewState = 'landing' | 'teams' | 'blogs' | 'auth' | 'dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [activeNavItem, setActiveNavItem] = useState('HOME');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  // Global Data State
  const [members, setMembers] = useState<TeamMember[]>(() => {
    const allMembers = [...TEAM];
    Object.values(MOCK_TEAM_MEMBERS).forEach(teamGroup => {
      allMembers.push(...teamGroup);
    });
    return allMembers;
  });

  const [events, setEvents] = useState<EventItem[]>(EVENTS);
  const [blogs, setBlogs] = useState<BlogPost[]>(BLOG_POSTS);

  // --- Scroll & Navigation Logic ---

  // Handle pending scroll when returning to landing page
  useEffect(() => {
    if (currentView === 'landing' && pendingScrollId) {
      const timer = setTimeout(() => {
        const element = document.getElementById(pendingScrollId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setPendingScrollId(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentView, pendingScrollId]);

  // Optimized Scroll Spy using IntersectionObserver
  useEffect(() => {
    if (currentView !== 'landing') return;

    const sectionMapping: Record<string, string> = {
      'home': 'HOME',
      'about': 'ABOUT US',
      'initiatives': 'INITIATIVES',
      'blogs': 'BLOGS',
      'gallery': 'GALLERY',
      'sponsors': 'SPONSORS',
      'join': 'JOIN US'
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Adjust to trigger when section is in view
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const label = sectionMapping[entry.target.id];
          if (label) {
            setActiveNavItem(label);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = Object.keys(sectionMapping);
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentView]);

  const handleNavigation = (label: string, href: string) => {
    const targetId = href.replace('#', '');

    if (currentView === 'landing') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setPendingScrollId(targetId);
      setCurrentView('landing');
    }
  };

  const switchView = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'auth') setActiveNavItem('AUTH');
    if (view === 'dashboard') setActiveNavItem('DASHBOARD');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    switchView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    switchView('landing');
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#76ABB8] selection:text-white overflow-x-hidden">
      {/* Background radial gradient decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden transform-gpu">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#26658C]/10 rounded-full blur-[120px] will-change-transform"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#54ACBF]/5 rounded-full blur-[120px] will-change-transform"></div>
      </div>

      <Navbar
        activeItem={activeNavItem}
        onNavigate={handleNavigation}
        onAuthClick={() => isLoggedIn ? switchView('dashboard') : switchView('auth')}
        isLoggedIn={isLoggedIn}
      />

      <main>
        {currentView === 'landing' && (
          <div className="will-change-scroll">
            <Hero />
            <About />
            <Initiatives />
            <LandingBlogs blogs={blogs} onMoreClick={() => switchView('blogs')} />
            <OurEvents events={events} />
            <PastSpeakers />
            <MeetOurTeam members={members} onMoreClick={() => switchView('teams')} />
            <Sponsors />
            <ContactUs />
          </div>
        )}

        {currentView === 'teams' && (
          <TeamsExplorer members={members} onClose={() => switchView('landing')} />
        )}

        {currentView === 'blogs' && (
          <BlogsExplorer blogs={blogs} onClose={() => switchView('landing')} />
        )}

        {currentView === 'auth' && (
          <AuthPage onLoginSuccess={handleLoginSuccess} onClose={() => switchView('landing')} />
        )}

        {currentView === 'dashboard' && (
          <Dashboard
            members={members}
            setMembers={setMembers}
            events={events}
            setEvents={setEvents}
            blogs={blogs}
            setBlogs={setBlogs}
            onLogout={handleLogout}
            onClose={() => switchView('landing')}
          />
        )}
      </main>

      {currentView === 'landing' && <Footer />}
    </div>
  );
};

export default App;
