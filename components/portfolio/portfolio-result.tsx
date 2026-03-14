import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp, CheckCircle, Minus, AlertTriangle, TrendingUp } from "lucide-react"

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

interface PortfolioResultProps {
  result: PortfolioAnalysis
  allocations: Allocation[]
}

export function PortfolioResult({ result, allocations }: PortfolioResultProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-primary text-primary-foreground'
      case 'Medium':
        return 'bg-chart-5 text-foreground'
      case 'High':
        return 'bg-destructive text-destructive-foreground'
      default:
        return 'bg-secondary text-secondary-foreground'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-primary'
    if (score >= 50) return 'text-chart-5'
    return 'text-destructive'
  }

  return (
    <div className="space-y-4">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground">Risk Level</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className={`text-lg px-4 py-1 ${getRiskColor(result.riskLevel)}`}>
              {result.riskLevel}
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground">Diversification Score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-bold ${getScoreColor(result.diversificationScore)}`}>
                {result.diversificationScore}
              </span>
              <span className="text-muted-foreground">/100</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${
                  result.diversificationScore >= 70 ? 'bg-primary' :
                  result.diversificationScore >= 50 ? 'bg-chart-5' : 'bg-destructive'
                }`}
                style={{ width: `${result.diversificationScore}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Allocation Visualization */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Current Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-8 rounded-lg overflow-hidden">
            {allocations.map((alloc, index) => {
              const colors = ['bg-primary', 'bg-chart-2', 'bg-chart-4', 'bg-chart-5', 'bg-chart-3']
              return (
                <div
                  key={alloc.coin}
                  className={`${colors[index % colors.length]} flex items-center justify-center`}
                  style={{ width: `${alloc.percentage}%` }}
                >
                  {alloc.percentage >= 15 && (
                    <span className="text-xs font-medium text-primary-foreground">
                      {alloc.coin}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {allocations.map((alloc, index) => {
              const colors = ['bg-primary', 'bg-chart-2', 'bg-chart-4', 'bg-chart-5', 'bg-chart-3']
              return (
                <div key={alloc.coin} className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${colors[index % colors.length]}`} />
                  <span className="text-sm text-foreground">{alloc.coin}: {alloc.percentage}%</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Overall Assessment */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Overall Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{result.overallAssessment}</p>
        </CardContent>
      </Card>

      {/* Strengths & Weaknesses */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-chart-2/30 bg-chart-2/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-chart-2" />
              Weaknesses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-chart-2 mt-2 shrink-0" />
                  {weakness}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Rebalancing Suggestions */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Rebalancing Suggestions</CardTitle>
          <CardDescription className="text-muted-foreground">
            AI-generated recommendations to optimize your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-lg border border-border bg-secondary/30 p-4"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  suggestion.action === 'increase' ? 'bg-primary/20' :
                  suggestion.action === 'decrease' ? 'bg-destructive/20' : 'bg-secondary'
                }`}>
                  {suggestion.action === 'increase' ? (
                    <ArrowUp className="h-5 w-5 text-primary" />
                  ) : suggestion.action === 'decrease' ? (
                    <ArrowDown className="h-5 w-5 text-destructive" />
                  ) : (
                    <Minus className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-foreground">{suggestion.asset}</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">{suggestion.currentAllocation}%</span>
                      <span className="text-muted-foreground">→</span>
                      <span className={
                        suggestion.action === 'increase' ? 'text-primary' :
                        suggestion.action === 'decrease' ? 'text-destructive' : 'text-foreground'
                      }>
                        {suggestion.suggestedAllocation}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
