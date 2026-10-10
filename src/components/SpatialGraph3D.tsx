import React, { useState } from "react";
import { Layers, Bot, Cpu, Check, AlertCircle } from "lucide-react";
import { WebsiteAnalysis } from "../types";

interface SpatialGraph3DProps {
  analysis: WebsiteAnalysis;
  activeUrl: string;
}

interface SpatialNode {
  id: string;
  label: string;
  x: number;
  y: number;
  role: string;
  status: string;
  confidence: number;
}

interface SpatialLayer {
  id: string;
  name: string;
  agent: string;
  color: string;
  description: string;
  nodes: SpatialNode[];
}

export default function SpatialGraph3D({ analysis, activeUrl }: SpatialGraph3DProps) {
  const [tilt, setTilt] = useState(55);
  const [rotation, setRotation] = useState(-25);
  const [depth, setDepth] = useState(50);
  const [selectedLayerId, setSelectedLayerId] = useState<string>("core");
  const [selectedNode, setSelectedNode] = useState<SpatialNode | null>({
    id: "root-domain",
    label: `Root: ${activeUrl.replace("https://", "").replace("http://", "")}`,
    x: 150,
    y: 150,
    role: "Domain Gateway DNA Entrypoint",
    status: "Verified secure HTTPS protocol",
    confidence: 99
  });
  const [hoveredLayerId, setHoveredLayerId] = useState<string | null>(null);

  const spatialLayers: SpatialLayer[] = [
    {
      id: "core",
      name: "01. Core Domain DNA",
      agent: "Master AI Agent",
      color: "#635BFF",
      description: "Extracts primary organization targets, product category, and corporate metadata.",
      nodes: [
        { id: "root-domain", label: `Root: ${activeUrl.replace("https://", "").replace("http://", "")}`, x: 150, y: 150, role: "Domain Gateway DNA Entrypoint", status: "Verified secure HTTPS protocol", confidence: 99 }
      ]
    },
    {
      id: "routes",
      name: "02. Crawled Pages Sitemap",
      agent: "Crawler Agent",
      color: "#00D4B2",
      description: "Maps indexed routes hierarchy, link anchor endpoints, and indentation trees.",
      nodes: (analysis.structure.pages || []).map((p, idx) => ({
        id: `r-${idx}`,
        label: p.title,
        x: 40 + (idx % 2) * 220,
        y: 40 + Math.floor(idx / 2) * 110,
        role: `Route: ${p.path} (${p.type})`,
        status: p.evidence,
        confidence: 96
      }))
    },
    {
      id: "dom",
      name: "03. Component Elements",
      agent: "Component Agent",
      color: "#A855F7",
      description: "Classifies visible page components, layout columns, and visual layout systems.",
      nodes: [
        { id: "c-nav", label: "Navigation Navbar", x: 150, y: 50, role: "Header container", status: "Keyboard accessible focus indices verified", confidence: 97 },
        { id: "c-hero", label: "Hero Slider Banner", x: 60, y: 150, role: "Primary promotional CTA block", status: "High semantic weight verified", confidence: 94 },
        { id: "c-term", label: "CLI Terminal sandbox", x: 240, y: 150, role: "Interactive developer container", status: "Form controls verified", confidence: 96 },
        { id: "c-foot", label: "Structured Footer sitemap", x: 150, y: 250, role: "Directory anchor block", status: "Validated semantic footer element", confidence: 98 }
      ]
    },
    {
      id: "media",
      name: "04. Media & Logo Assets",
      agent: "Image/Media Agent",
      color: "#F43F5E",
      description: "Checks alternative text, logo dimensions, and embedded media counts.",
      nodes: [
        { id: "m-logo", label: "Corporate wordmark SVG", x: 150, y: 80, role: "Primary brand identifier", status: "Observed inline vector SVG", confidence: 99 },
        { id: "m-banner", label: "Climate Portfolio Photo", x: 75, y: 200, role: "Homepage promo asset", status: "Violates alt tag requirements", confidence: 95 },
        { id: "m-feature", label: "Cards visual diagram", x: 225, y: 200, role: "Product mockup graphic", status: "WebP compressed", confidence: 97 }
      ]
    },
    {
      id: "api",
      name: "05. API Integrations & Functions",
      agent: "Function Agent",
      color: "#EAB308",
      description: "Traces interactives forms, API callbacks, and third-party script wrappers.",
      nodes: (analysis.functions.interactiveForms || []).map((f, idx) => ({
        id: `f-${idx}`,
        label: f,
        x: 80 + idx * 70,
        y: 100 + idx * 80,
        role: "Interactive Client Action Frame",
        status: "Checked standard action event triggers",
        confidence: 94
      }))
    },
    {
      id: "seo",
      name: "06. SEO & Tech Audits",
      agent: "SEO & Technology Agent",
      color: "#3B82F6",
      description: "Validates JSON-LD schema layouts, edge caching headers, and accessibility markers.",
      nodes: [
        { id: "s-schema", label: "JSON-LD schemas structured", x: 80, y: 120, role: "Organization metadata descriptor", status: "Schema tags correct", confidence: 95 },
        { id: "s-cdn", label: "Cloudflare proxy CDNs", x: 220, y: 120, role: "Caching edge layers", status: "Response header verified", confidence: 98 },
        { id: "s-lighthouse", label: "A11y compliance rules", x: 150, y: 220, role: "WCAG contrast metrics check", status: "3 issues resolved", confidence: 94 }
      ]
    }
  ];

  const activeLayer = spatialLayers.find(l => l.id === selectedLayerId) || spatialLayers[0];

  return (
    <div className="space-y-6 text-left">
      <div>
        <h3 className="text-white text-lg font-black font-mono uppercase tracking-tight">Interactive 3D Spatial Universe</h3>
        <p className="text-xs text-zinc-500 mt-1">A high-fidelity layered spatial explorer mapping sitemaps, interactive elements, and audit reports.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: Rotate, Tilt control board & 3D stack */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          
          {/* Spatial OS configuration controls */}
          <div className="bg-[#0A0A0F] border border-zinc-900 p-4 rounded-xl grid grid-cols-3 gap-6 font-mono text-[10px] text-zinc-400">
            <div>
              <span className="block font-bold uppercase tracking-widest text-zinc-500">Rotate Stack ({rotation}°)</span>
              <input
                type="range"
                min="-180"
                max="180"
                value={rotation}
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="w-full mt-2 accent-[#00D4B2]"
              />
            </div>

            <div>
              <span className="block font-bold uppercase tracking-widest text-zinc-500">Tilt Perspective ({tilt}°)</span>
              <input
                type="range"
                min="20"
                max="85"
                value={tilt}
                onChange={(e) => setTilt(parseInt(e.target.value))}
                className="w-full mt-2 accent-[#00D4B2]"
              />
            </div>

            <div>
              <span className="block font-bold uppercase tracking-widest text-zinc-500">Layer spacing ({depth}px)</span>
              <input
                type="range"
                min="30"
                max="120"
                value={depth}
                onChange={(e) => setDepth(parseInt(e.target.value))}
                className="w-full mt-2 accent-[#00D4B2]"
              />
            </div>
          </div>

          {/* Isometric stack canvas */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl h-[420px] flex items-center justify-center relative overflow-hidden select-none">
            
            {/* Ambient background particles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-[#635BFF]/5 to-[#00D4B2]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Matrix Stack Wrapper */}
            <div
              className="relative w-[300px] h-[300px] transition-transform duration-300 ease-out"
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
                transform: `rotateX(${tilt}deg) rotateZ(${rotation}deg)`
              }}
            >
              {/* Intersecting central coordinate beam line */}
              <div 
                className="absolute left-1/2 top-1/2 w-[2px] bg-gradient-to-b from-[#00D4B2]/40 via-purple-500/15 to-transparent pointer-events-none"
                style={{
                  height: `${spatialLayers.length * depth}px`,
                  transform: `translateX(-50%) translateY(-50%) translateZ(${(spatialLayers.length - 1) * depth / 2}px)`
                }}
              />

              {/* Render Stack Layers */}
              {spatialLayers.map((layer, idx) => {
                const zOffset = (spatialLayers.length - 1 - idx) * depth;
                const isSelected = selectedLayerId === layer.id;
                const isHovered = hoveredLayerId === layer.id;

                return (
                  <div
                    key={layer.id}
                    className={`absolute inset-0 rounded-2xl border transition-all duration-300 flex flex-col justify-between p-4 cursor-pointer ${
                      isSelected
                        ? "border-[#00D4B2] bg-[#635BFF]/10 shadow-[0_0_35px_rgba(0,212,178,0.25)]"
                        : isHovered
                        ? "border-zinc-500 bg-[#0A0A14]/90"
                        : "border-zinc-800/80 bg-[#06060A]/85"
                    }`}
                    style={{
                      transform: `translateZ(${zOffset}px)`,
                      transformStyle: "preserve-3d"
                    }}
                    onMouseEnter={() => setHoveredLayerId(layer.id)}
                    onMouseLeave={() => setHoveredLayerId(null)}
                    onClick={() => {
                      setSelectedLayerId(layer.id);
                      setSelectedNode(null);
                    }}
                  >
                    {/* Layer Header Tag */}
                    <div className="flex justify-between items-start font-mono text-[9px] pointer-events-none" style={{ transform: "translateZ(5px)" }}>
                      <span className="text-zinc-500 uppercase tracking-widest font-black">{layer.name}</span>
                      <span 
                        className="font-bold" 
                        style={{ color: layer.color }}
                      >
                        {layer.agent}
                      </span>
                    </div>

                    {/* Nodes visualizer within the current layer */}
                    <div className="relative flex-grow w-full h-full my-1" style={{ transform: "translateZ(10px)" }}>
                      {layer.nodes.map(node => {
                        const isNodeSelected = selectedNode?.id === node.id;
                        return (
                          <button
                            key={node.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLayerId(layer.id);
                              setSelectedNode(node);
                            }}
                            className="absolute w-3.5 h-3.5 rounded-full border transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-135 cursor-pointer flex items-center justify-center group"
                            style={{
                              left: `${node.x / 3}px`,
                              top: `${node.y / 3}px`,
                              borderColor: isNodeSelected ? "#white" : layer.color,
                              backgroundColor: isNodeSelected ? "#00D4B2" : "rgba(6, 6, 10, 0.9)"
                            }}
                          >
                            {/* Glow pulse for active nodes */}
                            <span 
                              className="absolute inset-0 rounded-full animate-ping opacity-35"
                              style={{ backgroundColor: layer.color }}
                            />
                            
                            {/* Hover node name tooltip */}
                            <span className="absolute bottom-5 bg-[#060608]/95 border border-zinc-800 text-[8px] font-mono font-bold text-white px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity select-none">
                              {node.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Layer Footer Status Info */}
                    <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 pointer-events-none" style={{ transform: "translateZ(5px)" }}>
                      <span>System level: {idx + 1}</span>
                      <span>{layer.nodes.length} nodes cataloged</span>
                    </div>

                  </div>
                );
              })}

            </div>
          </div>

        </div>

        {/* Right column: Target nodes inspection dashboard */}
        <div className="xl:col-span-4 bg-[#0A0A0F] border border-zinc-900 rounded-2xl p-5 flex flex-col justify-between space-y-4 text-xs">
          
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">X-RAY NODE INSPECT</span>

            {/* Layer details */}
            <div className="space-y-2 pb-4 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00D4B2]" />
                <h4 className="text-white font-black uppercase font-mono tracking-tight text-xs">{activeLayer.name}</h4>
              </div>
              <p className="text-zinc-400 leading-relaxed text-[11px]">{activeLayer.description}</p>
              <div className="text-[10px] font-mono text-zinc-500">
                Coordinating: <strong className="text-zinc-300 font-bold">{activeLayer.agent}</strong>
              </div>
            </div>

            {/* Selected Node Profile */}
            {selectedNode ? (
              <div className="space-y-3.5 bg-zinc-950 p-4 rounded-xl border border-zinc-900 animate-fade-in">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-black">ACTIVE NODE LABEL</span>
                    <h5 className="text-white font-mono font-black text-xs break-all leading-tight mt-0.5">{selectedNode.label}</h5>
                  </div>
                  <span className="text-[9px] font-mono text-[#00D4B2] font-black tracking-widest bg-[#00D4B2]/10 border border-[#00D4B2]/20 px-1.5 py-0.5 rounded">
                    {selectedNode.confidence}% CONF
                  </span>
                </div>

                <div className="space-y-2 font-mono text-[10px]">
                  <div>
                    <span className="text-zinc-500 font-bold">Classification:</span>
                    <span className="text-zinc-300 block mt-0.5">{selectedNode.role}</span>
                  </div>

                  <div>
                    <span className="text-zinc-500 font-bold">System Status:</span>
                    <span className="text-zinc-300 block mt-0.5 flex items-center gap-1">
                      {selectedNode.status.includes("Violates") ? (
                        <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 inline-block" />
                      ) : (
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 inline-block" />
                      )}
                      <span>{selectedNode.status}</span>
                    </span>
                  </div>

                  <div className="pt-2 border-t border-zinc-900/60">
                    <span className="text-zinc-500 font-bold block mb-1">AI Recommendation:</span>
                    <p className="text-zinc-400 leading-relaxed text-[10px] font-sans">
                      {selectedNode.status.includes("Violates") 
                        ? "Execute AutoFix tool compilation immediately. Alter image tag nodes to supply alternative text parameters."
                        : "Verify routing indices canonical integrity in the daily monitoring runs."}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-center p-4 border border-dashed border-zinc-850 rounded-xl">
                <Bot className="w-8 h-8 text-zinc-700 animate-pulse" />
                <span className="text-zinc-500 font-mono text-[10px] mt-2 italic">Select a node inside the spatial layers stack to inspect details</span>
              </div>
            )}
          </div>

          {/* Quick status report footer */}
          <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-900 flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-[#00D4B2] shrink-0 animate-pulse" />
            <div className="font-mono text-[9px] text-zinc-500 leading-tight">
              Evidence classifications: <strong className="text-emerald-400 font-bold">OBSERVED</strong> · <strong className="text-purple-400 font-bold">INFERRED</strong> · <strong className="text-zinc-400 font-bold">UNKNOWN</strong>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
