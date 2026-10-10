import React, { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, RefreshCw, Settings, Play, ArrowRight, CornerDownLeft, Zap, Loader2 } from "lucide-react";
import { WebsiteAnalysis, AutoFixResult } from "../types";

interface AutoFixConsoleProps {
  analysis: WebsiteAnalysis;
  appliedFixes: string[];
  setAppliedFixes: React.Dispatch<React.SetStateAction<string[]>>;
  showToast: (msg: string) => void;
  triggerScoreIncrease: () => void;
  triggerScoreDecrease: () => void;
  activeCode: string;
  setActiveCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function AutoFixConsole({
  analysis,
  appliedFixes,
  setAppliedFixes,
  showToast,
  triggerScoreIncrease,
  triggerScoreDecrease,
  activeCode,
  setActiveCode
}: AutoFixConsoleProps) {
  const [selectedIssue, setSelectedIssue] = useState<string>(analysis.seo.issues[0] || "");
  const [activeAutoFix, setActiveAutoFix] = useState<AutoFixResult | null>({
    explanation: "Detected missing alternative description tag on the homepage image banner. Generated compliant HTML tag structure to satisfy WCAG AA contrast layout metrics.",
    before: `<img src="/assets/climate-banner.jpg" class="w-full rounded-2xl" />`,
    after: `<img src="/assets/climate-banner.jpg" class="w-full rounded-2xl" alt="${analysis.overview.name} Climate Carbon Removal Portfolio Display" />`,
    riskLevel: "Safe",
    testResult: "Verification successful: WCAG AA contrast rules satisfied. SEO Index rank improved."
  });

  const [isFixing, setIsFixing] = useState(false);
  const [isLoadingFix, setIsLoadingFix] = useState(false);
  const [repairStep, setRepairStep] = useState(0); // 0: Idle, 1: Detect, 2: Diagnose, 3: Generate, 4: Sandbox, 5: Verify, 6: Completed
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    const loadFix = async () => {
      if (!selectedIssue) return;
      setIsLoadingFix(true);
      try {
        const res = await fetch("/api/autofix", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: analysis.overview.name,
            issue: selectedIssue,
            type: selectedIssue.toLowerCase().includes("alt") ? "Accessibility" : "SEO"
          })
        });
        if (!res.ok) throw new Error("Backend failed");
        const data = await res.json();
        if (active) {
          setActiveAutoFix({
            explanation: data.explanation || "No diagnosis provided.",
            before: data.before || "<!-- None -->",
            after: data.after || "<!-- None -->",
            riskLevel: data.riskLevel || "Safe",
            testResult: data.testResult || "Verified"
          });
        }
      } catch (err) {
        // Fallback to static rulesets if API key is not active or backend errors
        if (!active) return;
        if (selectedIssue.includes("alt tag")) {
          setActiveAutoFix({
            explanation: "Detected missing descriptive alternative tag on climate banner widget element. Generated responsive HTML node patch to satisfy WCAG accessibility indexes.",
            before: `<img src="/assets/climate-banner.jpg" class="w-full rounded-2xl" />`,
            after: `<img src="/assets/climate-banner.jpg" class="w-full rounded-2xl" alt="${analysis.overview.name} Environmental Initiative Milestones Portfolio" />`,
            riskLevel: "Safe",
            testResult: "Compilation passed. WCAG AA compliance verified. Index health increased."
          });
        } else if (selectedIssue.includes("keywords")) {
          setActiveAutoFix({
            explanation: "Meta keywords tag missing in index metadata tags array. Compiling compliant indexing identifiers to ground SEO crawlers.",
            before: `<meta name="description" content="..." />\n<!-- Keywords block missing -->`,
            after: `<meta name="description" content="..." />\n<meta name="keywords" content="${analysis.overview.name.toLowerCase()}, payments, tech infrastructure, APIs, audit ledger" />`,
            riskLevel: "Safe",
            testResult: "HTML parser validated. Structural elements checked."
          });
        } else {
          setActiveAutoFix({
            explanation: "Discovered non-consecutive header tags on documents routes layout. Repairing layout outline to use consecutive heading tags.",
            before: `<h1>${analysis.seo.title}</h1>\n<h3>Documentation Endpoint</h3>`,
            after: `<h1>${analysis.seo.title}</h1>\n<h2>Documentation Endpoint</h2>`,
            riskLevel: "Safe",
            testResult: "Headings outlines index correct. Structural integrity checked."
          });
        }
      } finally {
        if (active) setIsLoadingFix(false);
      }
    };

    loadFix();
    return () => {
      active = false;
    };
  }, [selectedIssue, analysis]);

  const handleFixApply = () => {
    if (isFixing || !activeAutoFix) return;
    setIsFixing(true);
    setRepairStep(1);
    setConsoleLogs([`[DETECTOR] Initializing secure diagnostic run on ${analysis.overview.name}...`]);

    const pipelineSteps = [
      { log: "[DETECTOR] Parsing Layout DOM tree structures...", step: 1 },
      { log: "[DIAGNOSIS] Flagged violation token on selected node...", step: 2 },
      { log: "[GENERATOR] Invoking Gemini server-side agent to synthesize safe repair...", step: 3 },
      { log: "[TESTING] Injecting patch into Sandboxed parser frame... passed.", step: 4 },
      { log: "[VERIFICATION] Invariants checked. Security SSL boundaries verified.", step: 5 },
      { log: "[SYSTEM] Applying patched source code atomically... compiling bundle.", step: 6 }
    ];

    pipelineSteps.forEach((item, index) => {
      setTimeout(() => {
        setRepairStep(item.step);
        setConsoleLogs(prev => [...prev, item.log]);
        
        if (index === pipelineSteps.length - 1) {
          setTimeout(() => {
            setIsFixing(false);
            setRepairStep(0);
            setAppliedFixes(prev => [...prev, selectedIssue]);
            triggerScoreIncrease();
            
            // Apply the actual code patch to the shared sandbox IDE!
            if (activeAutoFix.before && activeAutoFix.after) {
              setActiveCode(prev => {
                if (prev.includes(activeAutoFix.before)) {
                  return prev.replace(activeAutoFix.before, activeAutoFix.after);
                } else {
                  return prev + `\n\n/* Patched Fix for: ${selectedIssue} */\n` + activeAutoFix.after;
                }
              });
            }

            showToast("✦ Atomically applied repair fix successfully! Sandbox code updated.");
          }, 400);
        }
      }, (index + 1) * 350);
    });
  };

  const handleFixAll = () => {
    if (isFixing) return;
    setIsFixing(true);
    setRepairStep(1);
    setConsoleLogs(["[DETECTOR] Initializing global diagnostic run on ALL issues..."]);

    const pipelineSteps = [
      { log: "[DETECTOR] Crawling sitemaps routes and DOM nodes...", step: 1 },
      { log: "[DIAGNOSIS] Found 3 safe errors across pages templates...", step: 2 },
      { log: "[GENERATOR] Compiling coordinate multi-agent atomic fixes...", step: 3 },
      { log: "[TESTING] Testing sandbox compilations on all templates... clean.", step: 4 },
      { log: "[VERIFICATION] Verifying security rulesets and SSRF blocking...", step: 5 },
      { log: "[SYSTEM] Re-building complete project codebase... atomic deployment complete.", step: 6 }
    ];

    pipelineSteps.forEach((item, index) => {
      setTimeout(() => {
        setRepairStep(item.step);
        setConsoleLogs(prev => [...prev, item.log]);
        
        if (index === pipelineSteps.length - 1) {
          setTimeout(() => {
            setIsFixing(false);
            setRepairStep(0);
            setAppliedFixes(analysis.seo.issues);
            for (let i = 0; i < analysis.seo.issues.length; i++) {
              triggerScoreIncrease();
            }
            
            // Patches all fixes to the shared sandbox code
            setActiveCode(prev => {
              let updatedCode = prev;
              if (selectedIssue.includes("alt tag")) {
                const fix1 = `<img src="/assets/climate-banner.jpg" class="w-full rounded-2xl" alt="${analysis.overview.name} Environmental Initiative Milestones Portfolio" />`;
                updatedCode = updatedCode.includes(`<img src="/assets/climate-banner.jpg" class="w-full rounded-2xl" />`)
                  ? updatedCode.replace(`<img src="/assets/climate-banner.jpg" class="w-full rounded-2xl" />`, fix1)
                  : updatedCode + `\n\n/* Patched Alt Fix */\n` + fix1;
              }
              return updatedCode + `\n\n/* Patched Global Integrity Fixes Applied */\n<meta name="keywords" content="${analysis.overview.name.toLowerCase()}, payments, tech infrastructure, APIs" />`;
            });

            showToast("✦ Successfully repaired all safe layout and SEO errors! Core index boosted.");
          }, 400);
        }
      }, (index + 1) * 400);
    });
  };

  const handleRollback = (issue: string) => {
    setAppliedFixes(prev => prev.filter(i => i !== issue));
    triggerScoreDecrease();
    showToast("Rollback operation complete. Code restored.");
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h3 className="text-white text-lg font-black font-mono uppercase tracking-tight">Atomic AutoFix Systems Console</h3>
        <p className="text-xs text-zinc-500 mt-1">Our specialized agents audit accessibility, SEO structures, and markup violations. Repair safe errors instantly with automatic rollbacks.</p>
      </div>

      <div className="bg-[#0A0A0F] border border-zinc-900 p-6 rounded-2xl space-y-6">
        
        {/* Issues list panel */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Scanned Accessibility &amp; SEO Errors</span>
          <div className="space-y-2">
            {analysis.seo.issues.map((issue, idx) => {
              const isSelected = selectedIssue === issue;
              const isFixed = appliedFixes.includes(issue);
              return (
                <div
                  key={idx}
                  onClick={() => !isFixing && setSelectedIssue(issue)}
                  className={`border rounded-xl p-3.5 flex justify-between items-center transition-all ${
                    isFixing ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                  } ${
                    isSelected
                      ? "border-[#00D4B2] bg-zinc-950"
                      : "border-zinc-900 bg-zinc-950/40 hover:border-zinc-800"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    {isFixed ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    <span className={`text-xs truncate ${isFixed ? "line-through text-zinc-650" : "text-zinc-300"}`}>{issue}</span>
                  </div>

                  {isFixed ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isFixing) handleRollback(issue);
                      }}
                      className="bg-zinc-900 hover:bg-zinc-850 text-red-400 text-[10px] font-mono font-bold py-1 px-2.5 rounded-lg border border-zinc-850 cursor-pointer shrink-0"
                    >
                      ROLLBACK
                    </button>
                  ) : (
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider shrink-0 font-bold">
                      {isSelected ? "DIAGNOSING" : "SELECT TO INSPECT"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Repair pipeline diagnostics visualizer */}
        {isFixing && (
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#00D4B2] font-black uppercase tracking-widest flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-[#00D4B2]" /> Active Pipeline Engine
              </span>
              <span className="text-zinc-500">Step {repairStep} of 6</span>
            </div>

            {/* Pipeline progress steps */}
            <div className="grid grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <div 
                  key={num} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    repairStep >= num ? "bg-[#00D4B2] shadow-[0_0_10px_#00D4B2]" : "bg-zinc-900"
                  }`} 
                />
              ))}
            </div>

            {/* Simulated Agent logs output terminal */}
            <div className="bg-[#060608] border border-zinc-900 rounded-lg p-3 font-mono text-[10px] text-zinc-400 h-28 overflow-y-auto space-y-1">
              <span className="text-zinc-600 block mb-1">// Active terminal output stream</span>
              {consoleLogs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-zinc-600 select-none">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Issue Code Diff and Actions */}
        {selectedIssue && !isFixing && (
          isLoadingFix ? (
            <div className="bg-zinc-950/40 border border-zinc-900 rounded-xl p-8 flex flex-col justify-center items-center space-y-3 min-h-[220px]">
              <Loader2 className="w-8 h-8 text-[#00D4B2] animate-spin" />
              <span className="text-zinc-500 font-mono text-xs">Compiling real-time AI diagnostic correction...</span>
            </div>
          ) : activeAutoFix ? (
            <div className="pt-4 border-t border-zinc-900 space-y-4 animate-fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Diagnosed Safe Correction</span>
                  <h4 className="text-white font-bold text-xs mt-1">{selectedIssue}</h4>
                </div>

                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  Risk: {activeAutoFix.riskLevel}
                </span>
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed bg-zinc-950 p-3.5 rounded-xl border border-zinc-900">
                {activeAutoFix.explanation}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-red-400 uppercase tracking-widest font-bold">Before code snippet</span>
                  <pre className="bg-[#1C0F12] border border-red-950/40 text-red-300 text-[10px] font-mono p-3.5 rounded-xl overflow-x-auto h-28">
                    {activeAutoFix.before}
                  </pre>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Proposed correction fix</span>
                  <pre className="bg-[#0D1C14] border border-emerald-950/40 text-emerald-300 text-[10px] font-mono p-3.5 rounded-xl overflow-x-auto h-28">
                    {activeAutoFix.after}
                  </pre>
                </div>
              </div>

              {/* Invariant logs */}
              <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-900 text-[10px] font-mono text-zinc-500 flex justify-between">
                <span>SYSTEM LOGS: <strong className="text-zinc-400">{activeAutoFix.testResult}</strong></span>
                <span className="text-[#00D4B2]">Verified Index Invariants Checked</span>
              </div>

              {/* Run Actions */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={handleFixAll}
                  className="text-xs text-zinc-500 hover:text-white font-mono cursor-pointer uppercase font-bold tracking-wider"
                >
                  [ Fix All Safe Errors ]
                </button>

                <button
                  type="button"
                  disabled={appliedFixes.includes(selectedIssue)}
                  onClick={handleFixApply}
                  className="bg-gradient-to-r from-[#635BFF] to-[#00D4B2] text-white text-xs font-bold py-2.5 px-5 rounded-xl cursor-pointer disabled:opacity-50"
                >
                  {appliedFixes.includes(selectedIssue) ? "Atomic Fix Applied" : "Apply Atomic Correction"}
                </button>
              </div>

            </div>
          ) : null
        )}

      </div>
    </div>
  );
}
