// ui.jsx — shared primitives for the Courts Diez landing page
const { useState, useEffect, useRef } = React;

/* ----- scroll reveal ----- */
function Reveal({ children, delay = 0, as = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => { el.classList.add('in'); el.style.opacity = '1'; el.style.transform = 'none'; io.disconnect(); clearTimeout(fail); };
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) show(); },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    // failsafe: if the observer is dormant (e.g. backgrounded tab), reveal anyway
    const fail = setTimeout(show, 1100 + delay);
    return () => { io.disconnect(); clearTimeout(fail); };
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} style={{ transitionDelay: delay + 'ms' }} className={'reveal ' + className} {...rest}>
      {children}
    </Tag>
  );
}

/* ----- count up on view ----- */
function CountUp({ to, suffix = '', duration = 1300, className = '' }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf, started = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { started = true; run(); }
    }, { threshold: 0.5 });
    io.observe(el);
    const run = () => {
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * to));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const fail = setTimeout(() => { if (!started) { started = true; setVal(to); } }, 1400);
    return () => { io.disconnect(); cancelAnimationFrame(raf); clearTimeout(fail); };
  }, [to, duration]);
  return <span ref={ref} className={className}>{val}{suffix}</span>;
}

/* ----- image slot: real (fictional) photo over a branded fallback ----- */
function ImageSlot({ src, alt = '', ratio = '16/9', objectPos = 'center', className = '', round = '' }) {
  const [err, setErr] = useState(false);
  return (
    <div
      className={`relative overflow-hidden bg-anthra-800 ${round} ${className}`}
      style={ratio === 'auto' ? {} : { aspectRatio: ratio }}
    >
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 76% 14%, rgba(26,114,184,.28), transparent 58%), linear-gradient(180deg,#1b1d21,#0d0e10)' }} />
      {!err && (
        <img src={src} alt={alt} onError={() => setErr(true)}
          className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: objectPos }} />
      )}
    </div>
  );
}

/* ----- striped image placeholder with mono label ----- */
function Placeholder({ label, ratio = '16/9', className = '', round = 'rounded-2xl' }) {
  return (
    <div
      className={`ph-stripes ${round} relative overflow-hidden border border-white/10 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="mx-auto mb-3 h-9 w-9 rounded-full border border-white/20 flex items-center justify-center text-white/40">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="m4 18 5-4 4 3 3-2 4 3" />
            </svg>
          </div>
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/45 leading-relaxed">
            {label}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}

/* ----- eyebrow / section label ----- */
function Eyebrow({ children, color = 'court' }) {
  const dot = color === 'ball' ? 'bg-ball' : 'bg-court-light';
  const txt = color === 'ball' ? 'text-ball' : 'text-court-light';
  return (
    <div className="inline-flex items-center gap-2.5">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      <span className={`font-mono text-[11px] uppercase tracking-[0.32em] ${txt}`}>{children}</span>
    </div>
  );
}

/* ----- buttons ----- */
function Btn({ children, variant = 'primary', accent = 'ball', href = '#', radius = 'rounded-full', className = '', external, ...rest }) {
  const base = `group inline-flex items-center justify-center gap-2.5 ${radius} font-display font-semibold uppercase tracking-wide text-[15px] px-7 py-3.5 transition-all duration-200 active:scale-[.98]`;
  let styles = '';
  if (variant === 'primary') {
    styles = accent === 'ball'
      ? 'bg-ball text-anthra-950 hover:bg-ball hover:shadow-[0_0_36px_-6px_rgba(250,234,23,.6)]'
      : 'bg-court text-white hover:bg-court-light hover:shadow-[0_0_36px_-6px_rgba(47,147,221,.7)]';
  } else if (variant === 'ghost') {
    styles = 'border border-white/20 text-white hover:border-white/45 hover:bg-white/5';
  } else if (variant === 'soft') {
    styles = 'bg-white/5 border border-white/10 text-white hover:bg-white/10';
  }
  return (
    <a href={href} className={`${base} ${styles} ${className}`} {...(external ? { target: '_blank', rel: 'noopener' } : {})} {...rest}>
      {children}
    </a>
  );
}

/* ----- line icons (simple geometric) ----- */
const Icon = {
  arrow: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  phone: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>),
  mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>),
  pin: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>),
  clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>),
  app: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 19h2" /></svg>),
  court: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="16" rx="1.5" /><path d="M3 12h18M9 4v16M15 4v16" /></svg>),
  score: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 3 7 21M17 3l-2 18M4 9h16M3 15h16" /></svg>),
  serve: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 16h18" /><circle cx="8" cy="9" r="2.2" /><path d="m10 11 5 5M14 7l4-3" /></svg>),
  glass: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="18" height="18" rx="1.5" /><path d="M7 3v18M3 8h4M3 16h4" /></svg>),
  players: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 20c0-2 .8-3.8 2-5" /></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
  alert: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></svg>),
  menu: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>),
  close: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>),
  ball: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><circle cx="12" cy="12" r="9" /><path d="M3.5 8.5C7 9 9 11 9 15M20.5 8.5C17 9 15 11 15 15" /></svg>),
};

Object.assign(window, { Reveal, CountUp, ImageSlot, Placeholder, Eyebrow, Btn, Icon });
