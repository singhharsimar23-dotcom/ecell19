/**
 * E-CELL VIT BHOPAL - API INTEGRATION CONTRACT (v1.0)
 * ===================================================
 * 
 * TO THE BACKEND DEVELOPER:
 * This file serves as the single source of truth for the frontend-backend connection.
 * Replace the empty implementations below with your fetch/axios logic.
 * 
 * AUTHENTICATION:
 * All 'protected' routes (Dashboard operations) should expect a Bearer Token.
 * 
 * DATA SEEDING:
 * If these functions return an empty array [], the app will fall back to using 
 * the static data in `constants.tsx`.
 */

import type { TeamMember, EventItem, BlogPost, Sponsor, SpeakerItem } from '../constants';

const getApiBase = (): string => import.meta.env.VITE_API_URL || '';

// ---------------------------------------------------------------------------
// 1. TEAM MANAGEMENT
// ---------------------------------------------------------------------------

/**
 * GET /api/team
 * Response: Array<TeamMember>
 */
export async function fetchTeamMembers(): Promise<TeamMember[]> {
  // const res = await fetch(`${getApiBase()}/api/team`);
  // return res.ok ? res.json() : [];
  return [];
}

/**
 * POST /api/team
 * Request Body: { name: string, role: string, category: string, image: string, linkedin: string }
 */
export async function createTeamMember(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
  throw new Error('Endpoint POST /api/team not implemented');
}

/**
 * PUT /api/team/:id
 */
export async function updateTeamMember(id: string, member: Partial<TeamMember>): Promise<TeamMember> {
  throw new Error(`Endpoint PUT /api/team/${id} not implemented`);
}

/**
 * DELETE /api/team/:id
 */
export async function deleteTeamMember(id: string): Promise<void> {
  throw new Error(`Endpoint DELETE /api/team/${id} not implemented`);
}

// ---------------------------------------------------------------------------
// 2. EVENTS (Landing Page & Dashboard)
// ---------------------------------------------------------------------------

/**
 * GET /api/events
 * Response: Array<EventItem>
 */
export async function fetchEvents(): Promise<EventItem[]> {
  return [];
}

/**
 * POST /api/events
 * Request Body: { title: string, description: string, image: string, layout: 'image-first' | 'text-first' }
 */
export async function createEvent(event: Omit<EventItem, 'id'>): Promise<EventItem> {
  throw new Error('Endpoint POST /api/events not implemented');
}

/**
 * PUT /api/events/:id
 */
export async function updateEvent(id: string, event: Partial<EventItem>): Promise<EventItem> {
  throw new Error(`Endpoint PUT /api/events/${id} not implemented`);
}

/**
 * DELETE /api/events/:id
 */
export async function deleteEvent(id: string): Promise<void> {
  throw new Error(`Endpoint DELETE /api/events/${id} not implemented`);
}

// ---------------------------------------------------------------------------
// 3. BLOGS (Editorial Section)
// ---------------------------------------------------------------------------

/**
 * GET /api/blogs
 * Response: Array<BlogPost>
 */
export async function fetchBlogs(): Promise<BlogPost[]> {
  return [];
}

/**
 * GET /api/blogs/:id
 */
export async function fetchBlogById(id: string): Promise<BlogPost | null> {
  return null;
}

/**
 * POST /api/blogs
 * Request Body: { title: string, category: string, date: string, readTime: string, snippet: string, image: string, author: { name, role, avatar }, content: string/html, layout: 'image-first' | 'text-first' }
 */
export async function createBlog(blog: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  throw new Error('Endpoint POST /api/blogs not implemented');
}

/**
 * PUT /api/blogs/:id
 */
export async function updateBlog(id: string, blog: Partial<BlogPost>): Promise<BlogPost> {
  throw new Error(`Endpoint PUT /api/blogs/${id} not implemented`);
}

/**
 * DELETE /api/blogs/:id
 */
export async function deleteBlog(id: string): Promise<void> {
  throw new Error(`Endpoint DELETE /api/blogs/${id} not implemented`);
}

// ---------------------------------------------------------------------------
// 4. SPONSORS & SPEAKERS (Static/Dynamic Lists)
// ---------------------------------------------------------------------------

/**
 * GET /api/sponsors
 */
export async function fetchSponsors(): Promise<Sponsor[]> {
  return [];
}

/**
 * GET /api/speakers
 */
export async function fetchSpeakers(): Promise<SpeakerItem[]> {
  return [];
}

// ---------------------------------------------------------------------------
// 5. AUTHENTICATION (Admin Console)
// ---------------------------------------------------------------------------

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
export async function login(email: string, password: string): Promise<{ token: string; user: object }> {
  throw new Error('Endpoint POST /api/auth/login not implemented');
}

/**
 * POST /api/auth/register
 */
export async function register(name: string, email: string, password: string): Promise<{ token: string; user: object }> {
  throw new Error('Endpoint POST /api/auth/register not implemented');
}

// ---------------------------------------------------------------------------
// 6. CONTACT FORM
// ---------------------------------------------------------------------------

/**
 * POST /api/contact
 * Body: { name, email, phone, message }
 */
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<{ success: boolean }> {
  throw new Error('Endpoint POST /api/contact not implemented');
}

