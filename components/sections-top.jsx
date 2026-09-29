// sections-top.jsx — Nav, Hero, Courts
const { useState: useStateT, useEffect: useEffectT } = React;

const NAV = [
  { id: 'courts', label: 'Courts' },
  { id: 'galerie', label: 'Eindrücke' },
  { id: 'regeln', label: 'Padel-Regeln' },
  { id: 'faq', label: 'FAQ' },
  { id: 'kontakt', label: 'Kontakt' },
];

function Nav({ ui, onOpenBooking }) {
  const [scrolled, setScrolled] = useStateT(false);
  const [open, setOpen] = useStateT(false);
  useEffectT(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffectT(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <React.Fragment>
      <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-anthra-900/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent border-b border-transparent'}`}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex h-[88px] items-center justify-between">
            <a href="#top" className="flex items-center gap-3 shrink-0">
              <img src="assets/courts-diez-logo.png" alt="Courts Diez · Padel & Tennis" className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-all duration-300" />
            </a>
            <nav className="hidden md:flex items-center gap-8 lg:gap-9">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} className="font-display font-semibold uppercase tracking-wide text-[15px] text-white/70 hover:text-white transition-colors">
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="hidden md:block">
              <Btn onClick={onOpenBooking} variant="primary" accent={ui.primaryAccent} radius={ui.btn} className="!px-6 !py-3 !text-[14px]">
                Court buchen <Icon.arrow width="17" className="transition-transform group-hover:translate-x-0.5" />
              </Btn>
            </div>
            <button onClick={() => setOpen(true)} className="md:hidden text-white p-2 -mr-2" aria-label="Menü öffnen">
              <Icon.menu width="26" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      <div className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div className={`fixed right-0 top-0 bottom-0 h-full w-[85%] max-w-xs bg-anthra-900 border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto transition-transform duration-300 shadow-2xl ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div>
            <div className="flex justify-between items-center mb-8">
              <img src="assets/courts-diez-logo.png" alt="Courts Diez" className="h-12 w-auto" />
              <button onClick={() => setOpen(false)} className="text-white p-2 -mr-2 hover:text-ball transition-colors" aria-label="Schließen">
                <Icon.close width="24" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="font-display font-semibold uppercase tracking-wide text-2xl text-white/85 hover:text-ball py-3 border-b border-white/5 transition-colors block"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </div>
          <div className="pt-8 pb-4">
            <Btn onClick={() => { setOpen(false); onOpenBooking && onOpenBooking(); }} variant="primary" accent={ui.primaryAccent} radius={ui.btn} className="w-full justify-center">
              Court buchen <Icon.arrow width="17" />
            </Btn>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function Hero({ ui, onOpenBooking }) {
  const stats = [
    { n: 4, s: '', label: 'Padel-Courts' },
    { n: 1, s: '', label: 'Tennisplatz' },
    { n: 7, s: '', label: 'Tage / Woche' },
    { n: 0, s: ' €', label: 'Leih-Padel-Schläger incl.' },
  ];
  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* background */}
      <div className="absolute inset-0">
        <ImageSlot src="assets/img/hero-padel.jpg" alt="Courts Diez Arena mit Padel- und Tennis-Courts" ratio="auto" objectPos="60% 35%" className="!h-full !w-full" />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, rgba(14,14,15,${0.96 * ui.heroOverlay}) 0%, rgba(14,14,15,${0.82 * ui.heroOverlay}) 45%, rgba(14,14,15,${0.45 * ui.heroOverlay}) 100%), linear-gradient(180deg, rgba(14,14,15,${0.5 * ui.heroOverlay}) 0%, rgba(14,14,15,${0.25 * ui.heroOverlay}) 40%, rgba(14,14,15,${0.95 * ui.heroOverlay}) 100%)`
        }}
      />
      {ui.grid && <div className="absolute inset-0 bg-grid bg-grid-fade opacity-70" />}
      <div className="absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-court/20 blur-[120px]" />
      <div className="absolute -left-20 bottom-1/3 h-72 w-72 rounded-full bg-ball/10 blur-[120px]" />

      {/* content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 pt-28 sm:pt-36 pb-12 sm:pb-16">
          <Reveal>
            <Eyebrow color="ball">Padel &amp; Tennis · Diez</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 font-display font-900 uppercase leading-[0.9] tracking-[-0.01em] text-[clamp(3.2rem,9vw,8.5rem)]">
              MORE THAN<br />
              <span className="text-ball">A COURT</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-2xl text-lg sm:text-xl text-white/75 leading-relaxed">
              Bei uns geht es nicht nur um den nächsten Punkt. Es geht um Bewegung, Begegnung und die Freude am Spiel. Courts Diez verbindet die Dynamik des Padel mit der Tradition des Tennis.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-col sm:flex-row gap-4 sm:items-center">
              <Btn onClick={onOpenBooking} variant="primary" accent={ui.heroAccent} radius={ui.btn} className="!text-base">
                Jetzt Court buchen <Icon.arrow width="18" className="transition-transform group-hover:translate-x-1" />
              </Btn>
              <Btn href="#courts" variant="ghost" radius={ui.btn} className="!text-base">Courts entdecken</Btn>
            </div>
          </Reveal>
        </div>
      </div>

      {/* stat strip */}
      <Reveal delay={120} className="relative z-10 border-t border-white/10 bg-anthra-950/55 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((st, i) => (
              <div key={i} className={`py-6 ${i % 2 === 1 ? 'pl-6' : 'pl-0 md:pl-6'} ${i >= 2 ? 'border-t md:border-t-0 border-white/10' : ''}`}>
                <div className="font-display font-800 text-4xl sm:text-5xl text-white leading-none">
                  <CountUp to={st.n} suffix={st.s} />
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FeatureRow({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 text-white/75">
          <span className="mt-0.5 text-court-light shrink-0"><Icon.check width="18" /></span>
          <span className="text-[15px] leading-snug">{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Courts({ ui }) {
  return (
    <section id="courts" className="relative py-24 sm:py-32 bg-anthra-900">
      {ui.grid && <div className="absolute inset-0 bg-grid opacity-40" style={{ maskImage: 'linear-gradient(180deg,transparent,#000 20%,#000 80%,transparent)' }} />}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal><Eyebrow>Die Halle &amp; unsere Courts</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 max-w-3xl font-display font-800 uppercase leading-[0.95] tracking-tight text-[clamp(2.2rem,5vw,4rem)]">
            Zwei Sportarten.<br />Ein klarer Weg zum Court.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-5 max-w-xl text-white/65 text-lg">
            Padel buchst du blitzschnell online. Den Tennisplatz reservierst du persönlich am Telefon – damit alles passt.
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-5 gap-6">
          {/* PADEL — featured */}
          <Reveal className="lg:col-span-3">
            <div className={`group relative h-full ${ui.card} bg-anthra-800 border border-court/30 glow-blue overflow-hidden`}>
              <ImageSlot src="assets/img/padel-court.jpg" alt="Padel-Courts bei Courts Diez mit Flutlicht und Glaswänden" ratio="16/9" objectPos="center 40%" className="border-b border-white/10" />
              <div className="p-7 sm:p-9">
                <div className="flex items-baseline gap-3">
                  <span className="font-display font-900 text-6xl text-court-light leading-none">4×</span>
                  <h3 className="font-display font-800 uppercase text-3xl sm:text-4xl">Padel-Court</h3>
                </div>
                <p className="mt-4 text-white/70 text-[15px] leading-relaxed max-w-lg">
                  Vier moderne Manzasport Indoorcourts mit Flutlicht. Täglich geöffnet – flexibel online über Playtomic buchbar.
                </p>
                <div className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  <FeatureRow items={['Ein Panorama Court', '2 Doppel Courts']} />
                  <FeatureRow items={['Ein Single Court', 'Leihschläger inklusive']} />
                </div>

                <div className={`mt-8 ${ui.card === 'rounded-none' ? 'rounded-none' : 'rounded-xl'} border border-court/30 bg-court/10 p-5`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="h-11 w-11 rounded-lg bg-court/20 text-court-light flex items-center justify-center shrink-0"><Icon.app width="22" /></div>
                      <div>
                        <div className="font-display font-700 uppercase tracking-wide text-white text-lg leading-none">Buchung über Playtomic</div>
                        <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">Verfügbarkeit live · 24/7 online</div>
                      </div>
                    </div>
                    <Btn href="https://playtomic.com/tenant/33fd284f-5570-4892-a2dc-309e4b2ced75?utm_source=app_android&utm_campaign=share" external variant="primary" accent="court" radius={ui.btn} className="!px-6 !py-3 !text-sm">
                      In Playtomic buchen <Icon.arrow width="16" className="transition-transform group-hover:translate-x-0.5" />
                    </Btn>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* TENNIS — phone only */}
          <Reveal delay={120} className="lg:col-span-2">
            <div className={`relative h-full ${ui.card} bg-anthra-800 border border-white/10 overflow-hidden`}>
              <ImageSlot src="assets/img/tennis-court.jpg" alt="Teppichboden Tennisplatz bei Courts Diez" ratio="16/9" objectPos="center 40%" className="border-b border-white/10" />
              <div className="p-7 sm:p-9 flex flex-col h-[calc(100%-0px)]">
                <div className="flex items-baseline gap-3">
                  <span className="font-display font-900 text-6xl text-white/80 leading-none">1×</span>
                  <h3 className="font-display font-800 uppercase text-3xl sm:text-4xl">Tennisplatz</h3>
                </div>
                <p className="mt-4 text-white/70 text-[15px] leading-relaxed">
                  Ein Teppichboden Tennisplatz – gepflegt, lichtdurchflutet gelegen und bereit für deinen Aufschlag.
                </p>

                <div className={`mt-6 ${ui.card === 'rounded-none' ? 'rounded-none' : 'rounded-xl'} border border-ball/40 bg-ball/[0.07] p-5`}>
                  <div className="flex items-center gap-2.5 text-ball">
                    <Icon.alert width="19" />
                    <span className="font-display font-700 uppercase tracking-wide text-[15px]">Keine App-Buchung</span>
                  </div>
                  <p className="mt-2.5 text-white/75 text-[14px] leading-relaxed">
                    Der Tennisplatz wird <span className="text-white font-600">ausschließlich telefonisch</span> reserviert – nicht über Playtomic.
                  </p>
                </div>

                <div className="mt-auto pt-7">
                  <Btn href="tel:+49643262204" variant="primary" accent="ball" radius={ui.btn} className="w-full !text-base">
                    <Icon.phone width="18" /> Jetzt anrufen &amp; reservieren
                  </Btn>
                  <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">Mo–So · 06:00 – 24:00 Uhr</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Courts });
