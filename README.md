# Crypto-test

A Next.js application for displaying cryptocurrency market data.

## Features

- 🚀 Built with Next.js 16 and TypeScript
- 💎 Displays top 10 cryptocurrencies by market cap
- 📊 Real-time price data from CoinGecko API
- 🎨 Styled with Tailwind CSS
- 📱 Fully responsive design
- 🔄 Auto-refreshing data every 60 seconds
- 💾 Fallback mock data for offline mode

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chukwumela909/Crypto-test.git
cd Crypto-test
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout component
│   ├── page.tsx        # Main page with crypto dashboard
│   └── globals.css     # Global styles
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Technologies Used

- **Next.js 16** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **CoinGecko API** - Cryptocurrency data source

## License

MIT

