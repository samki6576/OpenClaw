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

declare global {
  interface Window {
    puter: {
      ai: {
        chat: (
          prompt: string | Array<{ role: string; content: string }>,
          options?: { model?: string; stream?: boolean }
        ) => Promise<{ message?: { content: string | Array<{ text: string }> } } | string>
      }
    }
  }
}

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
      const prompt = `You are a crypto trading risk analyst. Analyze this trade and respond ONLY with valid JSON (no markdown, no code blocks):

Trade Details:
- Coin: ${coin}
- Amount: $${amount} USD
- Leverage: ${leverage}x

Respond with this exact JSON structure:
{
  "riskScore": <number 1-10>,
  "riskLevel": "<Low|Medium|High|Extreme>",
  "explanation": "<2-3 sentence explanation of the risk>",
  "saferAlternative": {
    "suggestedLeverage": <number>,
    "suggestedAmount": <number>,
    "reasoning": "<why this is safer>"
  },
  "warnings": ["<warning 1>", "<warning 2>"]
}

Risk guidelines:
- Leverage 1-3x with <$1000: Low risk (score 1-3)
- Leverage 5-10x or >$5000: Medium risk (score 4-6)
- Leverage 20x+ or >$10000: High risk (score 7-8)
- Leverage 50x+ or extreme amounts: Extreme risk (score 9-10)`

      const response = await window.puter.ai.chat(prompt, { model: "gpt-4.1-nano" })
      
      let content = ""
      if (typeof response === "string") {
        content = response
      } else if (response?.message?.content) {
        if (Array.isArray(response.message.content)) {
          content = response.message.content.map((c: { text: string }) => c.text).join("")
        } else {
          content = response.message.content as string
        }
      }

      // Clean up any markdown code blocks
      content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
      
      const data = JSON.parse(content)
      setResult(data)
    } catch (err) {
      console.error("Trade analysis error:", err)
      setError(err instanceof Error ? err.message : 'Failed to analyze trade. Please try again.')
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
