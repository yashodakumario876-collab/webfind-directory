import { j as jsxRuntimeExports, c as cn, r as reactExports, L as Link } from "./index-Dyou9ZIE.js";
import { c as createLucideIcon, g as createSlot, e as useCategories, h as useSubmitWebsite, f as Layout, m as motion, G as Globe, B as Button, j as Plus } from "./proxy-D63_qSHf.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, X, L as LoaderCircle } from "./select-CA8e_9mc.js";
import { A as ArrowLeft, T as Tag } from "./tag-M6-ylRkJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
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
  "Other (अन्य)"
];
function validateForm(values) {
  const errs = {};
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
function SubmitPage() {
  const { data: backendCategories, isLoading: categoriesLoading } = useCategories();
  const { mutateAsync: submitWebsite, isPending } = useSubmitWebsite();
  const categories = backendCategories && backendCategories.length > 0 ? backendCategories : DEFAULT_CATEGORIES;
  const [form, setForm] = reactExports.useState({
    name: "",
    description: "",
    url: "",
    category: ""
  });
  const [tagInput, setTagInput] = reactExports.useState("");
  const [tags, setTags] = reactExports.useState([]);
  const [errors, setErrors] = reactExports.useState({});
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [submitError, setSubmitError] = reactExports.useState(false);
  function handleFieldChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: void 0 }));
    setSubmitError(false);
  }
  function handleBlur(field) {
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
  function removeTag(tag) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }
  async function handleSubmit(e) {
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[60vh] flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.4 },
        className: "card-subtle max-w-md w-full p-8 text-center space-y-5",
        "data-ocid": "submit-success",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleCheck,
            {
              className: "w-16 h-16 text-primary",
              strokeWidth: 1.5
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground", children: "Website Submit Ho Gayi! 🎉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Website submitted successfully! Hamari team review karegi aur jald hi list karengi." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 flex flex-col sm:flex-row gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/",
                className: "btn-primary flex items-center justify-center gap-2",
                "data-ocid": "success-browse-link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4" }),
                  "Browse Websites"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "btn-secondary",
                onClick: () => {
                  setForm({ name: "", description: "", url: "", category: "" });
                  setTags([]);
                  setErrors({});
                  setSubmitted(false);
                },
                "data-ocid": "submit-another-btn",
                children: "Aur Submit Karein"
              }
            )
          ] })
        ]
      }
    ) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-2xl mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/",
        className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6",
        "data-ocid": "submit-back-link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
          "Back to Discover (वापस जाएं)"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Submit a Website (वेबसाइट जोड़ें)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Share a useful website with the community. All submissions are reviewed." })
          ] }),
          submitError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-3 rounded-md bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive mb-6",
              "data-ocid": "submit-error-banner",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kuch galat ho gaya. Thodi der baad dobara try karein।" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "space-y-6",
              "data-ocid": "submit-form",
              noValidate: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "name", className: "text-sm font-medium", children: [
                    "Website Name (वेबसाइट का नाम)",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "name",
                      "data-ocid": "input-name",
                      value: form.name,
                      onChange: (e) => handleFieldChange("name", e.target.value),
                      onBlur: () => handleBlur("name"),
                      placeholder: "e.g. ShikshaHub (शिक्षा हब)",
                      className: "input-smooth h-11",
                      "aria-invalid": !!errors.name,
                      "aria-describedby": errors.name ? "name-error" : void 0
                    }
                  ),
                  errors.name && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      id: "name-error",
                      className: "text-xs text-destructive flex items-center gap-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                        errors.name
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "url", className: "text-sm font-medium", children: [
                    "Website URL ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "url",
                      "data-ocid": "input-url",
                      type: "url",
                      value: form.url,
                      onChange: (e) => handleFieldChange("url", e.target.value),
                      onBlur: () => handleBlur("url"),
                      placeholder: "https://example.com",
                      className: "input-smooth h-11",
                      "aria-invalid": !!errors.url,
                      "aria-describedby": errors.url ? "url-error" : void 0
                    }
                  ),
                  errors.url && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      id: "url-error",
                      className: "text-xs text-destructive flex items-center gap-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                        errors.url
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "description", className: "text-sm font-medium", children: [
                    "Description (विवरण) ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "description",
                      "data-ocid": "input-description",
                      value: form.description,
                      onChange: (e) => handleFieldChange("description", e.target.value),
                      onBlur: () => handleBlur("description"),
                      placeholder: "Describe what this website offers... (यह वेबसाइट क्या प्रदान करती है?)",
                      rows: 3,
                      className: "input-smooth resize-none",
                      "aria-invalid": !!errors.description,
                      "aria-describedby": errors.description ? "description-error" : void 0
                    }
                  ),
                  errors.description && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      id: "description-error",
                      className: "text-xs text-destructive flex items-center gap-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                        errors.description
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium", children: [
                    "Category (श्रेणी) ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: form.category,
                      onValueChange: (v) => handleFieldChange("category", v),
                      disabled: categoriesLoading,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "input-smooth h-11 w-full",
                            "data-ocid": "select-category",
                            "aria-invalid": !!errors.category,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectValue,
                              {
                                placeholder: categoriesLoading ? "Categories load ho rahi hain..." : "Select a category (श्रेणी चुनें)"
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: cat }, cat)) })
                      ]
                    }
                  ),
                  errors.category && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                    errors.category
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium", children: [
                    "Tags (टैग)",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal ml-1", children: "optional, max 5" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        "data-ocid": "input-tag",
                        value: tagInput,
                        onChange: (e) => setTagInput(e.target.value),
                        onKeyDown: (e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        },
                        placeholder: "e.g. Education, Hindi, Farming",
                        className: "input-smooth h-10 flex-1",
                        disabled: tags.length >= 5
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "icon",
                        onClick: addTag,
                        disabled: !tagInput.trim() || tags.length >= 5,
                        className: "h-10 w-10",
                        "aria-label": "Add tag",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 })
                      }
                    )
                  ] }),
                  tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 pt-1", children: tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "badge-pill flex items-center gap-1.5 pr-1.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 10 }),
                        tag,
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => removeTag(tag),
                            className: "hover:text-destructive transition-colors",
                            "aria-label": `Remove tag ${tag}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 11 })
                          }
                        )
                      ]
                    },
                    tag
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "btn-primary w-full h-11 text-sm font-medium flex items-center justify-center gap-2",
                    disabled: isPending,
                    "data-ocid": "submit-btn",
                    children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                      "Submitting... (जमा हो रहा है...)"
                    ] }) : "Submit Website (वेबसाइट जोड़ें)"
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] }) });
}
export {
  SubmitPage
};
