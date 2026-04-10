# Weather Dashboard

A modern, responsive Single Page Application built with React, Vite, and Tailwind CSS.
Features glassmorphism design, real-time weather data, and interactive elements.

## Features
- **Modular Architecture**: Clean separation of concerns with components like Sidebar, MainDashboard, etc.
- **Context API**: Efficient state management avoiding prop-drilling.
- **Local Storage**: Persists the last searched city on page refresh.
- **Glassmorphism UI**: Beautiful semi-transparent frosted glass panels.
- **Metric/Imperial Toggle**: Easily switch between Celsius/Fahrenheit and km/h/mph.
- **Skeleton Loader**: Shimmering grey boxes while data fetches.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd weather
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Setup Environment Variables
1. Create a `.env` file in the root of the `weather` directory:
   ```bash
   touch .env
   ```
2. Get an API key from [OpenWeatherMap](https://openweathermap.org/api) (You can use the Free Tier).
3. Add your key to the `.env` file:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

### Run the Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`
