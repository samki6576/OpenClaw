"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { TrendingUp } from "lucide-react"
import { RiskResult } from "./risk-result"

const popularCoins = [
  { value: "BTC", label: "Bitcoin (BTC)" },
  { value: "ETH", label: "Ethereum (ETH)" },
  { value: "SOL", label: "Solana (SOL)" },
  { value: "BNB", label: "Binance Coin (BNB)" },
  { value: "XRP", label: "Ripple (XRP)" },
  { value: "ADA", label: "Cardano (ADA)" },
  { value: "DOGE", label: "Dogecoin (DOGE)" },
  { value: "AVAX", label: "Avalanche (AVAX)" },
]

const leverageOptions = [1, 2, 3, 5, 10, 20, 25, 50]

interface TradeRiskResult {
  riskScore: number
  riskLevel: 'Low' | 'Medium' | 'High' | 'Extreme'
  explanation: string
  saferAlternative: {
    suggestedLeverage: number
    suggestedAmount: number
    reasoning: string
  }
  warnings: string[]
}

export function TradeForm() {
  const [coin, setCoin] = useState("")
  const [amount, setAmount] = useState("")
  const [leverage, setLeverage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<TradeRiskResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/trade-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coin,
          amount: parseFloat(amount),
          leverage: parseInt(leverage),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze trade')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl text-foreground">Analyze Your Trade</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your trade details to get an AI-powered risk assessment
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="coin" className="text-foreground">Coin</Label>
                <Select value={coin} onValueChange={setCoin}>
                  <SelectTrigger id="coin" className="bg-input border-border">
                    <SelectValue placeholder="Select a coin" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularCoins.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-foreground">Trade Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="e.g., 1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-input border-border"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="leverage" className="text-foreground">Leverage</Label>
                <Select value={leverage} onValueChange={setLeverage}>
                  <SelectTrigger id="leverage" className="bg-input border-border">
                    <SelectValue placeholder="Select leverage" />
                  </SelectTrigger>
                  <SelectContent>
                    {leverageOptions.map((lev) => (
                      <SelectItem key={lev} value={lev.toString()}>
                        {lev}x
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!coin || !amount || !leverage || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Spinner className="h-4 w-4" />
                  Analyzing Trade...
                </span>
              ) : (
                "Analyze Trade"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && <RiskResult result={result} coin={coin} amount={parseFloat(amount)} leverage={parseInt(leverage)} />}
    </div>
  )
}
