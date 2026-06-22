import { useState, useEffect, useRef } from "react";
import {
  HomeIcon, Building2, Sparkles, ArrowLeftRight, BedDouble,
  HardHat, Car, Droplets, ShieldCheck, DollarSign, CalendarCheck,
  UserCheck, Star, Phone, Mail, MapPin, Menu, X, ChevronRight,
  Globe, CheckCircle, ArrowDown, MessageCircle, ChevronDown,
  Send, ExternalLink,
} from "lucide-react";

// ─── Browser language ─────────────────────────────────────────────────────────
const getBrowserLang = (): "en" | "es" => {
  const l = (navigator.language || (navigator.languages?.[0]) || "en").toLowerCase();
  return l.startsWith("es") ? "es" : "en";
};

// ─── Translations ─────────────────────────────────────────────────────────────
const t = {
  en: {
    nav: { services: "Services", whyUs: "Why Us", about: "About", contact: "Contact" },
    hero: {
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
    pricing: {
      heading: "Pricing",
      sub: "Transparent rates, no hidden fees",
      note: "* Final price depends on property size and condition. Free estimate always included.",
      plans: [
        {
          name: "Basic Clean",
          price: "From $80",
          color: "border-[#3AB5E5]",
          badge: "",
          features: ["Kitchen & bathrooms", "Vacuuming & mopping", "Surface dusting", "Trash removal", "Up to 2 bedrooms"],
        },
        {
          name: "Deep Clean",
          price: "From $160",
          color: "border-[#0D2B4E]",
          badge: "Most Popular",
          features: ["Everything in Basic", "Inside appliances", "Baseboards & blinds", "Cabinet interiors", "Up to 4 bedrooms"],
        },
        {
          name: "Commercial / Specialty",
          price: "Custom Quote",
          color: "border-[#6BC043]",
          badge: "",
          features: ["Offices & businesses", "Post-construction", "Move-in / Move-out", "Airbnb turnovers", "Pressure washing"],
        },
      ],
    },
    testimonials: {
      heading: "What Clients Say",
      sub: "Real reviews from Palm Beach County residents",
      items: [
        { name: "Maria L.", area: "West Palm Beach", text: "Ridge cleaned my entire home before I moved in. Absolutely spotless — every corner, every cabinet. I was blown away. Highly recommend!", stars: 5 },
        { name: "James T.", area: "Boca Raton", text: "They do my Airbnb turnovers every week. Always on time, always perfect. My guests consistently leave 5-star reviews about cleanliness.", stars: 5 },
        { name: "Sandra R.", area: "Boynton Beach", text: "After our renovation, the construction dust was everywhere. Ridge handled it all professionally. Our home looked brand new. Amazing team!", stars: 5 },
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
    gallery: { heading: "Our Work", sub: "See the Ridge difference in action" },
    about: {
      heading: "About Us",
      sub: "Locally owned, community driven",
      p1: "Ridge Perfect Cleaning Solutions is a trusted cleaning company serving Palm Beach County. We deliver residential, commercial, and specialty cleaning with a commitment to excellence and attention to detail.",
      p2: "Our trained, background-checked professionals use eco-friendly, plant-based products to keep your space spotless while protecting your family and the environment.",
    },
    faq: {
      heading: "FAQ",
      sub: "Common questions answered",
      items: [
        { q: "Do you bring your own cleaning supplies?", a: "Yes! We bring all professional-grade, eco-friendly, plant-based products and equipment at no extra cost to you." },
        { q: "Are you insured and bonded?", a: "Absolutely. Ridge Perfect Cleaning is fully insured and bonded. All our staff are background-checked for your peace of mind." },
        { q: "How do I get a quote?", a: "Simply call us at (561) 818-0778, send an email, or fill out the contact form below. We'll get back to you within a few hours with a free estimate." },
        { q: "How long does a cleaning take?", a: "It depends on the property size. A standard 2-bedroom home typically takes 2–3 hours. Deep cleans and post-construction may take longer." },
        { q: "Do I need to be home during the cleaning?", a: "Not at all. Many clients give us a key or access code. We treat every home with the same respect and care whether you're there or not." },
        { q: "What areas do you serve?", a: "We serve all of Palm Beach County including West Palm Beach, Lake Worth, Boynton Beach, Delray Beach, Boca Raton, Palm Beach Gardens, and surrounding areas." },
      ],
    },
    areas: {
      heading: "Service Areas",
      list: ["West Palm Beach", "Lake Worth", "Boynton Beach", "Delray Beach", "Boca Raton", "Palm Beach Gardens", "& Surrounding Areas"],
    },
    contact: {
      heading: "Contact Us",
      sub: "Get your free quote today",
      call: "Call Us", email: "Email Us", area: "Service Area", areaVal: "Palm Beach County, FL",
      form: {
        name: "Your Name", phone: "Phone Number", service: "Service Needed",
        message: "Tell us about your space (size, type, any notes...)",
        send: "Send Message",
        services: ["Residential Cleaning", "Commercial Cleaning", "Deep Cleaning", "Move-In / Move-Out", "Airbnb Cleaning", "Post-Construction", "Mobile Car Wash", "Pressure Washing", "Other"],
        success: "Message sent! We'll contact you soon.",
      },
      card: {
        title: "Ready for a Spotless Space?",
        desc: "Contact us today for a free, no-obligation quote.",
        checks: ["Free Estimates", "Flexible Scheduling", "Satisfaction Guaranteed", "Locally Owned & Operated"],
        cta1: "Call Now", cta2: "WhatsApp",
      },
      google: "View on Google Business",
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
    pricing: {
      heading: "Precios",
      sub: "Tarifas transparentes, sin costos ocultos",
      note: "* El precio final depende del tamaño y condición de la propiedad. Siempre incluye estimado gratuito.",
      plans: [
        {
          name: "Limpieza Básica",
          price: "Desde $80",
          color: "border-[#3AB5E5]",
          badge: "",
          features: ["Cocina y baños", "Aspirado y trapeado", "Desempolvado de superficies", "Retiro de basura", "Hasta 2 habitaciones"],
        },
        {
          name: "Limpieza Profunda",
          price: "Desde $160",
          color: "border-[#0D2B4E]",
          badge: "Más Popular",
          features: ["Todo lo de Básica", "Interior de electrodomésticos", "Rodapiés y persianas", "Interior de gabinetes", "Hasta 4 habitaciones"],
        },
        {
          name: "Comercial / Especial",
          price: "Cotización",
          color: "border-[#6BC043]",
          badge: "",
          features: ["Oficinas y negocios", "Post-construcción", "Mudanza / Entrada", "Turnos Airbnb", "Lavado a presión"],
        },
      ],
    },
    testimonials: {
      heading: "Lo Que Dicen Nuestros Clientes",
      sub: "Reseñas reales de residentes de Palm Beach County",
      items: [
        { name: "María L.", area: "West Palm Beach", text: "Ridge limpió mi casa completa antes de mudarme. Absolutamente impecable — cada rincón, cada gabinete. Quedé sorprendida. ¡Los recomiendo mucho!", stars: 5 },
        { name: "James T.", area: "Boca Raton", text: "Hacen mis turnos de Airbnb cada semana. Siempre a tiempo, siempre perfecto. Mis huéspedes constantemente dejan reseñas de 5 estrellas sobre la limpieza.", stars: 5 },
        { name: "Sandra R.", area: "Boynton Beach", text: "Después de nuestra remodelación, el polvo de construcción estaba en todas partes. Ridge lo manejó todo profesionalmente. ¡Nuestra casa quedó como nueva!", stars: 5 },
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
    gallery: { heading: "Nuestro Trabajo", sub: "Mira la diferencia Ridge en acción" },
    about: {
      heading: "Sobre Nosotros",
      sub: "Empresa local, orientada a la comunidad",
      p1: "Ridge Perfect Cleaning Solutions es una empresa de confianza que sirve a Palm Beach County. Ofrecemos servicios de limpieza residencial, comercial y especializada con compromiso de excelencia y atención al detalle.",
      p2: "Nuestros profesionales capacitados y verificados usan productos ecológicos de base vegetal para mantener tu espacio impecable, protegiendo a tu familia y al medio ambiente.",
    },
    faq: {
      heading: "Preguntas Frecuentes",
      sub: "Respuestas a las preguntas más comunes",
      items: [
        { q: "¿Traen sus propios productos de limpieza?", a: "¡Sí! Traemos todos los productos profesionales ecológicos de base vegetal y el equipo necesario sin costo adicional para ti." },
        { q: "¿Están asegurados y certificados?", a: "Absolutamente. Ridge Perfect Cleaning está completamente asegurado. Todo nuestro personal pasa por verificación de antecedentes." },
        { q: "¿Cómo obtengo una cotización?", a: "Simplemente llámanos al (561) 818-0778, envíanos un email, o completa el formulario de contacto. Te respondemos en pocas horas con un estimado gratuito." },
        { q: "¿Cuánto tiempo dura una limpieza?", a: "Depende del tamaño de la propiedad. Una casa de 2 habitaciones toma aproximadamente 2–3 horas. Las limpiezas profundas pueden tomar más." },
        { q: "¿Necesito estar en casa durante la limpieza?", a: "Para nada. Muchos clientes nos dan una llave o código de acceso. Tratamos cada hogar con el mismo respeto y cuidado estés presente o no." },
        { q: "¿Qué áreas cubren?", a: "Servimos todo Palm Beach County: West Palm Beach, Lake Worth, Boynton Beach, Delray Beach, Boca Raton, Palm Beach Gardens y áreas cercanas." },
      ],
    },
    areas: {
      heading: "Áreas de Servicio",
      list: ["West Palm Beach", "Lake Worth", "Boynton Beach", "Delray Beach", "Boca Raton", "Palm Beach Gardens", "& Áreas Cercanas"],
    },
    contact: {
      heading: "Contáctanos",
      sub: "Obtén tu cotización gratuita hoy",
      call: "Llámanos", email: "Escríbenos", area: "Área de Servicio", areaVal: "Palm Beach County, FL",
      form: {
        name: "Tu Nombre", phone: "Número de Teléfono", service: "Servicio Necesario",
        message: "Cuéntanos sobre tu espacio (tamaño, tipo, notas...)",
        send: "Enviar Mensaje",
        services: ["Limpieza Residencial", "Limpieza Comercial", "Limpieza Profunda", "Mudanza / Entrada", "Limpieza Airbnb", "Post-Construcción", "Lavado de Autos Móvil", "Lavado a Presión", "Otro"],
        success: "¡Mensaje enviado! Te contactaremos pronto.",
      },
      card: {
        title: "¿Listo para un Espacio Impecable?",
        desc: "Contáctanos hoy para una cotización gratuita y sin compromiso.",
        checks: ["Estimados Gratuitos", "Horarios Flexibles", "Satisfacción Garantizada", "Empresa Local"],
        cta1: "Llamar Ahora", cta2: "WhatsApp",
      },
      google: "Ver en Google Business",
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

// ─── Scroll reveal ────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold: 0.07 }
    );
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
      transform: on ? "translateY(0)" : "translateY(22px)",
      transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

const SectionHead = ({ label, title }: { label: string; title: string }) => (
  <Reveal className="text-center mb-12">
    <p className="text-[#3AB5E5] text-xs font-bold uppercase tracking-widest mb-2">{label}</p>
    <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B4E] mb-3">{title}</h2>
    <div className="w-10 h-1 bg-[#3AB5E5] mx-auto rounded-full" />
  </Reveal>
);

// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = ({ scrolled }: { scrolled: boolean }) => (
  <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 select-none">
    <img src="/Logo sin fondo.png" alt="Ridge Perfect Cleaning" className="h-14 sm:h-16 w-auto" />
    <div className="flex flex-col leading-tight">
      <span className={`text-[13px] font-black tracking-widest transition-colors ${scrolled ? "text-[#0D2B4E]" : "text-white/90"}`}>
        PERFECT CLEANING
      </span>
      <span className="text-[13px] font-black tracking-widest text-[#6BC043]">SOLUTIONS</span>
    </div>
  </button>
);

// ═══════════════════════════════════════════════════════════════════════════════
export const Home = () => {
  const [lang,     setLang]     = useState<"en" | "es">(getBrowserLang);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq,  setOpenFaq]  = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const tx = t[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Cleaning Request – ${form.service || "General"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}\n\n${form.message}`
    );
    window.open(`mailto:info@ridgeperfectcleaning.com?subject=${subject}&body=${body}`, "_blank");
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
    setForm({ name: "", phone: "", service: "", message: "" });
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
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pring { 0%{box-shadow:0 0 0 0 rgba(58,181,229,.5)} 70%{box-shadow:0 0 0 14px rgba(58,181,229,0)} 100%{box-shadow:0 0 0 0 rgba(58,181,229,0)} }
        @keyframes wpulse { 0%{box-shadow:0 0 0 0 rgba(37,211,102,.5)} 70%{box-shadow:0 0 0 14px rgba(37,211,102,0)} 100%{box-shadow:0 0 0 0 rgba(37,211,102,0)} }
        .float   { animation:float 4s ease-in-out infinite; }
        .pring   { animation:pring 2.4s ease-out infinite; }
        .wpulse  { animation:wpulse 2.2s ease-out infinite; }
        .card-lift { transition:transform .22s ease,box-shadow .22s ease; }
        .card-lift:hover { transform:translateY(-5px); box-shadow:0 16px 36px rgba(13,43,78,.10); }
        .icon-wrap { transition:background .2s ease,transform .2s ease; }
        .icon-wrap:hover { transform:scale(1.07); }
        .btn-p { transition:transform .16s ease,box-shadow .16s ease; }
        .btn-p:hover { transform:translateY(-2px); box-shadow:0 8px 22px rgba(58,181,229,.38); }
        .btn-o { transition:transform .16s ease,background .16s ease,color .16s ease,border-color .16s ease; }
        .btn-o:hover { transform:translateY(-2px); }
        .ul-fx { position:relative; }
        .ul-fx::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:2px; background:#3AB5E5; border-radius:2px; transition:width .22s ease; }
        .ul-fx:hover::after { width:100%; }
        .img-zoom { overflow:hidden; }
        .img-zoom img { transition:transform .45s ease; }
        .img-zoom:hover img { transform:scale(1.05); }
        input,select,textarea { outline:none; }
        input:focus,select:focus,textarea:focus { border-color:#3AB5E5 !important; box-shadow:0 0 0 3px rgba(58,181,229,.15); }
      `}</style>

      {/* ── FLOATING WHATSAPP ─────────────────────────────────────────────────── */}
      <a
        href="https://wa.me/15618180778"
        target="_blank"
        rel="noopener noreferrer"
        className="wpulse fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-lg font-bold text-sm hover:bg-[#20c05a] transition-colors"
        title="WhatsApp"
      >
        <MessageCircle size={20} fill="white" strokeWidth={0} />
        WhatsApp
      </a>

      {/* ── NAVBAR ───────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/97 backdrop-blur-md shadow-md border-b border-gray-100 py-3" : "bg-transparent py-5"
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Logo scrolled={scrolled} />

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`ul-fx text-sm font-semibold tracking-wide transition-colors hover:text-[#3AB5E5] ${
                  scrolled ? "text-[#0D2B4E]" : "text-white/90"
                }`}>
                {label}
              </button>
            ))}
            <button
              onClick={() => setLang(l => l === "en" ? "es" : "en")}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                scrolled
                  ? "border-[#3AB5E5] text-[#3AB5E5] hover:bg-[#3AB5E5] hover:text-white"
                  : "border-white/50 text-white/80 hover:border-white hover:text-white"
              }`}>
              <Globe size={12} /> {lang === "en" ? "ES" : "EN"}
            </button>
            <a href="tel:5618180778"
              className="pring btn-p flex items-center gap-2 bg-[#3AB5E5] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#2aa0d0]">
              <Phone size={14} /> (561) 818-0778
            </a>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setLang(l => l === "en" ? "es" : "en")}
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
                scrolled ? "border-[#3AB5E5] text-[#3AB5E5]" : "border-white/50 text-white/80"
              }`}>
              <Globe size={11} /> {lang === "en" ? "ES" : "EN"}
            </button>
            <a href="tel:5618180778" className="bg-[#3AB5E5] text-white p-2 rounded-full">
              <Phone size={15} />
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className={`p-1 ${scrolled ? "text-[#0D2B4E]" : "text-white"}`}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-5 pb-5 shadow-lg">
            {navLinks.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="flex items-center justify-between w-full py-3 text-[#0D2B4E] font-semibold text-sm border-b border-gray-50 last:border-0 hover:text-[#3AB5E5] transition-colors">
                {label} <ChevronRight size={14} className="text-gray-300" />
              </button>
            ))}
            <a href="tel:5618180778"
              className="mt-4 flex items-center justify-center gap-2 bg-[#3AB5E5] text-white py-3 rounded-full font-bold text-sm">
              <Phone size={15} /> (561) 818-0778
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0D2B4E] overflow-hidden" style={{ minHeight: "82vh" }}>
        <div className="absolute top-10 -left-24 w-72 h-72 rounded-full bg-[#3AB5E5]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#6BC043]/8 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 items-center pt-36 pb-16 lg:pt-40 lg:pb-16">
          {/* Text — visible immediately, no hidden animation */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-3">
              <span className="text-[#3AB5E5]">{tx.hero.title1}</span><br />
              <span className="text-[#6BC043]">{tx.hero.title2}</span>
            </h1>
            <p className="text-base text-white/55 italic mb-3">{tx.hero.subtitle}</p>
            <p className="text-white/70 mb-1.5 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">{tx.hero.desc}</p>
            <p className="text-[#3AB5E5] font-semibold text-xs mb-7">{tx.hero.tagline}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-9">
              <button onClick={() => scrollTo("contact")}
                className="btn-p bg-[#3AB5E5] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-lg">
                {tx.hero.cta1}
              </button>
              <a href="tel:5618180778"
                className="btn-o border-2 border-white/35 text-white px-7 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-white hover:text-[#0D2B4E] hover:border-white">
                <Phone size={14} /> {tx.hero.cta2}
              </a>
            </div>
            <div className="flex justify-center lg:justify-start gap-8">
              {[
                { v: tx.hero.s1v, l: tx.hero.s1l },
                { v: tx.hero.s2v, l: tx.hero.s2l },
                { v: tx.hero.s3v, l: tx.hero.s3l },
              ].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <div className="text-2xl font-black text-[#3AB5E5]">{v}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Video — Ridge Cleaning */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full border border-[#3AB5E5]/15" />
            </div>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10" style={{ maxWidth: 460 }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block"
                style={{ maxHeight: 420 }}
              >
                <source src="/Ridge Cleaning.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Mobile: show video below text */}
          <div className="lg:hidden mt-4">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-white/10">
              <video autoPlay muted loop playsInline className="w-full h-auto block">
                <source src="/Ridge Cleaning.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        <button onClick={() => scrollTo("services")}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/25 hover:text-white/50 transition-colors float z-10">
          <ArrowDown size={18} />
        </button>

        <div className="-mb-px">
          <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block">
            <path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
      <section id="services" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHead label={tx.services.heading} title={tx.services.sub} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {tx.services.items.map(({ title, desc }, i) => {
              const Icon = serviceIcons[i];
              return (
                <Reveal key={title} delay={i * 50}>
                  <div className="card-lift group bg-white border border-gray-100 rounded-2xl p-5 text-center h-full cursor-default">
                    <div className="icon-wrap w-12 h-12 bg-[#EEF8FD] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#3AB5E5]">
                      <Icon size={20} strokeWidth={1.6} className="text-[#3AB5E5] group-hover:text-white transition-colors duration-200" />
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


      {/* ── PRICING ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHead label={tx.pricing.heading} title={tx.pricing.sub} />
          <div className="grid sm:grid-cols-3 gap-6">
            {tx.pricing.plans.map(({ name, price, color, badge, features }, i) => (
              <Reveal key={name} delay={i * 80}>
                <div className={`card-lift relative border-2 ${color} rounded-2xl p-7 h-full flex flex-col bg-white`}>
                  {badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0D2B4E] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      {badge}
                    </span>
                  )}
                  <h3 className="font-black text-[#0D2B4E] text-lg mb-1">{name}</h3>
                  <p className="text-2xl font-black text-[#3AB5E5] mb-5">{price}</p>
                  <ul className="space-y-2.5 flex-1">
                    {features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle size={15} strokeWidth={2} className="text-[#6BC043] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollTo("contact")}
                    className="btn-p mt-7 w-full bg-[#3AB5E5] text-white py-2.5 rounded-full font-bold text-sm hover:bg-[#2aa0d0]">
                    {lang === "en" ? "Get a Quote" : "Obtén Cotización"}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="text-center text-gray-400 text-xs mt-6">{tx.pricing.note}</p>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-[#F8FBFF]">
        <div className="max-w-6xl mx-auto">
          <SectionHead label={tx.testimonials.heading} title={tx.testimonials.sub} />
          <div className="grid sm:grid-cols-3 gap-6">
            {tx.testimonials.items.map(({ name, area, text, stars }, i) => (
              <Reveal key={name} delay={i * 80}>
                <div className="card-lift bg-white border border-gray-100 rounded-2xl p-7 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: stars }).map((_, s) => (
                      <Star key={s} size={15} className="text-yellow-400" fill="#FBBF24" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">"{text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#3AB5E5] flex items-center justify-center text-white font-black text-sm shrink-0">
                      {name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-[#0D2B4E] text-sm">{name}</div>
                      <div className="text-gray-400 text-xs">{area}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────────── */}
      <section id="why-us" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHead label={tx.why.heading} title={tx.why.sub} />
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3">
              {tx.why.items.map(({ title, desc }, i) => {
                const Icon = whyIcons[i];
                return (
                  <Reveal key={title} delay={i * 65}>
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
                      <CheckCircle size={14} strokeWidth={2} className="text-[#6BC043] shrink-0" />
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

      {/* ── ABOUT — image 1a + 1c only here ─────────────────────────────────── */}
      <section id="about" className="py-20 px-4 sm:px-6 bg-[#F8FBFF]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              <div className="img-zoom rounded-2xl overflow-hidden row-span-2" style={{ aspectRatio: "3/4" }}>
                <img src="/image 1a.png" alt="Residential cleaning" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="img-zoom rounded-2xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
                <img src="/image 1c.png" alt="Carpet cleaning" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="bg-[#0D2B4E] rounded-2xl flex flex-col items-center justify-center" style={{ aspectRatio: "1/1" }}>
                <div className="text-3xl font-black text-[#3AB5E5]">5★</div>
                <div className="text-[10px] text-white/50 mt-1 uppercase tracking-wider">
                  {lang === "en" ? "Client Rated" : "Valoración"}
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[#3AB5E5] text-xs font-bold uppercase tracking-widest mb-2">{tx.about.heading}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B4E] mb-2">{tx.about.sub}</h2>
            <div className="w-10 h-1 bg-[#3AB5E5] rounded-full mb-6" />
            <p className="text-gray-500 leading-relaxed mb-4 text-sm">{tx.about.p1}</p>
            <p className="text-gray-500 leading-relaxed mb-8 text-sm">{tx.about.p2}</p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { v: "8+",   l: lang === "en" ? "Services"  : "Servicios",  c: "text-[#3AB5E5]" },
                { v: "24/7", l: lang === "en" ? "Booking"   : "Reservas",   c: "text-[#6BC043]" },
                { v: "100%", l: lang === "en" ? "Guarantee" : "Garantía",   c: "text-[#0D2B4E]" },
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

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionHead label={tx.faq.heading} title={tx.faq.sub} />
          <div className="space-y-3">
            {tx.faq.items.map(({ q, a }, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-[#0D2B4E] text-sm pr-4">{q}</span>
                    <ChevronDown
                      size={18}
                      className="text-[#3AB5E5] shrink-0 transition-transform duration-200"
                      style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ────────────────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 bg-gradient-to-br from-[#0D2B4E] via-[#0a3565] to-[#1a6a9e]">
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

      {/* ── CONTACT + FORM ───────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 px-4 sm:px-6 bg-[#F8FBFF]">
        <div className="max-w-6xl mx-auto">
          <SectionHead label={tx.contact.heading} title={tx.contact.sub} />
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* Left: info cards + form */}
            <div className="space-y-4">
              {[
                { href: "tel:5618180778", Icon: Phone, bg: "bg-[#3AB5E5]", label: tx.contact.call, value: "(561) 818-0778", hc: "group-hover:text-[#3AB5E5]" },
                { href: "mailto:info@ridgeperfectcleaning.com", Icon: Mail, bg: "bg-[#6BC043]", label: tx.contact.email, value: "info@ridgeperfectcleaning.com", hc: "group-hover:text-[#6BC043]" },
              ].map(({ href, Icon, bg, label, value, hc }) => (
                <a key={label} href={href}
                  className="card-lift group flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-5 block">
                  <div className={`${bg} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon size={19} strokeWidth={1.8} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">{label}</div>
                    <div className={`font-bold text-[#0D2B4E] text-sm sm:text-base truncate transition-colors ${hc}`}>{value}</div>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 ml-auto shrink-0 group-hover:text-[#3AB5E5] transition-colors" />
                </a>
              ))}
              <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-5">
                <div className="bg-[#0D2B4E] w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={19} strokeWidth={1.8} className="text-white" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">{tx.contact.area}</div>
                  <div className="font-bold text-[#0D2B4E] text-base">{tx.contact.areaVal}</div>
                </div>
              </div>

              {/* Contact form */}
              <form onSubmit={handleForm} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4 mt-2">
                <h3 className="font-black text-[#0D2B4E] text-base mb-2">
                  {lang === "en" ? "Send us a message" : "Envíanos un mensaje"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder={tx.contact.form.name}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full transition-all"
                  />
                  <input
                    type="tel"
                    placeholder={tx.contact.form.phone}
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full transition-all"
                  />
                </div>
                <select
                  value={form.service}
                  onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full text-gray-600 transition-all bg-white"
                >
                  <option value="">{tx.contact.form.service}</option>
                  {tx.contact.form.services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <textarea
                  rows={3}
                  placeholder={tx.contact.form.message}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full resize-none transition-all"
                />
                {formSent ? (
                  <div className="flex items-center gap-2 text-[#6BC043] font-semibold text-sm">
                    <CheckCircle size={16} /> {tx.contact.form.success}
                  </div>
                ) : (
                  <button type="submit"
                    className="btn-p flex items-center gap-2 bg-[#0D2B4E] text-white px-6 py-3 rounded-full font-bold text-sm">
                    <Send size={14} /> {tx.contact.form.send}
                  </button>
                )}
              </form>
            </div>

            {/* Right: CTA card */}
            <Reveal delay={80}>
              <div className="bg-[#0D2B4E] rounded-2xl p-8 text-white sticky top-24">
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
                  <a href="https://wa.me/15618180778" target="_blank" rel="noopener noreferrer"
                    className="btn-o flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-full font-bold text-sm hover:bg-[#20c05a]">
                    <MessageCircle size={14} fill="white" strokeWidth={0} /> {tx.contact.card.cta2}
                  </a>
                  <a
                    href="https://maps.google.com/?q=Ridge+Perfect+Cleaning+Palm+Beach+County+FL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-o flex items-center justify-center gap-2 border border-white/20 text-white/70 py-2.5 rounded-full text-xs font-semibold hover:border-white/50 hover:text-white">
                    <ExternalLink size={12} /> {tx.contact.google}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0D2B4E] text-white pt-14 pb-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/Logo sin fondo.png" alt="Ridge Logo" className="h-12 w-auto" />
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-black tracking-widest text-white/80">PERFECT CLEANING</span>
                <span className="text-[11px] font-black tracking-widest text-[#6BC043]">SOLUTIONS</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">{tx.footer.desc}</p>
            <a href="https://wa.me/15618180778" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-[#20c05a] transition-colors">
              <MessageCircle size={13} fill="white" strokeWidth={0} /> WhatsApp
            </a>
          </div>

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
              <a
                href="https://maps.google.com/?q=Ridge+Perfect+Cleaning+Palm+Beach+County+FL"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-gray-400 hover:text-white text-xs transition-colors">
                <ExternalLink size={12} className="text-[#3AB5E5] shrink-0" /> {tx.contact.google}
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p className="text-gray-500">© {new Date().getFullYear()} Ridge Perfect Cleaning Solutions. {tx.footer.rights}</p>
          <p className="text-[#6BC043] font-semibold hidden sm:block">{tx.footer.tagline}</p>
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
