import Image from 'next/image';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
}

// Fallback mock data for demonstration when API is unavailable
const mockCryptoData: CryptoData[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 98750.45,
    price_change_percentage_24h: 2.34,
    market_cap: 1950000000000,
    total_volume: 45000000000,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    current_price: 3245.67,
    price_change_percentage_24h: -1.23,
    market_cap: 390000000000,
    total_volume: 18000000000,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
  },
  {
    id: 'tether',
    symbol: 'usdt',
    name: 'Tether',
    current_price: 1.00,
    price_change_percentage_24h: 0.01,
    market_cap: 135000000000,
    total_volume: 78000000000,
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png'
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    current_price: 645.32,
    price_change_percentage_24h: 3.45,
    market_cap: 93000000000,
    total_volume: 2100000000,
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    current_price: 234.56,
    price_change_percentage_24h: 5.67,
    market_cap: 112000000000,
    total_volume: 5600000000,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
  },
  {
    id: 'usd-coin',
    symbol: 'usdc',
    name: 'USDC',
    current_price: 1.00,
    price_change_percentage_24h: -0.01,
    market_cap: 42000000000,
    total_volume: 8900000000,
    image: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png'
  },
  {
    id: 'ripple',
    symbol: 'xrp',
    name: 'XRP',
    current_price: 2.87,
    price_change_percentage_24h: -2.34,
    market_cap: 164000000000,
    total_volume: 7800000000,
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png'
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    current_price: 1.12,
    price_change_percentage_24h: 1.89,
    market_cap: 39000000000,
    total_volume: 1500000000,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png'
  },
  {
    id: 'dogecoin',
    symbol: 'doge',
    name: 'Dogecoin',
    current_price: 0.38,
    price_change_percentage_24h: 4.56,
    market_cap: 56000000000,
    total_volume: 3200000000,
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png'
  },
  {
    id: 'tron',
    symbol: 'trx',
    name: 'TRON',
    current_price: 0.25,
    price_change_percentage_24h: -0.78,
    market_cap: 21500000000,
    total_volume: 890000000,
    image: 'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png'
  }
];

// Helper function to format currency values
function formatPrice(price: number): string {
  return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function getCryptoData(): Promise<CryptoData[]> {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
      { 
        next: { revalidate: 60 } // Revalidate every 60 seconds
      }
    );
    
    if (!res.ok) {
      throw new Error('Failed to fetch crypto data');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    // Return mock data as fallback
    return mockCryptoData;
  }
}

export default async function Home() {
  const cryptoData = await getCryptoData();

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Crypto Market Dashboard</h1>
          <p className="text-gray-300">Real-time cryptocurrency prices and market data</p>
        </header>

        {cryptoData.length === 0 ? (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-white">
            <p>Unable to load cryptocurrency data. Please try again later.</p>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Coin
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-white uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-white uppercase tracking-wider">
                      24h Change
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-white uppercase tracking-wider">
                      Market Cap
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-white uppercase tracking-wider">
                      Volume (24h)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {cryptoData.map((crypto, index) => (
                    <tr key={crypto.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Image 
                            src={crypto.image} 
                            alt={crypto.name}
                            width={32}
                            height={32}
                            className="rounded-full mr-3"
                            unoptimized
                          />
                          <div>
                            <div className="text-sm font-medium text-white">{crypto.name}</div>
                            <div className="text-sm text-gray-400 uppercase">{crypto.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-white font-medium">
                        ${formatPrice(crypto.current_price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <span className={crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                          {crypto.price_change_percentage_24h >= 0 ? '▲' : '▼'} 
                          {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-300">
                        ${(crypto.market_cap / 1e9).toFixed(2)}B
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-300">
                        ${(crypto.total_volume / 1e9).toFixed(2)}B
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <footer className="mt-8 text-center text-gray-400 text-sm">
          <p>Data updates every 60 seconds • Powered by CoinGecko API</p>
        </footer>
      </div>
    </main>
  );
}
