import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, MessageCircle, Send } from "lucide-react";
import { products, getWhatsAppLink } from "@/data/products";

const goals = ["Hair Care", "Skin Care", "Immunity", "Stress Relief", "Digestion", "Energy"];

const recommendations: Record<string, string[]> = {
  "Hair Care": ["hibiscus", "amla"],
  "Skin Care": ["neem", "turmeric"],
  "Immunity": ["turmeric", "moringa"],
  "Stress Relief": ["ashwagandha"],
  "Digestion": ["turmeric", "amla"],
  "Energy": ["moringa", "ashwagandha"],
};

export default function AIAdvisorPage() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [issue, setIssue] = useState("");
  const [result, setResult] = useState<typeof products | null>(null);

  const handleRecommend = () => {
    if (!selectedGoal) return;
    const ids = recommendations[selectedGoal] || ["turmeric"];
    setResult(products.filter((p) => ids.includes(p.id)));
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-2xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <Sparkles className="mx-auto mb-3 h-10 w-10 text-accent" />
          <h1 className="mb-3 font-display text-4xl font-bold">Herbal AI Advisor</h1>
          <p className="font-body text-muted-foreground">Tell us your health goals and we'll recommend the perfect herbal powders for you.</p>
        </motion.div>

        <div className="glass-card p-6 mb-8">
          <label className="mb-2 block font-ui text-sm font-semibold text-foreground">What health issue do you have?</label>
          <input
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="e.g. hair fall, acne, low immunity..."
            className="mb-6 w-full rounded-lg border border-border bg-background px-4 py-2.5 font-ui text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />

          <label className="mb-3 block font-ui text-sm font-semibold text-foreground">What is your goal?</label>
          <div className="mb-6 flex flex-wrap gap-2">
            {goals.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGoal(g)}
                className={`rounded-full border px-4 py-2 font-ui text-sm transition-all ${
                  selectedGoal === g
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:bg-muted"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <button
            onClick={handleRecommend}
            disabled={!selectedGoal}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-ui text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" /> Get Recommendations
          </button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-center">
              We Recommend for {selectedGoal}
            </h2>
            {result.map((p) => (
              <div key={p.id} className="glass-card flex items-center gap-4 p-5">
                <div className="h-14 w-14 shrink-0 rounded-full shadow-md" style={{ backgroundColor: p.color }} />
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  <p className="font-body text-sm text-muted-foreground">{p.benefits.join(" • ")}</p>
                </div>
                <a
                  href={getWhatsAppLink(p.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 font-ui text-xs font-semibold text-primary-foreground"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Order
                </a>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
