import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin, Phone } from "lucide-react";
import { getWhatsAppLink } from "@/data/products";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
          <span className="section-label mb-4 inline-block">Get in Touch</span>
          <h1 className="mb-4 font-display text-4xl font-bold md:text-6xl">
            <span className="gradient-text">Contact</span> Us
          </h1>
          <p className="font-body text-lg text-muted-foreground">
            Have questions? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { icon: Mail, label: "Email", value: "hello@herbanature.com" },
              { icon: Phone, label: "Phone", value: "+91 8217566236" },
              { icon: MapPin, label: "Location", value: "Bangalore, India" },
            ].map((item) => (
              <div key={item.label} className="glass-card-hover flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-ui text-xs font-medium text-muted-foreground">{item.label}</p>
                  <p className="font-ui text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              </div>
            ))}

            <a
              href={getWhatsAppLink("Hello! I have a question about your herbal products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium flex items-center justify-center gap-2 w-full"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card space-y-5 p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="mb-2 block font-ui text-xs font-semibold uppercase tracking-widest text-foreground">Name</label>
              <input className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 font-ui text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Your name" />
            </div>
            <div>
              <label className="mb-2 block font-ui text-xs font-semibold uppercase tracking-widest text-foreground">Email</label>
              <input type="email" className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 font-ui text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="you@email.com" />
            </div>
            <div>
              <label className="mb-2 block font-ui text-xs font-semibold uppercase tracking-widest text-foreground">Message</label>
              <textarea rows={4} className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 font-ui text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none" placeholder="Tell us how we can help..." />
            </div>
            <button type="submit" className="btn-premium w-full">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
