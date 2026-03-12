import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

export default function ProductsPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".product-grid-item", {
        scrollTrigger: {
          trigger: ".product-grid",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
          <span className="section-label mb-4 inline-block">Our Collection</span>
          <h1 className="mb-4 font-display text-4xl font-bold md:text-6xl">
            Premium <span className="gradient-text">Herbal Powders</span>
          </h1>
          <p className="mx-auto max-w-lg font-body text-lg text-muted-foreground">
            Pure, organic herbal powders crafted with centuries of Ayurvedic knowledge
          </p>
        </motion.div>
        <div className="product-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <div key={p.id} className="product-grid-item">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
