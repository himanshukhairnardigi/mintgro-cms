import { SiteData } from "./types";

const DEFAULT_DATA: SiteData = {
  hero: {
    badge: "Trusted by 2,500+ businesses",
    title: "Business Growth Made Simple with Mintgro",
    subtitle: "Made Simple",
    description:
      "Transform challenges into opportunities. Get all the tools, analytics, and insights you need to scale your business — in one powerful platform.",
    ctaPrimary: "Start Free Trial",
    ctaSecondary: "Watch Demo",
    stat1Value: "98%",
    stat1Label: "Satisfaction",
    stat2Value: "3.2x",
    stat2Label: "Growth Rate",
    stat3Value: "50+",
    stat3Label: "Integrations",
  },
  challenges: [
    {
      id: "c1",
      icon: "BarChart3",
      problem: "Scattered Data & No Clear Insights",
      solution:
        "Unified analytics dashboard that turns raw data into actionable growth strategies.",
    },
    {
      id: "c2",
      icon: "Users",
      problem: "Customer Acquisition Is Expensive",
      solution:
        "AI-powered targeting and automation that reduces CAC by up to 60%.",
    },
    {
      id: "c3",
      icon: "TrendingUp",
      problem: "Stalled Revenue Growth",
      solution:
        "Revenue optimization engine with smart pricing and upsell recommendations.",
    },
    {
      id: "c4",
      icon: "Shield",
      problem: "Scaling Without Breaking Operations",
      solution:
        "Automated workflows and integrations that scale seamlessly with your business.",
    },
  ],
  features: [
    { id: "f1", icon: "BarChart3", title: "Advanced Analytics", desc: "Real-time dashboards, custom reports, and predictive insights to drive decisions." },
    { id: "f2", icon: "Users", title: "CRM & Contacts", desc: "360° customer view with smart segmentation, lifecycle tracking, and engagement scoring." },
    { id: "f3", icon: "Zap", title: "Automation Engine", desc: "Rule-based and AI workflows that eliminate repetitive tasks and boost productivity." },
    { id: "f4", icon: "Globe", title: "Multi-Channel Outreach", desc: "Email, SMS, social, and web — orchestrated from a single campaign builder." },
    { id: "f5", icon: "Shield", title: "Compliance & Security", desc: "GDPR, SOC2, and HIPAA-ready infrastructure with role-based access controls." },
    { id: "f6", icon: "Cpu", title: "AI Copilot", desc: "Context-aware AI assistant for content, strategy, and data interpretation." },
    { id: "f7", icon: "Layers", title: "50+ Integrations", desc: "Seamlessly connect with Slack, Salesforce, HubSpot, Stripe, and more." },
    { id: "f8", icon: "Lock", title: "Data Vault", desc: "Encrypted storage with audit trails, versioning, and automated backups." },
  ],
  industries: [
    { id: "i1", icon: "Building2", name: "SaaS & Tech", desc: "Reduce churn, optimize LTV, and scale acquisition." },
    { id: "i2", icon: "ShoppingCart", name: "E-Commerce", desc: "Boost conversions, cart recovery, and AOV." },
    { id: "i3", icon: "Stethoscope", name: "Healthcare", desc: "Patient engagement, compliance, and scheduling." },
    { id: "i4", icon: "GraduationCap", name: "Education", desc: "Enrollment funnels, learner analytics, and retention." },
    { id: "i5", icon: "Factory", name: "Manufacturing", desc: "Supply chain visibility, demand forecasting, and ops." },
    { id: "i6", icon: "Landmark", name: "Finance", desc: "Risk analytics, client portals, and regulatory reporting." },
  ],
  steps: [
    { id: "s1", icon: "UserPlus", step: "01", title: "Sign Up", desc: "Create your account in 30 seconds. No credit card required." },
    { id: "s2", icon: "Settings", step: "02", title: "Configure", desc: "Connect your data sources and set up your workspace with our guided wizard." },
    { id: "s3", icon: "Rocket", step: "03", title: "Launch", desc: "Activate automations, campaigns, and dashboards tailored to your goals." },
    { id: "s4", icon: "BarChart3", step: "04", title: "Grow", desc: "Monitor, optimize, and scale with real-time insights and AI recommendations." },
  ],
  pricing: [
    {
      id: "p1",
      name: "Starter",
      price: 19,
      desc: "For solopreneurs and small teams getting started.",
      features: [
        { label: "Up to 3 users", included: true },
        { label: "5 dashboards", included: true },
        { label: "1,000 contacts", included: true },
        { label: "Email support", included: true },
        { label: "Basic automations", included: true },
        { label: "AI Copilot", included: false },
        { label: "Custom integrations", included: false },
        { label: "White-label", included: false },
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      id: "p2",
      name: "Growth",
      price: 49,
      desc: "For scaling teams that need power and flexibility.",
      features: [
        { label: "Up to 20 users", included: true },
        { label: "Unlimited dashboards", included: true },
        { label: "25,000 contacts", included: true },
        { label: "Priority support", included: true },
        { label: "Advanced automations", included: true },
        { label: "AI Copilot", included: true },
        { label: "Custom integrations", included: true },
        { label: "White-label", included: false },
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      id: "p3",
      name: "Enterprise",
      price: 99,
      desc: "For organizations that need unlimited scale & control.",
      features: [
        { label: "Unlimited users", included: true },
        { label: "Unlimited dashboards", included: true },
        { label: "Unlimited contacts", included: true },
        { label: "Dedicated support", included: true },
        { label: "Advanced automations", included: true },
        { label: "AI Copilot", included: true },
        { label: "Custom integrations", included: true },
        { label: "White-label", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ],
  faq: [
    { id: "q1", question: "How does the 14-day free trial work?", answer: "You get full access to all Growth plan features for 14 days. No credit card required. At the end of the trial, you can choose a plan or your account will pause — your data is always safe." },
    { id: "q2", question: "Can I switch plans at any time?", answer: "Absolutely. Upgrade or downgrade at any time from your billing settings. When upgrading, you'll get immediate access to new features. Downgrades take effect at the next billing cycle." },
    { id: "q3", question: "What integrations are available?", answer: "We support 50+ native integrations including Salesforce, HubSpot, Slack, Stripe, QuickBooks, Google Workspace, and more. Our API also lets you build custom connections." },
    { id: "q4", question: "Is my data secure?", answer: "Security is our top priority. We're SOC2 Type II certified, GDPR compliant, and use AES-256 encryption at rest and TLS 1.3 in transit." },
    { id: "q5", question: "Do you offer onboarding support?", answer: "Yes! All plans include self-serve onboarding with interactive guides. Growth plans get priority email support, and Enterprise plans include a dedicated customer success manager." },
    { id: "q6", question: "What happens if I exceed my contact limit?", answer: "We'll notify you as you approach your limit. You can upgrade your plan seamlessly, or purchase additional contact packs." },
  ],
  subscribers: [
    { id: "sub1", email: "alice@example.com", date: "2024-12-01" },
    { id: "sub2", email: "bob@startup.io", date: "2024-12-03" },
    { id: "sub3", email: "carol@tech.co", date: "2024-12-05" },
  ],
  settings: {
    siteName: "Mintgro",
    siteDescription: "Business Growth Made Simple",
    contactEmail: "hello@mintgro.com",
    contactPhone: "+1 (555) 123-4567",
    contactAddress: "San Francisco, CA",
    twitterUrl: "https://twitter.com/mintgro",
    linkedinUrl: "https://linkedin.com/company/mintgro",
    githubUrl: "https://github.com/mintgro",
  },
};

// Server-side: in-memory store
let serverData: SiteData = JSON.parse(JSON.stringify(DEFAULT_DATA));

export function getData(): SiteData {
  return serverData;
}

export function updateData(partial: Partial<SiteData>): SiteData {
  serverData = { ...serverData, ...partial };
  return serverData;
}

export function resetData(): SiteData {
  serverData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  return serverData;
}

export { DEFAULT_DATA };