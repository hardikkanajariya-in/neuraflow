/* ──────────────────────────────────────────────────
 * NeuraFlow — Core TypeScript types
 * ────────────────────────────────────────────────── */

/* ── Site & Navigation ── */
export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export interface SiteData {
  brandName: string;
  tagline: string;
  description: string;
  navItems: NavItem[];
  footerGroups: FooterLinkGroup[];
  socials: SocialLink[];
  seo: {
    title: string;
    description: string;
    ogImage: string;
    url: string;
  };
  credit: {
    text: string;
    url: string;
    name: string;
  };
}

/* ── Marketing ── */
export interface HeroData {
  title: string;
  subtitle: string;
  cta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  stats: { value: string; label: string }[];
}

export interface TrustLogo {
  name: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarId: string;
  quote: string;
  rating: number;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  priceAnnual: number;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
  badge?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface MarketingData {
  hero: HeroData;
  trustLogos: TrustLogo[];
  features: Feature[];
  testimonials: Testimonial[];
  pricing: PricingTier[];
  faq: FAQItem[];
}

/* ── App / Dashboard ── */
export interface SidebarNavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
  section?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarId: string;
  role: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  memberCount: number;
}

export type ProjectStatus = 'active' | 'paused' | 'completed' | 'draft';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  metrics: {
    totalRuns: number;
    successRate: number;
    avgDuration: string;
  };
  automationCount: number;
  teamMembers: string[];
}

export interface AutomationStep {
  id: string;
  type: 'trigger' | 'condition' | 'action';
  label: string;
  config: string;
  icon: string;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  projectId: string;
  enabled: boolean;
  trigger: AutomationStep;
  conditions: AutomationStep[];
  actions: AutomationStep[];
  lastRunAt: string;
  runCount: number;
}

export type RunStatus = 'success' | 'failed' | 'running' | 'queued';

export interface Run {
  id: string;
  automationId: string;
  automationName: string;
  projectId: string;
  status: RunStatus;
  duration: string;
  startedAt: string;
  completedAt: string;
  stepsCompleted: number;
  totalSteps: number;
  errorMessage?: string;
}

export interface KPIMetric {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  avatarId: string;
  joinedAt: string;
  status: 'active' | 'invited';
}

export interface AlertRule {
  id: string;
  name: string;
  condition: string;
  threshold: string;
  channel: 'email' | 'slack' | 'webhook';
  enabled: boolean;
  lastTriggered?: string;
}

export interface AppData {
  sidebarNav: SidebarNavItem[];
  user: UserProfile;
  workspaces: Workspace[];
  projects: Project[];
  automations: Automation[];
  runs: Run[];
  metrics: KPIMetric[];
  notifications: Notification[];
  teamMembers: TeamMember[];
  alertRules: AlertRule[];
}

/* ── Billing ── */
export interface BillingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  current: boolean;
  badge?: string;
}

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

export interface UsageMeter {
  label: string;
  used: number;
  limit: number;
  unit: string;
}

export interface BillingData {
  plans: BillingPlan[];
  invoices: Invoice[];
  usage: UsageMeter[];
  currentPlanId: string;
}

/* ── Docs ── */
export type DocBlockType = 'heading' | 'paragraph' | 'code' | 'callout' | 'image' | 'list';

export interface DocBlock {
  type: DocBlockType;
  level?: 'h2' | 'h3';
  text?: string;
  language?: string;
  code?: string;
  variant?: 'tip' | 'warning' | 'info';
  photoId?: string;
  alt?: string;
  items?: string[];
  ordered?: boolean;
}

export interface DocPage {
  slug: string;
  title: string;
  category: string;
  description: string;
  blocks: DocBlock[];
}

export interface DocsData {
  categories: string[];
  pages: DocPage[];
}

/* ── Changelog ── */
export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  changes: {
    type: 'added' | 'improved' | 'fixed' | 'removed';
    text: string;
  }[];
}

export interface ChangelogData {
  entries: ChangelogEntry[];
}

/* ── Legal ── */
export interface LegalSection {
  title: string;
  content: string;
}

export interface LegalData {
  privacy: {
    title: string;
    lastUpdated: string;
    sections: LegalSection[];
  };
  terms: {
    title: string;
    lastUpdated: string;
    sections: LegalSection[];
  };
}

/* ── Toast ── */
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

/* ── Command Palette ── */
export interface CommandItem {
  id: string;
  label: string;
  category: string;
  href: string;
  icon?: string;
}

/* ── Template ── */
export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
}
