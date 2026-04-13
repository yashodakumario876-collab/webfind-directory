import { Layout } from "@/components/Layout";
import { WebsiteCard } from "@/components/WebsiteCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/hooks/use-search";
import { useCategories, useWebsites } from "@/hooks/use-websites";
import { Filter, Globe2, Loader2, Search, TrendingUp, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function ResultSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => (
        <Skeleton key={k} className="h-64 rounded-xl" />
      ))}
    </div>
  );
}

function EmptyState({
  query,
  category,
  onReset,
}: {
  query: string;
  category: string;
  onReset: () => void;
}) {
  return (
    <motion.div
      data-ocid="empty-state"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-5">
        <Globe2 size={28} className="text-muted-foreground" />
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        Koi website nahi mili
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
        {query && category
          ? `"${query}" ke liye "${category}" mein koi result nahi aaya.`
          : query
            ? `"${query}" ke liye koi result nahi aaya. Kuch aur try karein.`
            : "Is category mein abhi koi website nahi hai."}
      </p>
      <Button
        variant="outline"
        onClick={onReset}
        className="gap-2"
        data-ocid="empty-state-reset"
      >
        <X size={14} />
        Search reset karein
      </Button>
    </motion.div>
  );
}

export function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: backendWebsites, isLoading: websitesLoading } = useWebsites();
  const { data: backendCategories, isLoading: categoriesLoading } =
    useCategories();

  const websites = backendWebsites ?? [];
  const categories = backendCategories ?? [];

  const { filters, results, setQuery, setCategory, reset } =
    useSearch(websites);

  // Debounce search input → setQuery
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setQuery(inputValue);
    }, 220);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [inputValue, setQuery]);

  const handleReset = () => {
    setInputValue("");
    reset();
    inputRef.current?.focus();
  };

  const isLoading = websitesLoading || categoriesLoading;
  const hasFilters = !!filters.query || !!filters.category;
  const totalCount = websites.length;

  return (
    <Layout>
      {/* ── Hero / Search Section ── */}
      <section className="bg-gradient-to-b from-primary/5 via-card to-card border-b border-border">
        <div className="container max-w-5xl mx-auto px-4 py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-primary text-xs font-medium mb-4">
              <Globe2 size={13} />
              <span>भारत की डिजिटल दुनिया</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 leading-tight">
              Find Any Website Instantly
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
              Kisi bhi field ki best websites khojein —{" "}
              <span className="text-foreground/80">
                शिक्षा, सरकारी, Tech aur bahut kuch
              </span>
            </p>
          </motion.div>

          {/* Search + Category Filter row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto"
          >
            {/* Search input */}
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10"
              />
              <input
                ref={inputRef}
                type="search"
                data-ocid="search-input"
                className="input-smooth w-full pl-10 pr-10 h-11 text-sm rounded-lg"
                placeholder="Search websites... (वेबसाइट खोजें)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                aria-label="Search websites"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Category dropdown */}
            <div data-ocid="category-filter" className="sm:w-56">
              <Select
                value={filters.category || "__all__"}
                onValueChange={(v) => setCategory(v === "__all__" ? "" : v)}
                disabled={categoriesLoading}
              >
                <SelectTrigger
                  className="h-11 w-full text-sm bg-card border-border"
                  data-ocid="category-select"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Filter
                      size={13}
                      className="text-muted-foreground shrink-0"
                    />
                    <SelectValue placeholder="All Categories (सभी)" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">
                    All Categories (सभी श्रेणियां)
                  </SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Results Section ── */}
      <section className="bg-background min-h-[60vh]">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          {/* Results meta bar */}
          <div className="flex items-center justify-between mb-6 min-h-[28px]">
            {!isLoading && (
              <motion.div
                key={`${results.length}-${String(hasFilters)}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                {hasFilters ? (
                  <>
                    <span
                      className="text-sm font-medium text-foreground"
                      data-ocid="results-count"
                    >
                      <span className="text-primary font-semibold">
                        {results.length}
                      </span>{" "}
                      website{results.length !== 1 ? "s" : ""} found
                    </span>
                    <span className="text-muted-foreground text-xs hidden sm:inline">
                      ({totalCount} total mein se)
                    </span>
                  </>
                ) : (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <TrendingUp size={14} className="text-primary shrink-0" />
                    <span data-ocid="results-count">
                      <span className="text-primary font-semibold">
                        {totalCount}
                      </span>{" "}
                      websites available hain
                    </span>
                  </div>
                )}
              </motion.div>
            )}

            {hasFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
                data-ocid="clear-filters"
              >
                <X size={12} />
                Clear filters
              </button>
            )}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 size={14} className="animate-spin" />
                <span>Websites load ho rahi hain...</span>
              </div>
              <ResultSkeleton />
            </div>
          )}

          {/* Grid */}
          {!isLoading && results.length > 0 && (
            <motion.div
              data-ocid="results-grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {results.map((website, index) => (
                  <motion.div
                    key={String(website.id)}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.25,
                      delay: Math.min(index * 0.04, 0.3),
                    }}
                  >
                    <WebsiteCard website={website} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Empty state — filters active, no results */}
          {!isLoading && results.length === 0 && totalCount > 0 && (
            <EmptyState
              query={filters.query}
              category={filters.category}
              onReset={handleReset}
            />
          )}

          {/* Empty state — no data at all */}
          {!isLoading && totalCount === 0 && (
            <motion.div
              data-ocid="no-data-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <Globe2 size={28} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Directory abhi khali hai
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Pehli website submit karein aur community ki shuruat karein!
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}
