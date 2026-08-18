// sections-bottom.jsx — Padel rules explorer, Kontakt, Footer
const { useState: useStateB } = React;

const RULES = [
  {
    icon: 'glass', title: 'Das Spielfeld',
    short: 'Glaswände im Spiel',
    body: 'Padel wird auf einem 20 × 10 m großen Court gespielt, der komplett von Glaswänden und Gitter umschlossen ist. Anders als beim Tennis gehören die Wände zum Spiel.',
    facts: ['20 × 10 Meter', 'Glas + Gitter', 'Netz in der Mitte'],
  },
  {
    icon: 'serve', title: 'Der Aufschlag',
    short: 'Unterhandschlag',
    body: 'Beim Padel-Aufschlag wird der Ball zuerst hinter der Aufschlaglinie auf den Boden geprellt und im Unterhandschlag maximal auf oder unter Taillenhöhe getroffen. Er muss diagonal in das gegnerische Aufschlagfeld gespielt werden, wobei das Netz berührt werden darf (Wiederholung), der Ball im gegnerischen Feld aber nicht den Metallzaun treffen darf.',
    facts: ['Unter Taillenhöhe', 'Diagonal ins Feld', 'Ball auf Boden geprellt'],
  },
  {
    icon: 'score', title: 'Die Zählweise',
    short: 'Wie beim Tennis',
    body: 'Gezählt wird wie beim Tennis: 15 – 30 – 40 – Spiel. Ein Satz geht bis 6 Spiele (mit zwei Vorsprung), ein Match meist über zwei Gewinnsätze.',
    facts: ['15 · 30 · 40', '6 Spiele / Satz', 'Best of 3'],
  },
  {
    icon: 'court', title: 'Die Wände',
    short: 'Abprall erlaubt',
    body: 'Nachdem der Ball in deinem Feld aufgesprungen ist, darf er an deine eigenen Wände prallen und von dort weitergespielt werden. Ein Ball, der ohne Bodenkontakt direkt an die Wand fliegt, ist ein Punkt für den Gegner.',
    facts: ['Erst Boden, dann Wand', 'Rückwand spielen', 'Volley ohne Wand'],
  },
  {
    icon: 'players', title: 'Immer zu viert',
    short: 'Padel ist Doppel',
    body: 'Padel spielt man fast immer im Doppel – zwei gegen zwei auf engem Raum. Hier zählt Platzierung und Teamwork mehr als pure Kraft. Genau das macht den Einstieg so leicht.',
    facts: ['2 gegen 2', 'Teamwork', 'Leichter Einstieg'],
  },
];

function Rules({ ui }) {
  const [active, setActive] = useStateB(0);
  const [slideDir, setSlideDir] = useStateB('right');
  const tabRefs = React.useRef([]);
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  const r = RULES[active];
  const RIcon = Icon[r.icon];

  const changeRule = (newIdx) => {
    if (newIdx === active) return;
    setSlideDir(newIdx > active ? 'right' : 'left');
    setActive(newIdx);
  };

  // Auto-scroll active tab into view on mobile
  React.useEffect(() => {
    if (tabRefs.current[active]) {
      tabRefs.current[active].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [active]);

  // Touch swipe handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > 45) {
      if (distance > 0 && active < RULES.length - 1) {
        changeRule(active + 1);
      } else if (distance < 0 && active > 0) {
        changeRule(active - 1);
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section id="regeln" className="relative py-24 sm:py-32 bg-anthra-850 overflow-hidden w-full">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 w-full min-w-0">
        <div className="max-w-2xl w-full min-w-0">
          <Reveal><Eyebrow color="ball">Padel in 60 Sekunden</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display font-800 uppercase leading-[0.95] tracking-tight text-[clamp(2.2rem,5vw,4rem)]">
              Noch nie gespielt?<br />Kein Problem.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-white/65 text-lg">
              Die wichtigsten Regeln auf einen Blick. Tippe oder wische dich durch die 5 Karten für dein erstes Match.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="w-full min-w-0">
          <div className="mt-10 lg:mt-12 grid lg:grid-cols-[320px_1fr] gap-5 items-start w-full min-w-0">
            {/* Mobile Tab Slider Bar */}
            <div className="lg:hidden w-full min-w-0 overflow-hidden">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory no-scrollbar w-full min-w-0">
                {RULES.map((it, i) => {
                  const TI = Icon[it.icon];
                  const on = i === active;
                  return (
                    <button
                      key={i}
                      ref={(el) => (tabRefs.current[i] = el)}
                      onClick={() => changeRule(i)}
                      className={`shrink-0 snap-center flex items-center gap-2 px-3.5 py-2 rounded-full font-display font-700 uppercase tracking-wide text-xs border transition-all duration-300 ${on ? 'bg-ball text-anthra-950 border-ball shadow-[0_0_20px_rgba(250,234,23,0.4)]' : 'bg-anthra-900 border-white/10 text-white/70 hover:text-white'}`}
                    >
                      <TI width="14" />
                      <span>{it.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop Vertical Tabs */}
            <div className="hidden lg:flex flex-col gap-2.5 w-full min-w-0">
              {RULES.map((it, i) => {
                const TI = Icon[it.icon];
                const on = i === active;
                return (
                  <button
                    key={i}
                    onClick={() => changeRule(i)}
                    className={`w-full text-left flex items-center gap-3.5 px-4 py-3.5 ${ui.card === 'rounded-none' ? 'rounded-none' : 'rounded-xl'} border transition-all duration-300 ${on ? 'bg-anthra-800 border-court/50 glow-blue scale-[1.02]' : 'bg-anthra-900/90 border-white/8 hover:border-white/20 opacity-80 hover:opacity-100'}`}
                  >
                    <span className={`shrink-0 h-9 w-9 rounded-lg flex items-center justify-center transition-colors duration-300 ${on ? 'bg-court text-white' : 'bg-white/5 text-white/50'}`}>
                      <TI width="19" />
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-display font-700 uppercase tracking-wide text-[15px] leading-none ${on ? 'text-white' : 'text-white/70'}`}>{it.title}</span>
                      <span className="block mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40 whitespace-nowrap">{it.short}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detail Card Slider with touch swipe & motion effect */}
            <div className="w-full min-w-0">
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`relative w-full min-w-0 ${ui.card} bg-anthra-800 border border-white/10 overflow-hidden select-none touch-pan-y transition-all duration-300 shadow-xl`}
              >
                <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-court/10 blur-[90px] pointer-events-none" />
                
                <div
                  key={active}
                  className={`relative p-5 sm:p-10 w-full min-w-0 transition-all duration-300 transform ${slideDir === 'right' ? 'animate-rule-slide-right' : 'animate-rule-slide-left'}`}
                >
                  <div className="flex items-center justify-between gap-3 w-full min-w-0">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <span className="h-11 w-11 sm:h-14 sm:w-14 rounded-2xl bg-court/15 text-court-light flex items-center justify-center shrink-0 shadow-inner">
                        <RIcon width="24" className="sm:w-7" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-ball">Regel {String(active + 1).padStart(2, '0')} / 05</div>
                        <h3 className="font-display font-800 uppercase text-xl sm:text-4xl leading-none mt-1 truncate">{r.title}</h3>
                      </div>
                    </div>

                    {/* prev/next buttons */}
                    <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                      <button
                        onClick={() => active > 0 && changeRule(active - 1)}
                        disabled={active === 0}
                        className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg flex items-center justify-center border transition-all ${active === 0 ? 'opacity-30 border-white/5 text-white/30 cursor-not-allowed' : 'border-white/15 text-white hover:bg-white/10 active:scale-95'}`}
                        aria-label="Vorherige Regel"
                      >
                        <Icon.arrow width="15" className="rotate-180 sm:w-4" />
                      </button>
                      <button
                        onClick={() => active < RULES.length - 1 && changeRule(active + 1)}
                        disabled={active === RULES.length - 1}
                        className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg flex items-center justify-center border transition-all ${active === RULES.length - 1 ? 'opacity-30 border-white/5 text-white/30 cursor-not-allowed' : 'border-white/15 text-white hover:bg-white/10 active:scale-95'}`}
                        aria-label="Nächste Regel"
                      >
                        <Icon.arrow width="15" className="sm:w-4" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-4 sm:mt-7 text-white/80 text-sm sm:text-xl leading-relaxed max-w-2xl">{r.body}</p>
                  
                  <div className="mt-5 sm:mt-8 flex flex-wrap gap-1.5 sm:gap-2.5">
                    {r.facts.map((f, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 sm:px-4 sm:py-2 text-[11px] sm:text-[13px] text-white/80 max-w-full">
                        <span className="h-1.5 w-1.5 rounded-full bg-ball shrink-0" />
                        <span className="break-words">{f}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Bar & Dots */}
                <div className="relative px-5 sm:px-10 pb-5 sm:pb-7 flex items-center justify-between w-full min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {RULES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => changeRule(i)}
                        aria-label={`Regel ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-7 sm:w-8 bg-ball' : 'w-2 sm:w-2.5 bg-white/15 hover:bg-white/30'}`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-white/40">
                    {active + 1} / 5 · Wischen
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <style>{`
          @keyframes ruleSlideRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes ruleSlideLeft {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-rule-slide-right { animation: ruleSlideRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-rule-slide-left { animation: ruleSlideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Wie buche ich einen Court?", a: "Die Buchung erfolgt online über euer Buchungssystem. Dort wählst du den gewünschten Court, die Uhrzeit und die Spieldauer aus. Anschließend erhältst du eine Buchungsbestätigung." },
  { q: "Muss ich Mitglied sein?", a: "Nein. Bei Courts Diez kannst du einen Court auch ohne Vereins- oder Clubmitgliedschaft buchen." },
  { q: "Wie viele Personen spielen Padel?", a: "Klassisches Padel wird zu viert gespielt, also zwei gegen zwei. Auf dem Single Court kann auch zu zweit gespielt werden." },
  { q: "Kann ich Schläger und Bälle ausleihen?", a: "Leihschläger sind kostenlos vor den Courts verfügbar. Bälle kannst du an unserem Automaten oder an der Infotheke kaufen." },
  { q: "Welche Schuhe soll ich tragen?", a: "Geeignet sind saubere Hallenschuhe, Padel- oder Tennisschuhe mit gutem Halt. Schuhe mit stark verschmutzten oder ungeeigneten Sohlen dürfen die Courts nicht betreten. Auf dem Tennisplatz nur Schuhe mit glatter, heller Sohle tragen." },
  { q: "Wie lange sollte ich buchen?", a: "Für vier Spieler sind 60 oder 90 Minuten ein guter Einstieg. Für längere Matches oder Gruppen kann auch eine längere Spielzeit von 120 Minuten sinnvoll sein." },
  { q: "Kann ich meine Buchung stornieren?", a: "Eine kostenfreie Stornierung deiner Platzbuchung ist bis 24 Stunden vor Spielbeginn möglich. Bei einer späteren Stornierung oder Nichterscheinen wird der volle Buchungsbetrag berechnet." },
  { q: "Was passiert, wenn ich zu spät komme?", a: "Die Buchungszeit beginnt zum reservierten Zeitpunkt. Bei verspäteter Ankunft verlängert sich die Spielzeit nicht." },
  { q: "Gibt es Umkleiden und Duschen?", a: "Ja, bei Courts Diez stehen euch moderne Umkleiden und Duschen zur Verfügung." },
  { q: "Kann ich als Anfänger direkt buchen?", a: "Ja. Padel ist leicht zugänglich und du kannst direkt loslegen. Für einen besseren Einstieg könnt ihr zusätzlich ein Probetraining oder eine Einführung anbieten." },
  { q: "Dürfen Kinder und Jugendliche spielen?", a: "Ja, Padel und Tennis sind auch für Kinder und Jugendliche geeignet. Je nach Alter sollte eine erwachsene Aufsichtsperson dabei sein." },
  { q: "Kann ich ein Event oder eine Firmenveranstaltung buchen?", a: "Ja. Courts Diez eignet sich für Firmenveranstaltungen, Geburtstage, Gruppenangebote und Turniere. Dafür kann ein individuelles Angebot erstellt werden." },
  { q: "Brauche ich Vorkenntnisse für Padel?", a: "Nein. Padel ist sehr einsteigerfreundlich und bereits nach kurzer Erklärung gut spielbar." },
  { q: "Was soll ich zu meinem ersten Termin mitbringen?", a: "Bequeme Sportkleidung, saubere Sportschuhe und etwas zu trinken. Schläger und Bälle können je nach Angebot vor Ort ausgeliehen werden." },
  { q: "Wie früh sollte ich vor meiner Buchung da sein?", a: "Am besten bist du etwa 10 bis 15 Minuten vor Spielbeginn vor Ort. So bleibt genug Zeit zum Umziehen und zur Vorbereitung." },
  { q: "Gibt es Parkplätze?", a: "Ja, direkt vor der Halle." },
  { q: "Kann ich Getränke oder Snacks kaufen?", a: "Ja, an unserem Automaten oder an der Infotheke." },
  { q: "Bietet Ihr auch eine Gastronomie an?", a: "Ja, die Pizzeria di Gio bewirtschaftet unsere Gastronomie. Unter folgendem Link könnt Ihr euch über Öffnungszeiten und die Speisekarte informieren." },
];

function Faq({ ui }) {
  const [openIndex, setOpenIndex] = useStateB(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-anthra-900 border-t border-white/10">
      {ui.grid && <div className="absolute inset-0 bg-grid opacity-40" style={{ maskImage: 'linear-gradient(180deg,transparent,#000 20%,#000 80%,transparent)' }} />}
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal><Eyebrow color="ball">Fragen &amp; Antworten</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 font-display font-800 uppercase leading-[0.95] tracking-tight text-[clamp(2.2rem,5vw,4rem)]">
            Häufig gestellte Fragen
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-5 text-white/65 text-lg max-w-2xl">
            Alles, was du vor deiner ersten Buchung oder deinem Spiel bei Courts Diez wissen musst.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-12 space-y-3">
            {FAQS.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className={`border ${ui.card === 'rounded-none' ? 'rounded-none' : 'rounded-xl'} transition-all duration-200 ${isOpen ? 'bg-anthra-800 border-court/40 glow-blue' : 'bg-anthra-850 border-white/10 hover:border-white/20'}`}>
                  <button
                    onClick={() => toggle(i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
                  >
                    <span className="font-display font-700 uppercase tracking-wide text-lg sm:text-xl text-white">
                      {item.q}
                    </span>
                    <span className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'bg-ball text-anthra-950 rotate-180' : 'bg-white/5 text-white/60'}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-white/80 text-[15px] sm:text-base leading-relaxed border-t border-white/5">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact({ ui }) {
  const hours = [
    ['Montag – Mittwoch', '06:00 – 22:00 Uhr'],
    ['Donnerstag', '06:00 – 23:00 Uhr'],
    ['Freitag', '06:00 – 24:00 Uhr'],
    ['Samstag', '08:00 – 24:00 Uhr'],
    ['Sonntag', '08:00 – 22:00 Uhr'],
  ];
  const card = ui.card === 'rounded-none' ? 'rounded-none' : 'rounded-2xl';
  return (
    <section id="kontakt" className="relative py-24 sm:py-32 bg-anthra-850 border-t border-white/10">
      {ui.grid && <div className="absolute inset-0 bg-grid opacity-40" style={{ maskImage: 'linear-gradient(180deg,transparent,#000 25%,#000 75%,transparent)' }} />}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal><Eyebrow>Kontakt &amp; Anfahrt</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 max-w-3xl font-display font-800 uppercase leading-[0.95] tracking-tight text-[clamp(2.2rem,5vw,4rem)]">
            Komm vorbei.<br /><span className="text-ball">Fühl dich wohl.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-2 gap-6">
          {/* left: contact details */}
          <div className="grid sm:grid-cols-2 gap-4 content-start">
            {/* phone — highlighted */}
            <Reveal className="sm:col-span-2">
              <a href="tel:+49643262204" className={`group block ${card} border border-ball/40 bg-ball/[0.07] p-6 sm:p-7 transition-colors hover:bg-ball/[0.11]`}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-ball text-anthra-950 flex items-center justify-center shrink-0"><Icon.phone width="22" /></div>
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ball">Tennis-Buchung &amp; Anfragen</div>
                      <div className="font-display font-800 text-2xl sm:text-3xl text-white leading-tight mt-0.5">06432 - 62204</div>
                    </div>
                  </div>
                  <span className="text-white/40 group-hover:text-white transition-colors hidden sm:block"><Icon.arrow width="22" /></span>
                </div>
              </a>
            </Reveal>

            <Reveal delay={80}>
              <a href="mailto:info@courtsdiez.de" className={`group block h-full ${card} border border-white/10 bg-anthra-800 p-6 transition-colors hover:border-white/25`}>
                <div className="h-11 w-11 rounded-xl bg-white/5 text-court-light flex items-center justify-center"><Icon.mail width="20" /></div>
                <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">E-Mail</div>
                <div className="mt-1 font-display font-700 text-lg text-white break-all">info@courtsdiez.de</div>
              </a>
            </Reveal>

            <Reveal delay={140}>
              <div className={`h-full ${card} border border-white/10 bg-anthra-800 p-6`}>
                <div className="h-11 w-11 rounded-xl bg-white/5 text-court-light flex items-center justify-center"><Icon.pin width="20" /></div>
                <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">Adresse</div>
                <div className="mt-1 font-display font-700 text-lg text-white leading-snug">Am Hallenbad 6<br />65582 Diez</div>
              </div>
            </Reveal>

            {/* Gastronomie Card */}
            <Reveal delay={160} className="sm:col-span-2">
              <div className={`${card} border border-court/30 bg-court/10 p-6 sm:p-7`}>
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-xl bg-court text-white flex items-center justify-center font-display font-800 text-xl">🍕</span>
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-court-light">Gastronomie vor Ort</div>
                    <div className="font-display font-700 uppercase tracking-wide text-xl text-white">Pizzeria di Gio</div>
                  </div>
                </div>
                <p className="mt-3 text-white/75 text-[14px] leading-relaxed">
                  Die Pizzeria di Gio bewirtschaftet unsere Gastronomie. Genieße frische Speisen und kühle Getränke direkt nach deinem Spiel.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200} className="sm:col-span-2">
              <div className={`${card} border border-white/10 bg-anthra-800 p-6 sm:p-7`}>
                <div className="flex items-center gap-2.5 text-white/80">
                  <Icon.clock width="20" className="text-court-light" />
                  <span className="font-display font-700 uppercase tracking-wide text-lg">Öffnungszeiten</span>
                </div>
                <div className="mt-5 divide-y divide-white/8">
                  {hours.map(([d, h], i) => (
                    <div key={i} className="flex items-center justify-between py-3">
                      <span className="text-white/70 text-[15px]">{d}</span>
                      <span className="font-display font-600 text-white tracking-wide tabular-nums">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* right: map placeholder */}
          <Reveal delay={120}>
            <div className={`relative h-full min-h-[340px] ${card} overflow-hidden border border-white/10`}>
              <ImageSlot src="assets/img/map-diez.png" alt="Karte / Anfahrt – Standort Diez" ratio="auto" className="!h-full" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-court-light opacity-60 animate-ping" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-court border-2 border-white" />
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <div className="rounded-xl bg-anthra-950/80 backdrop-blur border border-white/10 px-5 py-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-display font-700 uppercase tracking-wide text-white">Courts Diez</div>
                    <div className="text-white/55 text-sm">Am Hallenbad 6 · 65582 Diez</div>
                  </div>
                  <Btn href="https://maps.google.com" external variant="soft" radius={ui.btn} className="!px-5 !py-2.5 !text-[13px] shrink-0">Route</Btn>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LegalModal({ activeTab, onClose, setTab, ui }) {
  if (!activeTab) return null;

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const tabs = [
    { id: 'impressum', label: 'Impressum' },
    { id: 'datenschutz', label: 'Datenschutz' },
    { id: 'agb', label: 'AGB & Platzordnung' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} />

      {/* modal card */}
      <div className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-anthra-900 border border-white/15 shadow-2xl overflow-hidden ${ui.card === 'rounded-none' ? 'rounded-none' : 'rounded-2xl'} z-10 my-auto`}>
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-anthra-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-ball" />
            <span className="font-display font-800 uppercase tracking-wide text-xl text-white">Rechtliche Hinweise</span>
          </div>
          <button onClick={onClose} className="p-2 text-white/60 hover:text-white transition-colors" aria-label="Schließen">
            <Icon.close width="24" />
          </button>
        </div>

        {/* tabs nav */}
        <div className="flex border-b border-white/10 bg-anthra-850 px-6 overflow-x-auto shrink-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-3.5 font-display font-700 uppercase tracking-wide text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === t.id ? 'border-ball text-ball bg-white/5' : 'border-transparent text-white/60 hover:text-white'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* content area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-white/80 text-sm sm:text-base leading-relaxed">
          {activeTab === 'impressum' && (
            <div className="space-y-6">
              <h3 className="font-display font-800 uppercase text-2xl text-white">Impressum</h3>
              
              <div className="space-y-3 border-l-2 border-court-light pl-4">
                <h4 className="font-display font-700 uppercase text-lg text-white">Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</h4>
                <p>
                  <strong>Tennishalle Diez OHG</strong><br />
                  Am Hallenbad 6<br />
                  65582 Diez
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-700 uppercase text-lg text-white">Kontakt</h4>
                <p>
                  Telefon: 06432 - 62204<br />
                  E-Mail: info@courtsdiez.de<br />
                  Website: www.courtsdiez.de
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-700 uppercase text-lg text-white">Vertretungsberechtigt</h4>
                <p>Tobias Dempewolf, Florian Dempewolf, Nikolas Dempewolf</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-700 uppercase text-lg text-white">Umsatzsteuer-ID</h4>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                  <strong>DE148388845</strong>
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-700 uppercase text-lg text-white">EU-Streitschlichtung &amp; Verbraucherstreitbeilegung</h4>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener" className="text-court-light underline">https://ec.europa.eu/consumers/odr/</a>.<br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'datenschutz' && (
            <div className="space-y-6">
              <h3 className="font-display font-800 uppercase text-2xl text-white">Datenschutzerklärung</h3>
              
              <div className="space-y-3 border-l-2 border-court-light pl-4">
                <h4 className="font-display font-700 uppercase text-lg text-white">1. Verantwortliche Stelle</h4>
                <p>
                  Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                </p>
                <p>
                  <strong>Tennishalle Diez OHG</strong><br />
                  Am Hallenbad 6<br />
                  65582 Diez<br />
                  Telefon: 06432 - 62204<br />
                  E-Mail: info@courtsdiez.de<br />
                  Vertretungsberechtigt: Tobias Dempewolf, Florian Dempewolf, Nikolas Dempewolf
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-700 uppercase text-lg text-white">2. Gesetzlicher Datenschutzbeauftragter</h4>
                <p>
                  Für unser Unternehmen ist die Bestellung eines Datenschutzbeauftragten gesetzlich nicht erforderlich, da die gesetzlichen Schwellenwerte gemäß § 38 BDSG (mindestens 20 Personen, die ständig mit der automatisierten Verarbeitung personenbezogener Daten beschäftigt sind) nicht erreicht werden und keine Verarbeitungen gemäß Art. 37 Abs. 1 lit. b und c DSGVO vorliegen. Bei Fragen zum Datenschutz wenden Sie sich bitte direkt an die oben genannte verantwortliche Stelle.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-700 uppercase text-lg text-white">3. Hosting &amp; Auftragsverarbeitung (AVV)</h4>
                <p>
                  Wir hosten die Inhalte unserer Website bei einem externen Webhosting-Dienstleister (Host / Server-Infrastruktur). Personenbezogene Daten, die auf dieser Website erfasst werden (z. B. IP-Adressen in Server-Logfiles), werden auf den Servern des Hosters verarbeitet.
                </p>
                <p>
                  Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
                <p>
                  <strong>Vertrag über Auftragsverarbeitung (AVV):</strong><br />
                  Um die datenschutzkonforme Verarbeitung zu gewährleisten, haben wir mit unserem Hosting-Dienstleister einen Vertrag über Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO geschlossen. Dieser stellt sicher, dass der Hoster die personenbezogenen Daten unserer Webseitenbesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-700 uppercase text-lg text-white">4. Allgemeine Hinweise &amp; Rechtsgrundlagen</h4>
                <p>
                  Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
                <p>
                  Die Verarbeitung personenbezogener Daten auf unserer Website erfolgt auf Basis folgender Rechtsgrundlagen der DSGVO:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-white/70 text-sm">
                  <li><strong>Art. 6 Abs. 1 lit. a DSGVO:</strong> Einwilligung der betroffenen Person.</li>
                  <li><strong>Art. 6 Abs. 1 lit. b DSGVO:</strong> Erfüllung eines Vertrags oder Durchführung vorvertraglicher Maßnahmen (z. B. Platzreservierung, Anfragen).</li>
                  <li><strong>Art. 6 Abs. 1 lit. f DSGVO:</strong> Wahrung unserer berechtigten Interessen (z. B. stabiler und sicherer Webseitenbetrieb, Missbrauchsprävention).</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-700 uppercase text-lg text-white">5. Speicherdauer &amp; konkrete Löschfristen</h4>
                <p>
                  Soweit in dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wird, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-white/70 text-sm">
                  <li><strong>Server-Log-Dateien:</strong> Werden aus Sicherheitsgründen (z. B. zur Aufklärung von Missbrauchs- oder Angriffsversuchen) für eine Dauer von <strong>7 bis maximal 14 Tagen</strong> gespeichert und danach automatisch gelöscht oder anonymisiert.</li>
                  <li><strong>Kontaktanfragen (Telefon / E-Mail):</strong> Daten aus Anfragen werden nach abschließender Bearbeitung Ihres Anliegens gelöscht, sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen.</li>
                  <li><strong>Buchungs- &amp; Abrechnungsdaten:</strong> Soweit über Telefon oder Buchungssysteme buchhalterisch relevante Belege entstehen, unterliegen diese den gesetzlichen Aufbewahrungsfristen von <strong>6 bis 10 Jahren</strong> gemäß § 147 AO (Abgabenordnung) und § 257 HGB (Handelsgesetzbuch).</li>
                  <li><strong>Videoüberwachungsaufnahmen (Halle):</strong> Werden nach spätestens <strong>72 Stunden</strong> automatisch und unwiderruflich überschrieben bzw. gelöscht, sofern kein konkreter meldepflichtiger Vorfall vorliegt.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-700 uppercase text-lg text-white">6. Pflicht zur Bereitstellung personenbezogener Daten</h4>
                <p>
                  Die Bereitstellung der IP-Adresse und der technischen Server-Logdaten ist für den Abruf und die fehlerfreie Darstellung unserer Website technisch zwingend erforderlich (ohne IP-Adresse kann der Server keine Daten an Ihr Endgerät übermitteln).
                </p>
                <p>
                  Bei einer telefonischen Platzreservierung oder Kontaktaufnahme ist die Bereitstellung von Name und Kontaktdaten (Telefonnummer bzw. E-Mail) für den Abschluss und die Durchführung des Buchungsvertrags bzw. die Beantwortung Ihrer Anfrage erforderlich. Eine Nichtbereitstellung hätte zur Folge, dass wir die Buchung oder Anfrage nicht bearbeiten können.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-700 uppercase text-lg text-white">7. SSL- bzw. TLS-Verschlüsselung</h4>
                <p>
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-700 uppercase text-lg text-white">8. Datenerfassung auf dieser Website</h4>
                
                <h5 className="font-display font-600 text-base text-white/90">Server-Log-Dateien</h5>
                <p>
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in Server-Log-Dateien, die Ihr Browser automatisch übermittelt:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-white/70 text-sm">
                  <li>Browsertyp und Browserversion</li>
                  <li>verwendetes Betriebssystem</li>
                  <li>Referrer URL (die zuvor besuchte Seite)</li>
                  <li>Hostname des zugreifenden Rechners / IP-Adresse</li>
                  <li>Uhrzeit und Datum der Serveranfrage</li>
                </ul>
                <p>
                  Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der IT-Sicherheit und Fehlerfreiheit des Systems).
                </p>

                <h5 className="font-display font-600 text-base text-white/90 pt-2">Cookies &amp; Tracking</h5>
                <p>
                  Unsere Website verzichtet auf den Einsatz einwilligungspflichtiger Tracking-, Analyse- oder Marketing-Cookies (wie z. B. Google Analytics oder Meta Pixel). Es werden ausschließlich technisch notwendige Session-Zustände im Browser verarbeitet.
                </p>

                <h5 className="font-display font-600 text-base text-white/90 pt-2">Kontaktaufnahme (Telefon / E-Mail)</h5>
                <p>
                  Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Telefonnummer, Anfrage, Reservierungsdaten) zum Zwecke der Bearbeitung Ihres Anliegens gespeichert und verarbeitet (Art. 6 Abs. 1 lit. b und lit. f DSGVO).
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-700 uppercase text-lg text-white">9. Externe Buchungsplattform (Playtomic)</h4>
                <p>
                  Für die Online-Buchung und Abrechnung der Padel-Plätze verlinken wir auf das Buchungssystem von <strong>Playtomic</strong> (Playtomic S.L., Calle de Méndez Álvaro, 20, 28045 Madrid, Spanien).
                </p>
                <p>
                  Wenn Sie auf die entsprechenden Buchungs-Buttons klicken, werden Sie direkt auf die Plattform von Playtomic weitergeleitet. Bei der Nutzung des Buchungssystems verarbeitet Playtomic die erforderlichen Daten in eigener datenschutzrechtlicher Verantwortung gemäß deren Datenschutzbestimmungen. Die Verlinkung erfolgt zur Abwicklung Ihrer Platzbuchung (Art. 6 Abs. 1 lit. b DSGVO).
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-700 uppercase text-lg text-white">10. Externe Schriften, CDNs &amp; Drittlandtransfer (USA)</h4>
                
                <h5 className="font-display font-600 text-base text-white/90">Google Fonts (Web Fonts)</h5>
                <p>
                  Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten Web Fonts von Google (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache. Hierbei wird Ihre IP-Adresse an Server von Google übermittelt, wobei auch eine Übertragung an Server der Muttergesellschaft Google LLC in den USA nicht ausgeschlossen werden kann.
                </p>
                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer einheitlichen typografischen Darstellung unseres Online-Auftritts).
                </p>

                <h5 className="font-display font-600 text-base text-white/90 pt-2">Content Delivery Networks (CDNs)</h5>
                <p>
                  Zur schnellen Bereitstellung von Skripten und Gestaltungsstilen verwenden wir CDNs (Tailwind CSS CDN, UNPKG / Cloudflare). Beim Abruf wird Ihre IP-Adresse an die Server der jeweiligen CDN-Anbieter übermittelt (Art. 6 Abs. 1 lit. f DSGVO).
                </p>

                <h5 className="font-display font-600 text-base text-white/90 pt-2">Hinweis zum Drittlandtransfer &amp; EU-US Data Privacy Framework (DPF)</h5>
                <p>
                  Soweit Daten in die USA übertragen werden, erfolgt dies auf Grundlage des <strong>EU-U.S. Data Privacy Frameworks (DPF)</strong>. Die Europäische Kommission hat für das DPF am 10. Juli 2023 einen Angemessenheitsbeschluss gemäß Art. 45 Abs. 1 DSGVO erlassen, der zertifizierten US-Unternehmen (wie Google LLC und Cloudflare, Inc.) ein mit der EU vergleichbares Datenschutzniveau bescheinigt. Zudem wurden mit den Anbietern Standardvertragsklauseln der EU-Kommission (Standard Contractual Clauses – SCC) vereinbart.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-700 uppercase text-lg text-white">11. Videoüberwachung in der Sportanlage / Halle</h4>
                <p>
                  In ausgewählten Bereichen unserer Sport- und Padel-Halle (z. B. Eingangsbereiche, Halleninnenbereich / Court-Flächen) ist eine optische Videoüberwachungsanlage installiert. Die überwachten Bereiche sind vor Ort durch gut sichtbare Hinweisschilder (Piktogramme) gekennzeichnet.
                </p>

                <h5 className="font-display font-600 text-base text-white/90 pt-1">Zwecke der Videoüberwachung &amp; berechtigtes Interesse</h5>
                <p>
                  Die Videoüberwachung erfolgt zur:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-white/70 text-sm">
                  <li>Wahrnehmung des Hausrechts und Verhinderung von unberechtigtem Zutritt</li>
                  <li>Schutz unseres Eigentums, der Sporteinrichtungen und Ausrüstung vor Vandalismus, Einbruch, Sachbeschädigung und Diebstahl</li>
                  <li>Aufklärung von Straftaten sowie Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen</li>
                  <li>Gewährleistung der Sicherheit von Besuchern, Sportlern und Mitarbeitern</li>
                </ul>

                <h5 className="font-display font-600 text-base text-white/90 pt-1">Rechtsgrundlage</h5>
                <p>
                  Die Verarbeitung erfolgt auf Grundlage von <strong>Art. 6 Abs. 1 lit. f DSGVO</strong> (Wahrung der berechtigten Interessen des Verantwortlichen) in Verbindung mit <strong>§ 4 BDSG</strong> (Videoüberwachung öffentlich zugänglicher Räume).
                </p>

                <h5 className="font-display font-600 text-base text-white/90 pt-1">Keine Überwachung sensibler Bereiche &amp; keine Tonaufnahmen</h5>
                <p>
                  Die Kameras erfassen ausschließlich <strong>Bilddaten</strong>; es erfolgt <strong>keine Tonaufnahme</strong>. Sensible Schutzbereiche (wie Umkleideräume, Duschen, Toiletten oder sonstige Sanitärbereiche) sind von jeder Videoüberwachung ausnahmslos ausgeschlossen.
                </p>

                <h5 className="font-display font-600 text-base text-white/90 pt-1">Speicherdauer &amp; automatische Löschung</h5>
                <p>
                  Die Aufnahmen werden rollierend gespeichert und nach spätestens <strong>72 Stunden</strong> automatisch und unwiderruflich überschrieben bzw. gelöscht. Eine längere Speicherung erfolgt ausschließlich dann, wenn die Daten im Einzelfall zur Verfolgung von konkreten Straftaten, Vandalismus oder zur Sicherung von Beweisen für zivilrechtliche Ansprüche erforderlich sind. In diesem Fall werden die Daten nach endgültiger Klärung des Vorfalls gelöscht.
                </p>

                <h5 className="font-display font-600 text-base text-white/90 pt-1">Empfänger der Daten</h5>
                <p>
                  Zugriff auf die Aufzeichnungen haben ausschließlich speziell autorisierte Personen der Geschäftsleitung. Eine Weitergabe an Dritte erfolgt ausschließlich an Strafverfolgungs- oder Gerichtsbehörden bzw. Rechtsbeistände bei Vorliegen eines konkreten strafrechtlichen Vorfalls oder zur Durchsetzung berechtigter zivilrechtlicher Ansprüche.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-700 uppercase text-lg text-white">12. Ihre Rechte als betroffene Person</h4>
                <p>Sie haben im Rahmen der DSGVO jederzeit folgende Rechte:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-white/70 text-sm">
                  <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Recht auf unentgeltliche Auskunft über die zu Ihrer Person gespeicherten Daten.</li>
                  <li><strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Recht auf Korrektur unrichtiger oder unvollständiger Daten.</li>
                  <li><strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Recht auf Löschung („Recht auf Vergessenwerden“), sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen.</li>
                  <li><strong>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Recht auf Einschränkung der Datenverarbeitung.</li>
                  <li><strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Recht auf Übermittlung der bereitgestellten Daten in einem strukturierten, gängigen und maschinenlesbaren Format.</li>
                  <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO Widerspruch einzulegen.</li>
                  <li><strong>Widerruf Ihrer Einwilligung:</strong> Eine erteilte Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-700 uppercase text-lg text-white">13. Beschwerderecht bei der zuständigen Aufsichtsbehörde</h4>
                <p>
                  Im Falle von datenschutzrechtlichen Verstößen steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu:
                </p>
                <p className="text-white/70 text-sm">
                  <strong>Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz (LfDI RLP)</strong><br />
                  Hintere Bleiche 34, 55116 Mainz<br />
                  Telefon: +49 (0) 6131 8920-0<br />
                  E-Mail: poststelle@datenschutz.rlp.de<br />
                  Website: <a href="https://www.datenschutz.rlp.de" target="_blank" rel="noopener" className="text-court-light underline">www.datenschutz.rlp.de</a>
                </p>
              </div>
            </div>
          )}

          {activeTab === 'agb' && (
            <div className="space-y-6">
              <h3 className="font-display font-800 uppercase text-2xl text-white">Allgemeine Geschäftsbedingungen (AGB) &amp; Platzordnung</h3>

              <div className="space-y-2">
                <h4 className="font-display font-700 uppercase text-lg text-white">1. Geltungsbereich &amp; Betreiber</h4>
                <p>
                  Diese Allgemeinen Geschäftsbedingungen (AGB) und die Haus- und Platzordnung gelten für sämtliche Nutzungen der Padel-Courts und des Tennisplatzes sowie für den Aufenthalt auf der gesamten Sportanlage von <strong>Courts Diez</strong> (Betreiber: <strong>Tennishalle Diez OHG</strong>, Am Hallenbad 6, 65582 Diez).
                </p>
                <p>
                  Mit dem Betreten der Anlage, der Buchung eines Platzes oder dem Abschluss eines Abonnements erkennt der Nutzer diese AGB und die Platzordnung verbindlich an.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-700 uppercase text-lg text-white">2. Buchungssysteme &amp; Vertragsschluss</h4>
                <p>
                  <strong>a) Padel-Courts (Drittanbieter Playtomic):</strong><br />
                  Die Buchung, Bezahlung und Stornierung der Padel-Courts erfolgt ausschließlich über die externe Buchungsplattform von <strong>Playtomic</strong> (Playtomic S.L.). Für den Buchungs- und Zahlungsvorgang gelten ergänzend die AGB und Stornobedingungen von Playtomic. Die Nutzung der Plätze vor Ort richtet sich nach unserer Haus- und Platzordnung.
                </p>
                <p>
                  <strong>b) Tennisplatz (Direktbuchung):</strong><br />
                  Einzelstunden für den Tennisplatz werden telefonisch (06432 - 62204) oder per E-Mail reserviert. Der Vertrag kommt mit unserer mündlichen oder schriftlichen Buchungsbestätigung zustande.
                </p>
                <p>
                  <strong>c) Gesetzlicher Ausschluss des Widerrufsrechts (§ 312g Abs. 2 Nr. 9 BGB):</strong><br />
                  Bei der Buchung von Sport- und Freizeitdienstleistungen zu einem spezifischen Termin oder Zeitraum besteht gemäß § 312g Abs. 2 Nr. 9 BGB kein gesetzliches 14-tägiges Widerrufsrecht für Verbraucher.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-700 uppercase text-lg text-white">3. Preise, Zahlungsbedingungen &amp; Abonnements (Tennis)</h4>
                <p>
                  Alle angegebenen Preise verstehen sich in Euro inklusive der jeweils gültigen gesetzlichen Mehrwertsteuer.
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-white/70 text-sm">
                  <li><strong>Tennis-Einzelstunden:</strong> Die Bezahlung erfolgt vor Spielantritt vor Ort in bar oder per EC-/Kreditkarte.</li>
                  <li><strong>Tennis-Abonnements (Wintersaison):</strong> Abonnements gelten für den festen Zeitraum vom <strong>01.10. bis 30.04.</strong> und werden im Voraus per Rechnung/Banküberweisung beglichen. Vom <strong>01.05. bis 30.09.</strong> werden ausschließlich Einzelstunden vergeben.</li>
                  <li><strong>Keine Nachholstunden:</strong> Vom Kunden versäumte oder nicht wahrgenommene Abo-Stunden (z. B. durch Krankheit oder Urlaub) verfallen ersatzlos. Ein Anspruch auf Nachholstunden, Rückvergütung oder Übertrag in eine Folgesaison besteht nicht.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-700 uppercase text-lg text-white">4. Stornierungsbedingungen &amp; Spielbetrieb (Tennis)</h4>
                <p>
                  Eine kostenfreie Stornierung von telefonisch oder per E-Mail gebuchten Tennis-Einzelstunden ist bis spätestens <strong>24 Stunden vor Spielbeginn</strong> möglich.
                </p>
                <p>
                  Bei verspäteter Absage oder Nichterscheinen (No-Show) bleibt der volle Mietpreis zur Zahlung fällig, es sei denn, die Stunde kann kurzfristig anderweitig vermietet werden.
                </p>
                <p>
                  Die gebuchte Spielzeit beginnt und endet pünktlich zur reservierten Zeit. Bei verspätetem Spielantritt durch den Nutzer besteht kein Anspruch auf Verlängerung der Spielzeit.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-700 uppercase text-lg text-white">5. Platzordnung &amp; Schuhwerk</h4>
                <p>
                  Das Betreten der Spielfelder ist nur in angemessener Sportbekleidung und mit geeignetem Schuhwerk gestattet:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-white/70 text-sm">
                  <li><strong>Tennisplatz (Teppichboden):</strong> Es dürfen ausschließlich spezielle Hallentennisschuhe mit <strong>völlig glatter und abriebfester (non-marking) Sohle ohne Profil</strong> getragen werden. Das Betreten mit profilierten Schuhen, Sandplatzschuhen oder Straßenschuhen ist strengstens untersagt.</li>
                  <li><strong>Padel-Courts:</strong> Saubere Hallen- oder Sportschuhe mit abriebfester Sohle.</li>
                  <li>Straßenschuhe sind vor dem Betreten der Courts in den Umkleiden gegen saubere Hallenschuhe zu wechseln. Bei vorsätzlicher oder grob fahrlässiger Verschmutzung oder Beschädigung der Beläge werden die Reinigungskosten dem Verursacher in Rechnung gestellt.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-700 uppercase text-lg text-white">6. Kostenloses Leihmaterial &amp; Equipment</h4>
                <p>
                  Leihschläger und Bälle werden den Nutzern vor Ort kostenfrei zur Verfügung gestellt. Das Material ist pfleglich zu behandeln und darf ausschließlich während der gebuchten Spielzeit <strong>innerhalb der Halle</strong> genutzt werden.
                </p>
                <p>
                  Nach Spielende ist das gesamte Leihmaterial vollständig an die dafür vorgesehenen Stationen zurückzulegen. Bei vorsätzlicher Beschädigung (z. B. Schlagen des Schlägers gegen Glaswände, Gitter oder Einrichtungsgegenstände) oder Verlust/Entwendung haftet der Nutzer auf Ersatz des Wiederbeschaffungswerts.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-700 uppercase text-lg text-white">7. Hausordnung, Sicherheit &amp; Sauberkeit</h4>
                <ul className="list-disc list-inside space-y-1 pl-2 text-white/70 text-sm">
                  <li><strong>Öffnungszeiten:</strong> Mo–Mi 06:00–22:00 Uhr, Do 06:00–23:00 Uhr, Fr 06:00–24:00 Uhr, Sa 08:00–24:00 Uhr, So 08:00–22:00 Uhr.</li>
                  <li><strong>Rauchverbot:</strong> Im gesamten Gebäude gilt ein striktes Rauch- und Dampfverbot (inkl. E-Zigaretten und Vapes).</li>
                  <li><strong>Getränke &amp; Speisen:</strong> Auf den Spielfeldern sind nur bruchsichere Trinkflaschen gestattet. <strong>Glasflaschen sind auf den Courts streng verboten.</strong> Der Verzehr von Speisen ist nur im Aufenthalts-/Loungebereich gestattet.</li>
                  <li><strong>Tiere:</strong> Das Mitführen von Tieren in den Hallen- und Courtbereich ist nicht gestattet.</li>
                  <li><strong>Hausrecht:</strong> Den Anweisungen des Hallenpersonals und der Geschäftsleitung ist Folge zu leisten. Bei groben Verstößen gegen die Platzordnung kann ein Hallenverweis ohne Rückerstattungsanspruch ausgesprochen werden.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-700 uppercase text-lg text-white">8. Haftung &amp; Wertsachen</h4>
                <p>
                  Die Tennishalle Diez OHG haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, die auf einer vorsätzlichen oder fahrlässigen Pflichtverletzung beruhen.
                </p>
                <p>
                  Für sonstige Sach- und Vermögensschäden haftet die Betreiberin nur bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten).
                </p>
                <p>
                  Für den Verlust, Diebstahl oder die Beschädigung von mitgebrachten Gegenständen, Kleidung, Sportgeräten oder Wertsachen in den Umkleideräumen, Hallenbereichen oder auf dem Außengelände/Parkplatz wird keine Haftung übernommen.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-700 uppercase text-lg text-white">9. Betriebsstörungen &amp; Höhere Gewalt</h4>
                <p>
                  Kann ein gebuchter Tennisplatz aus Gründen, die von der Betreiberin zu vertreten sind (z. B. Beleuchtungs- oder Heizungsausfall), oder infolge höherer Gewalt nicht bespielt werden, wird dem Kunden der gezahlte Betrag erstattet oder ein kostenloser Ersatztermin bereitgestellt. Weitergehende Ansprüche (z. B. Fahrt- oder Anreisekosten) sind ausgeschlossen.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-700 uppercase text-lg text-white">10. Verbraucherstreitbeilegung &amp; Schlussbestimmungen</h4>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener" className="text-court-light underline">ec.europa.eu/consumers/odr</a>. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).
                </p>
                <p>
                  Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen dieser Bedingungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen hiervon unberührt.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* footer inside modal */}
        <div className="px-6 py-4 border-t border-white/10 bg-anthra-950/90 flex justify-end shrink-0">
          <Btn onClick={onClose} variant="soft" radius={ui.btn} className="!px-6 !py-2.5 !text-sm">
            Schließen
          </Btn>
        </div>
      </div>
    </div>
  );
}

function BookingModal({ isOpen, onClose, ui }) {
  if (!isOpen) return null;

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const cardClass = ui.card === 'rounded-none' ? 'rounded-none' : 'rounded-2xl';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} />

      {/* modal card */}
      <div className={`relative w-full max-w-4xl flex flex-col bg-anthra-900 border border-white/15 shadow-2xl overflow-hidden ${cardClass} z-10 my-auto`}>
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-anthra-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-ball animate-pulse" />
            <span className="font-display font-800 uppercase tracking-wide text-xl sm:text-2xl text-white">Court buchen</span>
          </div>
          <button onClick={onClose} className="p-2 text-white/60 hover:text-white transition-colors" aria-label="Schließen">
            <Icon.close width="24" />
          </button>
        </div>

        {/* content grid: 2 columns */}
        <div className="p-6 sm:p-8 grid md:grid-cols-2 gap-6 bg-anthra-900">
          {/* Padel Card */}
          <div className={`flex flex-col justify-between ${cardClass} border border-court/40 bg-court/10 p-6 sm:p-7 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-court/15 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-court-light font-semibold">4× Indoor Courts</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-court/20 text-court-light font-mono text-[11px] uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-court-light" /> Live-Buchung
                </span>
              </div>
              <h3 className="mt-3 font-display font-900 uppercase text-3xl text-white tracking-tight">Padel</h3>
              <p className="mt-2.5 text-white/75 text-sm sm:text-[15px] leading-relaxed">
                Buche deinen Padel-Court schnell und einfach online über Playtomic. Freie Spielzeiten siehst du in Echtzeit.
              </p>
              
              <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-xs text-white/70 font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-court-light font-bold">✓</span>
                  <span>Kostenlose Leihschläger &amp; Bälle inklusive</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-court-light font-bold">✓</span>
                  <span>Sofortige Buchungsbestätigung</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-2">
              <Btn href="https://playtomic.io" external variant="primary" accent="court" radius={ui.btn} className="w-full !py-3.5 !text-base shadow-lg shadow-court/20">
                <Icon.app width="18" /> Über Playtomic buchen <Icon.arrow width="16" />
              </Btn>
            </div>
          </div>

          {/* Tennis Card */}
          <div className={`flex flex-col justify-between ${cardClass} border border-ball/40 bg-ball/[0.07] p-6 sm:p-7 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-ball/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ball font-semibold">1× Teppichplatz</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-ball/15 text-ball font-mono text-[11px] uppercase tracking-wider">
                  Direktreservierung
                </span>
              </div>
              <h3 className="mt-3 font-display font-900 uppercase text-3xl text-white tracking-tight">Tennis</h3>
              <p className="mt-2.5 text-white/75 text-sm sm:text-[15px] leading-relaxed">
                Reserviere deine Einzelstunde oder dein Wintersaison-Abonnement direkt bei uns per E-Mail oder Telefon.
              </p>

              <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-xs text-white/70 font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-ball font-bold">✓</span>
                  <span>Rebound Ace Teppichboden (glatte Hallenschuhe)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-ball font-bold">✓</span>
                  <span>Einzelstunden &amp; Saison-Abos</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3 pt-2">
              <Btn href="mailto:info@courtsdiez.de?subject=Buchungsanfrage%20Tennisplatz%20Courts%20Diez" variant="primary" accent="ball" radius={ui.btn} className="w-full !py-3.5 !text-base shadow-lg shadow-ball/10">
                <Icon.mail width="18" /> Per E-Mail anfragen
              </Btn>
              
              <a
                href="tel:+49643262204"
                className={`flex items-center justify-between px-4 py-3 bg-anthra-950/70 hover:bg-anthra-950 border border-white/10 hover:border-ball/50 transition-all ${cardClass} text-white group`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-ball/20 text-ball flex items-center justify-center shrink-0 group-hover:bg-ball group-hover:text-anthra-950 transition-colors">
                    <Icon.phone width="16" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">Telefonisch reservieren</div>
                    <div className="font-display font-800 text-lg leading-tight text-white group-hover:text-ball transition-colors">06432 - 62204</div>
                  </div>
                </div>
                <span className="text-white/40 group-hover:text-ball group-hover:translate-x-0.5 transition-all"><Icon.arrow width="18" /></span>
              </a>
            </div>
          </div>
        </div>

        {/* footer inside modal */}
        <div className="px-6 py-4 border-t border-white/10 bg-anthra-950/90 flex items-center justify-between shrink-0">
          <span className="font-mono text-xs text-white/40">Courts Diez · Am Hallenbad 6, 65582 Diez</span>
          <Btn onClick={onClose} variant="soft" radius={ui.btn} className="!px-6 !py-2 !text-sm">
            Schließen
          </Btn>
        </div>
      </div>
    </div>
  );
}

function Footer({ ui, onOpenLegal, onOpenBooking }) {
  return (
    <footer className="relative bg-anthra-950 border-t border-white/10">
      {/* CTA band */}
      <div className="relative overflow-hidden">
        {ui.grid && <div className="absolute inset-0 bg-grid opacity-50" />}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-40 w-[40rem] bg-court/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 text-center">
          <Reveal>
            <h2 className="font-display font-900 uppercase leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,5rem)]">
              Bereit für dein <span className="text-ball">Match</span>?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Btn onClick={onOpenBooking} variant="primary" accent={ui.heroAccent} radius={ui.btn} className="!text-base">
                <Icon.app width="18" /> Court jetzt buchen <Icon.arrow width="16" />
              </Btn>
              <Btn href="tel:+49643262204" variant="ghost" radius={ui.btn} className="!text-base">
                <Icon.phone width="17" /> Tennis: 06432 - 62204
              </Btn>
            </div>
          </Reveal>
        </div>
      </div>

      {/* links */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
          <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10">
            <div>
              <img src="assets/courts-diez-logo.png" alt="Courts Diez" className="h-16 w-auto" />
              <p className="mt-5 text-white/55 text-[15px] max-w-xs leading-relaxed">
                Padel &amp; Tennis in Diez. Vier Indoor-Padel-Courts und ein klassischer Tennisplatz – für Einsteiger und Profis.
              </p>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">Entdecken</div>
              <ul className="mt-4 space-y-3">
                {[['Courts', '#courts'], ['Padel-Regeln', '#regeln'], ['FAQ', '#faq'], ['Kontakt & Anfahrt', '#kontakt']].map(([l, h]) => (
                  <li key={l}><a href={h} className="text-white/75 hover:text-ball transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">Buchen</div>
              <ul className="mt-4 space-y-3">
                <li><a href="https://playtomic.io" target="_blank" rel="noopener" className="text-white/75 hover:text-ball transition-colors">Padel via Playtomic</a></li>
                <li><a href="tel:+49643262204" className="text-white/75 hover:text-ball transition-colors">Tennis: 06432 - 62204</a></li>
                <li><a href="mailto:info@courtsdiez.de" className="text-white/75 hover:text-ball transition-colors">info@courtsdiez.de</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-white/40 text-sm">© {new Date().getFullYear()} Courts Diez · Padel &amp; Tennis</div>
            <div className="flex flex-wrap items-center gap-6 font-mono text-[12px] uppercase tracking-[0.14em]">
              <button onClick={() => onOpenLegal && onOpenLegal('impressum')} className="text-white/55 hover:text-white transition-colors">Impressum</button>
              <button onClick={() => onOpenLegal && onOpenLegal('datenschutz')} className="text-white/55 hover:text-white transition-colors">Datenschutz</button>
              <button onClick={() => onOpenLegal && onOpenLegal('agb')} className="text-white/55 hover:text-white transition-colors">AGB &amp; Platzordnung</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Rules, Faq, Contact, LegalModal, BookingModal, Footer });
