import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'motion/react';
import { ArrowRight, ArrowUpRight, Menu, X as XIcon, ChevronDown } from 'lucide-react';

/* ─── Social Icons (inline SVGs for pixel-perfect control) ─── */
const socials = [
  {
    name: 'Instagram',
    handle: '@olasubomi.adegun',
    url: 'https://instagram.com/olasubomi.adegun',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'X',
    handle: '@Olashubby_',
    url: 'https://x.com/Olashubby_',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'Olasubomi Adegun',
    url: 'https://linkedin.com/in/olasubomi-adegun',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

/* ─── Social Link Component ─── */
const SocialIcon = ({ social, size = 'md' }: { social: typeof socials[0]; size?: 'sm' | 'md' }) => {
  const sizeClasses = size === 'sm'
    ? 'w-9 h-9'
    : 'w-11 h-11';
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${social.name}: ${social.handle}`}
      className={`group/icon relative ${sizeClasses} rounded-full border border-[rgba(167,139,250,0.15)] flex items-center justify-center text-[#6A6280] hover:text-[#A78BFA] hover:border-[#A78BFA] transition-all duration-300`}
    >
      {/* Glow ring on hover */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 18px 2px rgba(167,139,250,0.15)' }} />
      <span className="relative z-10">{social.icon}</span>
    </a>
  );
};

/* ─── Button ─── */
const Btn = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const base = "inline-flex items-center justify-center font-sans tracking-[0.12em] uppercase transition-all duration-300 cursor-pointer text-[11px] font-semibold rounded-full";
  const v: Record<string,string> = {
    primary: "px-7 py-3 bg-[#A78BFA] text-[#0C0A14] hover:bg-[#C4B5FD]",
    secondary: "px-7 py-3 border border-[rgba(167,139,250,0.25)] text-[#EDE9F6] hover:border-[#A78BFA] hover:text-[#A78BFA]",
    ghost: "bg-transparent text-[#A78BFA] hover:text-[#C4B5FD] px-0",
  };
  return <button className={`${base} ${v[variant]||v.primary} ${className}`} {...props}>{children}</button>;
};

/* ─── Stat Counter ─── */
const Stat = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} className="text-center" initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
      <span className="block font-serif text-3xl md:text-4xl text-[#A78BFA]">{value}</span>
      <span className="text-[10px] uppercase tracking-[0.15em] text-[#6A6280] mt-1 block">{label}</span>
    </motion.div>
  );
};

/* ═══ NAVBAR ═══ */
const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const fn = () => { const y = window.scrollY; setScrolled(y > 50); setHide(y > lastY.current && y > 200); lastY.current = y; };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = ['Work', 'About', 'Series', 'Mission', 'Contact'];

  return (
    <>
      <motion.header
        className={`fixed top-0 inset-x-0 z-50 h-16 flex items-center justify-center transition-all duration-500 ${scrolled ? 'glass-nav' : ''}`}
        animate={{ y: hide ? -64 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full max-w-6xl px-6 flex justify-between items-center">
          <a href="#" className="font-serif text-lg text-[#EDE9F6]">Shubby<span className="text-[#A78BFA]">.</span></a>
          <nav className="hidden lg:flex items-center gap-7">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="anim-underline text-[10px] uppercase tracking-[0.18em] font-medium text-[#9B95AD] hover:text-[#EDE9F6] transition-colors">{l}</a>
            ))}
            <Btn variant="primary" className="ml-3 text-[10px] py-2.5 px-5">Let's Talk</Btn>
          </nav>
          <button className="lg:hidden text-[#EDE9F6]" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <XIcon size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </motion.header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute top-5 right-6 text-[#EDE9F6]" onClick={() => setMenuOpen(false)}><XIcon size={26}/></button>
            <nav className="flex flex-col items-center gap-7">
              {links.map((l, i) => (
                <motion.a key={l} href={`#${l.toLowerCase()}`} className="font-serif text-3xl text-[#EDE9F6] hover:text-[#A78BFA] transition-colors"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  onClick={() => setMenuOpen(false)}>{l}</motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ═══ HERO ═══ */
const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, -40]);

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* Ambient purple glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 45% at 50% 35%, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />

      <motion.div className="relative z-10 max-w-3xl" style={{ y: yText }}>
        {/* Avatar */}
        <motion.div
          className="mx-auto mb-8 w-20 h-20 rounded-full overflow-hidden ring-2 ring-[rgba(167,139,250,0.3)] ring-offset-4 ring-offset-[#0C0A14]"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
        >
          <img src="/images/shubby-headshot.jpg" alt="Olasubomi Adegun" className="w-full h-full object-cover" />
        </motion.div>

        {/* Label */}
        <motion.p className="section-label mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          Storyteller · Relationship Curator
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="hero-title font-serif text-[#EDE9F6] mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
        >
          Exploring love, growth<br/><span className="italic text-[#A78BFA]">&amp;</span> human behaviour.
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="text-base md:text-lg text-[#9B95AD] font-light max-w-lg mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        >
          Blending storytelling, reflection &amp; social observation to capture the realities of modern relationships.
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex flex-wrap gap-3 justify-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <a href="https://preview.mailerlite.io/forms/2013310/179295256339023297/share" target="_blank" rel="noopener noreferrer"><Btn variant="primary">Read the Newsletter</Btn></a>
          <a href="#series"><Btn variant="secondary">Explore Series</Btn></a>
        </motion.div>
      </motion.div>

      {/* Scroll */}
      <motion.div className="absolute bottom-8 flex flex-col items-center gap-1.5 scroll-pulse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#6A6280]">Scroll</span>
        <ChevronDown size={14} className="text-[#6A6280]" />
      </motion.div>
    </section>
  );
};

/* ═══ FEATURED WORK ═══ */
const FeaturedWork = () => {
  const works = [
    { title: "How to Know If Your Partner Is Cheating on You", cat: "Humour & Insight", pub: "Your Fairy Godfriend", desc: "An exploration of trust and relationship behaviour, blending storytelling with sharp social commentary.", link: "https://docs.google.com/document/d/1tAgx39HxP4q-_G-_6WOryCMWrZHvnaoU/edit?usp=drivesdk&ouid=102567786631313954054&rtpof=true&sd=true" },
    { title: "The Perfect Date Debate", cat: "Cultural Storytelling", pub: "Amala Story", desc: "A culturally rich piece challenging conventional ideas of romance in modern dating.", link: "https://docs.google.com/document/d/1XOkEWo08q14hH23KFnvuue-66YesrqYP/edit?usp=drivesdk&ouid=102567786631313954054&rtpof=true&sd=true" },
    { title: "Dearest Santa", cat: "Reflection", pub: "Your Fairy Godfriend", desc: "A reflective, emotionally engaging seasonal newsletter exploring wishes and personal growth.", link: "https://docs.google.com/document/d/1MyXD2PGf9-MlgAvZn42IJlToApJYS5-Y/edit?usp=drivesdk&ouid=102567786631313954054&rtpof=true&sd=true" },
  ];

  return (
    <section id="work" className="py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-14">
          <div>
            <span className="section-label block mb-2">Selected Work</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#EDE9F6]">Newsletter Highlights</h2>
          </div>
          <span className="text-[10px] tracking-widest text-[#3E3855] hidden sm:block">01 — 03</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {works.map((w, i) => (
            <motion.a
              href={w.link} target="_blank" rel="noopener noreferrer"
              key={i} className="group cursor-pointer p-6 rounded-2xl border border-[rgba(167,139,250,0.06)] bg-[#13111D] hover:border-[rgba(167,139,250,0.18)] transition-all duration-300 flex flex-col"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-mono text-[#3E3855] group-hover:text-[#A78BFA] transition-colors">0{i+1}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#6A6280]">{w.pub}</span>
              </div>
              <div className="accent-line mb-5" />
              <span className="text-[10px] uppercase tracking-widest text-[#6A6280] mb-2">{w.cat}</span>
              <h4 className="font-serif text-lg text-[#EDE9F6] group-hover:text-[#A78BFA] transition-colors mb-3 flex-grow leading-snug">{w.title}</h4>
              <p className="text-[13px] text-[#9B95AD] font-light leading-relaxed mb-5">{w.desc}</p>
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#A78BFA] group-hover:gap-3 transition-all mt-auto">
                Read <ArrowRight size={12}/>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══ ABOUT ═══ */
const About = () => (
  <section id="about" className="py-24 md:py-36 px-6 border-t border-[rgba(167,139,250,0.06)]">
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
      {/* Image */}
      <motion.div className="lg:col-span-2 flex justify-center" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="relative">
          <div className="w-64 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden border border-[rgba(167,139,250,0.12)]">
            <img src="/images/shubby-portrait.jpg" alt="Olasubomi Adegun" className="w-full h-full object-cover object-top" style={{ filter: 'brightness(0.92) contrast(1.05)' }} />
          </div>
          {/* Decorative badge */}
          <div className="absolute -bottom-4 -right-4 bg-[#13111D] border border-[rgba(167,139,250,0.15)] rounded-2xl px-4 py-3 shadow-xl">
            <span className="text-[10px] uppercase tracking-widest text-[#A78BFA] font-semibold block">Since 2023</span>
            <span className="text-[10px] text-[#6A6280]">Based in Nigeria</span>
          </div>
        </div>
      </motion.div>

      {/* Copy */}
      <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
        <span className="section-label block mb-4">About Me</span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#EDE9F6] mb-8 leading-tight">
          A voice defined by <em className="text-[#A78BFA] not-italic">authenticity</em> &amp; curiosity.
        </h2>
        <div className="space-y-5 text-[15px] leading-relaxed text-[#9B95AD] font-light">
          <p>I am a storyteller, relationship curator, and criminology enthusiast who explores love, growth, and human behaviour through writing.</p>
          <p>Through my writing umbrella, <span className="text-[#EDE9F6] font-medium">Grab A Seat With Shubby</span>, I explore life, identity, and society from multiple distinct angles — with emotional honesty and humour.</p>
          <p>Beyond writing, I run <span className="text-[#EDE9F6] font-medium">Love and Links</span>, a matchmaking platform helping individuals form meaningful romantic connections.</p>
        </div>
        {/* Stats row */}
        <div className="flex gap-10 mt-10 pt-8 border-t border-[rgba(167,139,250,0.08)]">
          <Stat value="54+" label="Subscribers" />
          <Stat value="5" label="Series" />
          <Stat value="50+" label="Articles" />
        </div>
      </motion.div>
    </div>
  </section>
);

/* ═══ SERIES ═══ */
const Series = () => {
  const [open, setOpen] = useState<number|null>(null);
  const items = [
    { title: "Love and Links", desc: "A matchmaking platform helping individuals form meaningful romantic connections.", samples: [
      { label: "Promo Reel", url: "https://drive.google.com/file/d/10hAWYIqgE-GNJM7D97rYLbabHECg9EmN/view?usp=drivesdk" },
      { label: "Behind the Scenes", url: "https://drive.google.com/file/d/160nNiKUDNZgKoOjzaQ0CJ2JgCwiorPeW/view?usp=drivesdk" },
      { label: "Visit Website", url: "https://loveandlinks.org" },
    ]},
    { title: "Dating Market Chronicles", desc: "A witty, deeply observant series blending humour and social observation to unpack modern love and relationships.", samples: [
      { label: "Sample 1", url: "https://docs.google.com/document/d/1ab_raahMbyPx_3hu_D3itDbKXnOPuXQK/edit?usp=drivesdk&ouid=102567786631313954054&rtpof=true&sd=true" },
      { label: "Sample 2", url: "https://docs.google.com/document/d/1iowHMUGWrVmQwqdl5GdI0klOW6doW4iP/edit?usp=drivesdk&ouid=102567786631313954054&rtpof=true&sd=true" },
      { label: "Sample 3", url: "https://docs.google.com/document/d/1Dn_CALgha_AEOAa-mh82s76pClgQD7PB/edit?usp=drivesdk&ouid=102567786631313954054&rtpof=true&sd=true" },
    ]},
    { title: "Let's Talk Criminology", desc: "Breaking down criminological theories and social behaviour in a relatable, storytelling format.", samples: [
      { label: "Intro Video", url: "https://drive.google.com/file/d/14NONyTFC1M86M_Tz2_CBsmKwDQbAzqwE/view?usp=drivesdk" },
      { label: "Review of Lombroso's Syndrome", url: "https://docs.google.com/document/d/1lHTWo3f7WBY_6zxzyTL3TAaRglpmRU7u/edit?usp=drivesdk&ouid=102567786631313954054&rtpof=true&sd=true" },
      { label: "Sample 2", url: "https://docs.google.com/document/d/1G3i_YFgoSdGHtbXewl50f6kh6vNvw2jh/edit?usp=drivesdk&ouid=102567786631313954054&rtpof=true&sd=true" },
    ]},
    { title: "Corper's Diary", desc: "Documenting life as an NYSC teacher — the humour, chaos, and beauty of authentic classroom experiences.", samples: [
      { label: "Sample 1", url: "https://docs.google.com/document/d/1ZYAlPn6RQRT-6p648NDh3EKNrdi9XCVS/edit?usp=drivesdk&ouid=102567786631313954054&rtpof=true&sd=true" },
      { label: "Sample 2", url: "https://docs.google.com/document/d/18FtNXc_SrJiyPA-4h06NFZKcQQlbf9hj/edit?usp=drivesdk&ouid=102567786631313954054&rtpof=true&sd=true" },
      { label: "Sample 3", url: "https://docs.google.com/document/d/1Y9cyyqlRKifYovFTiR4gG5dlwDJku5-U/edit?usp=drivesdk&ouid=102567786631313954054&rtpof=true&sd=true" },
    ]},
    { title: "Diary of a Girl Who's Evolving", desc: "Reflective, poetic journal-style entries exploring personal growth and emotional healing.", samples: [
      { label: "Dear Me", url: "https://docs.google.com/document/d/1kiyvJNZFQG-jvo8vWcNbOi_O_pT2pJt4/edit?usp=drivesdk&ouid=102567786631313954054&rtpof=true&sd=true" },
      { label: "Sample 2", url: "https://docs.google.com/document/d/1k29lHkTchOcyQfJoKexFGuOsfZOUnMSp/edit?usp=drivesdk&ouid=102567786631313954054&rtpof=true&sd=true" },
      { label: "Sample 3", url: "https://docs.google.com/document/d/1ywMoatiX1wkNZywSB85DInultSZKsqQQ/edit?usp=drivesdk&ouid=102567786631313954054&rtpof=true&sd=true" },
    ]},
    { title: "Random Rants With Her", desc: "Unfiltered, spontaneous everyday commentary on life, culture, and whatever comes to mind.", samples: [
      { label: "Rant 1", url: "https://drive.google.com/file/d/15Ik4iknYMRuad420SWZFMHaQWA6RwrtB/view?usp=drivesdk" },
      { label: "Rant 2", url: "https://drive.google.com/file/d/14i0Gn6hXUiabXq9Ov0kouBqB-81hh2x7/view?usp=drivesdk" },
      { label: "Rant 3", url: "https://drive.google.com/file/d/1v4I4eYs--0cNDXir7PJCjQJs5kbBmQgt/view?usp=drivesdk" },
    ]},
  ];

  return (
    <section id="series" className="py-24 md:py-36 px-6 border-t border-[rgba(167,139,250,0.06)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
        <div className="lg:col-span-2">
          <span className="section-label block mb-4">Writing Platform</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#EDE9F6] mb-6">Grab A Seat With Shubby</h2>
          <p className="text-[14px] text-[#9B95AD] font-light leading-relaxed">A multifaceted platform exploring different dimensions of life, identity, emotions, and society through multiple storytelling series.</p>
        </div>
        <div className="lg:col-span-3">
          {items.map((s, i) => (
            <motion.div key={i} className="border-b border-[rgba(167,139,250,0.06)] group cursor-pointer"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex items-center justify-between py-5">
                <div className="flex items-center gap-5">
                  <span className="font-mono text-[11px] text-[#3E3855] group-hover:text-[#A78BFA] transition-colors w-6">0{i+1}</span>
                  <h4 className="font-serif text-lg text-[#EDE9F6] group-hover:text-[#A78BFA] transition-colors">{s.title}</h4>
                </div>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown size={16} className="text-[#6A6280] group-hover:text-[#A78BFA] transition-colors" />
                </motion.div>
              </div>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <p className="pb-3 pl-11 text-[14px] text-[#9B95AD] font-light leading-relaxed max-w-lg">{s.desc}</p>
                    {s.samples && s.samples.length > 0 && (
                      <div className="pl-11 pb-5 flex flex-wrap gap-2">
                        {s.samples.map((sample: any, j: number) => (
                          <a key={j} href={sample.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-[#A78BFA] border border-[rgba(167,139,250,0.2)] rounded-full px-3.5 py-1.5 hover:bg-[rgba(167,139,250,0.08)] hover:border-[#A78BFA] transition-all duration-300">
                            {sample.label} <ArrowUpRight size={10}/>
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══ MISSION ═══ */
const Mission = () => {
  const archives = [
    { title: "Cupid's Corner Q&A", meta: "Weekly · Community", link: "https://whatsapp.com/channel/0029Vb7gKDq0VycPb8qY5r00" },
    { title: "Relationship & Dating Surveys", meta: "Research · Social Insight", link: "https://drive.google.com/drive/folders/1ZJO2Hmf-86b6eYGnQO2PP_-8HGo_O0DZ" },
    { title: "Your Fairy Godfriend", meta: "54 Subs · Newsletter", link: "https://preview.mailerlite.io/forms/2013310/179295256339023297/share" },
    { title: "Love and Links", meta: "Matchmaking · Platform", link: "https://loveandlinks.org" },
  ];

  return (
    <section id="mission" className="py-24 md:py-36 px-6 border-t border-[rgba(167,139,250,0.06)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Quote */}
        <motion.div className="flex flex-col justify-center" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-label block mb-4">Vision</span>
          <div className="relative">
            <span className="absolute -top-6 -left-3 text-6xl font-serif text-[#A78BFA] opacity-20 select-none">"</span>
            <p className="font-serif text-xl md:text-2xl italic text-[#9B95AD] leading-relaxed pl-4 border-l-2 border-[rgba(167,139,250,0.2)]">
              I am building a platform that explores human connection through writing, observation, and real-life engagement — at the intersection of storytelling, relationships, and emotional awareness.
            </p>
          </div>
          <div className="mt-6 pl-4">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-[#EDE9F6]">— Olasubomi Adegun</span>
            <span className="text-[10px] uppercase tracking-widest text-[#6A6280] block mt-0.5">Creator, Love and Links</span>
          </div>
        </motion.div>

        {/* Links */}
        <div>
          <span className="section-label block mb-8">Platforms &amp; Initiatives</span>
          {archives.map((item, i) => (
            <React.Fragment key={i}>
              <motion.a href={item.link} target="_blank" rel="noopener noreferrer" className="group cursor-pointer flex justify-between items-center py-4" initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#6A6280] mb-0.5">{item.meta}</p>
                  <h4 className="font-serif text-base text-[#EDE9F6] group-hover:text-[#A78BFA] transition-colors">{item.title}</h4>
                </div>
                <ArrowUpRight size={14} className="text-[#3E3855] group-hover:text-[#A78BFA] transition-all group-hover:-translate-y-0.5" />
              </motion.a>
              {i < archives.length - 1 && <div className="divider" />}
            </React.Fragment>
          ))}
          <div className="mt-8">
            <a href="https://loveandlinks.org" target="_blank" rel="noopener noreferrer"><Btn variant="ghost">Explore Love and Links <ArrowRight size={12} className="ml-1.5 inline" /></Btn></a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══ CONTACT ═══ */
const Contact = () => (
  <section id="contact" className="py-28 md:py-40 px-6 text-center relative overflow-hidden border-t border-[rgba(167,139,250,0.06)]">
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 45% 45% at 50% 55%, rgba(124,58,237,0.06) 0%, transparent 70%)' }} />
    <div className="relative z-10 max-w-2xl mx-auto">
      <motion.span className="section-label block mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Connect</motion.span>
      <motion.h2 className="font-serif text-4xl md:text-5xl text-[#EDE9F6] mb-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        Grab a seat<span className="text-[#A78BFA]">.</span>
      </motion.h2>
      <motion.p className="text-[14px] text-[#9B95AD] font-light mb-10 leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
        Subscribe to "Your Fairy Godfriend" for personal reflections, or reach out to explore matchmaking through Love and Links.
      </motion.p>
      <motion.div className="flex flex-wrap gap-4 justify-center mb-14" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}>
        <a href="https://preview.mailerlite.io/forms/2013310/179295256339023297/share" target="_blank" rel="noopener noreferrer"><Btn variant="primary">Subscribe Now</Btn></a>
        <a href="https://whatsapp.com/channel/0029Vb7gKDq0VycPb8qY5r00" target="_blank" rel="noopener noreferrer" className="anim-underline text-[11px] uppercase tracking-widest font-semibold text-[#EDE9F6] hover:text-[#A78BFA] transition-colors py-3">Join Cupid's Corner</a>
      </motion.div>
      {/* Social Icons */}
      <motion.div className="flex gap-4 justify-center mb-8" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}>
        {socials.map(s => <SocialIcon key={s.name} social={s} />)}
      </motion.div>
      {/* Social Handles */}
      <div className="flex flex-wrap gap-6 justify-center">
        {socials.map(s => (
          <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold text-[#6A6280] hover:text-[#A78BFA] transition-colors">
            <span className="text-[#3E3855] group-hover:text-[#A78BFA] transition-colors">{s.name}</span>
            <span className="text-[#6A6280] normal-case tracking-normal">{s.handle}</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

/* ═══ FOOTER ═══ */
const Footer = () => (
  <footer className="border-t border-[rgba(167,139,250,0.06)] py-8 px-6">
    <div className="max-w-6xl mx-auto flex flex-col items-center gap-5">
      {/* Social row */}
      <div className="flex gap-3">
        {socials.map(s => <SocialIcon key={s.name} social={s} size="sm" />)}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 text-[9px] uppercase tracking-[0.15em] text-[#3E3855]">
        <span>&copy; {new Date().getFullYear()} Olasubomi Adegun (Shubby)</span>
        <span>Curated with intention · Based in Nigeria</span>
        <span className="italic normal-case tracking-normal text-[11px] text-[#6A6280]">Navigating Human Connection</span>
      </div>
    </div>
  </footer>
);

/* ═══ APP ═══ */
export default function App() {
  return (
    <div className="min-h-screen bg-[#0C0A14] text-[#EDE9F6] grain">
      <NavBar />
      <main>
        <Hero />
        <FeaturedWork />
        <About />
        <Series />
        <Mission />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
