import { Navigation } from "@/components/navigation"
import { ChatInterface } from "@/components/chat/chat-interface"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, HelpCircle, Lightbulb } from "lucide-react"

const topics = [
  {
    icon: BookOpen,
    title: "Trading Basics",
    items: ["Spot vs Futures", "Long & Short", "Market Orders", "Limit Orders"],
  },
  {
    icon: HelpCircle,
    title: "Risk Management",
    items: ["Stop Loss", "Take Profit", "Position Sizing", "Leverage"],
  },
  {
    icon: Lightbulb,
    title: "Market Analysis",
    items: ["Candlesticks", "Support & Resistance", "Volume", "Indicators"],
  },
]

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">AI Chat Assistant</h1>
          <p className="mt-2 text-muted-foreground">
            Learn crypto concepts with our AI-powered education assistant
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Topics You Can Ask About</h2>
            {topics.map((topic, index) => (
              <Card key={index} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <topic.icon className="h-4 w-4 text-chart-5" />
                    <CardTitle className="text-sm font-medium text-foreground">{topic.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {topic.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-primary/30 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-foreground">Disclaimer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-xs leading-relaxed">
                  This AI assistant provides educational information only and should not be 
                  considered financial advice. Always do your own research (DYOR) before 
                  making any trading decisions. Cryptocurrency trading involves significant 
                  risk of loss.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
