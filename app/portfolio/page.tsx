import { Navigation } from "@/components/navigation"
import { PortfolioForm } from "@/components/portfolio/portfolio-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Shield, TrendingUp } from "lucide-react"

const tips = [
  {
    icon: PieChart,
    title: "Diversification",
    description: "A well-diversified portfolio typically includes BTC, ETH, and a mix of quality altcoins across different sectors.",
  },
  {
    icon: Shield,
    title: "Core Holdings",
    description: "Consider keeping 50-70% in established coins like BTC and ETH as your core holdings for stability.",
  },
  {
    icon: TrendingUp,
    title: "Rebalancing",
    description: "Regular rebalancing helps maintain your target allocation and manage risk as prices change.",
  },
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Portfolio Analyzer</h1>
          <p className="mt-2 text-muted-foreground">
            Get AI-powered insights and rebalancing suggestions for your crypto portfolio
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PortfolioForm />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Portfolio Tips</h2>
            {tips.map((tip, index) => (
              <Card key={index} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <tip.icon className="h-4 w-4 text-chart-2" />
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
