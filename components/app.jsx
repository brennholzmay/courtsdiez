// app.jsx — composition + Tweaks
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentMode": "balanced",
  "font": "Saira (sportlich)",
  "grid": true,
  "heroOverlay": 1
}/*EDITMODE-END*/;

const FONTS = {
  'Saira (sportlich)': { d: "'Saira Condensed'", b: "'Saira'" },
  'Oswald / Archivo':  { d: "'Oswald'",          b: "'Archivo'" },
  'Bebas / Barlow':    { d: "'Bebas Neue'",      b: "'Barlow'" },
  'Anton / Mulish':    { d: "'Anton'",           b: "'Mulish'" },
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [legalTab, setLegalTab] = React.useState(null);

  React.useEffect(() => {
    const f = FONTS[t.font] || FONTS['Saira (sportlich)'];
    const r = document.documentElement.style;
    r.setProperty('--font-display', f.d + ', sans-serif');
    r.setProperty('--font-body', f.b + ', sans-serif');
  }, [t.font]);

  React.useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['impressum', 'datenschutz', 'agb'].includes(hash)) {
        setLegalTab(hash);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // corners are always sharp per brand direction
  const ui = {
    card: 'rounded-none',
    btn: 'rounded-none',
    heroAccent: t.accentMode === 'court' ? 'court' : 'ball',
    primaryAccent: t.accentMode === 'ball' ? 'ball' : 'court',
    grid: !!t.grid,
    heroOverlay: t.heroOverlay,
  };

  return (
    <div>
      <Nav ui={ui} />
      <main>
        <Hero ui={ui} />
        <Courts ui={ui} />
        <Rules ui={ui} />
        <Faq ui={ui} />
        <Contact ui={ui} />
      </main>
      <Footer ui={ui} onOpenLegal={(tab) => setLegalTab(tab)} />

      <LegalModal
        activeTab={legalTab}
        onClose={() => setLegalTab(null)}
        setTab={setLegalTab}
        ui={ui}
      />

      <TweaksPanel>
        <TweakSection label="Typografie" />
        <TweakSelect label="Schriftart" value={t.font}
          options={Object.keys(FONTS)}
          onChange={(v) => setTweak('font', v)} />
        <TweakSection label="Akzent" />
        <TweakRadio label="Akzent-Modus" value={t.accentMode}
          options={['balanced', 'ball', 'court']}
          onChange={(v) => setTweak('accentMode', v)} />
        <TweakSection label="Darstellung" />
        <TweakToggle label="Raster-Hintergrund" value={t.grid}
          onChange={(v) => setTweak('grid', v)} />
        <TweakSlider label="Hero-Abdunklung" value={t.heroOverlay} min={0.5} max={1.3} step={0.05}
          onChange={(v) => setTweak('heroOverlay', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
