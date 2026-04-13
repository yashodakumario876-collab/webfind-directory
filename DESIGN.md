# Design Brief

## Direction

Clean Modern Directory — A discovery-focused web directory platform optimized for fast search, minimal friction, and intuitive category browsing in Hindi/Hinglish markets.

## Tone

Friendly yet professional; uncluttered and welcoming without sacrificing utility. Inspired by Notion-like clarity but with warmer, discovery-oriented color choices.

## Differentiation

Real-time search with live feedback, smooth category filtering, and spacious card layouts reduce cognitive load. Every UI element serves discovery — no decorative noise.

## Color Palette

| Token      | Light OKLCH      | Dark OKLCH       | Role                    |
| ---------- | ---------------- | ---------------- | ----------------------- |
| background | 0.99 0.005 230   | 0.14 0.012 230   | Clean light/dark base   |
| foreground | 0.15 0.01 230    | 0.92 0.01 230    | Text and content        |
| card       | 1.0 0.0 0        | 0.18 0.014 230   | Card surfaces           |
| primary    | 0.48 0.16 170    | 0.68 0.18 170    | Search, CTAs, nav focus |
| accent     | 0.55 0.18 160    | 0.65 0.2 160     | Category tags, highlights|
| muted      | 0.94 0.01 230    | 0.22 0.015 230   | Inactive, secondary text|
| border     | 0.9 0.008 230    | 0.28 0.014 230   | Card edges, dividers    |

## Typography

- **Display**: Space Grotesk — Modern, tech-forward sans-serif for headings, app title, hero text. Bold weight (700+) for impact.
- **Body**: General Sans — Clean, humanist sans-serif for paragraphs, labels, descriptions. Medium weight (500) for UI labels, regular (400) for body copy.
- **Scale**: Hero `text-4xl md:text-6xl font-bold`, h2 `text-2xl md:text-3xl font-bold`, label `text-sm font-medium`, body `text-base`.

## Elevation & Depth

Minimal shadows — cards use subtle 1px borders on light backgrounds, delicate 2px border on dark. No drop shadows. Depth through background color shifts and border hints, not shadow stacks.

## Structural Zones

| Zone    | Light Treatment          | Dark Treatment           | Notes                             |
| ------- | ------------------------ | ------------------------ | --------------------------------- |
| Header  | bg-background border-b   | bg-card border-b         | App title, search bar, nav link   |
| Content | bg-background, card grid | bg-background, card grid | Alternating card sections allowed |
| Footer  | bg-secondary border-t    | bg-card/50 border-t      | Copyright, links, light treatment |

## Spacing & Rhythm

Spacious density — 16px section padding, 24px gaps between card rows, 16px internal card padding. Search input gets extra breathing room at 12px padding. Compact mobile via reduced gaps (12px).

## Component Patterns

- **Search input**: bg-input, border-border, rounded-md, smooth transition on focus with ring-primary
- **Website card**: bg-card, border-border, rounded-lg, 16px padding, hover opacity-90 transition
- **Category badge**: badge-pill class — accent color with 10% background, 20% border, pill shape (rounded-full)
- **CTA button**: btn-primary — bg-primary, text-primary-foreground, active scale-95 feedback

## Motion

- **Hover**: Opacity fade (0.3s cubic-bezier) for cards and buttons — not translation
- **Focus**: Outline ring for accessibility; no custom focus rings except primary ring on search
- **No decorative animations**: Entrance animations reserved for search results (fade-in, stagger optional)

## Constraints

- No gradients, no glows, no glassmorphism — clarity over decoration
- All interactive elements must meet WCAG AA+ contrast on primary and secondary backgrounds
- Mobile-first: 1-column cards on mobile, 2-3 columns on desktop; search takes full width
- Category filter as dropdown on mobile, inline pills on desktop (responsive pattern)

## Signature Detail

Smooth search input with live result count — as user types, display "Showing X results" updates in real-time with zero jank. This small detail conveys responsiveness and sets the tone for a fast, frictionless discovery experience.

