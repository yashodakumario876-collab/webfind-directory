import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Website } from "@/types";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Globe } from "lucide-react";

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

interface WebsiteCardProps {
  website: Website;
}

export function WebsiteCard({ website }: WebsiteCardProps) {
  return (
    <article
      data-ocid="website-card"
      className="card-subtle flex flex-col gap-4 p-6 hover:shadow-md transition-smooth hover:border-primary/30 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <Link
          to="/website/$id"
          params={{ id: String(website.id) }}
          className="flex-1 min-w-0"
        >
          <h3 className="font-display font-semibold text-lg text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {website.name}
          </h3>
        </Link>
        <a
          href={website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
          aria-label={`Open ${website.name} in new tab`}
        >
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
        {website.description}
      </p>

      {/* Tags */}
      {website.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {website.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="badge-pill text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 pt-1 border-t border-border">
        <div className="flex items-center gap-1.5 min-w-0">
          <Badge
            variant="secondary"
            className="shrink-0 text-xs font-medium bg-primary/10 text-primary border-primary/20"
          >
            {website.category}
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground min-w-0">
          <Globe size={12} className="shrink-0" />
          <span className="truncate">{getDomain(website.url)}</span>
        </div>
      </div>

      <Button
        asChild
        className="btn-primary w-full text-sm"
        data-ocid="visit-website-btn"
      >
        <a href={website.url} target="_blank" rel="noopener noreferrer">
          Visit Website (वेबसाइट देखें)
        </a>
      </Button>
    </article>
  );
}
