/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Scissors, 
  Star, 
  Clock, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  Award, 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Gem,
  Droplets,
  Eye,
  Smile,
  UserCheck,
  Heart,
  Wind,
  Coffee,
  Users,
  Gift
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

// === PERSONALIZAÇÃO RÁPIDA DO CLIENTE ===
const CONFIG = {
  salonName: "DUNO",
  whatsappNumber: "5511992876219", 
  whatsappMessage: "Olá! Quero transformar meu visual no DUNO. Qual o próximo horário disponível?",
  instagramUrl: "https://instagram.com/duno_premium",
  facebookUrl: "https://facebook.com/dunopremium",
  address: "Av. Paulista, 1000 - Jardins, São Paulo - SP",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.19758700723!2d-46.65867842375662!3d-23.56134966186458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1711570000000!5m2!1spt-BR!2sbr",
};

const WHATSAPP_LINK = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

// --- DADOS DOS SERVIÇOS ---
const SERVICES_DATA: any = {
  masculino: [
    { title: "Corte de Cabelo Masculino", description: "Corte moderno com técnicas de visagismo para o homem contemporâneo.", price: "a partir de R$ 45", icon: Scissors },
    { title: "Corte + Barba", description: "Combo completo para renovar o visual com acabamento impecável.", price: "a partir de R$ 70", icon: UserCheck, badge: "Popular" },
    { title: "Modelagem de Barba", description: "Design e alinhamento de barba com toalha quente e produtos premium.", price: "a partir de R$ 35", icon: Sparkles },
    { title: "Coloração de Barba", description: "Cobertura de fios brancos ou realce da cor natural da barba.", price: "a partir de R$ 60", icon: Zap },
  ],
  feminino: [
    { title: "Corte de Cabelo Feminino", description: "Cortes personalizados que valorizam seu rosto e estilo pessoal.", price: "a partir de R$ 65", icon: Scissors },
    { title: "Coloração Completa", description: "Transformação total da cor com produtos que preservam a saúde dos fios.", price: "a partir de R$ 130", icon: Sparkles, badge: "Destaque" },
    { title: "Mechas / Luzes / Balayage", description: "Técnicas avançadas de iluminação para um resultado natural e brilhante.", price: "a partir de R$ 180", icon: Gem },
    { title: "Escova Simples", description: "Finalização perfeita para o dia a dia ou ocasiões especiais.", price: "a partir de R$ 45", icon: Wind },
  ],
  unisex: [
    { title: "Hidratação Capilar", description: "Reposição de água e nutrientes para fios macios e brilhantes.", price: "a partir de R$ 75", icon: Droplets },
    { title: "Reconstrução / Cauterização", description: "Tratamento profundo para cabelos danificados ou quimicamente tratados.", price: "a partir de R$ 95", icon: ShieldCheck },
    { title: "Manicure Tradicional", description: "Cuidado completo das unhas com esmaltação impecável.", price: "a partir de R$ 35", icon: Heart },
    { title: "Pedicure Tradicional", description: "Tratamento relaxante e estético para os pés.", price: "a partir de R$ 40", icon: Heart },
    { title: "Manicure + Pedicure", description: "Combo completo de cuidados para mãos e pés.", price: "a partir de R$ 70", icon: Heart, badge: "Combo" },
    { title: "Design de Sobrancelhas", description: "Harmonização do olhar com técnicas de medição facial.", price: "a partir de R$ 25", icon: Eye },
    { title: "Depilação com Cera", description: "Remoção de pelos com cera morna (axilas / virilha / pernas).", price: "a partir de R$ 30", icon: Sparkles },
    { title: "Massagem Relaxante Capilar", description: "Alívio de tensões com massagem estimulante no couro cabeludo.", price: "a partir de R$ 50", icon: Smile },
    { title: "Selagem / Progressiva", description: "Alinhamento capilar e redução de volume com brilho intenso.", price: "a partir de R$ 150", icon: Zap },
    { title: "Tonalizante", description: "Banho de brilho e realce da cor sem amônia.", price: "a partir de R$ 80", icon: Sparkles },
  ]
};

// --- DADOS DOS DEPOIMENTOS ---
const TESTIMONIALS = [
  { name: "Ricardo Santos", text: "Melhor experiência de barbearia que já tive. O atendimento é impecável e o ambiente é extremamente luxuoso.", role: "Empresário" },
  { name: "Mariana Costa", text: "Fiz minhas mechas no DUNO e o resultado superou todas as expectativas. O brilho e a saúde do meu cabelo estão incríveis.", role: "Arquiteta" },
  { name: "Juliana Lima", text: "O Day Spa é revigorante. Um refúgio de paz no meio de São Paulo. Vale cada centavo pela exclusividade.", role: "Designer" },
  { name: "Carlos Eduardo", text: "Ambiente fantástico e profissionais de altíssimo nível. O corte visagista realmente mudou minha autoestima.", role: "Advogado" },
  { name: "Beatriz Oliveira", text: "Atendimento personalizado e produtos de primeira linha. Recomendo o DUNO para quem busca o melhor em SP.", role: "Médica" },
  { name: "Fernando Souza", text: "A barba terapia é sensacional. Um momento de relaxamento total em uma rotina estressante. Nota 10!", role: "Engenheiro" }
];

// --- COMPONENTES AUXILIARES ---

const SectionTitle = ({ title, subtitle, description, light = false }: { title: string, subtitle?: string, description?: string, light?: boolean }) => (
  <div className="text-center mb-16 px-4 max-w-4xl mx-auto">
    {subtitle && (
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[var(--primary)] uppercase tracking-[0.3em] text-xs font-bold mb-4 block"
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl lg:text-6xl font-serif ${light ? 'text-black' : 'text-white'} mb-6 leading-tight`}
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`text-sm md:text-lg ${light ? 'text-gray-600' : 'text-[var(--text-muted)]'} mb-8 leading-relaxed italic`}
      >
        {description}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      className="h-[1px] bg-[var(--primary)] mx-auto"
    />
  </div>
);

const ServiceRow = ({ title, description, price, delay, badge }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="group relative py-6 md:py-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] px-4 transition-colors"
  >
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-1">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-serif text-white group-hover:text-[var(--primary)] transition-colors duration-500 uppercase tracking-tight">
          {title}
        </h3>
        {badge && (
          <span className="text-[10px] bg-[var(--primary)] text-black px-2 py-0.5 font-bold uppercase tracking-tighter rounded-sm">
            {badge}
          </span>
        )}
      </div>
      <p className="text-[var(--text-muted)] text-xs md:text-sm max-w-xl leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-500">
        {description}
      </p>
    </div>
    <div className="flex items-center gap-4 md:gap-6">
      <span className="text-lg md:text-xl lg:text-2xl font-light text-[var(--primary)] tracking-tighter italic">
        {price}
      </span>
      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-black transition-all duration-500">
        <ArrowRight size={18} className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
      </div>
    </div>
  </motion.div>
);

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border-b border-white/10 transition-all duration-300 ${isOpen ? 'bg-white/5 rounded-lg px-4' : 'px-0'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 md:py-6 flex justify-between items-center text-left hover:text-[var(--primary)] transition-colors group"
      >
        <span className={`text-base md:text-lg font-medium pr-6 transition-colors ${isOpen ? 'text-[var(--primary)]' : 'text-white'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`shrink-0 ${isOpen ? 'text-[var(--primary)]' : 'text-white/40'}`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm md:text-base text-[var(--text-muted)] leading-relaxed font-light">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- APP PRINCIPAL ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const testimonials = [
    { name: "Ricardo Santos", text: "Melhor experiência de barbearia que já tive. O atendimento é impecável e o ambiente é extremamente luxuoso.", role: "Empresário" },
    { name: "Mariana Costa", text: "Fiz minhas mechas no DUNO e o resultado superou todas as expectativas. O brilho e a saúde do meu cabelo estão incríveis.", role: "Arquiteta" },
    { name: "Juliana Lima", text: "O Day Spa é revigorante. Um refúgio de paz no meio de São Paulo. Vale cada centavo pela exclusividade.", role: "Designer" },
    { name: "Carlos Eduardo", text: "Ambiente fantástico e profissionais de altíssimo nível. O corte visagista realmente mudou minha autoestima.", role: "Advogado" },
    { name: "Beatriz Oliveira", text: "Atendimento personalizado e produtos de primeira linha. Recomendo o DUNO para quem busca o melhor em SP.", role: "Médica" },
    { name: "Fernando Souza", text: "A barba terapia é sensacional. Um momento de relaxamento total em uma rotina estressante. Nota 10!", role: "Engenheiro" }
  ];

  useEffect(() => {
    const handleResize = () => {
      let newItems;
      if (window.innerWidth < 768) newItems = 1;
      else if (window.innerWidth < 1024) newItems = 2;
      else newItems = 3;
      setItemsPerView(newItems);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - itemsPerView);

  useEffect(() => {
    setTestimonialIndex(prev => Math.min(prev, maxIndex));
  }, [itemsPerView, maxIndex]);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Loading Screen Logic
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <motion.div className="scroll-progress" style={{ scaleX }} />
      
      {/* SPLASH SCREEN REMOVED FOR INSTANT LOAD */}

      {/* WHATSAPP FLOATING BUTTON */}
      <motion.a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 40px rgba(37, 211, 102, 0.9)",
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-[100] bg-[var(--whatsapp)] text-white p-4 rounded-full shadow-2xl animate-pulse-whatsapp"
        aria-label="Falar no WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[var(--bg-dark)]/95 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <a href="#" className="text-lg md:text-xl font-serif luxe-gradient tracking-tighter font-bold">
            {CONFIG.salonName}
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <a href="#sobre" className="text-[10px] xl:text-xs uppercase tracking-widest hover:text-[var(--primary)] transition-colors font-medium">Sobre</a>
            <a href="#servicos" className="text-[10px] xl:text-xs uppercase tracking-widest hover:text-[var(--primary)] transition-colors font-medium">Serviços</a>
            <a href="#antes-depois" className="text-[10px] xl:text-xs uppercase tracking-widest hover:text-[var(--primary)] transition-colors font-medium">Resultados</a>
            <a href="#galeria" className="text-[10px] xl:text-xs uppercase tracking-widest hover:text-[var(--primary)] transition-colors font-medium">Galeria</a>
            <a href="#depoimentos" className="text-[10px] xl:text-xs uppercase tracking-widest hover:text-[var(--primary)] transition-colors font-medium">Depoimentos</a>
            <a href="#faq" className="text-[10px] xl:text-xs uppercase tracking-widest hover:text-[var(--primary)] transition-colors font-medium">Dúvidas</a>
            <a href="#contato" className="text-[10px] xl:text-xs uppercase tracking-widest hover:text-[var(--primary)] transition-colors font-medium">Localização</a>
            <a href={WHATSAPP_LINK} target="_blank" className="btn-primary !py-1.5 !px-3 text-[10px] xl:text-xs">
              AGENDAR AGORA
            </a>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[1000] bg-[var(--bg-dark)] flex flex-col p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10 shrink-0">
              <span className="text-3xl font-serif luxe-gradient">{CONFIG.salonName}</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-5 pb-10">
              {[
                { label: "Sobre", id: "sobre" },
                { label: "Serviços", id: "servicos" },
                { label: "Resultados", id: "antes-depois" },
                { label: "Galeria", id: "galeria" },
                { label: "Depoimentos", id: "depoimentos" },
                { label: "Dúvidas", id: "faq" },
                { label: "Localização", id: "contato" },
              ].map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-serif text-white hover:text-[var(--primary)] transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
              <a href={WHATSAPP_LINK} target="_blank" className="btn-primary mt-6 py-4">
                AGENDAR VIA WHATSAPP
              </a>
              <div className="flex gap-6 mt-8 justify-center text-white/60">
                <a href="#" className="hover:text-[var(--primary)] transition-colors"><Instagram size={28} /></a>
                <a href="#" className="hover:text-[var(--primary)] transition-colors"><Facebook size={28} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* TROQUE A IMAGEM AQUI - Hero Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1920")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[var(--bg-dark)]" />
        </div>

        <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl pt-32 md:pt-48">
          <span className="text-[var(--accent)] uppercase tracking-[0.5em] text-[10px] md:text-xs font-bold mb-4 block">
            Sua Jornada de Beleza Começa Aqui
          </span>
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-[1.1] tracking-tight">
            Desperte Sua <br />
            <span className="luxe-gradient italic">Essência Radiante.</span>
          </h1>
          <p className="text-base md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            No DUNO, transformamos tendências em estilo pessoal. Viva uma experiência de luxo vibrante, onde cada detalhe é pensado para fazer você brilhar.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href={WHATSAPP_LINK} target="_blank" className="btn-primary">
              <MessageCircle size={20} />
              AGENDAR AGORA
            </a>
            <a href="#servicos" className="btn-outline">
              VER SERVIÇOS
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* VISAGISMO SECTION */}
      <section className="py-20 md:py-24 bg-[var(--bg-dark)] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1595476108010-b4d1f80d91f2?auto=format&fit=crop&q=80&w=800" 
                  alt="Visagismo Consultation" 
                  className="rounded-2xl shadow-2xl relative z-10"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[var(--accent)]/20 rounded-full blur-3xl" />
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <span className="text-[var(--primary)] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4 block">A Ciência da Imagem</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 md:mb-8 leading-tight">Visagismo: <br /><span className="italic luxe-gradient">Sua Identidade Revelada.</span></h2>
              <p className="text-white/70 text-sm md:text-lg mb-8 leading-relaxed">
                Não apenas cortamos cabelos; desenhamos identidades. Através do visagismo, analisamos suas proporções faciais, tom de pele e personalidade para criar um visual que comunica quem você realmente é.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Análise de Proporções Faciais",
                  "Coloração Pessoal (Sazonal Expandido)",
                  "Design de Corte Estruturado",
                  "Consultoria de Estilo e Imagem"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/90">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                    <span className="font-medium tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
              <a href={WHATSAPP_LINK} target="_blank" className="btn-outline !border-white/20 hover:!border-[var(--primary)]">
                QUERO UMA CONSULTORIA
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BRANDS SECTION */}
      <section className="py-12 md:py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-center text-gray-400 text-[10px] uppercase tracking-[0.5em] mb-12">Trabalhamos com o que há de melhor no mundo</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {["KEUNE", "WELLA", "L'ORÉAL", "KÉRASTASE", "REDKEN"].map((brand) => (
              <span key={brand} className="text-xl md:text-4xl font-serif font-bold tracking-tighter text-black">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE SECTION */}
      <section id="sobre" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionTitle 
              light
              subtitle="A Essência DUNO" 
              title="Onde a Tradição encontra a Vanguarda" 
            />
            <p className="text-gray-700 text-sm md:text-lg mb-4 md:mb-6 leading-relaxed">
              No DUNO, acreditamos que a beleza não tem gênero, mas tem padrão: o mais alto possível. Nosso espaço foi projetado para oferecer conforto absoluto enquanto nossos especialistas transformam sua imagem.
            </p>
            <p className="text-gray-700 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed">
              Utilizamos apenas produtos de elite mundial, garantindo resultados que não apenas impressionam, mas perduram. Seja para um corte clássico masculino ou uma coloração feminina complexa, o DUNO é o seu destino.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-4xl font-bold text-[var(--primary)] mb-2">15+</h3>
                <p className="text-xs uppercase tracking-widest text-gray-400">Anos de Experiência</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-[var(--primary)] mb-2">12k+</h3>
                <p className="text-xs uppercase tracking-widest text-gray-400">Clientes Satisfeitos</p>
              </div>
            </div>

            <a href={WHATSAPP_LINK} target="_blank" className="btn-primary !bg-black !text-white hover:!bg-rose-600 transition-all">
              AGENDAR EXPERIÊNCIA PREMIUM
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
              <img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800" 
                   alt="Interior DUNO" className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-rose-gradient p-8 rounded-2xl hidden md:block shadow-xl">
              <p className="font-serif text-2xl italic text-black leading-tight">"Beleza é a <br /> confiança em <br /> ser você mesmo."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION (Alegre/Social Proof) */}
      <section className="py-20 bg-[var(--bg-dark)] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Clientes Felizes", value: "15k+" },
              { label: "Anos de História", value: "12" },
              { label: "Prêmios de Luxo", value: "08" },
              { label: "Especialistas", value: "24" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="cheerful-glow p-4"
              >
                <h3 className="text-4xl md:text-5xl font-serif luxe-gradient mb-2">{stat.value}</h3>
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIÇOS SECTION */}
      <section id="servicos" className="py-20 md:py-24 bg-[var(--bg-dark)] px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="Nossos Serviços" 
            title="Excelência em Cada Detalhe"
            description="Um salão de beleza ideal para quem procura adequar a imagem pessoal as suas principais necessidades, com assessoria especializada em um ambiente sofisticado e com atendimento personalizado. Solicite orçamento em nossa recepção." 
          />

          <div className="space-y-20 md:space-y-32">
            {/* Category: Feminino */}
            <div className="reveal">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 border-b border-white/10 pb-6 md:pb-8 gap-4 md:gap-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[var(--primary)] mb-3 md:mb-4 block">01 / Estética & Arte</span>
                  <h2 className="text-3xl md:text-6xl lg:text-7xl font-serif uppercase tracking-tighter text-white">Serviços <br /> <span className="italic text-[var(--primary)]">Femininos</span></h2>
                </div>
                <p className="text-[var(--text-muted)] max-w-xs text-xs md:text-sm leading-relaxed opacity-60 italic">
                  Técnicas avançadas de visagismo e colorimetria para realçar sua beleza natural com sofisticação.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                {SERVICES_DATA.feminino.map((service: any, i: number) => (
                  <ServiceRow 
                    key={i}
                    title={service.title}
                    description={service.description}
                    price={service.price}
                    badge={service.badge}
                    delay={i * 0.05}
                  />
                ))}
              </div>
            </div>

            {/* Category: Masculino */}
            <div className="reveal">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 border-b border-white/10 pb-6 md:pb-8 gap-4 md:gap-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[var(--primary)] mb-3 md:mb-4 block">02 / Design & Precisão</span>
                  <h2 className="text-3xl md:text-6xl lg:text-7xl font-serif uppercase tracking-tighter text-white">Serviços <br /> <span className="italic text-[var(--primary)]">Masculinos</span></h2>
                </div>
                <p className="text-[var(--text-muted)] max-w-xs text-xs md:text-sm leading-relaxed opacity-60 italic">
                  Onde a tradição da barbearia encontra o visagismo moderno para o homem contemporâneo.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                {SERVICES_DATA.masculino.map((service: any, i: number) => (
                  <ServiceRow 
                    key={i}
                    title={service.title}
                    description={service.description}
                    price={service.price}
                    badge={service.badge}
                    delay={i * 0.05}
                  />
                ))}
              </div>
            </div>

            {/* Category: Unisex / Comuns */}
            <div className="reveal">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 border-b border-white/10 pb-6 md:pb-8 gap-4 md:gap-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[var(--primary)] mb-3 md:mb-4 block">03 / Bem-Estar & Cuidados</span>
                  <h2 className="text-3xl md:text-6xl lg:text-7xl font-serif uppercase tracking-tighter text-white">Unisex <br /> <span className="italic text-[var(--primary)]">& Comuns</span></h2>
                </div>
                <p className="text-[var(--text-muted)] max-w-xs text-xs md:text-sm leading-relaxed opacity-60 italic">
                  Cuidados essenciais e tratamentos profundos para manter sua imagem sempre impecável.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                {SERVICES_DATA.unisex.map((service: any, i: number) => (
                  <ServiceRow 
                    key={i}
                    title={service.title}
                    description={service.description}
                    price={service.price}
                    badge={service.badge}
                    delay={i * 0.03}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-[var(--text-muted)] mb-8 italic">Procura algo específico? Fale com nossos especialistas.</p>
            <a href={WHATSAPP_LINK} target="_blank" className="btn-outline inline-flex">
              CONSULTAR TODOS OS SERVIÇOS
            </a>
          </div>
        </div>
      </section>

      {/* ANTES E DEPOIS SECTION */}
      <section id="antes-depois" className="py-24 bg-[var(--bg-light)] px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            light 
            subtitle="Resultados Reais" 
            title="Transformações DUNO" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Exemplo 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-3xl shadow-2xl"
            >
              <div className="flex">
                {/* TROQUE A IMAGEM AQUI - Antes 1 */}
                <div className="w-1/2 relative">
                  <img src="https://images.unsplash.com/photo-1595476108010-b4d1f80d91f2?auto=format&fit=crop&q=80&w=600" alt="Antes" className="h-[400px] w-full object-cover grayscale" loading="lazy" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs uppercase font-bold backdrop-blur-sm">Antes</span>
                </div>
                {/* TROQUE A IMAGEM AQUI - Depois 1 */}
                <div className="w-1/2 relative">
                  <img src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=600" alt="Depois" className="h-[400px] w-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 right-4 bg-[var(--primary)] text-black px-3 py-1 rounded-full text-xs uppercase font-bold">Depois</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <p className="text-white font-serif text-xl">Coloração & Corte Visagista</p>
              </div>
            </motion.div>

            {/* Exemplo 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-3xl shadow-2xl"
            >
              <div className="flex">
                {/* TROQUE A IMAGEM AQUI - Antes 2 */}
                <div className="w-1/2 relative">
                  <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600" alt="Antes" className="h-[400px] w-full object-cover grayscale" loading="lazy" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs uppercase font-bold backdrop-blur-sm">Antes</span>
                </div>
                {/* TROQUE A IMAGEM AQUI - Depois 2 */}
                <div className="w-1/2 relative">
                  <img src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600" alt="Depois" className="h-[400px] w-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 right-4 bg-[var(--primary)] text-black px-3 py-1 rounded-full text-xs uppercase font-bold">Depois</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <p className="text-white font-serif text-xl">Barba Terapia & Fade Moderno</p>
              </div>
            </motion.div>

            {/* Exemplo 3 - Progressiva */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-3xl shadow-2xl"
            >
              <div className="flex">
                <div className="w-1/2 relative">
                  <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600" alt="Antes" className="h-[400px] w-full object-cover grayscale" loading="lazy" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs uppercase font-bold backdrop-blur-sm">Antes</span>
                </div>
                <div className="w-1/2 relative">
                  <img src="https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=600" alt="Depois" className="h-[400px] w-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 right-4 bg-[var(--primary)] text-black px-3 py-1 rounded-full text-xs uppercase font-bold">Depois</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <p className="text-white font-serif text-xl">Progressiva de Luxo & Brilho</p>
              </div>
            </motion.div>

            {/* Exemplo 4 - Mechas */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-3xl shadow-2xl"
            >
              <div className="flex">
                <div className="w-1/2 relative">
                  <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600" alt="Antes" className="h-[400px] w-full object-cover grayscale" loading="lazy" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs uppercase font-bold backdrop-blur-sm">Antes</span>
                </div>
                <div className="w-1/2 relative">
                  <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=600" alt="Depois" className="h-[400px] w-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 right-4 bg-[var(--primary)] text-black px-3 py-1 rounded-full text-xs uppercase font-bold">Depois</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <p className="text-white font-serif text-xl">Mechas Platinum & Design</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALERIA SECTION */}
      <section id="galeria" className="py-24 bg-[var(--bg-light)] px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            light
            subtitle="Nosso Espaço" 
            title="Galeria de Estilo" 
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1527799822344-429dfa63739a?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1570172619244-c49712240e96?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=600"
            ].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square overflow-hidden rounded-2xl group relative"
              >
                <img 
                  src={img} 
                  alt={`Galeria ${i}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="text-white" size={24} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[var(--primary)] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4 block">Mestres da Transformação</span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif text-black leading-tight">Nossa <span className="italic">Equipe Elite.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ricardo Duno", role: "Master Visagista & Founder", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" },
              { name: "Elena Silva", role: "Especialista em Mechas & Cor", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600" },
              { name: "Marcus Viana", role: "Barbeiro Executivo", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600" }
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4]"
              >
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-serif text-white mb-1">{member.name}</h3>
                  <p className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS SECTION */}
      <section id="depoimentos" className="py-24 bg-[var(--bg-dark)] px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="Depoimentos" 
            title="O Que Dizem Nossos Clientes" 
          />
          
            <div className="relative group">
              {/* Navigation Arrows - Visible on Hover */}
              {TESTIMONIALS.length > itemsPerView && (
                <>
                  <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <button 
                      onClick={prevTestimonial}
                      className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-all shadow-xl"
                      aria-label="Anterior"
                    >
                      <ChevronLeft size={24} />
                    </button>
                  </div>
                  
                  <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                    <button 
                      onClick={nextTestimonial}
                      className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-all shadow-xl"
                      aria-label="Próximo"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </>
              )}

              {/* Slider Container */}
              <div className="overflow-hidden -mx-4">
                <motion.div 
                  animate={{ x: `-${testimonialIndex * (100 / itemsPerView)}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex"
                >
                  {TESTIMONIALS.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="shrink-0 px-4"
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      <div className="glass-card h-full flex flex-col hover:border-[var(--primary)]/30 transition-colors duration-500">
                        <div className="flex text-[var(--primary)] mb-4">
                          {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-white/80 italic mb-6 leading-relaxed flex-grow">"{item.text}"</p>
                        <div>
                          <p className="font-bold text-white">{item.name}</p>
                          <p className="text-[var(--primary)] text-xs uppercase tracking-widest">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-12">
                {[...Array(TESTIMONIALS.length - itemsPerView + 1)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`h-1 transition-all duration-300 rounded-full ${i === testimonialIndex ? 'w-8 bg-[var(--primary)]' : 'w-4 bg-white/10 hover:bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 md:py-32 bg-[var(--bg-dark)] px-4 md:px-6 border-t border-white/5 relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[var(--glow)] blur-[120px] opacity-10 pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <SectionTitle 
              subtitle="Tire Suas Dúvidas" 
              title="Perguntas Frequentes" 
            />
          </div>
          
          <div className="space-y-2">
            <FAQItem 
              question="Como funciona o agendamento?" 
              answer="É simples e rápido! Clique no botão de agendamento e fale diretamente com nossa recepção via WhatsApp. Recomendamos agendar com 48h de antecedência para garantir seu horário preferido." 
            />
            <FAQItem 
              question="O DUNO é apenas para mulheres?" 
              answer="Não! Somos um espaço premium unisex. Nossos especialistas são mestres em visagismo para todos os gêneros, oferecendo desde barbearia clássica até colorações complexas." 
            />
            <FAQItem 
              question="Quais produtos de luxo vocês utilizam?" 
              answer="Trabalhamos apenas com o topo da pirâmide mundial: Kérastase, L'Oréal Professionnel e Redken. Qualidade inegociável para a saúde dos seus fios." 
            />
            <FAQItem 
              question="Oferecem algum mimo durante o atendimento?" 
              answer="Com certeza! Nossa experiência inclui café gourmet, drinks selecionados e um ambiente climatizado com playlist exclusiva para que seu momento seja inesquecível." 
            />
            <FAQItem 
              question="Onde posso estacionar?" 
              answer="Não se preocupe com o trânsito! Oferecemos serviço de valet cortesia na porta do salão para sua total comodidade e segurança." 
            />
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO SECTION */}
      <section id="contato" className="py-24 bg-[var(--bg-light)] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle 
                light 
                subtitle="Onde Estamos" 
                title="Visite Nosso Espaço" 
              />
              <div className="space-y-8 mt-8">
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-black font-bold text-lg md:text-xl">Endereço</h4>
                    <p className="text-gray-600 text-sm md:text-base">{CONFIG.address}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-black font-bold text-lg md:text-xl">Horário de Funcionamento</h4>
                    <p className="text-gray-600 text-sm md:text-base">Terça a Sábado: 09h às 20h</p>
                    <p className="text-gray-600 text-sm md:text-base">Domingo e Segunda: Fechado</p>
                  </div>
                </div>
                <a href="https://maps.app.goo.gl/Z5v59431f2c9776a" target="_blank" className="btn-primary w-full md:w-auto">
                  ABRIR NO GOOGLE MAPS
                </a>
              </div>
            </div>
            
            <div className="h-[500px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <iframe 
                src={CONFIG.googleMapsEmbed}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--bg-dark)] py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <a href="#" className="text-3xl md:text-4xl font-serif luxe-gradient tracking-tighter font-bold mb-6 block">
                {CONFIG.salonName}
              </a>
              <p className="text-[var(--text-muted)] text-sm md:text-base max-w-sm mb-8">
                Elevando o conceito de beleza e bem-estar através de um atendimento exclusivo e personalizado. Sua jornada de luxo começa aqui.
              </p>
              <div className="flex gap-4">
                <a href={CONFIG.instagramUrl} target="_blank" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[var(--primary)] hover:text-black transition-all">
                  <Instagram size={20} />
                </a>
                <a href={CONFIG.facebookUrl} target="_blank" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[var(--primary)] hover:text-black transition-all">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Links Rápidos</h4>
              <ul className="space-y-4 text-[var(--text-muted)] text-sm">
                <li><a href="#servicos" className="hover:text-[var(--primary)] transition-colors">Serviços</a></li>
                <li><a href="#antes-depois" className="hover:text-[var(--primary)] transition-colors">Antes e Depois</a></li>
                <li><a href="#galeria" className="hover:text-[var(--primary)] transition-colors">Galeria</a></li>
                <li><a href="#contato" className="hover:text-[var(--primary)] transition-colors">Localização</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contato</h4>
              <ul className="space-y-4 text-[var(--text-muted)] text-sm">
                <li className="flex items-center gap-2"><MessageCircle size={16} /> (11) 99287-6219</li>
                <li className="flex items-center gap-2"><MapPin size={16} /> Jardins, São Paulo - SP</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--text-muted)] text-xs">
              © 2026 {CONFIG.salonName} Premium. Todos os direitos reservados.
            </p>
            <p className="text-[var(--text-muted)] text-xs">
              Desenvolvido por <span className="text-white font-bold">Premium Templates</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
