"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Filter } from "lucide-react"
import { AlertCard } from "./alert-card"
import { whaleAlerts } from "./whale-data"

type FilterType = 'all' | 'buy' | 'sell' | 'transfer'

export function AlertsList() {
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredAlerts = filter === 'all' 
    ? whaleAlerts 
    : whaleAlerts.filter(alert => alert.type === filter)

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/20">
              <Activity className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <CardTitle className="text-xl text-foreground">Live Whale Alerts</CardTitle>
              <CardDescription className="text-muted-foreground">
                Real-time large transaction monitoring
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex rounded-lg border border-border bg-secondary p-1">
              {(['all', 'buy', 'sell', 'transfer'] as FilterType[]).map((type) => (
                <Button
                  key={type}
                  variant={filter === type ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter(type)}
                  className={`capitalize ${filter === type ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
        
        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No alerts matching this filter</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
