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
// 1. IMAGE UPLOADS
// ---------------------------------------------------------------------------

/**
 * POST /api/upload
 * Headers: { 'Content-Type': 'multipart/form-data' }
 * Body: FormData { file: Blob }
 * Response: { url: string }
 */
export async function uploadImage(file: File): Promise<string> {
  // const formData = new FormData();
  // formData.append('file', file);
  // const res = await fetch(`${getApiBase()}/api/upload`, {
  //   method: 'POST',
  //   body: formData,
  // });
  // const data = await res.json();
  // return data.url;
  throw new Error('Endpoint POST /api/upload not implemented');
}

// ---------------------------------------------------------------------------
// 2. TEAM MANAGEMENT (Dashboard)
// ---------------------------------------------------------------------------

/**
 * GET /api/team
 * Response: Array<TeamMember>
 */
export async function fetchTeamMembers(): Promise<TeamMember[]> {
  return [];
}

/**
 * POST /api/team
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
// 3. EVENTS (Dashboard)
// ---------------------------------------------------------------------------

/**
 * GET /api/events
 */
export async function fetchEvents(): Promise<EventItem[]> {
  return [];
}

/**
 * POST /api/events
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
// 4. BLOGS (Dashboard)
// ---------------------------------------------------------------------------

/**
 * GET /api/blogs
 */
export async function fetchBlogs(): Promise<BlogPost[]> {
  return [];
}

/**
 * POST /api/blogs
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
// 5. CONTACT FORM
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

