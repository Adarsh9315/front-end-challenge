# Movie Showdown Feature

## Overview
A new interactive voting feature has been added to the movie nomination app that allows fans to vote on their favorite movies in head-to-head matchups.

## Features

### 1. **Movie Showdown Page**
- Accessible via navigation button at the top of the app
- Presents two randomly selected movies from your nominations
- Side-by-side comparison with movie posters, titles, and years
- Real-time vote counting

### 2. **Voting System**
- Click "Vote for this!" button to vote for your preferred movie
- Winner animation displays after each vote
- Automatic progression to next matchup after 2 seconds
- Vote counts persist in localStorage

### 3. **Leaderboard**
- Displays top 5 most voted movies
- Shows ranking, movie poster, title, year, and vote count
- Updates in real-time as votes are cast
- Hover effects for better interactivity

### 4. **Controls**
- **Skip This Matchup**: Get a new random pair of movies
- **Reset All Votes**: Clear all voting history and start fresh

### 5. **Smart Features**
- Requires at least 2 nominated movies to start
- Helpful message if not enough movies are nominated
- Responsive design that works on different screen sizes
- Smooth animations and transitions

## How to Use

1. **Navigate to Nominations Page**
   - Search and nominate your favorite movies (minimum 2 required)

2. **Switch to Movie Showdown**
   - Click the "Movie Showdown" button in the navigation

3. **Start Voting**
   - Two random movies from your nominations will appear
   - Click "Vote for this!" on your preferred movie
   - Watch the winner animation
   - New matchup loads automatically

4. **Track Results**
   - Scroll down to see the leaderboard
   - View which movies are winning the most votes

5. **Manage Votes**
   - Use "Skip This Matchup" to see different movies
   - Use "Reset All Votes" to start voting from scratch

## Technical Implementation

### New Files Created
- `src/components/MovieShowdown.js` - Main showdown component
- Extensive CSS styling added to `src/App.css`

### Modified Files
- `src/App.js` - Added navigation and view switching logic

### Data Storage
- Votes stored in localStorage under key `movieVotes`
- Persists across browser sessions
- Works alongside existing nominations storage

### Key Technologies
- React Hooks (useState, useEffect)
- LocalStorage API
- CSS animations and transitions
- Responsive flexbox layout

## Running the Application

To start the development server with Node 22 compatibility:

```bash
NODE_OPTIONS=--openssl-legacy-provider npm start
```

The app will be available at http://localhost:3000

## Future Enhancements (Optional)
- Add tournament bracket mode
- Share voting results
- Export leaderboard as image
- Add voting statistics and analytics
- Implement voting time limits
- Add sound effects for votes
