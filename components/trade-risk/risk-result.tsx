import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Shield, TrendingDown } from "lucide-react"

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

interface RiskResultProps {
  result: TradeRiskResult
  coin: string
  amount: number
  leverage: number
}

export function RiskResult({ result, coin, amount, leverage }: RiskResultProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-primary text-primary-foreground'
      case 'Medium':
        return 'bg-chart-5 text-chart-5-foreground'
      case 'High':
        return 'bg-chart-2 text-foreground'
      case 'Extreme':
        return 'bg-destructive text-destructive-foreground'
      default:
        return 'bg-secondary text-secondary-foreground'
    }
  }

  const getRiskScoreColor = (score: number) => {
    if (score <= 3) return 'text-primary'
    if (score <= 5) return 'text-chart-5'
    if (score <= 7) return 'text-chart-2'
    return 'text-destructive'
  }

  return (
    <div className="space-y-4">
      {/* Main Risk Score Card */}
      <Card className="border-border bg-card overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-foreground">Risk Analysis</CardTitle>
            <Badge className={getRiskColor(result.riskLevel)}>
              {result.riskLevel} Risk
            </Badge>
          </div>
          <CardDescription className="text-muted-foreground">
            Analysis for {coin} | ${amount.toLocaleString()} USD | {leverage}x Leverage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 mb-6">
            <div className="flex flex-col items-center justify-center rounded-xl bg-secondary p-6">
              <span className={`text-5xl font-bold ${getRiskScoreColor(result.riskScore)}`}>
                {result.riskScore}
              </span>
              <span className="text-sm text-muted-foreground mt-1">out of 10</span>
            </div>
            
            {/* Risk Score Bar */}
            <div className="flex-1">
              <div className="h-4 rounded-full bg-secondary overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    result.riskScore <= 3 ? 'bg-primary' :
                    result.riskScore <= 5 ? 'bg-chart-5' :
                    result.riskScore <= 7 ? 'bg-chart-2' : 'bg-destructive'
                  }`}
                  style={{ width: `${result.riskScore * 10}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Low Risk</span>
                <span>Medium</span>
                <span>High</span>
                <span>Extreme</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-secondary/50 p-4 border border-border">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-foreground leading-relaxed">{result.explanation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warnings */}
      {result.warnings && result.warnings.length > 0 && (
        <Card className="border-chart-2/50 bg-chart-2/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-chart-2" />
              Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.warnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-chart-2 mt-2 shrink-0" />
                  {warning}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Safer Alternative */}
      <Card className="border-primary/50 bg-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Safer Alternative
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 mb-4">
            <div className="rounded-lg bg-card p-4 border border-border">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <TrendingDown className="h-4 w-4" />
                Suggested Leverage
              </div>
              <p className="text-2xl font-bold text-primary">
                {result.saferAlternative.suggestedLeverage}x
              </p>
              <p className="text-xs text-muted-foreground">
                vs your {leverage}x
              </p>
            </div>
            <div className="rounded-lg bg-card p-4 border border-border">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <TrendingDown className="h-4 w-4" />
                Suggested Amount
              </div>
              <p className="text-2xl font-bold text-primary">
                ${result.saferAlternative.suggestedAmount.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                vs your ${amount.toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-foreground leading-relaxed">{result.saferAlternative.reasoning}</p>
        </CardContent>
      </Card>
    </div>
  )
}
