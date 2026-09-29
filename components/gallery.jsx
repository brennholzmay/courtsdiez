// gallery.jsx — Impressions / Gallery section with interactive lightbox
const { useState: useStateG, useEffect: useEffectG } = React;

const GALLERY_ITEMS = [
  {
    id: 'hall-overview',
    src: 'assets/img/hall-overview.jpg',
    category: 'arena',
    tag: 'Arena-Überblick',
    title: 'Die Sportarena im Überblick',
    desc: 'Heller, offener Hallenkomplex mit Tennisplatz im Vordergrund und vier modernen Padel-Courts unter dem markanten Holz-Tonnendach.',
    featured: true,
  },
  {
    id: 'padel-panorama',
    src: 'assets/img/padel-panorama.jpg',
    category: 'padel',
    tag: 'Padel-Courts 1–3',
    title: 'Courts 1 bis 3 & Lounge-Blick',
    desc: 'Blick über die Padel-Courts mit kontrastreicher gelber Hallengestaltung, blendfreiem LED-Flutlicht und direktem Zugang zur Lounge.',
    featured: false,
  },
  {
    id: 'padel-court',
    src: 'assets/img/padel-court.jpg',
    category: 'padel',
    tag: 'Padel Detail',
    title: 'Court 3 & 4 Manzasport',
    desc: 'Hochwertige Glaswände, robuste Gitterelemente und gelenkschonender Kunstrasenbelag für rasante Ballwechsel.',
    featured: false,
  },
  {
    id: 'tennis-court',
    src: 'assets/img/tennis-court.jpg',
    category: 'tennis',
    tag: 'Tennisplatz',
    title: 'Klassischer Hallen-Tennisplatz',
    desc: 'Gepflegter Teppichbodenbelag mit Granulat, perfekter Ausleuchtung und Hallenbranding – exklusiv per Telefon reservierbar.',
    featured: false,
  },
  {
    id: 'lounge',
    src: 'assets/img/lounge.jpg',
    category: 'lounge',
    tag: 'Lounge & Foyer',
    title: 'Lounge & Community-Bereich',
    desc: 'Gemütliche Atmosphäre für die Pause zwischen den Sätzen oder das Kaltgetränk mit Mitspielern nach dem Match.',
    featured: false,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Alle Eindrücke' },
  { id: 'padel', label: 'Padel' },
  { id: 'tennis', label: 'Tennis' },
  { id: 'lounge', label: 'Lounge' },
];

function Gallery({ ui }) {
  const [activeFilter, setActiveFilter] = useStateG('all');
  const [lightboxIdx, setLightboxIdx] = useStateG(null);

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  // Keyboard navigation for lightbox
  useEffectG(() => {
    if (lightboxIdx === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxIdx(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIdx((prev) => (prev + 1) % GALLERY_ITEMS.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIdx((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIdx]);

  return (
    <section id="galerie" className="relative py-24 sm:py-32 bg-anthra-950 overflow-hidden">
      {ui.grid && (
        <div
          className="absolute inset-0 bg-grid opacity-30"
          style={{ maskImage: 'linear-gradient(180deg,transparent,#000 20%,#000 80%,transparent)' }}
        />
      )}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Reveal><Eyebrow color="court">Ein Blick in unsere Halle</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 max-w-2xl font-display font-800 uppercase leading-[0.95] tracking-tight text-[clamp(2.2rem,5vw,4rem)]">
                Echte Atmosphäre.<br />
                <span className="text-court-light">Moderne Sportanlage.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 max-w-xl text-white/65 text-lg">
                Originalaufnahmen aus unserer Halle in Diez: vier Padel-Courts, ein Hallentennisplatz und gemütliche Aufenthaltsbereiche für dein Match.
              </p>
            </Reveal>
          </div>

          {/* Filter Pills */}
          <Reveal delay={180}>
            <div className="flex flex-wrap gap-2 border border-white/10 p-1.5 bg-anthra-900/80 backdrop-blur-sm self-start md:self-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`font-display uppercase tracking-wider text-xs sm:text-sm font-700 px-4 py-2 transition-all duration-200 ${
                    activeFilter === cat.id
                      ? 'bg-court text-white shadow-[0_0_20px_-4px_rgba(47,147,221,0.6)]'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Gallery Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const globalIndex = GALLERY_ITEMS.findIndex((it) => it.id === item.id);
            const isFullSpan = item.featured && activeFilter === 'all';
            return (
              <Reveal
                key={item.id}
                delay={idx * 70}
                className={`group cursor-pointer ${isFullSpan ? 'md:col-span-2 lg:col-span-2' : ''}`}
                onClick={() => setLightboxIdx(globalIndex)}
              >
                <div className={`relative h-full overflow-hidden bg-anthra-900 border border-white/10 hover:border-court-light/60 transition-all duration-300 ${ui.card}`}>
                  {/* Image Container */}
                  <div className={`relative overflow-hidden ${isFullSpan ? 'aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[16/10]'}`}>
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-anthra-950 via-anthra-950/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                    {/* Tag badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-block font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] bg-anthra-950/80 backdrop-blur-md border border-white/15 px-3 py-1 text-court-light">
                        {item.tag}
                      </span>
                    </div>

                    {/* Hover zoom indicator */}
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                      <div className="h-9 w-9 rounded-full bg-court/85 text-white flex items-center justify-center shadow-lg">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                      </div>
                    </div>

                    {/* Bottom caption overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10">
                      <h3 className="font-display font-800 uppercase text-xl sm:text-2xl text-white group-hover:text-court-light transition-colors leading-tight">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-white/70 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setLightboxIdx(null)} />

          {/* Close button */}
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 h-12 w-12 rounded-full bg-anthra-800/80 border border-white/20 text-white hover:text-ball hover:border-ball flex items-center justify-center transition-colors"
            aria-label="Schließen"
          >
            <Icon.close width="24" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-anthra-800/80 border border-white/20 text-white hover:text-court-light hover:border-court-light flex items-center justify-center transition-colors"
            aria-label="Vorheriges Bild"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((prev) => (prev + 1) % GALLERY_ITEMS.length);
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-anthra-800/80 border border-white/20 text-white hover:text-court-light hover:border-court-light flex items-center justify-center transition-colors"
            aria-label="Nächstes Bild"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Lightbox Content Card */}
          <div
            className="relative z-10 max-w-5xl w-full bg-anthra-900 border border-white/15 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[72vh] flex items-center justify-center bg-black/50">
              <img
                src={GALLERY_ITEMS[lightboxIdx].src}
                alt={GALLERY_ITEMS[lightboxIdx].title}
                className="max-h-[72vh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="p-5 sm:p-7 bg-anthra-900 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-court-light">
                    {GALLERY_ITEMS[lightboxIdx].tag}
                  </span>
                  <span className="text-white/30 text-xs">•</span>
                  <span className="font-mono text-xs text-white/50">
                    Bild {lightboxIdx + 1} von {GALLERY_ITEMS.length}
                  </span>
                </div>
                <h4 className="mt-1 font-display font-800 uppercase text-2xl text-white">
                  {GALLERY_ITEMS[lightboxIdx].title}
                </h4>
                <p className="mt-1.5 text-white/70 text-sm max-w-2xl">
                  {GALLERY_ITEMS[lightboxIdx].desc}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Btn
                  href="#top"
                  onClick={() => setLightboxIdx(null)}
                  variant="primary"
                  accent="court"
                  radius={ui.btn}
                  className="!px-5 !py-2.5 !text-sm"
                >
                  Court buchen
                </Btn>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

Object.assign(window, { Gallery });
