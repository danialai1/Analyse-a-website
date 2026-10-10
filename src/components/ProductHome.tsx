import React, { useState } from "react";
import {
  Globe, Shield, Cpu, RefreshCw, Layers, FileText, Code, CheckCircle,
  AlertTriangle, Play, HelpCircle, ArrowRight, Bot, Zap, Mail, Send, Check
} from "lucide-react";
import BrandLogo from "./BrandLogo";

interface ProductHomeProps {
  onNavigate: (tab: string) => void;
  onShowToast: (msg: string) => void;
}

export default function ProductHome({ onNavigate, onShowToast }: ProductHomeProps) {
  // Interactive Agent Selector State
  const [activeAgentId, setActiveAgentId] = useState<string>("master");

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Feedback Form State
  const [feedbackUseCases, setFeedbackUseCases] = useState<string[]>([]);
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const agents = [
    {
      id: "master",
      name: "Master Coordinator Agent",
      role: "Central Intelligence & Orchestration",
      description: "Aggregates diagnostics from specialized sub-agents. Runs semantic synthesis pipelines to classify project structures and evaluate evidence-based confidence indexes.",
      capabilities: ["Synthesizes multi-agent reports", "Generates cohesive AI summary replies", "Decides evidence-based taxonomy ratings"]
    },
    {
      id: "crawler",
      name: "SSRF-Safe Crawler Agent",
      role: "Structure Mapping & Pathing",
      description: "Crawls domain directories safely within virtual network boundary limits. Resolves sitemaps, discovers active endpoints, and inventories path node structures.",
      capabilities: ["SSRF containment protocol", "Discovers hidden pages & nested paths", "Builds topological sitemap indexes"]
    },
    {
      id: "design",
      name: "Optical Design Agent",
      role: "Visual Aesthetics & Accessibility Analysis",
      description: "Scans DOM elements to extract active typographical pairing models, global color distribution percentages, and verifies contrast ratios for AAA compliance.",
      capabilities: ["Extracts CSS visual tokens", "Validates WCAG contrast metrics", "Identifies brand palette distribution"]
    },
    {
      id: "component",
      name: "X-Ray Component Agent",
      role: "DOM Structural Classification",
      description: "Deconstructs raw HTML into modular Tailwind & CSS components. Provides structural blueprints, absolute layout redlines, and accessibility advice.",
      capabilities: ["Deconstructs compiled DOM blocks", "Identifies layouts, cards, and heroes", "Suggests standard layout refinements"]
    },
    {
      id: "seo",
      name: "Semantic SEO Agent",
      role: "Metadata Audit & Index Optimization",
      description: "Audits site metadata structures, validates canonical tags, analyzes keywords usage density, and drafts schema.org JSON-LD microdata models.",
      capabilities: ["Analyzes tag-density matrices", "Compiles safe SEO fixes atomically", "Drafts search-ready JSON-LD schemas"]
    },
    {
      id: "tech",
      name: "Stack Technology Agent",
      role: "Dependency & Infrastructure Detection",
      description: "Sniffs network packets, header variables, and tracking scripts to discover background frameworks, active CDNs, and transactional platforms.",
      capabilities: ["Identifies frontend frameworks", "Detects payment & marketing APIs", "Sniffs CDN caching configurations"]
    }
  ];

  const handleToggleUseCase = (useCase: string) => {
    if (feedbackUseCases.includes(useCase)) {
      setFeedbackUseCases(feedbackUseCases.filter(u => u !== useCase));
    } else {
      setFeedbackUseCases([...feedbackUseCases, useCase]);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackEmail.trim()) {
      onShowToast("Please enter a valid email address.");
      return;
    }
    setIsSubmittingFeedback(true);
    setTimeout(() => {
      setIsSubmittingFeedback(false);
      setFeedbackSubmitted(true);
      onShowToast("✦ Feedback successfully received! Core agents are retraining.");
    }, 1200);
  };

  return (
    <div className="space-y-16 animate-fade-in text-left pb-16">
      
      {/* 1. HERO SPOTLIGHT & CINEMATIC DISPLAY */}
      <section className="relative overflow-hidden rounded-3xl bg-[#0A0A0F] border border-zinc-900/80 p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 text-[10px] font-bold text-zinc-400 font-mono tracking-widest uppercase">
              <div className="relative w-5 h-5 flex items-center justify-center">
                <BrandLogo className="w-5 h-5" />
                <img 
                  src="png-clipart-logo-online-and-offline-graphic-designer-architecture-logo-design-web-design-company.png" 
                  alt="Logo" 
                  className="w-5 h-5 absolute inset-0 object-contain opacity-0 transition-opacity" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                  onLoad={(e) => { e.currentTarget.className = "w-5 h-5 absolute inset-0 object-contain opacity-100 rounded bg-[#0A0A0F]"; }}
                />
              </div>
              <span>Spatial Web Intelligence Engine</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase font-mono text-wrap:balance">
              Reverse-engineer any site.<br />
              <span className="bg-gradient-to-r from-[#635BFF] to-[#00D4B2] bg-clip-text text-transparent">
                Instantly audit &amp; fix code.
              </span>
            </h2>
            
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-xl">
              WebX-Ray AI is a high-fidelity Spatial Web Intelligence OS. It coordinates specialized autonomous agents to map directories, extract styling palettes, identify DOM components, and deliver atomic code fixes and fully customized Tailwind CSS sandbox redesigns.
            </p>

            {/* Zero-Pill Metadata Indicators */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[11px] font-mono text-zinc-500 pt-2">
              <span className="text-[#00D4B2] font-semibold">6 Native Scanners</span>
              <span>·</span>
              <span>Isometric 3D Layers Map</span>
              <span>·</span>
              <span>Atomic Code Fixes</span>
              <span>·</span>
              <span>Responsive Tailwind CSS IDE</span>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => {
                  onNavigate("overview");
                  onShowToast("Welcome to the WebX-Ray Console!");
                }}
                className="bg-gradient-to-r from-[#635BFF] to-[#00D4B2] text-white text-xs font-bold font-mono uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg hover:opacity-95 cursor-pointer flex items-center gap-2"
              >
                Explore Console <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  onNavigate("3d-graph");
                  onShowToast("Initiating 3D Layer Spatial matrix...");
                }}
                className="bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white border border-zinc-850 text-xs font-bold font-mono uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer"
              >
                Launch 3D Space
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group bg-zinc-950">
              {/* Actual Generated Image Asset from Phase 1 */}
              <img
                src="/src/assets/images/product_hero_scanning_1790706481336.jpg"
                alt="WebX-Ray AI Diagnostic Scanning Matrix Rendering"
                className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#00D4B2] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 animate-pulse" /> Active X-Ray Simulation
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400">Model: Gemini 1.5 Pro</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 2. THE MULTI-AGENT ORCHESTRATION ARCHITECTURE (INTERACTIVE BLUEPRINT) */}
      <section className="space-y-6">
        <div className="text-center md:text-left">
          <h3 className="text-white text-xl md:text-2xl font-black font-mono uppercase tracking-tight">
            Autonomous Multi-Agent Swarm
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Our engine deploys six highly specialized backend neural agents to disassemble web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Agent selectors list */}
          <div className="lg:col-span-5 space-y-2">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setActiveAgentId(agent.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer font-mono ${
                  activeAgentId === agent.id
                    ? "bg-zinc-900 text-[#00D4B2] border-zinc-850"
                    : "bg-transparent text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-zinc-900/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">{agent.name}</span>
                  <Cpu className={`w-4 h-4 shrink-0 ${activeAgentId === agent.id ? "text-[#00D4B2]" : "text-zinc-600"}`} />
                </div>
                <div className="text-[10px] text-zinc-500 font-sans mt-0.5">{agent.role}</div>
              </button>
            ))}
          </div>

          {/* Active Agent Blueprints Detail Card */}
          <div className="lg:col-span-7 bg-[#0A0A0F] border border-zinc-900 rounded-2xl p-6.5 min-h-[290px] flex flex-col justify-between">
            {(() => {
              const selectedAgent = agents.find(a => a.id === activeAgentId) || agents[0];
              return (
                <div className="space-y-6">
                  <div className="flex items-start justify-between pb-3 border-b border-zinc-900">
                    <div>
                      <span className="text-[10px] font-mono text-[#00D4B2] font-bold uppercase tracking-widest block">
                        NEURAL NODE: {selectedAgent.id.toUpperCase()}_AGENT
                      </span>
                      <h4 className="text-white font-bold text-base mt-1 font-mono uppercase tracking-tight">
                        {selectedAgent.name}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 font-semibold">{selectedAgent.role}</span>
                  </div>

                  <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                    {selectedAgent.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold block">
                      Target Core Capabilities
                    </span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-zinc-300 font-sans">
                      {selectedAgent.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#00D4B2] shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE WORKSPACES COMPREHENSIVE ROADMAP (BENTO GRID) */}
      <section className="space-y-6">
        <div>
          <h3 className="text-white text-xl md:text-2xl font-black font-mono uppercase tracking-tight">
            Integrated Web Intelligence Suites
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Explore the specialized digital workspaces compiled directly into your dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: 3D Spatial Layers */}
          <div className="bg-[#0A0A0F] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-800 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#635BFF]/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-[#635BFF]" />
              </div>
              <h4 className="text-white font-bold text-sm font-mono uppercase tracking-tight">
                3D Isometric Spatial Maps
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Render compiled pages, components, links, and styling parameters as fully interactive isometric stack layers to visually browse topological dependencies.
              </p>
            </div>
            <button
              onClick={() => onNavigate("3d-graph")}
              className="text-xs font-mono font-bold text-[#00D4B2] hover:underline flex items-center gap-1.5 mt-4 text-left cursor-pointer"
            >
              Open 3D Space <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Atomic AutoFix */}
          <div className="bg-[#0A0A0F] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-800 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00D4B2]/10 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-[#00D4B2]" />
              </div>
              <h4 className="text-white font-bold text-sm font-mono uppercase tracking-tight">
                Atomic AutoFix Pipelines
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Scan layouts for missing alt tags, header hierarchies, accessibility issues, and trigger step-by-step automated code repairs complete with rollbacks.
              </p>
            </div>
            <button
              onClick={() => onNavigate("autofix")}
              className="text-xs font-mono font-bold text-[#00D4B2] hover:underline flex items-center gap-1.5 mt-4 text-left cursor-pointer"
            >
              Open AutoFix Studio <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Code Redesign IDE */}
          <div className="bg-[#0A0A0F] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-800 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Code className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="text-white font-bold text-sm font-mono uppercase tracking-tight">
                Generative Code Sandboxes
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Generate high-quality React, Next.js, and raw HTML templates from layout prompts, then review live renders instantly inside our responsive viewport frame.
              </p>
            </div>
            <button
              onClick={() => onNavigate("code")}
              className="text-xs font-mono font-bold text-[#00D4B2] hover:underline flex items-center gap-1.5 mt-4 text-left cursor-pointer"
            >
              Open Code Space <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. STEP-BY-STEP QUICK START GUIDE */}
      <section className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6.5 md:p-8 space-y-8">
        <div className="text-center md:text-left">
          <h3 className="text-white text-xl md:text-2xl font-black font-mono uppercase tracking-tight">
            How WebX-Ray AI Works
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Follow our atomic 4-step workflow to reverse-engineer and repair digital layouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
          {[
            {
              step: "01",
              title: "Input Target Domain",
              desc: "Enter any active web address into the main URL search console. Our SSRF-safe crawling agent mapping processes trigger instantly."
            },
            {
              step: "02",
              title: "Evaluate Blueprints",
              desc: "Inspect active typographical pairing tokens, global contrast metrics, image aspect ratios, and full technological stack compositions."
            },
            {
              step: "03",
              title: "Apply Atomic Fixes",
              desc: "Browse flagged WCAG accessibility items or SEO missing parameters, then authorize automated agent repairs inside the AutoFix studio."
            },
            {
              step: "04",
              title: "Deploy Rebuilt Code",
              desc: "Use our interactive code IDE to generate updated layouts, preview edits in real time across mobile/desktop, and download exports."
            }
          ].map((item, i) => (
            <div key={i} className="space-y-3 relative">
              <div className="text-2xl font-black font-mono text-[#00D4B2]/30">{item.step}</div>
              <h4 className="text-white font-bold text-sm font-mono uppercase tracking-tight">{item.title}</h4>
              <p className="text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE FAQ & DIAGNOSTICS CENTER */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: FAQ Accordion */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h3 className="text-white text-lg md:text-xl font-black font-mono uppercase tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Common inquiries regarding reverse-engineering bounds and model capabilities.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Is crawling secure and compliant with local servers constraints?",
                a: "Yes, absolutely. The SSRF-Safe Crawler Agent contains automated sandbox limits to prevent intranet intrusion, respects robots.txt files, and avoids overloading origin networks with measured throttle constraints."
              },
              {
                q: "Can I export the compiled code and audit reports?",
                a: "Yes! Every single analyzed report can be exported atomically to raw JSON, CSV, PDF, or HTML files directly inside the Overview panel. Re-engineered sandbox layouts can be copied or downloaded."
              },
              {
                q: "How does the Atomic AutoFix engine verify generated repairs?",
                a: "After an agent drafts an update, it is validated within an offline DOM compiler to ensure WCAG AA contrast rules are met, proper alt configurations exist, and layout integrity isn't compromised."
              },
              {
                q: "Can WebX-Ray reverse-engineer private SaaS admin boards?",
                a: "WebX-Ray requires public endpoint availability to perform secure scans. For private administrative dashboard layouts, we provide the 'Redesign Prompts' tool to design mockup systems manually."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-[#0A0A0F] border border-zinc-900 rounded-xl overflow-hidden transition-all">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 flex justify-between items-center text-xs font-mono font-bold text-zinc-300 hover:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <HelpCircle className={`w-4 h-4 text-zinc-500 transition-transform ${openFaq === idx ? "rotate-180 text-[#00D4B2]" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-zinc-400 leading-relaxed font-sans border-t border-zinc-900/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Feedback & Survey Form */}
        <div className="lg:col-span-5 bg-[#0A0A0F] border border-zinc-900 rounded-2xl p-6.5 space-y-5">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-[#00D4B2] font-bold uppercase tracking-widest block">
              COOPERATION CENTER
            </span>
            <h3 className="text-white text-md font-bold font-mono uppercase tracking-tight">
              Train Our Sub-Agents
            </h3>
            <p className="text-xs text-zinc-500">
              Select your priority capabilities to train neural filters and customize reports.
            </p>
          </div>

          {feedbackSubmitted ? (
            <div className="bg-[#00D4B2]/10 border border-[#00D4B2]/20 p-6 rounded-xl text-center space-y-3 animate-scale-up">
              <Check className="w-8 h-8 text-[#00D4B2] mx-auto" />
              <h4 className="text-white font-mono font-bold text-xs uppercase tracking-wider">Parameters Stored</h4>
              <p className="text-zinc-400 text-xs">
                Feedback stored in active vector index context. Thank you for contributing to WebX-Ray OS optimization.
              </p>
              <button
                onClick={() => setFeedbackSubmitted(false)}
                className="text-[10px] font-mono text-[#00D4B2] hover:underline uppercase block mx-auto pt-2 cursor-pointer"
              >
                Submit New Report
              </button>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs">
              
              {/* Use case toggle list */}
              <div className="space-y-2">
                <label className="text-zinc-400 font-bold font-mono block">Your Primary Intent:</label>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  {["SEO Auditing", "Reverse-Eng", "Tailwind Code", "Contrast Check"].map((uCase) => (
                    <button
                      key={uCase}
                      type="button"
                      onClick={() => handleToggleUseCase(uCase)}
                      className={`px-3 py-2 rounded-lg border text-left cursor-pointer truncate ${
                        feedbackUseCases.includes(uCase)
                          ? "bg-[#00D4B2]/10 border-[#00D4B2]/30 text-[#00D4B2] font-bold"
                          : "bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-400"
                      }`}
                    >
                      {uCase}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Email */}
              <div className="space-y-1">
                <label className="text-zinc-400 font-bold font-mono block">Registered Email:</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={feedbackEmail}
                    onChange={(e) => setFeedbackEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-xl pl-9.5 pr-4 py-3 text-zinc-300 placeholder-zinc-650 focus:outline-none focus:border-[#00D4B2] font-mono text-xs"
                  />
                </div>
              </div>

              {/* Feedback Textarea */}
              <div className="space-y-1">
                <label className="text-zinc-400 font-bold font-mono block">Custom Optimization Directives:</label>
                <textarea
                  rows={3}
                  placeholder="E.g. increase focus check parameters on responsive CSS grids..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-3.5 py-2.5 text-zinc-300 placeholder-zinc-650 focus:outline-none focus:border-[#00D4B2] font-mono text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingFeedback}
                className="w-full bg-gradient-to-r from-[#635BFF] to-[#00D4B2] text-white text-xs font-bold font-mono uppercase tracking-wider py-3 rounded-xl shadow-lg hover:opacity-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" /> {isSubmittingFeedback ? "Injecting Index..." : "Transmit Directives"}
              </button>

            </form>
          )}

        </div>

      </section>

    </div>
  );
}
