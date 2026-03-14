"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { MessageCircle, Send, User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

const suggestedQuestions = [
  "What is leverage?",
  "How does futures trading work?",
  "What is a liquidation?",
  "What is DCA?",
  "How to read candlestick charts?",
  "What are whale movements?",
]

export function ChatInterface() {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleSuggestionClick = (question: string) => {
    if (isLoading) return
    sendMessage({ text: question })
  }

  return (
    <Card className="border-border bg-card flex flex-col h-[calc(100vh-16rem)]">
      <CardHeader className="border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-5/20">
            <MessageCircle className="h-5 w-5 text-chart-5" />
          </div>
          <div>
            <CardTitle className="text-xl text-foreground">Crypto Education Chat</CardTitle>
            <p className="text-sm text-muted-foreground">Ask any crypto question</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Welcome to OpenClaw AI
            </h3>
            <p className="text-muted-foreground max-w-md mb-6">
              I am here to help you understand crypto concepts in simple terms. 
              Ask me anything about trading, blockchain, or cryptocurrency!
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
              {suggestedQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(question)}
                  className="border-border text-foreground hover:bg-secondary"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    message.role === "user"
                      ? "bg-primary"
                      : "bg-secondary"
                  )}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-primary-foreground" />
                  ) : (
                    <Bot className="h-4 w-4 text-foreground" />
                  )}
                </div>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3 max-w-[80%]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  )}
                >
                  {message.parts.map((part, index) => {
                    if (part.type === "text") {
                      return (
                        <p key={index} className="whitespace-pre-wrap leading-relaxed">
                          {part.text}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <Bot className="h-4 w-4 text-foreground" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-secondary">
                  <Spinner className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </CardContent>

      <div className="border-t border-border p-4 shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about crypto..."
            className="flex-1 bg-input border-border"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </Card>
  )
}
