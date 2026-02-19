# Backend Integration Guide: E-Cell VIT Bhopal

This document outlines the necessary steps and data structures required to connect the redesigned frontend to a functional backend.

## 1. API Architecture Recommendation
The frontend currently uses a mock state management system in `Dashboard.tsx`. We recommend a RESTful or GraphQL API to handle data persistence.

### Core Endpoints Required:
- `GET /api/members`: Fetch all team members (Board, Faculty, Sub-teams).
- `POST /api/members`: Create a new member.
- `PATCH /api/members/:id`: Update existing member.
- `DELETE /api/members/:id`: Remove a member.
- `GET /api/events`: Fetch all curated events.
- `POST /api/events`: Publish a new event.
- `GET /api/blogs`: Fetch all editorial blog posts.

## 2. Data Models (TS Interfaces)

### Team Member
```typescript
interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string; // faculty, Board Members, Technical, etc.
  image: string;    // URL to image
  linkedin: string; // URL
}
```

### Event Item
```typescript
interface EventItem {
  id: string;
  title: string;
  description: string;
  image: string;
  layout: 'image-first' | 'text-first'; // Controls dashboard/gallery rendering
}
```

### Blog Post
```typescript
interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  snippet: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: React.ReactNode | string; // Backend should store as HTML or Markdown string
}
```

## 3. Integration Points

### Admin Dashboard (`Dashboard.tsx`)
- **Action**: Replace `useState` hooks with calls to your API client (e.g., `axios` or `fetch`).
- **Authentication**: The dashboard is currently gated by a local `authenticated` state. Integrate your JWT or OAuth flow here.

### Public Sections (`Hero.tsx`, `Sponsors.tsx`, `OurEvents.tsx`)
- These components should fetch data on mount or via a global state provider (Redux/Context API).
- **Note**: The "Know More" buttons on the Hero and Event cards are ready to be linked to dynamic route navigations.

## 4. Performance Considerations
- **Image Optimization**: Ensure the backend/CDN provides optimized WebP versions of images.
- **Caching**: Implement SWR or React Query on the frontend to cache these dynamic resources and maintain the "liquid-smooth" feel established in the redesign.

## 5. Security
- Ensure all `POST`, `PATCH`, and `DELETE` requests are protected by server-side authentication.
- Sanitize all content input (especially Blog content) to prevent XSS.
