import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Heart, Star, Leaf, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "@/components/HeroScene";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

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

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && ref.current) {
      gsap.fromTo(ref.current, { innerText: 0 }, {
        innerText: value,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power2.out",
      });
    }
  }, [isInView, value]);

  return <span ref={ref}>0</span>;
}

export default function HomePage() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Features parallax
      gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
          y: 60 + i * 20,
          opacity: 0,
          scale: 0.95,
        });
      });

      // Products section
      gsap.from(".products-heading", {
        scrollTrigger: {
          trigger: ".products-heading",
          start: "top 80%",
          scrub: 1,
        },
        y: 40,
        opacity: 0,
      });

      // Stats counter animation
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
      });

      // Testimonials
      gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.15,
        });
      });

      // FAQ
      gsap.utils.toArray<HTMLElement>(".faq-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          x: i % 2 === 0 ? -30 : 30,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.1,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ─── CINEMATIC HERO ─── */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <HeroScene />
        {/* Dark vignette overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/60 via-transparent to-transparent pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="section-label mb-6 inline-block"
            >
              <Leaf className="mr-1.5 inline h-3 w-3" />
              100% Organic & Natural
            </motion.span>

            <h1 className="mb-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
              <span className="block text-foreground">Nature's Purest</span>
              <span className="gradient-text glow-text">Herbal Powders</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-10 max-w-lg font-body text-xl leading-relaxed text-muted-foreground md:text-2xl"
            >
              Handcrafted from ancient Ayurvedic wisdom. Discover organic powders for immunity, hair, skin, and holistic wellness.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products" className="btn-premium flex items-center gap-2">
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/ai-advisor" className="btn-ghost-premium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" /> AI Health Advisor
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-ui text-xs uppercase tracking-widest text-muted-foreground">Discover</span>
            <ChevronDown className="h-4 w-4 text-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS ─── */}
      <section className="stats-section cinematic-section border-y border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: 50000, suffix: "+", label: "Happy Customers" },
              { value: 100, suffix: "%", label: "Organic & Natural" },
              { value: 6, suffix: "", label: "Herbal Products" },
              { value: 15, suffix: "+", label: "Years of Wisdom" },
            ].map((stat) => (
              <div key={stat.label} className="stat-item text-center">
                <div className="font-display text-4xl font-bold text-foreground md:text-5xl">
                  <AnimatedCounter value={stat.value} />
                  <span className="gradient-text">{stat.suffix}</span>
                </div>
                <p className="mt-2 font-ui text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section ref={featuresRef} className="cinematic-section py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <span className="section-label mb-4 inline-block">Why Choose Us</span>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              The <span className="gradient-text">HerbaNature</span> Difference
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Shield, title: "100% Organic", desc: "No chemicals, no preservatives. Pure nature in every jar. Sourced from certified organic farms." },
              { icon: Heart, title: "Ayurvedic Wisdom", desc: "Recipes passed down through centuries of traditional medicine. Time-tested formulations." },
              { icon: Sparkles, title: "AI-Powered Guidance", desc: "Get personalized recommendations from our Herbal AI Advisor. Technology meets tradition." },
            ].map((f) => (
              <div key={f.title} className="feature-card glass-card-hover p-8">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold text-foreground">{f.title}</h3>
                <p className="font-body text-lg leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section ref={productsRef} className="cinematic-section py-24">
        <div className="container mx-auto px-4">
          <div className="products-heading mb-16 text-center">
            <span className="section-label mb-4 inline-block">Our Collection</span>
            <h2 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              Premium <span className="gradient-text">Herbal Powders</span>
            </h2>
            <p className="mx-auto max-w-lg font-body text-lg text-muted-foreground">
              Handpicked powders for your wellness journey
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/products" className="btn-ghost-premium inline-flex items-center gap-2">
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="cinematic-section py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <span className="section-label mb-4 inline-block">Testimonials</span>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              What Our <span className="gradient-text">Customers</span> Say
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={t.name} className="testimonial-card glass-card-hover p-8">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mb-6 font-body text-lg italic leading-relaxed text-muted-foreground">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-ui text-sm font-semibold text-primary">{t.name[0]}</span>
                  </div>
                  <p className="font-ui text-sm font-semibold text-foreground">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="cinematic-section py-24">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="mb-16 text-center">
            <span className="section-label mb-4 inline-block">FAQ</span>
            <h2 className="font-display text-4xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((f) => (
              <details key={f.q} className="faq-item glass-card-hover cursor-pointer p-6 open:pb-6 group">
                <summary className="flex items-center justify-between font-display text-lg font-semibold text-foreground">
                  {f.q}
                  <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 font-body text-lg leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cinematic-section py-24">
        <div className="container mx-auto px-4">
          <div className="glass-card relative overflow-hidden p-12 text-center md:p-16">
            <div className="absolute inset-0 opacity-20" style={{
              background: "radial-gradient(ellipse at 30% 50%, hsl(145 45% 38% / 0.3), transparent 60%), radial-gradient(ellipse at 70% 50%, hsl(42 65% 55% / 0.2), transparent 60%)"
            }} />
            <div className="relative z-10">
              <h2 className="mb-4 font-display text-4xl font-bold md:text-5xl">
                Begin Your <span className="gradient-text">Wellness Journey</span>
              </h2>
              <p className="mx-auto mb-8 max-w-lg font-body text-lg text-muted-foreground">
                Let our AI Advisor find the perfect herbal combination for your unique health goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/ai-advisor" className="btn-premium flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Try AI Advisor
                </Link>
                <Link to="/products" className="btn-ghost-premium flex items-center gap-2">
                  Browse Products <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
