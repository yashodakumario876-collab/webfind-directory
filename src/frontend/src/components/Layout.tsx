import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Globe2, Plus, Search } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const utmUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-xs">
        <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group"
            data-ocid="header-logo"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-xs group-hover:shadow-md transition-smooth">
              <Globe2 size={18} className="text-primary-foreground" />
            </div>
            <div className="leading-none">
              <span className="font-display font-bold text-xl text-foreground">
                WebFind
              </span>
              <p className="text-[10px] text-muted-foreground font-body tracking-wide">
                भारत की डिजिटल दुनिया
              </p>
            </div>
          </Link>

          {/* Nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="nav-home"
            >
              Discover (खोजें)
            </Link>
          </nav>

          {/* CTA */}
          <Link to="/submit" data-ocid="nav-submit">
            <Button className="btn-primary flex items-center gap-2 text-sm">
              <Plus size={15} />
              <span className="hidden sm:inline">Submit Website</span>
              <span className="sm:hidden">Submit</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <Search size={12} className="text-primary-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">
                © {year}. Built with love using{" "}
                <a
                  href={utmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  caffeine.ai
                </a>
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Discover (खोजें)
              </Link>
              <Link
                to="/submit"
                className="hover:text-foreground transition-colors"
              >
                Submit Site (जोड़ें)
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
