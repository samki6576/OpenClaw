import { generateText, Output } from 'ai'
import { z } from 'zod'

export const maxDuration = 30

const portfolioAnalysisSchema = z.object({
  riskLevel: z.enum(['Low', 'Medium', 'High']).describe('Overall portfolio risk level'),
  diversificationScore: z.number().min(1).max(100).describe('Diversification score from 1-100'),
  overallAssessment: z.string().describe('Overall portfolio assessment'),
  suggestions: z.array(z.object({
    action: z.enum(['increase', 'decrease', 'hold']),
    asset: z.string(),
    currentAllocation: z.number(),
    suggestedAllocation: z.number(),
    reason: z.string(),
  })).describe('Rebalancing suggestions'),
  strengths: z.array(z.string()).describe('Portfolio strengths'),
  weaknesses: z.array(z.string()).describe('Portfolio weaknesses'),
})

interface Allocation {
  coin: string
  percentage: number
}

export async function POST(req: Request) {
  const { allocations }: { allocations: Allocation[] } = await req.json()

  const allocationString = allocations
    .map((a) => `${a.coin}: ${a.percentage}%`)
    .join(', ')

  const { output } = await generateText({
    model: 'openai/gpt-4o-mini',
    output: Output.object({
      schema: portfolioAnalysisSchema,
    }),
    prompt: `You are a crypto portfolio analyzer. Analyze the following portfolio allocation and provide recommendations:

Portfolio Allocation:
${allocationString}

Consider factors like:
- Diversification across different crypto categories (Layer 1, Layer 2, DeFi, meme coins, etc.)
- Risk distribution (BTC/ETH as safer bets vs altcoins)
- Current market conditions
- Overexposure to any single asset

Provide a comprehensive analysis with risk level, diversification score (1-100), and specific rebalancing suggestions.`,
  })

  return Response.json(output)
}
