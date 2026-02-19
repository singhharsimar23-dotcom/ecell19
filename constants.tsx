
import React from 'react';

export const COLORS = {
  white: '#FFFFFF',
  lightestBlue: '#D3FBFF',
  lightBlue: '#A7EBF2',
  teal: '#54ACBF',
  medBlue: '#26658C',
  deepBlue: '#023859',
  darkerBlue: '#011C40',
  mainBg: '#02142C',
};

const ECELL_LOGO_BASE64 = "data:image/png;base64,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";

// Official E-Cell Logo Component
export const LOGO_URL = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    src={ECELL_LOGO_BASE64}
    alt="E-Cell Logo"
    {...props}
  />
);

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT US', href: '#about' },
  { label: 'INITIATIVES', href: '#initiatives' },
  { label: 'BLOGS', href: '#blogs' },
  { label: 'SPONSORS', href: '#sponsors' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'JOIN US', href: '#join' },
];

export interface EventItem {
  id: string;
  title: string;
  description: string;
  image: string;
  layout: 'image-first' | 'text-first';
}

export const EVENTS: EventItem[] = [
  {
    id: 'e-summit-25',
    title: 'E-Summit 25',
    description: 'E-Summit 2025 by E-Cell VIT Bhopal is a premier entrepreneurial event bringing together innovators, investors, and industry leaders for insightful talks, workshops, networking, and pitch competitions. Focused on emerging technologies and startup growth, it offers a platform to learn, connect, and explore funding opportunities.',
    image: 'https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?q=80&w=2070&auto=format&fit=crop',
    layout: 'image-first',
  },
  {
    id: 'e-summit-24',
    title: 'E-Summit 24',
    description: "E-Summit '24 by E-Cell was a landmark event celebrating innovation, entrepreneurship, and strategic thinking. Highlights included a legendary speaker session with Vijender Singh Chauhan, a Paper Trading Competition, an IPL Auction challenge, a dynamic Case Study Competition, and a Product Design Competition powered by Notion.",
    image: 'https://images.unsplash.com/photo-1591115765373-520b7a6f72d7?q=80&w=2070&auto=format&fit=crop',
    layout: 'text-first',
  },
  {
    id: 'parichay-24',
    title: 'Parichay 24',
    description: 'Parichay 24 by E-Cell VIT Bhopal brought together entrepreneurial leaders who shared their inspiring journeys and expertise. Highlights included Mitresh Sharma, Founder of First Bud Organics, and Srijan Mehrotra, Founder of Model Verse, both Shark Tank India alumni.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop',
    layout: 'image-first',
  },
  {
    id: 'parichay-22',
    title: 'Parichay 22',
    description: "Parichay '22, organized by the E-Cell at VIT Bhopal, was a dynamic event designed to introduce students to the world of entrepreneurship and innovation. Featuring insightful sessions, interactive activities, and inspiring talks by industry leaders.",
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop',
    layout: 'text-first',
  },
  {
    id: 'prachar',
    title: 'Prachar',
    description: 'Prachar 2022, hosted by E-Cell VIT Bhopal, was an insightful and engaging event centered on creative marketing, featuring interactive quizzes, stand-up acts, and expert discussions.',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=2025&auto=format&fit=crop',
    layout: 'image-first',
  },
  {
    id: 'arohan',
    title: 'Arohan',
    description: "Aarohan '23 was a vibrant business extravaganza hosted by E-Cell VIT Bhopal, featuring a Business Case Competition, an insightful talk by Rakhi Pal (Co-Founder of EventBeep, TEDx Speaker, and Shark Tank India participant).",
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop',
    layout: 'text-first',
  },
];

export interface SpeakerItem {
  id: string;
  name: string;
  title: string;
  image: string;
}

export const SPEAKERS: SpeakerItem[] = [
  {
    id: 'srijan-mehrotra',
    name: 'Srijan Mehrotra',
    title: 'AI Engineer | Building Model Verse | Gen AI Developer',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQGsK4G3P5f_6g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1715494294025?e=1746057600&v=beta&t=xH3yE5KxYvD_pE_I4-z1Y-f_I3J_f_I3J_f_I3J_f_I3J',
  },
  {
    id: 'abhay-yadav',
    name: 'Dr. Abhay Yadav',
    title: 'Co-Founder & CEO, Bhopal Angels | Angel Investor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop',
  },
  {
    id: 'ankita-saxena',
    name: 'Ankita Saxena',
    title: "Marketing Champion | Communication | Ex-Walmart | Ex- Spencer's",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop',
  },
  {
    id: 'devesh-bochre',
    name: 'Devesh Bochre',
    title: 'Founder Void Energy asia pvt. ltd. (Shark Tank India S3)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop',
  },
  {
    id: 'kaif-khan',
    name: 'Kaif Khan',
    title: 'Stand Up Comedian',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop',
  },
  {
    id: 'mitresh-sharma',
    name: 'Mitresh Sharma',
    title: 'Founder, First Bud Organics (Shark Tank India S3) | Food & Agribusiness',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=400&auto=format&fit=crop',
  },
  {
    id: 'punit-g',
    name: 'Punit G',
    title: 'CEO - ArthNirmiti | CXO - Choice International Ltd | Ex-VP @ OYO | TEDx Speaker | IIM-A Alumnus',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&auto=format&fit=crop',
  },
  {
    id: 'rakhi-pal',
    name: 'Rakhi Pal',
    title: "Co-Founder at EventBeep - India's Largest Student Community | TEDx | Shark Tank India",
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop',
  },
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin: string;
  category: string;
}

export const TEAM: TeamMember[] = [
  {
    id: 'm-margathajaran',
    name: 'Dr. M. Margathajaran',
    role: 'Faculty Coordinator',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&auto=format&fit=crop',
    linkedin: '#',
    category: 'faculty'
  },
  {
    id: 'bhakti-parashar',
    name: 'Dr. Bhakti Parashar',
    role: 'Faculty Coordinator',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop',
    linkedin: '#',
    category: 'faculty'
  },
  {
    id: 'swapnil',
    name: 'Swapnil',
    role: 'President',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop',
    linkedin: '#',
    category: 'Board Members'
  },
  {
    id: 'vp-name',
    name: 'Name',
    role: 'Vice-President',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=400&auto=format&fit=crop',
    linkedin: '#',
    category: 'Board Members'
  },
  {
    id: 'yathansh',
    name: 'Yathansh',
    role: 'Genral Sec.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&auto=format&fit=crop',
    linkedin: '#',
    category: 'Board Members'
  },
];

export const SUB_TEAMS = [
  'Board Members', 'Tech Team', 'Design Team', 
  'Social Media Team', 'Events Team', 'Content Team', 
  'Corporate Team', 'Finance Team', 'Operations Team'
];

export const MOCK_TEAM_MEMBERS: Record<string, TeamMember[]> = {
  'Tech Team': [
    { id: 't1', name: 'Ayush Singh', role: 'Lead Developer', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=400&auto=format&fit=crop', linkedin: '#', category: 'Tech Team' },
    { id: 't2', name: 'Rohan Verma', role: 'Full Stack', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop', linkedin: '#', category: 'Tech Team' },
    { id: 't3', name: 'Sneha Rao', role: 'Frontend Dev', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&auto=format&fit=crop', linkedin: '#', category: 'Tech Team' },
  ],
  'Events Team': [
    { id: 'e1', name: 'Kabir Das', role: 'Operations Lead', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop', linkedin: '#', category: 'Events Team' },
    { id: 'e2', name: 'Meera Nair', role: 'Coordinator', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&auto=format&fit=crop', linkedin: '#', category: 'Events Team' },
    { id: 'e3', name: 'Arjun Kapoor', role: 'Logistics', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&auto=format&fit=crop', linkedin: '#', category: 'Events Team' },
  ],
  'Design Team': [
    { id: 'd1', name: 'Sanya Gupta', role: 'UI/UX Lead', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop', linkedin: '#', category: 'Design Team' },
  ],
  'Social Media Team': [
    { id: 'sm1', name: 'Ishita Roy', role: 'Content Head', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=400&auto=format&fit=crop', linkedin: '#', category: 'Social Media Team' },
  ],
  'Content Team': [
    { id: 'c1', name: 'Vikram Seth', role: 'Editor', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=400&auto=format&fit=crop', linkedin: '#', category: 'Content Team' },
  ],
  'Corporate Team': [
    { id: 'cr1', name: 'Tanmay Singh', role: 'Partnerships', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop', linkedin: '#', category: 'Corporate Team' },
  ],
  'Finance Team': [
    { id: 'f1', name: 'Priya Mishra', role: 'Treasurer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop', linkedin: '#', category: 'Finance Team' },
  ],
  'Operations Team': [
    { id: 'o1', name: 'Rahul Vats', role: 'General Ops', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop', linkedin: '#', category: 'Operations Team' },
  ],
};

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  snippet: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: React.ReactNode;
}

export const BLOG_CATEGORIES = [
  'ALL', 'INVESTMENTS', 'RETAIL', 'BUSINESS', 'FINANCE', 'PRODUCTS', 'LEGAL TECH'
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'info-edge-giants',
    category: 'INVESTMENTS',
    date: 'September 13, 2025',
    readTime: '8 Min Read',
    title: "Info Edge: The Silent Investor Fuling India's Digital Giants",
    snippet: "When you think of the companies that define India's digital economy, brands like Zomato and PolicyBazaar immediately come to mind...",
    image: 'https://media.glassdoor.com/l/34825/info-edge-india-office.jpg',
    author: {
        name: "Srijan Mehrotra",
        role: "AI Lead & Tech Analyst",
        avatar: "https://media.licdn.com/dms/image/v2/D4D03AQGsK4G3P5f_6g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1715494294025?e=1746057600&v=beta&t=xH3yE5KxYvD_pE_I4-z1Y-f_I3J_f_I3J_f_I3J_f_I3J"
    },
    content: (
        <div className="space-y-8">
            <p className="text-xl leading-relaxed text-white/90">
                When you think of the companies that define India's digital economy, brands like Zomato and PolicyBazaar immediately come to mind. But behind these household names lies a quieter, more strategic force: <strong>Info Edge (India) Limited</strong>.
            </p>
            <h2 className="text-3xl font-bold text-[#76ABB8]">The Genesis of a Strategic Empire</h2>
            <p>
                Founded by Sanjeev Bikhchandani in 1995, Info Edge started as a humble classifieds business. Naukri.com wasn't just a job portal; it was the first brick in what would become a massive digital wall. While most founders were chasing quick exits, Bikhchandani was chasing the "Network Effect."
            </p>
            <div className="bg-[#02142C] p-8 rounded-3xl border border-[#76ABB8]/20 italic">
                "We didn't set out to be a venture capital firm. We set out to build products that solve real Indian problems. The investment arm grew out of a surplus of capital and a surplus of belief in the Indian internet ecosystem."
            </div>
            <h2 className="text-3xl font-bold text-[#76ABB8]">The Zomato Bet</h2>
            <p>
                In 2010, Info Edge made its most legendary move: a $1 million investment into a fledgling restaurant discovery platform called FoodieBay (later Zomato). At the time, food delivery in India was a fragmented, offline mess. Info Edge saw the potential for a digital aggregator before anyone else. Today, that stake is worth billions, but more importantly, it validated the "Strategic Investor" model in India.
            </p>
            <h2 className="text-3xl font-bold text-[#76ABB8]">Why Info Edge Wins</h2>
            <ul className="list-disc pl-6 space-y-4">
                <li><strong>Patient Capital:</strong> Unlike traditional VCs with 7-year horizons, Info Edge plays the 20-year game.</li>
                <li><strong>Deep Domain Expertise:</strong> Having built Naukri, Jeevansathi, and 99acres, they understand the unit economics of marketplaces.</li>
                <li><strong>Ecosystem Synergy:</strong> Their portfolio companies often find operational efficiencies by working within the same network.</li>
            </ul>
            <p>
                As India moves towards a $5 trillion economy, Info Edge continues to look for the "next big thing" in segments like Legal Tech and EdTech. Their story isn't just about money; it's about the conviction that India's digital transformation is only just beginning.
            </p>
        </div>
    )
  },
  {
    id: 'clicks-to-bricks',
    category: 'RETAIL',
    date: 'September 20, 2025',
    readTime: '6 Min Read',
    title: "From Clicks To Bricks: How Platforms Are Revolutionizing Offline Retail",
    snippet: "As we continue binge-shopping on mobile apps, a silent revolution is happening where online giants are reclaiming the physical retail space...",
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400&auto=format&fit=crop',
    author: {
        name: "Ankita Saxena",
        role: "Marketing Strategist",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop"
    },
    content: (
        <div className="space-y-8">
            <p className="text-xl leading-relaxed text-white/90">
                The death of physical retail has been greatly exaggerated. Instead of disappearing, physical stores are evolving into high-tech "Experience Centers."
            </p>
            <h2 className="text-3xl font-bold text-[#76ABB8]">The Omnichannel Reality</h2>
            <p>
                Modern consumers don't think in terms of "online" or "offline." They think in terms of convenience. A customer might see a product on Instagram, research it on a blog (like this one!), and then visit a store to feel the material before finally ordering it via an app for home delivery.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h4 className="text-[#76ABB8] font-bold mb-2">Dark Stores</h4>
                    <p className="text-sm text-white/60">Using retail space as hyper-local fulfillment centers for 10-minute deliveries.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h4 className="text-[#76ABB8] font-bold mb-2">Smart Fitting Rooms</h4>
                    <p className="text-sm text-white/60">AR-powered mirrors that allow customers to "try on" digital inventories.</p>
                </div>
            </div>
            <p>
                Companies like Lenskart and Nykaa in India have mastered this transition. By using online data to decide where to open a physical store, they minimize risk and maximize footfall. The "Clicks to Bricks" movement is the ultimate validation of the hybrid business model.
            </p>
        </div>
    )
  },
  {
    id: 'indigo-domination',
    category: 'BUSINESS',
    date: 'September 27, 2025',
    readTime: '10 Min Read',
    title: "IndiGo Airlines: Domination, Drama, And Debt",
    snippet: "If IndiGo airlines were a college student, they'd be the topper who everyone notices. Let's dive into the operational efficiency that defines them...",
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?q=80&w=400&auto=format&fit=crop',
    author: {
        name: "Punit G",
        role: "Ex-VP @ OYO | Growth Expert",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&auto=format&fit=crop"
    },
    content: (
        <div className="space-y-8">
            <p className="text-xl leading-relaxed text-white/90">
                In an industry where players like Jet Airways and Kingfisher collapsed under their own weight, IndiGo (InterGlobe Aviation) stands as a titan of operational discipline.
            </p>
            <h2 className="text-3xl font-bold text-[#76ABB8]">The Power of One</h2>
            <p>
                IndiGo's primary secret is simplicity. By operating almost exclusively with the Airbus A320 family, they achieve massive economies of scale in maintenance, training, and spare parts management. Every minute an aircraft spends on the ground is lost revenue. IndiGo's "Turnaround Time" (TAT) is among the best in the world.
            </p>
            <h2 className="text-3xl font-bold text-[#76ABB8]">Scale vs. Sentiment</h2>
            <p>
                IndiGo isn't known for luxury; it's known for punctuality. In a market like India, "On Time" is the ultimate luxury. However, rapid expansion comes with massive lease liabilities and debt. We explore how they balance the ledger against rising fuel costs and a weakening rupee.
            </p>
            <p>
                With a market share exceeding 60%, IndiGo is moving from a domestic leader to an international challenger. The question remains: Can their low-cost model survive the long-haul journey?
            </p>
        </div>
    )
  }
];

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
}

export const SPONSORS: Sponsor[] = [
  { id: '1', name: 'Notion', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png' },
  { id: '2', name: 'Finlatics', logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQG5m_YhVbLhRA/company-logo_200_200/company-logo_200_200/0/1630576395988?e=2147483647&v=beta&t=M8-9e6L_u9tP4wO6m9C-N9kYV_5_E-E-E-E' },
  { id: '3', name: 'Unstop', logo: 'https://d8it4huxumps7.cloudfront.net/uploads/images/63d7a8d5c7c22_unstop_logo_blue.png' },
  { id: '4', name: 'Internshala', logo: 'https://internshala.com/static/images/common/internshala_logo.png' },
  { id: '5', name: 'StockGro', logo: 'https://www.stockgro.club/wp-content/uploads/2021/05/StockGro-Logo.png' },
  { id: '6', name: 'Interview Buddy', logo: 'https://media.licdn.com/dms/image/v2/C510BAQHGj6G_8j6G6g/company-logo_200_200/company-logo_200_200/0/1630656885362?e=2147483647&v=beta&t=I-H-S-T-I-G-E-R' },
  { id: '7', name: 'Campus Times', logo: 'https://www.campustimespune.com/wp-content/uploads/2015/06/Campus-Times-Pune-Logo-Transparent.png' },
  { id: '8', name: 'Bluelearn', logo: 'https://media.licdn.com/dms/image/C4D0BAQF_u_5z_5_5_w/company-logo_200_200/0/1626265435967?e=2147483647&v=beta&t=I-H-S-T-I-G-E-R' },
  { id: '9', name: 'NoticeBard', logo: 'https://media.licdn.com/dms/image/v2/C560BAQF8q8R8W8Qw/company-logo_200_200/company-logo_200_200/0/1630656885362?e=2147483647&v=beta&t=I-H-S-T-I-G-E-R' },
  { id: '10', name: 'Startup Talky', logo: 'https://startuptalky.com/content/images/2021/04/StartupTalky-Logo-1.png' },
  { id: '11', name: 'Bazarville', logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQG5m_YhVbLhRA/company-logo_200_200/company-logo_200_200/0/1630576395988?e=2147483647&v=beta&t=M8-9e6L_u9tP4wO6m9C-N9kYV_5_E-E-E-E' },
  { id: '12', name: 'Yashvi Foundation', logo: 'https://media.licdn.com/dms/image/v2/C4E0BAQHkE1Y6q5_8wA/company-logo_200_200/company-logo_200_200/0/1630656885362?e=2147483647&v=beta&t=I-H-S-T-I-G-E-R' },
  { id: '13', name: 'Markoknow', logo: 'https://media.licdn.com/dms/image/v2/C560BAQF8q8R8W8Qw/company-logo_200_200/company-logo_200_200/0/1630656885362?e=2147483647&v=beta&t=I-H-S-T-I-G-E-R' },
  { id: '14', name: 'Stock Edge', logo: 'https://www.stockedge.com/assets/img/logo.png' },
  { id: '15', name: 'Startup News', logo: 'https://startupnews.fyi/wp-content/uploads/2020/02/SN-Logo.png' },
  { id: '16', name: 'Blunt', logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQGkKqE8O8W8Qw/company-logo_200_200/company-logo_200_200/0/1630656885362?e=2147483647&v=beta&t=I-H-S-T-I-G-E-R' },
];

export const STATS = [
  {
    count: '4+',
    label: 'Cities',
    icon: (
      <svg className="w-12 h-12 text-[#A7EBF2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    count: '20+',
    label: 'Startups',
    icon: (
      <svg className="w-12 h-12 text-[#A7EBF2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    count: '4000+',
    label: 'Students',
    icon: (
      <svg className="w-12 h-12 text-[#A7EBF2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export const INITIATIVES = [
  {
    title: 'Startup Incubation',
    description: 'We provide mentorship, resources, and workspace to help turn your ideas into successful startups.',
    icon: (
      <svg className="w-8 h-8 text-[#02142C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'E-Learning Program',
    description: 'Access to courses, workshops, and learning materials to develop entrepreneurial skills.',
    icon: (
      <svg className="w-8 h-8 text-[#02142C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    highlighted: true,
  },
  {
    title: 'Networking Events',
    description: 'Regular meetups with successful entrepreneurs, investors, and industry experts.',
    icon: (
      <svg className="w-8 h-8 text-[#02142C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
];
