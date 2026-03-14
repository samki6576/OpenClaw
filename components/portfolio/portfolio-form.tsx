"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { PieChart, Plus, Trash2 } from "lucide-react"
import { PortfolioResult } from "./portfolio-result"

const availableCoins = [
  "BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", 
  "DOT", "MATIC", "LINK", "UNI", "ATOM", "LTC", "SHIB"
]

interface Allocation {
  coin: string
  percentage: number
}

interface PortfolioAnalysis {
  riskLevel: 'Low' | 'Medium' | 'High'
  diversificationScore: number
  overallAssessment: string
  suggestions: Array<{
    action: 'increase' | 'decrease' | 'hold'
    asset: string
    currentAllocation: number
    suggestedAllocation: number
    reason: string
  }>
  strengths: string[]
  weaknesses: string[]
}

export function PortfolioForm() {
  const [allocations, setAllocations] = useState<Allocation[]>([
    { coin: "BTC", percentage: 40 },
    { coin: "ETH", percentage: 30 },
    { coin: "SOL", percentage: 30 },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<PortfolioAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const totalPercentage = allocations.reduce((sum, a) => sum + a.percentage, 0)

  const addAllocation = () => {
    const usedCoins = allocations.map(a => a.coin)
    const availableCoin = availableCoins.find(c => !usedCoins.includes(c))
    if (availableCoin) {
      setAllocations([...allocations, { coin: availableCoin, percentage: 0 }])
    }
  }

  const removeAllocation = (index: number) => {
    if (allocations.length > 1) {
      setAllocations(allocations.filter((_, i) => i !== index))
    }
  }

  const updateAllocation = (index: number, field: 'coin' | 'percentage', value: string | number) => {
    const updated = [...allocations]
    if (field === 'coin') {
      updated[index].coin = value as string
    } else {
      updated[index].percentage = value as number
    }
    setAllocations(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (totalPercentage !== 100) {
      setError('Portfolio allocation must equal 100%')
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ allocations }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze portfolio')
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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/20">
              <PieChart className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <CardTitle className="text-xl text-foreground">Your Portfolio Allocation</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your current crypto holdings to get AI-powered analysis
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {allocations.map((allocation, index) => (
                <div key={index} className="flex items-end gap-4">
                  <div className="flex-1 space-y-2">
                    <Label className="text-foreground">Coin</Label>
                    <Select 
                      value={allocation.coin} 
                      onValueChange={(value) => updateAllocation(index, 'coin', value)}
                    >
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCoins
                          .filter(c => c === allocation.coin || !allocations.some(a => a.coin === c))
                          .map((coin) => (
                            <SelectItem key={coin} value={coin}>
                              {coin}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1 space-y-2">
                    <Label className="text-foreground">Allocation (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={allocation.percentage}
                      onChange={(e) => updateAllocation(index, 'percentage', parseFloat(e.target.value) || 0)}
                      className="bg-input border-border"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAllocation(index)}
                    disabled={allocations.length <= 1}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={addAllocation}
                disabled={allocations.length >= availableCoins.length}
                className="border-border"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Coin
              </Button>

              <div className={`text-sm font-medium ${totalPercentage === 100 ? 'text-primary' : 'text-destructive'}`}>
                Total: {totalPercentage}%
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={totalPercentage !== 100 || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Spinner className="h-4 w-4" />
                  Analyzing Portfolio...
                </span>
              ) : (
                "Analyze Portfolio"
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

      {result && <PortfolioResult result={result} allocations={allocations} />}
    </div>
  )
}
