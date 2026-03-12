import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Product, getWhatsAppLink } from "@/data/products";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card-hover group overflow-hidden p-7"
    >
      {/* Product color glow */}
      <div className="relative mx-auto mb-6 flex h-36 w-36 items-center justify-center">
        {/* Glow ring */}
        <div
          className="absolute h-32 w-32 rounded-full opacity-20 blur-2xl animate-glow-pulse"
          style={{ backgroundColor: product.color }}
        />
        {/* Rotating sphere */}
        <motion.div
          className="relative h-24 w-24 rounded-full shadow-2xl"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${product.color}cc, ${product.color}88, ${product.color}44)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          {/* Highlight */}
          <div
            className="absolute left-3 top-3 h-8 w-8 rounded-full opacity-40 blur-sm"
            style={{ background: "radial-gradient(circle, white, transparent)" }}
          />
        </motion.div>
      </div>

      {/* Category pill */}
      <span className="section-label mb-3 inline-block text-[10px]">
        {product.category}
      </span>

      <h3 className="mb-2 font-display text-xl font-semibold text-foreground">{product.name}</h3>
      <p className="mb-4 font-body text-base leading-relaxed text-muted-foreground">{product.description}</p>

      {/* Benefits */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {product.benefits.map((b) => (
          <span
            key={b}
            className="rounded-full border border-border bg-muted/50 px-3 py-1 font-ui text-xs text-muted-foreground"
          >
            {b}
          </span>
        ))}
      </div>

      {/* Price */}
      <p className="mb-5 font-display text-3xl font-bold text-foreground">
        ₹{product.price}
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <a
          href={getWhatsAppLink(product.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-premium flex items-center justify-center gap-2 py-3 text-center"
        >
          <MessageCircle className="h-4 w-4" />
          Order on WhatsApp
        </a>
        <Link
          to="/ai-advisor"
          className="btn-ghost-premium flex items-center justify-center gap-2 py-3 text-center"
        >
          <Sparkles className="h-4 w-4 text-accent" />
          Ask AI if this suits me
        </Link>
      </div>
    </motion.div>
  );
}
