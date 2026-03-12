import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageCircle, Send, Brain, Zap } from "lucide-react";
import { products, getWhatsAppLink } from "@/data/products";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

const goals = ["Hair Care", "Skin Care", "Immunity", "Stress Relief", "Digestion", "Energy"];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/herbal-advisor`;

export default function AIAdvisorPage() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [issue, setIssue] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [matchedProducts, setMatchedProducts] = useState<typeof products>([]);
  const abortRef = useRef<AbortController | null>(null);

  const handleRecommend = async () => {
    if (!selectedGoal) return;
    setIsLoading(true);
    setAiMessage("");
    setMatchedProducts([]);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ goal: selectedGoal, issue }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Request failed" }));
        if (resp.status === 429) toast.error("Rate limit exceeded. Please wait a moment.");
        else if (resp.status === 402) toast.error("AI credits exhausted. Please add credits in settings.");
        else toast.error(err.error || "Something went wrong");
        setIsLoading(false);
        return;
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullText = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullText += content;
              setAiMessage(fullText);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Match mentioned products
      const lower = fullText.toLowerCase();
      const matched = products.filter((p) => lower.includes(p.name.toLowerCase()));
      setMatchedProducts(matched);
    } catch (e: any) {
      if (e.name !== "AbortError") {
        console.error(e);
        toast.error("Failed to get recommendations");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-3xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-3 font-display text-4xl font-bold md:text-5xl">
            Herbal <span className="gradient-text">AI Advisor</span>
          </h1>
          <p className="font-body text-lg text-muted-foreground">
            Tell us your health goals and our AI will recommend the perfect herbal powders for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 mb-8"
        >
          <label className="mb-2 block font-ui text-sm font-semibold text-foreground">
            <Zap className="mr-1.5 inline h-4 w-4 text-accent" />
            What health issue do you have?
          </label>
          <input
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="e.g. hair fall, acne, low immunity, stress..."
            className="mb-8 w-full rounded-xl border border-border bg-muted/50 px-5 py-3.5 font-ui text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
          />

          <label className="mb-4 block font-ui text-sm font-semibold text-foreground">
            <Sparkles className="mr-1.5 inline h-4 w-4 text-accent" />
            What is your goal?
          </label>
          <div className="mb-8 flex flex-wrap gap-2.5">
            {goals.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGoal(g)}
                className={`rounded-xl border px-5 py-2.5 font-ui text-sm font-medium transition-all duration-300 ${
                  selectedGoal === g
                    ? "border-primary/50 bg-primary/15 text-foreground shadow-[0_0_20px_hsl(145_45%_38%/0.15)]"
                    : "border-border bg-muted/30 text-muted-foreground hover:border-border hover:bg-muted/60"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <button
            onClick={handleRecommend}
            disabled={!selectedGoal || isLoading}
            className="btn-premium flex w-full items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" /> {isLoading ? "Analyzing..." : "Get Recommendations"}
          </button>
        </motion.div>

        {/* Typing indicator */}
        <AnimatePresence>
          {isLoading && !aiMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass-card mb-6 p-5 flex items-center gap-3"
            >
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="font-ui text-sm text-muted-foreground">AI is analyzing your needs...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Response */}
        <AnimatePresence>
          {aiMessage && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div className="glass-card p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="mb-1 font-ui text-xs font-medium text-primary">Herbal AI Advisor</p>
                    <div className="font-body text-base leading-relaxed text-foreground prose prose-sm max-w-none">
                      <ReactMarkdown>{aiMessage}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product cards */}
              {matchedProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className="glass-card-hover flex items-center gap-5 p-6"
                >
                  <div className="relative h-16 w-16 shrink-0">
                    <div
                      className="h-full w-full rounded-2xl shadow-lg"
                      style={{
                        background: `radial-gradient(circle at 35% 35%, ${p.color}cc, ${p.color}66)`,
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-2xl opacity-30 blur-xl"
                      style={{ backgroundColor: p.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-semibold text-foreground">{p.name}</h3>
                    <p className="font-body text-sm text-muted-foreground truncate">{p.benefits.join(" • ")}</p>
                  </div>
                  <a
                    href={getWhatsAppLink(p.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-premium flex shrink-0 items-center gap-1.5 py-2.5 px-5 text-xs"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> Order
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
