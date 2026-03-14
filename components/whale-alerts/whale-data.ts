export interface WhaleAlert {
  id: number
  type: 'buy' | 'sell' | 'transfer'
  coin: string
  amount: string
  amountUSD: number
  description: string
  sentiment: 'bullish' | 'bearish' | 'neutral'
  time: string
  fromAddress?: string
  toAddress?: string
  exchange?: string
}

export const whaleAlerts: WhaleAlert[] = [
  {
    id: 1,
    type: 'buy',
    coin: 'ETH',
    amount: '3,500 ETH',
    amountUSD: 12000000,
    description: 'Whale bought $12M ETH on Binance',
    sentiment: 'bullish',
    time: '2 min ago',
    exchange: 'Binance',
  },
  {
    id: 2,
    type: 'transfer',
    coin: 'BTC',
    amount: '150 BTC',
    amountUSD: 10000000,
    description: 'Large BTC transfer to unknown wallet',
    sentiment: 'neutral',
    time: '5 min ago',
    fromAddress: '0x1a2b...3c4d',
    toAddress: '0x5e6f...7g8h',
  },
  {
    id: 3,
    type: 'sell',
    coin: 'SOL',
    amount: '45,000 SOL',
    amountUSD: 5000000,
    description: 'Whale sold $5M SOL on Coinbase',
    sentiment: 'bearish',
    time: '12 min ago',
    exchange: 'Coinbase',
  },
  {
    id: 4,
    type: 'buy',
    coin: 'BTC',
    amount: '250 BTC',
    amountUSD: 16800000,
    description: 'Institutional purchase detected',
    sentiment: 'bullish',
    time: '18 min ago',
    exchange: 'OTC Desk',
  },
  {
    id: 5,
    type: 'transfer',
    coin: 'ETH',
    amount: '8,000 ETH',
    amountUSD: 27500000,
    description: 'ETH moved from exchange to cold wallet',
    sentiment: 'bullish',
    time: '25 min ago',
    fromAddress: 'Binance Hot Wallet',
    toAddress: 'Cold Storage',
  },
  {
    id: 6,
    type: 'sell',
    coin: 'DOGE',
    amount: '50M DOGE',
    amountUSD: 4000000,
    description: 'Large DOGE sell order executed',
    sentiment: 'bearish',
    time: '32 min ago',
    exchange: 'Binance',
  },
  {
    id: 7,
    type: 'buy',
    coin: 'AVAX',
    amount: '180,000 AVAX',
    amountUSD: 6500000,
    description: 'Whale accumulated AVAX',
    sentiment: 'bullish',
    time: '45 min ago',
    exchange: 'Kraken',
  },
  {
    id: 8,
    type: 'transfer',
    coin: 'XRP',
    amount: '25M XRP',
    amountUSD: 15000000,
    description: 'XRP moved between whale wallets',
    sentiment: 'neutral',
    time: '1 hour ago',
    fromAddress: '0x9a8b...7c6d',
    toAddress: '0x4e3f...2g1h',
  },
  {
    id: 9,
    type: 'sell',
    coin: 'BNB',
    amount: '15,000 BNB',
    amountUSD: 9000000,
    description: 'Whale sold BNB on-chain',
    sentiment: 'bearish',
    time: '1.5 hours ago',
    exchange: 'PancakeSwap',
  },
  {
    id: 10,
    type: 'buy',
    coin: 'MATIC',
    amount: '8M MATIC',
    amountUSD: 7200000,
    description: 'Large MATIC accumulation spotted',
    sentiment: 'bullish',
    time: '2 hours ago',
    exchange: 'Binance',
  },
]

export const marketStats = {
  totalWhaleActivity: '$112.5M',
  bullishSignals: 5,
  bearishSignals: 3,
  neutralSignals: 2,
  dominantSentiment: 'Bullish' as const,
  last24h: '+15%',
}
