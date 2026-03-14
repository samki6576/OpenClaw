import { Shield, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-primary/10 border border-border p-8 md:p-12">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 -mr-40 -mt-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute left-0 bottom-0 -ml-40 -mb-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium text-primary">AI-Powered Trading Assistant</span>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
          Trade Safer with{" "}
          <span className="text-primary">OpenClaw AI Guardian</span>
        </h1>
        
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Your intelligent companion for crypto trading on Binance. Get real-time risk analysis, 
          portfolio insights, whale alerts, and expert guidance—all powered by advanced AI.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Risk Analysis</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
            <span className="text-sm font-medium text-foreground">Portfolio Optimization</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
            <span className="text-sm font-medium text-foreground">Real-time Alerts</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
            <span className="text-sm font-medium text-foreground">Crypto Education</span>
          </div>
        </div>
      </div>
    </div>
  )
}
