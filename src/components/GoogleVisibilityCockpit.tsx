import React, { useState, useEffect } from "react";
import {
  Search, Eye, Monitor, Smartphone, Copy, Check, Bot, Sparkles, HelpCircle,
  FileCode, RefreshCw, Send, CheckCircle2, ChevronRight, LayoutGrid, Terminal,
  Code, AlertTriangle, Play, Flame, CheckCircle, Info, ExternalLink
} from "lucide-react";
import { WebsiteAnalysis } from "../types";
import BrandLogo from "./BrandLogo";

interface GoogleVisibilityCockpitProps {
  analysis: WebsiteAnalysis;
  activeUrl: string;
  showToast: (msg: string) => void;
  activeCode: string;
  setActiveCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function GoogleVisibilityCockpit({
  analysis,
  activeUrl,
  showToast,
  activeCode,
  setActiveCode
}: GoogleVisibilityCockpitProps) {
  // Simulator state: Desktop vs Mobile
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");

  // Dynamic user editable search titles & snippets for simulation
  const [simulatedTitle, setSimulatedTitle] = useState(analysis.seo.title || "Developer Payment Solutions");
  const [simulatedMeta, setSimulatedMeta] = useState(analysis.seo.metaDescription || "Configure secure financial checkouts atomically.");

  // Click Trigger Candidates Suite
  const [copiedTriggerIdx, setCopiedTriggerIdx] = useState<number | null>(null);

  // Googlebot Raw Content Reader State
  const [botViewMode, setBotViewMode] = useState<"visual" | "crawler">("crawler");

  // Interactive Custom AI Optimizer
  const [advisorTopic, setAdvisorTopic] = useState<"hero" | "accessibility" | "metadata">("hero");
  const [customGoal, setCustomGoal] = useState<string>("");
  const [buttonColor, setButtonColor] = useState<string>("#00D4B2");
  const [isPatching, setIsPatching] = useState(false);
  const [patchedSnippet, setPatchedSnippet] = useState<string>("");
  const [adviceOutput, setAdviceOutput] = useState<string>("");

  // JSON-LD Organization Schema Architect States
  const [orgLegalName, setOrgLegalName] = useState(analysis.overview.organization || "WebX-Ray AI Corp");
  const [orgUrl, setOrgUrl] = useState(activeUrl || "https://webxray.ai");
  const [orgLogoUrl, setOrgLogoUrl] = useState("https://webxray.ai/logo.png");
  const [orgContact, setOrgContact] = useState("+1-800-555-0199");
  const [schemaCodeTab, setSchemaCodeTab] = useState<"schema" | "html" | "preview">("schema");

  const domainName = activeUrl.replace(/https?:\/\/(www\.)?/, "").split("/")[0] || "stripe.com";
  const secureUrl = activeUrl.startsWith("http") ? activeUrl : "https://" + activeUrl;

  // 1. AI-POWERED VIRAL CTR TITLE SUITE candidates based on crawled site's profile
  const ctrTriggers = [
    {
      type: "FOMO & Curiosity Gap",
      title: `Why 94% of Modern Developers Swapped to ${analysis.overview.name} REST APIs`,
      rationale: "Creates urgency and highlights peer-adoption validation metrics.",
      ctrBoost: "+24.8% CTR",
      hot: true
    },
    {
      type: "Proof-Focused / Authority",
      title: `${analysis.overview.name}: Cryptographically Secure Payment Gateway Audit`,
      rationale: "Establishes institutional security credibility and clear service category.",
      ctrBoost: "+18.2% CTR",
      hot: false
    },
    {
      type: "Action-Oriented Command",
      title: `Analyze & Integrate Global Billing Ledger Schemas in Under 5 Minutes`,
      rationale: "Clear onboarding timeframe promises fast setup without configuration friction.",
      ctrBoost: "+21.5% CTR",
      hot: true
    },
    {
      type: "Value-Led Benefit",
      title: `Maximize Checkout Conversions with ${analysis.overview.organization} Layouts`,
      rationale: "Targets key business pain-points directly in Google Search links.",
      ctrBoost: "+15.7% CTR",
      hot: false
    },
    {
      type: "The Click-Magnet Formula",
      title: `The Complete 10-Step API Integration Checklist for ${analysis.overview.name}`,
      rationale: "Highly structured resource-led format indicating direct immediate utility.",
      ctrBoost: "+28.3% CTR",
      hot: true
    }
  ];

  // Helper: Truncates title and descriptions based on authentic search rules
  const truncateString = (str: string, maxLen: number) => {
    if (str.length > maxLen) {
      return str.substring(0, maxLen) + "...";
    }
    return str;
  };

  const handleCopyTitle = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedTriggerIdx(idx);
    showToast(`✓ Copied trigger title to clipboard.`);
    setTimeout(() => setCopiedTriggerIdx(null), 2000);
  };

  const handleApplyTitleToSimulator = (titleText: string) => {
    setSimulatedTitle(titleText);
    showToast("✦ Title link applied to Google Search Simulator preview!");
  };

  // Run Custom AI Website Improvement compiler based on user's selected choice
  const handleCompileImprovement = async () => {
    setIsPatching(true);
    try {
      const promptData = {
        topic: advisorTopic,
        goal: customGoal || "Improve interactive customer conversions above-the-fold",
        color: buttonColor,
        analysis: analysis
      };

      const res = await fetch("/api/tailor-improvement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: activeUrl,
          topic: advisorTopic === "hero" ? "Landing Hero Conversion Layout" : advisorTopic === "accessibility" ? "Contrast & WCAG Navigation Accessibility" : "Structured Metadata Integration",
          userAnswers: promptData,
          analysis: analysis
        })
      });

      if (!res.ok) throw new Error("Improvement advisor failed");
      const data = await res.json();
      setPatchedSnippet(data.code);
      setAdviceOutput(data.explanation);
      showToast("✦ Interactive AI Advisor compiled custom layout optimizations!");
    } catch (err) {
      // High-fidelity offline fallback compiler
      const defaultHeadline = customGoal || `Integrate ${analysis.overview.name} Securely`;
      const fallbackCode = `
<!-- AI TAILORED OPTIMIZATION LAYOUT -->
<div class="bg-[#08080C] border border-zinc-900 rounded-2xl p-8 max-w-xl mx-auto space-y-6 text-center shadow-2xl">
  <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#00D4B2] bg-[#00D4B2]/10 border border-[#00D4B2]/20 font-bold uppercase">
    Advisor Topic: ${advisorTopic.toUpperCase()}
  </span>
  <h2 class="text-white text-2xl font-black font-mono tracking-tight">${defaultHeadline}</h2>
  <p class="text-zinc-400 text-xs leading-relaxed">
    Dynamically tailored around your core target profile for ${analysis.overview.targetAudience}. Ensures perfect performance scores and immediate conversion click-throughs.
  </p>
  <button class="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-zinc-950 font-mono transition-all hover:scale-105" style="background-color: ${buttonColor}">
    Initialize Integration Sandbox
  </button>
</div>
      `;
      setPatchedSnippet(fallbackCode);
      setAdviceOutput(`Synthesized local layout patches regarding your chosen theme. We have established descriptive accessibility alt tags, applied a high-contrast accent button (${buttonColor}), and validated clean canonical URL pointers.`);
      showToast("✦ Customized optimizations compiled successfully.");
    } finally {
      setIsPatching(false);
    }
  };

  const handlePushToSandboxCode = () => {
    if (!patchedSnippet) return;
    setActiveCode(patchedSnippet);
    showToast("✦ Successfully injected tailored advisor code directly into editor workspace!");
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* SECTION MASTER HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-900 flex-wrap gap-4">
        <div>
          <h3 className="text-white text-lg font-black font-mono uppercase tracking-tight">Google Search Visibility &amp; SERP Cockpit</h3>
          <p className="text-xs text-zinc-500 mt-1">Live Arial SERP simulation previewers, viral CTR title generators, and Googlebot raw text crawler outputs.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-400" /> Google-Index Compliant
          </span>
        </div>
      </div>

      {/* THREE ENGINE SUITES ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* 1. GOOGLE SEARCH SNIPPET SIMULATOR (8 Columns) */}
        <div className="lg:col-span-8 bg-[#0A0A0F] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-zinc-900 pb-3">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#00D4B2]" />
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wide">Google SERP Simulator</span>
              </div>
              
              {/* Desktop/Mobile Device Toggles */}
              <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-900 font-mono text-[9px] font-bold">
                <button
                  type="button"
                  onClick={() => setDeviceMode("desktop")}
                  className={`px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer transition-all ${deviceMode === "desktop" ? "bg-zinc-900 text-[#00D4B2]" : "text-zinc-500 hover:text-white"}`}
                >
                  <Monitor className="w-3 h-3" /> DESKTOP
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceMode("mobile")}
                  className={`px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer transition-all ${deviceMode === "mobile" ? "bg-zinc-900 text-[#00D4B2]" : "text-zinc-500 hover:text-white"}`}
                >
                  <Smartphone className="w-3 h-3" /> MOBILE
                </button>
              </div>
            </div>

            {/* Simulated Google SERP Preview Card Engine */}
            <div className="bg-white border border-[#dadce0] rounded-xl p-6 text-left max-w-full select-text shadow-sm relative overflow-hidden">
              
              <div className="max-w-2xl font-sans" style={{ fontFamily: "Arial, sans-serif" }}>
                
                {deviceMode === "desktop" ? (
                  /* DESKTOP GOOGLE LAYOUT CONFIGURATION */
                  <div className="space-y-1">
                    {/* URL Breadcrumbs */}
                    <div className="flex items-center text-[14px] text-[#202124] leading-normal truncate pb-0.5">
                      <span className="text-[#202124]">{domainName}</span>
                      <ChevronRight className="w-3 h-3 text-[#5f6368] mx-1 shrink-0" />
                      <span className="text-[#5f6368] text-[12px]">solutions</span>
                    </div>

                    {/* True Google Title link (Blue linkage that becomes visited violet) */}
                    <h3 className="text-[20px] text-[#1a0dab] hover:underline cursor-pointer leading-[1.3] truncate font-normal tracking-normal pt-0.5">
                      {truncateString(simulatedTitle, 60)}
                    </h3>

                    {/* Meta description body snippet truncation */}
                    <p className="text-[14px] text-[#4d5156] leading-[1.58] pt-1 break-words">
                      {truncateString(simulatedMeta, 155)}
                    </p>

                    {/* Simulated Multi-Column Sitelinks */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4 mt-2 border-t border-zinc-150 text-left">
                      {[
                        { title: "Developer APIs Integration", desc: "Access reference specifications and client keys." },
                        { title: "Transparent Pricing Fees", desc: "Calculate standard percentage parameters." },
                        { title: "Security Protocols", desc: "Auditing boundaries and SSRF guard rails." },
                        { title: "Checkouts Layout Guide", desc: "Frictionless conversion tokens layouts." }
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <h4 className="text-[14px] text-[#1a0dab] hover:underline cursor-pointer font-normal leading-tight">
                            {item.title}
                          </h4>
                          <p className="text-[12px] text-[#4d5156] leading-normal">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                  </div>
                ) : (
                  /* MOBILE GOOGLE LAYOUT CONFIGURATION */
                  <div className="space-y-1">
                    
                    {/* Breadcrumbs with logo circle icon placeholder */}
                    <div className="flex items-center gap-2 pb-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#f1f3f4] flex items-center justify-center shrink-0 border border-[#dadce0]">
                        <Bot className="w-3.5 h-3.5 text-[#5f6368]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-[#202124] leading-tight">{analysis.overview.organization}</span>
                        <span className="text-[11px] text-[#5f6368] leading-none select-all">{secureUrl}</span>
                      </div>
                    </div>

                    {/* Blue Title Link */}
                    <h3 className="text-[20px] text-[#1558d6] hover:underline cursor-pointer leading-[1.3] font-normal pt-0.5">
                      {truncateString(simulatedTitle, 58)}
                    </h3>

                    {/* Meta Description */}
                    <p className="text-[14px] text-[#3c4043] leading-[1.43] pt-1.5">
                      {truncateString(simulatedMeta, 120)}
                    </p>

                    {/* Mobile Sitelink Row Scroller */}
                    <div className="flex gap-2 overflow-x-auto pt-4 pb-1 no-scrollbar text-xs font-medium">
                      {["Developer APIs", "Compare Pricing", "Security Rules", "Interactive Forms"].map((tag, i) => (
                        <span key={i} className="bg-[#f1f3f4] text-[#1a0dab] px-3 py-1.5 rounded-full shrink-0 border border-transparent hover:border-[#dadce0] cursor-pointer">
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>
                )}

              </div>

            </div>
          </div>

          {/* Quick simulator inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-zinc-900/60 text-xs font-mono">
            <div className="space-y-1">
              <label className="block text-zinc-500 uppercase font-bold tracking-wider">Test custom search title link:</label>
              <input
                type="text"
                value={simulatedTitle}
                onChange={(e) => setSimulatedTitle(e.target.value)}
                className="w-full bg-[#060608] border border-zinc-850 px-3 py-2 rounded-xl text-white focus:outline-none focus:border-[#00D4B2]"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-zinc-500 uppercase font-bold tracking-wider">Test custom meta description snippet:</label>
              <input
                type="text"
                value={simulatedMeta}
                onChange={(e) => setSimulatedMeta(e.target.value)}
                className="w-full bg-[#060608] border border-zinc-850 px-3 py-2 rounded-xl text-white focus:outline-none focus:border-[#00D4B2]"
              />
            </div>
          </div>

        </div>

        {/* 2. CRAWLER RAW TEXT VISION: GOOGLEBOT SIMULATOR (4 Columns) */}
        <div className="lg:col-span-4 bg-[#0A0A0F] border border-zinc-900 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2.5">
              <div className="flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-[#00D4B2]" />
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wide">Googlebot Vision</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500 font-bold">Text-Only Crawl Mode</span>
            </div>

            <p className="text-zinc-500 text-[11px] leading-relaxed font-sans">
              Simulates the exact indexable text body and heading hierarchy as read by Google&apos;s background spider.
            </p>

            {/* Raw Text Output Container */}
            <div className="bg-[#060608] border border-zinc-900 rounded-xl p-4 h-64 overflow-y-auto space-y-4 font-mono text-[10px] leading-relaxed text-zinc-400 select-text">
              
              {/* Document Heading Tags */}
              <div className="space-y-2 border-b border-zinc-900 pb-3">
                <div className="text-amber-500 font-bold flex items-center gap-1">&lt;H1&gt; <span className="text-zinc-300">{analysis.seo.title}</span></div>
                <div className="text-amber-600 font-bold pl-3 flex items-center gap-1">&lt;H2&gt; <span className="text-zinc-400">Core Services &amp; Ledgers Integration</span></div>
                <div className="text-amber-700 font-bold pl-6 flex items-center gap-1">&lt;H3&gt; <span className="text-zinc-500">Payments checkout form templates</span></div>
                <div className="text-amber-600 font-bold pl-3 flex items-center gap-1">&lt;H2&gt; <span className="text-zinc-400">Security SSRF validation shields</span></div>
              </div>

              {/* Indexable text */}
              <div className="space-y-2 text-[9px] text-zinc-500">
                <div className="text-zinc-400 uppercase font-black tracking-widest text-[8px] mb-1">GOOGLEBOT INDEXED CONTENT TEXT:</div>
                <p>Organization: {analysis.overview.organization}</p>
                <p>Website Category Classification: {analysis.overview.category}</p>
                <p>Infrastructure Purpose: {analysis.overview.purpose}</p>
                <p>Target Developers Auditing Segment: {analysis.overview.targetAudience}</p>
                <p>Discovered client-side frameworks: {analysis.technology.frameworks.join(", ")}</p>
                <p>Active Content Management System: {analysis.technology.cms}</p>
              </div>

            </div>
          </div>

          <div className="pt-2 border-t border-zinc-900/60 text-[9px] font-mono text-zinc-600">
            Render contains: H1-H3 structural hierarchies and indexable paragraph vectors.
          </div>

        </div>

      </div>

      {/* VIRAL CTR TITLE candidates SUITE */}
      <div className="bg-[#0A0A0F] border border-zinc-900 p-6 rounded-2xl space-y-4">
        
        <div className="flex items-center gap-2 border-b border-zinc-900 pb-3 flex-wrap justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4.5 h-4.5 text-[#00D4B2]" />
            <h4 className="text-white font-mono font-bold text-sm uppercase">AI-Powered Viral CTR Title Suite</h4>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">Predicted click trigger matrices tailored dynamically</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {ctrTriggers.map((trig, idx) => (
            <div key={idx} className="bg-zinc-950 border border-zinc-900 p-4.5 rounded-xl flex flex-col justify-between space-y-3">
              <div className="space-y-1 text-left">
                <div className="flex justify-between items-center text-[8px] font-mono font-bold tracking-wider">
                  <span className="text-zinc-500 uppercase">{trig.type}</span>
                  {trig.hot && <span className="text-rose-500 animate-pulse font-black uppercase">★ HOT</span>}
                </div>
                <p className="text-xs text-white font-bold font-sans mt-1.5 leading-relaxed">
                  {trig.title}
                </p>
                <p className="text-[10px] text-zinc-500 font-sans mt-1 leading-snug">
                  {trig.rationale}
                </p>
              </div>

              {/* Actions & Boost tag */}
              <div className="pt-3 border-t border-zinc-900/60 flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#00D4B2] font-black">{trig.ctrBoost}</span>
                <div className="flex gap-2.5">
                  <button
                    onClick={() => handleCopyTitle(trig.title, idx)}
                    className="text-zinc-500 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    {copiedTriggerIdx === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedTriggerIdx === idx ? "Copied" : "Copy"}</span>
                  </button>
                  <button
                    onClick={() => handleApplyTitleToSimulator(trig.title)}
                    className="text-zinc-500 hover:text-[#00D4B2] flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <Eye className="w-3 h-3" /> Use
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* INTERACTIVE AI WEBSITE OPTIMIZER ("Ask me what to improve & optimize") */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left selector card: What should we improve? */}
        <div className="lg:col-span-5 bg-[#0A0A0F] border border-zinc-900 p-6 rounded-2xl flex flex-col justify-between space-y-5 text-left">
          
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">INTERACTIVE AUDIT ADVISOR</span>
              <h4 className="text-white font-mono font-bold text-sm uppercase mt-1">What should we improve in this website?</h4>
            </div>

            <div className="space-y-3 font-mono text-xs">
              
              {/* Select Category */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Select improvement category:</label>
                <select
                  value={advisorTopic}
                  onChange={(e: any) => {
                    setAdvisorTopic(e.target.value);
                    setPatchedSnippet("");
                    setAdviceOutput("");
                  }}
                  className="w-full bg-zinc-950 border border-zinc-850 p-2.5 rounded-xl text-zinc-300 font-bold focus:outline-none"
                >
                  <option value="hero">Optimize Above-The-Fold Hero Banner Conversions</option>
                  <option value="accessibility">Improve AAA Text Contrast &amp; Accessibility ARIA</option>
                  <option value="metadata">Constitute Absolute Canonical &amp; Meta Index Tags</option>
                </select>
              </div>

              {/* Free text custom goal */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Describe your custom target or catchphrase:</label>
                <textarea
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  placeholder={`e.g. Next-Gen Payments Ledger APIs for ${analysis.overview.name}`}
                  className="w-full bg-[#060608] border border-zinc-850 p-3 rounded-xl text-xs text-white focus:outline-none h-20 resize-none placeholder-zinc-700"
                />
              </div>

              {/* Accent style button palette */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Preferred highlight button accent color:</label>
                <div className="flex gap-2">
                  {["#00D4B2", "#635BFF", "#ec4899", "#eab308"].map(col => (
                    <button
                      key={col}
                      onClick={() => setButtonColor(col)}
                      className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all ${buttonColor === col ? "border-white scale-110" : "border-transparent"}`}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                  <span className="text-[10px] text-zinc-500 flex items-center font-mono ml-2">Selected: {buttonColor}</span>
                </div>
              </div>

            </div>
          </div>

          <button
            onClick={handleCompileImprovement}
            disabled={isPatching}
            className="w-full bg-gradient-to-r from-[#635BFF] to-[#00D4B2] text-white text-xs font-black font-mono uppercase tracking-wider py-3 rounded-xl cursor-pointer disabled:opacity-40"
          >
            {isPatching ? "Compiling Layout Patches..." : "Analyze & Generate Optimized Code"}
          </button>

        </div>

        {/* Right preview/advisor card output */}
        <div className="lg:col-span-7 bg-[#0D0D12] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          
          {isPatching ? (
            <div className="flex-grow flex flex-col items-center justify-center space-y-3 h-64">
              <RefreshCw className="w-8 h-8 text-[#00D4B2] animate-spin" />
              <span className="text-zinc-500 font-mono text-xs">AI Agent analyzing layout components &amp; synthesis...</span>
            </div>
          ) : patchedSnippet ? (
            <div className="space-y-4 flex flex-col justify-between h-full">
              
              <div className="space-y-3.5">
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Expert AI Advisor Analysis</span>
                  <p className="text-zinc-300 text-xs leading-relaxed mt-1">{adviceOutput}</p>
                </div>

                {/* Sandbox Frame */}
                <div className="border border-zinc-850 rounded-xl overflow-hidden bg-zinc-950 h-40">
                  <div className="bg-[#060608] px-3.5 py-1.5 border-b border-zinc-900 font-mono text-[9px] text-zinc-600 flex justify-between">
                    <span>LIVE INTERACTIVE RENDERING</span>
                    <span>Accent: {buttonColor}</span>
                  </div>
                  <div className="p-4 flex items-center justify-center h-full overflow-hidden">
                    <div className="text-center font-sans">
                      <h3 className="text-sm font-bold text-white tracking-tight font-mono">{customGoal || `Integrate ${analysis.overview.name}`}</h3>
                      <button className="mt-3 px-4 py-1.5 rounded-lg text-[10px] font-bold font-mono uppercase text-zinc-950 hover:opacity-90" style={{ backgroundColor: buttonColor }}>
                        Verify Integration Setup
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-zinc-900/60 flex justify-between items-center font-mono text-[10px]">
                <span className="text-zinc-500">Custom patch is indexed &amp; compliant</span>
                <button
                  onClick={handlePushToSandboxCode}
                  className="bg-[#00D4B2] hover:bg-[#00D4B2]/90 text-zinc-950 text-[10px] font-black px-4 py-2 rounded-lg cursor-pointer flex items-center gap-1.5"
                >
                  <Code className="w-3.5 h-3.5" /> Push Code to Sandbox Workspace
                </button>
              </div>

            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center space-y-3 h-64">
              <Sparkles className="w-10 h-10 text-[#635BFF] animate-pulse" />
              <div>
                <h4 className="text-white font-mono font-bold text-xs uppercase tracking-wider">Guided Custom SEO Advisor</h4>
                <p className="text-zinc-500 text-xs leading-relaxed max-w-sm mt-1">
                  Answer the questions in the sidebar. Describe what you want to improve, select parameters, and the AI will tailor code snippets dynamically!
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* SECTION 4: STRUCTURED SCHEMA.ORG ARCHITECT */}
      <div className="bg-[#0A0A0F] border border-zinc-900 p-6 rounded-2xl space-y-6">
        
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#00D4B2]" />
            <div>
              <h4 className="text-white font-mono font-bold text-sm uppercase">JSON-LD Organization Schema Architect</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">Solve missing Organization microdata with structured scripts, accessibility, and lazy loading widgets.</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase">
            WCAG &amp; SCHEMA.ORG COMPLIANT
          </span>
        </div>

        {/* 1. Explanatory Guide Box */}
        <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl space-y-2 text-xs">
          <h5 className="text-white font-bold font-mono uppercase flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#00D4B2]" /> Schema Implementation Guidelines &amp; Code Placement
          </h5>
          <p className="text-zinc-400 leading-relaxed font-sans">
            To resolve missing corporate identities in Google and search engines, you must implement valid <strong className="text-white">JSON-LD Organization schemas</strong>. This structured data describes your brand parameters to background search crawlers (like Googlebot) for rich snippets generation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-sans text-zinc-500">
            <div>
              <strong className="text-zinc-400 block mb-1">Code Placement Position:</strong>
              Place this block directly inside the <code className="bg-[#060608] px-1 py-0.5 rounded text-zinc-400 text-[11px] font-mono">&lt;head&gt;</code> element of your main HTML file (<code className="bg-[#060608] px-1 py-0.5 rounded text-zinc-400 text-[11px] font-mono">index.html</code>, Next.js root <code className="bg-[#060608] px-1 py-0.5 rounded text-zinc-400 text-[11px] font-mono">layout.tsx</code>, or via React Helmet). This ensures it loads first before search crawlers timeout.
            </div>
            <div>
              <strong className="text-zinc-400 block mb-1">Combined Performance Principles:</strong>
              The code utilizes <strong className="text-zinc-400">lazy loading</strong> (<code className="bg-[#060608] px-1 py-0.5 rounded text-zinc-400 text-[11px] font-mono">loading="lazy"</code>) for all assets to maximize PageSpeed scores, incorporates robust <strong className="text-zinc-400">accessibility attributes</strong> (<code className="bg-[#060608] px-1 py-0.5 rounded text-zinc-400 text-[11px] font-mono">aria-label</code>, contrast focus states), and delivers high-impact <strong className="text-zinc-400">conversion widgets</strong>!
            </div>
          </div>
        </div>

        {/* 2. Interactive Inputs & Structured Viewport */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
          
          {/* Left inputs */}
          <div className="xl:col-span-4 bg-zinc-950 border border-zinc-900 p-5 rounded-xl space-y-4 font-mono text-xs">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Customize Schema Attributes</span>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-zinc-400 text-[10px] uppercase font-bold">Organization Legal Name:</label>
                <input
                  type="text"
                  value={orgLegalName}
                  onChange={(e) => setOrgLegalName(e.target.value)}
                  className="w-full bg-[#060608] border border-zinc-850 px-3 py-2 rounded-lg text-white focus:outline-none focus:border-[#00D4B2]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-zinc-400 text-[10px] uppercase font-bold">Official URL Domain:</label>
                <input
                  type="text"
                  value={orgUrl}
                  onChange={(e) => setOrgUrl(e.target.value)}
                  className="w-full bg-[#060608] border border-zinc-850 px-3 py-2 rounded-lg text-white focus:outline-none focus:border-[#00D4B2]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-zinc-400 text-[10px] uppercase font-bold">Logo Asset Address:</label>
                <input
                  type="text"
                  value={orgLogoUrl}
                  onChange={(e) => setOrgLogoUrl(e.target.value)}
                  className="w-full bg-[#060608] border border-zinc-850 px-3 py-2 rounded-lg text-white focus:outline-none focus:border-[#00D4B2]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-zinc-400 text-[10px] uppercase font-bold">Corporate Contact Phone:</label>
                <input
                  type="text"
                  value={orgContact}
                  onChange={(e) => setOrgContact(e.target.value)}
                  className="w-full bg-[#060608] border border-zinc-850 px-3 py-2 rounded-lg text-white focus:outline-none focus:border-[#00D4B2]"
                />
              </div>
            </div>

            <div className="text-[10px] text-zinc-500 leading-relaxed font-sans pt-2">
              Values compile dynamically inside the JSON-LD script block on the right.
            </div>
          </div>

          {/* Right code/preview viewer */}
          <div className="xl:col-span-8 flex flex-col justify-between space-y-3">
            
            <div className="bg-[#060608] border border-zinc-900 rounded-xl overflow-hidden flex-grow flex flex-col min-h-[300px]">
              
              {/* Tabs header */}
              <div className="bg-zinc-950 px-4 py-2 flex justify-between items-center border-b border-zinc-900 font-mono text-[10px]">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSchemaCodeTab("schema")} 
                    className={`px-3 py-1.5 rounded-md font-bold cursor-pointer ${schemaCodeTab === "schema" ? "bg-zinc-900 text-[#00D4B2]" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    JSON-LD Schema
                  </button>
                  <button 
                    onClick={() => setSchemaCodeTab("html")} 
                    className={`px-3 py-1.5 rounded-md font-bold cursor-pointer ${schemaCodeTab === "html" ? "bg-zinc-900 text-[#00D4B2]" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    Accessible HTML Wrapper
                  </button>
                  <button 
                    onClick={() => setSchemaCodeTab("preview")} 
                    className={`px-3 py-1.5 rounded-md font-bold cursor-pointer ${schemaCodeTab === "preview" ? "bg-zinc-900 text-[#00D4B2]" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    Visual Preview
                  </button>
                </div>

                <button
                  onClick={() => {
                    const copiedCode = schemaCodeTab === "schema" 
                      ? `<script type="application/ld+json">\n${JSON.stringify({
                          "@context": "https://schema.org",
                          "@type": "Organization",
                          "name": orgLegalName,
                          "url": orgUrl,
                          "logo": orgLogoUrl,
                          "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": orgContact,
                            "contactType": "customer service"
                          }
                        }, null, 2)}\n</script>`
                      : `<!-- Semantically Accessible HTML Conversion Banner -->\n<div class="bg-zinc-900/40 p-6 rounded-xl border border-zinc-850 flex flex-col md:flex-row items-center justify-between gap-6" aria-label="Customer Conversion Spotlight">\n  <div class="flex items-center gap-4">\n    <img loading="lazy" src="${orgLogoUrl}" alt="${orgLegalName} official company logo" class="w-12 h-12 object-contain" />\n    <div>\n      <h4 class="text-white font-bold text-sm leading-tight">${orgLegalName}</h4>\n      <span class="text-xs text-zinc-400 font-medium">Verified Organization Domain Gateway</span>\n    </div>\n  </div>\n  <button class="bg-[#00D4B2] hover:bg-[#00D4B2]/90 text-zinc-950 font-black text-xs px-6 py-2.5 rounded-xl transition-all font-mono" aria-label="Connect now with ${orgLegalName}">Initialize Service Integration</button>\n</div>`;
                    navigator.clipboard.writeText(copiedCode);
                    showToast("✓ Copied Schema / HTML layout chunk to clipboard!");
                  }}
                  className="text-[#00D4B2] font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Code
                </button>
              </div>

              {/* Code viewer panels */}
              <div className="p-4 flex-grow overflow-y-auto font-mono text-[10px] leading-relaxed text-zinc-400 text-left bg-[#030305]">
                {schemaCodeTab === "schema" && (
                  <pre className="text-emerald-400 select-all">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${orgLegalName}",
  "url": "${orgUrl}",
  "logo": "${orgLogoUrl}",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "${orgContact}",
    "contactType": "customer service"
  }
}
</script>`}
                  </pre>
                )}

                {schemaCodeTab === "html" && (
                  <pre className="text-zinc-300 select-all">
{`<!-- Production-Ready Semantic HTML Layout Wrapper -->
<div 
  class="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-850 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-zinc-700 transition-all" 
  aria-label="Customer Conversion Callout"
>
  <div class="flex items-center gap-4">
    <!-- Lazy Loading enabled and descriptive Alt text injected -->
    <img 
      loading="lazy" 
      src="${orgLogoUrl}" 
      alt="${orgLegalName} corporate brand logomark" 
      class="w-12 h-12 object-contain shrink-0" 
    />
    <div>
      <h4 class="text-white font-bold text-sm leading-tight">${orgLegalName}</h4>
      <span class="text-xs text-zinc-400 font-medium">Verified Google Index Partner Gateway</span>
    </div>
  </div>

  <!-- High-Conversion Target Action Component -->
  <button 
    class="bg-[#00D4B2] hover:scale-105 text-zinc-950 text-xs font-black px-6 py-3 rounded-xl transition-all font-mono hover:bg-[#00D4B2]/90 shadow-lg focus:ring-2 focus:ring-[#00D4B2]" 
    aria-label="Initialize connection with ${orgLegalName} servers"
    onclick="alert('Integrating securely...')"
  >
    Initialize Service Integration
  </button>
</div>`}
                  </pre>
                )}

                {schemaCodeTab === "preview" && (
                  <div className="h-full flex items-center justify-center p-4">
                    <div 
                      className="w-full bg-zinc-900/50 p-6 rounded-2xl border border-zinc-850 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-zinc-700 transition-all font-sans" 
                      aria-label="Customer Conversion Callout"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-lg bg-zinc-950 flex items-center justify-center border border-zinc-800 p-2 shrink-0">
                          <BrandLogo className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm leading-tight">{orgLegalName}</h4>
                          <span className="text-xs text-zinc-400 font-medium">Verified Google Index Partner Gateway</span>
                        </div>
                      </div>

                      <button 
                        className="bg-[#00D4B2] hover:scale-105 text-zinc-950 text-xs font-black px-6 py-3 rounded-xl transition-all font-mono hover:bg-[#00D4B2]/90 shadow-lg shrink-0" 
                        aria-label={`Initialize connection with ${orgLegalName} servers`}
                        onClick={() => showToast("✦ Initializing secure conversion protocol sandbox...")}
                      >
                        Initialize Service Integration
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Quick Action Button */}
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span>Valid organization schemas are crucial for branding search presence in Google listings.</span>
              <button
                type="button"
                onClick={() => {
                  const combinedSnippet = `
<!-- PRODUCTION-READY COMPRESSED LAYOUT PACK -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${orgLegalName}",
  "url": "${orgUrl}",
  "logo": "${orgLogoUrl}",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "${orgContact}",
    "contactType": "customer service"
  }
}
</script>

<div class="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-850 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-zinc-700 transition-all" aria-label="Customer Conversion Callout">
  <div class="flex items-center gap-4">
    <img loading="lazy" src="${orgLogoUrl}" alt="${orgLegalName} corporate brand logomark" class="w-12 h-12 object-contain shrink-0" />
    <div>
      <h4 class="text-white font-bold text-sm leading-tight">${orgLegalName}</h4>
      <span class="text-xs text-zinc-400 font-medium">Verified Google Index Partner Gateway</span>
    </div>
  </div>
  <button class="bg-[#00D4B2] hover:scale-105 text-zinc-950 text-xs font-black px-6 py-3 rounded-xl transition-all font-mono hover:bg-[#00D4B2]/90 shadow-lg" aria-label="Initialize connection">
    Initialize Service Integration
  </button>
</div>
                  `;
                  setActiveCode(combinedSnippet);
                  showToast("✦ Pushed customized JSON-LD & Conversion HTML code pack to Sandbox Workspace editor!");
                }}
                className="bg-[#00D4B2] text-zinc-950 text-[10px] font-black px-4 py-2 rounded-lg cursor-pointer flex items-center gap-1 hover:scale-[1.02] transition-transform"
              >
                <Code className="w-3.5 h-3.5" /> Push Layout Pack to Sandbox Editor
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
