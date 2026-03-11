import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/products";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="mb-3 font-display text-4xl font-bold">Get in Touch</h1>
          <p className="font-body text-muted-foreground">We'd love to hear from you</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="glass-card p-6">
            <h2 className="mb-4 font-display text-xl font-semibold">Send a Message</h2>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Your Name" className="rounded-lg border border-border bg-background px-4 py-2.5 font-ui text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              <input placeholder="Email Address" type="email" className="rounded-lg border border-border bg-background px-4 py-2.5 font-ui text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              <textarea placeholder="Your Message" rows={4} className="rounded-lg border border-border bg-background px-4 py-2.5 font-ui text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              <button className="rounded-lg bg-primary px-6 py-2.5 font-ui text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Send Message
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { icon: Mail, label: "Email", value: "hello@herbanature.com" },
              { icon: Phone, label: "Phone", value: "+91 8217566236" },
              { icon: MapPin, label: "Location", value: "Kerala, India" },
            ].map((item) => (
              <div key={item.label} className="glass-card flex items-center gap-4 p-5">
                <item.icon className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-ui text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-display text-sm font-semibold">{item.value}</p>
                </div>
              </div>
            ))}
            <a
              href={getWhatsAppLink("Hello! I have a question about your products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-4 p-5 transition-all hover:shadow-xl"
            >
              <MessageCircle className="h-6 w-6 text-primary" />
              <div>
                <p className="font-ui text-xs text-muted-foreground">WhatsApp</p>
                <p className="font-display text-sm font-semibold">Chat with us instantly</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
