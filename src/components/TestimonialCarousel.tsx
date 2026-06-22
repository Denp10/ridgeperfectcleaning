import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const headerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const testimonials = [
  {
    quote: "We were spending over $3,000 a month on fryer oil. After just two months with Fresh Pops, that number dropped to under $1,600. Incredible ROI.",
    quoteEs: "Gastábamos más de $3,000 al mes en aceite de freidora. Después de solo dos meses con Fresh Pops, ese número bajó a menos de $1,600. Un ROI increíble.",
    name: "Carlos M.",
    role: "Kitchen Manager",
    roleEs: "Gerente de Cocina",
    business: "Casa Marina Restaurant, Orlando FL",
    stars: 5,
    metric: "47%",
    metricLabel: "cost reduction",
    metricLabelEs: "reducción de costo",
  },
  {
    quote: "Fresh Pops handles all four of our hotel kitchen fryers. The team is always on time, professional, and the oil quality difference is immediately visible.",
    quoteEs: "Fresh Pops maneja las cuatro freidoras de nuestra cocina del hotel. El equipo siempre llega a tiempo, es profesional y la diferencia en la calidad del aceite es inmediatamente visible.",
    name: "Sandra R.",
    role: "Head of Food & Beverage",
    roleEs: "Directora de Alimentos y Bebidas",
    business: "Palm Court Hotel, Tampa FL",
    stars: 5,
    metric: "2×",
    metricLabel: "oil life",
    metricLabelEs: "vida del aceite",
  },
  {
    quote: "As a school district, food safety is everything. Fresh Pops exceeded our health code standards and their bilingual team made coordination easy for our staff.",
    quoteEs: "Como distrito escolar, la seguridad alimentaria lo es todo. Fresh Pops superó nuestros estándares del código de salud y su equipo bilingüe facilitó la coordinación con nuestro personal.",
    name: "James T.",
    role: "Director of School Nutrition",
    roleEs: "Director de Nutrición Escolar",
    business: "Osceola County Schools, FL",
    stars: 5,
    metric: "$2,100",
    metricLabel: "saved/month",
    metricLabelEs: "ahorrado/mes",
  },
  {
    quote: "Best investment for my food truck. The oil lasts twice as long now, my food tastes better, and I'm not constantly buying oil. Simple and effective.",
    quoteEs: "La mejor inversión para mi food truck. El aceite dura el doble ahora, mi comida sabe mejor y ya no tengo que comprar aceite constantemente. Simple y efectivo.",
    name: "Ana L.",
    role: "Food Truck Owner",
    roleEs: "Propietaria de Food Truck",
    business: "The Rolling Kitchen, Miami FL",
    stars: 5,
    metric: "50%",
    metricLabel: "less oil bought",
    metricLabelEs: "menos aceite comprado",
  },
];

export function TestimonialCarousel() {
  const { t, lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const item = testimonials[current];

  return (
    <section
      className="bg-white py-16 md:py-24 lg:py-32"
      id="testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          variants={headerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
        >
          <div>
            <motion.p variants={fadeUp} className="text-[#16A34A] text-xs font-bold tracking-[0.2em] uppercase mb-3">
              {t('Client Results', 'Resultados de Clientes')}
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] font-[Montserrat] leading-[1.05] tracking-tight">
              {t('What Our Clients Say', 'Lo Que Dicen Nuestros Clientes')}
            </motion.h2>
          </div>
          <motion.div variants={fadeUp} className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#6B7280] hover:border-gray-400 hover:text-[#111827] transition-all"
              aria-label={t('Previous testimonial', 'Testimonio anterior')}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#6B7280] hover:border-gray-400 hover:text-[#111827] transition-all"
              aria-label={t('Next testimonial', 'Siguiente testimonio')}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>

        {/* Testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8 items-start"
          >
            {/* Quote */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10">
              <div className="flex mb-6">
                {Array.from({ length: item.stars }).map((_, i) => (
                  <Star key={i} size={16} fill="#FACC15" className="text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-[#374151] text-lg md:text-xl leading-relaxed font-light mb-8">
                "{lang === 'en' ? item.quote : item.quoteEs}"
              </blockquote>
              <div className="flex items-center gap-3 border-t border-gray-200 pt-6">
                <div className="w-10 h-10 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A] font-bold text-sm">
                  {item.name[0]}
                </div>
                <div>
                  <p className="text-[#111827] font-bold text-sm">{item.name}</p>
                  <p className="text-[#9CA3AF] text-xs">{lang === 'en' ? item.role : item.roleEs} · {item.business}</p>
                </div>
              </div>
            </div>

            {/* Metric card */}
            <div className="bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
              <span className="text-5xl md:text-6xl font-black text-[#16A34A] font-[Montserrat] leading-none mb-3">
                {item.metric}
              </span>
              <p className="text-[#6B7280] text-sm">
                {lang === 'en' ? item.metricLabel : item.metricLabelEs}
              </p>
              <div className="mt-6 w-full border-t border-gray-200 pt-6">
                <p className="text-[#9CA3AF] text-xs">{t('verified result', 'resultado verificado')}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={t(`Go to testimonial ${i + 1}`, `Ir al testimonio ${i + 1}`)}
              aria-current={current === i ? 'true' : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === i ? 'w-8 bg-[#16A34A]' : 'w-3 bg-gray-200 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
