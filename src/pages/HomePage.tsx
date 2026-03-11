import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Heart, Star } from "lucide-react";
import HeroScene from "@/components/HeroScene";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const testimonials = [
  { name: "Priya M.", text: "The turmeric powder transformed my skin. Pure and authentic quality!", rating: 5 },
  { name: "Raj K.", text: "Ashwagandha helped me manage stress like nothing else. Highly recommend.", rating: 5 },
  { name: "Anita S.", text: "My hair fall reduced drastically with Hibiscus + Amla combo. Thank you!", rating: 5 },
];

const faqs = [
  { q: "Are your products 100% organic?", a: "Yes, all our herbal powders are certified organic, sourced directly from trusted farms with no chemical additives." },
  { q: "How should I use the powders?", a: "Mix 1-2 teaspoons with warm water, milk, or smoothies. For skin/hair, make a paste with water or rose water." },
  { q: "Can I combine multiple powders?", a: "Absolutely! Use our AI Advisor to find the perfect combination for your health goals." },
  { q: "Do you ship internationally?", a: "Yes, we ship worldwide. Reach out on WhatsApp for shipping details to your region." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <HeroScene />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-block rounded-full border border-border bg-card/80 px-4 py-1 font-ui text-sm text-muted-foreground backdrop-blur">
              🌿 100% Organic & Natural
            </span>
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight text-foreground md:text-7xl">
              Nature's Purest <span className="gradient-text">Herbal Powders</span>
            </h1>
            <p className="mb-8 max-w-lg font-body text-lg text-muted-foreground">
              Handcrafted from ancient Ayurvedic wisdom. Discover organic powders for immunity, hair, skin, and holistic wellness.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-ui text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
              >
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/ai-advisor"
                className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3 font-ui text-sm font-semibold text-foreground backdrop-blur transition-all hover:bg-card"
              >
                <Sparkles className="h-4 w-4 text-accent" /> AI Health Advisor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Shield, title: "100% Organic", desc: "No chemicals, no preservatives. Pure nature in every jar." },
              { icon: Heart, title: "Ayurvedic Wisdom", desc: "Recipes passed down through centuries of traditional medicine." },
              { icon: Sparkles, title: "AI-Powered Guidance", desc: "Get personalized recommendations from our Herbal AI Advisor." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-6 text-center"
              >
                <f.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-display text-lg font-semibold">{f.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="mb-3 font-display text-3xl font-bold md:text-4xl">Our Herbal Collection</h2>
            <p className="font-body text-muted-foreground">Handpicked powders for your wellness journey</p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/products" className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-primary hover:underline">
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center font-display text-3xl font-bold">What Our Customers Say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-herb-gold text-herb-gold" />
                  ))}
                </div>
                <p className="mb-3 font-body text-sm italic text-muted-foreground">"{t.text}"</p>
                <p className="font-ui text-sm font-semibold text-foreground">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-card/50 py-20">
        <div className="container mx-auto max-w-2xl px-4">
          <h2 className="mb-10 text-center font-display text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((f) => (
              <details key={f.q} className="glass-card cursor-pointer p-5 open:pb-5">
                <summary className="font-display text-base font-semibold text-foreground">{f.q}</summary>
                <p className="mt-3 font-body text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
