import { motion } from "framer-motion";
import { Leaf, Heart, Award, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
          <Leaf className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">About HerbaNature</h1>
          <p className="mb-12 font-body text-lg text-muted-foreground">
            Born from a deep reverence for Ayurveda and nature's healing power, HerbaNature brings you the purest herbal powders sourced directly from organic farms across India.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-2">
          {[
            { icon: Heart, title: "Our Mission", desc: "To make authentic Ayurvedic wellness accessible to everyone through pure, organic herbal powders." },
            { icon: Award, title: "Quality Promise", desc: "Every batch is lab-tested for purity. No fillers, no chemicals — just nature's finest ingredients." },
            { icon: Users, title: "Community First", desc: "We work directly with farming communities, ensuring fair trade and sustainable practices." },
            { icon: Leaf, title: "Sustainability", desc: "Eco-friendly packaging, carbon-neutral shipping, and a commitment to leaving the earth better." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <item.icon className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-display text-xl font-semibold">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
