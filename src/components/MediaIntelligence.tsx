import React, { useState } from "react";
import { Eye, CheckCircle2, AlertCircle, FileText, Play, Image, Video, Sparkles } from "lucide-react";
import { WebsiteAnalysis } from "../types";

interface MediaIntelligenceProps {
  analysis: WebsiteAnalysis;
}

export default function MediaIntelligence({ analysis }: MediaIntelligenceProps) {
  const [activeMediaSubTab, setActiveMediaSubTab] = useState<"images" | "logos" | "videos">("images");

  // Mocked details for sampled images
  const imagesAnalysis = [
    {
      src: analysis.media.imagesSample[0] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&h=300&q=80",
      aspectRatio: "4:3",
      dimensions: "1200 x 900 px",
      weight: "142 KB (WebP optimized)",
      alt: "Unpopulated (Violates accessibility standards)",
      srcset: "Verified responsive srcset array",
      hasAlt: false
    },
    {
      src: analysis.media.imagesSample[1] || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=400&h=300&q=80",
      aspectRatio: "4:3",
      dimensions: "1600 x 1200 px",
      weight: "198 KB (WebP optimized)",
      alt: "Stripe Payment Terminals Visual Illustration Block",
      srcset: "Verified responsive srcset array",
      hasAlt: true
    }
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-900 flex-wrap gap-4">
        <div>
          <h3 className="text-white text-lg font-black font-mono uppercase tracking-tight">Media &amp; Logo Intelligence</h3>
          <p className="text-xs text-zinc-500 mt-1">Audit logos vector codes, alt descriptions guidelines, and embedded video streaming CDNs.</p>
        </div>

        {/* Sub Tabbing Controls */}
        <div className="flex gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-900 shrink-0">
          {[
            { id: "images", label: "Image Intel", count: analysis.metrics.imagesCount },
            { id: "logos", label: "Logo Vector", count: analysis.media.logos.length },
            { id: "videos", label: "Video Index", count: analysis.media.videosCount }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveMediaSubTab(tab.id as any)}
              className={`px-3 py-1.5 text-[10px] font-black rounded-lg uppercase tracking-wider font-mono cursor-pointer transition-all flex items-center gap-1.5 ${
                activeMediaSubTab === tab.id
                  ? "bg-[#635BFF] text-white shadow-sm"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[9px] opacity-60">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sub Tab 1: Image Intelligence */}
      {activeMediaSubTab === "images" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {imagesAnalysis.map((img, idx) => (
            <div key={idx} className="bg-[#0A0A0F] border border-zinc-900 p-5 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-full h-44 bg-zinc-950 rounded-xl overflow-hidden flex items-center justify-center border border-zinc-900 relative group">
                  <img src={img.src} alt="Scanned Asset" className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                  <span className="absolute bottom-3.5 left-3.5 bg-black/85 text-[8px] font-mono text-zinc-400 px-2 py-0.5 rounded border border-zinc-850 select-all max-w-[90%] truncate">
                    {img.src}
                  </span>
                </div>

                <div className="space-y-2 font-mono text-[10px]">
                  <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                    <span className="text-zinc-500 font-bold">Image Dimension:</span>
                    <span className="text-zinc-300 font-black tracking-tight">{img.dimensions} ({img.aspectRatio})</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                    <span className="text-zinc-500 font-bold">Compression weight:</span>
                    <span className="text-[#00D4B2] font-black tracking-tight">{img.weight}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                    <span className="text-zinc-500 font-bold">Alt description tag:</span>
                    <span className={`font-black tracking-tight ${img.hasAlt ? "text-emerald-400" : "text-amber-500"}`}>{img.alt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 font-bold">Responsive srcset:</span>
                    <span className="text-zinc-300 font-black tracking-tight">{img.srcset}</span>
                  </div>
                </div>
              </div>

              {/* Action and warning tips */}
              {!img.hasAlt && (
                <div className="bg-amber-500/5 p-3 rounded-xl border border-amber-500/20 flex gap-2 items-center text-[10px]">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-amber-400 leading-relaxed font-mono font-medium">Compliance violation reported by Image/Media Agent. Launch AutoFix console to compile tag patch.</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Sub Tab 2: Logo Intelligence */}
      {activeMediaSubTab === "logos" && (
        <div className="bg-[#0A0A0F] border border-zinc-900 p-6 rounded-2xl space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-zinc-900/60 flex-wrap gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black block">Extracted logo specifications</span>
              <h4 className="text-white font-bold text-xs">Primary Corporate Wordmark (inline SVG)</h4>
            </div>

            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900 inline-block font-mono text-[9px] text-zinc-500 leading-none">
              Bounding coordinate index: <strong className="text-emerald-400">X: 12px, Y: 18px, Width: 110px</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Logo visualization */}
            <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-xl p-6 flex flex-col justify-center items-center h-52 relative overflow-hidden">
              <div className="absolute top-2 left-2 font-mono text-[8px] text-zinc-650 uppercase font-black tracking-widest select-none">VECTOR PREVIEW</div>
              <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-850 inline-block">
                <span className="font-mono text-xl font-black uppercase text-white tracking-widest select-all">
                  {analysis.overview.name}
                </span>
              </div>
            </div>

            {/* Code blueprint element */}
            <div className="lg:col-span-7 space-y-2">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black block">SVG Vector Outline Inspector</span>
              <pre className="bg-zinc-950 border border-zinc-900 text-[10px] font-mono text-zinc-400 p-4 rounded-xl overflow-x-auto h-44 select-all leading-normal text-left">
                {`<!-- Extracted SVG Vector from ${analysis.overview.name} Home index -->\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 40" class="branding-wordmark">\n  <path fill="${analysis.design.primaryColor}" d="M12.4 18.5c0-1.8 1.4-3.2 3.1-3.2s3.1 1.4 3.1 3.2v8.4h3.1v-8.4c0-3.5-2.7-6.3-6.2-6.3s-6.2 2.8-6.2 6.3v8.4h3.1v-8.4zM26.4 15.5h-2.1v-2.8h2.1v-3.5h3.1v3.5h3.5v2.8h-3.5v11.4h-3.1v-11.4z" />\n</svg>`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Sub Tab 3: Video Intelligence */}
      {activeMediaSubTab === "videos" && (
        <div className="bg-[#0A0A0F] border border-zinc-900 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-start pb-4 border-b border-zinc-900">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black block">Embedded stream indicators</span>
              <h4 className="text-white font-bold text-xs mt-1">Found {analysis.media.videosCount} HTML5 media frame elements</h4>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
              CDN check complete
            </span>
          </div>

          <div className="space-y-3 font-mono text-[10px] text-zinc-400 text-left">
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 flex justify-between items-center">
              <div className="space-y-1">
                <span className="font-bold text-white block">Video Node 01: Client Checkout Demo loop</span>
                <span className="text-[9px] text-zinc-500 select-all block">Source: cdn.stripe.com/assets/video/checkout-demo.mp4</span>
              </div>
              <div className="text-right">
                <span className="text-white block font-black">2.4 MB (H.264)</span>
                <span className="text-zinc-650 block text-[9px]">Average CDN load time: 142ms</span>
              </div>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 flex justify-between items-center">
              <div className="space-y-1">
                <span className="font-bold text-white block">Video Node 02: Global scalability visual mesh</span>
                <span className="text-[9px] text-zinc-500 select-all block">Source: fastly.stripe.com/assets/mesh-hero-loop.webm</span>
              </div>
              <div className="text-right">
                <span className="text-[#00D4B2] block font-black">1.1 MB (WebM format)</span>
                <span className="text-zinc-650 block text-[9px]">Average CDN load time: 94ms</span>
              </div>
            </div>
          </div>

          {/* AI content context */}
          <div className="bg-[#635BFF]/5 p-3.5 rounded-xl border border-[#635BFF]/20 flex gap-2.5 items-start mt-2">
            <Sparkles className="w-5 h-5 text-[#00D4B2] shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] font-mono text-[#00D4B2] uppercase font-black block mb-0.5">Image/Media Agent content check</span>
              <p className="text-zinc-400 text-[10px] leading-relaxed">Both discovered video containers specify autoplay constraints correctly with muted and playsinline settings, satisfying desktop and mobile loading performance parameters.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
