<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# E-Cell VIT Bhopal - Frontend

Migrated from AI Studio to Cursor. This is the frontend application for E-Cell VIT Bhopal.

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies: `npm install`
2. (Optional) Copy `env.example.txt` to `.env` and set:
   - `VITE_API_URL` - Your backend API base URL (e.g. `http://localhost:8000/api`)
   - `GEMINI_API_KEY` - Only if using Gemini AI features
3. Run the app: `npm run dev`
4. Open http://localhost:3000

## Backend Integration

See **[BACKEND_README.md](./BACKEND_README.md)** for:
- Components that require data
- Expected JSON data structures
- API endpoints to implement
- How to connect your local server

## Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Production build
- `npm run preview` - Preview production build
