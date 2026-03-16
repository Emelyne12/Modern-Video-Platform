# Modern Video Platform

Live URL: add your deployed link here after you publish the project.

This project is a modern video platform built with React and styled to feel similar to YouTube. It uses the YouTube v3 API from RapidAPI to load videos, channels, search results, and related content.

The app was built to show:

- API fetching with Axios
- caching and loading states with TanStack Query
- reusable React components
- responsive design for phone, tablet, and desktop
- better project structure and clear Git commits

## Main Features

- Sticky top navbar with logo and search
- Search suggestions while typing
- Sidebar category menu
- Horizontal category filter pills
- Feed page with a responsive video grid
- Video details page with player, stats, description, and related videos
- Channel details page with banner, avatar, subscribers, and uploads
- Loader and error messages when data is still loading or fails
- Full-screen button for the video player

## Tech Used

- React
- Vite
- React Router DOM
- Axios
- TanStack Query

## Folder Structure

```text
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

## What Each Part Does

- `src/components`: reusable UI parts like the navbar, cards, sidebar, and loader
- `src/pages`: the main screens of the app
- `src/utils/fetchFromAPI.js`: Axios setup for RapidAPI requests
- `src/utils/formatters.js`: helper functions for duration, views, and subscribers
- `src/constants/categories.js`: category names used in the sidebar and pills
- `src/vite.css`: the main styling file for the whole app

## How To Run It Locally

1. Install the packages:

```bash
npm install
```

2. Create a `.env` file in the project root.

3. Add your RapidAPI key inside the `.env` file:

```bash
VITE_RAPID_API_KEY=your_rapidapi_key_here
REACT_APP_RAPID_API_KEY=your_rapidapi_key_here
```

4. Restart the Vite dev server after creating or editing `.env` so the key is picked up.

5. Start the project:

```bash
npm run dev
```

6. Build the project for production:

```bash
npm run build
```

## API Notes

- Base URL: `https://youtube-v31.p.rapidapi.com`
- API calls are handled in `src/utils/fetchFromAPI.js`
- TanStack Query stores fetched data in cache so the app does not make the same request again and again

## Deployment

You can deploy this project on Vercel, Netlify, or GitHub Pages.

After deployment, replace the `Live URL` text at the top of this README with your real website link.

## Commit History In Easy English

1. `5d978e3` - Started the project and installed the main packages.
2. `1cd7203` - Set up Vite so the app can run and build.
3. `e0ce0f5` - Added ESLint and ignore rules for cleaner development.
4. `b195eb3` - Added the public icon files used by the app.
5. `122ee00` - Replaced the starter app with the main route layout.
6. `65671ee` - Added React Router and React Query provider setup.
7. `3d2aeaa` - Created the Axios API file for RapidAPI requests.
8. `17c999b` - Added helper functions for formatting duration, views, and subscribers.
9. `701b2ba` - Added the category lists used in the sidebar and filter pills.
10. `8f8f45c` - Added a reusable loading spinner component.
11. `338905e` - Built the top navbar with the app logo and search area.
12. `f76724e` - Added the sidebar menu for video categories.
13. `fe6c408` - Added horizontal category buttons at the top of the feed.
14. `24e1685` - Built the search bar and added live search suggestions.
15. `2d992eb` - Created the channel card component.
16. `983e9c0` - Created the video card component with thumbnail and metadata.
17. `df247b8` - Added the grid component that can show both videos and channels.
18. `41839d6` - Added the video player with a full-screen button.
19. `773f1f1` - Built the home feed page with cached API loading.
20. `6f08d4c` - Built the search results page.
21. `d38d046` - Built the video details page and related videos section.
22. `a5e9a67` - Built the channel details page and uploads section.
23. `922b78b` - Added the main responsive styling to make the app look modern.
24. `cea76ad` - Wrote the README and added the `.env.example` file.
25. `83cd1e4` - Kept the original starter assets and old style files in the repo archive.

## Final Check

- `npm run lint` passed
- `npm run build` passed
