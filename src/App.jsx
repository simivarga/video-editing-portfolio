import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Star, Mail, Phone, ArrowRight, ArrowUp, User, MessageSquare, Volume2, VolumeX } from "lucide-react";

// ---- Brand ----
const brand = {
  name: "Varga Simon",
  title: "Videóvágó",
  tagline:
    "Gyors, prémium, konverzióorientált vágás – hogy a nézőid végignézzék és cselekedjenek.",
  email: "simivarga1@gmail.com",
  phone: "+36 30 123 4567",
  socials: [
    { label: "TikTok", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Instagram", href: "#" },
  ],
};

// ---- Short-form portfolio items (compressed videos under 50MB) ----
const videos = [
  { id: 1, client: "OnlineMarketinges", src: "public/videos/compressed/Kreativitás telo start_compressed.mp4", brandColor: "#fabe24" },
  { id: 2, client: "Zámbó Levente", src: "public/videos/compressed/Levente Időpont 2_compressed.mp4", brandColor: "#0056b3" },
  { id: 3, client: "Samsung Experience Store", src: "/videos/compressed/Galaxy Watch Ultra_compressed.mp4" , brandColor: "#ffffff" },
  { id: 4, client: "Besenyei István", src: "/videos/compressed/web_compressed.mp4", brandColor: "#88CE0F" },
  { id: 5, client: "Shoprenter", src: "/videos/compressed/Shoprenter 6_compressed.mp4", brandColor: "#B0DE00" },
];



// ---- Helpers ----
const cn = (...args) => args.filter(Boolean).join(" ");

// ---- Unified animation presets ----
const EASE = [0.22, 0.9, 0.24, 1];
const DUR = 0.45;
const fadeMove = {
  hidden: { opacity: 0, y: 10 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: DUR, ease: EASE, delay: d } }),
};
const staggerSection = { visible: { transition: { staggerChildren: 0.05 } } };

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-zinc-100 selection:bg-white/10 selection:text-white">
      <BackgroundAura />
      <GlobalUX />
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <ToolsMini />
        <WorkCarousel />
        <ValueProps />
        <Process />
        <About />
        <Contact />
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
}

function BackgroundAura() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 right-10 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[50vh] w-[60vw] rounded-full bg-gradient-to-tr from-purple-700/10 via-blue-700/10 to-emerald-600/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent,_#0b0b0f_70%)]" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] mix-blend-overlay" />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const [navH, setNavH] = useState(0);

  useEffect(() => {
    const calc = () => setNavH(headerRef.current ? headerRef.current.offsetHeight : 0);
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 relative backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 md:px-8 py-3">
        <a href="#" className="group inline-flex items-center gap-2">
          <span className="inline-block h-6 w-6 rounded-lg bg-gradient-to-br from-white via-zinc-200 to-zinc-400" />
          <span className="text-sm font-semibold tracking-wide text-zinc-200 group-hover:text-white transition">{brand.name}</span>
        </a>
        <nav className="hidden gap-6 md:flex">
          <a className="navlink" href="#work">Munkáim</a>
          <a className="navlink" href="#services">Szolgáltatások</a>
          <a className="navlink" href="#process">Folyamat</a>
          <a className="navlink" href="#about">Rólam</a>
          <a className="navlink" href="#contact">Kapcsolat</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href={`mailto:${brand.email}`} className="btn btn-primary hidden md:inline-flex">Írj nekem <ArrowRight className="ml-1 h-4 w-4"/></a>
          <button aria-label="Menü" onClick={() => setOpen(!open)} className="md:hidden grid place-items-center rounded-xl border border-white/10 bg-white/5 p-2 transition">
            <span className={cn("relative block h-0.5 w-5 rounded bg-white transition-all duration-300", open && "translate-y-1.5 rotate-45")}></span>
            <span className={cn("relative my-1 block h-0.5 w-5 rounded bg-white transition-all duration-300", open && "opacity-0")}></span>
            <span className={cn("relative block h-0.5 w-5 rounded bg-white transition-all duration-300", open && "-translate-y-1.5 -rotate-45")}></span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="md:hidden fixed left-0 right-0 z-50 border-t border-white/10 menu-panel"
            style={{ top: navH, background: '#000' }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { transition: { staggerChildren: 0.05 } },
                visible: { transition: { staggerChildren: 0.05 } },
              }}
              className="mx-auto max-w-7xl px-4 py-3 grid gap-2"
            >
              {[
                { href: '#work', label: 'Munkáim' },
                { href: '#services', label: 'Szolgáltatások' },
                { href: '#process', label: 'Folyamat' },
                { href: '#about', label: 'Rólam' },
                { href: '#contact', label: 'Kapcsolat' },
              ].map((i, k) => (
                <motion.a
                  key={i.href}
                  href={i.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    const id = i.href.slice(1);
                    const el = document.getElementById(id);
                    if (el) {
                      setTimeout(() => {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }
                  }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, delay: 0.03 * k, ease: EASE }}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-zinc-200"
                >
                  {i.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const Section = React.forwardRef(({ id, title, subtitle, children }, ref) => {
  return (
    <section ref={ref} id={id} className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 py-16">
      <motion.div initial="hidden" whileInView="visible" viewport={{ amount: 0.35 }} variants={staggerSection}>
        {title && (
          <motion.div variants={fadeMove} className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
            {subtitle && <p className="mt-2 text-zinc-400">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </motion.div>
    </section>
  );
});

function Hero() {
  return (
    <section className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-12 pt-24 text-center md:pt-28">
      <motion.div initial="hidden" whileInView="visible" viewport={{ amount: 0.35 }} variants={staggerSection}>
        <motion.h1 variants={fadeMove} className="bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          Vágás, ami <span className="ml-2 inline-block rounded-2xl bg-white/5 px-3 py-1 text-white shadow-[0_0_0_1px_rgba(255,255,255,.08)]">megtartja</span> a néző figyelmét
        </motion.h1>
        <motion.p variants={fadeMove} custom={0.08} className="mt-5 max-w-2xl mx-auto text-center text-zinc-300/80">
          {brand.tagline}
        </motion.p>
        <motion.div variants={fadeMove} custom={0.16} className="mt-8 flex flex-row flex-wrap items-center justify-center gap-2">
          <a href="#work" className="btn btn-primary btn-sm whitespace-nowrap">Nézd meg a munkáim</a>
          <a href="#services" className="btn btn-ghost btn-sm whitespace-nowrap">Mit tudok nyújtani?</a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ---- Tools (vissza az előző, betűs stílusra) ----
function ToolsMini() {
  const tools = [
    { key: "pr", name: "Premiere Pro", initial: "Pr" },
    { key: "dr", name: "DaVinci Resolve", initial: "DR" },
    { key: "ae", name: "After Effects", initial: "Ae" },
    { key: "cap", name: "CapCut Pro", initial: "CC" },
  ];
  return (
    <Section id="tools" subtitle="Eszközeim">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {tools.map((t, i) => (
          <motion.div key={t.key} variants={fadeMove} custom={0.04 * i} className="card group relative inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-200 backdrop-blur">
            <span className="grid h-7 w-7 place-items-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-[11px] font-semibold tracking-wide">{t.initial}</span>
            <span className="opacity-80 group-hover:opacity-100">{t.name}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ---- SIMPLE, SMOOTH, NO-SCROLL CAROUSEL (3 card view, arrows, swipe) ----
function WorkCarousel(){
  const n = videos.length;
  const [idx, setIdx] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [isVisible, setIsVisible] = useState(true);
  const current = idx;
  const prev = (idx - 1 + n) % n;
  const next = (idx + 1) % n;

  const vrefs = useRef(videos.map(() => React.createRef()));
  const sectionRef = useRef(null);

  // Intersection Observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('Section visibility changed:', entry.isIntersecting);
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // play/pause only the center + apply mute/volume + visibility check
  useEffect(() => {
    console.log('Video control - current:', current, 'isVisible:', isVisible);
    vrefs.current.forEach((r, i) => {
      const v = r.current; if (!v) return;
      if (i === current && isVisible) {
        console.log('Playing video:', i);
        v.muted = muted;
        v.volume = volume;
        v.loop = true;
        v.currentTime = 0; // Start from beginning
        const p = v.play?.();
        if (p && p.then) p.catch(() => {});
      } else {
        console.log('Pausing video:', i);
        try { v.pause?.(); } catch {}
      }
    });
  }, [current, muted, volume, isVisible]);

  // swipe
  const startX = useRef(0);
  const onDown = (e) => { startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0; };
  const onUp = (e) => {
    const x = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
    const dx = x - startX.current;
    if (Math.abs(dx) > 40) setIdx((p) => (dx < 0 ? (p + 1) % n : (p - 1 + n) % n));
  };

  const posStyle = (i) => {
    // center/left/right transforms – percentage based so it's fluid
    const base = { position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%) scale(0.86)', opacity: 0, pointerEvents: 'none', zIndex: 0 };
    if (i === current) return { ...base, transform: 'translateX(-50%) scale(1)', opacity: 1, pointerEvents: 'auto', zIndex: 3 };
    if (i === prev)    return { ...base, transform: 'translateX(calc(-50% - 30%)) scale(0.92)', opacity: 0.6, pointerEvents: 'auto', zIndex: 2 };
    if (i === next)    return { ...base, transform: 'translateX(calc(-50% + 30%)) scale(0.92)', opacity: 0.6, pointerEvents: 'auto', zIndex: 2 };
    return base;
  };

  return (
    <Section id="work" title="Válogatott munkák" subtitle="Lapozz – középen automatikus lejátszás" ref={sectionRef}>
      <motion.div variants={fadeMove} custom={0.06}>
        <div className="car-viewport" onPointerDown={onDown} onPointerUp={onUp} onTouchStart={onDown} onTouchEnd={onUp}>
          {[0,1,2,3,4].map((i) => (
            <article key={i} style={posStyle(i)} className="car-card group overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] shadow-lg">
              {i === current ? (
                <video 
                  ref={vrefs.current[i]} 
                  src={videos[i].src} 
                  poster={videos[i].poster} 
                  className="h-full w-full object-cover" 
                  playsInline 
                  controls 
                  muted={muted}
                  disablePictureInPicture
                  disableRemotePlayback
                  controlsList="nodownload nofullscreen"
                />
              ) : (
                <video 
                  src={videos[i].src} 
                  className="h-full w-full object-cover object-center blur-sm" 
                  onClick={() => setIdx(i)}
                  muted
                  preload="metadata"
                />
              )}

            <div className="absolute top-0 left-0 right-0 p-2 sm:p-3">
                <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] backdrop-blur" style={{ color: videos[i].brandColor }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: videos[i].brandColor }} /> {videos[i].client}
                </div>
              </div>
            </article>
          ))}
          {/* arrows */}
          <button aria-label="Előző" className="car-arrow left" onClick={() => setIdx((p)=> (p - 1 + n) % n)}><ChevronLeft className="h-5 w-5"/></button>
          <button aria-label="Következő" className="car-arrow right" onClick={() => setIdx((p)=> (p + 1) % n)}><ChevronRight className="h-5 w-5"/></button>
        </div>
      </motion.div>
      <motion.div variants={fadeMove} custom={0.12} className="mt-4 flex items-center justify-center gap-2">
        {videos.map((_, i) => (
          <button key={i} aria-label={`Ugrás a(z) ${i + 1}. videóra`} onClick={() => setIdx(i)} className={cn("h-2 w-2 rounded-full", i === current ? "bg-white" : "bg-white/30 hover:bg-white/50")} />
        ))}
      </motion.div>
    </Section>
  );
}

function ValueProps() {
  const items = [
    { icon: <Star className="h-5 w-5" />, title: "Prémium minőség", text: "Apple-inspirált esztétika, letisztult tipográfia, pontos ritmus és hangkeverés." },
    { icon: <CheckCircle2 className="h-5 w-5" />, title: "Cél: konverzió", text: "Nézőmegtartás és CTA-k – nem csak szép, üzletileg is hat." },
    { icon: <Phone className="h-5 w-5" />, title: "Gyors átfutás", text: "Rugalmas határidők, iteratív jóváhagyás Figma/Frame.io linkkel." },
  ];
  return (
    <Section id="services" title="Miben tudok segíteni?" subtitle="Rövidformátum, social, reklám, podcast – ami elad és márkát épít.">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((it, idx) => (
          <motion.div key={it.title} variants={fadeMove} custom={0.06 * idx} className="card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center">
            <div className="mb-2 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">{it.icon}<span>{it.title}</span></div>
            <p className="mx-auto max-w-sm text-zinc-300/80">{it.text}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400 text-center">
              {it.title === "Prémium minőség" && (<><li>• Ritmikusan vágott B-roll, L-cut/J-cut</li><li>• Tiszta feliratozás és animált grafika</li><li>• Színszimmetria és zajkezelés</li></>)}
              {it.title === "Cél: konverzió" && (<><li>• Hook & payoff szerkezet</li><li>• Platform-specifikus arányok</li><li>• A/B tesztelhető variációk</li></>)}
              {it.title === "Gyors átfutás" && (<><li>• 48–72 órás első verzió</li><li>• 2 kör módosítás az árban</li><li>• Sürgős opció egyeztetéssel</li></>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Process() {
  const steps = [
    { n: 1, title: "Brief & célok", text: "Gyors hívás, célközönség, stílus, KPI-k rögzítése." },
    { n: 2, title: "Nyersanyag & script", text: "Anyagok átvétele, zenei és tipó moodboard – jóváhagyással." },
    { n: 3, title: "Vágás & finomítás", text: "Első verzió, visszajelzés, finomhangolás 1–2 körben." },
    { n: 4, title: "Export & átadás", text: "Platform-specifikus exportok, thumbnail, feliratsávok." },
  ];
  return (
    <Section id="process" title="Folyamat – egyszerű és átlátható" subtitle="A gyors eredmény kulcsa a tiszta lépésekben rejlik.">
      <ol className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {steps.map((s, idx) => (
          <motion.li key={s.n} variants={fadeMove} custom={0.06 * idx} className="card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold">{s.n}</div>
            <h3 className="mt-3 text-lg font-medium text-white">{s.title}</h3>
            <p className="mt-1 text-sm text-zinc-400">{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" title="Rólam">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <motion.div variants={fadeMove} className="order-2 text-center lg:text-left lg:order-1">
          <p className="text-lg mx-auto max-w-xl text-center lg:text-left"><span className="font-semibold text-white">{brand.name} – {brand.title}.</span> Rövid- és hosszúformátumú videókkal segítek márkáknak elérni a közönségüket.</p>
          <p className="mt-2 mx-auto max-w-xl text-center lg:text-left">A fókuszom a <span className="rounded-lg bg-white/10 px-1.5 py-0.5">nézőmegtartáson</span> és a <span className="rounded-lg bg-white/10 px-1.5 py-0.5">konverzión</span> van – attól lesz szép egy videó, hogy működik.</p>
          <ul className="mt-4 grid gap-2 text-sm text-zinc-400 mx-auto max-w-xl text-center lg:text-left">
            <li>• Eszközök: DaVinci Resolve, Premiere Pro, After Effects</li>
            <li>• Tartalomtípusok: UGC ads, YouTube, Reels/TikTok, podcast</li>
            <li>• Plusz: hang- és színutómunka, feliratozás, thumbnail</li>
          </ul>
          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <a href={`mailto:${brand.email}`} className="btn btn-primary">Kapcsolatfelvétel</a>
            <a href="#work" className="btn btn-ghost">Portfólió</a>
          </div>
        </motion.div>
        <motion.div variants={fadeMove} className="order-1 lg:order-2">
          <div className="card group relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-3">
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(1200px_400px_at_50%_-20%,rgba(255,255,255,.08),transparent)]" />
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop" alt="Portré munka közben – vágás és idővonal" className="relative z-10 h-full w-full rounded-2xl object-cover object-center" />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ---- Single placeholder inputs (no floating label), cursor placed right of icon ----
function Field({ label, type = "text", icon: Icon, textarea = false, name, inputRef }) {
  const inputProps = {
    name,
    placeholder: label,
    className: cn("form-input", textarea ? "textarea-center ta-auto" : "input-center input-h"),
    style: textarea
      ? { paddingLeft: "3.25rem", resize: "vertical" }
      : { paddingLeft: "3.25rem" },
    ref: inputRef || undefined,
  };
  return (
    <label className="group relative block">
      {textarea ? (
        <textarea {...inputProps} />
      ) : (
        <input type={type} {...inputProps} />
      )}
      {Icon && (
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-300" />
      )}
    </label>
  );
}

function Contact() {
  const messageRef = useRef(null);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const onChange = (e) => setIsSmall(e.matches);
    setIsSmall(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    const el = messageRef.current; if (!el) return;
    const auto = () => { el.style.height = '48px'; const h = Math.min(320, el.scrollHeight); el.style.height = h + 'px'; };
    auto();
    el.addEventListener('input', auto);
    return () => el.removeEventListener('input', auto);
  }, []);

  const nameLabel = isSmall ? 'Név' : 'Neved';
  const emailLabel = isSmall ? 'Email' : 'Email címed';
  const messageLabel = isSmall ? 'Leírás' : 'Projekt rövid leírása, határidő, költségkeret';

  return (
    <Section id="contact" title="Kezdjük el!" subtitle="Írj pár mondatot a projektről (cél, formátum, határidő), és visszajelzek 24 órán belül.">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-6 md:p-8">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <div className="mt-2 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 w-full max-w-sm sm:max-w-md mx-auto lg:mx-0 text-sm text-zinc-300">
                <a className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 hover:bg-white/10" href={`mailto:${brand.email}`}><Mail className="h-4 w-4" /> {brand.email}</a>
                <a className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 hover:bg-white/10" href={`tel:${brand.phone}`}><Phone className="h-4 w-4" /> {brand.phone}</a>
              </div>
            </div>
            <form className="grid gap-3 w-full max-w-sm sm:max-w-md mx-auto">
              <motion.div variants={fadeMove}><Field label={nameLabel} name="name" icon={User} /></motion.div>
              <motion.div variants={fadeMove} custom={0.06}><Field label={emailLabel} name="email" type="email" icon={Mail} /></motion.div>
              <motion.div variants={fadeMove} custom={0.12}><Field label={messageLabel} name="message" textarea icon={MessageSquare} inputRef={messageRef} /></motion.div>
              <motion.button variants={fadeMove} custom={0.18} type="button" className="btn btn-primary w-full">Küldés</motion.button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 lg:flex-row">
        <div className="text-xs text-zinc-500">© {new Date().getFullYear()} {brand.name}. Minden jog fenntartva.</div>
        <nav className="flex items-center gap-4 text-xs text-zinc-400">
          {brand.socials.map((s) => (<a key={s.label} href={s.href} className="hover:text-zinc-200">{s.label}</a>))}
        </nav>
      </div>
    </footer>
  );
}

function BackToTop(){
  const [show, setShow] = useState(false);
  useEffect(()=>{
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  },[]);
  return (
    <motion.button
      aria-label="Ugrás az oldal tetejére"
      className="backtop"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={show ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 8 }}
      transition={{ duration: 0.25, ease: EASE }}
    >
      <ArrowUp className="h-4 w-4"/>
    </motion.button>
  );
}

// ---- Global UX helpers ----
function SmoothScroll(){
  useEffect(()=>{
    try{ document.documentElement.style.scrollBehavior = 'smooth'; }catch{}
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if(!a) return;
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  },[]);
  return null;
}

// ---- Styles for buttons/inputs + carousel helpers (preview helper when Tailwind not present) ----
const styles = `
  html { scroll-behavior: smooth; }
  .card { transition: transform .24s cubic-bezier(.2,.7,.2,1), background .24s, border-color .24s, box-shadow .24s; will-change: transform; }
  .card:hover { transform: translateY(-2px) scale(1.03); border-color: rgba(255,255,255,.2); background: rgba(255,255,255,.06); }
  .btn-primary { padding: .6rem 1.1rem; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.08); color: #fff; border-radius: .9rem; transition: transform .2s ease, background .2s ease; }
  .btn-primary:hover { background: rgba(255,255,255,.15); transform: translateY(-1px) scale(1.02); }
  .btn-ghost { padding: .6rem 1.1rem; border: 1px solid rgba(255,255,255,.1); background: transparent; color: #d4d4d8; border-radius: .9rem; transition: transform .2s ease, background .2s ease; }
  .btn-ghost:hover { background: rgba(255,255,255,.08); transform: translateY(-1px) scale(1.02); }
  .btn-sm { padding: .45rem .9rem; font-size: .9rem; }
  .form-input { width: 100%; border-radius: .9rem; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.05); padding: .8rem 1rem .8rem 3.25rem; color: #f4f4f5; }
  .form-input::placeholder { color: #a1a1aa; opacity: .6; transition: opacity .2s ease; }
  .form-input:focus::placeholder { opacity: 0; }
  .form-input:not(:placeholder-shown)::placeholder { opacity: 0; }
  .input-h { height: 48px; }
  .input-center:placeholder-shown { text-align: center; }
  .textarea-center { min-height: 48px; }
  .ta-auto { height: 48px; transition: height .3s ease; overflow: hidden; }
  .textarea-center:placeholder-shown { text-align: center; padding-top: .8rem !important; }
  .navlink { color: #d4d4d8; }
  .navlink:hover { color: #fff; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  .snap-always { scroll-snap-stop: always; }
  /* Carousel helpers */
  :root { --car-w: min(56vw, 300px); --car-h: 75vh; }
  @media (min-width:480px){ :root { --car-w: min(60vw, 360px); } }
  @media (min-width:640px){ :root { --car-w: 46vw; } }
  @media (min-width:768px){ :root { --car-w: 34vw; } }
  @media (min-width:1024px){ :root { --car-w: 24vw; } }
  .car-viewport { position: relative; width: 100%; max-width: 100%; height: min(calc(var(--car-w) * 16 / 9), var(--car-h)); margin: 0 auto; padding-inline: .25rem; padding-block: 1rem; overflow: visible; }
  .car-card { width: var(--car-w); aspect-ratio: 9 / 16; transition: transform .45s cubic-bezier(.22,.9,.24,1), opacity .45s; }
  .car-arrow { position: absolute; top: 50%; transform: translateY(-50%); padding: .5rem; border-radius: .8rem; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.05); color: #e5e7eb; }
  .car-arrow.left { left: 0; }
  .car-arrow.right { right: 0; }
  .car-arrow:hover { background: rgba(255,255,255,.12); }
  /* Video controls */
  .video-ctrl { position: absolute; top: .5rem; right: .5rem; display: grid; place-items: center; width: 2rem; height: 2rem; border-radius: .6rem; border: 1px solid rgba(255,255,255,.12); background: rgba(0,0,0,.35); color: #e5e7eb; }
  .video-ctrl:hover { background: rgba(0,0,0,.5); }
  /* Back to top */
  .backtop { position: fixed; right: 1rem; bottom: 1rem; display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: .9rem; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.06); color: #e5e7eb; box-shadow: 0 10px 30px rgba(0,0,0,.3); }
  .backtop:hover { background: rgba(255,255,255,.12); }
  /* Mobile menu stronger blur */
  .menu-panel { position: fixed; background: #000; }
  
  }
  .backtop:hover { background: rgba(255,255,255,.12); }
`;
function StyleInjector() { return <style dangerouslySetInnerHTML={{ __html: styles }} />; }
function GlobalUX() { return <StyleInjector />; }
