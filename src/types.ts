export interface PageNode {
  title: string;
  path: string;
  type: string;
  sections: string[];
  evidence: string;
}

export interface SitemapItem {
  text: string;
  indent: number;
}

export interface WebsiteOverview {
  name: string;
  purpose: string;
  organization: string;
  category: string;
  targetAudience: string;
  evidenceLabel: string; // OBSERVED | INFERRED | UNKNOWN
  brandSummary: string;
}

export interface WebsiteMetrics {
  pagesCount: number;
  componentsCount: number;
  imagesCount: number;
  linksCount: number;
  integrationsCount: number;
}

export interface DesignSystem {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  accentColor: string;
  fontFamilyDisplay: string;
  fontFamilyBody: string;
  buttonStyle: string;
  cardStyle: string;
  evidenceLabel: string;
}

export interface Sitemap {
  pages: PageNode[];
  sitemap: SitemapItem[];
}

export interface SeoSignals {
  title: string;
  metaDescription: string;
  headings: string[];
  hasStructuredData: boolean;
  issues: string[];
  recommendations: string[];
  evidenceLabel: string;
}

export interface TechnologyStack {
  frameworks: string[];
  libraries: string[];
  analytics: string[];
  cdn: string[];
  cms: string;
  evidenceLabel: string;
}

export interface MediaSignals {
  logos: string[];
  videosCount: number;
  imagesSample: string[];
  evidenceLabel: string;
}

export interface FunctionSignals {
  interactiveForms: string[];
  integrations: string[];
  evidenceLabel: string;
}

export interface WebsiteAnalysis {
  overview: WebsiteOverview;
  metrics: WebsiteMetrics;
  design: DesignSystem;
  structure: Sitemap;
  seo: SeoSignals;
  technology: TechnologyStack;
  media: MediaSignals;
  functions: FunctionSignals;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface RedesignData {
  explanation: string;
  code: string;
  riskLevel: string;
}

export interface ComparisonGridRow {
  metricName: string;
  siteAValue: string;
  siteBValue: string;
  verdictNotes: string;
}

export interface ComparisonResult {
  summary: string;
  comparisonGrid: ComparisonGridRow[];
  keyTakeaways: string[];
}

export interface AutoFixResult {
  explanation: string;
  before: string;
  after: string;
  riskLevel: string;
  testResult: string;
}

export interface TrendPoint {
  date: string;
  seoScore: number;
  keywordUsage: number;
  primaryKeyword: string;
}

export interface MonitoredSite {
  id: string;
  url: string;
  name: string;
  addedAt: string;
  lastCheckAt: string;
  status: "active" | "paused";
  frequency: "daily" | "weekly" | "monthly";
  history: Array<{
    timestamp: string;
    type: string;
    description: string;
    before: string;
    after: string;
  }>;
  trends?: TrendPoint[];
}
