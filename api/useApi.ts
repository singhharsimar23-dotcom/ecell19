/**
 * API Hooks - Backend Integration Points
 * ======================================
 * These placeholder functions/hooks are where the Backend Developer
 * should plug in their API calls. Replace the mock implementations
 * with actual fetch/axios calls to your backend.
 *
 * Base URL: Use import.meta.env.VITE_API_URL (set in .env)
 * Example: const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
 */

import type { TeamMember, EventItem, BlogPost, Sponsor, SpeakerItem } from '../constants';

// ---------------------------------------------------------------------------
// CONFIG: Backend Developer - Set your API base URL in .env
// ---------------------------------------------------------------------------
const getApiBase = (): string => {
  return import.meta.env.VITE_API_URL || '';
};

// ---------------------------------------------------------------------------
// TEAM MEMBERS API
// Used by: MeetOurTeam, TeamsExplorer, Dashboard
// ---------------------------------------------------------------------------

/**
 * Fetch all team members from API.
 * Replace with: GET /api/team or GET /api/members
 */
export async function fetchTeamMembers(): Promise<TeamMember[]> {
  // TODO: Backend - Replace with actual API call
  // const res = await fetch(`${getApiBase()}/api/team`);
  // if (!res.ok) throw new Error('Failed to fetch team');
  // return res.json();
  return []; // Placeholder - app uses constants.tsx data when empty
}

/**
 * Create a new team member.
 * Replace with: POST /api/team
 */
export async function createTeamMember(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
  // TODO: Backend - Replace with actual API call
  // const res = await fetch(`${getApiBase()}/api/team`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(member),
  // });
  // return res.json();
  throw new Error('API not connected - Backend developer: implement POST /api/team');
}

/**
 * Update an existing team member.
 * Replace with: PUT /api/team/:id or PATCH /api/team/:id
 */
export async function updateTeamMember(id: string, member: Partial<TeamMember>): Promise<TeamMember> {
  // TODO: Backend - Replace with actual API call
  // const res = await fetch(`${getApiBase()}/api/team/${id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(member),
  // });
  // return res.json();
  throw new Error('API not connected - Backend developer: implement PUT /api/team/:id');
}

/**
 * Delete a team member.
 * Replace with: DELETE /api/team/:id
 */
export async function deleteTeamMember(id: string): Promise<void> {
  // TODO: Backend - Replace with actual API call
  // await fetch(`${getApiBase()}/api/team/${id}`, { method: 'DELETE' });
  throw new Error('API not connected - Backend developer: implement DELETE /api/team/:id');
}

// ---------------------------------------------------------------------------
// EVENTS API
// Used by: OurEvents, Dashboard
// ---------------------------------------------------------------------------

/**
 * Fetch all events from API.
 * Replace with: GET /api/events
 */
export async function fetchEvents(): Promise<EventItem[]> {
  // TODO: Backend - Replace with actual API call
  // const res = await fetch(`${getApiBase()}/api/events`);
  // return res.json();
  return [];
}

/**
 * Create a new event.
 * Replace with: POST /api/events
 */
export async function createEvent(event: Omit<EventItem, 'id'>): Promise<EventItem> {
  // TODO: Backend - Replace with actual API call
  throw new Error('API not connected - Backend developer: implement POST /api/events');
}

/**
 * Update an event.
 * Replace with: PUT /api/events/:id
 */
export async function updateEvent(id: string, event: Partial<EventItem>): Promise<EventItem> {
  // TODO: Backend - Replace with actual API call
  throw new Error('API not connected - Backend developer: implement PUT /api/events/:id');
}

/**
 * Delete an event.
 * Replace with: DELETE /api/events/:id
 */
export async function deleteEvent(id: string): Promise<void> {
  // TODO: Backend - Replace with actual API call
  throw new Error('API not connected - Backend developer: implement DELETE /api/events/:id');
}

// ---------------------------------------------------------------------------
// BLOGS API
// Used by: LandingBlogs, BlogsExplorer, Dashboard
// ---------------------------------------------------------------------------

/**
 * Fetch all blog posts from API.
 * Replace with: GET /api/blogs
 */
export async function fetchBlogs(): Promise<BlogPost[]> {
  // TODO: Backend - Replace with actual API call
  return [];
}

/**
 * Fetch a single blog post by ID.
 * Replace with: GET /api/blogs/:id
 */
export async function fetchBlogById(id: string): Promise<BlogPost | null> {
  // TODO: Backend - Replace with actual API call
  return null;
}

/**
 * Create a new blog post.
 * Replace with: POST /api/blogs
 */
export async function createBlog(blog: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  // TODO: Backend - Replace with actual API call
  throw new Error('API not connected - Backend developer: implement POST /api/blogs');
}

/**
 * Update a blog post.
 * Replace with: PUT /api/blogs/:id
 */
export async function updateBlog(id: string, blog: Partial<BlogPost>): Promise<BlogPost> {
  // TODO: Backend - Replace with actual API call
  throw new Error('API not connected - Backend developer: implement PUT /api/blogs/:id');
}

/**
 * Delete a blog post.
 * Replace with: DELETE /api/blogs/:id
 */
export async function deleteBlog(id: string): Promise<void> {
  // TODO: Backend - Replace with actual API call
  throw new Error('API not connected - Backend developer: implement DELETE /api/blogs/:id');
}

// ---------------------------------------------------------------------------
// SPONSORS API
// Used by: Sponsors
// ---------------------------------------------------------------------------

/**
 * Fetch all sponsors from API.
 * Replace with: GET /api/sponsors
 */
export async function fetchSponsors(): Promise<Sponsor[]> {
  // TODO: Backend - Replace with actual API call
  return [];
}

// ---------------------------------------------------------------------------
// SPEAKERS API
// Used by: PastSpeakers
// ---------------------------------------------------------------------------

/**
 * Fetch all past speakers from API.
 * Replace with: GET /api/speakers
 */
export async function fetchSpeakers(): Promise<SpeakerItem[]> {
  // TODO: Backend - Replace with actual API call
  return [];
}

// ---------------------------------------------------------------------------
// AUTH API
// Used by: AuthPage
// ---------------------------------------------------------------------------

/**
 * Login - Submit credentials to backend.
 * Replace with: POST /api/auth/login
 */
export async function login(email: string, password: string): Promise<{ token: string; user: object }> {
  // TODO: Backend - Replace with actual API call
  // const res = await fetch(`${getApiBase()}/api/auth/login`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password }),
  // });
  // return res.json();
  throw new Error('API not connected - Backend developer: implement POST /api/auth/login');
}

/**
 * Register - Create new account.
 * Replace with: POST /api/auth/register
 */
export async function register(name: string, email: string, password: string): Promise<{ token: string; user: object }> {
  // TODO: Backend - Replace with actual API call
  throw new Error('API not connected - Backend developer: implement POST /api/auth/register');
}

// ---------------------------------------------------------------------------
// CONTACT FORM API
// Used by: ContactUs
// ---------------------------------------------------------------------------

/**
 * Submit contact form.
 * Replace with: POST /api/contact
 */
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<{ success: boolean }> {
  // TODO: Backend - Replace with actual API call
  // const res = await fetch(`${getApiBase()}/api/contact`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // return res.json();
  throw new Error('API not connected - Backend developer: implement POST /api/contact');
}

