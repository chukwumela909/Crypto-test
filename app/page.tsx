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
    return [];
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
                          <img 
                            src={crypto.image} 
                            alt={crypto.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-white">{crypto.name}</div>
                            <div className="text-sm text-gray-400 uppercase">{crypto.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-white font-medium">
                        ${crypto.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
