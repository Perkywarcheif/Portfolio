import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

type ExtractedProfile = {
  name?: string;
  headline?: string;
  location?: string;
  email?: string;
  phone?: string;
  links?: { label: string; url?: string }[];
  summary?: string;
  experience?: {
    title: string;
    company: string;
    date: string;
    location?: string;
    bullets: string[];
  }[];
  education?: {
    school: string;
    degree: string;
    date: string;
    meta?: string;
  }[];
  skills?: string[];
  certifications?: string[];
  projects?: {
    name: string;
    desc: string;
    tools?: string[];
    linkLabel?: string;
  }[];
};

const seededProfile: ExtractedProfile = {
  name: "M Anirudh",
  headline:
    "Google Cloud Arcade Facilitator • Google Student Ambassador • Web Dev • AI/ML • Cloud",
  location: "Tirupati Urban, Andhra Pradesh, India",
  email: "anirudh.mamilla1@gmail.com",
  phone: "+91 950255 0770",
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/m-anirudh-898a68257" },
    { label: "GitHub", url: "https://github.com/" },
  ],
  summary:
    "Hi, I’m Anirudh — a Computer Science student passionate about Web Development, AI, and Cloud Computing. I enjoy building real-world projects and exploring new technologies. I’m currently a Google Cloud Arcade Facilitator, helping others learn cloud skills through fun, interactive activities. I’m always eager to learn, grow, and connect with people in tech.",
  experience: [
    {
      title: "Web Developer Intern",
      company: "APSCHE (Remote)",
      date: "May 2025 – Jul 2025",
      bullets: [
        "Built responsive web pages with HTML, CSS, JavaScript, Bootstrap (↑ responsiveness 30%).",
        "Enhanced and integrated REST APIs + interactive features (↑ engagement 25%).",
        "Optimized frontend–backend communication (↓ API response time 20%).",
      ],
    },
    {
      title: "ML Engineer Intern",
      company: "Edunet Foundation (Remote)",
      date: "Apr 2025 – May 2025",
      bullets: [
        "Completed Microsoft-initiated internship on AI foundations and machine learning.",
        "Built AI Skin Disease Analyzer using TensorFlow + Scikit-learn (88% accuracy).",
        "Created end-to-end ML pipeline and deployed with Streamlit.",
      ],
    },
    {
      title: "Frontend Developer",
      company: "YHills (Remote)",
      date: "Feb 2025 – Present",
      bullets: [
        "Create and polish the visual parts of web apps using HTML, CSS and JavaScript.",
      ],
    },
    {
      title: "Full-stack Developer Intern",
      company: "TheSmartBridge",
      date: "May 2025 – Jul 2025",
      bullets: [
        "Built dynamic, responsive, scalable MERN applications while strengthening full‑stack fundamentals.",
      ],
    },
    {
      title: "Volunteer",
      company: "Liquid Trees",
      date: "Nov 2023 – Mar 2024",
      bullets: [
        "Volunteered for climate innovation — supporting native diatom growth initiatives.",
      ],
    },
  ],
  education: [
    {
      school: "SV College of Engineering",
      degree: "BTech — Computer Science / AI & ML",
      date: "2023 – 2026",
      meta: "GPA: 8.93",
    },
    {
      school: "Sree Vidyanikethan Engineering College",
      degree: "Diploma — Computer Science",
      date: "2020 – 2023",
      meta: "83.66%",
    },
    {
      school: "Prasanna Bharathi H School",
      degree: "Secondary Education",
      date: "2015 – 2020",
      meta: "95.5%",
    },
  ],
  certifications: [
    "Salesforce: Certified AI Associate (2024)",
    "ServiceNow: Certified System Administrator (2025)",
    "ServiceNow: Certified Application Developer (2025)",
    "Oracle: Certified Generative AI Professional (2025)",
    "Microsoft Learn: 100+ badges",
  ],
  skills: [
    "Java",
    "Python",
    "JavaScript",
    "React",
    "TensorFlow",
    "Scikit-learn",
    "Streamlit",
    "MongoDB",
    "MySQL",
    "Docker",
    "GCP",
    "Salesforce",
    "ServiceNow",
  ],
  projects: [
    {
      name: "Learn Hub",
      desc: "Full-stack learning platform with a user‑centric resource interface.",
      tools: ["React", "MongoDB", "HTML", "CSS"],
      linkLabel: "Learn-Hub",
    },
    {
      name: "AI Skin Disease Analyzer",
      desc: "Classifier + Streamlit app for model predictions and usability.",
      tools: ["Python", "TensorFlow/Keras", "Scikit-learn", "Pandas", "Streamlit"],
      linkLabel: "skin-disease-analyzer",
    },
    {
      name: "Cold Mail AI Agent",
      desc: "Containerized automation agent integrating email workflows with n8n and Docker.",
      tools: ["n8n", "Docker", "Google APIs"],
    },
  ],
};

function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of els) {
      el.classList.add("reveal");
      io.observe(el);
    }

    return () => io.disconnect();
  }, []);
}

function ParticlesCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? 520;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const points = Array.from({ length: 64 }).map(() => ({
      x: rand(0, canvas.width / dpr),
      y: rand(0, canvas.height / dpr),
      r: rand(0.8, 2.1),
      vx: rand(-0.22, 0.22),
      vy: rand(-0.18, 0.18),
      a: rand(0.08, 0.22),
    }));

    const tick = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      // glow dots
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -40) p.x = w + 40;
        if (p.x > w + 40) p.x = -40;
        if (p.y < -40) p.y = h + 40;
        if (p.y > h + 40) p.y = -40;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // connective lines
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const t = 1 - dist / 120;
            ctx.strokeStyle = `rgba(47, 233, 255, ${0.09 * t})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full opacity-70"
      aria-hidden="true"
      data-testid="canvas-particles"
    />
  );
}

function Nav() {
  const items = useMemo(
    () => [
      { id: "about", label: "About", icon: "👋" },
      { id: "experience", label: "Experience", icon: "💼" },
      { id: "skills", label: "Skills", icon: "🧠" },
      { id: "education", label: "Education", icon: "🎓" },
      { id: "projects", label: "Projects", icon: "✨" },
      { id: "contact", label: "Contact", icon: "📬" },
    ],
    [],
  );

  return (
    <div className="fixed inset-x-0 top-4 z-50">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="glass grain flex items-center justify-between rounded-2xl px-3 py-2">
          <a
            href="#top"
            className="group flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-white/5"
            data-testid="link-home"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Anirudh</div>
              <div className="text-xs text-muted-foreground">Portfolio</div>
            </div>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {items.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                data-testid={`link-nav-${it.id}`}
              >
                <span className="mr-2" aria-hidden="true">
                  {it.icon}
                </span>
                {it.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden md:inline-flex"
              data-testid="link-contact"
            >
              <Button size="sm" className="rounded-xl">
                Let’s talk
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  icon,
  eyebrow,
  title,
  subtitle,
  id,
}: {
  icon: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  id: string;
}) {
  return (
    <div className="mb-8" id={id}>
      <div
        className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm text-muted-foreground ring-1 ring-white/10"
        data-testid={`badge-section-${id}`}
      >
        <span aria-hidden="true">{icon}</span>
        <span className="font-medium">{eyebrow}</span>
      </div>
      <h2
        className="mt-3 font-serif text-3xl font-semibold tracking-tight md:text-4xl"
        data-testid={`text-title-${id}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base"
          data-testid={`text-subtitle-${id}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default function Portfolio() {
  useRevealOnScroll();

  const [profile, setProfile] = useState<ExtractedProfile>(seededProfile);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [pdfName, setPdfName] = useState<string | null>(null);

  const primaryLink = profile.links?.find((l) => l.label.toLowerCase().includes("linkedin"));

  const onPickImages = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).slice(0, 3);
    const urls = arr.map((f) => URL.createObjectURL(f));
    setHeroImages((prev) => {
      prev.forEach((u) => URL.revokeObjectURL(u));
      return urls;
    });
  };

  const onParsePdf = async (file: File | null) => {
    if (!file) return;
    setPdfName(file.name);

    // Mockup mode: client-side only. We surface a friendly notice and still generate
    // a beautiful site using the extracted info already provided.
    toast({
      title: "PDF received",
      description:
        "This prototype uses your uploaded PDF as input, but parsing is simplified in mockup mode. Your portfolio is still generated from the details you shared.",
    });

    // In a real version, we'd parse the PDF text here (client-side pdf.js or server-side).
    // For the mockup, keep the seeded profile.
    setProfile(seededProfile);
  };

  const downloadResume = () => {
    toast({
      title: "Resume",
      description: "Hook this to your hosted resume file when ready.",
    });
  };

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground" id="top">
      <div className="pointer-events-none fixed inset-0 -z-10 aurora" aria-hidden="true" />

      <Nav />

      {/* HERO */}
      <header className="relative mx-auto w-full max-w-6xl px-4 pt-28 md:pt-36">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <ParticlesCanvas />
          <div className="relative grid gap-10 p-6 md:grid-cols-[1.15fr_.85fr] md:gap-14 md:p-10">
            <div data-reveal>
              <div
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground ring-1 ring-white/10"
                data-testid="badge-hero-status"
              >
                <span aria-hidden="true">⚡</span>
                Open to internships & collaborations
              </div>

              <h1
                className="mt-4 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
                data-testid="text-hero-name"
              >
                {profile.name}
                <span className="text-primary">.</span>
              </h1>
              <p
                className="mt-4 max-w-xl text-balance text-base text-muted-foreground md:text-lg"
                data-testid="text-hero-headline"
              >
                {profile.headline}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  data-testid="button-view-work"
                >
                  <Button className="rounded-xl">
                    View work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <Button
                  variant="secondary"
                  className="rounded-xl"
                  onClick={downloadResume}
                  data-testid="button-download-resume"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download resume
                </Button>

                {primaryLink?.url ? (
                  <a
                    href={primaryLink.url}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="link-linkedin"
                  >
                    <Button variant="ghost" className="rounded-xl">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                      <ExternalLink className="ml-2 h-4 w-4 opacity-60" />
                    </Button>
                  </a>
                ) : null}

                {profile.links?.some((l) => l.label.toLowerCase().includes("github")) ? (
                  <a
                    href={profile.links?.find((l) => l.label.toLowerCase().includes("github"))?.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="link-github"
                  >
                    <Button variant="ghost" className="rounded-xl">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                      <ExternalLink className="ml-2 h-4 w-4 opacity-60" />
                    </Button>
                  </a>
                ) : null}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2" data-testid="text-hero-location">
                  <MapPin className="h-4 w-4 text-primary" />
                  {profile.location}
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 hover:text-foreground"
                  data-testid="link-email"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  {profile.email}
                </a>
                <a
                  href={`tel:${profile.phone}`}
                  className="inline-flex items-center gap-2 hover:text-foreground"
                  data-testid="link-phone"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  {profile.phone}
                </a>
              </div>
            </div>

            <div className="relative" data-reveal>
              <div className="glass grain rounded-3xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold" data-testid="text-tools-title">
                      Build this from your PDF
                    </div>
                    <div
                      className="text-xs text-muted-foreground"
                      data-testid="text-tools-subtitle"
                    >
                      Upload your LinkedIn PDF + 2–3 photos
                    </div>
                  </div>
                  <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground ring-1 ring-white/10">
                    Prototype
                  </div>
                </div>

                <div className="mt-4 grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <label
                      className="text-xs font-medium text-muted-foreground"
                      htmlFor="pdf"
                      data-testid="label-pdf"
                    >
                      LinkedIn PDF
                    </label>
                    <input
                      id="pdf"
                      type="file"
                      accept="application/pdf"
                      className="mt-2 block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-foreground hover:file:bg-white/15"
                      onChange={(e) => void onParsePdf(e.target.files?.[0] ?? null)}
                      data-testid="input-pdf"
                    />
                    {pdfName ? (
                      <div className="mt-2 text-xs text-muted-foreground" data-testid="text-pdf-name">
                        Selected: {pdfName}
                      </div>
                    ) : null}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <label
                      className="text-xs font-medium text-muted-foreground"
                      htmlFor="photos"
                      data-testid="label-photos"
                    >
                      Your photos (2–3)
                    </label>
                    <input
                      id="photos"
                      type="file"
                      accept="image/*"
                      multiple
                      className="mt-2 block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-foreground hover:file:bg-white/15"
                      onChange={(e) => onPickImages(e.target.files)}
                      data-testid="input-photos"
                    />

                    <div className="mt-3 grid grid-cols-3 gap-2" data-testid="grid-photos">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                          data-testid={`card-photo-${i}`}
                        >
                          {heroImages[i] ? (
                            <img
                              src={heroImages[i]}
                              alt={`Uploaded photo ${i + 1}`}
                              className="h-full w-full object-cover"
                              loading="lazy"
                              data-testid={`img-photo-${i}`}
                            />
                          ) : (
                            <div
                              className="flex h-full w-full items-center justify-center text-xs text-muted-foreground"
                              data-testid={`text-photo-empty-${i}`}
                            >
                              Add
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-xs font-medium text-muted-foreground" data-testid="text-profile-preview">
                    Preview data (from your resume + LinkedIn snapshot)
                  </div>
                  <div className="mt-2 text-sm font-semibold" data-testid="text-preview-name">
                    {profile.name}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground" data-testid="text-preview-headline">
                    {profile.headline}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-14 md:pb-28">
        <section className="mt-10" aria-labelledby="about" data-testid="section-about">
          <SectionTitle
            id="about"
            icon="👋"
            eyebrow="About"
            title="A little about me"
            subtitle="A modern, recruiter-friendly narrative with proof of work."
          />

          <div className="grid gap-6 md:grid-cols-[1.1fr_.9fr]">
            <Card className="glass grain border-white/10 p-6" data-reveal data-testid="card-about">
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base" data-testid="text-about-summary">
                {profile.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2" data-testid="list-certifications">
                {profile.certifications?.slice(0, 6).map((c) => (
                  <Badge
                    key={c}
                    variant="secondary"
                    className="rounded-full bg-white/7 text-foreground ring-1 ring-white/10"
                    data-testid={`badge-cert-${c.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    {c}
                  </Badge>
                ))}
              </div>
            </Card>

            <div className="grid gap-6" data-reveal>
              <Card className="glass grain border-white/10 p-6" data-testid="card-about-highlights">
                <div className="text-sm font-semibold" data-testid="text-highlights-title">
                  Highlights
                </div>
                <div className="mt-4 grid gap-3 text-sm">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4" data-testid="card-highlight-1">
                    <div className="text-muted-foreground">Role</div>
                    <div className="mt-1 font-semibold">Student • Developer • Cloud Facilitator</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4" data-testid="card-highlight-2">
                    <div className="text-muted-foreground">Focus</div>
                    <div className="mt-1 font-semibold">Web, AI/ML, Cloud, Automation</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4" data-testid="card-highlight-3">
                    <div className="text-muted-foreground">Strengths</div>
                    <div className="mt-1 font-semibold">Ownership • Fast learning • Clear communication</div>
                  </div>
                </div>
              </Card>

              <Card className="glass grain border-white/10 p-6" data-testid="card-about-cta">
                <div className="text-sm font-semibold">Quick links</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={primaryLink?.url || "#"} target="_blank" rel="noreferrer" data-testid="link-about-linkedin">
                    <Button variant="secondary" className="rounded-xl">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Button>
                  </a>
                  <a
                    href={profile.links?.find((l) => l.label.toLowerCase().includes("github"))?.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="link-about-github"
                  >
                    <Button variant="secondary" className="rounded-xl">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </a>
                  <a href="#contact" data-testid="link-about-contact">
                    <Button className="rounded-xl">
                      Contact
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="mt-16" aria-labelledby="experience" data-testid="section-experience">
          <SectionTitle
            id="experience"
            icon="💼"
            eyebrow="Experience"
            title="Impact-focused work"
            subtitle="A timeline-style view of what I did and what changed because of it."
          />

          <div className="grid gap-4">
            {profile.experience?.map((e, idx) => (
              <Card
                key={`${e.company}-${idx}`}
                className="glass grain border-white/10 p-6"
                data-reveal
                data-testid={`card-exp-${idx}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-muted-foreground" data-testid={`text-exp-date-${idx}`}>
                      {e.date}
                    </div>
                    <div className="mt-1 text-lg font-semibold" data-testid={`text-exp-title-${idx}`}>
                      {e.title}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`text-exp-company-${idx}`}>
                      {e.company}
                    </div>
                  </div>
                </div>

                <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3" data-testid={`row-exp-bullet-${idx}-${j}`}>
                      <span className="mt-[6px] h-1.5 w-1.5 flex-none rounded-full bg-primary/80" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="mt-16" aria-labelledby="skills" data-testid="section-skills">
          <SectionTitle
            id="skills"
            icon="🧠"
            eyebrow="Skills"
            title="Tools I use to ship"
            subtitle="A practical mix of languages, frameworks, and platforms."
          />

          <Card className="glass grain border-white/10 p-6" data-reveal data-testid="card-skills">
            <div className="flex flex-wrap gap-2" data-testid="grid-skills">
              {profile.skills?.map((s) => (
                <Badge
                  key={s}
                  className="rounded-full bg-white/7 text-foreground ring-1 ring-white/10 hover:bg-white/10"
                  data-testid={`badge-skill-${s.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  {s}
                </Badge>
              ))}
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {["Web", "AI/ML", "Cloud"].map((grp, i) => (
                <div
                  key={grp}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  data-testid={`card-skillgroup-${i}`}
                >
                  <div className="text-sm font-semibold" data-testid={`text-skillgroup-title-${i}`}>
                    {grp}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground" data-testid={`text-skillgroup-desc-${i}`}>
                    {grp === "Web"
                      ? "React, UI polish, responsive layouts"
                      : grp === "AI/ML"
                        ? "TensorFlow, Scikit-learn, evaluation"
                        : "GCP fundamentals, automation, learning communities"}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* EDUCATION */}
        <section className="mt-16" aria-labelledby="education" data-testid="section-education">
          <SectionTitle
            id="education"
            icon="🎓"
            eyebrow="Education"
            title="Strong fundamentals"
            subtitle="Clear, recruiter-readable education timeline."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {profile.education?.map((ed, idx) => (
              <Card
                key={`${ed.school}-${idx}`}
                className="glass grain border-white/10 p-6"
                data-reveal
                data-testid={`card-edu-${idx}`}
              >
                <div className="text-sm text-muted-foreground" data-testid={`text-edu-date-${idx}`}>
                  {ed.date}
                </div>
                <div className="mt-2 text-lg font-semibold" data-testid={`text-edu-degree-${idx}`}>
                  {ed.degree}
                </div>
                <div className="mt-1 text-sm text-muted-foreground" data-testid={`text-edu-school-${idx}`}>
                  {ed.school}
                </div>
                {ed.meta ? (
                  <div className="mt-4 text-sm" data-testid={`text-edu-meta-${idx}`}>
                    <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-muted-foreground ring-1 ring-white/10">
                      {ed.meta}
                    </span>
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="mt-16" aria-labelledby="projects" data-testid="section-projects">
          <SectionTitle
            id="projects"
            icon="✨"
            eyebrow="Projects"
            title="Proof of work"
            subtitle="A few projects that show range: product thinking, ML, automation."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {profile.projects?.map((p, idx) => (
              <Card
                key={`${p.name}-${idx}`}
                className="glass grain border-white/10 p-6"
                data-reveal
                data-testid={`card-project-${idx}`}
              >
                <div className="text-lg font-semibold" data-testid={`text-project-name-${idx}`}>
                  {p.name}
                </div>
                <p className="mt-2 text-sm text-muted-foreground" data-testid={`text-project-desc-${idx}`}>
                  {p.desc}
                </p>

                {p.tools?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2" data-testid={`list-project-tools-${idx}`}>
                    {p.tools.slice(0, 6).map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="rounded-full bg-white/7 text-foreground ring-1 ring-white/10"
                        data-testid={`badge-project-tool-${idx}-${t.replace(/\s+/g, "-").toLowerCase()}`}
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                ) : null}

                {p.linkLabel ? (
                  <div className="mt-5">
                    <Button
                      variant="secondary"
                      className="w-full rounded-xl"
                      onClick={() =>
                        toast({
                          title: "Project link",
                          description: "Add your real project URL here when ready.",
                        })
                      }
                      data-testid={`button-project-link-${idx}`}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {p.linkLabel}
                    </Button>
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="mt-16" aria-labelledby="contact" data-testid="section-contact">
          <SectionTitle
            id="contact"
            icon="📬"
            eyebrow="Contact"
            title="Let’s build something"
            subtitle="Quick message + links. This is a frontend-only prototype (no email sending yet)."
          />

          <div className="grid gap-6 md:grid-cols-[1fr_.9fr]">
            <Card className="glass grain border-white/10 p-6" data-reveal data-testid="card-contact-form">
              <div className="grid gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground" htmlFor="name" data-testid="label-contact-name">
                    Your name
                  </label>
                  <Input id="name" placeholder="Jane Recruiter" className="mt-2" data-testid="input-contact-name" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground" htmlFor="email" data-testid="label-contact-email">
                    Your email
                  </label>
                  <Input id="email" placeholder="jane@company.com" className="mt-2" data-testid="input-contact-email" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground" htmlFor="message" data-testid="label-contact-message">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="What role are you hiring for?"
                    className="mt-2 min-h-28"
                    data-testid="input-contact-message"
                  />
                </div>
                <Button
                  className="mt-1 rounded-xl"
                  onClick={() =>
                    toast({
                      title: "Message saved",
                      description: "In this prototype we don’t send emails yet — but the form UX is ready.",
                    })
                  }
                  data-testid="button-contact-submit"
                >
                  Send message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            <div className="grid gap-6" data-reveal>
              <Card className="glass grain border-white/10 p-6" data-testid="card-contact-links">
                <div className="text-sm font-semibold" data-testid="text-contact-links-title">
                  Reach me directly
                </div>
                <div className="mt-4 grid gap-3 text-sm">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/7"
                    data-testid="link-contact-email"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      {profile.email}
                    </span>
                    <ExternalLink className="h-4 w-4 opacity-60" />
                  </a>
                  <a
                    href={primaryLink?.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/7"
                    data-testid="link-contact-linkedin"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-primary" />
                      LinkedIn
                    </span>
                    <ExternalLink className="h-4 w-4 opacity-60" />
                  </a>
                  <a
                    href={profile.links?.find((l) => l.label.toLowerCase().includes("github"))?.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/7"
                    data-testid="link-contact-github"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Github className="h-4 w-4 text-primary" />
                      GitHub
                    </span>
                    <ExternalLink className="h-4 w-4 opacity-60" />
                  </a>
                </div>
              </Card>

              <Card className="glass grain border-white/10 p-6" data-testid="card-footer">
                <div className="text-sm text-muted-foreground" data-testid="text-footer">
                  © {year} {profile.name}. Built with a glassy, bold aesthetic.
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
