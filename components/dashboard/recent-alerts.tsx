"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

const recentAlerts = [
  {
    id: 1,
    type: "buy",
    coin: "ETH",
    amount: "$12M",
    description: "Whale bought $12M ETH",
    sentiment: "bullish",
    time: "2 min ago",
  },
  {
    id: 2,
    type: "transfer",
    coin: "BTC",
    amount: "$8M",
    description: "Large BTC transfer detected",
    sentiment: "neutral",
    time: "5 min ago",
  },
  {
    id: 3,
    type: "sell",
    coin: "SOL",
    amount: "$5M",
    description: "Whale sold $5M SOL",
    sentiment: "bearish",
    time: "12 min ago",
  },
]

export function RecentAlerts() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">Recent Whale Alerts</CardTitle>
          <CardDescription className="text-muted-foreground">
            Latest large transactions detected
          </CardDescription>
        </div>
        <Link 
          href="/whale-alerts" 
          className="text-sm font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary/50"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  alert.type === 'buy' ? 'bg-primary/20' :
                  alert.type === 'sell' ? 'bg-destructive/20' : 'bg-chart-4/20'
                }`}>
                  {alert.type === 'buy' ? (
                    <TrendingUp className="h-5 w-5 text-primary" />
                  ) : alert.type === 'sell' ? (
                    <TrendingDown className="h-5 w-5 text-destructive" />
                  ) : (
                    <Activity className="h-5 w-5 text-chart-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{alert.description}</p>
                  <p className="text-sm text-muted-foreground">{alert.time}</p>
                </div>
              </div>
              <Badge
                variant={alert.sentiment === 'bullish' ? 'default' : alert.sentiment === 'bearish' ? 'destructive' : 'secondary'}
                className={alert.sentiment === 'bullish' ? 'bg-primary text-primary-foreground' : ''}
              >
                {alert.sentiment}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
