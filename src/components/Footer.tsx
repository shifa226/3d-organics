import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-bold">HerbaNature</span>
            </div>
            <p className="font-body text-sm text-muted-foreground">
              Premium organic herbal powders for a healthier, natural lifestyle.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["/products", "/ai-advisor", "/about", "/blog", "/contact"].map((l) => (
                <Link key={l} to={l} className="font-ui text-sm text-muted-foreground hover:text-primary">
                  {l.replace("/", "").replace("-", " ").replace(/^\w/, (c) => c.toUpperCase()) || "Home"}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Products</h4>
            <div className="flex flex-col gap-2 font-ui text-sm text-muted-foreground">
              <span>Turmeric Powder</span>
              <span>Moringa Powder</span>
              <span>Ashwagandha Powder</span>
              <span>Neem Powder</span>
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Newsletter</h4>
            <p className="mb-3 font-body text-sm text-muted-foreground">Get health tips & exclusive offers.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 font-ui text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button className="rounded-lg bg-primary px-4 py-2 font-ui text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center font-ui text-xs text-muted-foreground">
          © 2026 HerbaNature. All rights reserved. Crafted with nature's wisdom.
        </div>
      </div>
    </footer>
  );
}
