"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity, Shield } from "lucide-react"

const stats = [
  {
    title: "BTC Price",
    value: "$67,234.50",
    change: "+2.4%",
    isPositive: true,
    icon: TrendingUp,
  },
  {
    title: "ETH Price",
    value: "$3,456.78",
    change: "+1.8%",
    isPositive: true,
    icon: TrendingUp,
  },
  {
    title: "Market Sentiment",
    value: "Bullish",
    change: "Fear & Greed: 72",
    isPositive: true,
    icon: Activity,
  },
  {
    title: "Risk Level",
    value: "Moderate",
    change: "Market stable",
    isPositive: true,
    icon: Shield,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.isPositive ? 'text-primary' : 'text-destructive'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className={`text-xs ${stat.isPositive ? 'text-primary' : 'text-destructive'}`}>
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
