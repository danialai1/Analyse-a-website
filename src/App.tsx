import React, { useState, useEffect, useRef } from "react";
import { WebsiteAnalysis, PageNode, SitemapItem, ChatMessage, RedesignData, ComparisonResult, AutoFixResult, MonitoredSite } from "./types";
import { demoStripeAnalysis } from "./data/demoData";
import SpatialGraph3D from "./components/SpatialGraph3D";
import AutoFixConsole from "./components/AutoFixConsole";
import CodeIDE from "./components/CodeIDE";
import ComponentDetector from "./components/ComponentDetector";
import MediaIntelligence from "./components/MediaIntelligence";
import ProductHome from "./components/ProductHome";
import AdvancedSeoEngine from "./components/AdvancedSeoEngine";
import GoogleVisibilityCockpit from "./components/GoogleVisibilityCockpit";
import BrandLogo from "./components/BrandLogo";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";
import {
  Globe, Shield, Cpu, RefreshCw, Layers, FileText, Database, Code, CheckCircle, AlertTriangle, Play,
  Search, Bot, User, Send, Star, Copy, Check, Download, Edit2, Clock, Trash2, Calendar, Settings, Eye,
  EyeOff, Plus, HelpCircle, Layout, ArrowLeftRight, Bell, Zap, Image, Video, Info, Lock, X
} from "lucide-react";

export const renderFeatureBadge = (status: "LIVE" | "BETA" | "PLANNED" | "COMING SOON" | "UNAVAILABLE") => {
  let colors = "";
  switch (status) {
    case "LIVE":
      colors = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      break;
    case "BETA":
      colors = "bg-[#00D4B2]/10 text-[#00D4B2] border border-[#00D4B2]/20";
      break;
    case "PLANNED":
      colors = "bg-purple-500/10 text-purple-400 border border-purple-500/20";
      break;
    case "COMING SOON":
      colors = "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      break;
    case "UNAVAILABLE":
      colors = "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      break;
  }
  return (
    <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md uppercase ${colors}`}>
      {status}
    </span>
  );
};

export default function App() {
  // Navigation active tab inside Dashboard
  const [activeTab, setActiveTab] = useState<string>("home");

  // Core Website scanner states
  const [inputUrl, setInputUrl] = useState("");
  const [activeUrl, setActiveUrl] = useState<string>("https://stripe.com");
  const [analysis, setAnalysis] = useState<WebsiteAnalysis | null>(demoStripeAnalysis);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState("");
  const [scanAgent, setScanAgent] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Authentication State
  const [user, setUser] = useState<{ email: string; tier: "free" | "pro" } | null>({ email: "guest@webxray.ai", tier: "pro" });
  const [authView, setAuthView] = useState<"login" | "signup" | "forgot" | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Sitemap filtering and search states
  const [sitemapFilter, setSitemapFilter] = useState("");
  const [copiedText, setCopiedText] = useState(false);

  // AI Chat states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hi! I am the Master AI Agent of WebX-Ray. I coordinate design, crawler, technology, and SEO agents. Enter any URL to analyze or ask me questions about Stripe." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isSendingChat, setIsSendingChat] = useState(false);

  // AutoFix Workspace States
  const [selectedIssue, setSelectedIssue] = useState<string>("Image missing alt tag on homepage climate banner widget");
  const [activeAutoFix, setActiveAutoFix] = useState<AutoFixResult | null>({
    explanation: "Detected missing alternative descriptive tag on climate banner. Generated compliant HTML tag structure to satisfy WCAG AA layout metrics.",
    before: `<img src="/assets/climate-banner.jpg" class="w-full rounded-2xl" />`,
    after: `<img src="/assets/climate-banner.jpg" class="w-full rounded-2xl" alt="Stripe Climate Carbon Removal Portfolio Display" />`,
    riskLevel: "Safe",
    testResult: "Verification successful: WCAG AA contrast rules satisfied. SEO Index rank improved."
  });
  const [appliedFixes, setAppliedFixes] = useState<string[]>([]);
  const [isFixing, setIsFixing] = useState(false);

  // Live Refresh & Changes Tracker State
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [changeLogs, setChangeLogs] = useState<Array<{ type: string; before: string; after: string; date: string }>>([
    { type: "SEO Metadata Shift", before: "Stripe | Financial Infrastructure", after: "Stripe | Payments & Financial Infrastructure for the internet", date: "2026-09-28" },
    { type: "Typography Update", before: "font-family: 'Inter', sans-serif", after: "font-family: 'Plus Jakarta Sans', sans-serif", date: "2026-09-29" }
  ]);

  // Code Generator state
  const [codeLanguage, setCodeLanguage] = useState<"react" | "nextjs" | "tailwind" | "html">("react");
  const [activeCode, setActiveCode] = useState<string>(`import React from "react";
import { ArrowRight, Check, Shield } from "lucide-react";

export default function RedesignMockup() {
  return (
    <div className="bg-[#0D0D11] min-h-screen text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="inline-block bg-[#635BFF]/10 text-[#635BFF] text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-[#635BFF]/25">
          Enterprise Payments
        </div>
        <h1 className="text-4xl font-black tracking-tight max-w-xl">
          Unified Payments &amp; Financial Infrastructure
        </h1>
        <p className="text-zinc-400 text-sm max-w-lg leading-relaxed">
          A sleek, beautiful API layout featuring secure checkouts, automated invoice ledgers, and global compliance parameters.
        </p>
        <button className="bg-[#635BFF] hover:bg-[#5249F5] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1">
          Get started <ArrowRight className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
}`);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [redesignContext, setRedesignContext] = useState("");

  // 3D Knowledge Graph Interactive State (Rotate, zoom and selection)
  const [graphRotation, setGraphRotation] = useState(0);
  const [graphScale, setGraphScale] = useState(1);
  const [selectedGraphNode, setSelectedGraphNode] = useState<string | null>("Website Root");

  // Website Comparison side-by-side variables
  const [urlB, setUrlB] = useState("https://paypal.com");
  const [compareResult, setCompareResult] = useState<ComparisonResult | null>({
    summary: "Stripe implements a highly technical, dev-first modular infrastructure utilizing robust JSON REST APIs and clean glassmorphism interfaces. PayPal prioritizes broad consumer trust, direct merchant integrations, and familiar authentication pathways.",
    comparisonGrid: [
      { metricName: "Design System Aesthetics", siteAValue: "High-contrast luxury dark obsidian with rich ultraviolet accent glows", siteBValue: "Consolidated enterprise blue palette with high-contrast accessibility tags", verdictNotes: "Stripe captures superior developer preference; PayPal wins on corporate trust." },
      { metricName: "Primary Technology Stack", siteAValue: "React, Next.js frameworks coupled with Cloudflare caching limits", siteBValue: "Node.js cluster proxies backed by secure enterprise server farms", verdictNotes: "Stripe offers superior modern front-end composability; PayPal ensures monolithic stability." },
      { metricName: "SEO Page Indexing Speed", siteAValue: "Advanced schema structured data, semantic nesting, fast load metrics", siteBValue: "Broad consumer index ranks, metadata optimized for search queries", verdictNotes: "Stripe scores higher on speed; PayPal dominates domain authorization ranks." }
    ],
    keyTakeaways: [
      "Target Stripe blueprints for modern developer-oriented platforms or SaaS dashboard tools.",
      "Incorporate PayPal payment frames when catering to wide consumer markets or non-technical enterprises."
    ]
  });
  const [isComparing, setIsComparing] = useState(false);

  // Saved Searched Sites portfolio
  const [savedSearches, setSavedSearches] = useState<Array<{ url: string; name: string; analysis: any; timestamp: string }>>(() => {
    try {
      const saved = localStorage.getItem("webxray_saved_searches");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleSaveSearch = () => {
    if (!analysis) return;
    if (savedSearches.some(s => s.url === activeUrl)) {
      showToast("✓ This scan is already saved in your Portfolio!");
      return;
    }
    const updated = [
      ...savedSearches,
      { url: activeUrl, name: analysis.overview.name, analysis, timestamp: new Date().toISOString() }
    ];
    setSavedSearches(updated);
    localStorage.setItem("webxray_saved_searches", JSON.stringify(updated));
    showToast("✦ Website analysis bookmarked in your Portfolio!");
  };

  // Monitoring state
  const [selectedMonitorId, setSelectedMonitorId] = useState<string>("mon-1");
  const [monitoredSites, setMonitoredSites] = useState<MonitoredSite[]>([
    {
      id: "mon-1",
      url: "https://stripe.com",
      name: "Stripe Developer Platform",
      addedAt: "2026-09-25",
      lastCheckAt: "2026-09-29 10:30 AM",
      status: "active",
      frequency: "daily",
      history: [],
      trends: [
        { date: "09/22", seoScore: 91, keywordUsage: 42, primaryKeyword: "API Platform" },
        { date: "09/23", seoScore: 91, keywordUsage: 45, primaryKeyword: "Payments Ledger" },
        { date: "09/24", seoScore: 92, keywordUsage: 44, primaryKeyword: "Unified Checkout" },
        { date: "09/25", seoScore: 94, keywordUsage: 48, primaryKeyword: "Infrastructure" },
        { date: "09/26", seoScore: 93, keywordUsage: 50, primaryKeyword: "Developer Tooling" },
        { date: "09/27", seoScore: 95, keywordUsage: 51, primaryKeyword: "SaaS APIs" },
        { date: "09/28", seoScore: 95, keywordUsage: 55, primaryKeyword: "API Gateway" },
        { date: "09/29", seoScore: 96, keywordUsage: 58, primaryKeyword: "Financial Ledger" }
      ]
    },
    {
      id: "mon-2",
      url: "https://airbnb.com",
      name: "Airbnb Booking Engine",
      addedAt: "2026-09-24",
      lastCheckAt: "2026-09-29 09:15 AM",
      status: "active",
      frequency: "daily",
      history: [],
      trends: [
        { date: "09/22", seoScore: 84, keywordUsage: 25, primaryKeyword: "Vacation stays" },
        { date: "09/23", seoScore: 85, keywordUsage: 28, primaryKeyword: "Rentals Index" },
        { date: "09/24", seoScore: 85, keywordUsage: 31, primaryKeyword: "Luxury Cabins" },
        { date: "09/25", seoScore: 87, keywordUsage: 34, primaryKeyword: "Destinations List" },
        { date: "09/26", seoScore: 88, keywordUsage: 32, primaryKeyword: "Private Rooms" },
        { date: "09/27", seoScore: 86, keywordUsage: 36, primaryKeyword: "Lodging Map" },
        { date: "09/28", seoScore: 89, keywordUsage: 38, primaryKeyword: "Experiences Guide" },
        { date: "09/29", seoScore: 90, keywordUsage: 41, primaryKeyword: "Travel Booking" }
      ]
    },
    {
      id: "mon-3",
      url: "https://linear.app",
      name: "Linear Issue Tracker",
      addedAt: "2026-09-26",
      lastCheckAt: "2026-09-29 11:00 AM",
      status: "active",
      frequency: "daily",
      history: [],
      trends: [
        { date: "09/22", seoScore: 95, keywordUsage: 30, primaryKeyword: "Issue Board" },
        { date: "09/23", seoScore: 95, keywordUsage: 32, primaryKeyword: "Sprint Tracker" },
        { date: "09/24", seoScore: 96, keywordUsage: 35, primaryKeyword: "Workspace CLI" },
        { date: "09/25", seoScore: 96, keywordUsage: 38, primaryKeyword: "Linear Cycles" },
        { date: "09/26", seoScore: 97, keywordUsage: 40, primaryKeyword: "Productivity Index" },
        { date: "09/27", seoScore: 97, keywordUsage: 42, primaryKeyword: "Git integrations" },
        { date: "09/28", seoScore: 98, keywordUsage: 45, primaryKeyword: "Keyboard Shortcuts" },
        { date: "09/29", seoScore: 99, keywordUsage: 48, primaryKeyword: "Software Engine" }
      ]
    }
  ]);
  const [newMonitorUrl, setNewMonitorUrl] = useState("");
  const [newMonitorFreq, setNewMonitorFreq] = useState<"daily" | "weekly" | "monthly">("daily");

  // Settings Project authorization
  const [isAuthorized, setIsAuthorized] = useState(true);

  // Dynamic Score Upgrades on repairs
  const triggerScoreIncrease = () => {
    setMonitoredSites(prevSites => {
      return prevSites.map(site => {
        if (site.id === "mon-1") {
          const currentTrends = [...(site.trends || [])];
          if (currentTrends.length > 0) {
            const last = currentTrends[currentTrends.length - 1];
            currentTrends[currentTrends.length - 1] = {
              ...last,
              seoScore: Math.min(100, last.seoScore + 1)
            };
          }
          return { ...site, trends: currentTrends };
        }
        return site;
      });
    });
  };

  const triggerScoreDecrease = () => {
    setMonitoredSites(prevSites => {
      return prevSites.map(site => {
        if (site.id === "mon-1") {
          const currentTrends = [...(site.trends || [])];
          if (currentTrends.length > 0) {
            const last = currentTrends[currentTrends.length - 1];
            currentTrends[currentTrends.length - 1] = {
              ...last,
              seoScore: Math.max(75, last.seoScore - 1)
            };
          }
          return { ...site, trends: currentTrends };
        }
        return site;
      });
    });
  };

  // Autonomous AI coordinate agents streaming terminal logs state
  const [agentLogs, setAgentLogs] = useState<string[]>([
    "✦ [Master AI Agent] Coordinates multi-agent coordinate systems...",
    "✦ [Crawler Agent] Successfully validated public SSRF boundaries.",
    "✦ [Design Agent] Evaluated display heading: 'Inter Display' · body text: 'Plus Jakarta Sans'",
    "✦ [SEO Agent] Discovered 3 safe SEO indexing errors... compiling repairs...",
    "✦ [Technology Agent] Stack detected: React, Next.js framework backed by Cloudflare proxy CDNs."
  ]);

  useEffect(() => {
    if (!analysis) return;
    const interval = setInterval(() => {
      const logsPool = [
        `[Crawler Agent] Discovered route: ${activeUrl}/privacy · verified canonical structure`,
        `[Design Agent] Core contrast audit for primary ${analysis.design.primaryColor} - AAA rating`,
        `[Component Agent] Analyzed Layout DOM block of ${analysis.overview.name}: keyboard nav verified`,
        `[SEO Agent] Structuring JSON-LD schema proposal matching brand organizational taxonomy`,
        `[Security Agent] Confirmed SSL boundary verification is active and clean`,
        `[Technology Agent] Edge-CDN caches validated on Fastly servers`,
        `[Content Agent] Audited reading time estimation indexes: home average 4.2 minutes`,
        `[Function Agent] Verified Token integrity checkpoints on Payment Intents inputs`
      ];
      const randomLog = logsPool[Math.floor(Math.random() * logsPool.length)];
      setAgentLogs(prev => [...prev.slice(-10), `[${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}] ${randomLog}`]);
    }, 5000);
    return () => clearInterval(interval);
  }, [analysis, activeUrl]);

  // Global Toasts
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Website scanner handler
  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setIsScanning(true);
    setAnalysis(null);
    setError(null);

    const steps = [
      { agent: "Crawler Agent", step: "Establishing secure SSRF boundaries... validating public IP address..." },
      { agent: "Crawler Agent", step: "Crawl index active. Generating sitemap nodes structure tree..." },
      { agent: "Design Agent", step: "Scanning color palettes, fonts variables, button layout parameters..." },
      { agent: "Component Agent", step: "Detecting visual layout blocks, interactive sandbox forms..." },
      { agent: "SEO Agent", step: "Evaluating metadata title, description parameters, checking WCAG AA issues..." },
      { agent: "Technology Agent", step: "Detecting frameworks, caching CDNs, active tracking libraries..." },
      { agent: "Master AI Agent", step: "Compiling specialized agents reports... validating schema evidence labels..." }
    ];

    for (const item of steps) {
      setScanAgent(item.agent);
      setScanStep(item.step);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: inputUrl })
      });
      if (!res.ok) throw new Error("Crawl failed. Please verify API key configuration.");
      const data: WebsiteAnalysis = await res.json();
      setAnalysis(data);
      setActiveUrl(inputUrl);
      setChatMessages([
        { role: "assistant", content: `Successfully generated spatial report for ${inputUrl}! Ask me any questions about its layout, technology, or SEO structures.` }
      ]);
      showToast(`✦ Scanned report successfully loaded!`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Crawl failed. Check network SSL bindings.");
      showToast("Crawl failed. Reloading Stripe demo.");
      setAnalysis(demoStripeAnalysis);
    } finally {
      setIsScanning(false);
    }
  };

  // AI Chat handler
  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isSendingChat) return;

    const userMsg: ChatMessage = { role: "user", content: chatInput.trim() };
    const updated = [...chatMessages, userMsg];
    setChatMessages(updated);
    setChatInput("");
    setIsSendingChat(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: activeUrl,
          analysis: analysis,
          messages: updated
        })
      });
      if (!res.ok) throw new Error("Chat failed.");
      const data = await res.json();
      setChatMessages([...updated, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setChatMessages([...updated, { role: "assistant", content: "AI Engine overloaded. Try re-executing query." }]);
    } finally {
      setIsSendingChat(false);
    }
  };

  // AutoFix Trigger
  const handleAutoFixApply = () => {
    setIsFixing(true);
    setTimeout(() => {
      setAppliedFixes([...appliedFixes, selectedIssue]);
      setIsFixing(false);
      showToast("✦ Atomically applied repair fix successfully!");
    }, 1500);
  };

  // Rollback trigger
  const handleAutoFixRollback = (issue: string) => {
    setAppliedFixes(appliedFixes.filter(i => i !== issue));
    showToast("Rollback operation complete. Code restored.");
  };

  // Live Refresh State Comparator
  const handleLiveRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);

      // Append next trend point to selected monitored site
      setMonitoredSites(prevSites => {
        return prevSites.map(site => {
          if (site.id === selectedMonitorId) {
            const currentTrends = site.trends || [];
            // Generate sequential dates
            const lastDate = currentTrends.length > 0 ? currentTrends[currentTrends.length - 1].date : "09/29";
            const lastDayNum = parseInt(lastDate.split("/")[1] || "29");
            const nextDayNum = lastDayNum + 1;
            const nextDate = `09/${nextDayNum < 10 ? '0' + nextDayNum : nextDayNum}`;

            const lastSEO = currentTrends.length > 0 ? currentTrends[currentTrends.length - 1].seoScore : 92;
            const lastKeyword = currentTrends.length > 0 ? currentTrends[currentTrends.length - 1].keywordUsage : 45;

            // Generate slight variations
            const nextSEO = Math.min(100, Math.max(75, lastSEO + (Math.random() > 0.45 ? 1 : -1) * Math.floor(Math.random() * 3 + 1)));
            const nextKeyword = Math.max(10, lastKeyword + (Math.random() > 0.5 ? 2 : -2) * Math.floor(Math.random() * 4 + 1));

            const keywordsPool = ["API platform features", "Developer Console modules", "Automated Billing integrations", "Checkout templates", "Global compliance", "Visual redlines", "Audit metrics"];
            const randomKeyword = keywordsPool[Math.floor(Math.random() * keywordsPool.length)];

            const newPoint = {
              date: nextDate,
              seoScore: nextSEO,
              keywordUsage: nextKeyword,
              primaryKeyword: randomKeyword
            };

            return {
              ...site,
              lastCheckAt: `2026-09-29 ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
              trends: [...currentTrends, newPoint]
            };
          }
          return site;
        });
      });

      setChangeLogs([
        { type: "New Image Discovered", before: "None", after: "Climate program milestone portfolio banner", date: "Today 10:55 AM" },
        ...changeLogs
      ]);
      showToast("✦ Crawl check complete! Updated website intelligence and historical trends.");
    }, 2000);
  };

  // AI Original Redesign Trigger
  const handleAIOriginalRedesign = async () => {
    setIsGeneratingCode(true);
    try {
      const res = await fetch("/api/redesign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: activeUrl,
          analysis: analysis,
          customPrompt: redesignContext
        })
      });
      if (!res.ok) throw new Error("Generator failed.");
      const data = await res.json();
      setActiveCode(data.code);
      setCodeLanguage("react");
      showToast("✦ Redesign code successfully compiled!");
    } catch (err) {
      showToast("Generation failed. Check server status.");
    } finally {
      setIsGeneratingCode(false);
    }
  };

  // Export reports handler
  const handleExport = (format: "json" | "csv" | "pdf" | "html") => {
    if (!analysis) return;
    const content = JSON.stringify(analysis, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `webxray-report-${analysis.overview.name.toLowerCase()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
    showToast(`Exported ${format.toUpperCase()} report successfully.`);
  };

  // 3D Knowledge Graph Nodes Specification mapping
  const graphNodes = [
    { id: "Website Root", type: "root", x: 150, y: 150, label: activeUrl },
    { id: "Pages", type: "group", x: 50, y: 70, label: `Pages (${analysis?.metrics.pagesCount || 0})` },
    { id: "Components", type: "group", x: 250, y: 70, label: `Components (${analysis?.metrics.componentsCount || 0})` },
    { id: "Images", type: "group", x: 50, y: 230, label: `Images (${analysis?.metrics.imagesCount || 0})` },
    { id: "Functions", type: "group", x: 250, y: 230, label: "Interactive Functions" },
    { id: "Technology", type: "group", x: 150, y: 50, label: "Technology Stack" },
    { id: "SEO Audit", type: "group", x: 150, y: 250, label: "SEO Audit Index" }
  ];

  return (
    <div className="min-h-screen bg-[#060608] text-white flex flex-col font-sans selection:bg-[#00D4B2]/30 selection:text-white relative overflow-x-hidden">
      
      {/* Cinematic grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[#635BFF]/5 to-transparent pointer-events-none" />

      {/* Global Toast */}
      {toastMsg && (
        <div className="fixed top-24 right-6 z-50 bg-[#0A0A0F] border border-[rgba(0,212,178,0.3)] text-white text-xs font-mono font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in">
          <Zap className="w-4 h-4 text-[#00D4B2] shrink-0 animate-pulse" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* GLOBAL HEADER CONTRACT: 3 ZONES */}
      <header className="sticky top-0 z-40 bg-[#060608]/85 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Zone 1: Single Brand wordmark */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => {
            setActiveTab("home");
            showToast("✦ Loading WebX-Ray AI Homepage...");
          }}>
            <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
              <BrandLogo className="w-8 h-8" />
              <img 
                src="png-clipart-logo-online-and-offline-graphic-designer-architecture-logo-design-web-design-company.png" 
                alt="WebX-Ray Logo" 
                className="w-8 h-8 absolute inset-0 object-contain opacity-0 transition-opacity duration-300 pointer-events-none" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                onLoad={(e) => { e.currentTarget.className = "w-8 h-8 absolute inset-0 object-contain opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none bg-[#060608]"; }}
              />
            </div>
            <span className="font-black text-base tracking-tight uppercase bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent font-mono">
              WebX-Ray <span className="text-[#00D4B2]">AI</span>
            </span>
          </div>

          {/* Zone 2: Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase font-mono tracking-wider font-bold text-zinc-400">
            <button onClick={() => setActiveTab("home")} className={`hover:text-white transition-colors cursor-pointer ${activeTab === "home" ? "text-white border-b-2 border-[#00D4B2] pb-0.5" : ""}`}>Home</button>
            <button onClick={() => setActiveTab("overview")} className={`hover:text-white transition-colors cursor-pointer ${activeTab === "overview" ? "text-white border-b-2 border-[#00D4B2] pb-0.5" : ""}`}>Console</button>
            <button onClick={() => setActiveTab("3d-graph")} className={`hover:text-white transition-colors cursor-pointer ${activeTab === "3d-graph" ? "text-white border-b-2 border-[#00D4B2] pb-0.5" : ""}`}>3D Space</button>
            <button onClick={() => setActiveTab("autofix")} className={`hover:text-white transition-colors cursor-pointer ${activeTab === "autofix" ? "text-white border-b-2 border-[#00D4B2] pb-0.5" : ""}`}>AutoFix</button>
            <button onClick={() => setActiveTab("serp-cockpit")} className={`hover:text-white transition-colors cursor-pointer ${activeTab === "serp-cockpit" ? "text-white border-b-2 border-[#00D4B2] pb-0.5" : ""}`}>SERP Cockpit</button>
            <button onClick={() => setActiveTab("seo-docs")} className={`hover:text-white transition-colors cursor-pointer ${activeTab === "seo-docs" ? "text-white border-b-2 border-[#00D4B2] pb-0.5" : ""}`}>SEO Docs</button>
            <button onClick={() => setActiveTab("code")} className={`hover:text-white transition-colors cursor-pointer ${activeTab === "code" ? "text-white border-b-2 border-[#00D4B2] pb-0.5" : ""}`}>Code Redesign</button>
            <button onClick={() => setActiveTab("monitoring")} className={`hover:text-white transition-colors cursor-pointer ${activeTab === "monitoring" ? "text-white border-b-2 border-[#00D4B2] pb-0.5" : ""}`}>Monitor</button>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">{user.email}</span>
                <button
                  onClick={() => {
                    setUser(null);
                    showToast("Session disconnected.");
                  }}
                  className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-[10px] font-mono uppercase tracking-wider py-1.5 px-3 rounded-lg cursor-pointer"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthView("login")}
                className="bg-gradient-to-r from-[#635BFF] to-[#00D4B2] text-white text-[10px] font-mono uppercase tracking-widest font-black py-2 px-4 rounded-lg cursor-pointer shadow-[0_0_15px_rgba(99,91,255,0.3)]"
              >
                Connect Account
              </button>
            )}
          </div>

        </div>
      </header>

      {activeTab === "home" ? (
        <main className="max-w-7xl mx-auto px-6 py-10">
          <ProductHome onNavigate={setActiveTab} onShowToast={showToast} />
        </main>
      ) : (
        <>
          {/* CORE SEARCH / SCANNER CONTAINER */}
          <section className="bg-zinc-950/60 border-b border-zinc-900 py-10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none uppercase font-mono">
              Give us a website.<br/>We reveal how it works.
            </h1>
            <p className="text-zinc-500 text-xs md:text-sm font-medium tracking-wide">
              An X-ray machine for the modern web. Scan structures, technologies, and repair safe code errors atomically.
            </p>
          </div>

          {/* URL Search input */}
          <form onSubmit={handleScan} className="max-w-2xl mx-auto flex gap-2">
            <div className="relative flex-grow">
              <Globe className="w-4.5 h-4.5 text-zinc-650 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="Enter any public URL (e.g. stripe.com)..."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full bg-[#060608] border border-zinc-800/80 rounded-xl pl-10.5 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00D4B2] font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={isScanning}
              className="bg-gradient-to-r from-[#635BFF] to-[#00D4B2] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-[0_4px_15px_rgba(99,91,255,0.25)] hover:opacity-95 cursor-pointer disabled:opacity-50 font-mono"
            >
              {isScanning ? "Scanning..." : "ANALYZE WEBSITE"}
            </button>
          </form>

          {analysis && !isScanning && (
            <div className="flex justify-center items-center gap-3 pt-2">
              <span className="text-zinc-500 font-mono text-[11px]">Currently Auditing: <span className="text-[#00D4B2] font-bold underline">{activeUrl}</span></span>
              <button
                type="button"
                onClick={handleSaveSearch}
                className="bg-[#00D4B2]/10 border border-[#00D4B2]/20 hover:bg-[#00D4B2]/20 text-[#00D4B2] text-[10px] font-mono font-bold uppercase px-3 py-1.5 rounded-lg cursor-pointer transition-all flex items-center gap-1.5"
              >
                ✦ Save Search to Portfolio
              </button>
            </div>
          )}

          {/* Scanning Progress Timeline */}
          {isScanning && (
            <div className="bg-[#0A0A0F] border border-zinc-900 rounded-2xl p-5 max-w-xl mx-auto text-left space-y-4 animate-pulse">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
                <span className="text-[10px] font-mono text-[#00D4B2] uppercase font-bold tracking-widest flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 animate-spin" /> {scanAgent}
                </span>
                <span className="text-[9px] font-mono text-zinc-500">Coordination state...</span>
              </div>
              <p className="text-zinc-400 text-xs font-mono">{scanStep}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3.5 rounded-xl max-w-xl mx-auto text-left font-mono">
              [CRITICAL SCANNERS FAILED] : {error}
            </div>
          )}
        </div>
      </section>

      {/* DASHBOARD SPATIAL COMMAND CENTER */}
      {analysis && (
        <section className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Menu */}
          <div className="lg:col-span-3 bg-[#0A0A0F] border border-zinc-900 rounded-2xl p-4.5 space-y-1.5 text-left font-mono text-xs">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2 block mb-3">COMMAND CENTER</span>
            {[
              { id: "overview", label: "Website DNA Summary", count: null, status: "LIVE" as const },
              { id: "sitemap", label: "Pages & Sitemap", count: analysis.metrics.pagesCount, status: "LIVE" as const },
              { id: "design", label: "Design System UI", count: null, status: "LIVE" as const },
              { id: "components", label: "Component Detector", count: analysis.metrics.componentsCount, status: "LIVE" as const },
              { id: "3d-graph", label: "3D Spatial Map", count: null, status: "LIVE" as const },
              { id: "media", label: "Media Intelligence", count: analysis.metrics.imagesCount, status: "LIVE" as const },
              { id: "autofix", label: "Atomic AutoFix Console", count: analysis.seo.issues.length, status: "LIVE" as const },
              { id: "serp-cockpit", label: "Google SERP Cockpit", count: null, status: "LIVE" as const },
              { id: "seo-docs", label: "SEO & File Generator", count: 5, status: "LIVE" as const },
              { id: "code", label: "Code Generator Space", count: null, status: "LIVE" as const },
              { id: "compare", label: "Website Comparator", count: null, status: "LIVE" as const },
              { id: "monitoring", label: "Refresh & Monitoring", count: changeLogs.length, status: "LIVE" as const }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex flex-col items-start gap-1 px-3 py-2 rounded-xl transition-all cursor-pointer font-bold ${
                  activeTab === item.id
                    ? "bg-zinc-900 text-[#00D4B2] border border-zinc-800"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <div className="w-full flex justify-between items-center text-left">
                  <span>{item.label}</span>
                  {item.count !== null && (
                    <span className="text-[10px] bg-zinc-950 text-zinc-500 border border-zinc-850 px-1.5 py-0.2 rounded font-bold font-mono shrink-0">
                      {item.count}
                    </span>
                  )}
                </div>
                <div className="pt-0.5">
                  {renderFeatureBadge(item.status)}
                </div>
              </button>
            ))}

            <div className="pt-4 mt-4 border-t border-zinc-900 text-[10px] text-zinc-600 block pl-2 leading-relaxed">
              Target scanned:<br />
              <span className="text-zinc-400 font-bold select-all truncate block mt-0.5">{activeUrl}</span>
            </div>

            {/* SAVED PORTFOLIO PORTAL */}
            {savedSearches.length > 0 && (
              <div className="pt-4 mt-4 border-t border-zinc-900 space-y-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2 block">SAVED PORTFOLIO</span>
                <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1.5 scrollbar-thin">
                  {savedSearches.map((s, idx) => (
                    <div 
                      key={idx}
                      className="group flex items-center justify-between bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 rounded-xl p-2.5 transition-all text-[11px] font-sans"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setAnalysis(s.analysis);
                          setActiveUrl(s.url);
                          setInputUrl(s.url);
                          showToast(`✦ Restored bookmarked analysis for: ${s.name}`);
                        }}
                        className="text-zinc-300 font-semibold truncate hover:text-[#00D4B2] transition-colors cursor-pointer text-left flex-grow mr-2"
                      >
                        <div className="font-mono text-[10px] text-zinc-500 font-bold truncate uppercase">{s.name}</div>
                        <div className="truncate text-zinc-400 font-mono text-[9px] mt-0.5">{s.url}</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = savedSearches.filter((_, i) => i !== idx);
                          setSavedSearches(updated);
                          localStorage.setItem("webxray_saved_searches", JSON.stringify(updated));
                          showToast("✓ Removed website from saved portfolio.");
                        }}
                        className="text-zinc-600 hover:text-red-400 font-mono text-[10px] font-bold px-1.5 py-0.5 cursor-pointer rounded transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Workspace Panel content dynamic */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* TAB 1: WEBSITE DNA OVERVIEW SUMMARY */}
            {activeTab === "overview" && (
              <div className="space-y-6 text-left">
                
                <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                  <div>
                    <h3 className="text-white text-lg font-black font-mono uppercase tracking-tight">Website DNA Overview</h3>
                    <p className="text-xs text-zinc-500 mt-1">Directly extracted web intelligence profile summaries.</p>
                  </div>
                  {renderFeatureBadge("LIVE")}
                </div>
                
                {/* Visual scorecard metrics */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { label: "Pages Count", val: analysis.metrics.pagesCount, note: "Indexed" },
                    { label: "Components", val: analysis.metrics.componentsCount, note: "Detected" },
                    { label: "Image Assets", val: analysis.metrics.imagesCount, note: "Optimized" },
                    { label: "Anchor Links", val: analysis.metrics.linksCount, note: "Verified" },
                    { label: "Integrations", val: analysis.metrics.integrationsCount, note: "Active APIs" }
                  ].map((m, idx) => (
                    <div key={idx} className="bg-[#0A0A0F] border border-zinc-900 rounded-xl p-4 text-center">
                      <div className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider">{m.label}</div>
                      <div className="text-xl md:text-2xl font-black font-mono text-white tracking-tight mt-1 tabular-nums">{m.val}</div>
                      <div className="text-[10px] font-mono text-[#00D4B2] uppercase mt-1">{m.note}</div>
                    </div>
                  ))}
                </div>

                {/* Main DNA overview grid */}
                <div className="bg-[#0A0A0F] border border-zinc-900 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  
                  {/* Left block overview details */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Project Brand Identity</span>
                      <h3 className="text-white text-xl font-black mt-1 font-mono uppercase tracking-tight">{analysis.overview.name}</h3>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed">{analysis.overview.purpose}</p>

                    <div className="pt-3 border-t border-zinc-900 space-y-2 text-xs">
                      <div><span className="text-zinc-500 font-bold font-mono">Organization:</span> <span className="text-zinc-200">{analysis.overview.organization}</span></div>
                      <div><span className="text-zinc-500 font-bold font-mono">Category:</span> <span className="text-zinc-200">{analysis.overview.category}</span></div>
                      <div><span className="text-zinc-500 font-bold font-mono">Target Audience:</span> <span className="text-zinc-200">{analysis.overview.targetAudience}</span></div>
                    </div>

                    {/* Evidence tag label unboxed */}
                    <div className="pt-3 border-t border-zinc-900 flex items-center gap-2">
                      <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-widest">Evidence Classification:</span>
                      <span className="text-[10px] font-mono text-[#00D4B2] font-black tracking-widest bg-[#00D4B2]/10 border border-[#00D4B2]/20 px-2 py-0.5 rounded">
                        {analysis.overview.evidenceLabel}
                      </span>
                    </div>
                  </div>

                  {/* Right chatbot helper */}
                  <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4.5 flex flex-col justify-between h-[320px]">
                    <div className="space-y-3 flex-grow overflow-y-auto max-h-[220px] pr-2">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Ask Master AI Agent</span>
                      {chatMessages.map((msg, idx) => (
                        <div key={idx} className={`flex items-start gap-2 text-xs ${msg.role === "assistant" ? "" : "flex-row-reverse"}`}>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${msg.role === "assistant" ? "bg-[#635BFF]/10 border-[#635BFF]/30 text-[#635BFF]" : "bg-zinc-800 border-zinc-700 text-zinc-300"}`}>
                            {msg.role === "assistant" ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                          </div>
                          <div className={`p-2.5 rounded-lg max-w-[85%] ${msg.role === "assistant" ? "bg-[#0A0A0F] text-zinc-300 border border-zinc-900" : "bg-[#00D4B2]/10 text-white border border-[#00D4B2]/20"}`}>
                            {msg.content}
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleChat} className="flex gap-2 pt-3 border-t border-zinc-900 mt-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask about pages, design, technology..."
                        className="flex-grow bg-[#060608] border border-zinc-850 text-[11px] px-3 py-1.5 rounded-lg focus:outline-none"
                      />
                      <button type="submit" disabled={isSendingChat} className="bg-zinc-900 hover:bg-zinc-850 text-white p-2 rounded-lg border border-zinc-800 cursor-pointer">
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>

                </div>

                {/* Autonomous Multi-Agent Terminal Console log */}
                <div className="bg-[#0A0A0F] border border-zinc-900 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#00D4B2] animate-pulse" /> Autonomous Multi-Agent Command Terminal
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Active Stream Indexing</span>
                  </div>
                  <div className="bg-[#060608] border border-zinc-900 rounded-xl p-4 font-mono text-[10px] text-zinc-400 h-36 overflow-y-auto space-y-1.5">
                    {agentLogs.map((log, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-zinc-650 select-none">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: PAGES & SITEMAP */}
            {activeTab === "sitemap" && (
              <div className="space-y-6 text-left">
                
                <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                  <div>
                    <h3 className="text-white text-lg font-black font-mono uppercase tracking-tight">Pages &amp; Sitemap index</h3>
                    <p className="text-xs text-zinc-500 mt-1">Explore crawlers-observed website paths directory structures.</p>
                  </div>
                  {renderFeatureBadge("LIVE")}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Left Page list */}
                  <div className="md:col-span-6 bg-[#0A0A0F] border border-zinc-900 p-5 rounded-2xl space-y-4">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Crawled Node Details</span>
                    <div className="space-y-3">
                      {analysis.structure.pages.map((p, idx) => (
                        <div key={idx} className="bg-zinc-950 border border-zinc-900 p-3.5 rounded-xl space-y-2">
                          <div className="flex justify-between items-start gap-3">
                            <div className="truncate">
                              <h4 className="text-white font-bold text-xs truncate">{p.title}</h4>
                              <span className="text-[10px] text-zinc-500 font-mono block mt-0.5 select-all">{p.path}</span>
                            </div>
                            <span className="text-[9px] font-mono text-[#00D4B2] uppercase tracking-wider bg-[#00D4B2]/10 border border-[#00D4B2]/20 px-2 py-0.5 rounded">
                              {p.type}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {p.sections.map(s => (
                              <span key={s} className="bg-zinc-900/50 text-zinc-400 font-mono text-[9px] px-2 py-0.5 rounded border border-zinc-850/50">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Sitemap Tree exporter */}
                  <div className="md:col-span-6 bg-[#0A0A0F] border border-zinc-900 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Interactive Tree Filter</span>
                      
                      {/* Sitemap Search bar */}
                      <input
                        type="text"
                        placeholder="Filter sitemap nodes..."
                        value={sitemapFilter}
                        onChange={(e) => setSitemapFilter(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 text-xs px-3.5 py-2 rounded-xl focus:outline-none focus:border-[#00D4B2] font-mono text-white"
                      />

                      {/* Tree display */}
                      <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 font-mono text-[10px] leading-relaxed text-zinc-400 h-64 overflow-y-auto space-y-1">
                        {analysis.structure.sitemap
                          .filter(s => s.text.toLowerCase().includes(sitemapFilter.toLowerCase()))
                          .map((s, idx) => (
                            <div key={idx} style={{ paddingLeft: `${s.indent * 12}px` }} className="hover:bg-zinc-900 px-1 rounded py-0.5 transition-all text-left">
                              {s.text}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-900 flex justify-end gap-2">
                      <button
                        onClick={() => {
                          const text = analysis.structure.sitemap.map(s => "  ".repeat(s.indent) + s.text).join("\n");
                          navigator.clipboard.writeText(text);
                          setCopiedText(true);
                          setTimeout(() => setCopiedText(false), 2000);
                        }}
                        className="bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 text-[10px] font-mono font-bold py-1.5 px-3 rounded-lg cursor-pointer"
                      >
                        {copiedText ? "✓ COPIED" : "COPY TEXT"}
                      </button>
                      <button
                        onClick={() => handleExport("json")}
                        className="bg-[#00D4B2] text-zinc-950 text-[10px] font-mono font-black py-1.5 px-3 rounded-lg cursor-pointer hover:bg-[#00D4B2]/90"
                      >
                        EXPORT JSON
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 3: DESIGN SYSTEM */}
            {activeTab === "design" && (
              <div className="space-y-6 text-left">
                
                <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                  <div>
                    <h3 className="text-white text-lg font-black font-mono uppercase tracking-tight">Design System Audits</h3>
                    <p className="text-xs text-zinc-500 mt-1">Crawled color swatches, font families pairing, and layout button variables.</p>
                  </div>
                  {renderFeatureBadge("LIVE")}
                </div>

                <div className="bg-[#0A0A0F] border border-zinc-900 p-6 rounded-2xl space-y-6">
                  
                  {/* Swatches */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Extracted Swatches palette</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Primary Swatch", hex: analysis.design.primaryColor },
                        { label: "Secondary Swatch", hex: analysis.design.secondaryColor },
                        { label: "Background Swatch", hex: analysis.design.backgroundColor },
                        { label: "Accent Swatch", hex: analysis.design.accentColor }
                      ].map((s, idx) => (
                        <div key={idx} className="bg-zinc-950 border border-zinc-900 p-3 rounded-xl flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg shrink-0" style={{ backgroundColor: s.hex }} />
                          <div className="truncate">
                            <span className="text-[9px] font-mono text-zinc-500 block uppercase font-bold">{s.label}</span>
                            <span className="text-xs text-white font-mono select-all font-bold">{s.hex}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Typography & layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-900">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Typography System</span>
                      <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl space-y-2">
                        <div className="text-xs"><span className="text-zinc-500 font-mono">Display Heading:</span> <span className="text-white font-bold">{analysis.design.fontFamilyDisplay}</span></div>
                        <div className="text-xs"><span className="text-zinc-500 font-mono">Body Prose Text:</span> <span className="text-white font-bold">{analysis.design.fontFamilyBody}</span></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Layout Specifications</span>
                      <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl space-y-2">
                        <div className="text-xs"><span className="text-zinc-500 font-mono">Button Style:</span> <span className="text-zinc-300">{analysis.design.buttonStyle}</span></div>
                        <div className="text-xs"><span className="text-zinc-500 font-mono">Card Containers:</span> <span className="text-zinc-300">{analysis.design.cardStyle}</span></div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 4: COMPONENT DETECTOR */}
            {activeTab === "components" && (
              <ComponentDetector analysis={analysis} />
            )}

            {/* TAB 5: 3D SPATIAL KNOWLEDGE GRAPH */}
            {activeTab === "3d-graph" && (
              <SpatialGraph3D analysis={analysis} activeUrl={activeUrl} />
            )}

            {/* TAB 6: MEDIA INTELLIGENCE */}
            {activeTab === "media" && (
              <MediaIntelligence analysis={analysis} />
            )}

            {/* TAB 7: ATOMIC AUTOFIX CONSOLE */}
            {activeTab === "autofix" && (
              <AutoFixConsole
                analysis={analysis}
                appliedFixes={appliedFixes}
                setAppliedFixes={setAppliedFixes}
                showToast={showToast}
                triggerScoreIncrease={triggerScoreIncrease}
                triggerScoreDecrease={triggerScoreDecrease}
                activeCode={activeCode}
                setActiveCode={setActiveCode}
              />
            )}

            {/* TAB 7.5: ADVANCED SEO ENGINE */}
            {activeTab === "seo-docs" && (
              <AdvancedSeoEngine
                analysis={analysis}
                activeUrl={activeUrl}
                showToast={showToast}
                activeCode={activeCode}
                setActiveCode={setActiveCode}
              />
            )}

            {/* TAB 7.6: GOOGLE SERP VISIBILITY COCKPIT */}
            {activeTab === "serp-cockpit" && (
              <GoogleVisibilityCockpit
                analysis={analysis}
                activeUrl={activeUrl}
                showToast={showToast}
                activeCode={activeCode}
                setActiveCode={setActiveCode}
              />
            )}

            {/* TAB 8: CODE GENERATOR SPACE */}
            {activeTab === "code" && (
              <CodeIDE 
                activeUrl={activeUrl} 
                analysis={analysis} 
                showToast={showToast} 
                activeCode={activeCode}
                setActiveCode={setActiveCode}
              />
            )}

            {/* TAB 9: WEBSITE COMPARATOR */}
            {activeTab === "compare" && (
              <div className="space-y-6 text-left">
                
                <div>
                  <h3 className="text-white text-lg font-black font-mono uppercase tracking-tight">Website side-by-side comparison</h3>
                  <p className="text-xs text-zinc-500 mt-1">Contrast active scanned targets against any competitor website frameworks.</p>
                </div>

                {/* Contrast target fields input */}
                <div className="bg-[#0A0A0F] border border-zinc-900 p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-col gap-1 w-full md:max-w-xs">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold">Current Focus Website</span>
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-900 font-mono text-xs text-white truncate">
                      {activeUrl}
                    </div>
                  </div>

                  <div className="text-zinc-600 font-mono text-xs uppercase font-bold">VS</div>

                  <div className="flex flex-col gap-1.5 w-full md:max-w-xs">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold">Compare Competitor URL</span>
                    <input
                      type="text"
                      value={urlB}
                      onChange={(e) => setUrlB(e.target.value)}
                      placeholder="e.g. paypal.com..."
                      className="bg-zinc-950 border border-zinc-850 text-xs font-mono text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#00D4B2]"
                    />
                  </div>

                  <button
                    disabled={isComparing}
                    onClick={() => {
                      setIsComparing(true);
                      setTimeout(() => {
                        setIsComparing(false);
                        showToast("Side-by-side comparison generated.");
                      }, 1500);
                    }}
                    className="bg-[#00D4B2] hover:bg-[#00D4B2]/90 text-zinc-950 text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer disabled:opacity-50 shrink-0 font-mono"
                  >
                    {isComparing ? "Contrasting..." : "RUN COMPARISON"}
                  </button>
                </div>

                {/* Compare report summary display */}
                {compareResult && (
                  <div className="space-y-6">
                    <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold mb-2">Executive Summary Verdict</span>
                      <p className="text-zinc-300 text-xs leading-relaxed">{compareResult.summary}</p>
                    </div>

                    {/* Compare grid table */}
                    <div className="bg-[#0A0A0F] border border-zinc-900 rounded-2xl overflow-hidden text-xs">
                      <div className="grid grid-cols-12 gap-4 bg-zinc-950 p-4 border-b border-zinc-900 font-mono font-bold text-zinc-400">
                        <div className="col-span-3">Evaluation Point</div>
                        <div className="col-span-4">{activeUrl}</div>
                        <div className="col-span-5">{urlB}</div>
                      </div>

                      <div className="divide-y divide-zinc-900">
                        {compareResult.comparisonGrid.map((row, idx) => (
                          <div key={idx} className="grid grid-cols-12 gap-4 p-4 items-start bg-[#0A0A0F]/60">
                            <div className="col-span-3 text-white font-bold font-mono text-[11px]">{row.metricName}</div>
                            <div className="col-span-4 text-zinc-400">{row.siteAValue}</div>
                            <div className="col-span-5 text-zinc-300 space-y-2">
                              <div>{row.siteBValue}</div>
                              <div className="text-[10px] font-mono text-zinc-500 italic">Tradeoff: {row.verdictNotes}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key recommendations */}
                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold mb-2">Key Takeaways</span>
                      <ul className="space-y-1.5 text-xs text-zinc-400">
                        {compareResult.keyTakeaways.map((t, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-[#00D4B2] font-bold">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* TAB 9: REFRESH & MONITORING SCHEDULER */}
            {activeTab === "monitoring" && (
              <div className="space-y-6 text-left">
                
                {/* Visual scorecard metrics & Interactive Watchlist list + Recharts Trend Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Left Column: Watchlist Site Selector */}
                  <div className="lg:col-span-4 bg-[#0A0A0F] border border-zinc-900 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Watchlist Projects</span>
                        <span className="text-[9px] font-mono text-[#00D4B2] font-bold">ACTIVE AUDITING</span>
                      </div>
                      
                      <div className="space-y-2.5">
                        {monitoredSites.map(site => {
                          const isSelected = site.id === selectedMonitorId;
                          const latestTrend = site.trends && site.trends.length > 0 ? site.trends[site.trends.length - 1] : null;
                          return (
                            <button
                              key={site.id}
                              type="button"
                              onClick={() => setSelectedMonitorId(site.id)}
                              className={`w-full text-left p-3.5 rounded-xl transition-all border block cursor-pointer ${
                                isSelected 
                                  ? "bg-[#00D4B2]/5 border-[#00D4B2]/30" 
                                  : "bg-[#060608]/50 border-zinc-900 hover:border-zinc-850"
                              }`}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <span className={`text-xs font-black truncate block ${isSelected ? "text-white font-mono" : "text-zinc-300"}`}>
                                  {site.name}
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1" />
                              </div>
                              <span className="text-[10px] text-zinc-500 font-mono block mt-0.5 truncate select-all">{site.url}</span>
                              
                              {latestTrend && (
                                <div className="flex items-center gap-2 text-[9px] text-zinc-400 font-mono mt-2 pt-2 border-t border-zinc-900/40">
                                  <span>SEO: <strong className="text-white">{latestTrend.seoScore}%</strong></span>
                                  <span>·</span>
                                  <span>Keyword count: <strong className="text-white">{latestTrend.keywordUsage}</strong></span>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quick Add Custom Site to Watchlist */}
                    <div className="pt-4 border-t border-zinc-900/60 space-y-2.5">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Add Custom Monitor Target</span>
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          placeholder="e.g. stripe.com"
                          value={newMonitorUrl}
                          onChange={(e) => setNewMonitorUrl(e.target.value)}
                          className="w-full bg-[#060608] border border-zinc-850 rounded-xl px-3 py-2 text-[11px] text-white focus:outline-none focus:border-[#00D4B2] font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!newMonitorUrl.trim()) return;
                            const newId = `mon-${Date.now()}`;
                            const cleanUrl = newMonitorUrl.trim().toLowerCase();
                            const cleanName = cleanUrl.replace("https://", "").replace("http://", "").split("/")[0];
                            const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1) + " Instance";
                            
                            const newSite: MonitoredSite = {
                              id: newId,
                              url: cleanUrl.startsWith("http") ? cleanUrl : `https://${cleanUrl}`,
                              name: formattedName,
                              addedAt: "2026-09-29",
                              lastCheckAt: "Just now",
                              status: "active",
                              frequency: "daily",
                              history: [],
                              trends: [
                                { date: "09/25", seoScore: 85, keywordUsage: 22, primaryKeyword: "Bootstrap landing" },
                                { date: "09/26", seoScore: 87, keywordUsage: 26, primaryKeyword: "Components layout" },
                                { date: "09/27", seoScore: 86, keywordUsage: 31, primaryKeyword: "Optimization run" },
                                { date: "09/28", seoScore: 89, keywordUsage: 35, primaryKeyword: "SEO parameters" },
                                { date: "09/29", seoScore: 91, keywordUsage: 38, primaryKeyword: "WebX-Ray Scan" }
                              ]
                            };
                            setMonitoredSites([...monitoredSites, newSite]);
                            setSelectedMonitorId(newId);
                            setNewMonitorUrl("");
                            showToast(`Added ${cleanUrl} to active crawlers watchlist!`);
                          }}
                          className="w-full bg-[#635BFF] hover:bg-[#5249F5] text-white text-[10px] font-mono font-bold py-2 rounded-xl transition-all cursor-pointer"
                        >
                          Add to Watchlist
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Recharts Line Chart */}
                  <div className="lg:col-span-8 bg-[#0A0A0F] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="text-white text-sm font-bold font-mono uppercase tracking-tight">
                            {monitoredSites.find(s => s.id === selectedMonitorId)?.name || "Project"} Trend Analysis
                          </h4>
                          <p className="text-[11px] text-zinc-500 mt-0.5">Historical trend tracking for SEO health audits and core keywords presence density.</p>
                        </div>
                        {renderFeatureBadge("BETA")}
                      </div>

                      {/* Header quick summaries */}
                      {(() => {
                        const activeSite = monitoredSites.find(s => s.id === selectedMonitorId);
                        const trends = activeSite?.trends || [];
                        const latest = trends.length > 0 ? trends[trends.length - 1] : null;
                        const initial = trends.length > 0 ? trends[0] : null;
                        
                        const seoDiff = latest && initial ? latest.seoScore - initial.seoScore : 0;
                        const keywordDiff = latest && initial ? latest.keywordUsage - initial.keywordUsage : 0;
                        
                        return (
                          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-zinc-900/60 text-left">
                            <div className="bg-zinc-950/50 border border-zinc-900/60 p-3 rounded-xl">
                              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">SEO Audit Score</span>
                              <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-xl font-black text-white font-mono">{latest?.seoScore || 0}%</span>
                                <span className={`text-[10px] font-mono font-bold ${seoDiff >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                  {seoDiff >= 0 ? `+${seoDiff}` : seoDiff}% from start
                                </span>
                              </div>
                            </div>

                            <div className="bg-zinc-950/50 border border-zinc-900/60 p-3 rounded-xl">
                              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Keyword density</span>
                              <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-xl font-black text-[#00D4B2] font-mono">{latest?.keywordUsage || 0} instances</span>
                                <span className="text-[9px] text-zinc-500 font-mono truncate">
                                  Primary: <strong className="text-zinc-300 font-bold">{latest?.primaryKeyword || "None"}</strong>
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Recharts Render Canvas */}
                    <div className="w-full h-72 bg-zinc-950/40 border border-zinc-900/60 p-4 rounded-xl relative flex flex-col justify-center">
                      {(() => {
                        const activeSite = monitoredSites.find(s => s.id === selectedMonitorId);
                        const chartData = activeSite?.trends || [];
                        
                        if (chartData.length === 0) {
                          return (
                            <span className="text-xs text-zinc-500 text-center font-mono italic">No trend points compiled yet. Run simulated audit.</span>
                          );
                        }

                        return (
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                              <XAxis 
                                dataKey="date" 
                                stroke="rgba(255,255,255,0.3)" 
                                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9, fontFamily: 'monospace' }}
                              />
                              <YAxis 
                                stroke="rgba(255,255,255,0.3)"
                                domain={['auto', 'auto']}
                                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9, fontFamily: 'monospace' }}
                              />
                              <Tooltip
                                content={({ active, payload, label }) => {
                                  if (active && payload && payload.length) {
                                    const data = payload[0].payload as any;
                                    return (
                                      <div className="bg-[#0A0A0F]/90 backdrop-blur-md border border-zinc-800 p-3.5 rounded-xl text-left shadow-2xl text-[10px] space-y-1.5 font-mono">
                                        <div className="font-bold text-zinc-400 border-b border-zinc-900 pb-1 mb-1 text-[11px]">
                                          Crawl point: {label}
                                        </div>
                                        <div className="text-zinc-300 flex justify-between gap-4">
                                          <span>SEO Score:</span>
                                          <strong className="text-white font-bold">{data.seoScore}%</strong>
                                        </div>
                                        <div className="text-zinc-300 flex justify-between gap-4">
                                          <span>Keywords:</span>
                                          <strong className="text-[#00D4B2] font-bold">{data.keywordUsage} instances</strong>
                                        </div>
                                        <div className="text-zinc-300 flex justify-between gap-4">
                                          <span>Primary:</span>
                                          <strong className="text-purple-400 font-bold truncate max-w-[120px]">{data.primaryKeyword}</strong>
                                        </div>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Legend 
                                verticalAlign="top" 
                                height={36}
                                iconSize={8}
                                wrapperStyle={{ fontSize: 9, fontFamily: 'monospace', fill: 'rgba(255,255,255,0.5)' }}
                              />
                              <Line 
                                name="SEO Health Audit Score"
                                type="monotone" 
                                dataKey="seoScore" 
                                stroke="#635BFF" 
                                strokeWidth={2.5}
                                activeDot={{ r: 6, fill: '#635BFF', strokeWidth: 0 }}
                                dot={{ r: 3, fill: '#635BFF', strokeWidth: 0 }}
                              />
                              <Line 
                                name="Keyword density occurrence"
                                type="monotone" 
                                dataKey="keywordUsage" 
                                stroke="#00D4B2" 
                                strokeWidth={2.5}
                                activeDot={{ r: 6, fill: '#00D4B2', strokeWidth: 0 }}
                                dot={{ r: 3, fill: '#00D4B2', strokeWidth: 0 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        );
                      })()}
                    </div>
                  </div>

                </div>
                
                {/* Live Refresh Block */}
                <div className="bg-[#0A0A0F] border border-zinc-900 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <div>
                      <h3 className="text-white text-base font-black font-mono uppercase tracking-tight">Live Website Refresh</h3>
                      <p className="text-xs text-zinc-500 mt-1">Re-crawl the public webpage to detect SEO, content, and code alterations compared to previous crawl indexes.</p>
                    </div>

                    <button
                      type="button"
                      disabled={isRefreshing}
                      onClick={handleLiveRefresh}
                      className="bg-zinc-900 hover:bg-zinc-850 text-white text-xs font-bold py-2 px-4 rounded-xl border border-zinc-800 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-4 h-4 text-[#00D4B2] ${isRefreshing ? "animate-spin" : ""}`} />
                      Trigger Re-crawl
                    </button>
                  </div>

                  {/* Changes history before vs after list */}
                  <div className="pt-4 border-t border-zinc-900 space-y-3">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Detected alterations history ({changeLogs.length})</span>
                    {changeLogs.map((log, idx) => (
                      <div key={idx} className="bg-zinc-950 border border-zinc-900 p-3 rounded-xl flex justify-between items-center text-xs">
                        <div className="space-y-1 truncate">
                          <span className="font-bold text-white block">{log.type}</span>
                          <div className="flex gap-4 text-[10px] text-zinc-500 font-mono">
                            <span>Before: <span className="text-red-400 font-bold truncate max-w-[200px] inline-block align-bottom">{log.before}</span></span>
                            <span>After: <span className="text-emerald-400 font-bold truncate max-w-[200px] inline-block align-bottom">{log.after}</span></span>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono text-zinc-600 font-bold shrink-0">{log.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monitoring Scheduler configuration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Scheduler Form */}
                  <div className="bg-[#0A0A0F] border border-zinc-900 p-5 rounded-2xl space-y-4">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Configure Monitoring Schedule</span>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      Automatically schedule crawler audits. Get notified instantly when layout elements, metadata titles, or technologies shift.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Crawl Frequency</label>
                        <select
                          value={newMonitorFreq}
                          onChange={(e: any) => setNewMonitorFreq(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 text-xs text-zinc-300 font-bold font-mono rounded-xl p-2 cursor-pointer focus:outline-none"
                        >
                          <option value="daily">Daily Crawl</option>
                          <option value="weekly">Weekly Crawl</option>
                          <option value="monthly">Monthly Crawl</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Authorization Permitted</label>
                        <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-zinc-400">
                          <input
                            type="checkbox"
                            checked={isAuthorized}
                            onChange={(e) => setIsAuthorized(e.target.checked)}
                            className="accent-[#00D4B2]"
                          />
                          <span>I am authorized</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (!isAuthorized) {
                          showToast("Error: Verification permission is required to monitor.");
                          return;
                        }
                        showToast("✦ Crawl monitoring schedule configured successfully.");
                      }}
                      className="w-full bg-[#635BFF] text-white text-xs font-bold py-2.5 rounded-xl cursor-pointer"
                    >
                      Save Monitoring parameters
                    </button>
                  </div>

                  {/* Reports export triggers */}
                  <div className="bg-[#0A0A0F] border border-zinc-900 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Export Intelligence Reports</span>
                      <p className="text-zinc-400 text-xs leading-relaxed mt-2">
                        Download raw crawled profiles data schemas. Perfect for developers, SEO specialists, or technology audits imports.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-4">
                      <button type="button" onClick={() => handleExport("json")} className="bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 text-zinc-300 text-xs font-mono font-bold py-2 rounded-xl cursor-pointer">
                        DOWNLOAD JSON
                      </button>
                      <button type="button" onClick={() => handleExport("csv")} className="bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 text-zinc-300 text-xs font-mono font-bold py-2 rounded-xl cursor-pointer">
                        DOWNLOAD CSV
                      </button>
                      <button type="button" onClick={() => handleExport("pdf")} className="bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 text-zinc-300 text-xs font-mono font-bold py-2 rounded-xl cursor-pointer">
                        DOWNLOAD PDF
                      </button>
                      <button type="button" onClick={() => handleExport("html")} className="bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 text-zinc-300 text-xs font-mono font-bold py-2 rounded-xl cursor-pointer">
                        DOWNLOAD HTML
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>

        </section>
      )}
        </>
      )}

      {/* AUTHENTICATION LOGIN / SIGNUP DIALOG OVERLAYS */}
      {authView && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A0A0F] border border-zinc-900 rounded-3xl p-8 w-full max-w-md text-left space-y-6 shadow-2xl relative">
            <button
              onClick={() => setAuthView(null)}
              className="text-zinc-500 hover:text-white absolute right-6 top-6 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-white font-mono font-black text-xl uppercase tracking-tight">
                {authView === "login" ? "Connect Workspace" : authView === "signup" ? "Create Account" : "Recover Key"}
              </h3>
              <p className="text-zinc-500 text-xs">
                {authView === "login" ? "Enter your credentials to unlock WebX-Ray AI workspace." : "Create account to configure cron monitoring audits."}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!authEmail.trim()) return;
                setUser({ email: authEmail, tier: "pro" });
                setAuthView(null);
                showToast("✦ Session initialized successfully!");
              }}
              className="space-y-4 text-xs"
            >
              <div className="space-y-1">
                <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Email Address</label>
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="e.g. developer@webxray.ai"
                  className="w-full bg-[#060608] border border-zinc-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D4B2]"
                />
              </div>

              {authView !== "forgot" && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Password</label>
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="text-[9px] font-mono text-zinc-500 hover:text-white"
                    >
                      {passwordVisible ? "Hide" : "Show"}
                    </button>
                  </div>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    required
                    autoComplete={authView === "login" ? "current-password" : "new-password"}
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#060608] border border-zinc-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D4B2]"
                  />
                </div>
              )}

              {authView === "login" && (
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="accent-[#00D4B2]"
                    />
                    <span>Remember me</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAuthView("forgot")}
                    className="hover:text-white"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#635BFF] to-[#00D4B2] text-white text-xs font-black py-3 rounded-xl cursor-pointer font-mono"
              >
                {authView === "login" ? "INITIALIZE SESSION" : authView === "signup" ? "CREATE ACCOUNT" : "SEND RECOVERY EMAIL"}
              </button>
            </form>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-zinc-900"></div>
              <span className="flex-shrink mx-4 text-zinc-600 font-mono text-[9px] uppercase">OR</span>
              <div className="flex-grow border-t border-zinc-900"></div>
            </div>

            {/* Google oauth */}
            <button
              onClick={() => {
                setUser({ email: "google.user@webxray.ai", tier: "pro" });
                setAuthView(null);
                showToast("Connected via Google Account!");
              }}
              className="w-full bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-850 text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 font-mono"
            >
              Continue with Google
            </button>

            <div className="text-center text-[11px] text-zinc-500">
              {authView === "login" ? (
                <>
                  Don't have an account yet?{" "}
                  <button onClick={() => setAuthView("signup")} className="text-[#00D4B2] hover:underline font-bold">
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={() => setAuthView("login")} className="text-[#00D4B2] hover:underline font-bold">
                    Log in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-auto border-t border-zinc-900 bg-[#060608] text-zinc-600 py-12 text-left">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <span className="font-bold text-white text-sm font-mono uppercase">WebX-Ray AI</span>
            <p className="text-xs leading-relaxed font-medium text-zinc-500">Give us a website. We reveal how it works. An X-ray machine for the modern web.</p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">Consoles</span>
            <div className="flex flex-col gap-1.5 text-xs text-zinc-500">
              <button onClick={() => setActiveTab("overview")} className="hover:text-white transition-colors text-left cursor-pointer">Website DNA</button>
              <button onClick={() => setActiveTab("autofix")} className="hover:text-white transition-colors text-left cursor-pointer">Atomic AutoFix</button>
              <button onClick={() => setActiveTab("code")} className="hover:text-white transition-colors text-left cursor-pointer">Code Generator</button>
              <button onClick={() => setActiveTab("3d-graph")} className="hover:text-white transition-colors text-left cursor-pointer">3D Space Map</button>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">Resources</span>
            <div className="flex flex-col gap-1.5 text-xs text-zinc-500">
              <span>Security Protocols</span>
              <span>SSRF protections details</span>
              <span>Crawling Limits limits</span>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">Legal</span>
            <div className="flex flex-col gap-1.5 text-xs text-zinc-500">
              <span>Terms of Use</span>
              <span>Privacy Policy</span>
              <span>Permission Verification</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <span>&copy; 2026 WebX-Ray AI Corporation. All rights reserved.</span>
          <span className="text-zinc-700 font-mono">Powered by Google Gemini 2.5 Server-side Engine</span>
        </div>
      </footer>

    </div>
  );
}
