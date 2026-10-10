import { WebsiteAnalysis } from "../types";

export const demoStripeAnalysis: WebsiteAnalysis = {
  overview: {
    name: "Stripe",
    purpose: "Financial infrastructure and payments processor APIs for the internet.",
    organization: "Stripe Inc.",
    category: "Financial Technology / SaaS",
    targetAudience: "Developers, online merchants, SaaS startups, enterprise corporations.",
    evidenceLabel: "OBSERVED",
    brandSummary: "Premium, highly professional developer-centric aesthetic with modern spatial layers and vibrant ultraviolet layout systems."
  },
  metrics: {
    pagesCount: 1420,
    componentsCount: 84,
    imagesCount: 310,
    linksCount: 412,
    integrationsCount: 18
  },
  design: {
    primaryColor: "#635BFF", // Stripe Purple
    secondaryColor: "#0A2540", // Deep Navy
    backgroundColor: "#0D0D11", // Dark Slate Surface
    accentColor: "#00D4B2", // Teal Accent
    fontFamilyDisplay: "Inter Display",
    fontFamilyBody: "Plus Jakarta Sans",
    buttonStyle: "Minimalist rounded-xl with subtle linear glow and interactive hover scale.",
    cardStyle: "Glassmorphic bordered containers (rgba(255,255,255,0.04)) with 8px backdrop blur.",
    evidenceLabel: "OBSERVED"
  },
  structure: {
    pages: [
      {
        title: "Payments Infrastructure Home",
        path: "/",
        type: "homepage",
        sections: ["Hero Slider", "Marquee Clients", "Interactive Terminal Console", "Features grid", "Pricing toggle", "Unified API showcase"],
        evidence: "Direct crawler verified crawl of homepage index nodes."
      },
      {
        title: "Billing & Subscriptions API",
        path: "/billing",
        type: "product",
        sections: ["Product hero", "Pricing matrix list", "Integration code templates", "Customer Portal sandbox"],
        evidence: "Observed link anchor from top bar menu."
      },
      {
        title: "Platform Docs & Reference",
        path: "/docs",
        type: "documentation",
        sections: ["Search console header", "API endpoint listing", "Interactive playground pane", "SDK downloads"],
        evidence: "Crawler verified index hierarchy."
      },
      {
        title: "Corporate ESG & Climate",
        path: "/climate",
        type: "marketing",
        sections: ["Pledge header", "Carbon removal portfolio list", "Audit reports", "Contribution widget"],
        evidence: "Inferred from footer references."
      }
    ],
    sitemap: [
      { text: "Home (/) ", indent: 0 },
      { text: "├── Products (/products)", indent: 1 },
      { text: "│   ├── Payments (/payments)", indent: 2 },
      { text: "│   ├── Billing (/billing)", indent: 2 },
      { text: "│   └── Connect (/connect)", indent: 2 },
      { text: "├── Developers (/docs)", indent: 1 },
      { text: "│   ├── Reference (/docs/api)", indent: 2 },
      { text: "│   └── Libraries (/docs/libraries)", indent: 2 },
      { text: "└── Company (/about)", indent: 1 },
      { text: "    └── Climate (/climate)", indent: 2 }
    ]
  },
  seo: {
    title: "Stripe | Financial Infrastructure for the Internet",
    metaDescription: "Stripe is a suite of payment APIs powering commerce for online businesses of all sizes. Learn more about billing, connect portals, and enterprise payments.",
    headings: [
      "H1: Financial infrastructure for the internet",
      "H2: Payments, billing, and checkout components verified",
      "H2: Enterprise scale. Dev-first design systems."
    ],
    hasStructuredData: true,
    issues: [
      "Image missing alt tag on homepage climate banner widget",
      "Meta keywords tag is unpopulated (Depreciated but recommended for crawl indexes)",
      "Header nesting skips directly from H1 to H3 on payments reference pages"
    ],
    recommendations: [
      "Append strict alt descriptions matching brand guidelines to climate images",
      "Correct header layout hierarchy on /docs templates to use consecutive H2 elements",
      "Inject structured JSON-LD schema representing Organization metrics"
    ],
    evidenceLabel: "OBSERVED"
  },
  technology: {
    frameworks: ["React", "Next.js", "Ruby on Rails"],
    libraries: ["Stripe.js", "Zustand", "Tailwind CSS"],
    analytics: ["Google Analytics", "Amplitude", "Hotjar"],
    cdn: ["Cloudflare", "Fastly"],
    cms: "Custom Headless Architecture",
    evidenceLabel: "OBSERVED"
  },
  media: {
    logos: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=40&q=80"
    ],
    videosCount: 2,
    imagesSample: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&h=300&q=80",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=400&h=300&q=80"
    ],
    evidenceLabel: "OBSERVED"
  },
  functions: {
    interactiveForms: ["Global Search console dialog", "Newsletter subscription submit", "Unified checkout dynamic cards sandbox"],
    integrations: ["Stripe Payment Intents API", "Tax calculation ledger integration", "Sentry tracking logger"],
    evidenceLabel: "OBSERVED"
  }
};
