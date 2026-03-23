import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const LOGO_IMG = 'https://cdn.poehali.dev/projects/5eb4473a-24dd-4fb8-84eb-147bf4fe564d/bucket/658dc119-0ec2-4c30-9d79-6d29c804e0cb.jpeg';
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
    date: '3 МАЯ',
    year: '2025',
    title: 'ТОКИО ПАТИ',
    venue: 'Лофт Парк Подземка',
    city: 'Новосибирск',
    time: '23:00',
    tag: 'PARTY',
    description: 'Японская эстетика встречает новосибирский андеграунд. Один вечер — одна атмосфера.',
  },
];

const GALLERY_ITEMS = [
  { label: 'Токио Пати', sub: 'Май 2025', img: HERO_IMAGE, tall: true },
  { label: 'Metro Rave', sub: 'Март 2025', img: null, tall: false },
  { label: 'After Hours', sub: 'Февраль 2025', img: null, tall: false },
  { label: 'Dark Session', sub: 'Январь 2025', img: null, tall: false },
  { label: 'Underground', sub: 'Декабрь 2024', img: null, tall: false },
];

const PARTNERS = [
  { name: 'Лофт Парк Подземка', type: 'Площадка' },
  { name: 'Dark Matter Bar', type: 'Площадка' },
  { name: 'Noise Records', type: 'Лейбл' },
  { name: 'Underground NSK', type: 'Медиа' },
  { name: 'Neon Studio', type: 'Свет и звук' },
  { name: 'Raw Crew', type: 'Команда' },
];

function useVisible(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
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
  return { ref, visible };
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useVisible();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-cormorant" style={{ background: '#080808', color: '#ebebeb' }}>

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'border-b' : ''}`}
        style={{ background: scrolled ? 'rgba(8,8,8,0.96)' : 'transparent', borderColor: '#1a1a1a', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16">
          <button onClick={() => go('#hero')}>
            <img src={LOGO_IMG} alt="BALENCI" className="h-8 object-contain" style={{ filter: 'brightness(1.1)' }} />
          </button>
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={() => go(l.href)} className="nav-link">{l.label}</button>
            ))}
          </div>
          <button className="md:hidden" style={{ color: '#a8a8a8' }} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-8 py-6 flex flex-col gap-5 border-t" style={{ background: 'rgba(8,8,8,0.98)', borderColor: '#1a1a1a' }}>
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={() => go(l.href)} className="nav-link text-left">{l.label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.12) grayscale(0.5)', transform: 'scale(1.05)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #080808 0%, transparent 30%, transparent 70%, #080808 100%)' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Logo */}
          <div className="animate-fade-up delay-1 mb-10">
            <img
              src={LOGO_IMG}
              alt="BALENCI"
              className="w-56 md:w-72 object-contain mx-auto"
              style={{ filter: 'brightness(1.15) contrast(1.1)' }}
            />
          </div>

          {/* Tagline */}
          <div className="animate-fade-up delay-2 mb-2">
            <div className="flex items-center gap-5 justify-center">
              <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #a8a8a8)' }} />
              <p className="font-montserrat font-light text-[10px] tracking-[0.45em] uppercase" style={{ color: '#6a6a6a' }}>
                Новосибирск · Underground Events
              </p>
              <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, #a8a8a8, transparent)' }} />
            </div>
          </div>

          {/* CTA */}
          <div className="animate-fade-up delay-3 flex flex-col sm:flex-row items-center gap-4 mt-12">
            <button className="btn-primary" onClick={() => go('#events')}>Ближайшие события</button>
            <button className="btn-outline" onClick={() => go('#contacts')}>Стать партнёром</button>
          </div>
        </div>

        {/* Scroll */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-up delay-5" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          <Icon name="ChevronDown" size={20} style={{ color: '#3a3a3a' }} />
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section id="events" className="py-28 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="font-montserrat font-light text-[10px] tracking-[0.45em] uppercase mb-3" style={{ color: '#4a4a4a' }}>Расписание</p>
            <h2 className="font-cormorant font-light text-5xl md:text-6xl mb-16" style={{ color: '#ebebeb', letterSpacing: '0.08em' }}>
              Мероприятия
            </h2>
          </Reveal>

          {EVENTS.map((ev, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="event-card p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8 mb-4">
                {/* Date block */}
                <div className="flex-shrink-0 md:w-28 md:text-center">
                  <p className="font-cormorant font-light text-5xl leading-none" style={{ color: '#ebebeb' }}>
                    {ev.date.split(' ')[0]}
                  </p>
                  <p className="font-montserrat font-light text-[10px] tracking-[0.3em] uppercase mt-1" style={{ color: '#3a3a3a' }}>
                    {ev.date.split(' ')[1]} · {ev.year}
                  </p>
                </div>

                <div style={{ width: 1, height: 60, background: '#1a1a1a' }} className="hidden md:block flex-shrink-0" />

                {/* Info */}
                <div className="flex-1">
                  <span className="font-montserrat font-light text-[9px] tracking-[0.4em] uppercase px-2 py-1 mb-3 inline-block" style={{ border: '1px solid #2a2a2a', color: '#5a5a5a' }}>
                    {ev.tag}
                  </span>
                  <h3 className="font-cormorant font-light text-3xl md:text-4xl mb-2" style={{ color: '#ebebeb', letterSpacing: '0.1em' }}>
                    {ev.title}
                  </h3>
                  <p className="font-cormorant italic text-base mb-3" style={{ color: '#5a5a5a' }}>{ev.description}</p>
                  <div className="flex items-center gap-5">
                    <span className="font-montserrat font-light text-[10px] tracking-widest uppercase flex items-center gap-2" style={{ color: '#4a4a4a' }}>
                      <Icon name="MapPin" size={11} />
                      {ev.venue} · {ev.city}
                    </span>
                    <span className="font-montserrat font-light text-[10px] tracking-widest uppercase flex items-center gap-2" style={{ color: '#4a4a4a' }}>
                      <Icon name="Clock" size={11} />
                      {ev.time}
                    </span>
                  </div>
                </div>

                <button className="btn-outline flex-shrink-0 text-[10px]">Подробнее</button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-28 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="font-montserrat font-light text-[10px] tracking-[0.45em] uppercase mb-3" style={{ color: '#4a4a4a' }}>Атмосфера</p>
            <h2 className="font-cormorant font-light text-5xl md:text-6xl mb-16" style={{ color: '#ebebeb', letterSpacing: '0.08em' }}>
              Галерея
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {GALLERY_ITEMS.map((item, i) => (
              <Reveal key={i} delay={i * 60} className={item.tall ? 'md:row-span-2' : ''}>
                <div className="gallery-item" style={{ height: item.tall ? '100%' : 220, minHeight: 220 }}>
                  {item.img ? (
                    <img src={item.img} alt={item.label} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: '#0e0e0e', border: '1px solid #111' }}>
                      <Icon name="Image" size={24} style={{ color: '#1a1a1a' }} />
                    </div>
                  )}
                  <div className="gallery-overlay">
                    <div>
                      <p className="font-montserrat font-light text-[10px] tracking-[0.3em] uppercase" style={{ color: '#a8a8a8' }}>{item.label}</p>
                      <p className="font-montserrat font-light text-[9px] tracking-widest uppercase mt-1" style={{ color: '#4a4a4a' }}>{item.sub}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <Reveal>
            <p className="font-montserrat font-light text-[10px] tracking-[0.45em] uppercase mb-3" style={{ color: '#4a4a4a' }}>О компании</p>
            <h2 className="font-cormorant font-light text-5xl md:text-6xl mb-10" style={{ color: '#ebebeb', letterSpacing: '0.08em' }}>
              О нас
            </h2>
            <div className="space-y-5 font-cormorant font-light text-lg leading-relaxed" style={{ color: '#6a6a6a' }}>
              <p>
                <span style={{ color: '#ebebeb' }}>BALENCI</span> — организация мероприятий, которая работает там, где обычные event-команды не решаются. Подземные площадки, лофты, пространства с характером.
              </p>
              <p>
                Новосибирск, с 2022 года. Более <span style={{ color: '#a8a8a8' }}>40 мероприятий</span> — каждое со своей историей.
              </p>
              <p className="italic">
                Атмосфера важнее вместимости.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-14 pt-10" style={{ borderTop: '1px solid #1a1a1a' }}>
              {[{ num: '40+', label: 'Событий' }, { num: '12K+', label: 'Гостей' }, { num: '4', label: 'Года' }].map((s, i) => (
                <div key={i}>
                  <p className="font-cormorant font-light text-4xl" style={{ color: '#ebebeb' }}>{s.num}</p>
                  <p className="font-montserrat font-light text-[10px] tracking-[0.3em] uppercase mt-2" style={{ color: '#3a3a3a' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative">
              <div style={{ height: 500, border: '1px solid #1a1a1a', overflow: 'hidden', position: 'relative' }}>
                <img src={HERO_IMAGE} alt="BALENCI" className="w-full h-full object-cover" style={{ filter: 'brightness(0.3) grayscale(0.4)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 60%)' }} />
              </div>
              <div className="absolute -bottom-5 -right-5 w-16 h-16" style={{ borderRight: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a' }} />
              <div className="absolute -top-5 -left-5 w-16 h-16" style={{ borderLeft: '1px solid #2a2a2a', borderTop: '1px solid #2a2a2a' }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section id="partners" className="py-28 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="font-montserrat font-light text-[10px] tracking-[0.45em] uppercase mb-3" style={{ color: '#4a4a4a' }}>Экосистема</p>
            <h2 className="font-cormorant font-light text-5xl md:text-6xl mb-16" style={{ color: '#ebebeb', letterSpacing: '0.08em' }}>
              Партнёры
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {PARTNERS.map((p, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="partner-item group cursor-pointer">
                  <p className="font-montserrat font-light text-[9px] tracking-[0.35em] uppercase mb-3 transition-colors" style={{ color: '#2a2a2a' }}>
                    {p.type}
                  </p>
                  <p className="font-cormorant font-light text-xl transition-colors" style={{ color: '#4a4a4a', letterSpacing: '0.05em' }}>
                    {p.name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-16 text-center">
              <p className="font-cormorant italic text-lg mb-6" style={{ color: '#3a3a3a' }}>Хочешь стать частью BALENCI?</p>
              <button className="btn-outline" onClick={() => document.querySelector('#contacts')?.scrollIntoView({ behavior: 'smooth' })}>
                Обсудить сотрудничество
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-28 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-20">
            <p className="font-montserrat font-light text-[10px] tracking-[0.45em] uppercase mb-3" style={{ color: '#4a4a4a' }}>Связь</p>
            <h2 className="font-cormorant font-light text-5xl md:text-6xl" style={{ color: '#ebebeb', letterSpacing: '0.08em' }}>
              Контакты
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <Reveal className="space-y-10">
              {[
                { icon: 'MapPin', label: 'Город', value: 'Новосибирск' },
                { icon: 'Instagram', label: 'Instagram', value: '@balenci.nsk' },
                { icon: 'MessageCircle', label: 'Telegram', value: '@balenci_nsk' },
                { icon: 'Mail', label: 'Email', value: 'hello@balenci.ru' },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1" style={{ border: '1px solid #2a2a2a' }}>
                    <Icon name={c.icon} fallback="CircleAlert" size={13} style={{ color: '#4a4a4a' }} />
                  </div>
                  <div>
                    <p className="font-montserrat font-light text-[9px] tracking-[0.35em] uppercase mb-1" style={{ color: '#3a3a3a' }}>{c.label}</p>
                    <p className="font-cormorant font-light text-lg" style={{ color: '#a8a8a8' }}>{c.value}</p>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal delay={150} className="space-y-8">
              <input className="field" placeholder="Имя" type="text" />
              <input className="field" placeholder="Telegram или Email" type="text" />
              <textarea className="field resize-none" placeholder="Сообщение" rows={4} />
              <button className="btn-primary w-full mt-4">Отправить</button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-8" style={{ borderTop: '1px solid #111' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={LOGO_IMG} alt="BALENCI" className="h-7 object-contain" style={{ filter: 'brightness(0.6)' }} />
          <p className="font-montserrat font-light text-[9px] tracking-[0.4em] uppercase" style={{ color: '#2a2a2a' }}>
            Новосибирск · Underground Events · 2022–2026
          </p>
          <div className="flex items-center gap-3">
            {['Instagram', 'MessageCircle', 'Music'].map((icon, i) => (
              <button key={i} className="w-7 h-7 flex items-center justify-center transition-colors" style={{ border: '1px solid #1a1a1a', color: '#2a2a2a' }}>
                <Icon name={icon} fallback="CircleAlert" size={13} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
