import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const posts = [
  { title: "5 Benefits of Turmeric You Didn't Know", excerpt: "Discover how this golden spice can transform your health beyond just being a kitchen staple.", date: "Mar 8, 2026", category: "Immunity" },
  { title: "Morning Rituals with Moringa", excerpt: "Start your day with the miracle tree powder and feel the energy difference.", date: "Mar 5, 2026", category: "Energy" },
  { title: "Ashwagandha: Ancient Herb for Modern Stress", excerpt: "How this adaptogenic herb can help you navigate the pressures of modern life.", date: "Mar 1, 2026", category: "Wellness" },
  { title: "DIY Neem Face Masks for Glowing Skin", excerpt: "Simple, effective recipes using neem powder for clear, radiant skin.", date: "Feb 25, 2026", category: "Skin Care" },
  { title: "Hibiscus & Amla: The Hair Growth Duo", excerpt: "Combine these two powerful herbs for thicker, healthier hair naturally.", date: "Feb 20, 2026", category: "Hair Care" },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-3xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="mb-3 font-display text-4xl font-bold">Health Tips & Blog</h1>
          <p className="font-body text-muted-foreground">Wisdom from nature, backed by Ayurveda</p>
        </motion.div>
        <div className="flex flex-col gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card cursor-pointer p-6 transition-all hover:shadow-xl"
            >
              <span className="mb-2 inline-block rounded-full bg-muted px-3 py-0.5 font-ui text-xs text-muted-foreground">{post.category}</span>
              <h2 className="mb-2 font-display text-xl font-semibold text-foreground">{post.title}</h2>
              <p className="mb-3 font-body text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span className="font-ui text-xs">{post.date}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
