// sections-top.jsx — Nav, Hero, Courts
const { useState: useStateT, useEffect: useEffectT } = React;

const NAV = [
  { id: 'courts', label: 'Courts' },
  { id: 'wellpass', label: 'Wellpass' },
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

/* ==========================================================================
   WELLPASS — EGYM Wellpass Firmenfitness bei CourtsDiez
   ========================================================================== */
function Wellpass({ ui }) {
  const mailSubject = encodeURIComponent('Wellpass-Freischaltung CourtsDiez');
  const mailBody = encodeURIComponent(
    'Hallo CourtsDiez-Team,\n\nich möchte meinen Wellpass-Vorteil für CourtsDiez freischalten lassen.\n\nMeine Playtomic E-Mail-Adresse: \n\nEin Screenshot meiner gültigen Wellpass-Mitgliedschaft ist dieser E-Mail beigefügt.\n\nSportliche Grüße,\n'
  );
  const mailHref = `mailto:info@courtsdiez.de?subject=${mailSubject}&body=${mailBody}`;

  return (
    <section id="wellpass" className="relative py-24 sm:py-32 bg-anthra-950 border-t border-white/10 overflow-hidden">
      {/* Background radial accents */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(47,147,221,0.45) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-0 h-[450px] w-[450px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(250,234,23,0.35) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <Reveal>
              <Eyebrow color="court">Firmenfitness &amp; Vorteilspartner</Eyebrow>
              <h2 className="mt-4 font-display font-800 uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
                WELLPASS BEI <span className="text-court-light">COURTSDIEZ.</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-4 text-white/70 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
                Nutze dein EGYM Wellpass Firmenfitness-Abo bei uns! Hier erfährst du, wie die einmalige Freischaltung abläuft und wie dein Vorteil bei jeder Padel-Buchung berücksichtigt wird.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120} className="shrink-0">
            <div className={`inline-flex items-center gap-4 bg-anthra-800/90 border border-white/15 px-6 py-4 shadow-xl ${ui.card}`}>
              <div className="text-right">
                <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/50">Offizieller Partner</div>
                <div className="font-display font-700 uppercase tracking-wide text-white text-sm sm:text-base">EGYM Wellpass</div>
              </div>
              <div className="h-8 w-px bg-white/15" />
              <img
                src="assets/wellpass-logo.svg"
                alt="EGYM Wellpass Logo"
                className="h-7 sm:h-8 w-auto object-contain brightness-100"
              />
            </div>
          </Reveal>
        </div>

        {/* Notice Banner: Padel vs. Tennis */}
        <Reveal delay={140} className="mt-8">
          <div className={`${ui.card} border border-court/40 bg-court/10 p-5 sm:p-6 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
            <div className="flex items-start sm:items-center gap-4">
              <div className="h-11 w-11 shrink-0 bg-court/20 text-court-light flex items-center justify-center border border-court/30">
                <Icon.court width="22" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display font-700 uppercase tracking-wide text-white text-base sm:text-lg">
                    Gültig für unsere Padelcourts
                  </span>
                  <span className="inline-block bg-court text-white font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold">
                    Padel only
                  </span>
                </div>
                <p className="mt-1 text-white/75 text-sm sm:text-[15px] leading-relaxed">
                  👉 <strong>Wellpass gilt bei CourtsDiez für unsere Padelcourts</strong> – der Tennisplatz ist vom Wellpass-Angebot ausgeschlossen.
                </p>
              </div>
            </div>
            <div className="shrink-0 sm:self-center">
              <span className="font-mono text-xs text-white/50 bg-anthra-900/80 px-3 py-1.5 border border-white/10 inline-block">
                Tennis: nur telefonisch regulär buchbar
              </span>
            </div>
          </div>
        </Reveal>

        {/* 2 Main Action Columns */}
        <div className="mt-8 grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Anmeldung */}
          <Reveal delay={160} className="h-full">
            <div className={`h-full flex flex-col ${ui.card} bg-anthra-800/85 border border-white/10 p-7 sm:p-9 relative overflow-hidden group hover:border-court/40 transition-colors duration-300`}>
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-court-light font-bold">
                  Schritt 1 · Einmalig
                </span>
                <span className="h-8 w-8 bg-court/15 text-court-light font-display font-bold flex items-center justify-center text-sm border border-court/30">
                  1
                </span>
              </div>

              <h3 className="mt-4 font-display font-800 uppercase text-2xl sm:text-3xl text-white">
                So meldest du dich für Wellpass bei uns an
              </h3>
              <p className="mt-2 text-white/70 text-[15px] leading-relaxed">
                Vor deiner ersten Buchung verknüpfen wir deinen Wellpass-Status mit deinem Playtomic-Konto. Bitte sende uns dazu per E-Mail an <a href="mailto:info@courtsdiez.de" className="text-court-light hover:underline font-semibold">info@courtsdiez.de</a>:
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 bg-anthra-900/90 border border-white/10 p-3.5">
                  <div className="mt-0.5 text-ball shrink-0">
                    <Icon.check width="18" />
                  </div>
                  <div>
                    <div className="font-display font-700 uppercase tracking-wide text-white text-sm">
                      Screenshot deiner Wellpass-Mitgliedschaft
                    </div>
                    <div className="text-white/60 text-xs mt-0.5">
                      Ein aktueller Screenshot deines Mitgliedsprofils aus der offiziellen Wellpass-App.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-anthra-900/90 border border-white/10 p-3.5">
                  <div className="mt-0.5 text-ball shrink-0">
                    <Icon.check width="18" />
                  </div>
                  <div>
                    <div className="font-display font-700 uppercase tracking-wide text-white text-sm">
                      Deine Playtomic E-Mail-Adresse
                    </div>
                    <div className="text-white/60 text-xs mt-0.5">
                      Die exakte E-Mail-Adresse, mit der du bei der Playtomic-App registriert bist.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 border border-white/10 bg-anthra-950/50 text-xs sm:text-[13px] text-white/70 leading-relaxed">
                <strong className="text-white">Bestätigung per E-Mail:</strong> Sobald dein Wellpass-Vorteil bei uns im System hinterlegt wurde, erhältst du von uns eine schriftliche Bestätigung per E-Mail. Danach kannst du direkt buchen!
              </div>

              <div className="mt-auto pt-7">
                <Btn
                  href={mailHref}
                  variant="primary"
                  accent="court"
                  radius={ui.btn}
                  className="w-full !text-sm sm:!text-base justify-center"
                >
                  <Icon.mail width="18" /> E-Mail zur Freischaltung senden
                </Btn>
                <div className="mt-2.5 text-center font-mono text-[11px] text-white/45">
                  Empfänger: <a href="mailto:info@courtsdiez.de" className="text-white/70 hover:underline">info@courtsdiez.de</a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Ablauf nach Bestätigung */}
          <Reveal delay={200} className="h-full">
            <div className={`h-full flex flex-col ${ui.card} bg-anthra-800/85 border border-white/10 p-7 sm:p-9 relative overflow-hidden group hover:border-ball/40 transition-colors duration-300`}>
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-ball font-bold">
                  Schritt 2 · Bei jedem Match
                </span>
                <span className="h-8 w-8 bg-ball/15 text-ball font-display font-bold flex items-center justify-center text-sm border border-ball/30">
                  2
                </span>
              </div>

              <h3 className="mt-4 font-display font-800 uppercase text-2xl sm:text-3xl text-white">
                Nach der Bestätigung – so funktioniert es
              </h3>
              <p className="mt-2 text-white/70 text-[15px] leading-relaxed">
                Dein Wellpass-Vorteil wird anschließend <strong className="text-white">automatisch</strong> bei deinen Padel-Buchungen über Playtomic berücksichtigt.
              </p>

              <div className="mt-6 space-y-3.5">
                {/* Step 1 */}
                <div className="flex items-start gap-3.5 p-3.5 bg-anthra-900/90 border border-white/10">
                  <div className="h-7 w-7 shrink-0 bg-white/10 text-white font-mono font-bold text-xs flex items-center justify-center border border-white/15">
                    01
                  </div>
                  <div>
                    <div className="font-display font-700 uppercase tracking-wide text-white text-base">
                      Padelcourt über Playtomic buchen
                    </div>
                    <p className="text-white/65 text-xs sm:text-[13px] mt-0.5 leading-relaxed">
                      Wähle wie gewohnt deinen Court und deine Spielzeit. Dein persönlicher Spieleranteil wird automatisch durch deinen hinterlegten Vorteil verrechnet.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3.5 p-3.5 bg-anthra-900/90 border border-white/10">
                  <div className="h-7 w-7 shrink-0 bg-court/20 text-court-light font-mono font-bold text-xs flex items-center justify-center border border-court/30">
                    02
                  </div>
                  <div>
                    <div className="font-display font-700 uppercase tracking-wide text-white text-base">
                      Vor Ort in der Wellpass-App einchecken
                    </div>
                    <p className="text-white/65 text-xs sm:text-[13px] mt-0.5 leading-relaxed">
                      Öffne vor Spielbeginn deine Wellpass-App und checke dich bei <strong className="text-white">CourtsDiez</strong> per QR-Code-Scan ein.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3.5 p-3.5 bg-anthra-900/90 border border-white/10">
                  <div className="h-7 w-7 shrink-0 bg-ball/20 text-ball font-mono font-bold text-xs flex items-center justify-center border border-ball/30">
                    03
                  </div>
                  <div>
                    <div className="font-display font-700 uppercase tracking-wide text-white text-base">
                      Padel spielen &amp; Spaß haben
                    </div>
                    <p className="text-white/65 text-xs sm:text-[13px] mt-0.5 leading-relaxed">
                      Court betreten, Ballwechsel starten und Sport auf Top-Niveau in moderner Atmosphäre genießen!
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-7">
                <Btn
                  href="https://playtomic.com/tenant/33fd284f-5570-4892-a2dc-309e4b2ced75?utm_source=app_android&utm_campaign=share"
                  external
                  variant="primary"
                  accent="ball"
                  radius={ui.btn}
                  className="w-full !text-sm sm:!text-base justify-center"
                >
                  <Icon.app width="18" /> CourtsDiez in Playtomic öffnen
                </Btn>
                <div className="mt-2.5 text-center font-mono text-[11px] text-white/45">
                  Vorteil wird nach Freischaltung aktiv
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Check-in Policy Notice Box */}
        <Reveal delay={240} className="mt-8">
          <div className={`${ui.card} border border-ball/40 bg-anthra-900 p-6 sm:p-7 relative overflow-hidden`}>
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-ball via-court to-ball" />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4 max-w-3xl">
                <div className="h-11 w-11 shrink-0 bg-ball/15 text-ball flex items-center justify-center border border-ball/30">
                  <Icon.alert width="22" />
                </div>
                <div>
                  <h4 className="font-display font-800 uppercase tracking-wide text-white text-lg sm:text-xl">
                    Wichtig: Vor-Ort Check-in bei jedem Match verpflichtend
                  </h4>
                  <div className="mt-2 text-white/75 text-sm sm:text-[14px] leading-relaxed space-y-2">
                    <p>
                      Bei jedem Besuch musst du dich vor deinem Match vor Ort in der <strong className="text-white">Wellpass-App bei CourtsDiez einchecken</strong>. Nur ein erfolgreich durchgeführter Check-in gilt als gültige Wellpass-Nutzung.
                    </p>
                    <p>
                      Bitte denke daher bei jedem Match an deinen Check-in – <strong className="text-white">auch dann, wenn die Halle zu diesem Zeitpunkt nicht besetzt ist</strong>.
                    </p>
                    <p className="text-white/60 text-xs">
                      ⚠️ Bei wiederholtem Ausbleiben des erforderlichen Wellpass-Check-ins behalten wir uns vor, den bei CourtsDiez hinterlegten Wellpass-Status wieder zu deaktivieren.
                    </p>
                  </div>
                </div>
              </div>

              <div className="shrink-0 self-stretch md:self-center flex md:flex-col justify-end">
                <div className="border border-white/10 bg-anthra-950/70 p-4 text-center">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ball font-bold">Vor Ort</div>
                  <div className="font-display font-700 uppercase text-white text-sm mt-0.5">QR-Code scannen</div>
                  <div className="font-mono text-[10px] text-white/50 mt-1">Wellpass App</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Courts, Wellpass });
