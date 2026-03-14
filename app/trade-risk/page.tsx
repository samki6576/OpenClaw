import { Navigation } from "@/components/navigation"
import { TradeForm } from "@/components/trade-risk/trade-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Shield, TrendingUp } from "lucide-react"

const tips = [
  {
    icon: AlertTriangle,
    title: "High Leverage Warning",
    description: "Leverage above 10x significantly increases your liquidation risk. Consider lower leverage for safer trading.",
  },
  {
    icon: Shield,
    title: "Position Sizing",
    description: "Never risk more than 1-2% of your portfolio on a single trade. This helps protect your capital.",
  },
  {
    icon: TrendingUp,
    title: "Market Conditions",
    description: "Volatile market conditions increase risk. Reduce position sizes during high volatility periods.",
  },
]

export default function TradeRiskPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Trade Risk Checker</h1>
          <p className="mt-2 text-muted-foreground">
            Analyze your trades with AI-powered risk assessment before you execute
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TradeForm />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Trading Tips</h2>
            {tips.map((tip, index) => (
              <Card key={index} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <tip.icon className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm font-medium text-foreground">{tip.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {tip.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
