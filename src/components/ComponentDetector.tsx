import React, { useState } from "react";
import { Cpu, Eye, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { WebsiteAnalysis } from "../types";

interface ComponentDetectorProps {
  analysis: WebsiteAnalysis;
}

interface ComponentItem {
  id: string;
  name: string;
  location: string;
  classes: string;
  accessibility: {
    keyboardFocus: boolean;
    screenReader: boolean;
    contrastCompliant: boolean;
  };
  htmlOutline: string;
  recs: string;
}

export default function ComponentDetector({ analysis }: ComponentDetectorProps) {
  const [selectedCompId, setSelectedCompId] = useState<string>("c-1");

  const componentsList: ComponentItem[] = [
    {
      id: "c-1",
      name: "Interactive API Sandbox Console",
      location: "Homepage (/) · Section 3 Layout",
      classes: "flex flex-col bg-[#0A0A14] rounded-2xl border border-zinc-850 p-6 shadow-2xl",
      accessibility: {
        keyboardFocus: true,
        screenReader: true,
        contrastCompliant: true
      },
      htmlOutline: `<div class="api-console-wrapper flex flex-col bg-[#0A0A14] rounded-2xl border border-zinc-850 p-6">\n  <div class="console-tabs-header flex items-center justify-between pb-3 border-b">\n    <span class="text-[10px] font-mono text-zinc-400">api/payment_intents.ts</span>\n    <button class="copy-btn shrink-0 hover:text-white" aria-label="Copy CodeSnippet">Copy</button>\n  </div>\n  <pre class="console-code text-xs font-mono text-[#00D4B2] mt-3">await stripe.paymentIntents.create({...})</pre>\n</div>`,
      recs: "Ensure any code block tabs are fully focus-visible on sequential keyboard Tab events. Ground tooltips on action anchors."
    },
    {
      id: "c-2",
      name: "Global Search Console Dialog",
      location: "Header Navigation · Global Overlay",
      classes: "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4",
      accessibility: {
        keyboardFocus: true,
        screenReader: false,
        contrastCompliant: true
      },
      htmlOutline: `<dialog class="search-modal fixed inset-0 bg-black/70 z-50 flex items-center justify-center" aria-labelledby="search-hdr">\n  <div class="search-body bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-lg">\n    <input type="search" id="search-hdr" placeholder="Search resources, API logs..." class="w-full bg-transparent text-white border-b border-zinc-800 py-3" />\n  </div>\n</dialog>`,
      recs: "Add clear aria-describedby descriptors on input frames. Bind escape key press trigger to automatically close active search dialogs."
    },
    {
      id: "c-3",
      name: "ESG Climate Contributions Widget",
      location: "Marketing Page (/climate) · Action Panel",
      classes: "max-w-md bg-[#0A0A0F] border border-[#00D4B2]/20 rounded-2xl p-6 shadow-xl",
      accessibility: {
        keyboardFocus: true,
        screenReader: true,
        contrastCompliant: false
      },
      htmlOutline: `<div class="climate-contribution bg-[#0A0A0F] p-6 rounded-2xl border border-[#00D4B2]/20">\n  <span class="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Environmental Pledge Contribution</span>\n  <input type="range" class="contribution-slider accent-[#00D4B2] w-full mt-4" aria-label="Carbon Removal Contribution Slider" />\n  <div class="metrics mt-4 grid grid-cols-2 gap-4">...</div>\n</div>`,
      recs: "The milestone photo inside the environmental metrics panel violates accessibility constraints. Supply alternative descriptive text alt labels immediately."
    },
    {
      id: "c-4",
      name: "Product Pricing Segmented Matrix",
      location: "Billing Portal (/billing) · Container 2",
      classes: "grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12 items-stretch",
      accessibility: {
        keyboardFocus: false,
        screenReader: true,
        contrastCompliant: true
      },
      htmlOutline: `<div class="pricing-matrix grid grid-cols-1 lg:grid-cols-3 gap-6">\n  <div class="tier-card bg-[#0A0A0F] border rounded-xl p-5">\n    <span class="text-zinc-500 font-bold font-mono">Starter Tier</span>\n    <h3 class="text-2xl font-black mt-2 font-mono">Free trial</h3>\n  </div>\n</div>`,
      recs: "Bind functional keyboard selectors on payment tier togglers to ensure inclusive experiences for non-pointer interactive users."
    }
  ];

  const activeComp = componentsList.find(c => c.id === selectedCompId) || componentsList[0];

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
        <div>
          <h3 className="text-white text-lg font-black font-mono uppercase tracking-tight">Component Detector Workspace</h3>
          <p className="text-xs text-zinc-500 mt-1">Explore and audit individual UI modules crawled on the public target endpoint.</p>
        </div>
        <span className="text-[9px] font-mono text-[#00D4B2] font-black tracking-widest bg-[#00D4B2]/10 border border-[#00D4B2]/20 px-2 py-0.5 rounded">
          {componentsList.length} SCHEMAS DETECTED
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: List of Detected Components */}
        <div className="xl:col-span-5 bg-[#0A0A0F] border border-zinc-900 p-5 rounded-2xl space-y-4">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Classified Page Components</span>
          <div className="space-y-2.5">
            {componentsList.map(comp => {
              const isSelected = comp.id === selectedCompId;
              const hasA11yIssues = !Object.values(comp.accessibility).every(Boolean);

              return (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => setSelectedCompId(comp.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all border block cursor-pointer ${
                    isSelected
                      ? "bg-zinc-900/60 border-[#00D4B2]"
                      : "bg-zinc-950/40 border-zinc-900 hover:border-zinc-850"
                  }`}
                >
                  <div className="flex justify-between items-center gap-2">
                    <span className={`text-xs font-black truncate block ${isSelected ? "text-[#00D4B2]" : "text-zinc-200"}`}>
                      {comp.name}
                    </span>
                    {hasA11yIssues ? (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono block mt-1">{comp.location}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code Blueprints & Accessibility Matrix */}
        <div className="xl:col-span-7 bg-[#0A0A0F] border border-zinc-900 p-5 rounded-2xl flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">X-Ray Blueprint Audit</span>
            
            <div className="space-y-1">
              <h4 className="text-white font-bold text-xs">{activeComp.name}</h4>
              <span className="text-[9px] text-zinc-500 font-mono select-all truncate block">CSS structure: {activeComp.classes}</span>
            </div>

            {/* Accessibility Indicators */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Keyboard navigable focus", val: activeComp.accessibility.keyboardFocus },
                { label: "ScreenReader accessible labels", val: activeComp.accessibility.screenReader },
                { label: "AAA Color contrast compliant", val: activeComp.accessibility.contrastCompliant }
              ].map((item, i) => (
                <div key={i} className="bg-zinc-950/60 p-3 border border-zinc-900 rounded-xl flex flex-col justify-between text-center min-h-[60px]">
                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wide leading-tight">{item.label}</span>
                  <div className="mt-1">
                    {item.val ? (
                      <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">Satisfied</span>
                    ) : (
                      <span className="text-[9px] font-mono text-amber-500 font-bold uppercase">Violation</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* DOM skeleton outline */}
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black block">DOM Skeleton Blueprint</span>
              <pre className="bg-zinc-950 border border-zinc-900 text-[10px] font-mono text-zinc-400 p-4 rounded-xl overflow-x-auto h-40 select-all leading-normal">
                {activeComp.htmlOutline}
              </pre>
            </div>
          </div>

          {/* AI recommendations */}
          <div className="bg-[#635BFF]/5 p-3.5 rounded-xl border border-[#635BFF]/20 flex gap-2.5 items-start">
            <Sparkles className="w-5 h-5 text-[#00D4B2] shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] font-mono text-[#00D4B2] uppercase font-black block mb-0.5">Component Agent recommendation</span>
              <p className="text-zinc-400 text-[10px] leading-relaxed">{activeComp.recs}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
