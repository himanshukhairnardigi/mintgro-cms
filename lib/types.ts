// ─── Section: Header / Navigation ───
export interface NavLink {
  label: string;
  href: string;
  hasDropdown: boolean;
}

export interface HeaderData {
  logo: { text: string; tagline: string };
  navLinks: NavLink[];
  ctaButton: { label: string; href: string };
}

// ─── Section: Logo Bar / Social Proof ───
export interface LogoBarData {
  heading: string;
  subtext: string;
  logos: { name: string }[];
}

// ─── Section: Hero ───
export interface HeroData {
  eyebrow: string;
  title: string;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  trustBadges: string[];
}

// ─── Section: Challenges ───
export interface ChallengesData {
  eyebrow: string;
  title: string;
  description: string;
  problems: string[];
  solutions: string[];
}

// ─── Section: CRM / Features ───
export interface CRMFeatureItem {
  icon: string;
  label: string;
}

export interface CRMFeatureData {
  badge: string;
  title: string;
  description: string;
  categoryLabel: string;
  featureTitle: string;
  featureDescription: string;
  featureList: CRMFeatureItem[];
  dashboardStats: { label: string; value: string }[];
}

// ─── Section: Industries ───
export interface IndustryData {
  id: string;
  icon: string;
  name: string;
  desc: string;
}

// ─── Section: Personalization ───
export interface PersonalizationFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PersonalizationData {
  categoryLabel: string;
  title: string;
  description: string;
  features: PersonalizationFeature[];
}

// ─── Section: Experience ───
export interface ExperienceData {
  eyebrow: string;
  title: string;
  description: string;
  sidebarItems: string[];
  stats: { label: string; value: string }[];
  devices: string[];
}

// ─── Section: Steps ───
export interface StepData {
  id: string;
  icon: string;
  step: string;
  title: string;
  desc: string;
}

// ─── Section: Pricing ───
export interface PricingTier {
  id: string;
  name: string;
  price: number | null;
  priceLabel: string;
  desc: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export interface PricingData {
  eyebrow: string;
  title: string;
  description: string;
  tiers: PricingTier[];
}

// ─── Section: FAQ ───
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQData {
  eyebrow: string;
  title: string;
  description: string;
  items: FAQItem[];
  ctaButtons: { label: string; href: string; style: "primary" | "light" }[];
}

// ─── Section: CTA / Contact ───
export interface CTASectionData {
  eyebrow: string;
  title: string;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

// ─── Subscribers ───
export interface Subscriber {
  id: string;
  email: string;
  date: string;
}

// ─── Site Settings ───
export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
}

// ─── Aggregate Store ───
export interface SiteData {
  header: HeaderData;
  logoBar: LogoBarData;
  hero: HeroData;
  challenges: ChallengesData;
  crm: CRMFeatureData;
  industries: IndustryData[];
  personalization: PersonalizationData;
  experience: ExperienceData;
  steps: StepData[];
  pricing: PricingData;
  faq: FAQData;
  ctaSection: CTASectionData;
  subscribers: Subscriber[];
  settings: SiteSettings;
}
