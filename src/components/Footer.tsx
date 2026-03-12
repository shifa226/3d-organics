import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">HerbaNature</span>
            </div>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              Premium organic herbal powders for a healthier, natural lifestyle.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-ui text-xs font-semibold uppercase tracking-widest text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {["/products", "/ai-advisor", "/about", "/blog", "/contact"].map((l) => (
                <Link key={l} to={l} className="font-ui text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {l.replace("/", "").replace("-", " ").replace(/^\w/, (c) => c.toUpperCase()) || "Home"}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-ui text-xs font-semibold uppercase tracking-widest text-foreground">Products</h4>
            <div className="flex flex-col gap-3 font-ui text-sm text-muted-foreground">
              <span>Turmeric Powder</span>
              <span>Moringa Powder</span>
              <span>Ashwagandha Powder</span>
              <span>Neem Powder</span>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-ui text-xs font-semibold uppercase tracking-widest text-foreground">Newsletter</h4>
            <p className="mb-4 font-body text-base text-muted-foreground">Get health tips & exclusive offers.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-xl border border-border bg-muted/30 px-4 py-2.5 font-ui text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button className="btn-premium px-5 py-2.5 text-xs">
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center font-ui text-xs text-muted-foreground">
          © 2026 HerbaNature. All rights reserved. Crafted with nature's wisdom.
        </div>
      </div>
    </footer>
  );
}
