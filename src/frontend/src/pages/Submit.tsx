import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategories, useSubmitWebsite } from "@/hooks/use-websites";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Globe,
  Loader2,
  Plus,
  Tag,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const DEFAULT_CATEGORIES = [
  "Education (शिक्षा)",
  "Agriculture (कृषि)",
  "Health & Wellness (स्वास्थ्य)",
  "Government Jobs (सरकारी नौकरी)",
  "Technology (टेक्नोलॉजी)",
  "Local Services (स्थानीय सेवाएं)",
  "Finance (वित्त)",
  "Entertainment (मनोरंजन)",
  "News (समाचार)",
  "Business (व्यापार)",
  "Other (अन्य)",
];

interface FormState {
  name: string;
  description: string;
  url: string;
  category: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

function validateForm(values: FormState): FormErrors {
  const errs: FormErrors = {};
  if (!values.name.trim()) errs.name = "Website ka naam zaroori hai";
  if (!values.description.trim()) errs.description = "Description zaroori hai";
  if (!values.url.trim()) {
    errs.url = "URL zaroori hai";
  } else if (!/^https?:\/\//i.test(values.url)) {
    errs.url = "URL http:// ya https:// se shuru hona chahiye";
  }
  if (!values.category) errs.category = "Category chunna zaroori hai";
  return errs;
}

export function SubmitPage() {
  const { data: backendCategories, isLoading: categoriesLoading } =
    useCategories();
  const { mutateAsync: submitWebsite, isPending } = useSubmitWebsite();

  const categories =
    backendCategories && backendCategories.length > 0
      ? backendCategories
      : DEFAULT_CATEGORIES;

  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    url: "",
    category: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  function handleFieldChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitError(false);
  }

  function handleBlur(field: keyof FormState) {
    const fieldErrors = validateForm({ ...form });
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && !tags.includes(t) && tags.length < 5) {
      setTags((prev) => [...prev, t]);
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateForm(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitError(false);
    try {
      await submitWebsite({ ...form, tags });
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    }
  }

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="card-subtle max-w-md w-full p-8 text-center space-y-5"
            data-ocid="submit-success"
          >
            <div className="flex justify-center">
              <CheckCircle2
                className="w-16 h-16 text-primary"
                strokeWidth={1.5}
              />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Website Submit Ho Gayi! 🎉
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Website submitted successfully! Hamari team review karegi aur jald
              hi list karengi.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="btn-primary flex items-center justify-center gap-2"
                data-ocid="success-browse-link"
              >
                <Globe className="w-4 h-4" />
                Browse Websites
              </Link>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setForm({ name: "", description: "", url: "", category: "" });
                  setTags([]);
                  setErrors({});
                  setSubmitted(false);
                }}
                data-ocid="submit-another-btn"
              >
                Aur Submit Karein
              </button>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-2xl mx-auto px-4 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          data-ocid="submit-back-link"
        >
          <ArrowLeft size={16} />
          Back to Discover (वापस जाएं)
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Submit a Website (वेबसाइट जोड़ें)
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Share a useful website with the community. All submissions are
              reviewed.
            </p>
          </div>

          {/* Error banner */}
          {submitError && (
            <div
              className="flex items-start gap-3 rounded-md bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive mb-6"
              data-ocid="submit-error-banner"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Kuch galat ho gaya. Thodi der baad dobara try karein।</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            data-ocid="submit-form"
            noValidate
          >
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium">
                Website Name (वेबसाइट का नाम){" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                data-ocid="input-name"
                value={form.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder="e.g. ShikshaHub (शिक्षा हब)"
                className="input-smooth h-11"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className="text-xs text-destructive flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* URL */}
            <div className="space-y-1.5">
              <Label htmlFor="url" className="text-sm font-medium">
                Website URL <span className="text-destructive">*</span>
              </Label>
              <Input
                id="url"
                data-ocid="input-url"
                type="url"
                value={form.url}
                onChange={(e) => handleFieldChange("url", e.target.value)}
                onBlur={() => handleBlur("url")}
                placeholder="https://example.com"
                className="input-smooth h-11"
                aria-invalid={!!errors.url}
                aria-describedby={errors.url ? "url-error" : undefined}
              />
              {errors.url && (
                <p
                  id="url-error"
                  className="text-xs text-destructive flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.url}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-sm font-medium">
                Description (विवरण) <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                data-ocid="input-description"
                value={form.description}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
                onBlur={() => handleBlur("description")}
                placeholder="Describe what this website offers... (यह वेबसाइट क्या प्रदान करती है?)"
                rows={3}
                className="input-smooth resize-none"
                aria-invalid={!!errors.description}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
              />
              {errors.description && (
                <p
                  id="description-error"
                  className="text-xs text-destructive flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                Category (श्रेणी) <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.category}
                onValueChange={(v) => handleFieldChange("category", v)}
                disabled={categoriesLoading}
              >
                <SelectTrigger
                  className="input-smooth h-11 w-full"
                  data-ocid="select-category"
                  aria-invalid={!!errors.category}
                >
                  <SelectValue
                    placeholder={
                      categoriesLoading
                        ? "Categories load ho rahi hain..."
                        : "Select a category (श्रेणी चुनें)"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.category}
                </p>
              )}
            </div>

            {/* Tags (optional) */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                Tags (टैग){" "}
                <span className="text-muted-foreground text-xs font-normal ml-1">
                  optional, max 5
                </span>
              </Label>
              <div className="flex gap-2">
                <Input
                  data-ocid="input-tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="e.g. Education, Hindi, Farming"
                  className="input-smooth h-10 flex-1"
                  disabled={tags.length >= 5}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addTag}
                  disabled={!tagInput.trim() || tags.length >= 5}
                  className="h-10 w-10"
                  aria-label="Add tag"
                >
                  <Plus size={16} />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge-pill flex items-center gap-1.5 pr-1.5"
                    >
                      <Tag size={10} />
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-destructive transition-colors"
                        aria-label={`Remove tag ${tag}`}
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="btn-primary w-full h-11 text-sm font-medium flex items-center justify-center gap-2"
              disabled={isPending}
              data-ocid="submit-btn"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting... (जमा हो रहा है...)
                </>
              ) : (
                "Submit Website (वेबसाइट जोड़ें)"
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}
