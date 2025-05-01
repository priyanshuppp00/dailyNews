# DailyNews React + Vite Project

This is a React-based news application built with Vite. It fetches news articles from the NewsAPI and displays them with support for categories, search, and infinite scrolling.

## Features

- React 19 with Vite for fast development and build
- TailwindCSS for styling
- NewsAPI integration for fetching news articles
- Category selection and search functionality
- Infinite scroll to load more news articles
- Dark mode toggle support

## Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the project for production (outputs to `dist` folder)
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code quality issues

## Deployment

The project is configured for deployment on both Vercel and Netlify.

### Vercel

- Uses `vercel.json` configuration
- Build output directory: `dist`
- Deploy with Vercel CLI:
  ```
  npm install -g vercel
  vercel --prod
  ```

### Netlify

- Uses `netlify.toml` configuration
- Build output directory: `dist`
- Deploy with Netlify CLI:
  ```
  npm install -g netlify-cli
  netlify deploy --prod --dir=dist
  ```

## API Key

The NewsAPI key is currently hardcoded in the source code (`src/components/News.jsx`). For production use, consider moving the API key to environment variables for better security.

## Troubleshooting

- If news articles do not load in production, check the browser console for error messages.
- Common issues include CORS restrictions or API key limitations.
- The app logs detailed error messages to the console to help diagnose issues.

## License

This project is open source and free to use.
