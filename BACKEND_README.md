# Backend Integration Guide - E-Cell VIT Bhopal

This document describes how to connect your backend API to this frontend application.

---

## 1. Local Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Running the Frontend
```bash
# Install dependencies
npm install

# Create .env file (copy from env.example.txt)
# Add: VITE_API_URL=http://localhost:YOUR_PORT/api

# Start dev server (runs on http://localhost:3000)
npm run dev
```

### Connecting Your Backend
1. Start your backend server (e.g., on port 8000)
2. Create a `.env` file in the project root:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```
3. Restart the frontend dev server (`npm run dev`)
4. The frontend will use `import.meta.env.VITE_API_URL` for all API calls

### CORS
Ensure your backend allows requests from `http://localhost:3000` (and your production domain). Example for Express:
```javascript
app.use(cors({ origin: ['http://localhost:3000', 'https://yourdomain.com'] }));
```

---

## 2. Components That Require Data

| Component | Data Source | API Hooks Location |
|-----------|-------------|-------------------|
| **MeetOurTeam** | Team members | `api/useApi.ts` → `fetchTeamMembers` |
| **TeamsExplorer** | Team members by category | Same as above |
| **OurEvents** | Events list | `fetchEvents` |
| **LandingBlogs** | Blog posts (first 3) | `fetchBlogs` |
| **BlogsExplorer** | All blog posts | `fetchBlogs` |
| **PastSpeakers** | Speakers list | `fetchSpeakers` |
| **Sponsors** | Sponsors list | `fetchSponsors` |
| **ContactUs** | Form submission | `submitContactForm` |
| **AuthPage** | Login/Register | `login`, `register` |
| **Dashboard** | CRUD for members, events, blogs | All create/update/delete functions |

---

## 3. Expected Data Structures (JSON)

### Team Member
```json
{
  "id": "string",
  "name": "string",
  "role": "string",
  "image": "string (URL)",
  "category": "string (e.g. 'faculty', 'Board Members', 'Tech Team')"
}
```

### Event
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "image": "string (URL)",
  "layout": "image-first" | "text-first"
}
```

### Blog Post
```json
{
  "id": "string",
  "title": "string",
  "category": "string",
  "date": "string",
  "readTime": "string",
  "snippet": "string",
  "image": "string (URL)",
  "author": {
    "name": "string",
    "role": "string",
    "avatar": "string (URL)"
  },
  "content": "string or HTML"
}
```

### Sponsor
```json
{
  "id": "string",
  "name": "string",
  "logo": "string (URL)"
}
```

### Speaker
```json
{
  "id": "string",
  "name": "string",
  "title": "string",
  "image": "string (URL)"
}
```

### Auth Response (Login/Register)
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  }
}
```

### Contact Form Payload
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "message": "string"
}
```

---

## 4. API Endpoints to Implement

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/team` | Fetch all team members |
| POST | `/api/team` | Create team member |
| PUT | `/api/team/:id` | Update team member |
| DELETE | `/api/team/:id` | Delete team member |
| GET | `/api/events` | Fetch all events |
| POST | `/api/events` | Create event |
| PUT | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Delete event |
| GET | `/api/blogs` | Fetch all blog posts |
| GET | `/api/blogs/:id` | Fetch single blog |
| POST | `/api/blogs` | Create blog post |
| PUT | `/api/blogs/:id` | Update blog post |
| DELETE | `/api/blogs/:id` | Delete blog post |
| GET | `/api/sponsors` | Fetch all sponsors |
| GET | `/api/speakers` | Fetch all past speakers |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Register |
| POST | `/api/contact` | Submit contact form |

---

## 5. Where to Plug In Your API

All placeholder functions are in **`api/useApi.ts`**. Each function has:
- A `// TODO: Backend` comment
- Example fetch code (commented out)
- The expected request/response shape

**Example - Replacing `fetchTeamMembers`:**
```typescript
export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const base = import.meta.env.VITE_API_URL;
  if (!base) return []; // Fallback to constants when no API configured
  const res = await fetch(`${base}/team`);
  if (!res.ok) throw new Error('Failed to fetch team');
  return res.json();
}
```

---

## 6. App.tsx Integration Points

The main `App.tsx` currently initializes state from `constants.tsx`:
- `members` ← TEAM + MOCK_TEAM_MEMBERS
- `events` ← EVENTS
- `blogs` ← BLOG_POSTS

**To switch to API data**, replace the initial state with a `useEffect` that calls the fetch functions on mount. Example:
```tsx
useEffect(() => {
  fetchTeamMembers().then(setMembers).catch(console.error);
}, []);
```

---

## 7. Buttons & Actions (Frontend → Backend Mapping)

| UI Element | Action | Backend Route |
|------------|--------|---------------|
| Auth "Sign In" button | Login | POST /api/auth/login |
| Auth "Create Account" button | Register | POST /api/auth/register |
| Contact "SEND" button | Submit form | POST /api/contact |
| Dashboard "Add Member" | Create member | POST /api/team |
| Dashboard "Edit" (member) | Update member | PUT /api/team/:id |
| Dashboard "Delete" (member) | Delete member | DELETE /api/team/:id |
| Dashboard "Add Event" | Create event | POST /api/events |
| Dashboard "Edit" (event) | Update event | PUT /api/events/:id |
| Dashboard "Delete" (event) | Delete event | DELETE /api/events/:id |
| Dashboard "New Article" | Create blog | POST /api/blogs |
| Dashboard "Edit" (blog) | Update blog | PUT /api/blogs/:id |
| Dashboard "Delete" (blog) | Delete blog | DELETE /api/blogs/:id |

---

## 8. Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes (when using API) | Base URL for your API, e.g. `http://localhost:8000/api` |
| `GEMINI_API_KEY` | No | Only if frontend uses Gemini AI (legacy from AI Studio) |

**Note:** Vite only exposes variables prefixed with `VITE_` to the client. Use `import.meta.env.VITE_API_URL` in code.

---

## 9. Current Behavior (Without Backend)

- All data is loaded from `constants.tsx` (mock data)
- Auth simulates success with `setTimeout`
- Contact form does not submit
- Dashboard CRUD updates local React state only (not persisted)

Once you implement the API and wire up `api/useApi.ts`, the app will use your backend for all data operations.

