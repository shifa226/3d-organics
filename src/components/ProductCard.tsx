import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Product, getWhatsAppLink } from "@/data/products";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card group overflow-hidden p-6 transition-all duration-300 hover:shadow-xl"
    >
      {/* Color accent bar */}
      <div className="mb-4 h-1.5 w-16 rounded-full" style={{ backgroundColor: product.color }} />

      {/* Animated sphere representing the powder */}
      <div className="relative mx-auto mb-5 flex h-28 w-28 items-center justify-center">
        <motion.div
          className="h-20 w-20 rounded-full shadow-lg"
          style={{ backgroundColor: product.color }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute h-24 w-24 rounded-full opacity-20 blur-xl"
          style={{ backgroundColor: product.color }}
        />
      </div>

      <span className="mb-1 inline-block rounded-full bg-muted px-3 py-0.5 font-ui text-xs text-muted-foreground">
        {product.category}
      </span>
      <h3 className="mb-2 font-display text-xl font-semibold text-foreground">{product.name}</h3>
      <p className="mb-3 font-body text-sm leading-relaxed text-muted-foreground">{product.description}</p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {product.benefits.map((b) => (
          <span key={b} className="rounded-full border border-border bg-background px-2.5 py-0.5 font-ui text-xs text-muted-foreground">
            {b}
          </span>
        ))}
      </div>

      <p className="mb-4 font-display text-2xl font-bold text-foreground">₹{product.price}</p>

      <div className="flex flex-col gap-2">
        <a
          href={getWhatsAppLink(product.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-ui text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <MessageCircle className="h-4 w-4" />
          Order on WhatsApp
        </a>
        <Link
          to="/ai-advisor"
          className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 font-ui text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Sparkles className="h-4 w-4 text-accent" />
          Ask AI if this suits me
        </Link>
      </div>
    </motion.div>
  );
}
