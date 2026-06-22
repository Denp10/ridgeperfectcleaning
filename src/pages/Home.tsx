import { useState, useEffect } from "react";
import {
  Home as HomeIcon,
  Building2,
  Sparkles,
  ArrowLeftRight,
  Hotel,
  HardHat,
  Car,
  Droplets,
  CheckCircle2,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";

const services = [
  { icon: HomeIcon, title: "Residential Cleaning", desc: "Thorough home cleaning tailored to your needs" },
  { icon: Building2, title: "Commercial Cleaning", desc: "Professional office and business cleaning" },
  { icon: Sparkles, title: "Deep Cleaning", desc: "Intensive cleaning for a spotless result" },
  { icon: ArrowLeftRight, title: "Move-In / Move-Out", desc: "Full cleaning for smooth transitions" },
  { icon: Hotel, title: "Airbnb Cleaning", desc: "Fast turnarounds for short-term rentals" },
  { icon: HardHat, title: "Post-Construction", desc: "Dust and debris removal after builds" },
  { icon: Car, title: "Mobile Car Wash", desc: "We come to you for a spotless vehicle" },
  { icon: Droplets, title: "Pressure Washing", desc: "Blast away grime from any surface" },
];

const whyUs = [
  { title: "Experienced Team", desc: "Years of professional cleaning expertise" },
  { title: "Affordable Pricing", desc: "Competitive rates with no hidden fees" },
  { title: "Flexible Scheduling", desc: "24/7 booking to fit your lifestyle" },
  { title: "Reliable & Trustworthy", desc: "Background-checked, insured professionals" },
  { title: "100% Satisfaction", desc: "We're not done until you're happy" },
];

const areas = [
  "West Palm Beach",
  "Lake Worth",
  "Boynton Beach",
  "Delray Beach",
  "Boca Raton",
  "Palm Beach Gardens",
  "& Surrounding Areas",
];

export const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="font-sans text-gray-800">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col leading-none select-none">
            <span className="text-2xl font-black tracking-widest text-[#3AB5E5]">RIDGE</span>
            <span className={`text-[10px] font-bold tracking-widest ${scrolled ? "text-[#0D2B4E]" : "text-white"}`}>
              PERFECT CLEANING
            </span>
            <span className="text-[10px] font-bold tracking-widest text-[#6BC043]">SOLUTIONS</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {["services", "why-us", "about", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                  scrolled ? "text-[#0D2B4E] hover:text-[#3AB5E5]" : "text-white hover:text-[#3AB5E5]"
                }`}
              >
                {id === "why-us" ? "Why Us" : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            <a
              href="tel:5618180778"
              className="bg-[#3AB5E5] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#2aa0d0] transition-colors"
            >
              (561) 818-0778
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden ${scrolled ? "text-[#0D2B4E]" : "text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg px-4 pb-4">
            {["services", "why-us", "about", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block w-full text-left py-2 text-[#0D2B4E] font-semibold uppercase text-sm tracking-wide border-b border-gray-100"
              >
                {id === "why-us" ? "Why Us" : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            <a
              href="tel:5618180778"
              className="block mt-3 bg-[#3AB5E5] text-white text-center px-4 py-2 rounded-full text-sm font-bold"
            >
              (561) 818-0778
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen bg-[#0D2B4E] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-widest mb-4">
            <span className="text-[#3AB5E5]">RIDGE PERFECT </span>
            <span className="text-[#6BC043]">CLEANING</span>
          </h1>
          <p className="text-xl md:text-2xl italic text-gray-300 mb-6">Cleaning Beyond Expectations</p>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Professional Residential &amp; Commercial Cleaning Services throughout Palm Beach County.
            Better Price. Better Solutions. Perfect Clean.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <button
              onClick={() => scrollTo("contact")}
              className="bg-[#3AB5E5] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#2aa0d0] transition-colors shadow-lg"
            >
              Get a Free Quote
            </button>
            <a
              href="tel:5618180778"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#0D2B4E] transition-colors"
            >
              📞 (561) 818-0778
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-white">
            {[
              { value: "100%", label: "Satisfaction" },
              { value: "8+", label: "Service Types" },
              { value: "24/7", label: "Scheduling" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-[#3AB5E5]">{s.value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#0D2B4E] mb-3">Our Services</h2>
            <div className="w-16 h-1 bg-[#3AB5E5] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div className="w-14 h-14 bg-[#F0F9FF] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#3AB5E5] transition-colors">
                  <Icon size={26} className="text-[#3AB5E5] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#0D2B4E] text-sm mb-1">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-us" className="py-20 px-4 bg-[#F0F9FF]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#0D2B4E] mb-3">Why Choose Us</h2>
            <div className="w-16 h-1 bg-[#3AB5E5] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left */}
            <div className="space-y-4">
              {whyUs.map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
                  <div className="w-10 h-10 bg-[#3AB5E5] rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0D2B4E]">{title}</h3>
                    <p className="text-gray-500 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Right */}
            <div className="bg-[#0D2B4E] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-black mb-2 text-[#3AB5E5]">100% Satisfaction</h3>
              <h4 className="text-xl font-bold mb-6">Guarantee</h4>
              <div className="space-y-3 mb-8">
                {["Plant-Based Products", "Insured & Bonded", "Eco-Friendly Cleaning", "Background Checked Staff"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-[#6BC043] shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  )
                )}
              </div>
              <button
                onClick={() => scrollTo("contact")}
                className="w-full bg-[#3AB5E5] text-white py-3 rounded-full font-bold hover:bg-[#2aa0d0] transition-colors"
              >
                Book Your Cleaning
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left mosaic */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#3AB5E5] rounded-2xl p-6 text-white">
              <div className="text-3xl font-black mb-1">5★</div>
              <div className="text-sm font-semibold">Client Rated</div>
            </div>
            <div className="bg-[#6BC043] rounded-2xl p-6 text-white">
              <div className="text-3xl font-black mb-1">8+</div>
              <div className="text-sm font-semibold">Service Types</div>
            </div>
            <div className="bg-[#0D2B4E] rounded-2xl p-6 text-white">
              <div className="text-3xl font-black mb-1">24/7</div>
              <div className="text-sm font-semibold">Scheduling</div>
            </div>
            <div className="bg-[#F0F9FF] rounded-2xl p-6 border border-[#3AB5E5]">
              <div className="text-3xl font-black mb-1 text-[#0D2B4E]">100%</div>
              <div className="text-sm font-semibold text-[#0D2B4E]">Satisfaction</div>
            </div>
          </div>
          {/* Right text */}
          <div>
            <h2 className="text-4xl font-black text-[#0D2B4E] mb-4">About Ridge Perfect Cleaning</h2>
            <div className="w-16 h-1 bg-[#3AB5E5] rounded-full mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4">
              Ridge Perfect Cleaning Solutions is a trusted cleaning company serving Palm Beach County with pride.
              We deliver residential, commercial, and specialty cleaning services with a commitment to excellence
              and attention to detail that sets us apart.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our team of trained, background-checked professionals uses eco-friendly, plant-based products to
              keep your space spotless while protecting your family and the environment.
            </p>
            <p className="text-xl font-bold text-[#0D2B4E]">
              Better Price.{" "}
              <span className="text-[#3AB5E5]">Better Solutions.</span>{" "}
              <span className="text-[#6BC043]">Perfect Clean.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#0D2B4E] to-[#3AB5E5]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-8">Service Areas</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {areas.map((area) => (
              <span
                key={area}
                className="bg-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/30"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#0D2B4E] mb-3">Contact Us</h2>
            <div className="w-16 h-1 bg-[#3AB5E5] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left contact cards */}
            <div className="space-y-4">
              <a
                href="tel:5618180778"
                className="flex items-center gap-4 bg-[#F0F9FF] rounded-xl p-5 border border-[#3AB5E5]/20 hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-[#3AB5E5] rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Call Us</div>
                  <div className="text-lg font-bold text-[#0D2B4E] group-hover:text-[#3AB5E5] transition-colors">
                    (561) 818-0778
                  </div>
                </div>
              </a>
              <a
                href="mailto:info@ridgeperfectcleaning.com"
                className="flex items-center gap-4 bg-[#F0F9FF] rounded-xl p-5 border border-[#3AB5E5]/20 hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-[#6BC043] rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Email Us</div>
                  <div className="text-lg font-bold text-[#0D2B4E] group-hover:text-[#6BC043] transition-colors">
                    info@ridgeperfectcleaning.com
                  </div>
                </div>
              </a>
              <div className="flex items-center gap-4 bg-[#F0F9FF] rounded-xl p-5 border border-[#3AB5E5]/20">
                <div className="w-12 h-12 bg-[#0D2B4E] rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Service Area</div>
                  <div className="text-lg font-bold text-[#0D2B4E]">Palm Beach County, FL</div>
                </div>
              </div>
            </div>
            {/* Right CTA card */}
            <div className="bg-[#0D2B4E] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-black mb-2">Ready for a Spotless Space?</h3>
              <p className="text-gray-400 mb-6 text-sm">
                Contact us today for a free, no-obligation quote. We serve all of Palm Beach County.
              </p>
              <div className="space-y-2 mb-8">
                {["Free Estimates", "Flexible Scheduling", "Satisfaction Guaranteed", "Locally Owned & Operated"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-[#6BC043] shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:5618180778"
                  className="bg-[#3AB5E5] text-white py-3 rounded-full font-bold text-center hover:bg-[#2aa0d0] transition-colors"
                >
                  📞 Call Now
                </a>
                <a
                  href="mailto:info@ridgeperfectcleaning.com"
                  className="border-2 border-[#3AB5E5] text-[#3AB5E5] py-3 rounded-full font-bold text-center hover:bg-[#3AB5E5] hover:text-white transition-colors"
                >
                  ✉️ Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D2B4E] text-white py-14 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {/* Logo + desc */}
          <div>
            <div className="flex flex-col leading-none mb-4">
              <span className="text-2xl font-black tracking-widest text-[#3AB5E5]">RIDGE</span>
              <span className="text-xs font-bold tracking-widest text-white">PERFECT CLEANING</span>
              <span className="text-xs font-bold tracking-widest text-[#6BC043]">SOLUTIONS</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional cleaning services throughout Palm Beach County. Residential, commercial, and specialty
              cleaning done right.
            </p>
          </div>
          {/* Services list */}
          <div>
            <h4 className="font-bold text-[#3AB5E5] uppercase tracking-wide text-sm mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map(({ title }) => (
                <li key={title} className="flex items-center gap-2 text-gray-400 text-sm">
                  <ChevronRight size={14} className="text-[#6BC043]" />
                  {title}
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="font-bold text-[#3AB5E5] uppercase tracking-wide text-sm mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:5618180778" className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors">
                <Phone size={14} className="text-[#3AB5E5]" /> (561) 818-0778
              </a>
              <a href="mailto:info@ridgeperfectcleaning.com" className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors">
                <Mail size={14} className="text-[#3AB5E5]" /> info@ridgeperfectcleaning.com
              </a>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin size={14} className="text-[#3AB5E5]" /> Palm Beach County, FL
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Ridge Perfect Cleaning Solutions. All rights reserved.
          </p>
          <p className="text-[#6BC043] text-xs font-semibold">
            Better Price. Better Solutions. Perfect Clean.
          </p>
        </div>
      </footer>
    </div>
  );
};
