import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/dashboard/hero-section"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { FeatureCards } from "@/components/dashboard/feature-cards"
import { RecentAlerts } from "@/components/dashboard/recent-alerts"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Market Stats */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-foreground">Market Overview</h2>
            <StatsCards />
          </section>
          
          {/* Features */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-foreground">AI Guardian Features</h2>
            <FeatureCards />
          </section>
          
          {/* Recent Alerts */}
          <section>
            <RecentAlerts />
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              OpenClaw AI Guardian helps Binance users trade more safely and learn crypto.
            </p>
            <p className="text-sm text-muted-foreground">
              Powered by AI for smarter trading decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
