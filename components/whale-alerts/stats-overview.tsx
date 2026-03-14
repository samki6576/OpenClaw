import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react"
import { marketStats } from "./whale-data"

export function StatsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            24h Whale Volume
          </CardTitle>
          <DollarSign className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{marketStats.totalWhaleActivity}</div>
          <p className="text-xs text-primary">{marketStats.last24h} from yesterday</p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Bullish Signals
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{marketStats.bullishSignals}</div>
          <p className="text-xs text-muted-foreground">Buy/accumulation events</p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Bearish Signals
          </CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{marketStats.bearishSignals}</div>
          <p className="text-xs text-muted-foreground">Sell/distribution events</p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Market Sentiment
          </CardTitle>
          <Activity className="h-4 w-4 text-chart-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{marketStats.dominantSentiment}</div>
          <p className="text-xs text-muted-foreground">Based on whale activity</p>
        </CardContent>
      </Card>
    </div>
  )
}
