import { useState, useEffect, useRef } from "react";
import {
  Home as HomeIcon,
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

// ─── Translations ────────────────────────────────────────────────────────────
const t = {
  en: {
    nav: { services: "Services", whyUs: "Why Us", about: "About", contact: "Contact" },
    hero: {
      tag: "Palm Beach County's Trusted Cleaning Service",
      title1: "RIDGE PERFECT",
      title2: "CLEANING",
      subtitle: "Cleaning Beyond Expectations",
      desc: "Professional Residential & Commercial Cleaning Services throughout Palm Beach County.",
      tagline: "Better Price · Better Solutions · Perfect Clean",
      cta1: "Get a Free Quote",
      cta2: "Call Now",
      s1: "Satisfaction",
      s2: "Service Types",
      s3: "Scheduling",
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
      tagline: "Better Price · Better Solutions · Perfect Clean",
    },
    areas: {
      heading: "Service Areas",
      list: ["West Palm Beach", "Lake Worth", "Boynton Beach", "Delray Beach", "Boca Raton", "Palm Beach Gardens", "& Surrounding Areas"],
    },
    contact: {
      heading: "Contact Us",
      sub: "Get your free quote today",
      call: "Call Us",
      email: "Email Us",
      area: "Service Area",
      areaVal: "Palm Beach County, FL",
      card: {
        title: "Ready for a Spotless Space?",
        desc: "Contact us today for a free, no-obligation quote.",
        checks: ["Free Estimates", "Flexible Scheduling", "Satisfaction Guaranteed", "Locally Owned & Operated"],
        cta1: "Call Now",
        cta2: "Send Email",
      },
    },
    footer: {
      desc: "Professional cleaning services throughout Palm Beach County — residential, commercial, and specialty cleaning done right.",
      services: "Services",
      contact: "Contact",
      rights: "All rights reserved.",
      tagline: "Better Price · Better Solutions · Perfect Clean",
      madeBy: "Made by",
    },
  },
  es: {
    nav: { services: "Servicios", whyUs: "Por Qué Nosotros", about: "Nosotros", contact: "Contacto" },
    hero: {
      tag: "El Servicio de Limpieza de Confianza en Palm Beach County",
      title1: "RIDGE PERFECT",
      title2: "CLEANING",
      subtitle: "Limpieza Más Allá de las Expectativas",
      desc: "Servicios profesionales de limpieza residencial y comercial en todo Palm Beach County.",
      tagline: "Mejor Precio · Mejores Soluciones · Limpieza Perfecta",
      cta1: "Obtén una Cotización",
      cta2: "Llamar Ahora",
      s1: "Satisfacción",
      s2: "Tipos de Servicio",
      s3: "Disponibilidad",
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
      p1: "Ridge Perfect Cleaning Solutions es una empresa de confianza que sirve a Palm Beach County. Ofrecemos servicios de limpieza residencial, comercial y especializada con un compromiso de excelencia y atención al detalle.",
      p2: "Nuestros profesionales capacitados y verificados usan productos ecológicos de base vegetal para mantener tu espacio impecable, protegiendo a tu familia y al medio ambiente.",
      tagline: "Mejor Precio · Mejores Soluciones · Limpieza Perfecta",
    },
    areas: {
      heading: "Áreas de Servicio",
      list: ["West Palm Beach", "Lake Worth", "Boynton Beach", "Delray Beach", "Boca Raton", "Palm Beach Gardens", "& Áreas Cercanas"],
    },
    contact: {
      heading: "Contáctanos",
      sub: "Obtén tu cotización gratuita hoy",
      call: "Llámanos",
      email: "Escríbenos",
      area: "Área de Servicio",
      areaVal: "Palm Beach County, FL",
      card: {
        title: "¿Listo para un Espacio Impecable?",
        desc: "Contáctanos hoy para una cotización gratuita y sin compromiso.",
        checks: ["Estimados Gratuitos", "Horarios Flexibles", "Satisfacción Garantizada", "Empresa Local"],
        cta1: "Llamar Ahora",
        cta2: "Enviar Email",
      },
    },
    footer: {
      desc: "Servicios de limpieza profesional en todo Palm Beach County — residencial, comercial y especializada.",
      services: "Servicios",
      contact: "Contacto",
      rights: "Todos los derechos reservados.",
      tagline: "Mejor Precio · Mejores Soluciones · Limpieza Perfecta",
      madeBy: "Hecho por",
    },
  },
};

const serviceIcons = [HomeIcon, Building2, Sparkles, ArrowLeftRight, BedDouble, HardHat, Car, Droplets];

const whyIcons = [Star, DollarSign, CalendarCheck, ShieldCheck, UserCheck];

// ─── Fade-in hook ─────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Animated section wrapper ─────────────────────────────────────────────────
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export const Home = () => {
  const [lang, setLang] = useState<"en" | "es">("en");
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
    { id: "why-us", label: tx.nav.whyUs },
    { id: "about", label: tx.nav.about },
    { id: "contact", label: tx.nav.contact },
  ];

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 rgba(58,181,229,.4)} 70%{box-shadow:0 0 0 14px rgba(58,181,229,0)} 100%{box-shadow:0 0 0 0 rgba(58,181,229,0)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .float { animation: float 4s ease-in-out infinite; }
        .pulse-ring { animation: pulse-ring 2s ease-out infinite; }
        .card-hover { transition: transform .25s ease, box-shadow .25s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(13,43,78,.12); }
        .icon-box { transition: background .25s ease, transform .25s ease; }
        .icon-box:hover { transform: scale(1.08); }
        .btn-primary { transition: transform .2s ease, box-shadow .2s ease, background .2s ease; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(58,181,229,.4); }
        .btn-outline { transition: transform .2s ease, background .2s ease, color .2s ease; }
        .btn-outline:hover { transform: translateY(-2px); }
        .link-hover { position: relative; }
        .link-hover::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:#3AB5E5; transition:width .25s ease; }
        .link-hover:hover::after { width:100%; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex flex-col leading-none select-none">
            <span className="text-xl font-black tracking-widest text-[#3AB5E5]">RIDGE</span>
            <span className={`text-[9px] font-bold tracking-widest ${scrolled ? "text-[#0D2B4E]" : "text-white/90"}`}>PERFECT CLEANING</span>
            <span className="text-[9px] font-bold tracking-widest text-[#6BC043]">SOLUTIONS</span>
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`link-hover text-sm font-semibold tracking-wide transition-colors ${scrolled ? "text-[#0D2B4E]" : "text-white/90"} hover:text-[#3AB5E5]`}>
                {label}
              </button>
            ))}
            {/* Language toggle */}
            <button onClick={() => setLang(l => l === "en" ? "es" : "en")}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${scrolled ? "border-[#3AB5E5] text-[#3AB5E5] hover:bg-[#3AB5E5] hover:text-white" : "border-white/50 text-white hover:border-white"}`}>
              <Globe size={13} /> {lang === "en" ? "ES" : "EN"}
            </button>
            <a href="tel:5618180778"
              className="pulse-ring bg-[#3AB5E5] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#2aa0d0] transition-colors flex items-center gap-2">
              <Phone size={14} /> (561) 818-0778
            </a>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setLang(l => l === "en" ? "es" : "en")}
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${scrolled ? "border-[#3AB5E5] text-[#3AB5E5]" : "border-white/60 text-white"}`}>
              <Globe size={12} /> {lang === "en" ? "ES" : "EN"}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className={scrolled ? "text-[#0D2B4E]" : "text-white"}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-5 pb-5">
            {navLinks.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="block w-full text-left py-3 text-[#0D2B4E] font-semibold text-sm border-b border-gray-50 last:border-0">
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

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] bg-[#0D2B4E] flex items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden">
        {/* Background circles */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-[#3AB5E5]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#6BC043]/8 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-2 rounded-full border border-white/15 mb-6 backdrop-blur-sm">
            <Star size={12} className="text-[#3AB5E5]" fill="#3AB5E5" />
            {tx.hero.tag}
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-3 leading-none">
            <span className="text-[#3AB5E5]">{tx.hero.title1} </span>
            <span className="text-[#6BC043]">{tx.hero.title2}</span>
          </h1>

          <p className="text-lg text-white/60 italic mb-5">{tx.hero.subtitle}</p>
          <p className="text-white/70 max-w-xl mx-auto mb-2 text-base leading-relaxed">{tx.hero.desc}</p>
          <p className="text-[#3AB5E5] font-semibold text-sm mb-9">{tx.hero.tagline}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <button onClick={() => scrollTo("contact")}
              className="btn-primary bg-[#3AB5E5] text-white px-8 py-3.5 rounded-full font-bold text-base shadow-lg">
              {tx.hero.cta1}
            </button>
            <a href="tel:5618180778"
              className="btn-outline border-2 border-white/40 text-white px-8 py-3.5 rounded-full font-bold text-base flex items-center justify-center gap-2 hover:bg-white hover:text-[#0D2B4E]">
              <Phone size={16} /> {tx.hero.cta2}
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10">
            {[
              { v: "100%", l: tx.hero.s1 },
              { v: "8+", l: tx.hero.s2 },
              { v: "24/7", l: tx.hero.s3 },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <div className="text-3xl font-black text-[#3AB5E5]">{v}</div>
                <div className="text-xs text-white/50 uppercase tracking-widest mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <button onClick={() => scrollTo("services")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors float">
          <ArrowDown size={22} />
        </button>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[#3AB5E5] text-xs font-bold uppercase tracking-widest mb-2">{tx.services.heading}</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B4E] mb-3">{tx.services.sub}</h2>
              <div className="w-12 h-1 bg-[#3AB5E5] mx-auto rounded-full" />
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {tx.services.items.map(({ title, desc }, i) => {
              const Icon = serviceIcons[i];
              return (
                <Reveal key={title} delay={i * 60}>
                  <div className="card-hover group bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 text-center cursor-default h-full">
                    <div className="icon-box w-12 h-12 sm:w-14 sm:h-14 bg-[#F0F9FF] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#3AB5E5]">
                      <Icon size={22} strokeWidth={1.6} className="text-[#3AB5E5] group-hover:text-white transition-colors duration-200" />
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

      {/* ── WHY US ── */}
      <section id="why-us" className="py-20 px-4 bg-[#F8FBFF]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[#3AB5E5] text-xs font-bold uppercase tracking-widest mb-2">{tx.why.heading}</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B4E] mb-3">{tx.why.sub}</h2>
              <div className="w-12 h-1 bg-[#3AB5E5] mx-auto rounded-full" />
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3">
              {tx.why.items.map(({ title, desc }, i) => {
                const Icon = whyIcons[i];
                return (
                  <Reveal key={title} delay={i * 80}>
                    <div className="card-hover group flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 cursor-default">
                      <div className="icon-box w-11 h-11 bg-[#EEF8FD] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#3AB5E5]">
                        <Icon size={19} strokeWidth={1.7} className="text-[#3AB5E5] group-hover:text-white transition-colors duration-200" />
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
            <Reveal delay={100}>
              <div className="bg-[#0D2B4E] rounded-2xl p-8 text-white">
                <div className="w-10 h-10 bg-[#3AB5E5]/20 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck size={20} className="text-[#3AB5E5]" />
                </div>
                <h3 className="text-2xl font-black text-[#3AB5E5] mb-1">{tx.why.card.title}</h3>
                <div className="w-8 h-0.5 bg-[#6BC043] mb-6 rounded-full" />
                <div className="space-y-3 mb-8">
                  {tx.why.card.checks.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle size={16} strokeWidth={2} className="text-[#6BC043] shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => scrollTo("contact")}
                  className="btn-primary w-full bg-[#3AB5E5] text-white py-3 rounded-full font-bold text-sm">
                  {tx.why.card.cta}
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              {[
                { bg: "bg-[#3AB5E5]", val: "5", unit: "★", label: lang === "en" ? "Client Rated" : "Calificación" },
                { bg: "bg-[#6BC043]", val: "8", unit: "+", label: lang === "en" ? "Service Types" : "Tipos de Servicio" },
                { bg: "bg-[#0D2B4E]", val: "24", unit: "/7", label: lang === "en" ? "Scheduling" : "Disponibilidad" },
                { bg: "bg-[#F0F9FF] border border-[#3AB5E5]/20", val: "100", unit: "%", label: lang === "en" ? "Satisfaction" : "Satisfacción", dark: true },
              ].map(({ bg, val, unit, label, dark }) => (
                <div key={label} className={`${bg} rounded-2xl p-6 flex flex-col justify-between aspect-square`}>
                  <div className={`text-3xl font-black ${dark ? "text-[#0D2B4E]" : "text-white"}`}>
                    {val}<span className="text-lg">{unit}</span>
                  </div>
                  <div className={`text-xs font-semibold mt-2 ${dark ? "text-[#0D2B4E]/70" : "text-white/80"}`}>{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <p className="text-[#3AB5E5] text-xs font-bold uppercase tracking-widest mb-2">{tx.about.heading}</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B4E] mb-2">{tx.about.sub}</h2>
              <div className="w-12 h-1 bg-[#3AB5E5] rounded-full mb-6" />
              <p className="text-gray-500 leading-relaxed mb-4 text-sm">{tx.about.p1}</p>
              <p className="text-gray-500 leading-relaxed mb-7 text-sm">{tx.about.p2}</p>
              <p className="font-bold text-[#0D2B4E] text-base">
                <span className="text-[#3AB5E5]">Better Price · </span>
                <span className="text-[#0D2B4E]">Better Solutions · </span>
                <span className="text-[#6BC043]">Perfect Clean</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICE AREAS ── */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#0D2B4E] via-[#0a3a6e] to-[#3AB5E5]">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-[#3AB5E5] text-xs font-bold uppercase tracking-widest mb-2">{tx.areas.heading}</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-8">{tx.areas.heading}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {tx.areas.list.map((area) => (
                <span key={area}
                  className="bg-white/10 text-white px-5 py-2.5 rounded-full text-sm font-semibold border border-white/20 hover:bg-white/20 transition-colors cursor-default backdrop-blur-sm">
                  {area}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 px-4 bg-[#F8FBFF]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[#3AB5E5] text-xs font-bold uppercase tracking-widest mb-2">{tx.contact.heading}</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B4E] mb-3">{tx.contact.sub}</h2>
              <div className="w-12 h-1 bg-[#3AB5E5] mx-auto rounded-full" />
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              {[
                { href: "tel:5618180778", Icon: Phone, color: "bg-[#3AB5E5]", label: tx.contact.call, value: "(561) 818-0778", hoverColor: "group-hover:text-[#3AB5E5]" },
                { href: "mailto:info@ridgeperfectcleaning.com", Icon: Mail, color: "bg-[#6BC043]", label: tx.contact.email, value: "info@ridgeperfectcleaning.com", hoverColor: "group-hover:text-[#6BC043]" },
              ].map(({ href, Icon, color, label, value, hoverColor }) => (
                <Reveal key={label}>
                  <a href={href}
                    className="card-hover group flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100 block">
                    <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon size={20} strokeWidth={1.8} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{label}</div>
                      <div className={`font-bold text-[#0D2B4E] text-base transition-colors ${hoverColor}`}>{value}</div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 ml-auto group-hover:text-[#3AB5E5] transition-colors" />
                  </a>
                </Reveal>
              ))}
              <Reveal>
                <div className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100">
                  <div className="bg-[#0D2B4E] w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={20} strokeWidth={1.8} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{tx.contact.area}</div>
                    <div className="font-bold text-[#0D2B4E] text-base">{tx.contact.areaVal}</div>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <div className="bg-[#0D2B4E] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-black mb-2">{tx.contact.card.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{tx.contact.card.desc}</p>
                <div className="space-y-2.5 mb-8">
                  {tx.contact.card.checks.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle size={15} strokeWidth={2} className="text-[#6BC043] shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <a href="tel:5618180778"
                    className="btn-primary flex items-center justify-center gap-2 bg-[#3AB5E5] text-white py-3 rounded-full font-bold text-sm">
                    <Phone size={15} /> {tx.contact.card.cta1}
                  </a>
                  <a href="mailto:info@ridgeperfectcleaning.com"
                    className="btn-outline flex items-center justify-center gap-2 border-2 border-[#3AB5E5]/40 text-[#3AB5E5] py-3 rounded-full font-bold text-sm hover:bg-[#3AB5E5] hover:text-white hover:border-[#3AB5E5]">
                    <Mail size={15} /> {tx.contact.card.cta2}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0D2B4E] text-white py-14 px-4">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex flex-col leading-none mb-4">
              <span className="text-xl font-black tracking-widest text-[#3AB5E5]">RIDGE</span>
              <span className="text-[9px] font-bold tracking-widest text-white/80">PERFECT CLEANING</span>
              <span className="text-[9px] font-bold tracking-widest text-[#6BC043]">SOLUTIONS</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">{tx.footer.desc}</p>
          </div>
          {/* Services */}
          <div>
            <h4 className="text-xs font-bold text-[#3AB5E5] uppercase tracking-widest mb-4">{tx.footer.services}</h4>
            <ul className="space-y-2">
              {tx.services.items.map(({ title }) => (
                <li key={title} className="flex items-center gap-2 text-gray-400 text-xs hover:text-white transition-colors cursor-default">
                  <ChevronRight size={12} className="text-[#6BC043]" /> {title}
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-[#3AB5E5] uppercase tracking-widest mb-4">{tx.footer.contact}</h4>
            <div className="space-y-3">
              <a href="tel:5618180778" className="flex items-center gap-2.5 text-gray-400 hover:text-white text-xs transition-colors">
                <Phone size={13} className="text-[#3AB5E5] shrink-0" /> (561) 818-0778
              </a>
              <a href="mailto:info@ridgeperfectcleaning.com" className="flex items-center gap-2.5 text-gray-400 hover:text-white text-xs transition-colors">
                <Mail size={13} className="text-[#3AB5E5] shrink-0" /> info@ridgeperfectcleaning.com
              </a>
              <div className="flex items-center gap-2.5 text-gray-400 text-xs">
                <MapPin size={13} className="text-[#3AB5E5] shrink-0" /> Palm Beach County, FL
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">© {new Date().getFullYear()} Ridge Perfect Cleaning Solutions. {tx.footer.rights}</p>
          <p className="text-[#6BC043] text-xs font-semibold">{tx.footer.tagline}</p>
          <p className="text-gray-500 text-xs">
            {tx.footer.madeBy}{" "}
            <a href="https://vyax.com" target="_blank" rel="noopener noreferrer"
              className="font-bold transition-colors" style={{ color: "#008A8F" }}>
              VYAX
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
