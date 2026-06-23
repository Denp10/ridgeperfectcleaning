import { useState, useEffect, useRef } from "react";
import {
  HomeIcon, Building2, Sparkles, ArrowLeftRight, BedDouble,
  HardHat, Car, Droplets, ShieldCheck, DollarSign, CalendarCheck,
  UserCheck, Star, Phone, Mail, MapPin, Menu, X, ChevronRight,
  Globe, CheckCircle, ArrowDown, MessageCircle, ChevronDown, Send,
  ExternalLink, Loader2,
} from "lucide-react";

// ─── Browser language ─────────────────────────────────────────────────────────
const getBrowserLang = (): "en" | "es" => {
  const l = (navigator.language || navigator.languages?.[0] || "en").toLowerCase();
  return l.startsWith("es") ? "es" : "en";
};

// ─── Translations ─────────────────────────────────────────────────────────────
const t = {
  en: {
    nav: { services: "Services", whyUs: "Why Us", about: "About", contact: "Contact" },
    hero: {
      title1: "RIDGE PERFECT", title2: "CLEANING",
      subtitle: "Cleaning Beyond Expectations",
      desc: "Professional Residential & Commercial Cleaning Services throughout Palm Beach County.",
      tagline: "Better Price · Better Solutions · Perfect Clean",
      cta1: "Get a Free Quote", cta2: "Call Now",
      s1v: "100%", s1l: "Satisfaction", s2v: "8+", s2l: "Service Types", s3v: "24/7", s3l: "Scheduling",
    },
    services: {
      heading: "Our Services", sub: "Everything your space needs — handled with care",
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
    beforeAfter: {
      heading: "Before & After",
      sub: "The Ridge difference — visible results every time",
      before: "Before", after: "After",
      items: [
        { img: "/image-1a.png", label: "Kitchen Deep Clean" },
        { img: "/image-1c.png", label: "Living Room Carpet" },
        { img: "/image-2c.png", label: "Office Workspace" },
      ],
    },
    pricing: {
      heading: "Pricing", sub: "Transparent rates, no hidden fees",
      note: "* Final price depends on property size and condition. Free estimate always included.",
      cta: "Get a Quote",
      plans: [
        { name: "Basic Clean", price: "From $80", color: "border-[#3AB5E5]", badge: "", features: ["Kitchen & bathrooms", "Vacuuming & mopping", "Surface dusting", "Trash removal", "Up to 2 bedrooms"] },
        { name: "Deep Clean", price: "From $160", color: "border-[#0D2B4E]", badge: "Most Popular", features: ["Everything in Basic", "Inside appliances", "Baseboards & blinds", "Cabinet interiors", "Up to 4 bedrooms"] },
        { name: "Commercial / Specialty", price: "Custom Quote", color: "border-[#6BC043]", badge: "", features: ["Offices & businesses", "Post-construction", "Move-in / Move-out", "Airbnb turnovers", "Pressure washing"] },
      ],
    },
    testimonials: {
      heading: "Google Reviews", sub: "What our clients say",
      items: [
        { name: "Maria L.", area: "West Palm Beach, FL", date: "2 weeks ago", text: "Excellent service! Super clean and on time.", stars: 5, service: "Deep Cleaning" },
        { name: "James T.", area: "Boca Raton, FL", date: "1 month ago", text: "They handle my Airbnb every week. Guests always rate cleanliness 5 stars. Reliable team.", stars: 5, service: "Airbnb Cleaning" },
        { name: "Sandra R.", area: "Boynton Beach, FL", date: "3 weeks ago", text: "Great service, but the price is a bit high. Still, the results were worth it — spotless!", stars: 4, service: "Post-Construction" },
        { name: "Carlos M.", area: "Lake Worth, FL", date: "5 days ago", text: "Very professional. Arrived on time and left everything spotless. Will book again.", stars: 5, service: "Residential Cleaning" },
        { name: "Jennifer K.", area: "Delray Beach, FL", date: "2 months ago", text: "Best cleaning company in Palm Beach! Quick, thorough, and friendly staff.", stars: 5, service: "Commercial Cleaning" },
      ],
    },
    why: {
      heading: "Why Choose Us", sub: "Trusted by hundreds of clients across Palm Beach County",
      items: [
        { title: "Experienced Team", desc: "Years of professional cleaning expertise" },
        { title: "Affordable Pricing", desc: "Competitive rates with no hidden fees" },
        { title: "Flexible Scheduling", desc: "Book any time — 24/7 availability" },
        { title: "Reliable & Trusted", desc: "Background-checked, insured professionals" },
        { title: "100% Satisfaction", desc: "We're not done until you're happy" },
      ],
      card: { title: "100% Satisfaction Guarantee", checks: ["Plant-Based Products", "Insured & Bonded", "Eco-Friendly Cleaning", "Background Checked Staff"], cta: "Book Your Cleaning" },
    },
    about: {
      heading: "About Us", sub: "Locally owned, community driven",
      p1: "Ridge Perfect Cleaning Solutions is a trusted cleaning company serving Palm Beach County. We deliver residential, commercial, and specialty cleaning with a commitment to excellence and attention to detail.",
      p2: "Our trained, background-checked professionals use eco-friendly, plant-based products to keep your space spotless while protecting your family and the environment.",
    },
    faq: {
      heading: "FAQ", sub: "Common questions answered",
      items: [
        { q: "Do you bring your own cleaning supplies?", a: "Yes! We bring all professional-grade, eco-friendly, plant-based products and equipment at no extra cost." },
        { q: "Are you insured and bonded?", a: "Absolutely. Ridge Perfect Cleaning is fully insured and bonded. All staff are background-checked for your peace of mind." },
        { q: "How do I get a quote?", a: "Call us at (561) 818-0778, send an email, or fill out the contact form. We respond within a few hours with a free estimate." },
        { q: "How long does a cleaning take?", a: "A standard 2-bedroom home typically takes 2–3 hours. Deep cleans and post-construction may take longer." },
        { q: "Do I need to be home during the cleaning?", a: "Not at all. Many clients give us a key or access code. We treat every home with the same care whether you're there or not." },
        { q: "What areas do you serve?", a: "We serve all of Palm Beach County: West Palm Beach, Lake Worth, Boynton Beach, Delray Beach, Boca Raton, Palm Beach Gardens, and surrounding areas." },
      ],
    },
    areas: { heading: "Service Areas", list: ["West Palm Beach", "Lake Worth", "Boynton Beach", "Delray Beach", "Boca Raton", "Palm Beach Gardens", "& Surrounding Areas"] },
    contact: {
      heading: "Contact Us", sub: "Get your free quote today",
      call: "Call Us", email: "Email Us", area: "Service Area", areaVal: "Palm Beach County, FL",
      form: {
        name: "Your Name", phone: "Phone Number", service: "Service Needed",
        message: "Tell us about your space (size, type, any notes...)",
        send: "Send Message", sending: "Sending...",
        success: "Message sent! We'll contact you within a few hours.",
        error: "Something went wrong. Please call us directly.",
        services: ["Residential Cleaning", "Commercial Cleaning", "Deep Cleaning", "Move-In / Move-Out", "Airbnb Cleaning", "Post-Construction", "Mobile Car Wash", "Pressure Washing", "Other"],
      },
      card: {
        title: "Ready for a Spotless Space?", desc: "Contact us today for a free, no-obligation quote.",
        checks: ["Free Estimates", "Flexible Scheduling", "Satisfaction Guaranteed", "Locally Owned & Operated"],
        cta1: "Call Now", cta2: "WhatsApp",
      },
      google: "View on Google Business",
    },
    footer: {
      desc: "Professional cleaning services throughout Palm Beach County — residential, commercial, and specialty cleaning done right.",
      services: "Services", contact: "Contact", legal: "Legal",
      privacy: "Privacy Policy & Terms",
      rights: "All rights reserved.", tagline: "Better Price · Better Solutions · Perfect Clean", madeBy: "Made by",
    },
  },
  es: {
    nav: { services: "Servicios", whyUs: "Por Qué Nosotros", about: "Nosotros", contact: "Contacto" },
    hero: {
      title1: "RIDGE PERFECT", title2: "CLEANING",
      subtitle: "Limpieza Más Allá de las Expectativas",
      desc: "Servicios profesionales de limpieza residencial y comercial en todo Palm Beach County.",
      tagline: "Mejor Precio · Mejores Soluciones · Limpieza Perfecta",
      cta1: "Obtén una Cotización", cta2: "Llamar Ahora",
      s1v: "100%", s1l: "Satisfacción", s2v: "8+", s2l: "Tipos de Servicio", s3v: "24/7", s3l: "Disponibilidad",
    },
    services: {
      heading: "Nuestros Servicios", sub: "Todo lo que tu espacio necesita — con cuidado y profesionalismo",
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
    beforeAfter: {
      heading: "Antes & Después",
      sub: "La diferencia Ridge — resultados visibles en cada limpieza",
      before: "Antes", after: "Después",
      items: [
        { img: "/image-1a.png", label: "Limpieza Profunda de Cocina" },
        { img: "/image-1c.png", label: "Alfombra de Sala" },
        { img: "/image-2c.png", label: "Escritorio de Oficina" },
      ],
    },
    pricing: {
      heading: "Precios", sub: "Tarifas transparentes, sin costos ocultos",
      note: "* El precio final depende del tamaño y condición de la propiedad. Siempre incluye estimado gratuito.",
      cta: "Obtén Cotización",
      plans: [
        { name: "Limpieza Básica", price: "Desde $80", color: "border-[#3AB5E5]", badge: "", features: ["Cocina y baños", "Aspirado y trapeado", "Desempolvado", "Retiro de basura", "Hasta 2 habitaciones"] },
        { name: "Limpieza Profunda", price: "Desde $160", color: "border-[#0D2B4E]", badge: "Más Popular", features: ["Todo lo de Básica", "Interior de electrodomésticos", "Rodapiés y persianas", "Interior de gabinetes", "Hasta 4 habitaciones"] },
        { name: "Comercial / Especial", price: "Cotización", color: "border-[#6BC043]", badge: "", features: ["Oficinas y negocios", "Post-construcción", "Mudanza / Entrada", "Turnos Airbnb", "Lavado a presión"] },
      ],
    },
    testimonials: {
      heading: "Reseñas de Google", sub: "Lo que dicen nuestros clientes",
      items: [
        { name: "María L.", area: "West Palm Beach, FL", date: "hace 2 semanas", text: "¡Excelente servicio! Todo impecable y puntuales.", stars: 5, service: "Limpieza Profunda" },
        { name: "James T.", area: "Boca Raton, FL", date: "hace 1 mes", text: "Manejan mis Airbnb cada semana. Mis huéspedes siempre califican la limpieza con 5 estrellas. Muy confiables.", stars: 5, service: "Limpieza Airbnb" },
        { name: "Sandra R.", area: "Boynton Beach, FL", date: "hace 3 semanas", text: "Muy buen servicio, pero el precio es un poco elevado. Aun así el resultado valió la pena — quedó perfecto.", stars: 4, service: "Post-Construcción" },
        { name: "Carlos M.", area: "Lake Worth, FL", date: "hace 5 días", text: "Muy profesionales. Llegaron a tiempo y dejaron todo impecable. Los volvería a contratar.", stars: 5, service: "Limpieza Residencial" },
        { name: "Jennifer K.", area: "Delray Beach, FL", date: "hace 2 meses", text: "¡La mejor empresa de limpieza en Palm Beach! Rápidos, completos y muy amables.", stars: 5, service: "Limpieza Comercial" },
      ],
    },
    why: {
      heading: "Por Qué Elegirnos", sub: "La confianza de cientos de clientes en Palm Beach County",
      items: [
        { title: "Equipo Experimentado", desc: "Años de experiencia en limpieza profesional" },
        { title: "Precios Accesibles", desc: "Tarifas competitivas sin costos ocultos" },
        { title: "Horarios Flexibles", desc: "Reserva en cualquier momento — disponibilidad 24/7" },
        { title: "Confiables y Seguros", desc: "Profesionales asegurados y verificados" },
        { title: "100% Satisfacción", desc: "No terminamos hasta que estés feliz" },
      ],
      card: { title: "Garantía de 100% Satisfacción", checks: ["Productos de Base Vegetal", "Asegurados y Certificados", "Limpieza Ecológica", "Personal Verificado"], cta: "Reserva tu Limpieza" },
    },
    about: {
      heading: "Sobre Nosotros", sub: "Empresa local, orientada a la comunidad",
      p1: "Ridge Perfect Cleaning Solutions es una empresa de confianza que sirve a Palm Beach County. Ofrecemos servicios de limpieza residencial, comercial y especializada con compromiso de excelencia y atención al detalle.",
      p2: "Nuestros profesionales capacitados y verificados usan productos ecológicos de base vegetal para mantener tu espacio impecable, protegiendo a tu familia y al medio ambiente.",
    },
    faq: {
      heading: "Preguntas Frecuentes", sub: "Respuestas a las preguntas más comunes",
      items: [
        { q: "¿Traen sus propios productos?", a: "¡Sí! Traemos todos los productos ecológicos de base vegetal y el equipo necesario sin costo adicional." },
        { q: "¿Están asegurados y certificados?", a: "Absolutamente. Ridge Perfect Cleaning está completamente asegurado. Todo el personal pasa verificación de antecedentes." },
        { q: "¿Cómo obtengo una cotización?", a: "Llámanos al (561) 818-0778, envía un email, o completa el formulario de contacto. Te respondemos en pocas horas." },
        { q: "¿Cuánto tiempo dura una limpieza?", a: "Una casa de 2 habitaciones toma aproximadamente 2–3 horas. Las limpiezas profundas pueden tomar más." },
        { q: "¿Necesito estar en casa?", a: "Para nada. Muchos clientes nos dan una llave o código de acceso. Tratamos cada hogar con el mismo cuidado." },
        { q: "¿Qué áreas cubren?", a: "Servimos todo Palm Beach County: West Palm Beach, Lake Worth, Boynton Beach, Delray Beach, Boca Raton, Palm Beach Gardens y áreas cercanas." },
      ],
    },
    areas: { heading: "Áreas de Servicio", list: ["West Palm Beach", "Lake Worth", "Boynton Beach", "Delray Beach", "Boca Raton", "Palm Beach Gardens", "& Áreas Cercanas"] },
    contact: {
      heading: "Contáctanos", sub: "Obtén tu cotización gratuita hoy",
      call: "Llámanos", email: "Escríbenos", area: "Área de Servicio", areaVal: "Palm Beach County, FL",
      form: {
        name: "Tu Nombre", phone: "Número de Teléfono", service: "Servicio Necesario",
        message: "Cuéntanos sobre tu espacio (tamaño, tipo, notas...)",
        send: "Enviar Mensaje", sending: "Enviando...",
        success: "¡Mensaje enviado! Te contactaremos en pocas horas.",
        error: "Algo salió mal. Por favor llámanos directamente.",
        services: ["Limpieza Residencial", "Limpieza Comercial", "Limpieza Profunda", "Mudanza / Entrada", "Limpieza Airbnb", "Post-Construcción", "Lavado de Autos Móvil", "Lavado a Presión", "Otro"],
      },
      card: {
        title: "¿Listo para un Espacio Impecable?", desc: "Contáctanos hoy para una cotización gratuita y sin compromiso.",
        checks: ["Estimados Gratuitos", "Horarios Flexibles", "Satisfacción Garantizada", "Empresa Local"],
        cta1: "Llamar Ahora", cta2: "WhatsApp",
      },
      google: "Ver en Google Business",
    },
    footer: {
      desc: "Servicios de limpieza profesional en todo Palm Beach County — residencial, comercial y especializada.",
      services: "Servicios", contact: "Contacto", legal: "Legal",
      privacy: "Política de Privacidad y Términos",
      rights: "Todos los derechos reservados.", tagline: "Mejor Precio · Mejores Soluciones · Limpieza Perfecta", madeBy: "Hecho por",
    },
  },
};

const serviceIcons = [HomeIcon, Building2, Sparkles, ArrowLeftRight, BedDouble, HardHat, Car, Droplets];
const whyIcons    = [Star, DollarSign, CalendarCheck, ShieldCheck, UserCheck];

// ─── Reveal on scroll ─────────────────────────────────────────────────────────
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
const Logo = () => (
  <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center select-none group">
    <img
      src="/logo.png"
      alt="Ridge Perfect Cleaning"
      className="h-12 sm:h-14 w-auto group-hover:scale-105 transition-transform duration-200"
    />
  </button>
);

// ─── CountUp animation ────────────────────────────────────────────────────────
const CountUp = ({ end, suffix = "", duration = 1800, className = "" }: { end: number; suffix?: string; duration?: number; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const startT = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - startT) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(end * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);
  return <span ref={ref} className={className}>{val}{suffix}</span>;
};

// ─── Before/After card ────────────────────────────────────────────────────────
const BeforeAfterCard = ({ img, label, before, after }: { img: string; label: string; before: string; after: string }) => {
  const [revealed, setRevealed] = useState(30);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const update = (clientX: number) => {
    const el = containerRef.current; if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    setRevealed(pct);
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
      <div
        ref={containerRef}
        className="relative select-none cursor-col-resize"
        style={{ aspectRatio: "4/3" }}
        onMouseDown={() => { dragging.current = true; }}
        onMouseMove={e => { if (dragging.current) update(e.clientX); }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onTouchMove={e => update(e.touches[0].clientX)}
      >
        {/* AFTER (clean) */}
        <img src={img} alt={`${label} after`} className="absolute inset-0 w-full h-full object-cover" />

        {/* BEFORE (dirty look via CSS) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${100 - revealed}%`, right: 0, left: "auto" }}>
          <img
            src={img} alt={`${label} before`}
            className="absolute inset-0 h-full object-cover"
            style={{ width: `${10000 / (100 - revealed)}%`, maxWidth: "none", filter: "grayscale(0.7) brightness(0.65) contrast(1.1) sepia(0.2)", right: 0, left: "auto" }}
          />
        </div>

        {/* Divider */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none" style={{ left: `${revealed}%` }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 8H1M1 8L3 6M1 8L3 10M11 8H15M15 8L13 6M15 8L13 10" stroke="#0D2B4E" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 bg-gray-800/70 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">{before}</span>
        <span className="absolute top-3 right-3 bg-[#3AB5E5]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">{after}</span>
      </div>
      <div className="px-4 py-3 bg-white">
        <p className="text-[#0D2B4E] font-bold text-sm">{label}</p>
        <p className="text-gray-400 text-xs">
          {before === "Before" ? "Drag to compare" : "Desliza para comparar"}
        </p>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
export const Home = () => {
  const [lang,     setLang]     = useState<"en" | "es">(getBrowserLang);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq,  setOpenFaq]  = useState<number | null>(null);
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [activeReview, setActiveReview] = useState(0);

  // Auto-advance carousel every 3s
  useEffect(() => {
    const items = t[lang].testimonials.items;
    const id = setInterval(() => setActiveReview(i => (i + 1) % items.length), 3000);
    return () => clearInterval(id);
  }, [lang]);
  const tx = t[lang];

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Real form submission via Formspree
  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch("https://formspree.io/f/xpwzadkb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: `Cleaning Request – ${form.service || "General"}` }),
      });
      if (res.ok) {
        setFormState("success");
        setForm({ name: "", phone: "", service: "", message: "" });
        setTimeout(() => setFormState("idle"), 6000);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 5000);
      }
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 5000);
    }
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
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pring  { 0%{box-shadow:0 0 0 0 rgba(58,181,229,.5)} 70%{box-shadow:0 0 0 14px rgba(58,181,229,0)} 100%{box-shadow:0 0 0 0 rgba(58,181,229,0)} }
        @keyframes wpulse { 0%{box-shadow:0 0 0 0 rgba(37,211,102,.5)} 70%{box-shadow:0 0 0 14px rgba(37,211,102,0)} 100%{box-shadow:0 0 0 0 rgba(37,211,102,0)} }
        @keyframes cpulse { 0%{box-shadow:0 0 0 0 rgba(58,181,229,.5)} 70%{box-shadow:0 0 0 12px rgba(58,181,229,0)} 100%{box-shadow:0 0 0 0 rgba(58,181,229,0)} }
        @keyframes blob   { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-40px) scale(1.1)} 66%{transform:translate(-20px,30px) scale(.95)} }
        @keyframes shimmer-text { 0%,100%{filter:brightness(1) drop-shadow(0 0 0 rgba(58,181,229,0))} 50%{filter:brightness(1.2) drop-shadow(0 0 18px rgba(58,181,229,.55))} }
        @keyframes tilt   { 0%,100%{transform:rotate(-.6deg)} 50%{transform:rotate(.6deg)} }
        @keyframes fade-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .float   { animation:float 4s ease-in-out infinite; }
        .pring   { animation:pring 2.4s ease-out infinite; }
        .wpulse  { animation:wpulse 2.2s ease-out infinite; }
        .cpulse  { animation:cpulse 2s ease-out infinite; }
        .animate-blob         { animation:blob 14s ease-in-out infinite; }
        .animate-blob-slow    { animation:blob 20s ease-in-out infinite reverse; }
        .animate-blob-delayed { animation:blob 18s ease-in-out infinite; animation-delay:-6s; }
        .animate-shimmer-text { animation:shimmer-text 3.5s ease-in-out infinite; }
        .animate-tilt         { animation:tilt 6s ease-in-out infinite; }
        .animate-fade-in      { animation:fade-in .8s ease-out; }
        .card-lift { transition:transform .22s ease,box-shadow .22s ease; }
        .card-lift:hover { transform:translateY(-5px); box-shadow:0 16px 36px rgba(13,43,78,.10); }
        .icon-wrap { transition:background .2s ease,transform .2s ease; }
        .icon-wrap:hover { transform:scale(1.07) rotate(-4deg); }
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

      {/* ── FLOATING BUTTONS (mobile: call + WhatsApp | desktop: WhatsApp only) ── */}
      <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3 items-end">
        {/* Call — mobile only */}
        <a href="tel:5618180778"
          className="cpulse md:hidden flex items-center gap-2 bg-[#3AB5E5] text-white pl-4 pr-5 py-3 rounded-full shadow-lg font-bold text-sm hover:bg-[#2aa0d0] transition-colors">
          <Phone size={18} /> {lang === "en" ? "Call" : "Llamar"}
        </a>
        {/* WhatsApp — always visible */}
        <a href="https://wa.me/15618180778" target="_blank" rel="noopener noreferrer"
          className="wpulse flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-lg font-bold text-sm hover:bg-[#20c05a] transition-colors">
          <MessageCircle size={18} fill="white" strokeWidth={0} />
          WhatsApp
        </a>
      </div>

      {/* ── NAVBAR — always white, always same height ────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Logo />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="ul-fx text-sm font-semibold tracking-wide text-[#0D2B4E] hover:text-[#3AB5E5] transition-colors">
                {label}
              </button>
            ))}
            <button onClick={() => setLang(l => l === "en" ? "es" : "en")}
              className="flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full border border-[#3AB5E5] text-[#3AB5E5] hover:bg-[#3AB5E5] hover:text-white transition-all">
              <Globe size={14} /> {lang === "en" ? "ES" : "EN"}
            </button>
            <a href="tel:5618180778"
              className="pring btn-p flex items-center gap-2 bg-[#3AB5E5] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#2aa0d0]">
              <Phone size={15} /> (561) 818-0778
            </a>
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setLang(l => l === "en" ? "es" : "en")}
              className="flex items-center gap-1 text-sm font-bold px-2.5 py-1.5 rounded-full border border-[#3AB5E5] text-[#3AB5E5]">
              <Globe size={13} /> {lang === "en" ? "ES" : "EN"}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 text-[#0D2B4E]">
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
      <section
        className="relative overflow-hidden bg-[#0D2B4E]"
        style={{
          minHeight: "100vh",
          backgroundImage: "url('/Image4.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Gradient overlay — darker center/right where text sits, lets photo breathe on edges */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(13,43,78,0.55) 0%, rgba(13,43,78,0.78) 50%, rgba(13,43,78,0.82) 100%)"
        }} />

        {/* Content — left aligned */}
        <div
          className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-20 max-w-3xl"
          style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 90 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest self-start">
            <Star size={11} fill="#FBBF24" strokeWidth={0} />
            {lang === "en" ? "Palm Beach County's Trusted Cleaning" : "La Limpieza de Confianza en Palm Beach"}
          </div>

          {/* RIDGE — Orbitron bold italic */}
          <div
            className="leading-none text-[#3AB5E5] animate-shimmer-text mb-1"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(4rem, 14vw, 10rem)",
              letterSpacing: "-0.01em",
              textShadow: "0 4px 32px rgba(58,181,229,0.35)",
            }}
          >
            RIDGE
          </div>

          {/* Accent line */}
          <div className="flex items-center gap-3 mb-2 max-w-xs">
            <div className="h-px flex-1 bg-[#3AB5E5]/50" />
            <div className="w-2 h-2 rounded-full bg-[#6BC043]" />
            <div className="h-px flex-1 bg-[#6BC043]/50" />
          </div>

          {/* PERFECT CLEANING — Bebas Neue */}
          <div
            className="leading-none text-white mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(1.8rem, 6vw, 4rem)",
              letterSpacing: "0.22em",
              textShadow: "0 2px 16px rgba(0,0,0,0.4)",
            }}
          >
            PERFECT CLEANING
          </div>

          <p className="text-white/75 italic text-sm sm:text-base mb-1">{tx.hero.subtitle}</p>
          <p className="text-white/60 text-xs sm:text-sm max-w-md mb-3">{tx.hero.desc}</p>

          {/* Tagline — 3 brand colors */}
          <p className="text-xs font-bold uppercase tracking-widest mb-7">
            <span className="text-[#3AB5E5]">{lang === "en" ? "Better Price" : "Mejor Precio"}</span>
            <span className="text-white/40 mx-2">·</span>
            <span className="text-[#6BC043]">{lang === "en" ? "Better Solutions" : "Mejores Soluciones"}</span>
            <span className="text-white/40 mx-2">·</span>
            <span className="text-white">{lang === "en" ? "Perfect Clean" : "Limpieza Perfecta"}</span>
          </p>

          <div className="flex flex-row gap-3 mb-10 flex-wrap">
            <button onClick={() => scrollTo("contact")}
              className="btn-p bg-[#3AB5E5] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg">
              {tx.hero.cta1}
            </button>
            <a href="tel:5618180778"
              className="btn-o border-2 border-white/40 text-white px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-white hover:text-[#0D2B4E] hover:border-white">
              <Phone size={14} /> {tx.hero.cta2}
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 sm:gap-12">
            {[
              { v: 100, suf: "%", l: tx.hero.s1l },
              { v: 8, suf: "+", l: tx.hero.s2l },
              { l: tx.hero.s3l, raw: "24/7" },
            ].map(({ v, suf, l, raw }) => (
              <div key={l} className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-[#3AB5E5]">{raw ?? <CountUp end={v!} suffix={suf} />}</div>
                <div className="text-[10px] text-white/45 uppercase tracking-widest mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => scrollTo("services")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors float z-10">
          <ArrowDown size={20} />
        </button>

        {/* Pronounced wave */}
        <div className="absolute bottom-0 left-0 right-0 -mb-px z-10">
          <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block">
            <path d="M0,0 C240,100 480,0 720,60 C960,100 1200,20 1440,70 L1440,100 L0,100 Z" fill="white" />
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

      {/* ── BEFORE & AFTER ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-[#F8FBFF]">
        <div className="max-w-5xl mx-auto">
          <SectionHead label={tx.beforeAfter.heading} title={tx.beforeAfter.sub} />
          <div className="grid sm:grid-cols-3 gap-5">
            {tx.beforeAfter.items.map(({ img, label }, i) => (
              <Reveal key={label} delay={i * 70}>
                <BeforeAfterCard
                  img={img}
                  label={label}
                  before={tx.beforeAfter.before}
                  after={tx.beforeAfter.after}
                />
              </Reveal>
            ))}
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
                        <CheckCircle size={15} strokeWidth={2} className="text-[#6BC043] shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollTo("contact")}
                    className="btn-p mt-7 w-full bg-[#3AB5E5] text-white py-2.5 rounded-full font-bold text-sm hover:bg-[#2aa0d0]">
                    {tx.pricing.cta}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><p className="text-center text-gray-400 text-xs mt-6">{tx.pricing.note}</p></Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS CAROUSEL ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-[#F8FBFF]">
        <div className="max-w-2xl mx-auto">
          <SectionHead label={tx.testimonials.heading} title={tx.testimonials.sub} />
          <Reveal>
            <div className="relative overflow-hidden">
              {tx.testimonials.items.map(({ name, area, date, text, stars, service }, i) => (
                <div
                  key={name}
                  className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col"
                  style={{
                    display: i === activeReview ? "flex" : "none",
                    animation: i === activeReview ? "fade-in 0.4s ease" : "none",
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={16} fill={s < stars ? "#FBBF24" : "#E5E7EB"} strokeWidth={0} />
                      ))}
                    </div>
                    {/* Google G */}
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed mb-6">"{text}"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-[#3AB5E5] flex items-center justify-center text-white font-black shrink-0">
                      {name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#0D2B4E] text-sm">{name}</div>
                      <div className="text-gray-400 text-xs">{area}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] bg-[#EEF8FD] text-[#3AB5E5] font-semibold px-2.5 py-0.5 rounded-full">{service}</span>
                      <span className="text-[10px] text-gray-400">{date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {tx.testimonials.items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveReview(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === activeReview ? 24 : 8,
                    height: 8,
                    background: i === activeReview ? "#3AB5E5" : "#CBD5E1",
                  }}
                />
              ))}
            </div>
          </Reveal>
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

      {/* ── ABOUT ────────────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 px-4 sm:px-6 bg-[#F8FBFF]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              <div className="img-zoom rounded-2xl overflow-hidden row-span-2" style={{ aspectRatio: "3/4" }}>
                <img src="/image-1a.png" alt="Residential cleaning" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="img-zoom rounded-2xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
                <img src="/image-1b.png" alt="Our team" className="w-full h-full object-cover" loading="lazy" />
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
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors">
                    <span className="font-bold text-[#0D2B4E] text-sm pr-4">{q}</span>
                    <ChevronDown size={18} className="text-[#3AB5E5] shrink-0 transition-transform duration-200"
                      style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 border-t border-gray-50">
                      <p className="text-gray-500 text-sm leading-relaxed pt-3">{a}</p>
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
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-8">{tx.areas.heading}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {tx.areas.list.map(area => (
                <span key={area} className="bg-white/10 text-white px-5 py-2.5 rounded-full text-sm font-semibold border border-white/20 hover:bg-white/20 transition-colors cursor-default backdrop-blur-sm">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CONTACT + FORM ───────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 px-4 sm:px-6 bg-[#F8FBFF]">
        <div className="max-w-6xl mx-auto">
          <SectionHead label={tx.contact.heading} title={tx.contact.sub} />
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* Left */}
            <div className="space-y-4">
              {[
                { href: "tel:5618180778", Icon: Phone, bg: "bg-[#3AB5E5]", label: tx.contact.call, value: "(561) 818-0778", hc: "group-hover:text-[#3AB5E5]" },
                { href: "mailto:info@ridgeperfectcleaning.com", Icon: Mail, bg: "bg-[#6BC043]", label: tx.contact.email, value: "info@ridgeperfectcleaning.com", hc: "group-hover:text-[#6BC043]" },
              ].map(({ href, Icon, bg, label, value, hc }) => (
                <a key={label} href={href} className="card-lift group flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-5 block">
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

              {/* Real contact form — Formspree */}
              <form onSubmit={handleForm} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-black text-[#0D2B4E] text-base">
                  {lang === "en" ? "Send us a message" : "Envíanos un mensaje"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required type="text" placeholder={tx.contact.form.name} value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full transition-all" />
                  <input type="tel" placeholder={tx.contact.form.phone} value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full transition-all" />
                </div>
                <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full text-gray-600 transition-all bg-white">
                  <option value="">{tx.contact.form.service}</option>
                  {tx.contact.form.services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <textarea rows={3} placeholder={tx.contact.form.message} value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full resize-none transition-all" />

                {formState === "success" ? (
                  <div className="flex items-center gap-2 text-[#6BC043] font-semibold text-sm bg-green-50 px-4 py-3 rounded-xl">
                    <CheckCircle size={16} /> {tx.contact.form.success}
                  </div>
                ) : formState === "error" ? (
                  <div className="flex items-center gap-2 text-red-500 font-semibold text-sm bg-red-50 px-4 py-3 rounded-xl">
                    <X size={16} /> {tx.contact.form.error}
                  </div>
                ) : (
                  <button type="submit" disabled={formState === "sending"}
                    className="btn-p flex items-center gap-2 bg-[#0D2B4E] text-white px-6 py-3 rounded-full font-bold text-sm disabled:opacity-60">
                    {formState === "sending"
                      ? <><Loader2 size={14} className="animate-spin" /> {tx.contact.form.sending}</>
                      : <><Send size={14} /> {tx.contact.form.send}</>
                    }
                  </button>
                )}
              </form>
            </div>

            {/* Right CTA */}
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
                  <a href="https://maps.google.com/?q=Ridge+Perfect+Cleaning+Palm+Beach+County+FL"
                    target="_blank" rel="noopener noreferrer"
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
            <div className="mb-4">
              <img src="/Logocomplet_1.png" alt="Ridge Perfect Cleaning" className="h-14 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
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
            <div className="space-y-3 mb-6">
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
            <h4 className="text-[10px] font-bold text-[#3AB5E5] uppercase tracking-widest mb-3">{tx.footer.legal}</h4>
            <a href="/privacy" className="flex items-center gap-2 text-gray-400 hover:text-white text-xs transition-colors">
              <ChevronRight size={11} className="text-[#6BC043] shrink-0" /> {tx.footer.privacy}
            </a>
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
