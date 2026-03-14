import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, PieChart, Activity, MessageCircle, ArrowRight } from "lucide-react"

const features = [
  {
    title: "Trade Risk Checker",
    description: "Analyze your trades with AI-powered risk assessment. Get real-time warnings and safer alternatives.",
    href: "/trade-risk",
    icon: TrendingUp,
    stats: "Risk Score 1-10",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    title: "Portfolio Analyzer",
    description: "Understand your portfolio allocation and get AI-driven rebalancing suggestions.",
    href: "/portfolio",
    icon: PieChart,
    stats: "Diversification Score",
    gradient: "from-chart-2/20 to-chart-2/5",
  },
  {
    title: "Whale Alerts",
    description: "Track large crypto movements in real-time. Stay ahead of market-moving transactions.",
    href: "/whale-alerts",
    icon: Activity,
    stats: "Live Monitoring",
    gradient: "from-chart-4/20 to-chart-4/5",
  },
  {
    title: "AI Chat Assistant",
    description: "Ask any crypto question and get beginner-friendly explanations instantly.",
    href: "/chat",
    icon: MessageCircle,
    stats: "24/7 Available",
    gradient: "from-chart-5/20 to-chart-5/5",
  },
]

export function FeatureCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <Link key={feature.href} href={feature.href} className="group">
          <Card className="h-full border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
            <CardHeader className="pb-2">
              <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient}`}>
                <feature.icon className="h-6 w-6 text-foreground" />
              </div>
              <CardTitle className="flex items-center justify-between text-lg">
                {feature.title}
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {feature.stats}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
