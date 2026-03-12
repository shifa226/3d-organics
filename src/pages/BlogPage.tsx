import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
  { title: "5 Benefits of Turmeric You Didn't Know", date: "Mar 5, 2026", excerpt: "Discover the hidden powers of the golden spice that has been used for centuries in traditional medicine.", category: "Wellness" },
  { title: "Morning Routine with Herbal Powders", date: "Feb 28, 2026", excerpt: "Start your day right with these simple herbal powder routines for energy and vitality.", category: "Lifestyle" },
  { title: "Ashwagandha: The Stress Buster", date: "Feb 20, 2026", excerpt: "Learn how this ancient adaptogen can help you manage modern-day stress and anxiety.", category: "Health" },
  { title: "Natural Hair Care with Hibiscus", date: "Feb 15, 2026", excerpt: "Transform your hair care routine with the power of hibiscus and Ayurvedic treatments.", category: "Beauty" },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
          <span className="section-label mb-4 inline-block">Health Tips</span>
          <h1 className="mb-4 font-display text-4xl font-bold md:text-6xl">
            The <span className="gradient-text">Herbal Journal</span>
          </h1>
          <p className="font-body text-lg text-muted-foreground">Insights, tips, and wisdom from the world of Ayurveda</p>
        </motion.div>

        <div className="space-y-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover group cursor-pointer p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="section-label mb-3 inline-block text-[10px]">{post.category}</span>
                  <h2 className="mb-2 font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="mb-3 font-body text-base text-muted-foreground">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="font-ui text-xs">{post.date}</span>
                  </div>
                </div>
                <ArrowRight className="mt-6 h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
