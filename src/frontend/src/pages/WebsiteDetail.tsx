import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useWebsiteById } from "@/hooks/use-websites";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Clock, ExternalLink, Globe, Tag } from "lucide-react";
import { motion } from "motion/react";

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function WebsiteDetailPage() {
  const { id } = useParams({ from: "/website/$id" });
  const websiteId = BigInt(id);
  const { data: website, isLoading } = useWebsiteById(websiteId);

  return (
    <Layout>
      <div className="container max-w-3xl mx-auto px-4 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Discover (वापस जाएं)
        </Link>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        ) : !website ? (
          <div
            data-ocid="not-found"
            className="flex flex-col items-center justify-center py-20 text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Globe size={28} className="text-muted-foreground" />
            </div>
            <h2 className="font-display font-semibold text-lg text-foreground">
              Website not found (वेबसाइट नहीं मिली)
            </h2>
            <p className="text-sm text-muted-foreground">
              This listing may have been removed.
            </p>
            <Link to="/">
              <Button className="btn-primary">Back to Home</Button>
            </Link>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Header Card */}
            <div
              className="card-subtle p-7 space-y-4"
              data-ocid="website-detail-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h1 className="font-display text-2xl font-bold text-foreground leading-snug">
                    {website.name}
                  </h1>
                  <div className="flex items-center gap-1.5 mt-1.5 text-sm text-muted-foreground">
                    <Globe size={14} />
                    <a
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors truncate"
                    >
                      {getDomain(website.url)}
                    </a>
                  </div>
                </div>
                <Badge className="shrink-0 bg-primary/10 text-primary border-primary/20 text-sm">
                  {website.category}
                </Badge>
              </div>

              <p className="text-foreground/80 leading-relaxed">
                {website.description}
              </p>

              {/* Tags */}
              {website.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {website.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge-pill flex items-center gap-1.5"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta */}
              {website.submittedAt > 0n && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t border-border">
                  <Clock size={12} />
                  <span>
                    Submitted:{" "}
                    {new Date(
                      Number(website.submittedAt / 1_000_000n),
                    ).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* CTA */}
            <Button
              asChild
              className="btn-primary w-full h-12 text-base font-medium"
              data-ocid="detail-visit-btn"
            >
              <a href={website.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={18} className="mr-2" />
                Visit Website (वेबसाइट देखें)
              </a>
            </Button>

            {/* Back */}
            <div className="text-center pt-2">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Browse more websites (और वेबसाइट देखें)
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
