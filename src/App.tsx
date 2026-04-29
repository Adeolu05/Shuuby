import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'motion/react';
import { ArrowRight, ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react';

/* ─── Shared Button ─── */
const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const base = "inline-flex items-center justify-center font-sans tracking-[0.15em] uppercase transition-all duration-400 cursor-pointer text-[11px] font-semibold";
  const v: Record<string, string> = {
    primary: "px-8 py-3.5 bg-[#C4A97D] text-[#0A0A0A] hover:bg-[#D4BC94] border border-[#C4A97D]",
    secondary: "px-8 py-3.5 border border-[rgba(245,240,232,0.15)] text-[#F5F0E8] bg-transparent hover:border-[#C4A97D] hover:text-[#C4A97D]",
    ghost: "bg-transparent text-[#C4A97D] hover:text-[#D4BC94] border-b border-[#C4A97D] pb-1 px-0",
  };
  return <button className={`${base} ${v[variant] || v.primary} ${className}`} {...props}>{children}</button>;
};

/* ─── Animated Counter ─── */
const Counter = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
      <span className="block font-serif text-5xl text-[#C4A97D] mb-2">{value}</span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#6B6560]">{label}</span>
    </motion.div>
  );
};

/* ═══════════════════ NAVBAR ═══════════════════ */
const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY.current && y > 200);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['About', 'Writing', 'Series', 'Mission', 'Contact'];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-center transition-all duration-500 ${scrolled ? 'glass-nav' : 'glass-nav-transparent'}`}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full max-w-7xl px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="font-serif text-xl tracking-tight text-[#F5F0E8]">Olasubomi<span className="text-[#C4A97D]">.</span></a>
          <nav className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="animated-underline text-[10px] uppercase tracking-[0.2em] font-medium text-[#A8A29E] hover:text-[#F5F0E8] transition-colors">{l}</a>
            ))}
            <Button variant="primary" className="ml-4">Get In Touch</Button>
          </nav>
          <button className="lg:hidden text-[#F5F0E8]" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="absolute top-6 right-6 text-[#F5F0E8]" onClick={() => setMenuOpen(false)}><X size={28} /></button>
            <nav className="flex flex-col items-center gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="font-serif text-4xl text-[#F5F0E8] hover:text-[#C4A97D] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMenuOpen(false)}
                >{l}</motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ═══════════════════ HERO ═══════════════════ */
const HeroSection = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, -60]);

  return (
    <section className="relative min-h-screen flex items-center border-b border-[rgba(245,240,232,0.08)] overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 30% 40%, rgba(196,169,125,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Text */}
        <motion.div className="lg:col-span-7" style={{ y: yText }}>
          <motion.span
            className="section-label mb-6 block"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Storyteller · Relationship Curator · Criminology Enthusiast
          </motion.span>

          <motion.h1
            className="hero-title font-serif font-light text-[#F5F0E8] mb-8"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Exploring love,<br/>
            growth <em className="italic text-[#C4A97D]">&amp;</em> human<br/>
            behaviour.
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            className="mb-8 h-[1px] bg-gradient-to-r from-[#C4A97D] to-transparent"
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />

          <motion.p
            className="text-lg md:text-xl text-[#A8A29E] font-light max-w-xl mb-12 font-sans leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            Blending storytelling, reflection, humour and social observation to capture the realities of modern relationships and personal evolution.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <Button variant="primary">Read the Newsletter</Button>
            <Button variant="secondary">Explore Series</Button>
          </motion.div>
        </motion.div>

        {/* Right: Portrait */}
        <motion.div
          className="lg:col-span-5 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative w-full max-w-sm aspect-[3/4]">
            {/* Gold border accent */}
            <div className="absolute -inset-3 border border-[rgba(196,169,125,0.2)] rounded-sm" />
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-[#C4A97D]" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-[#C4A97D]" />
            <div className="w-full h-full overflow-hidden rounded-sm">
              <img
                src="/images/shubby-portrait.jpg"
                alt="Olasubomi Adegun - Storyteller & Relationship Curator"
                className="w-full h-full object-cover object-top"
                style={{ filter: 'brightness(0.9) contrast(1.05)' }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#6B6560]">Scroll</span>
        <ChevronDown size={16} className="text-[#6B6560]" />
      </motion.div>
    </section>
  );
};

/* ═══════════════════ FEATURED WORK ═══════════════════ */
const FeaturedWork = () => {
  const works = [
    { title: "How to Know If Your Partner Is Cheating on You", category: "Humour & Insight", publication: "Your Fairy Godfriend", desc: "An exploration of trust and relationship behaviour, blending storytelling with sharp social commentary and real engagement." },
    { title: "The Perfect Date Debate", category: "Cultural Storytelling", publication: "Amala Story", desc: "A relatable and culturally rich piece that challenges conventional ideas of romance while exploring personal preferences in modern dating." },
    { title: "Dearest Santa", category: "Reflection", publication: "Your Fairy Godfriend", desc: "A reflective and emotionally engaging seasonal newsletter written in a warm, conversational tone, exploring wishes and personal growth." },
  ];

  return (
    <section id="writing" className="border-b border-[rgba(245,240,232,0.08)] py-20 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <span className="section-label">Newsletter Highlights</span>
          <span className="text-[10px] text-[#6B6560] tracking-widest">01 — 03</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
          {works.map((w, i) => (
            <motion.article
              key={i}
              className="group cursor-pointer flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {/* Number */}
              <span className="work-number mb-4">0{i + 1}</span>

              {/* Gold accent line */}
              <div className="accent-line mb-6" />

              <p className="text-[10px] uppercase tracking-widest text-[#6B6560] mb-3">{w.publication} — {w.category}</p>
              <h4 className="font-serif text-xl leading-tight text-[#F5F0E8] group-hover:text-[#C4A97D] transition-colors mb-4 flex-grow">{w.title}</h4>
              <p className="text-[13px] font-light text-[#A8A29E] leading-relaxed mb-6">{w.desc}</p>

              <div className="mt-auto inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#C4A97D] group-hover:gap-3 transition-all">
                Read excerpt <ArrowRight size={12} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════ ABOUT ═══════════════════ */
const AboutPreview = () => (
  <section id="about" className="border-b border-[rgba(245,240,232,0.08)] py-20 md:py-32 px-6 md:px-12 lg:px-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <span className="section-label mb-8 block">The Curator</span>
        <h2 className="text-4xl md:text-5xl font-serif font-light text-[#F5F0E8] tracking-tight mb-10 leading-tight">
          A voice defined by <em className="text-[#C4A97D]">authenticity</em> & curiosity.
        </h2>
        <div className="space-y-6 text-[15px] leading-relaxed font-light text-[#A8A29E]">
          <p>I am a storyteller, relationship curator, and criminology enthusiast who explores love, growth, and human behaviour through writing.</p>
          <p>My work is rooted in emotional honesty, humour, and a deep curiosity about human connection. Through my writing umbrella, <span className="italic text-[#F5F0E8]">Grab A Seat With Shubby</span>, I explore life, identity, and society from multiple distinct angles.</p>
          <p>Beyond writing, I run <span className="italic text-[#F5F0E8]">Love and Links</span>, a matchmaking platform focused on helping individuals form meaningful romantic connections.</p>
        </div>
        <div className="mt-12">
          <Button variant="secondary">Subscribe to Newsletter</Button>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-12"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Headshot */}
        <div className="relative w-full max-w-xs aspect-square overflow-hidden rounded-full border-2 border-[rgba(196,169,125,0.25)] shadow-2xl">
          <img
            src="/images/shubby-headshot.jpg"
            alt="Olasubomi Adegun"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.95) contrast(1.05)' }}
          />
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
          <Counter value="54+" label="Subscribers" />
          <Counter value="4" label="Active Series" />
          <Counter value="50+" label="Articles" />
          <Counter value="∞" label="Curiosity" />
        </div>
      </motion.div>
    </div>
  </section>
);

/* ═══════════════════ SERIES ═══════════════════ */
const SeriesSection = () => {
  const [open, setOpen] = useState<number | null>(null);
  const series = [
    { title: "Dating Market Chronicles", desc: "A witty, chaotic, and deeply observant series blending humour and social observation to unpack modern love, red flags, and relationships." },
    { title: "Let's Talk Criminology", desc: "A reflective series breaking down criminological theories, real-world issues, and social behaviour in a relatable, storytelling format." },
    { title: "Corper's Diary", desc: "Documenting life as an NYSC teacher in a public school. Capturing the humour, chaos, and beauty of authentic classroom experiences." },
    { title: "Diary of a Girl Who's Evolving", desc: "Deeply reflective and poetic journal-style entries exploring personal growth, emotional healing, and the raw process of self-discovery." },
    { title: "Random Rants With Her", desc: "Unfiltered, spontaneous, and personal everyday commentary on life, culture, and whatever comes to mind." },
  ];

  return (
    <section id="series" className="border-b border-[rgba(245,240,232,0.08)] py-20 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-1/3">
            <span className="section-label mb-6 block">Umbrella Platform</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-[#F5F0E8] tracking-tight mb-6">Grab A Seat With Shubby</h2>
            <p className="text-[14px] font-light text-[#A8A29E] leading-relaxed">A multifaceted platform exploring different dimensions of life, identity, emotions, and society through multiple storytelling series.</p>
          </div>
          <div className="lg:w-2/3">
            {series.map((s, i) => (
              <motion.div
                key={i}
                className="border-b border-[rgba(245,240,232,0.08)] group cursor-pointer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="flex items-center justify-between py-6">
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-[11px] text-[#3D3A37] group-hover:text-[#C4A97D] transition-colors w-8">0{i + 1}</span>
                    <h4 className="font-serif text-lg md:text-xl text-[#F5F0E8] group-hover:text-[#C4A97D] transition-colors">{s.title}</h4>
                  </div>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={18} className="text-[#6B6560] group-hover:text-[#C4A97D] transition-colors" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-14 text-[14px] font-light text-[#A8A29E] leading-relaxed max-w-xl">{s.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════ MISSION ═══════════════════ */
const MissionSection = () => {
  const archives = [
    { title: "Cupid's Corner Q&A", date: "Weekly", category: "Community" },
    { title: "Relationship & Dating Surveys", date: "Research", category: "Social Insight" },
    { title: "Your Fairy Godfriend", date: "54 Subs", category: "Newsletter" },
    { title: "Random Rants With Her", date: "Ongoing", category: "Unfiltered Thoughts" },
  ];

  return (
    <section id="mission" className="border-b border-[rgba(245,240,232,0.08)] py-20 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Pull quote */}
        <motion.div
          className="relative flex flex-col justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label mb-8 block">What I'm Building</span>
          <div className="relative decorative-quote">
            <p className="font-[Cormorant_Garamond,serif] text-2xl md:text-3xl leading-snug italic text-[#A8A29E] mb-8">
              I am building a platform that explores human connection through writing, observation, and real-life engagement. It sits at the intersection of storytelling, relationships, and emotional awareness.
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#F5F0E8] block">— Olasubomi Adegun</span>
            <span className="text-[10px] uppercase tracking-widest text-[#6B6560] mt-1 block">Creator, Love and Links</span>
          </div>
        </motion.div>

        {/* Archive list */}
        <div>
          <span className="section-label mb-10 block">Platforms & Initiatives</span>
          <div className="space-y-0">
            {archives.map((item, i) => (
              <React.Fragment key={i}>
                <motion.div
                  className="group cursor-pointer flex justify-between items-center py-5"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#6B6560] mb-1">{item.date} — {item.category}</p>
                    <h4 className="font-serif text-lg text-[#F5F0E8] group-hover:text-[#C4A97D] transition-colors">{item.title}</h4>
                  </div>
                  <ArrowUpRight size={16} className="text-[#3D3A37] group-hover:text-[#C4A97D] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.div>
                {i < archives.length - 1 && <div className="editorial-divider" />}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-12">
            <Button variant="ghost">Explore Love and Links <ArrowRight size={14} className="ml-2 inline" /></Button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════ CONTACT ═══════════════════ */
const Contact = () => (
  <section id="contact" className="py-24 md:py-40 px-6 md:px-12 lg:px-20 text-center relative overflow-hidden">
    {/* Background glow */}
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 60%, rgba(196,169,125,0.05) 0%, transparent 70%)' }} />
    <div className="relative z-10 flex flex-col items-center">
      <motion.span className="section-label mb-8 block" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Connect</motion.span>
      <motion.h2
        className="font-serif font-light text-[#F5F0E8] mb-8 max-w-3xl"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Grab a seat<span className="text-[#C4A97D]">.</span>
      </motion.h2>
      <motion.p className="text-[14px] font-light text-[#A8A29E] mb-12 max-w-xl leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        Subscribe to "Your Fairy Godfriend" for personal reflections, or reach out to explore matchmaking through Love and Links. Let's navigate human connection together.
      </motion.p>
      <motion.div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        <Button variant="primary" className="px-10">Subscribe Now</Button>
        <a href="mailto:hello@example.com" className="animated-underline text-[11px] uppercase tracking-widest font-semibold text-[#F5F0E8] hover:text-[#C4A97D] transition-colors pb-1">
          hello@example.com
        </a>
      </motion.div>
      <div className="flex gap-10">
        {['Instagram', 'Twitter', 'Newsletter'].map(s => (
          <a key={s} href="#" className="text-[10px] uppercase tracking-widest font-semibold text-[#6B6560] hover:text-[#C4A97D] transition-colors">{s}</a>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════ FOOTER ═══════════════════ */
const Footer = () => (
  <footer className="border-t border-[rgba(245,240,232,0.08)] py-8 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D3A37]">
      <div>&copy; {new Date().getFullYear()} Olasubomi Adegun (Shubby). All rights reserved.</div>
      <div>Curated with intention / Based in Nigeria</div>
      <div className="italic normal-case tracking-normal text-[11px] text-[#6B6560]">Navigating Human Connection</div>
    </div>
  </footer>
);

/* ═══════════════════ APP ═══════════════════ */
export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] overflow-x-hidden grain-overlay">
      <NavBar />
      <main>
        <HeroSection />
        <FeaturedWork />
        <AboutPreview />
        <SeriesSection />
        <MissionSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
