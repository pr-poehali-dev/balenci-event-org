import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMAGE = 'https://cdn.poehali.dev/projects/5eb4473a-24dd-4fb8-84eb-147bf4fe564d/files/a7390f21-1b59-4876-9d12-e3c946a5eaaa.jpg';

const NAV_LINKS = [
  { label: 'Главная', href: '#hero' },
  { label: 'Мероприятия', href: '#events' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'О нас', href: '#about' },
  { label: 'Партнёры', href: '#partners' },
  { label: 'Контакты', href: '#contacts' },
];

const EVENTS = [
  {
    date: '29 МАР',
    title: 'BALENCI × METRO RAVE',
    venue: 'Подземка, Новосибирск',
    time: '23:00',
    tag: 'RAVE',
    description: 'Тёмные тоннели, бас, который ты чувствуешь кожей. Ограниченный вход.',
    colorVar: 'var(--neon-green)',
    borderClass: 'border-[#00ffb3] text-[#00ffb3]',
  },
  {
    date: '12 АПР',
    title: 'AFTER HOURS VOL.4',
    venue: 'Bar Dark Matter',
    time: '22:00',
    tag: 'BAR',
    description: 'Четвёртый выпуск серии вечеринок в самом тёмном баре города.',
    colorVar: 'var(--neon-magenta)',
    borderClass: 'border-[#ff00ff] text-[#ff00ff]',
  },
  {
    date: '26 АПР',
    title: 'UNDERGROUND SESSIONS',
    venue: 'Секретная локация',
    time: '00:00',
    tag: 'SECRET',
    description: 'Локация раскрывается за 2 часа до начала. Только для своих.',
    colorVar: 'var(--neon-cyan)',
    borderClass: 'border-[#00e5ff] text-[#00e5ff]',
  },
];

const GALLERY_ITEMS = [
  { label: 'METRO RAVE 2025', img: HERO_IMAGE, span: true },
  { label: 'AFTER HOURS VOL.3', img: null, span: false },
  { label: 'BAR SESSION', img: null, span: false },
  { label: 'UNDERGROUND #7', img: null, span: false },
  { label: 'DARK MATTER', img: null, span: false },
  { label: 'RAVE IN TUNNEL', img: null, span: false },
];

const PARTNERS = [
  { name: 'DARK MATTER BAR', type: 'Площадка' },
  { name: 'METRO NSK', type: 'Площадка' },
  { name: 'NOISE RECORDS', type: 'Лейбл' },
  { name: 'UNDERGROUND.NSK', type: 'Медиа' },
  { name: 'NEON STUDIO', type: 'Свет и звук' },
  { name: 'RAW CREW', type: 'Команда' },
];

function useIntersection(ref: React.RefObject<HTMLElement>, threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const visible = useIntersection(ref);
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </section>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-ibm" style={{ color: '#f0f0f0' }}>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a]' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo('#hero')} className="font-oswald font-bold text-2xl tracking-[0.2em] neon-text-green">
            BALENCI
          </button>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="nav-link text-xs font-ibm tracking-widest uppercase text-[#666] hover:text-[#00ffb3] transition-colors">
                {l.label}
              </button>
            ))}
          </div>
          <button className="md:hidden text-[#00ffb3]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0a0a0a]/98 border-b border-[#1a1a1a] px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="text-left text-sm tracking-widest uppercase text-[#666] hover:text-[#00ffb3] transition-colors py-2 border-b border-[#111]">
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})`, filter: 'brightness(0.2) saturate(1.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]" />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,#00ffb3,transparent)', boxShadow: '0 0 20px #00ffb3' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,#ff00ff,transparent)', boxShadow: '0 0 20px #ff00ff' }} />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <p className="font-oswald text-xs tracking-[0.5em] uppercase text-[#00ffb3] mb-6 animate-fade-in-up opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
            НОВОСИБИРСК · UNDERGROUND EVENTS
          </p>

          <h1 className="font-oswald font-bold leading-none tracking-tight mb-0 animate-fade-in-up opacity-0 delay-200" style={{ fontSize: 'clamp(5rem, 18vw, 14rem)', animationFillMode: 'forwards' }}>
            <span className="glitch-container inline-block" data-text="BALENCI" style={{ color: '#f0f0f0', textShadow: '0 0 60px rgba(0,255,179,0.1)' }}>
              BALENCI
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 mt-4 mb-10 animate-fade-in-up opacity-0 delay-300" style={{ animationFillMode: 'forwards' }}>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg,transparent,#ff00ff)' }} />
            <p className="font-ibm font-light text-sm tracking-[0.3em] uppercase text-[#555]">Бары · Подземка · Ночной город</p>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg,#ff00ff,transparent)' }} />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 delay-500" style={{ animationFillMode: 'forwards' }}>
            <button className="btn-neon px-10 py-3 text-sm" onClick={() => scrollTo('#events')}>
              Ближайшие события
            </button>
            <button className="btn-neon-magenta px-10 py-3 text-sm" onClick={() => scrollTo('#contacts')}>
              Стать партнёром
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-neon">
          <Icon name="ChevronDown" size={24} className="text-[#00ffb3]" />
        </div>
      </section>

      {/* EVENTS */}
      <Section id="events" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="font-oswald text-xs tracking-[0.4em] uppercase text-[#00ffb3] mb-2">Расписание</p>
              <h2 className="font-oswald font-bold text-5xl md:text-7xl text-white leading-none">МЕРОПРИЯТИЯ</h2>
            </div>
            <div className="hidden md:block h-px w-48" style={{ background: 'linear-gradient(90deg,#00ffb3,transparent)', boxShadow: '0 0 10px #00ffb3' }} />
          </div>

          <div className="flex flex-col gap-4">
            {EVENTS.map((ev, i) => (
              <div key={i} className="event-card bg-[#0f0f0f] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0 text-center md:w-24">
                  <p className="font-oswald font-bold text-3xl" style={{ color: ev.colorVar }}>
                    {ev.date.split(' ')[0]}
                  </p>
                  <p className="font-oswald text-sm tracking-widest text-[#444]">{ev.date.split(' ')[1]}</p>
                </div>
                <div className="hidden md:block w-px h-16 bg-[#1a1a1a]" />
                <div className="flex-1">
                  <span className={`inline-block font-oswald text-xs tracking-widest px-2 py-0.5 border mb-2 ${ev.borderClass}`}>{ev.tag}</span>
                  <h3 className="font-oswald font-bold text-2xl md:text-3xl text-white mb-1">{ev.title}</h3>
                  <p className="font-ibm text-sm text-[#555] mb-2">{ev.description}</p>
                  <div className="flex items-center gap-4 text-xs text-[#333] uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <Icon name="MapPin" size={12} className="text-[#333]" />
                      {ev.venue}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="Clock" size={12} className="text-[#333]" />
                      {ev.time}
                    </span>
                  </div>
                </div>
                <button className="btn-neon px-6 py-2.5 text-xs flex-shrink-0">Узнать подробнее</button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="font-oswald text-xs tracking-[0.4em] uppercase text-[#ff00ff] mb-2">Атмосфера</p>
            <h2 className="font-oswald font-bold text-5xl md:text-7xl text-white leading-none">ГАЛЕРЕЯ</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`relative overflow-hidden group cursor-pointer ${item.span ? 'md:col-span-2 md:row-span-2' : ''}`}
                style={{ minHeight: item.span ? '400px' : '200px' }}
              >
                {item.img ? (
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: 'brightness(0.45) saturate(1.3)' }} />
                ) : (
                  <div className="w-full h-full bg-[#0f0f0f] flex items-center justify-center" style={{ border: '1px solid #111' }}>
                    <Icon name="Image" size={28} className="text-[#1a1a1a]" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-oswald text-sm tracking-widest uppercase text-[#00ffb3]">{item.label}</p>
                </div>
                <div className="absolute inset-0 border border-transparent group-hover:border-[#00ffb3]/30 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-oswald text-xs tracking-[0.4em] uppercase text-[#00e5ff] mb-2">О компании</p>
              <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white leading-none mb-8">О НАС</h2>
              <div className="space-y-5 font-ibm font-light text-[#666] leading-relaxed">
                <p>
                  <span className="text-white font-normal">BALENCI</span> — это команда, которая создаёт мероприятия там, где обычные организаторы не рискуют. Подземные тоннели, заброшенные пространства, тёмные бары с историей.
                </p>
                <p>
                  Мы работаем в Новосибирске с 2022 года. За это время провели более <span className="text-[#00ffb3]">40 мероприятий</span>, каждое из которых стало отдельной историей.
                </p>
                <p>
                  Наш принцип: <span className="text-white italic">атмосфера важнее вместимости</span>. Мы намеренно ограничиваем вход, чтобы каждый гость чувствовал себя частью чего-то настоящего.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-8 mt-12">
                {[{ num: '40+', label: 'Событий' }, { num: '12K+', label: 'Гостей' }, { num: '4', label: 'Года работы' }].map((s, i) => (
                  <div key={i} className="border-t border-[#1a1a1a] pt-4">
                    <p className="font-oswald font-bold text-3xl neon-text-green">{s.num}</p>
                    <p className="font-ibm text-xs tracking-widest uppercase text-[#444] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden" style={{ height: '480px', border: '1px solid #1a1a1a' }}>
                <img src={HERO_IMAGE} alt="BALENCI" className="w-full h-full object-cover" style={{ filter: 'brightness(0.35) saturate(1.5)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,255,179,0.08) 0%, transparent 50%, rgba(255,0,255,0.08) 100%)' }} />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20" style={{ borderRight: '1px solid #00ffb3', borderBottom: '1px solid #00ffb3' }} />
              <div className="absolute -top-4 -left-4 w-20 h-20" style={{ borderLeft: '1px solid #ff00ff', borderTop: '1px solid #ff00ff' }} />
            </div>
          </div>
        </div>
      </Section>

      {/* PARTNERS */}
      <Section id="partners" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="font-oswald text-xs tracking-[0.4em] uppercase text-[#ff00ff] mb-2">Экосистема</p>
            <h2 className="font-oswald font-bold text-5xl md:text-7xl text-white leading-none">ПАРТНЁРЫ</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#111]">
            {PARTNERS.map((p, i) => (
              <div key={i} className="bg-[#0a0a0a] p-8 hover:bg-[#0d0d0d] transition-colors group cursor-pointer">
                <p className="font-oswald text-xs tracking-[0.3em] uppercase text-[#2a2a2a] mb-2 group-hover:text-[#00ffb3] transition-colors">{p.type}</p>
                <p className="font-oswald font-bold text-xl md:text-2xl text-[#333] group-hover:text-white transition-colors">{p.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="font-ibm text-sm text-[#333] mb-6">Хочешь стать частью BALENCI?</p>
            <button className="btn-neon-magenta px-10 py-3 text-sm" onClick={() => document.querySelector('#contacts')?.scrollIntoView({ behavior: 'smooth' })}>
              Обсудить партнёрство
            </button>
          </div>
        </div>
      </Section>

      {/* CONTACTS */}
      <Section id="contacts" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <p className="font-oswald text-xs tracking-[0.4em] uppercase text-[#00e5ff] mb-2">Связь</p>
            <h2 className="font-oswald font-bold text-5xl md:text-7xl text-white leading-none">КОНТАКТЫ</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              {[
                { icon: 'MapPin', label: 'Город', value: 'Новосибирск', color: '#00ffb3' },
                { icon: 'Instagram', label: 'Instagram', value: '@balenci.nsk', color: '#ff00ff' },
                { icon: 'MessageCircle', label: 'Telegram', value: '@balenci_nsk', color: '#00e5ff' },
                { icon: 'Mail', label: 'Email', value: 'hello@balenci.ru', color: '#00ffb3' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ border: `1px solid ${c.color}` }}>
                    <Icon name={c.icon} fallback="CircleAlert" size={16} style={{ color: c.color }} />
                  </div>
                  <div>
                    <p className="font-oswald text-xs tracking-widest uppercase text-[#333]">{c.label}</p>
                    <p className="font-ibm text-base text-[#888] group-hover:text-white transition-colors">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Ваше имя" className="w-full bg-[#0f0f0f] px-4 py-3 font-ibm text-sm text-white placeholder-[#2a2a2a] focus:outline-none transition-colors" style={{ border: '1px solid #1a1a1a' }} onFocus={e => e.target.style.borderColor = '#00ffb3'} onBlur={e => e.target.style.borderColor = '#1a1a1a'} />
              <input type="text" placeholder="Telegram / Email" className="w-full bg-[#0f0f0f] px-4 py-3 font-ibm text-sm text-white placeholder-[#2a2a2a] focus:outline-none transition-colors" style={{ border: '1px solid #1a1a1a' }} onFocus={e => e.target.style.borderColor = '#00ffb3'} onBlur={e => e.target.style.borderColor = '#1a1a1a'} />
              <textarea rows={4} placeholder="Расскажи о своём запросе..." className="w-full bg-[#0f0f0f] px-4 py-3 font-ibm text-sm text-white placeholder-[#2a2a2a] focus:outline-none transition-colors resize-none" style={{ border: '1px solid #1a1a1a' }} onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = '#00ffb3'} onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = '#1a1a1a'} />
              <button className="btn-neon w-full py-3 text-sm">Отправить сообщение</button>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-[#111] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-oswald font-bold text-xl tracking-[0.2em] neon-text-green">BALENCI</p>
          <p className="font-ibm text-xs text-[#2a2a2a] tracking-widest uppercase">Новосибирск · Underground Events · 2022–2026</p>
          <div className="flex items-center gap-3">
            {['Instagram', 'MessageCircle', 'Music'].map((icon, i) => (
              <button key={i} className="w-8 h-8 flex items-center justify-center text-[#222] hover:text-[#00ffb3] transition-all" style={{ border: '1px solid #1a1a1a' }}>
                <Icon name={icon} fallback="CircleAlert" size={14} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}