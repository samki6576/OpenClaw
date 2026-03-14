import { Navigation } from "@/components/navigation"
import { StatsOverview } from "@/components/whale-alerts/stats-overview"
import { AlertsList } from "@/components/whale-alerts/alerts-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, TrendingUp, AlertTriangle } from "lucide-react"

const insights = [
  {
    icon: TrendingUp,
    title: "Accumulation Trend",
    description: "Whales are currently accumulating BTC and ETH, indicating bullish sentiment for major cryptocurrencies.",
  },
  {
    icon: Activity,
    title: "Exchange Outflows",
    description: "Significant crypto moving from exchanges to cold storage suggests reduced selling pressure.",
  },
  {
    icon: AlertTriangle,
    title: "Watch List",
    description: "SOL and DOGE showing increased sell pressure from whale wallets. Monitor these closely.",
  },
]

export default function WhaleAlertsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Whale Alert Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Track large crypto transactions and whale movements in real-time
          </p>
        </div>

        <div className="space-y-8">
          {/* Stats Overview */}
          <StatsOverview />

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Alerts List */}
            <div className="lg:col-span-2">
              <AlertsList />
            </div>

            {/* Market Insights */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Market Insights</h2>
              {insights.map((insight, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <insight.icon className="h-4 w-4 text-chart-4" />
                      <CardTitle className="text-sm font-medium text-foreground">{insight.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {insight.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}

              {/* Legend */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">Sentiment Legend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">Bullish - Buying/accumulation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-destructive" />
                    <span className="text-sm text-muted-foreground">Bearish - Selling/distribution</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-chart-4" />
                    <span className="text-sm text-muted-foreground">Neutral - Transfers/movement</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
