import { generateText, Output } from 'ai'
import { z } from 'zod'

export const maxDuration = 30

const tradeRiskSchema = z.object({
  riskScore: z.number().min(1).max(10).describe('Risk score from 1 (low risk) to 10 (high risk)'),
  riskLevel: z.enum(['Low', 'Medium', 'High', 'Extreme']).describe('Risk level category'),
  explanation: z.string().describe('Short explanation of the risk assessment'),
  saferAlternative: z.object({
    suggestedLeverage: z.number().describe('Suggested safer leverage'),
    suggestedAmount: z.number().describe('Suggested safer position size in USD'),
    reasoning: z.string().describe('Why this is a safer alternative'),
  }).describe('Suggested safer trading parameters'),
  warnings: z.array(z.string()).describe('List of specific warnings for this trade'),
})

export async function POST(req: Request) {
  const { coin, amount, leverage } = await req.json()

  const { output } = await generateText({
    model: 'openai/gpt-4o-mini',
    output: Output.object({
      schema: tradeRiskSchema,
    }),
    prompt: `You are a crypto trading risk analyzer. Analyze the following trade and provide a risk assessment:

Coin: ${coin}
Trade Amount: $${amount} USD
Leverage: ${leverage}x

Consider factors like:
- Leverage risk (higher leverage = higher risk)
- Position size relative to typical retail traders
- Market volatility of the coin
- Liquidation risks

Provide a comprehensive risk analysis with a score from 1-10, explanation, and safer alternatives if the risk is high.`,
  })

  return Response.json(output)
}
