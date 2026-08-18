import { SiteData } from "./types";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "site-data.json");

const DEFAULT_DATA: SiteData = {
  header: {
    logo: { text: "Mintgro", tagline: "Business Growth\nMade Simple" },
    navLinks: [
      { label: "About", href: "/about", hasDropdown: true },
      { label: "Solutions", href: "/solutions", hasDropdown: true },
      { label: "Modules", href: "/modules", hasDropdown: true },
      { label: "Resources", href: "/resources", hasDropdown: true },
    ],
    ctaButton: { label: "Start Free Trial", href: "#pricing" },
  },
  logoBar: {
    heading: "Trusted by growing businesses",
    subtext: "One platform to manage the work behind your growth.",
    logos: [
      { name: "Mintgro" },
      { name: "Mintgro" },
      { name: "Mintgro" },
      { name: "Mintgro" },
      { name: "Mintgro" },
      { name: "Mintgro" },
    ],
  },
  hero: {
    eyebrow: "All-in-one business growth platform",
    title: "Business Growth Made Simple with Mintgro",
    description:
      "Manage your customers, streamline your operations and grow your business with one simple platform built around the way you work.",
    ctaPrimary: { label: "Start Free Trial", href: "#pricing" },
    ctaSecondary: { label: "Book a Demo", href: "#contact" },
    trustBadges: ["No credit card", "Easy setup", "Cancel anytime"],
  },
  challenges: {
    eyebrow: "Built for real businesses",
    title: "Turn Everyday Challenges into Business Success",
    description:
      "Replace fragmented tools and repetitive work with a system that makes your business easier to run.",
    problems: [
      "Too many spreadsheets",
      "Leads getting missed",
      "Manual follow-ups",
      "Scattered customer data",
      "No clear business visibility",
    ],
    solutions: [
      "Everything in one place",
      "Automated follow-ups",
      "Clear customer pipeline",
      "Real-time visibility",
      "Simple repeatable workflows",
    ],
  },
  crm: {
    badge: "Powerful modules",
    title: "Everything You Need to Run Your Business",
    description:
      "Connect sales, customers, reporting and daily operations in one easy-to-use workspace.",
    categoryLabel: "CRM & Sales",
    featureTitle: "Keep every opportunity moving forward.",
    featureDescription:
      "See your leads, customers and sales pipeline at a glance. Give your team the context they need to follow up at the right time.",
    featureList: [
      { icon: "Users", label: "Lead tracking" },
      { icon: "ChartColumn", label: "Sales analytics" },
      { icon: "TrendingUp", label: "Growth forecasting" },
    ],
    dashboardStats: [
      { label: "Leads", value: "1,248" },
      { label: "Deals", value: "386" },
      { label: "Revenue", value: "42.8L" },
    ],
  },
  industries: [
    { id: "i1", icon: "HeartPulse", name: "Healthcare", desc: "Adaptable tools for teams, customers and processes in this industry." },
    { id: "i2", icon: "GraduationCap", name: "Education", desc: "Adaptable tools for teams, customers and processes in this industry." },
    { id: "i3", icon: "BriefcaseBusiness", name: "Professional Services", desc: "Adaptable tools for teams, customers and processes in this industry." },
    { id: "i4", icon: "ShoppingBag", name: "Retail", desc: "Adaptable tools for teams, customers and processes in this industry." },
    { id: "i5", icon: "Factory", name: "Manufacturing", desc: "Adaptable tools for teams, customers and processes in this industry." },
    { id: "i6", icon: "Building2", name: "Real Estate", desc: "Adaptable tools for teams, customers and processes in this industry." },
  ],
  personalization: {
    categoryLabel: "Personalization",
    title: "Personalized experience for every team.",
    description:
      "Give every person a workspace that keeps their priorities, customers and actions clear.",
    features: [
      { id: "pf1", icon: "Sparkles", title: "Smart insights", description: "See the information that matters most." },
      { id: "pf2", icon: "Target", title: "Personal goals", description: "Keep teams focused on meaningful outcomes." },
      { id: "pf3", icon: "Bell", title: "Smart reminders", description: "Never miss the next important action." },
      { id: "pf4", icon: "ChartColumn", title: "Live reporting", description: "Understand performance without spreadsheets." },
    ],
  },
  experience: {
    eyebrow: "See it in action",
    title: "Experience Mintgro",
    description: "One connected experience across the devices your team already uses.",
    sidebarItems: ["Overview", "Customers", "Sales", "Reports", "Settings"],
    stats: [
      { label: "Revenue", value: "84.2L" },
      { label: "Customers", value: "2,481" },
      { label: "Growth", value: "+24.8%" },
    ],
    devices: ["Desktop", "Tablet", "Mobile"],
  },
  steps: [
    { id: "s1", icon: "UserPlus", step: "01", title: "Create your account", desc: "Get started in minutes." },
    { id: "s2", icon: "Settings2", step: "02", title: "Set up your business", desc: "Add your team and workflows." },
    { id: "s3", icon: "Rocket", step: "03", title: "Customize Mintgro", desc: "Make the workspace fit your process." },
    { id: "s4", icon: "ChartLine", step: "04", title: "Grow with confidence", desc: "Track progress and improve." },
  ],
  pricing: {
    eyebrow: "Simple pricing",
    title: "Flexible pricing that grows with your business",
    description: "Start small and move up when your business needs more.",
    tiers: [
      {
        id: "p1",
        name: "Starter",
        price: 19,
        priceLabel: "per user / month",
        desc: "For small teams getting started.",
        features: ["CRM & contacts", "Basic automation", "Email support"],
        cta: "Get Started",
        popular: false,
      },
      {
        id: "p2",
        name: "Growth",
        price: 39,
        priceLabel: "per user / month",
        desc: "For growing businesses.",
        features: ["Everything in Starter", "Advanced workflows", "Reports & analytics", "Priority support"],
        cta: "Get Started",
        popular: true,
      },
      {
        id: "p3",
        name: "Scale",
        price: 69,
        priceLabel: "per user / month",
        desc: "For established teams.",
        features: ["Everything in Growth", "Advanced permissions", "Custom reports", "Team collaboration"],
        cta: "Get Started",
        popular: false,
      },
      {
        id: "p4",
        name: "Enterprise",
        price: null,
        priceLabel: "",
        desc: "For complex organizations.",
        features: ["Custom setup", "Dedicated support", "Advanced security"],
        cta: "Get Started",
        popular: false,
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    description: "Quick answers to the questions your customers are most likely to ask.",
    items: [
      { id: "q1", question: "What is Mintgro?", answer: "Mintgro is a business growth platform that brings customer management, sales, workflows and reporting together." },
      { id: "q2", question: "Who is Mintgro for?", answer: "Mintgro is designed for small to mid-sized businesses across healthcare, education, retail, professional services and more." },
      { id: "q3", question: "Can I try Mintgro for free?", answer: "Yes. You can start with a free trial — no credit card required." },
      { id: "q4", question: "Can I customize the platform?", answer: "Absolutely. Mintgro supports custom workflows, fields and dashboards to match your process." },
      { id: "q5", question: "How does onboarding work?", answer: "We provide guided onboarding with step-by-step setup, plus dedicated support for larger teams." },
      { id: "q6", question: "Can Mintgro integrate with other tools?", answer: "Yes. Mintgro integrates with popular tools including email, calendars, payment systems and more." },
    ],
    ctaButtons: [
      { label: "Contact Us", href: "#contact", style: "light" },
      { label: "Start Free Trial", href: "#pricing", style: "primary" },
    ],
  },
  ctaSection: {
    eyebrow: "Ready to grow?",
    title: "Stay Ahead. Grow Smarter.",
    description: "Build a simpler, more connected business with Mintgro.",
    ctaPrimary: { label: "Start Free Trial", href: "#pricing" },
    ctaSecondary: { label: "Book a Demo", href: "#contact" },
  },
  subscribers: [
    { id: "sub1", email: "alice@example.com", date: "2024-12-01" },
    { id: "sub2", email: "bob@startup.io", date: "2024-12-03" },
    { id: "sub3", email: "carol@tech.co", date: "2024-12-05" },
  ],
  settings: {
    siteName: "Mintgro",
    siteDescription: "Business Growth Made Simple",
    contactEmail: "hello@mintgro.com",
  },
};

function loadFromDisk(): SiteData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(raw) as SiteData;
    }
  } catch {
    // If file is corrupted, fall back to defaults
  }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveToDisk(data: SiteData): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Silently fail if disk write fails
  }
}

let serverData: SiteData = loadFromDisk();

export function getData(): SiteData {
  return serverData;
}

export function updateData(partial: Partial<SiteData>): SiteData {
  serverData = { ...serverData, ...partial };
  saveToDisk(serverData);
  return serverData;
}

export function resetData(): SiteData {
  serverData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  saveToDisk(serverData);
  return serverData;
}

export { DEFAULT_DATA };
