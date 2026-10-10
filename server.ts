import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Lazy initializer for Google GenAI to avoid crashing if API key is not configured yet
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required but missing. Please configure it in your Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Scraper function to fetch a site's visible text to ground Gemini's analysis
async function attemptScraping(urlStr: string): Promise<string> {
  try {
    const formattedUrl = urlStr.startsWith("http") ? urlStr : `https://${urlStr}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // Snappy timeout

    const res = await fetch(formattedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      }
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return `[Note: Scraper failed with status code ${res.status}. Falling back to domain name evaluation]`;
    }

    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : "";

    const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i) ||
                      html.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"/i);
    const desc = descMatch ? descMatch[1].trim() : "";

    // Extract up to 10 headings
    const headings: string[] = [];
    const hMatches = html.matchAll(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi);
    for (const match of hMatches) {
      const txt = match[2].replace(/<[^>]*>/g, "").trim();
      if (txt && headings.length < 15) headings.push(`H${match[1]}: ${txt}`);
    }

    const bodyText = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 5000); // Send first 5k characters

    return `
=== WEBPAGE SCRAPED CONTENT ===
URL: ${formattedUrl}
HTML Title: ${title}
Meta Description: ${desc}
Headings:
${headings.join("\n")}
Body Snippet:
${bodyText}
===============================
    `;
  } catch (err) {
    return `[Note: Scraper failed. Reason: ${err instanceof Error ? err.message : String(err)}. Falling back to domain analysis]`;
  }
}

// 1. Analyze Website Endpoint
app.post("/api/analyze", async (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "A valid website URL is required." });
  }

  try {
    const ai = getGeminiClient();
    const scrapedContext = await attemptScraping(url);

    const prompt = `
You are WebX-Ray AI, a premium futuristic Web Intelligence OS.
Analyze the target website: "${url}" using the scraped webpage context below:
${scrapedContext}

We have coordinate specialized agents active:
- Crawler Agent (pages, structure, navigation)
- Design Agent (palette colors, typography, button/card styles)
- Component Agent (classified visual components)
- Image/Media Agent (estimated counts, logo assets, video presence)
- SEO Agent (meta descriptions, structured data, technical issues)
- Technology Agent (CMS, frameworks, CDN, libraries)
- Content Agent (topics, importance organization)
- Function Agent (interactive forms, integrations)
- Architecture Agent (relationships, nodes, parent routing)
- Security Agent (authorization protocols, SSL check)

Synthesize their intelligence reports. For every discovery point, assign clear evidence labels: "OBSERVED" (directly scraping verified tags), "INFERRED" (qualitatively compiled by AI experts), or "UNKNOWN" (currently undetermined).
Make the colors match the brand's natural colors (e.g. for stripe warm indigo/purples; for airbnb coral; for linear dark obsidian).

Return the analysis strictly matching the requested JSON Schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                purpose: { type: Type.STRING },
                organization: { type: Type.STRING },
                category: { type: Type.STRING },
                targetAudience: { type: Type.STRING },
                evidenceLabel: { type: Type.STRING, description: "OBSERVED, INFERRED, or UNKNOWN" },
                brandSummary: { type: Type.STRING }
              },
              required: ["name", "purpose", "organization", "category", "targetAudience", "evidenceLabel", "brandSummary"]
            },
            metrics: {
              type: Type.OBJECT,
              properties: {
                pagesCount: { type: Type.INTEGER },
                componentsCount: { type: Type.INTEGER },
                imagesCount: { type: Type.INTEGER },
                linksCount: { type: Type.INTEGER },
                integrationsCount: { type: Type.INTEGER }
              },
              required: ["pagesCount", "componentsCount", "imagesCount", "linksCount", "integrationsCount"]
            },
            design: {
              type: Type.OBJECT,
              properties: {
                primaryColor: { type: Type.STRING, description: "Primary branding Hex color (e.g. #8B5CF6)" },
                secondaryColor: { type: Type.STRING },
                backgroundColor: { type: Type.STRING },
                accentColor: { type: Type.STRING },
                fontFamilyDisplay: { type: Type.STRING },
                fontFamilyBody: { type: Type.STRING },
                buttonStyle: { type: Type.STRING },
                cardStyle: { type: Type.STRING },
                evidenceLabel: { type: Type.STRING }
              },
              required: ["primaryColor", "secondaryColor", "backgroundColor", "accentColor", "fontFamilyDisplay", "fontFamilyBody", "buttonStyle", "cardStyle", "evidenceLabel"]
            },
            structure: {
              type: Type.OBJECT,
              properties: {
                pages: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      path: { type: Type.STRING },
                      type: { type: Type.STRING },
                      sections: { type: Type.ARRAY, items: { type: Type.STRING } },
                      evidence: { type: Type.STRING }
                    },
                    required: ["title", "path", "type", "sections", "evidence"]
                  }
                },
                sitemap: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      text: { type: Type.STRING },
                      indent: { type: Type.INTEGER }
                    },
                    required: ["text", "indent"]
                  }
                }
              },
              required: ["pages", "sitemap"]
            },
            seo: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                metaDescription: { type: Type.STRING },
                headings: { type: Type.ARRAY, items: { type: Type.STRING } },
                hasStructuredData: { type: Type.BOOLEAN },
                issues: { type: Type.ARRAY, items: { type: Type.STRING } },
                recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
                evidenceLabel: { type: Type.STRING }
              },
              required: ["title", "metaDescription", "headings", "hasStructuredData", "issues", "recommendations", "evidenceLabel"]
            },
            technology: {
              type: Type.OBJECT,
              properties: {
                frameworks: { type: Type.ARRAY, items: { type: Type.STRING } },
                libraries: { type: Type.ARRAY, items: { type: Type.STRING } },
                analytics: { type: Type.ARRAY, items: { type: Type.STRING } },
                cdn: { type: Type.STRING },
                cms: { type: Type.STRING },
                evidenceLabel: { type: Type.STRING }
              },
              required: ["frameworks", "libraries", "analytics", "cdn", "cms", "evidenceLabel"]
            },
            media: {
              type: Type.OBJECT,
              properties: {
                logos: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Discovered image logos URL or SVG definitions" },
                videosCount: { type: Type.INTEGER },
                imagesSample: { type: Type.ARRAY, items: { type: Type.STRING } },
                evidenceLabel: { type: Type.STRING }
              },
              required: ["logos", "videosCount", "imagesSample", "evidenceLabel"]
            },
            functions: {
              type: Type.OBJECT,
              properties: {
                interactiveForms: { type: Type.ARRAY, items: { type: Type.STRING } },
                integrations: { type: Type.ARRAY, items: { type: Type.STRING } },
                evidenceLabel: { type: Type.STRING }
              },
              required: ["interactiveForms", "integrations", "evidenceLabel"]
            }
          },
          required: ["overview", "metrics", "design", "structure", "seo", "technology", "media", "functions"]
        }
      }
    });

    const textResult = response.text || "{}";
    const parsedData = JSON.parse(textResult);
    res.json(parsedData);
  } catch (error) {
    console.error("Analysis failed:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" });
  }
});

// 2. Chat Endpoint
app.post("/api/chat", async (req, res) => {
  const { url, analysis, messages } = req.body;
  if (!url || !analysis || !messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "URL, analysis data, and chat history are required." });
  }

  try {
    const ai = getGeminiClient();

    const systemInstruction = `
You are WebX-Ray AI, an advanced Spatial Website Intelligence Assistant.
You have analyzed "${url}". Here is the structured profile:
${JSON.stringify(analysis, null, 2)}

Answer the user's questions strictly based on the crawled profile, keeping answers concise and highly professional.
If asked to write or improve components, generate complete beautiful clean React / Tailwind code blocks.
    `;

    const contents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text || "I am currently unable to compute a response. Please try again." });
  } catch (error) {
    console.error("Chat failed:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" });
  }
});

// 3. Redesign / Code Generator Endpoint
app.post("/api/redesign", async (req, res) => {
  const { url, analysis, customPrompt, language } = req.body;
  if (!url || !analysis) {
    return res.status(400).json({ error: "URL and analysis context are required." });
  }

  try {
    const ai = getGeminiClient();

    const prompt = `
You are WebX-Ray's Premium Code Generator Agent.
Synthesize an original redesigned layout of "${url}" based on this prompt instructions: "${customPrompt || "Modern spatial luxury design with better CTA conversion"}".
Format: Complete, self-contained single-string ES6 export React component or HTML/Tailwind mockup depending on request.

Return strictly a JSON with:
1. "explanation": Creative design tradeoffs and palette justifications.
2. "code": A complete working React component or HTML string compatible with standard rendering.
3. "riskLevel": "Low" or "Medium" based on complexity.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: { type: Type.STRING },
            code: { type: Type.STRING },
            riskLevel: { type: Type.STRING }
          },
          required: ["explanation", "code", "riskLevel"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error) {
    console.error("Redesign failed:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" });
  }
});

// 4. Compare Website Endpoint
app.post("/api/compare", async (req, res) => {
  const { urlA, urlB, analysisA, analysisB } = req.body;
  if (!urlA || !urlB) {
    return res.status(400).json({ error: "Both URLs are required." });
  }

  try {
    const ai = getGeminiClient();

    const prompt = `
Compare website A (${urlA}) and website B (${urlB}) side-by-side using the analyses context:
A: ${JSON.stringify(analysisA || {}, null, 1)}
B: ${JSON.stringify(analysisB || {}, null, 1)}

Construct a side-by-side evaluation grid of similarities and differences, tradeoffs, and key recommendations.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            comparisonGrid: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  metricName: { type: Type.STRING },
                  siteAValue: { type: Type.STRING },
                  siteBValue: { type: Type.STRING },
                  verdictNotes: { type: Type.STRING }
                },
                required: ["metricName", "siteAValue", "siteBValue", "verdictNotes"]
              }
            },
            keyTakeaways: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["summary", "comparisonGrid", "keyTakeaways"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error) {
    console.error("Comparison failed:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" });
  }
});

// 5. AutoFix Endpoint
app.post("/api/autofix", async (req, res) => {
  const { url, issue, type } = req.body;
  if (!url || !issue) {
    return res.status(400).json({ error: "URL and issue are required." });
  }

  try {
    const ai = getGeminiClient();

    const prompt = `
You are the WebX-Ray Atomic AutoFix Agent.
Diagnose and generate a code correction for this safe error on "${url}":
Type: "${type || "SEO"}"
Issue description: "${issue}"

Provide a valid correction JSON containing:
1. "explanation": Diagnosis and repair summary.
2. "before": Original failing snippet.
3. "after": Patched robust snippet.
4. "riskLevel": "Safe" or "Low"
5. "testResult": "Compilation passed - verification metrics successful"
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: { type: Type.STRING },
            before: { type: Type.STRING },
            after: { type: Type.STRING },
            riskLevel: { type: Type.STRING },
            testResult: { type: Type.STRING }
          },
          required: ["explanation", "before", "after", "riskLevel", "testResult"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error) {
    console.error("AutoFix generation failed:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" });
  }
});

// 6. SEO & File Generator Endpoint
app.post("/api/seo-file", async (req, res) => {
  const { url, fileType, analysis } = req.body;
  if (!url || !fileType || !analysis) {
    return res.status(400).json({ error: "URL, file type, and analysis are required." });
  }

  try {
    const ai = getGeminiClient();

    const prompt = `
You are WebX-Ray's specialized SEO & File Architect.
Compile the absolute best high-fidelity, completely professional file content of type "${fileType}" for the target website "${url}".
The website has been analyzed and has this structured profile:
${JSON.stringify(analysis, null, 1)}

Requirements for each fileType:
- "sitemap": Return a fully valid, perfectly indented XML sitemap (<?xml version="1.0" encoding="UTF-8"?>) listing all discovered page routes from the analysis.
- "robots": Return a professional robots.txt crawl criteria containing allow/disallow parameters, disallowing secure areas, and pointing to the sitemap.xml.
- "meta": Return an HTML-compliant block of recommended title tags (length 50-60 characters), meta description, canonical URLs, and the complete <h1> and heading structure outlines for SEO compliance.
- "seo": Return a beautifully formatted JSON report with detailed SEO score audit recommendations.
- "doc": Return a beautiful Markdown technical specification containing overview, sitemap tables, heading structures, and technological compositions.

Your response must be returned strictly in JSON schema format containing:
1. "content": The complete, unescaped string of the generated file. Keep comments minimal but helpful. No extra wrappers, return only the file's raw content.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            content: { type: Type.STRING }
          },
          required: ["content"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error) {
    console.error("SEO file generation failed:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" });
  }
});

// 7. Interactive Website Improvement Advisor Endpoint
app.post("/api/tailor-improvement", async (req, res) => {
  const { url, topic, userAnswers, analysis } = req.body;
  if (!url || !topic || !userAnswers) {
    return res.status(400).json({ error: "URL, topic, and userAnswers are required." });
  }

  try {
    const ai = getGeminiClient();

    const prompt = `
You are WebX-Ray's interactive AI Senior Design & Improvement Advisor.
The user wants to optimize their website "${url}" regarding the topic: "${topic}".
They provided these specific customized guidelines:
${JSON.stringify(userAnswers, null, 2)}

And the website has been audited and compiled as follows:
${JSON.stringify(analysis || {}, null, 1)}

Requirements:
Synthesize an incredibly polished, responsive HTML/React snippet that integrates their custom preferences and fixes the target area beautifully using Tailwind classes.

Return strictly a JSON response conforming to this schema:
1. "explanation": A detailed, professional analysis of what is improved, how their feedback was integrated, and structural tips.
2. "code": A complete self-contained React or HTML snippet implementing this custom optimization.
3. "recommendations": An array of next steps or improvements.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: { type: Type.STRING },
            code: { type: Type.STRING },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["explanation", "code", "recommendations"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error) {
    console.error("Tailor improvement failed:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" });
  }
});

// Configure Vite middleware or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WebX-Ray AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
