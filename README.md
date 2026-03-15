# Modern Video Platform

Live URL: Add your deployed URL here after deployment (Vercel/Netlify/GitHub Pages).

This project is an advanced React video platform inspired by YouTube. It fetches data from the YouTube v3 API (RapidAPI), uses Axios for API calls, and TanStack Query for caching + async state handling.

## Features

- Sticky navbar with search input and live search suggestions.
- Sidebar category navigation and horizontal category filter pills.
- Feed page with responsive video grid.
- Search results page for videos and channels.
- Video details page with embedded player, full-screen toggle, stats, and related videos.
- Channel details page with profile, subscriber count, banner, and uploaded videos.
- Loading and error states handled with TanStack Query.
- Fully responsive layout for mobile, tablet, and desktop.

## Tech Stack

- React + Vite
- React Router DOM
- Axios
- @tanstack/react-query

## Project Structure

```bash
src/
	components/
		Navbar.jsx
		SearchBar.jsx
		Sidebar.jsx
		CategoryPills.jsx
		VideoCard.jsx
		ChannelCard.jsx
		VideoPlayer.jsx
		Videos.jsx
		Loader.jsx
	pages/
		Feed.jsx
		SearchFeed.jsx
		VideoDetail.jsx
		ChannelDetail.jsx
	utils/
		fetchFromAPI.js
		formatters.js
	constants/
		categories.js
	App.jsx
	main.jsx
	vite.css
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file in the project root:

```bash
cp .env.example .env
```

3. Add your RapidAPI key inside `.env`:

```bash
VITE_RAPID_API_KEY=your_rapidapi_key_here
REACT_APP_RAPID_API_KEY=your_rapidapi_key_here
```

4. Start development server:

```bash
npm run dev
```

5. Build production bundle:

```bash
npm run build
```

## API Notes

- Base URL: `https://youtube-v31.p.rapidapi.com`
- API utility lives in `src/utils/fetchFromAPI.js`
- Query caching is handled by TanStack Query to avoid duplicate requests when revisiting pages.

## Deployment

Deploy this project to Vercel, Netlify, or GitHub Pages.

After deployment, update the `Live URL` line at the top of this README with your real deployed link.
