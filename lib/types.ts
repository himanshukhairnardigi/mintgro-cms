export interface HeroData {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}

export interface ChallengeData {
  id: string;
  icon: string;
  problem: string;
  solution: string;
}

export interface FeatureData {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export interface IndustryData {
  id: string;
  icon: string;
  name: string;
  desc: string;
}

export interface StepData {
  id: string;
  icon: string;
  step: string;
  title: string;
  desc: string;
}

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  desc: string;
  features: PricingFeature[];
  cta: string;
  popular: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Subscriber {
  id: string;
  email: string;
  date: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  twitterUrl: string;
  linkedinUrl: string;
  githubUrl: string;
}

export interface SiteData {
  hero: HeroData;
  challenges: ChallengeData[];
  features: FeatureData[];
  industries: IndustryData[];
  steps: StepData[];
  pricing: PricingTier[];
  faq: FAQItem[];
  subscribers: Subscriber[];
  settings: SiteSettings;
}