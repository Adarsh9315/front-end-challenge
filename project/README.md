# Todo Page Application

A modern, responsive todo list application built with Next.js 14, React, and TypeScript.

## Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Real-time statistics (active, completed, total)
- ✅ Responsive design with Tailwind CSS
- ✅ Dark mode support
- ✅ Keyboard shortcuts (Enter to add)
- ✅ Beautiful UI with smooth animations

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the todo page.

### Build

Create a production build:

```bash
npm run build
```

### Production

Start the production server:

```bash
npm start
```

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: React 18

## Project Structure

```
project/
├── app/
│   ├── globals.css       # Global styles and Tailwind directives
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Todo page component
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Usage

1. **Add a Todo**: Type your task in the input field and click "Add" or press Enter
2. **Complete a Todo**: Click the checkbox next to a todo to mark it as complete
3. **Delete a Todo**: Click the trash icon to remove a todo
4. **View Statistics**: See active, completed, and total todos at the top of the list

## Features in Detail

### State Management
- Uses React hooks (`useState`) for local state management
- Each todo has a unique ID based on timestamp
- Todos track text content and completion status

### User Interface
- Clean, modern design with gradient backgrounds
- Hover effects and smooth transitions
- Empty state with helpful message
- Responsive layout that works on all devices
- Dark mode support based on system preferences

### Interactions
- Keyboard support (Enter key to add todos)
- Visual feedback for hover and active states
- Strike-through text for completed todos
- Color-coded delete button with icon
