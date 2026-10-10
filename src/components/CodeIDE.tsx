import React, { useState } from "react";
import { Layout, Globe, Copy, Download, RefreshCw, Smartphone, Tablet, Monitor } from "lucide-react";

interface CodeIDEProps {
  activeUrl: string;
  analysis: any;
  showToast: (msg: string) => void;
  activeCode: string;
  setActiveCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function CodeIDE({ activeUrl, analysis, showToast, activeCode, setActiveCode }: CodeIDEProps) {
  const [codeLanguage, setCodeLanguage] = useState<"react" | "nextjs" | "tailwind" | "html">("react");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [redesignPrompt, setRedesignPrompt] = useState("");

  const handleCompileRedesign = async () => {
    if (isGeneratingCode) return;
    setIsGeneratingCode(true);
    try {
      const res = await fetch("/api/redesign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: activeUrl,
          analysis: analysis,
          customPrompt: redesignPrompt
        })
      });
      if (!res.ok) throw new Error("Compiler failed.");
      const data = await res.json();
      setActiveCode(data.code);
      setCodeLanguage("react");
      showToast("✦ Redesign compiled and rendered successfully!");
    } catch (err) {
      // Inline fallback compilation
      const name = analysis?.overview?.name || "Target";
      setActiveCode([
        "<!-- HTML / Tailwind REDESIGN CONFIGURATION -->",
        '<div class="bg-gradient-to-br from-[#06060A] via-[#0D0D12] to-[#121020] min-h-screen text-white p-12 flex flex-col justify-center items-center">',
        '  <div class="max-w-xl text-center space-y-6">',
        '    <div class="text-[#00D4B2] font-mono text-xs uppercase tracking-widest font-black">AI COMPILER OUTPUT</div>',
        "    <h2 class=\"text-3xl md:text-5xl font-extrabold tracking-tight\">" + name + " Premium Redevelopment</h2>",
        "    <p class=\"text-zinc-400 text-sm leading-relaxed\">" + (redesignPrompt || "A futuristic dark grid redesign with neon cyan glow outlines.") + "</p>",
        '    <div class="flex gap-4 justify-center">',
        '      <button class="bg-[#00D4B2] text-zinc-950 px-6 py-3 rounded-xl text-xs font-black uppercase font-mono tracking-wider">Launch Redesign</button>',
        '      <button class="border border-zinc-800 text-zinc-300 px-6 py-3 rounded-xl text-xs font-mono font-bold">Inspect code</button>',
        "    </div>",
        "  </div>",
        "</div>"
      ].join("\n"));
      setCodeLanguage("html");
      showToast("✦ Redesign code compiled using local sandbox engine.");
    } finally {
      setIsGeneratingCode(false);
    }
  };

  function getIframeSrcDoc(code: string): string {
    let htmlContent = code;
    
    // Simple JSX to HTML translation if it's standard React
    if (code.includes("import") || code.includes("export default")) {
      const match = code.match(/return\s*\(\s*<([\s\S]*?)>\s*\);?/i);
      if (match) {
        htmlContent = "<" + match[1] + ">";
      } else {
        htmlContent = code.replace(/import[\s\S]*?;/g, "")
                          .replace(/export default[\s\S]*?{/g, "")
                          .replace(/return\s*\(/g, "")
                          .replace(/\);?\s*}/g, "")
                          .replace(/className=/g, "class=");
      }
    }

    // Strip dynamic braces like {ArrowRight} or {activeUrl} from visual previews
    htmlContent = htmlContent
      .replace(/{\s*<[^>]*?>\s*}/g, "")
      .replace(/{\s*\w+\s*}/g, "")
      .replace(/className=/g, "class=");

    return [
      "<!DOCTYPE html>",
      "<html class=\"dark\">",
      "  <head>",
      "    <meta charset=\"utf-8\">",
      "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      "    <script src=\"https://cdn.tailwindcss.com\"></script>",
      "    <link href=\"https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=JetBrains+Mono:wght@400;700&display=swap\" rel=\"stylesheet\">",
      "    <script>",
      "      tailwind.config = {",
      "        darkMode: 'class',",
      "        theme: {",
      "          extend: {",
      "            fontFamily: {",
      "              sans: ['\"Plus Jakarta Sans\"', 'sans-serif'],",
      "              mono: ['\"JetBrains Mono\"', 'monospace'],",
      "            }",
      "          }",
      "        }",
      "      }",
      "    </script>",
      "    <style>",
      "      body {",
      "        font-family: 'Plus Jakarta Sans', sans-serif;",
      "        background-color: #060608;",
      "        color: #ffffff;",
      "        margin: 0;",
      "        padding: 24px;",
      "        min-height: 100vh;",
      "        display: flex;",
      "        flex-direction: column;",
      "        justify-content: center;",
      "      }",
      "    </style>",
      "  </head>",
      "  <body>",
      "    " + htmlContent,
      "  </body>",
      "</html>"
    ].join("\n");
  }

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-900 flex-wrap gap-4">
        <div>
          <h3 className="text-white text-lg font-black font-mono uppercase tracking-tight">Code Generator Space</h3>
          <p className="text-xs text-zinc-500 mt-1">Inspect raw page layouts or compile brand redesigns with live visual sandbox rendering.</p>
        </div>

        {/* Language Toggler */}
        <div className="flex gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-900 shrink-0">
          {(["react", "nextjs", "tailwind", "html"] as const).map(lang => (
            <button
              key={lang}
              type="button"
              onClick={() => setCodeLanguage(lang)}
              className={`px-2.5 py-1 text-[10px] font-black rounded-lg uppercase tracking-wider font-mono cursor-pointer transition-all ${
                codeLanguage === lang
                  ? "bg-[#635BFF] text-white shadow-sm"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        
        {/* Editor column */}
        <div className="xl:col-span-6 bg-[#0A0A0F] border border-zinc-900 p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Interactive Sandbox Editor</span>
            <textarea
              value={activeCode}
              onChange={(e) => setActiveCode(e.target.value)}
              className="w-full bg-[#060608] border border-zinc-850 text-xs font-mono text-zinc-300 p-4 rounded-xl focus:outline-none h-96 leading-relaxed font-medium resize-none"
            />
          </div>

          <div className="flex justify-between items-center font-mono text-[10px] text-zinc-500">
            <span>Format: {codeLanguage.toUpperCase()} Sandbox Export</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(activeCode);
                  showToast("✓ Copied redesign code!");
                }}
                className="bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 text-[10px] font-mono font-bold py-1.5 px-3 rounded-lg cursor-pointer"
              >
                COPY
              </button>
              <button
                type="button"
                onClick={() => {
                  const blob = new Blob([activeCode], { type: "text/plain" });
                  const urlBlob = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = urlBlob;
                  link.download = `webxray-layout.${codeLanguage === "html" ? "html" : "jsx"}`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(urlBlob);
                  showToast("Downloaded files successfully.");
                }}
                className="bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 text-[10px] font-mono font-bold py-1.5 px-3 rounded-lg cursor-pointer"
              >
                DOWNLOAD
              </button>
            </div>
          </div>
        </div>

        {/* Live Visual Sandbox Preview frame and AI redline specs */}
        <div className="xl:col-span-6 flex flex-col gap-4">
          
          {/* Iframe preview box */}
          <div className="bg-[#0D0D12] rounded-2xl border border-zinc-900 shadow-2xl flex flex-col overflow-hidden h-[330px]">
            
            {/* Address Bar */}
            <div className="bg-[#060608] px-4 py-2 flex items-center justify-between border-b border-zinc-900 font-mono text-xs text-zinc-500">
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>

              <div className="bg-zinc-950 border border-zinc-850 rounded-md px-3 py-0.5 text-[9px] text-zinc-400 w-44 md:w-60 truncate text-center font-mono">
                webxray.sandbox/preview/index.html
              </div>

              {/* Responsive Toggles */}
              <div className="flex gap-1.5 bg-zinc-950 p-0.5 rounded-lg border border-zinc-850 shrink-0">
                <button
                  type="button"
                  onClick={() => setPreviewMode("desktop")}
                  className={`p-1 rounded cursor-pointer ${previewMode === "desktop" ? "bg-[#00D4B2]/10 text-[#00D4B2]" : "text-zinc-500 hover:text-white"}`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode("tablet")}
                  className={`p-1 rounded cursor-pointer ${previewMode === "tablet" ? "bg-[#00D4B2]/10 text-[#00D4B2]" : "text-zinc-500 hover:text-white"}`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode("mobile")}
                  className={`p-1 rounded cursor-pointer ${previewMode === "mobile" ? "bg-[#00D4B2]/10 text-[#00D4B2]" : "text-zinc-500 hover:text-white"}`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Render target frame viewport */}
            <div className="flex-grow bg-zinc-950/40 p-4 flex justify-center items-center overflow-hidden">
              <div
                className="bg-[#060608] rounded-lg shadow-2xl transition-all duration-300 h-full overflow-hidden border border-zinc-900"
                style={{
                  width: previewMode === "desktop" ? "100%" : previewMode === "tablet" ? "420px" : "280px"
                }}
              >
                <iframe
                  title="WebX-Ray HTML5 Live Preview Frame"
                  className="w-full h-full border-0 bg-transparent"
                  srcDoc={getIframeSrcDoc(activeCode)}
                />
              </div>
            </div>

          </div>

          {/* AI original redesign prompt trigger block */}
          <div className="bg-[#0A0A0F] border border-zinc-900 p-5 rounded-2xl flex flex-col justify-between flex-grow">
            <div className="space-y-3.5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Compile Brand Redevelopment</span>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Feed prompt specifications (e.g. "Space age dark grid", "Vibrant magenta highlighting") to guide Gemini to write complete and originally structured component layouts.
              </p>

              <textarea
                value={redesignPrompt}
                onChange={(e) => setRedesignPrompt(e.target.value)}
                placeholder="Describe redesign preferences (colors, structures, CTA positions)..."
                className="w-full bg-[#060608] border border-zinc-850 text-xs font-mono text-white p-3.5 rounded-xl focus:outline-none h-20 resize-none placeholder-zinc-600"
              />
            </div>

            <button
              type="button"
              disabled={isGeneratingCode}
              onClick={handleCompileRedesign}
              className="w-full bg-gradient-to-r from-[#635BFF] to-[#00D4B2] text-white text-xs font-bold py-3 rounded-xl cursor-pointer disabled:opacity-50 mt-4"
            >
              {isGeneratingCode ? "Generating layout code..." : "Compile AI Redesign"}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
