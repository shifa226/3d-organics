import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an expert Ayurvedic and herbal wellness advisor. You recommend herbal powders based on the user's health goals and issues.

Available products:
1. Turmeric Powder (₹299) - Anti-inflammatory, immunity booster, skin glow, joint pain relief. Categories: immunity, skin care, digestion.
2. Moringa Powder (₹349) - Nutrient-dense superfood, energy booster, blood sugar support. Categories: energy, immunity.
3. Ashwagandha Powder (₹399) - Stress relief, better sleep, muscle strength, hormonal balance. Categories: stress relief, energy.
4. Neem Powder (₹249) - Blood purifier, acne treatment, antibacterial, detox. Categories: skin care.
5. Amla Powder (₹279) - Vitamin C rich, hair strengthening, digestion aid, anti-aging. Categories: hair care, digestion.
6. Hibiscus Powder (₹299) - Hair growth, scalp health, blood pressure support, antioxidant. Categories: hair care.

Based on the user's health goal and specific issue, recommend 1-3 products. Explain WHY each product helps their specific concern. Keep your response concise (2-4 sentences). Be warm and knowledgeable. Always mention the product names exactly as listed above.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { goal, issue } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const userMessage = `My health goal is: ${goal}.${issue ? ` My specific issue is: ${issue}.` : ""} What herbal powders do you recommend?`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage credits exhausted. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("herbal-advisor error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
