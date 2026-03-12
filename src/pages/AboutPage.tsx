import { motion } from "framer-motion";
import { Leaf, Heart, Shield, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
          <span className="section-label mb-4 inline-block">Our Story</span>
          <h1 className="mb-4 font-display text-4xl font-bold md:text-6xl">
            About <span className="gradient-text">HerbaNature</span>
          </h1>
          <p className="mx-auto max-w-lg font-body text-xl text-muted-foreground">
            Bringing ancient Ayurvedic wisdom to modern wellness.
          </p>
        </motion.div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12"
          >
            <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="font-body text-lg leading-relaxed text-muted-foreground">
              At HerbaNature, we believe in the transformative power of nature. Our journey began with a simple mission:
              to make the purest, most authentic herbal powders accessible to everyone. Every product is sourced from
              certified organic farms, hand-processed using traditional methods, and delivered with love.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { icon: Leaf, title: "Pure & Natural", desc: "Every powder is 100% organic, free from chemicals, preservatives, and artificial additives." },
              { icon: Heart, title: "Made with Love", desc: "Hand-processed in small batches to ensure the highest quality and potency." },
              { icon: Shield, title: "Lab Tested", desc: "Every batch is tested for purity and safety in certified laboratories." },
              { icon: Award, title: "15+ Years", desc: "Over 15 years of experience in Ayurvedic herbal formulations and wellness." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover p-7"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="font-body text-base text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
