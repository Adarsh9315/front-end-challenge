# Movie Nomination App

A modern React application for searching movies and managing nominations using the OMDB (Open Movies Database) API.

## Features

- 🔍 Search movies using the OMDB API
- ⭐ Nominate up to 5 favorite movies
- 💾 Persistent storage using localStorage
- 🎨 Modern, responsive UI with Bootstrap 5
- ♿ Accessible design with ARIA labels and keyboard navigation
- ⚡ Fast development with Vite
- 🔒 Secure API key management with environment variables

## Tech Stack

- **React 18** - Latest React with concurrent features
- **Vite** - Next-generation frontend tooling
- **Bootstrap 5** - Modern CSS framework
- **React Simple Snackbar** - Toast notifications

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Install dependencies:
```bash
yarn install
# or
npm install
```

2. Set up environment variables (optional):
```bash
cp .env.example .env
# Edit .env and add your OMDB API key
```

If you don't provide an API key, the app will use a default demo key.

### Running the App

Start the development server:
```bash
yarn dev
# or
npm run dev
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
yarn build
# or
npm run build
```

Preview the production build:
```bash
yarn preview
# or
npm run preview
```

## How to Use

1. **Search Movies**: Type in the search box to find movies
2. **Nominate Movies**: Click "Add Nomination" on any movie (up to 5 nominations)
3. **Remove Nominations**: Click "Remove Nomination" to remove a movie from your nominations
4. **View Nominations**: Your nominations are saved locally and persist across sessions

## Project Structure

```
src/
├── components/
│   ├── AddNomination.js      # Button component for adding nominations
│   ├── MovieList.js          # Component for displaying movie lists
│   ├── MovieListHeading.js   # Section heading component
│   ├── RemoveNominations.js # Button component for removing nominations
│   └── SearchBox.js          # Search input component
├── App.js                    # Main application component
├── App.css                   # Application styles
└── index.js                  # Application entry point
```

## Modernization Improvements

- ✅ Upgraded from React 17 to React 18
- ✅ Migrated from Create React App to Vite
- ✅ Upgraded Bootstrap from v4 to v5
- ✅ Fixed security issues (HTTPS API calls, environment variables)
- ✅ Improved code quality (removed inline styles, better error handling)
- ✅ Added loading states and error handling
- ✅ Enhanced accessibility (ARIA labels, keyboard navigation)
- ✅ Added debounced search for better performance
- ✅ Improved responsive design
- ✅ Better user feedback with snackbar notifications

## License

MIT
