"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import type { WhaleAlert } from "./whale-data"

interface AlertCardProps {
  alert: WhaleAlert
}

export function AlertCard({ alert }: AlertCardProps) {
  const getTypeIcon = () => {
    switch (alert.type) {
      case 'buy':
        return <TrendingUp className="h-5 w-5 text-primary" />
      case 'sell':
        return <TrendingDown className="h-5 w-5 text-destructive" />
      default:
        return <Activity className="h-5 w-5 text-chart-4" />
    }
  }

  const getTypeColor = () => {
    switch (alert.type) {
      case 'buy':
        return 'bg-primary/20'
      case 'sell':
        return 'bg-destructive/20'
      default:
        return 'bg-chart-4/20'
    }
  }

  const getSentimentBadge = () => {
    switch (alert.sentiment) {
      case 'bullish':
        return <Badge className="bg-primary text-primary-foreground">Bullish</Badge>
      case 'bearish':
        return <Badge variant="destructive">Bearish</Badge>
      default:
        return <Badge variant="secondary">Neutral</Badge>
    }
  }

  const formatUSD = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    return `$${(value / 1000).toFixed(0)}K`
  }

  return (
    <Card className="border-border bg-card hover:border-primary/30 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${getTypeColor()}`}>
              {getTypeIcon()}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{alert.coin}</span>
                <span className="text-xs text-muted-foreground capitalize">{alert.type}</span>
              </div>
              <p className="text-sm text-foreground">{alert.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{alert.amount}</span>
                <span className="text-primary font-medium">{formatUSD(alert.amountUSD)}</span>
                {alert.exchange && <span>on {alert.exchange}</span>}
              </div>
              {alert.type === 'transfer' && alert.fromAddress && alert.toAddress && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                  <span className="font-mono bg-secondary px-2 py-0.5 rounded">{alert.fromAddress}</span>
                  <ArrowRight className="h-3 w-3" />
                  <span className="font-mono bg-secondary px-2 py-0.5 rounded">{alert.toAddress}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {getSentimentBadge()}
            <span className="text-xs text-muted-foreground">{alert.time}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
