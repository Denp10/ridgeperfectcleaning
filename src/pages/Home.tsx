import { useState, useEffect, useRef } from "react";
import {
  HomeIcon,
  Building2,
  Sparkles,
  ArrowLeftRight,
  BedDouble,
  HardHat,
  Car,
  Droplets,
  ShieldCheck,
  DollarSign,
  CalendarCheck,
  UserCheck,
  Star,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight,
  Globe,
  CheckCircle,
  ArrowDown,
} from "lucide-react";

// ─── Translations ─────────────────────────────────────────────────────────────
const t = {
  en: {
    nav: { services: "Services", whyUs: "Why Us", about: "About", contact: "Contact" },
    hero: {
      tag: "Palm Beach County's Trusted Cleaning Service",
      badge: "Professional & Insured",
      title1: "RIDGE PERFECT",
      title2: "CLEANING",
      subtitle: "Cleaning Beyond Expectations",
      desc: "Professional Residential & Commercial Cleaning Services throughout Palm Beach County.",
      tagline: "Better Price · Better Solutions · Perfect Clean",
      cta1: "Get a Free Quote",
      cta2: "Call Now",
      s1v: "100%", s1l: "Satisfaction",
      s2v: "8+",   s2l: "Service Types",
      s3v: "24/7", s3l: "Scheduling",
    },
    services: {
      heading: "Our Services",
      sub: "Everything your space needs — handled with care",
      items: [
        { title: "Residential Cleaning", desc: "Tailored home cleaning for every room" },
        { title: "Commercial Cleaning", desc: "Professional office & business solutions" },
        { title: "Deep Cleaning", desc: "Intensive top-to-bottom cleaning" },
        { title: "Move-In / Move-Out", desc: "Full cleaning for smooth transitions" },
        { title: "Airbnb Cleaning", desc: "Fast turnarounds for short-term rentals" },
        { title: "Post-Construction", desc: "Dust & debris removal after builds" },
        { title: "Mobile Car Wash", desc: "We come to you for a spotless vehicle" },
        { title: "Pressure Washing", desc: "Blast away grime from any surface" },
      ],
    },
    gallery: {
      heading: "Our Work",
      sub: "See the Ridge difference in action",
    },
    why: {
      heading: "Why Choose Us",
      sub: "Trusted by hundreds of clients across Palm Beach County",
      items: [
        { title: "Experienced Team", desc: "Years of professional cleaning expertise" },
        { title: "Affordable Pricing", desc: "Competitive rates with no hidden fees" },
        { title: "Flexible Scheduling", desc: "Book any time — 24/7 availability" },
        { title: "Reliable & Trusted", desc: "Background-checked, insured professionals" },
        { title: "100% Satisfaction", desc: "We're not done until you're happy" },
      ],
      card: {
        title: "100% Satisfaction Guarantee",
        checks: ["Plant-Based Products", "Insured & Bonded", "Eco-Friendly Cleaning", "Background Checked Staff"],
        cta: "Book Your Cleaning",
      },
    },
    about: {
      heading: "About Us",
      sub: "Locally owned, community driven",
      p1: "Ridge Perfect Cleaning Solutions is a trusted cleaning company serving Palm Beach County. We deliver residential, commercial, and specialty cleaning with a commitment to excellence and attention to detail.",
      p2: "Our trained, background-checked professionals use eco-friendly, plant-based products to keep your space spotless while protecting your family and the environment.",
    },
    areas: {
      heading: "Service Areas",
      list: ["West Palm Beach", "Lake Worth", "Boynton Beach", "Delray Beach", "Boca Raton", "Palm Beach Gardens", "& Surrounding Areas"],
    },
    contact: {
      heading: "Contact Us",
      sub: "Get your free quote today",
      call: "Call Us", email: "Email Us", area: "Service Area", areaVal: "Palm Beach County, FL",
      card: {
        title: "Ready for a Spotless Space?",
        desc: "Contact us today for a free, no-obligation quote.",
        checks: ["Free Estimates", "Flexible Scheduling", "Satisfaction Guaranteed", "Locally Owned & Operated"],
        cta1: "Call Now", cta2: "Send Email",
      },
    },
    footer: {
      desc: "Professional cleaning services throughout Palm Beach County — residential, commercial, and specialty cleaning done right.",
      services: "Services", contact: "Contact",
      rights: "All rights reserved.",
      tagline: "Better Price · Better Solutions · Perfect Clean",
      madeBy: "Made by",
    },
  },
  es: {
    nav: { services: "Servicios", whyUs: "Por Qué Nosotros", about: "Nosotros", contact: "Contacto" },
    hero: {
      tag: "El Servicio de Limpieza de Confianza en Palm Beach County",
      badge: "Profesional y Asegurado",
      title1: "RIDGE PERFECT",
      title2: "CLEANING",
      subtitle: "Limpieza Más Allá de las Expectativas",
      desc: "Servicios profesionales de limpieza residencial y comercial en todo Palm Beach County.",
      tagline: "Mejor Precio · Mejores Soluciones · Limpieza Perfecta",
      cta1: "Obtén una Cotización",
      cta2: "Llamar Ahora",
      s1v: "100%", s1l: "Satisfacción",
      s2v: "8+",   s2l: "Tipos de Servicio",
      s3v: "24/7", s3l: "Disponibilidad",
    },
    services: {
      heading: "Nuestros Servicios",
      sub: "Todo lo que tu espacio necesita — con cuidado y profesionalismo",
      items: [
        { title: "Limpieza Residencial", desc: "Limpieza del hogar adaptada a cada habitación" },
        { title: "Limpieza Comercial", desc: "Soluciones profesionales para oficinas y negocios" },
        { title: "Limpieza Profunda", desc: "Limpieza intensiva de arriba a abajo" },
        { title: "Mudanza / Entrada", desc: "Limpieza completa para transiciones sin estrés" },
        { title: "Limpieza Airbnb", desc: "Cambios rápidos para alquileres a corto plazo" },
        { title: "Post-Construcción", desc: "Eliminación de polvo y escombros tras obras" },
        { title: "Lavado de Autos Móvil", desc: "Te visitamos para un vehículo impecable" },
        { title: "Lavado a Presión", desc: "Elimina suciedad de cualquier superficie" },
      ],
    },
    gallery: {
      heading: "Nuestro Trabajo",
      sub: "Mira la diferencia Ridge en acción",
    },
    why: {
      heading: "Por Qué Elegirnos",
      sub: "La confianza de cientos de clientes en Palm Beach County",
      items: [
        { title: "Equipo Experimentado", desc: "Años de experiencia en limpieza profesional" },
        { title: "Precios Accesibles", desc: "Tarifas competitivas sin costos ocultos" },
        { title: "Horarios Flexibles", desc: "Reserva en cualquier momento — disponibilidad 24/7" },
        { title: "Confiables y Seguros", desc: "Profesionales asegurados y verificados" },
        { title: "100% Satisfacción", desc: "No terminamos hasta que estés feliz" },
      ],
      card: {
        title: "Garantía de 100% Satisfacción",
        checks: ["Productos de Base Vegetal", "Asegurados y Certificados", "Limpieza Ecológica", "Personal Verificado"],
        cta: "Reserva tu Limpieza",
      },
    },
    about: {
      heading: "Sobre Nosotros",
      sub: "Empresa local, orientada a la comunidad",
      p1: "Ridge Perfect Cleaning Solutions es una empresa de confianza que sirve a Palm Beach County. Ofrecemos servicios de limpieza residencial, comercial y especializada con compromiso de excelencia.",
      p2: "Nuestros profesionales capacitados y verificados usan productos ecológicos de base vegetal para mantener tu espacio impecable, protegiendo a tu familia y al medio ambiente.",
    },
    areas: {
      heading: "Áreas de Servicio",
      list: ["West Palm Beach", "Lake Worth", "Boynton Beach", "Delray Beach", "Boca Raton", "Palm Beach Gardens", "& Áreas Cercanas"],
    },
    contact: {
      heading: "Contáctanos",
      sub: "Obtén tu cotización gratuita hoy",
      call: "Llámanos", email: "Escríbenos", area: "Área de Servicio", areaVal: "Palm Beach County, FL",
      card: {
        title: "¿Listo para un Espacio Impecable?",
        desc: "Contáctanos hoy para una cotización gratuita y sin compromiso.",
        checks: ["Estimados Gratuitos", "Horarios Flexibles", "Satisfacción Garantizada", "Empresa Local"],
        cta1: "Llamar Ahora", cta2: "Enviar Email",
      },
    },
    footer: {
      desc: "Servicios de limpieza profesional en todo Palm Beach County — residencial, comercial y especializada.",
      services: "Servicios", contact: "Contacto",
      rights: "Todos los derechos reservados.",
      tagline: "Mejor Precio · Mejores Soluciones · Limpieza Perfecta",
      madeBy: "Hecho por",
    },
  },
};

const serviceIcons = [HomeIcon, Building2, Sparkles, ArrowLeftRight, BedDouble, HardHat, Car, Droplets];
const whyIcons    = [Star, DollarSign, CalendarCheck, ShieldCheck, UserCheck];

// Gallery images: 1a/1b/1c = residential/team, 2a/2b/2c = commercial
const galleryImages = [
  { src: "/image 1a.png",  alt: "Residential cleaning" },
  { src: "/Image 2a.png",  alt: "Commercial cleaning" },
  { src: "/image 1b.png",  alt: "Our team" },
  { src: "/Image 2b.png",  alt: "Window cleaning" },
  { src: "/image 1c.png",  alt: "Carpet cleaning" },
  { src: "/Image 2c.png",  alt: "Office cleaning" },
];

// ─── Reveal on scroll ─────────────────────────────────────────────────────────
function useReveal() {
  const ref  = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, on };
}

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: on ? 1 : 0,
      transform: on ? "translateY(0px)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

// ─── Logo component ───────────────────────────────────────────────────────────
const Logo = ({ scrolled }: { scrolled: boolean }) => (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="flex items-center gap-2 select-none"
  >
    {/* Logo image — mix-blend-mode:multiply removes the white bg */}
    <img
      src="/Logo complet.png"
      alt="Ridge Perfect Cleaning Logo"
      className="h-10 sm:h-12 w-auto"
      style={{ mixBlendMode: "multiply" }}
    />
    {/* Text beside logo */}
    <div className="flex flex-col leading-none">
      <span className={`text-[11px] font-black tracking-widest transition-colors ${scrolled ? "text-[#0D2B4E]" : "text-white/90"}`}>
        PERFECT CLEANING
      </span>
      <span className="text-[11px] font-black tracking-widest text-[#6BC043]">
        SOLUTIONS
      </span>
    </div>
  </button>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export const Home = () => {
  const [lang,     setLang]     = useState<"en" | "es">("en");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const tx = t[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { id: "services", label: tx.nav.services },
    { id: "why-us",   label: tx.nav.whyUs   },
    { id: "about",    label: tx.nav.about   },
    { id: "contact",  label: tx.nav.contact },
  ];

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      <style>{`
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pring   { 0%{box-shadow:0 0 0 0 rgba(58,181,229,.45)} 70%{box-shadow:0 0 0 12px rgba(58,181,229,0)} 100%{box-shadow:0 0 0 0 rgba(58,181,229,0)} }
        @keyframes fadeIn  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }
        .float   { animation: float 4s ease-in-out infinite; }
        .pring   { animation: pring 2.2s ease-out infinite; }
        .card-lift { transition: transform .25s ease, box-shadow .25s ease; }
        .card-lift:hover { transform:translateY(-5px); box-shadow:0 18px 38px rgba(13,43,78,.11); }
        .icon-wrap { transition: background .22s ease, transform .22s ease; }
        .icon-wrap:hover { transform:scale(1.08); }
        .btn-p { transition: transform .18s ease, box-shadow .18s ease; }
        .btn-p:hover { transform:translateY(-2px); box-shadow:0 8px 22px rgba(58,181,229,.38); }
        .btn-o { transition: transform .18s ease, background .18s ease, color .18s ease, border-color .18s ease; }
        .btn-o:hover { transform:translateY(-2px); }
        .underline-fx { position:relative; }
        .underline-fx::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:2px; background:#3AB5E5; border-radius:2px; transition:width .22s ease; }
        .underline-fx:hover::after { width:100%; }
        .img-zoom { overflow:hidden; }
        .img-zoom img { transition: transform .5s ease; }
        .img-zoom:hover img { transform:scale(1.06); }
      `}</style>

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/96 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

          <Logo scrolled={scrolled} />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`underline-fx text-sm font-semibold tracking-wide transition-colors hover:text-[#3AB5E5] ${
                  scrolled ? "text-[#0D2B4E]" : "text-white/90"
                }`}>
                {label}
              </button>
            ))}
            <button onClick={() => setLang(l => l === "en" ? "es" : "en")}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                scrolled
                  ? "border-[#3AB5E5] text-[#3AB5E5] hover:bg-[#3AB5E5] hover:text-white"
                  : "border-white/50 text-white/80 hover:border-white hover:text-white"
              }`}>
              <Globe size={12} /> {lang === "en" ? "ES" : "EN"}
            </button>
            <a href="tel:5618180778"
              className="pring btn-p flex items-center gap-2 bg-[#3AB5E5] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#2aa0d0]">
              <Phone size={14} /> (561) 818-0778
            </a>
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setLang(l => l === "en" ? "es" : "en")}
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
                scrolled ? "border-[#3AB5E5] text-[#3AB5E5]" : "border-white/50 text-white/80"
              }`}>
              <Globe size={11} /> {lang === "en" ? "ES" : "EN"}
            </button>
            <a href="tel:5618180778"
              className="flex items-center gap-1 bg-[#3AB5E5] text-white px-3 py-1.5 rounded-full text-xs font-bold">
              <Phone size={12} />
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className={scrolled ? "text-[#0D2B4E]" : "text-white"}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-5 pb-5 shadow-lg">
            {navLinks.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="block w-full text-left py-3 text-[#0D2B4E] font-semibold text-sm border-b border-gray-50">
                {label}
              </button>
            ))}
            <a href="tel:5618180778"
              className="mt-4 flex items-center justify-center gap-2 bg-[#3AB5E5] text-white py-3 rounded-full font-bold text-sm">
              <Phone size={15} /> (561) 818-0778
            </a>
          </div>
        )}
      </nav>

      {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0D2B4E] pt-20 pb-0 overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-20 -left-32 w-80 h-80 rounded-full bg-[#3AB5E5]/10 blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-[#6BC043]/8 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 items-center min-h-[82vh] py-12">

          {/* Left — text */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/75 text-xs font-semibold px-4 py-2 rounded-full border border-white/15 mb-6 backdrop-blur-sm">
              <Star size={11} className="text-[#3AB5E5]" fill="#3AB5E5" />
              {tx.hero.tag}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-4">
              <span className="text-[#3AB5E5]">{tx.hero.title1}</span><br />
              <span className="text-[#6BC043]">{tx.hero.title2}</span>
            </h1>

            <p className="text-base text-white/60 italic mb-4">{tx.hero.subtitle}</p>
            <p className="text-white/70 mb-2 leading-relaxed text-sm sm:text-base max-w-lg mx-auto lg:mx-0">
              {tx.hero.desc}
            </p>
            <p className="text-[#3AB5E5] font-semibold text-sm mb-8">{tx.hero.tagline}</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
              <button onClick={() => scrollTo("contact")}
                className="btn-p bg-[#3AB5E5] text-white px-7 py-3.5 rounded-full font-bold text-sm sm:text-base shadow-lg">
                {tx.hero.cta1}
              </button>
              <a href="tel:5618180778"
                className="btn-o border-2 border-white/40 text-white px-7 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-white hover:text-[#0D2B4E] hover:border-white">
                <Phone size={15} /> {tx.hero.cta2}
              </a>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 sm:gap-10">
              {[
                { v: tx.hero.s1v, l: tx.hero.s1l },
                { v: tx.hero.s2v, l: tx.hero.s2l },
                { v: tx.hero.s3v, l: tx.hero.s3l },
              ].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#3AB5E5]">{v}</div>
                  <div className="text-[10px] text-white/45 uppercase tracking-widest mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero image */}
          <div className="hidden lg:flex items-end justify-center relative">
            {/* Decorative ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full border border-[#3AB5E5]/20" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border border-[#6BC043]/15" />
            </div>
            <img
              src="/image 1b.png"
              alt="Ridge Perfect Cleaning team"
              className="relative z-10 max-h-[480px] w-auto object-contain drop-shadow-2xl"
              style={{ animation: "fadeIn 1s ease .3s both" }}
            />
          </div>
        </div>

        {/* Scroll hint */}
        <button onClick={() => scrollTo("services")}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors float z-10">
          <ArrowDown size={20} />
        </button>

        {/* Wave */}
        <div className="relative z-0 -mb-px">
          <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block">
            <path d="M0,28 C360,56 1080,0 1440,28 L1440,56 L0,56 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══ SERVICES ════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-[#3AB5E5] text-xs font-bold uppercase tracking-widest mb-2">{tx.services.heading}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B4E] mb-3">{tx.services.sub}</h2>
            <div className="w-10 h-1 bg-[#3AB5E5] mx-auto rounded-full" />
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {tx.services.items.map(({ title, desc }, i) => {
              const Icon = serviceIcons[i];
              return (
                <Reveal key={title} delay={i * 55}>
                  <div className="card-lift group bg-white border border-gray-100 rounded-2xl p-5 text-center h-full cursor-default">
                    <div className="icon-wrap w-12 h-12 bg-[#EEF8FD] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#3AB5E5]">
                      <Icon size={21} strokeWidth={1.6} className="text-[#3AB5E5] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <h3 className="font-bold text-[#0D2B4E] text-sm mb-1 leading-snug">{title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ═════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 bg-[#F8FBFF]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-[#3AB5E5] text-xs font-bold uppercase tracking-widest mb-2">{tx.gallery.heading}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B4E] mb-3">{tx.gallery.sub}</h2>
            <div className="w-10 h-1 bg-[#3AB5E5] mx-auto rounded-full" />
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {galleryImages.map(({ src, alt }, i) => (
              <Reveal key={src} delay={i * 60}>
                <div className="img-zoom rounded-2xl overflow-hidden aspect-square shadow-sm border border-gray-100">
                  <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY US ══════════════════════════════════════════════════════════════ */}
      <section id="why-us" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-[#3AB5E5] text-xs font-bold uppercase tracking-widest mb-2">{tx.why.heading}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B4E] mb-3">{tx.why.sub}</h2>
            <div className="w-10 h-1 bg-[#3AB5E5] mx-auto rounded-full" />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3">
              {tx.why.items.map(({ title, desc }, i) => {
                const Icon = whyIcons[i];
                return (
                  <Reveal key={title} delay={i * 70}>
                    <div className="card-lift group flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 cursor-default">
                      <div className="icon-wrap w-11 h-11 bg-[#EEF8FD] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#3AB5E5]">
                        <Icon size={18} strokeWidth={1.7} className="text-[#3AB5E5] group-hover:text-white transition-colors duration-200" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0D2B4E] text-sm">{title}</h3>
                        <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={80}>
              <div className="bg-[#0D2B4E] rounded-2xl p-8 text-white">
                <div className="w-10 h-10 bg-[#3AB5E5]/20 rounded-full flex items-center justify-center mb-5">
                  <ShieldCheck size={20} strokeWidth={1.7} className="text-[#3AB5E5]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#3AB5E5] mb-1">{tx.why.card.title}</h3>
                <div className="w-8 h-0.5 bg-[#6BC043] mb-6 rounded-full" />
                <div className="space-y-3 mb-8">
                  {tx.why.card.checks.map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle size={15} strokeWidth={2} className="text-[#6BC043] shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => scrollTo("contact")}
                  className="btn-p w-full bg-[#3AB5E5] text-white py-3 rounded-full font-bold text-sm">
                  {tx.why.card.cta}
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ═══════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-20 px-4 sm:px-6 bg-[#F8FBFF]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Photo mosaic */}
          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              <div className="img-zoom rounded-2xl overflow-hidden row-span-2 aspect-[3/4]">
                <img src="/image 1a.png" alt="Cleaning kitchen" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="img-zoom rounded-2xl overflow-hidden aspect-square">
                <img src="/image 1c.png" alt="Carpet cleaning" className="w-full h-full object-cover" loading="lazy" />
              </div>
              {/* Stats badge */}
              <div className="bg-[#0D2B4E] rounded-2xl flex flex-col items-center justify-center aspect-square">
                <div className="text-3xl font-black text-[#3AB5E5]">5★</div>
                <div className="text-xs text-white/60 mt-1">Client Rated</div>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={100}>
            <p className="text-[#3AB5E5] text-xs font-bold uppercase tracking-widest mb-2">{tx.about.heading}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B4E] mb-2">{tx.about.sub}</h2>
            <div className="w-10 h-1 bg-[#3AB5E5] rounded-full mb-6" />
            <p className="text-gray-500 leading-relaxed mb-4 text-sm">{tx.about.p1}</p>
            <p className="text-gray-500 leading-relaxed mb-8 text-sm">{tx.about.p2}</p>

            {/* Mini stats row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { v: "8+",   l: lang === "en" ? "Services" : "Servicios", c: "text-[#3AB5E5]" },
                { v: "24/7", l: lang === "en" ? "Booking"  : "Reservas",  c: "text-[#6BC043]" },
                { v: "100%", l: lang === "en" ? "Guarantee": "Garantía",  c: "text-[#0D2B4E]" },
              ].map(({ v, l, c }) => (
                <div key={l} className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-sm">
                  <div className={`text-xl font-black ${c}`}>{v}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{l}</div>
                </div>
              ))}
            </div>

            <p className="font-bold text-sm">
              <span className="text-[#3AB5E5]">Better Price · </span>
              <span className="text-[#0D2B4E]">Better Solutions · </span>
              <span className="text-[#6BC043]">Perfect Clean</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ SERVICE AREAS ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-[#0D2B4E] via-[#0a3565] to-[#1a6a9e]">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-8">{tx.areas.heading}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {tx.areas.list.map(area => (
                <span key={area}
                  className="bg-white/10 text-white px-5 py-2.5 rounded-full text-sm font-semibold border border-white/20 hover:bg-white/20 transition-colors cursor-default backdrop-blur-sm">
                  {area}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CONTACT ═════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-[#3AB5E5] text-xs font-bold uppercase tracking-widest mb-2">{tx.contact.heading}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B4E] mb-3">{tx.contact.sub}</h2>
            <div className="w-10 h-1 bg-[#3AB5E5] mx-auto rounded-full" />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              {[
                { href: "tel:5618180778", Icon: Phone, bg: "bg-[#3AB5E5]", label: tx.contact.call, value: "(561) 818-0778", hover: "group-hover:text-[#3AB5E5]" },
                { href: "mailto:info@ridgeperfectcleaning.com", Icon: Mail, bg: "bg-[#6BC043]", label: tx.contact.email, value: "info@ridgeperfectcleaning.com", hover: "group-hover:text-[#6BC043]" },
              ].map(({ href, Icon, bg, label, value, hover }) => (
                <Reveal key={label}>
                  <a href={href}
                    className="card-lift group flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-5 block">
                    <div className={`${bg} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon size={19} strokeWidth={1.8} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">{label}</div>
                      <div className={`font-bold text-[#0D2B4E] text-base truncate transition-colors ${hover}`}>{value}</div>
                    </div>
                    <ChevronRight size={15} className="text-gray-300 ml-auto shrink-0 group-hover:text-[#3AB5E5] transition-colors" />
                  </a>
                </Reveal>
              ))}

              <Reveal>
                <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-5">
                  <div className="bg-[#0D2B4E] w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={19} strokeWidth={1.8} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">{tx.contact.area}</div>
                    <div className="font-bold text-[#0D2B4E] text-base">{tx.contact.areaVal}</div>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={90}>
              <div className="bg-[#0D2B4E] rounded-2xl p-8 text-white">
                <h3 className="text-xl sm:text-2xl font-black mb-2">{tx.contact.card.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{tx.contact.card.desc}</p>
                <div className="space-y-2.5 mb-8">
                  {tx.contact.card.checks.map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle size={14} strokeWidth={2} className="text-[#6BC043] shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <a href="tel:5618180778"
                    className="btn-p flex items-center justify-center gap-2 bg-[#3AB5E5] text-white py-3 rounded-full font-bold text-sm">
                    <Phone size={14} /> {tx.contact.card.cta1}
                  </a>
                  <a href="mailto:info@ridgeperfectcleaning.com"
                    className="btn-o flex items-center justify-center gap-2 border-2 border-[#3AB5E5]/40 text-[#3AB5E5] py-3 rounded-full font-bold text-sm hover:bg-[#3AB5E5] hover:text-white hover:border-[#3AB5E5]">
                    <Mail size={14} /> {tx.contact.card.cta2}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#0D2B4E] text-white pt-14 pb-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/Logo complet.png"
                alt="Ridge Logo"
                className="h-10 w-auto"
                style={{ mixBlendMode: "screen" }}
              />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-black tracking-widest text-white/85">PERFECT CLEANING</span>
                <span className="text-[10px] font-black tracking-widest text-[#6BC043]">SOLUTIONS</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">{tx.footer.desc}</p>
          </div>

          {/* Services list */}
          <div>
            <h4 className="text-[10px] font-bold text-[#3AB5E5] uppercase tracking-widest mb-4">{tx.footer.services}</h4>
            <ul className="space-y-2">
              {tx.services.items.map(({ title }) => (
                <li key={title} className="flex items-center gap-2 text-gray-400 text-xs hover:text-white transition-colors cursor-default">
                  <ChevronRight size={11} className="text-[#6BC043] shrink-0" /> {title}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold text-[#3AB5E5] uppercase tracking-widest mb-4">{tx.footer.contact}</h4>
            <div className="space-y-3">
              <a href="tel:5618180778" className="flex items-center gap-2.5 text-gray-400 hover:text-white text-xs transition-colors">
                <Phone size={12} className="text-[#3AB5E5] shrink-0" /> (561) 818-0778
              </a>
              <a href="mailto:info@ridgeperfectcleaning.com" className="flex items-center gap-2.5 text-gray-400 hover:text-white text-xs transition-colors">
                <Mail size={12} className="text-[#3AB5E5] shrink-0" /> info@ridgeperfectcleaning.com
              </a>
              <div className="flex items-center gap-2.5 text-gray-400 text-xs">
                <MapPin size={12} className="text-[#3AB5E5] shrink-0" /> Palm Beach County, FL
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-6xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p className="text-gray-500">© {new Date().getFullYear()} Ridge Perfect Cleaning Solutions. {tx.footer.rights}</p>
          <p className="text-[#6BC043] font-semibold">{tx.footer.tagline}</p>
          <p className="text-gray-500">
            {tx.footer.madeBy}{" "}
            <a href="https://vyax.com" target="_blank" rel="noopener noreferrer"
              className="font-black hover:opacity-80 transition-opacity" style={{ color: "#008A8F" }}>
              VYAX
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
