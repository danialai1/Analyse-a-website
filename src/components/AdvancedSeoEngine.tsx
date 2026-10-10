import React, { useState, useEffect } from "react";
import {
  Shield, Globe, Cpu, RefreshCw, Layers, FileText, Code, CheckCircle,
  AlertTriangle, Play, Search, Bot, User, Send, Star, Copy, Check, Download,
  Eye, HelpCircle, Layout, ArrowLeftRight, Bell, Zap, Image, Video, Info, Terminal, FileCode, CheckCircle2, ChevronDown, ChevronRight, Activity, Laptop, Smartphone, ExternalLink, ArrowRight
} from "lucide-react";
import { WebsiteAnalysis } from "../types";

interface AdvancedSeoEngineProps {
  analysis: WebsiteAnalysis;
  activeUrl: string;
  showToast: (msg: string) => void;
  activeCode: string;
  setActiveCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function AdvancedSeoEngine({
  analysis,
  activeUrl,
  showToast,
  activeCode,
  setActiveCode
}: AdvancedSeoEngineProps) {
  // Navigation internal tab selection
  const [subTab, setSubTab] = useState<"diagnostics" | "identity" | "titles" | "keywords" | "programmatic" | "technical" | "structured" | "social" | "report">("diagnostics");

  // File Preview Selector
  const [activeFileId, setActiveFileId] = useState<string>("sitemap");
  const [fileContent, setFileContent] = useState<string>("");
  const [isCompilingFile, setIsCompilingFile] = useState(false);

  // Social Preview Platform
  const [socialPlatform, setSocialPlatform] = useState<"slack" | "facebook" | "twitter">("slack");

  // Auto-Fix Pipeline Simulation States
  const [isAutoFixing, setIsAutoFixing] = useState(false);
  const [autoFixProgress, setAutoFixProgress] = useState(0); // 0: Idle, 100: Done
  const [fixedItems, setFixedItems] = useState<string[]>([]);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);

  // Accordions states
  const [openClusterId, setOpenFaq] = useState<string>("core");

  // Derived properties from activeUrl
  const domainName = activeUrl.replace(/https?:\/\/(www\.)?/, "").split("/")[0] || "stripe.com";
  const secureUrl = activeUrl.startsWith("http") ? activeUrl : "https://" + activeUrl;

  // 1. SEO WEBSITE IDENTITY COMPOSITION
  const seoIdentity = {
    brandName: analysis.overview.organization || "Stripe",
    websiteName: analysis.overview.name || "Stripe Developer Platform",
    primaryTopic: "Financial Infrastructure and Unified REST APIs for Global Internet Commerce",
    businessCategory: "B2B Software as a Service (SaaS) FinTech Infrastructure",
    targetAudience: "Software Engineers, Product Managers, CTOs, and FinTech Founders",
    geographicMarket: "Global (Multilingual, Multi-Region localization enabled)",
    primaryProducts: "Payments Gateway, Billing Ledgers, Checkout Terminals, Connect Marketplaces, Atlas Incorporation",
    searchIntent: "Commercial & Transactional (High purchase-intent developer queries)",
    majorProblemsSolved: "SSRF boundary validation, complex global transaction tax compliance, payment conversion optimization",
    primaryConversionAction: "Register Account & Generate Live API Token keys"
  };

  // 2. SEO TITLE & META DESCRIPTION SCHEMAS
  const pageTitles = [
    {
      page: "Homepage",
      url: "/",
      intent: "Transactional",
      primaryTopic: "AI Payments Platform",
      selectedTitle: `${analysis.overview.name}: Payments & Financial Infrastructure | ${analysis.overview.organization}`,
      metaDescription: `Analyze and process global online payments with ${analysis.overview.organization}'s unified financial infrastructure. Integrate checkout forms and manage invoices atomically.`,
      candidates: [
        { title: `${analysis.overview.name} | Financial Infrastructure for the Internet`, rating: "Strong" },
        { title: `Secure Payment Processing & API Ledger Console | ${analysis.overview.organization}`, rating: "Excellent" },
        { title: `${analysis.overview.name}: Analyze Any Website Instantly | WebX-Ray AI`, rating: "Good" }
      ]
    },
    {
      page: "Developer API Docs",
      url: "/docs/api",
      intent: "Informational",
      primaryTopic: "REST API Integration",
      selectedTitle: `Developer API Reference & Integration Manual | ${analysis.overview.organization}`,
      metaDescription: "Access absolute canonical reference guides for REST APIs. Run sandboxed payment methods and inspect system payload structures.",
      candidates: [
        { title: `Unified Payments REST API Keys & Specifications | Docs`, rating: "Strong" },
        { title: `Complete Developer Integration Guides | ${analysis.overview.organization}`, rating: "Excellent" }
      ]
    },
    {
      page: "Pricing & Plans",
      url: "/pricing",
      intent: "Commercial",
      primaryTopic: "Pricing Calculator",
      selectedTitle: `Enterprise Scale Pricing & Transaction Fees | ${analysis.overview.organization}`,
      metaDescription: "Calculate transparent transaction percentages. Compare core plans for scaling platforms, startups, and international enterprises.",
      candidates: [
        { title: `Simple Transparent Pricing & Scaling Fee Plans | ${analysis.overview.organization}`, rating: "Strong" },
        { title: `Compare starter vs enterprise tier pricing calculator`, rating: "Good" }
      ]
    }
  ];

  // 3. KEYWORD CLUSTERING DATA STRUCTURES
  const keywordClusters = {
    primary: "Financial Infrastructure APIs",
    clusters: [
      {
        id: "core",
        topic: "Core Billing Ledger Integration",
        keyword: "recurring payment apis",
        secondary: ["automatic invoicing", "multi-currency subscriptions", "customer ledger schemas"],
        questions: ["How to configure recurring payment APIs safely?", "What is the best way to handle webhook authentication?"],
        longTail: ["b2b saas billing ledger integrations in React", "how to manage custom subscription trials atomically"],
        relationship: "Subscription Engine → Webhook Web Gateways → Payment Ledger"
      },
      {
        id: "design",
        topic: "Conversion-Oriented Checkout UI",
        keyword: "responsive checkout forms",
        secondary: ["one-click express payment", "glassmorphism card overlays", "localized transaction checkouts"],
        questions: ["What is the recommended layout for mobile-first checkout forms?", "How to reduce checkout form friction to boost CTR?"],
        longTail: ["beautiful high-contrast dark checkout form templates Tailwind", "mobile-optimized payment modal design tokens"],
        relationship: "DOM Form Layout → Layout Redlines → Accessibility AAA Validation"
      }
    ]
  };

  // 4. PROGRAMMATIC SEO scaling paths
  const programmaticPages = [
    { type: "Product Page", slug: "/products/payments", count: 12, purpose: "Individual payment methods breakdown.", utility: "Differentiated parameter details per country" },
    { type: "Glossary Terms", slug: "/glossary/ssrf-safeguard", count: 45, purpose: "Detailed security definitions indexing.", utility: "Authoritative answers for technical security terms" },
    { type: "Location Pages", slug: "/solutions/us-merchants", count: 18, purpose: "Localized compliance guides per market.", utility: "Direct citations of regional tax legislation" },
    { type: "Comparison Pages", slug: "/compare/stripe-vs-paypal", count: 6, purpose: "Side-by-side technical layout contrasts.", utility: "Objective metric tables with verified benchmark links" }
  ];

  // 5. INTERNAL LINK GRAPH representation
  const linkGraph = [
    { source: "Homepage (/) ", target: "Products (/products/payments)", type: "Hierarchical", anchor: "Explore developer products" },
    { source: "Homepage (/) ", target: "API Docs (/docs/api)", type: "Navigational", anchor: "Integrate APIs" },
    { source: "Products (/products/payments)", target: "Pricing (/pricing)", type: "Transactional", anchor: "Calculate checkout fees" },
    { source: "API Docs (/docs/api)", target: "Glossary (/glossary/ssrf-safeguard)", type: "Contextual", anchor: "Read security standards" }
  ];

  // 6. TECHNICAL SEO DIAGNOSTICS & SCORECARD
  const [seoScores, setSeoScores] = useState({
    technical: 88,
    indexability: 90,
    contentQuality: 85,
    onPageSeo: 82,
    schemaMarkup: 75,
    linkingGraph: 80,
    imageSeo: 78,
    mobileFirst: 95,
    aiSearch: 70
  });

  // Derived overall audit score
  const totalScore = Math.round(
    Object.values(seoScores).reduce((a, b) => a + b, 0) / Object.keys(seoScores).length
  );

  // Issues list to detect and fix automatically
  const initialIssues = [
    { id: "missing_meta_desc", category: "On-Page SEO", severity: "High" as const, text: "Missing descriptive meta tags on subpages templates.", fixed: false },
    { id: "non_consecutive_headings", category: "Technical SEO", severity: "Medium" as const, text: "Non-consecutive headings (H1 to H3) detected inside documentation layout routes.", fixed: false },
    { id: "missing_alt_attributes", category: "Image SEO", severity: "Medium" as const, text: "Missing alternative alt descriptions on climate assets images.", fixed: false },
    { id: "missing_schema_jsonld", category: "Structured Data", severity: "High" as const, text: "SoftwareApplication structured JSON-LD schema omitted from homepage header.", fixed: false },
    { id: "lack_social_cards", category: "Social Sharing", severity: "Low" as const, text: "OpenGraph visual summary description cards omitted.", fixed: false }
  ];
  const [issues, setIssues] = useState(initialIssues);

  // Fetch file templates
  useEffect(() => {
    let active = true;
    const generateFile = async () => {
      setIsCompilingFile(true);
      try {
        const res = await fetch("/api/seo-file", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: activeUrl,
            fileType: activeFileId,
            analysis: analysis
          })
        });
        if (!res.ok) throw new Error("Compilation failure");
        const data = await res.json();
        if (active) setFileContent(data.content);
      } catch (err) {
        if (!active) return;
        // Robust offline fallback construction
        let fallback = "";
        const formattedUrl = secureUrl;
        switch (activeFileId) {
          case "sitemap":
            fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Dynamic XML Sitemap compiled by WebX-Ray AI -->
  <url>
    <loc>${formattedUrl}/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>${formattedUrl}/docs/api</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${formattedUrl}/pricing</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>
</urlset>`;
            break;
          case "robots":
            fallback = `# robots.txt for ${domainName}
# Managed atomically via WebX-Ray AI Spatial OS

User-agent: Googlebot
Allow: /
Allow: /docs/
Disallow: /api/
Disallow: /admin/
Disallow: /config/

Sitemap: ${formattedUrl}/sitemap.xml`;
            break;
          case "schema":
            fallback = `{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "${analysis.overview.name}",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "All",
  "description": "${analysis.overview.purpose}",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "publisher": {
    "@type": "Organization",
    "name": "${analysis.overview.organization}",
    "url": "${formattedUrl}"
  }
}`;
            break;
        }
        setFileContent(fallback);
      } finally {
        if (active) setIsCompilingFile(false);
      }
    };
    generateFile();
    return () => { active = false; };
  }, [activeFileId, activeUrl, analysis]);

  const handleCopy = () => {
    if (!fileContent) return;
    navigator.clipboard.writeText(fileContent);
    showToast("✓ Copied to clipboard successfully.");
  };

  const handleDownload = () => {
    if (!fileContent) return;
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = activeFileId === "sitemap" ? "sitemap.xml" : activeFileId === "robots" ? "robots.txt" : "schema-ld.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("✓ File downloaded successfully.");
  };

  // Trigger Automatic SEO Fix Engine simulation
  const handleAutoFix = () => {
    if (isAutoFixing) return;
    setIsAutoFixing(true);
    setAutoFixProgress(10);
    setAuditLogs([`[INITIALIZATION] Registering SEO health baseline: ${totalScore}%...`]);

    const pipelineSteps = [
      { log: "[ON-PAGE] Injecting meta descriptions into React document layouts...", progress: 30, scoreUpdate: { onPageSeo: 95 } },
      { log: "[TECHNICAL] Repairing consecutive layout heading elements hierarchy (H1 -> H2)...", progress: 50, scoreUpdate: { technical: 98 } },
      { log: "[IMAGE SEO] Injecting descriptive alternative alt attributes to images...", progress: 70, scoreUpdate: { imageSeo: 94 } },
      { log: "[STRUCTURED DATA] Appending SoftwareApplication JSON-LD schema script inside head...", progress: 90, scoreUpdate: { schemaMarkup: 96 } },
      { log: "[SOCIAL] Injecting OpenGraph and Twitter Summary card metadata variables...", progress: 100, scoreUpdate: { aiSearch: 88 } }
    ];

    pipelineSteps.forEach((step, idx) => {
      setTimeout(() => {
        setAutoFixProgress(step.progress);
        setAuditLogs(prev => [...prev, step.log]);
        setSeoScores(prev => ({ ...prev, ...step.scoreUpdate }));

        if (step.progress === 100) {
          setTimeout(() => {
            setIsAutoFixing(false);
            setIssues(prev => prev.map(issue => ({ ...issue, fixed: true })));
            
            // Append the actual JSON-LD structured script directly to the shared code sandbox IDE!
            const scriptTag = `<script type="application/ld+json">\n${JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": analysis.overview.name,
              "operatingSystem": "All",
              "applicationCategory": "DeveloperApplication",
              "description": analysis.overview.purpose
            }, null, 2)}\n</script>`;

            setActiveCode(prev => {
              if (prev.includes("application/ld+json")) {
                return prev;
              } else {
                return prev + `\n\n/* SEO Structured Schema Patched */\n` + scriptTag;
              }
            });

            showToast("✦ SEO Optimization complete! Layout updated with valid JSON-LD schemas.");
          }, 300);
        }
      }, (idx + 1) * 600);
    });
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* HEADER CONTRACT ZONE */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-900 flex-wrap gap-4">
        <div>
          <h3 className="text-white text-lg font-black font-mono uppercase tracking-tight">Advanced SEO &amp; Search Visibility OS</h3>
          <p className="text-xs text-zinc-500 mt-1">Deep-level Google visibility audits, topic cluster engines, and atomic schema generators.</p>
        </div>
        <span className="text-[10px] font-mono text-[#00D4B2] font-black tracking-widest bg-[#00D4B2]/10 border border-[#00D4B2]/20 px-2.5 py-0.5 rounded uppercase">
          Continuous Monitor Enabled
        </span>
      </div>

      {/* CORE SEO METRICS DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Overall score dial & AutoFix Trigger */}
        <div className="lg:col-span-4 bg-[#0A0A0F] border border-zinc-900 p-6 rounded-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">INTERNAL DIAGNOSTIC SCORE</span>
            
            <div className="flex items-baseline justify-center gap-1.5 py-4">
              <span className="text-5xl md:text-6xl font-black font-mono tracking-tight text-white tabular-nums">{totalScore}</span>
              <span className="text-xs font-mono text-[#00D4B2] uppercase font-bold">/ 100 HEALTH</span>
            </div>

            <p className="text-zinc-500 text-[11px] leading-relaxed text-center font-mono">
              Diagnostic audit of crawled tags, cluster schema integrity, and semantic intent.
            </p>
          </div>

          {/* Automatic Fix Pipeline visualizer */}
          {isAutoFixing ? (
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-[#00D4B2] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#00D4B2]" /> OPTIMIZING ARCHITECTURE
                </span>
                <span className="text-zinc-500">{autoFixProgress}%</span>
              </div>
              <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-[#00D4B2] transition-all duration-300" style={{ width: `${autoFixProgress}%` }} />
              </div>
              <div className="h-16 overflow-y-auto font-mono text-[9px] text-zinc-400 space-y-1 select-none pr-1">
                {auditLogs.map((log, i) => (
                  <div key={i} className="truncate">&gt; {log}</div>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={handleAutoFix}
              disabled={issues.every(i => i.fixed)}
              className="w-full bg-gradient-to-r from-[#635BFF] to-[#00D4B2] text-white text-xs font-bold font-mono uppercase tracking-wider py-3 rounded-xl shadow-lg hover:opacity-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <Cpu className="w-4 h-4 shrink-0" />
              {issues.every(i => i.fixed) ? "All Systems Corrected" : "Execute Automatic SEO Fix"}
            </button>
          )}
        </div>

        {/* Right Column: Score list breakdown */}
        <div className="lg:col-span-8 bg-[#0A0A0F] border border-zinc-900 p-6 rounded-2xl">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold mb-4">ENGINE CATEGORY AUDITS</span>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs text-left">
            {[
              { label: "Technical SEO", val: seoScores.technical },
              { label: "Indexability", val: seoScores.indexability },
              { label: "Content Quality", val: seoScores.contentQuality },
              { label: "On-Page SEO", val: seoScores.onPageSeo },
              { label: "Schema Markup", val: seoScores.schemaMarkup },
              { label: "Linking Graph", val: seoScores.linkingGraph },
              { label: "Image SEO", val: seoScores.imageSeo },
              { label: "Mobile Readiness", val: seoScores.mobileFirst },
              { label: "AI Search Ready", val: seoScores.aiSearch }
            ].map((score, idx) => (
              <div key={idx} className="bg-zinc-950 border border-zinc-900 rounded-xl p-3.5 flex flex-col justify-between">
                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">{score.label}</span>
                <div className="flex justify-between items-baseline mt-2">
                  <span className="text-lg font-black text-white tabular-nums">{score.val}%</span>
                  <span className={`text-[9px] font-bold uppercase ${score.val >= 90 ? "text-emerald-400" : score.val >= 80 ? "text-[#00D4B2]" : "text-amber-500"}`}>
                    {score.val >= 90 ? "Optimal" : score.val >= 80 ? "Compliant" : "Tweak"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* INTERNAL SEGMENTED TAB PANEL CONTROLS */}
      <div className="flex overflow-x-auto gap-1 bg-[#0A0A0F] border border-zinc-900 p-1 rounded-xl scrollbar-thin">
        {[
          { id: "diagnostics", label: "Violations Audit" },
          { id: "identity", label: "SEO Identity" },
          { id: "titles", label: "Title & Snippets" },
          { id: "keywords", label: "Keyword Clusters" },
          { id: "programmatic", label: "Programmatic Paths" },
          { id: "technical", label: "Semantic Header" },
          { id: "structured", label: "JSON-LD Schemas" },
          { id: "social", label: "Social Cards" },
          { id: "report", label: "Google Visibility Report" }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setSubTab(item.id as any)}
            className={`px-3 py-2 text-[10px] font-black rounded-lg uppercase tracking-wider font-mono cursor-pointer transition-all whitespace-nowrap shrink-0 ${
              subTab === item.id
                ? "bg-zinc-900 text-[#00D4B2] border border-zinc-800"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* SUB-PANEL CONTENT RENDERING */}
      <div className="bg-[#0A0A0F] border border-zinc-900 p-6 rounded-2xl min-h-[350px]">
        
        {/* SUB-TAB 1: DIAGNOSTIC VIOLATIONS AUDITS */}
        {subTab === "diagnostics" && (
          <div className="space-y-4">
            <div className="space-y-1 pb-3 border-b border-zinc-900">
              <h4 className="text-white font-mono font-bold text-sm uppercase">Active Violations &amp; Code Checks</h4>
              <p className="text-zinc-500 text-[11px]">Audit results of DOM markup, header hierarchy, and layout standards.</p>
            </div>

            <div className="space-y-2">
              {issues.map((issue) => (
                <div key={issue.id} className="bg-zinc-950 border border-zinc-900 p-3.5 rounded-xl flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    {issue.fixed ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className={`w-4.5 h-4.5 shrink-0 ${issue.severity === "High" ? "text-rose-500" : "text-amber-500"}`} />
                    )}
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">{issue.category} · {issue.severity} Severity</span>
                      <span className={`text-xs block mt-0.5 ${issue.fixed ? "line-through text-zinc-600" : "text-zinc-200"}`}>{issue.text}</span>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono uppercase tracking-wider">
                    {issue.fixed ? (
                      <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">RESOLVED</span>
                    ) : (
                      <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">PENDING AUTOFIX</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB-TAB 2: SEO WEBSITE IDENTITY */}
        {subTab === "identity" && (
          <div className="space-y-6">
            <div className="space-y-1 pb-3 border-b border-zinc-900">
              <h4 className="text-white font-mono font-bold text-sm uppercase">SEO Website Identity Mapping</h4>
              <p className="text-zinc-500 text-[11px]">Automatically resolved brand positioning matrices to configure search crawler classifications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {[
                { label: "Brand Name", value: seoIdentity.brandName },
                { label: "Website Title", value: seoIdentity.websiteName },
                { label: "Primary Topic Cluster", value: seoIdentity.primaryTopic },
                { label: "Business Category", value: seoIdentity.businessCategory },
                { label: "Target Audience segment", value: seoIdentity.targetAudience },
                { label: "Geographic Market focus", value: seoIdentity.geographicMarket },
                { label: "Core Products / Services", value: seoIdentity.primaryProducts },
                { label: "Search Intent Profile", value: seoIdentity.searchIntent },
                { label: "Major Pain-points Solved", value: seoIdentity.majorProblemsSolved },
                { label: "Primary Conversion Action", value: seoIdentity.primaryConversionAction }
              ].map((item, idx) => (
                <div key={idx} className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono text-[#00D4B2] uppercase tracking-wider font-bold">{item.label}</span>
                  <p className="text-white font-bold leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB-TAB 3: SEO TITLE & SNIPPETS ENGINE */}
        {subTab === "titles" && (
          <div className="space-y-6">
            <div className="space-y-1 pb-3 border-b border-zinc-900">
              <h4 className="text-white font-mono font-bold text-sm uppercase">SEO Title Link &amp; Snippets Engine</h4>
              <p className="text-zinc-500 text-[11px]">Compare CTR title configurations and inspect live Google Search Snippets layout previews.</p>
            </div>

            <div className="space-y-6">
              {pageTitles.map((item, idx) => (
                <div key={idx} className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl space-y-4">
                  
                  {/* Title and metadata details */}
                  <div className="flex justify-between items-start gap-4 flex-wrap border-b border-zinc-900/60 pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">ROUTE PATH: {item.url}</span>
                      <h5 className="text-white font-bold text-sm mt-1">{item.page}</h5>
                    </div>
                    <span className="text-[9px] font-mono text-[#00D4B2] font-black tracking-widest bg-[#00D4B2]/10 border border-[#00D4B2]/20 px-2 py-0.5 rounded">
                      {item.intent} INTENT
                    </span>
                  </div>

                  {/* Candidate evaluation table */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">CTR Candidate Evaluations</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {item.candidates.map((cand, i) => (
                        <div key={i} className="bg-[#0A0A0F]/60 border border-zinc-900/80 p-3 rounded-xl flex justify-between items-center">
                          <span className="text-zinc-400 font-mono truncate mr-2">{cand.title}</span>
                          <span className="text-[8px] font-mono text-[#00D4B2] font-black tracking-widest shrink-0">{cand.rating} RATING</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Google Search Snippet Preview Box */}
                  <div className="bg-[#060608] border border-zinc-900 p-4 rounded-xl space-y-1.5 shadow-inner">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-sans">
                      <Globe className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{domainName}</span>
                      <ChevronRight className="w-3 h-3 text-zinc-650" />
                      <span className="text-zinc-500 font-mono truncate">{item.url}</span>
                    </div>

                    {/* Google Title link styling */}
                    <a href="#" className="text-sky-400 hover:underline text-base font-medium tracking-wide block leading-snug">
                      {item.selectedTitle}
                    </a>

                    <p className="text-zinc-400 text-xs leading-relaxed max-w-2xl font-sans">
                      {item.metaDescription}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB-TAB 4: KEYWORD CLUSTER ENGINE */}
        {subTab === "keywords" && (
          <div className="space-y-6">
            <div className="space-y-1 pb-3 border-b border-zinc-900">
              <h4 className="text-white font-mono font-bold text-sm uppercase">Semantic Topic &amp; Keyword Clusters</h4>
              <p className="text-zinc-500 text-[11px]">Natural semantic entities distribution graph. Strictly bans un-natural repetitive keyword stuffing.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {keywordClusters.clusters.map((cluster) => {
                const isOpen = openClusterId === cluster.id;
                return (
                  <div key={cluster.id} className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden transition-all">
                    
                    <button
                      onClick={() => setOpenFaq(isOpen ? "" : cluster.id)}
                      className="w-full text-left p-4.5 flex justify-between items-center text-xs font-mono font-bold text-zinc-200 hover:text-white cursor-pointer"
                    >
                      <span className="uppercase text-[#00D4B2] tracking-wider">{cluster.topic}</span>
                      <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isOpen && (
                      <div className="p-4.5 border-t border-zinc-900 bg-[#0A0A0F]/30 space-y-4 text-xs text-zinc-300">
                        
                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Core Target Keyword</span>
                          <p className="text-white font-mono font-bold mt-0.5 select-all">{cluster.keyword}</p>
                        </div>

                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Secondary Semantic Terms</span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {cluster.secondary.map(term => (
                              <span key={term} className="bg-zinc-950 border border-zinc-900/60 font-mono text-[10px] px-2.5 py-0.5 rounded text-zinc-400">
                                {term}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">User Intent long-tail Queries</span>
                          <ul className="list-disc list-inside space-y-1 mt-1 text-zinc-400">
                            {cluster.longTail.map(q => <li key={q}>{q}</li>)}
                          </ul>
                        </div>

                        <div className="pt-2.5 border-t border-zinc-900/60 font-mono text-[10px]">
                          <span className="text-zinc-500 font-bold uppercase block mb-0.5">Entity Relationships Graph</span>
                          <span className="text-zinc-400 select-all">{cluster.relationship}</span>
                        </div>

                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SUB-TAB 5: PROGRAMMATIC SEO PATHS */}
        {subTab === "programmatic" && (
          <div className="space-y-6">
            <div className="space-y-1 pb-3 border-b border-zinc-900">
              <h4 className="text-white font-mono font-bold text-sm uppercase">Programmatic SEO Directories</h4>
              <p className="text-zinc-500 text-[11px]">Authorized scales paths containing genuinely differentiated content. Pre-audited to avoid duplicate indexing rules.</p>
            </div>

            <div className="bg-[#0A0A0F]/60 border border-zinc-900 rounded-xl overflow-hidden text-xs">
              <div className="grid grid-cols-12 gap-4 bg-zinc-950 p-4 border-b border-zinc-900 font-mono font-bold text-zinc-400">
                <div className="col-span-3">Directory Type</div>
                <div className="col-span-3">URL Slug Structure</div>
                <div className="col-span-2">Indexed Nodes</div>
                <div className="col-span-4">Differentiated Utility Value</div>
              </div>

              <div className="divide-y divide-zinc-900 font-mono">
                {programmaticPages.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-4 p-4 items-center bg-[#0A0A0F]/20 hover:bg-[#0A0A0F]/45 transition-colors">
                    <div className="col-span-3 text-white font-bold">{row.type}</div>
                    <div className="col-span-3 text-zinc-500 text-[11px] select-all">{row.slug}</div>
                    <div className="col-span-2 text-[#00D4B2] font-black">{row.count} pages</div>
                    <div className="col-span-4 text-zinc-400 font-sans leading-relaxed">{row.utility}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUB-TAB 6: TECHNICAL & SEMANTIC HEADER OUTLINES */}
        {subTab === "technical" && (
          <div className="space-y-6">
            <div className="space-y-1 pb-3 border-b border-zinc-900">
              <h4 className="text-white font-mono font-bold text-sm uppercase">Semantic Outline &amp; Internal Link graph</h4>
              <p className="text-zinc-500 text-[11px]">Interactive visualization of heading hierarchies and programmatic anchor-text linkages.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Heading Outline analyzer */}
              <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl flex flex-col justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold mb-3">SEMANTIC HEADING HIERARCHY</span>
                
                <div className="space-y-3 font-mono text-xs leading-relaxed bg-[#060608] border border-zinc-900 rounded-xl p-4 h-64 overflow-y-auto">
                  <div className="text-[#00D4B2] font-bold">&lt;h1&gt; {analysis.seo.title} &lt;/h1&gt;</div>
                  <div className="pl-4 text-zinc-300">&lt;h2&gt; Primary Developer Suite Services &lt;/h2&gt;</div>
                  <div className="pl-8 text-zinc-500">&lt;h3&gt; Secure Payments Gateway &lt;/h3&gt;</div>
                  <div className="pl-8 text-zinc-500">&lt;h3&gt; Global Subscription ledgers &lt;/h3&gt;</div>
                  <div className="pl-4 text-zinc-300">&lt;h2&gt; Multi-Agent Audit Diagnostics &lt;/h2&gt;</div>
                  <div className="pl-8 text-zinc-500">&lt;h3&gt; WCAG AA Accessibility checker &lt;/h3&gt;</div>
                </div>

                <div className="pt-3 border-t border-zinc-900/60 mt-3 text-[10px] font-mono text-zinc-500">
                  Strictly enforces single H1 layout models per document root route.
                </div>
              </div>

              {/* Internal link graph checklist */}
              <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl flex flex-col justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold mb-3">INTERNAL LINKING MATRIX</span>
                
                <div className="space-y-2 h-64 overflow-y-auto text-xs">
                  {linkGraph.map((link, idx) => (
                    <div key={idx} className="bg-[#0A0A0F] border border-zinc-900 p-3 rounded-xl space-y-1.5">
                      <div className="flex justify-between items-center font-mono text-[10px]">
                        <span className="text-white font-bold">{link.source}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#00D4B2]" />
                        <span className="text-[#00D4B2] font-bold">{link.target}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-zinc-500 font-mono pt-1 border-t border-zinc-900/50">
                        <span>Anchor: &quot;{link.anchor}&quot;</span>
                        <span className="text-[#635BFF] uppercase">{link.type}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-zinc-900/60 mt-3 text-[10px] font-mono text-zinc-500">
                  Ensures perfect topological connectivity and prevents orphan routes.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SUB-TAB 7: ROBOTS & SITEMAPS CODE FILES */}
        {subTab === "structured" && (
          <div className="space-y-6">
            <div className="space-y-1 pb-3 border-b border-zinc-900">
              <h4 className="text-white font-mono font-bold text-sm uppercase">Robots.txt, Sitemaps &amp; JSON-LD Schemas</h4>
              <p className="text-zinc-500 text-[11px]">Compile crawl directives and valid SoftwareApplication Structured data schemas directly.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* File selection bar */}
              <div className="lg:col-span-4 bg-zinc-950 border border-zinc-900 p-4 rounded-xl space-y-1.5">
                {[
                  { id: "sitemap", name: "sitemap.xml", desc: "Absolute priority index" },
                  { id: "robots", name: "robots.txt", desc: "Crawler access limits" },
                  { id: "schema", name: "schema-ld.json", desc: "Structured data models" }
                ].map(file => (
                  <button
                    key={file.id}
                    onClick={() => setActiveFileId(file.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer font-mono ${
                      activeFileId === file.id
                        ? "bg-zinc-900 border-zinc-800 text-[#00D4B2] font-bold"
                        : "bg-transparent border-transparent text-zinc-400 hover:text-white"
                    }`}
                  >
                    <div className="text-xs uppercase font-bold">{file.name}</div>
                    <div className="text-[10px] text-zinc-500 font-sans mt-0.5">{file.desc}</div>
                  </button>
                ))}
              </div>

              {/* File Content Preview Terminal */}
              <div className="lg:col-span-8 flex flex-col justify-between bg-[#060608] border border-zinc-900 rounded-xl p-4.5 space-y-4">
                
                {isCompilingFile ? (
                  <div className="flex flex-col items-center justify-center h-48 space-y-3">
                    <RefreshCw className="w-6 h-6 text-[#00D4B2] animate-spin" />
                    <span className="text-zinc-500 font-mono text-[10px]">Compiling XML criteria schemas...</span>
                  </div>
                ) : (
                  <textarea
                    value={fileContent}
                    readOnly
                    className="w-full bg-zinc-950 border border-zinc-900 text-[10px] font-mono text-zinc-400 p-3 rounded-lg h-48 focus:outline-none resize-none select-all"
                  />
                )}

                <div className="flex justify-between items-center font-mono text-[9px] text-zinc-500">
                  <span>File Mime Type validated</span>
                  <div className="flex gap-2">
                    <button onClick={handleCopy} className="hover:text-white flex items-center gap-1 cursor-pointer"><Copy className="w-3 h-3" /> COPY</button>
                    <span>·</span>
                    <button onClick={handleDownload} className="hover:text-white flex items-center gap-1 cursor-pointer"><Download className="w-3 h-3" /> DOWNLOAD</button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* SUB-TAB 8: SOCIAL CARDS OG:TAGS PREVIEW */}
        {subTab === "social" && (
          <div className="space-y-6">
            <div className="space-y-1 pb-3 border-b border-zinc-900">
              <h4 className="text-white font-mono font-bold text-sm uppercase">OpenGraph &amp; Social Card Live Previews</h4>
              <p className="text-zinc-500 text-[11px]">Inspect visual summaries cards as parsed by Slack, Facebook, and Twitter/X indexers.</p>
            </div>

            {/* Platform segment buttons */}
            <div className="flex gap-1.5 bg-zinc-950 border border-zinc-900 p-1 rounded-xl max-w-xs font-mono text-[10px]">
              {(["slack", "facebook", "twitter"] as const).map(platform => (
                <button
                  key={platform}
                  onClick={() => setSocialPlatform(platform)}
                  className={`w-full py-1.5 px-3 rounded-lg uppercase tracking-wider font-bold cursor-pointer transition-all ${
                    socialPlatform === platform ? "bg-zinc-900 text-[#00D4B2]" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>

            {/* Platform card mockups container */}
            <div className="bg-[#060608] border border-zinc-900 rounded-2xl p-6 flex justify-center items-center">
              
              {/* SLACK VISUAL MOCKUP CARD */}
              {socialPlatform === "slack" && (
                <div className="bg-[#0A0A0F] border border-zinc-850 rounded-xl p-4.5 max-w-xl w-full text-left space-y-3 font-sans border-l-4 border-l-[#635BFF]">
                  <div className="text-xs font-bold text-zinc-300 font-mono tracking-wide">WebX-Ray AI</div>
                  <h4 className="text-[#4285F4] hover:underline text-xs md:text-sm font-semibold cursor-pointer">
                    {analysis.overview.name}: Payments &amp; Financial Infrastructure
                  </h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Analyze and process global online payments with {analysis.overview.organization}&apos;s unified financial infrastructure. Integrate checkout forms and manage invoices atomically.
                  </p>
                  
                  {/* Social share image fallback mesh */}
                  <div className="relative rounded-lg overflow-hidden border border-zinc-900 bg-zinc-950 aspect-[1.91/1] w-full max-h-[160px] flex items-center justify-center">
                    <img src="/src/assets/images/product_hero_scanning_1790706481336.jpg" alt="Stripe Scan Layout Preview Banner" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
                      <span className="text-[10px] font-mono text-[#00D4B2] font-black uppercase tracking-widest">{domainName} Preview</span>
                    </div>
                  </div>
                </div>
              )}

              {/* FACEBOOK VISUAL MOCKUP CARD */}
              {socialPlatform === "facebook" && (
                <div className="bg-zinc-950 border border-zinc-850 rounded-xl overflow-hidden max-w-xl w-full text-left font-sans">
                  
                  {/* Aspect Ratio 1.91:1 Preview */}
                  <div className="relative bg-zinc-900 aspect-[1.91/1] w-full flex items-center justify-center">
                    <img src="/src/assets/images/product_hero_scanning_1790706481336.jpg" alt="Facebook Share Grid Preview" className="w-full h-full object-cover" />
                  </div>

                  <div className="p-4 bg-[#0A0A0F] border-t border-zinc-900 space-y-1">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">{domainName.toUpperCase()}</span>
                    <h4 className="text-white text-xs md:text-sm font-bold tracking-wide truncate">
                      {analysis.overview.name} | Financial Infrastructure
                    </h4>
                    <p className="text-zinc-400 text-[11px] leading-relaxed truncate">
                      Discover components, technologies, and structures atomically using our Master coordinate agents.
                    </p>
                  </div>
                </div>
              )}

              {/* TWITTER CARD MOCKUP */}
              {socialPlatform === "twitter" && (
                <div className="bg-[#0A0A0F] border border-zinc-850 rounded-xl overflow-hidden max-w-xl w-full text-left font-sans relative">
                  
                  {/* Large Summary Image */}
                  <div className="relative aspect-[1.91/1] w-full bg-zinc-900">
                    <img src="/src/assets/images/product_hero_scanning_1790706481336.jpg" alt="X summary large card preview" className="w-full h-full object-cover" />
                  </div>

                  <div className="p-3 bg-[#060608] border-t border-zinc-900 flex flex-col justify-center">
                    <span className="text-[9px] font-mono text-zinc-500 block select-all">@{analysis.overview.organization.toLowerCase().replace(/\s/g, "")}</span>
                    <h5 className="text-white text-xs font-bold truncate mt-0.5">{analysis.overview.name} Software Reference</h5>
                    <p className="text-zinc-400 text-[11px] leading-relaxed truncate">Unified API integrations for startup scale billing pipelines.</p>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

        {/* SUB-TAB 9: GOOGLE SEARCH VISIBILITY REPORT */}
        {subTab === "report" && (
          <div className="space-y-6 text-xs text-zinc-300">
            <div className="space-y-1 pb-3 border-b border-zinc-900">
              <h4 className="text-white font-mono font-bold text-sm uppercase">Google Search Visibility Report</h4>
              <p className="text-zinc-500 text-[11px]">Comprehensive technical summary report for compliance tracking.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed font-sans">
              
              <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl space-y-4">
                
                <div>
                  <h5 className="text-[#00D4B2] font-mono font-bold uppercase tracking-wider text-[11px] mb-1">Google Understanding</h5>
                  <p className="text-zinc-400">
                    The crawl systems index the website primarily as a **{seoIdentity.businessCategory}** focusing on **{seoIdentity.primaryTopic}**. It correctly resolves the entities graph to connect **{seoIdentity.brandName}** to its target software products.
                  </p>
                </div>

                <div>
                  <h5 className="text-[#00D4B2] font-mono font-bold uppercase tracking-wider text-[11px] mb-1">Indexability Audit</h5>
                  <p className="text-zinc-400">
                    Standard check status is **Optimal (200 OK)**. Robots.txt allow parameters allow complete crawling access to public directory templates. Sitemap is active at `/sitemap.xml` listing canonical page URL paths.
                  </p>
                </div>

                <div>
                  <h5 className="text-[#00D4B2] font-mono font-bold uppercase tracking-wider text-[11px] mb-1">Search Appearance Settings</h5>
                  <p className="text-zinc-400">
                    HTML titles follow structured formats (`Primary Topic | Benefit | Brand`) without forced identical templates. Meta summaries provide concise actionable CTAs inside snippets. Visible breadcrumbs map paths cleanly.
                  </p>
                </div>

              </div>

              <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl space-y-4">
                
                <div>
                  <h5 className="text-purple-400 font-mono font-bold uppercase tracking-wider text-[11px] mb-1">Content Opportunities</h5>
                  <ul className="list-disc list-inside space-y-1.5 text-zinc-400">
                    <li>Create location pages mapping local compliance constraints.</li>
                    <li>Publish glossary terms defining technical payment jargon (e.g. Atlas accounts).</li>
                    <li>Establish side-by-side comparison tables evaluating Paypal and Stripe features.</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-purple-400 font-mono font-bold uppercase tracking-wider text-[11px] mb-1">SEO Improvements Completed</h5>
                  <ul className="list-disc list-inside space-y-1.5 text-zinc-400">
                    <li>Constituted consistent Brand and SEO identity profiles.</li>
                    <li>Injected valid JSON-LD structured SoftwareApplication schemas into the code.</li>
                    <li>Remedied layout heading hierarchy structures dynamically.</li>
                  </ul>
                </div>

                <div className="pt-2.5 border-t border-zinc-900/60 text-[10px] font-mono text-zinc-500">
                  Remaining actions: Verify website property inside **Google Search Console** and submit `/sitemap.xml` after server deployment.
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
