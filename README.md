# Jobs4Pro

**Jobs4Pro** is a modern, premium job portal application built with React and Vite. It allows users to browse thousands of job opportunities from top companies, securely log in, filter jobs dynamically, and view detailed information for each listing.

## Features
- **Secure Authentication:** JWT-based login system with persistent cookie storage and protected routing.
- **Premium UI / UX:** Implements a modern "Glassmorphism" aesthetic with custom Google Fonts (`Outfit`), dynamic gradients, and smooth component animations.
- **Dark Mode Support:** A fully persistent, system-wide light/dark mode toggle.
- **Advanced Filtering:** Job seekers can easily filter listings by Employment Type, Minimum Salary Package, or use a responsive keyword search.
- **Detailed Job Views:** Each job listing expands into a dedicated detailed view showing skills, life at the company, and intelligently recommended similar jobs.

## Tech Stack
- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** Vanilla CSS (CSS Variables) + Bootstrap 5 Grid System
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Authentication Management:** `js-cookie`

## Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Application Structure

The application's source code is organized as follows to promote component reusability and separation of concerns:

```text
src/
├── components/
│   ├── home/               # Hero landing page for authenticated users
│   ├── job/                # Main dashboard displaying all job listings with search/filters
│   ├── jobItemDetails/     # In-depth view for a single job (skills, similar jobs, etc.)
│   ├── jobsCard/           # Reusable UI card for individual job previews
│   ├── jobsFilter/         # Sidebar component handling API-driven filter states
│   ├── login/              # Authentication portal and JWT management
│   ├── navbar/             # Responsive header, handles navigation and dark mode toggle
│   ├── notFound/           # Custom 404 error page for unmatched routes
│   └── protectedRoute/     # Higher-order component enforcing auth logic on routes
├── App.jsx                 # Core routing configuration (React Router)
├── main.jsx                # Application entry point
└── index.css               # Global styling, CSS variables, and Dark Mode theme configuration
```

## API Integrations

Jobs4Pro relies on a robust backend API architecture. The following endpoints are consumed:
- **Login Endpoint:** Handles user credentials and returns a secure JWT.
- **Profile Endpoint:** Fetches the logged-in user's profile picture, name, and bio for the sidebar.
- **Jobs Endpoint:** Supports complex query parameters (`employment_type`, `minimum_package`, `search`) to dynamically fetch and filter the list of active jobs.
- **Job Details Endpoint:** Retrieves granular data based on a specific Job ID, including the company website, required skills, and similar job recommendations.

## Implementation Highlights
- **Persistent Theming:** The light/dark mode preference is saved directly to `localStorage`. When the app loads, a `useEffect` hook immediately checks this value and applies the correct `data-bs-theme` to the root HTML document, preventing flashing.
- **Smart Navbar Logic:** The Navbar dynamically reads the authentication state directly from browser cookies. If a user stumbles onto a protected or 404 route while logged out, the Navbar will automatically hide all navigation links to prevent unauthorized access.
- **Dynamic API States:** Every API call correctly handles three distinct states: `Loading` (shows a spinner), `Success` (renders the data), and `Failure` (shows an error UI with retry capabilities).

Enjoy building your career with Jobs4Pro!
