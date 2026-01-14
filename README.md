🌦️ Weather App

A modern, high-performance weather dashboard built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This application integrates with the OpenWeatherMap API to provide real-time weather data, 5-day forecasts, and automatic user geolocation, featuring efficient state management and data caching.

## 🔗 Live Demo & Code

- **🚀 Live Demo:** [https://weather-app-bre8.vercel.app](https://weather-app-bre8.vercel.app)
- **💻 Repository:** [https://github.com/EdgarGT041/Weather-App](https://github.com/EdgarGT041/Weather-App)

## ✨ Key Features

- **Real-Time Weather:** Instant access to current weather conditions for any city globally.
- **5-Day Forecast:** Detailed forecast views with accurate timing formatted via `date-fns`.11
- **Automatic Geolocation:** Detects user location to display local weather immediately upon load.
- **Search Functionality:** dynamic search bar to query weather data for specific locations.
- **Smart Caching:** Implements **React Query (TanStack Query)** to minimize API calls and manage server state efficiently.
- **Global State Management:** Uses **Jotai** for lightweight, atomic state management across components.
- **Responsive Design:** A clean, mobile-first interface built with **Tailwind CSS**.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Jotai (Client) & React Query (Server/Async)
- **Data Fetching:** Axios
- **Utilities:** date-fns
- **API:** OpenWeatherMap

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### 1. Clone the repository

```bash
git clone [https://github.com/EdgarGT041/Weather-App.git](https://github.com/EdgarGT041/Weather-App.git)
cd Weather-App

```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install

```

### 3. Environment Variables

This project requires an API key from OpenWeatherMap.
Create a `.env.local` file in the root directory and add your key:

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here

```

### 4. Run the development server

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the application.

## 📂 Project Structure

```bash
├── public/           # Static assets
├── src/
│   ├── app/          # Next.js 15 App Router pages and layouts
│   ├── components/   # Reusable UI components
│   └── utils/        # Helper functions and API configuration
├── .env.local        # Environment variables
├── next.config.ts    # Next.js configuration
├── package.json      # Project dependencies
└── README.md         # Project documentation

```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

