// Haupt-App
const App = () => {
  const [activeStage, setActiveStage] = React.useState(null);
  const [expanded, setExpanded] = React.useState({});

  const toggle = (n) => {
    setExpanded((e) => ({ ...e, [n]: !e[n] }));
    setActiveStage(n);
  };

  const expandAll = () => {
    const all = {};
    STAGES.forEach((s) => (all[s.n] = true));
    setExpanded(all);
  };
  const collapseAll = () => setExpanded({});

  return (
    <div className="page">
      {/* HERO / PLAKAT */}
      <section className="hero">
        <div className="hero__paper">
          <div className="hero__top">
            <div className="hero__edition">
              <div className="hero__edition-line">EDIZIONE</div>
              <div className="hero__edition-num">{TOUR_META.year}</div>
            </div>
            <div className="hero__stamp">
              <div>BICICLETTA</div>
              <div className="hero__stamp-big">DA CORSA</div>
              <div>SOLAMENTE</div>
            </div>
            <div className="hero__edition hero__edition--right">
              <div className="hero__edition-line">PARTENZA</div>
              <div className="hero__edition-num">XX·VIII</div>
            </div>
          </div>

          <h1 className="hero__title">
            <span className="hero__title-line1">La Strada</span>
            <span className="hero__title-line2">del Sud</span>
          </h1>

          <div className="hero__rule"><span>·</span><span>·</span><span>·</span></div>

          <h2 className="hero__sub">
            Venezia <span className="hero__sub-sep">—</span> Roma
          </h2>
          <div className="hero__tag">in tredici giorni · sulle strade del Giro</div>

          <div className="hero__stats">
            <div className="hstat">
              <div className="hstat__v">{TOUR_META.totalKm}</div>
              <div className="hstat__l">chilometri</div>
            </div>
            <div className="hstat hstat__sep">·</div>
            <div className="hstat">
              <div className="hstat__v">{TOUR_META.totalHm.toLocaleString("de-DE")}</div>
              <div className="hstat__l">metri di salita</div>
            </div>
            <div className="hstat hstat__sep">·</div>
            <div className="hstat">
              <div className="hstat__v">{TOUR_META.ridingDays}</div>
              <div className="hstat__l">tappe</div>
            </div>
            <div className="hstat hstat__sep">·</div>
            <div className="hstat">
              <div className="hstat__v">{TOUR_META.restDays}</div>
              <div className="hstat__l">giorni di riposo</div>
            </div>
          </div>

          <div className="hero__route">
            <span>Venezia</span><span className="dot">·</span>
            <span>Ferrara</span><span className="dot">·</span>
            <span className="bold">Bologna</span><span className="dot">·</span>
            <span>Apennini</span><span className="dot">·</span>
            <span className="bold">Firenze</span><span className="dot">·</span>
            <span>Chianti</span><span className="dot">·</span>
            <span className="bold">Siena</span><span className="dot">·</span>
            <span>Val d'Orcia</span><span className="dot">·</span>
            <span>Tuscia</span><span className="dot">·</span>
            <span className="bold">Roma</span>
          </div>

          <div className="hero__bottom">
            <div>21 agosto — 2 settembre · MMXXVI</div>
            <div className="hero__bottom-org">Organizzato dai Tedeschi · da Monaco di Baviera</div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="intro">
        <div className="intro__lead">Ciao ragazzi —</div>
        <p className="intro__body">
          Hier ist sie. Dreizehn Tage durch Italien, von der Lagune bis zum Petersdom, mit den Kletterpartien des Giro
          unter den Reifen und einem Aperitivo in jedem Dorf, das den Namen verdient. Diese Seite ist gleichzeitig
          Pitch und Reiseführer: erst überzeugt sie euch mitzukommen, dann begleitet sie uns durch jede Etappe.
        </p>
        <p className="intro__body">
          Strecke ausschließlich auf <em>Asphalt</em> — Gravel hat seinen Charme, aber nicht zwischen Bologna und Rom
          mit Karbonlaufrädern. Übernachtung in Agriturismi mit Pool und Cantina. Essen: lokal, langsam, lang. Bahn
          zurück nach München mit Fahrradabteil — kein Flieger, keine Hektik.
        </p>
        <div className="intro__signoff">— Allora, ci stiamo?</div>
      </section>

      {/* CARTA */}
      <section className="map">
        <div className="map__head">
          <div className="map__eyebrow">§ I — Itinerario</div>
          <h2 className="map__title">La Carta</h2>
          <p className="map__sub">Klick eine Stadt — die Etappe öffnet sich unten.</p>
        </div>
        <div className="map__frame">
          <TourMap activeStage={activeStage} onSelectStage={(n) => { setActiveStage(n); toggle(n); document.getElementById(`tappa-${n}`)?.scrollIntoView({ behavior: "smooth", block: "center" }); }} />
        </div>
      </section>

      {/* TAPPE */}
      <section className="stages">
        <div className="stages__head">
          <div className="stages__eyebrow">§ II — Le Tappe</div>
          <h2 className="stages__title">Tag für Tag</h2>
          <div className="stages__controls">
            <button onClick={expandAll}>tutte aperte</button>
            <span>·</span>
            <button onClick={collapseAll}>tutte chiuse</button>
          </div>
        </div>
        <div className="stages__list">
          {STAGES.map((s) => (
            <div key={s.n} id={`tappa-${s.n}`}>
              <StageCard stage={s} expanded={!!expanded[s.n]} onToggle={() => toggle(s.n)} />
            </div>
          ))}
        </div>
      </section>

      {/* RIPOSO */}
      <section className="rest">
        <div className="rest__head">
          <div className="rest__eyebrow">§ III — Giorni di Riposo</div>
          <h2 className="rest__title">Florenz & Siena</h2>
        </div>
        <div className="rest__grid">
          <div className="rest__card">
            <div className="rest__city">Firenze</div>
            <div className="rest__day">Tag 5 · Mar 25.VIII</div>
            <ul>
              <li><b>09:00</b> — Cupola Brunelleschi (Reservierung Pflicht!)</li>
              <li><b>11:30</b> — Caffè Gilli auf der Piazza della Repubblica</li>
              <li><b>13:00</b> — Mercato Centrale · Lampredotto-Pause</li>
              <li><b>15:00</b> — Uffizien (Skip-the-Line vorbuchen)</li>
              <li><b>18:00</b> — Aperitivo Piazzale Michelangelo bei Sonnenuntergang</li>
              <li><b>20:30</b> — Trattoria Cammillo · Bistecca alla Fiorentina</li>
            </ul>
          </div>
          <div className="rest__card">
            <div className="rest__city">Siena</div>
            <div className="rest__day">Tag 8 · Ven 28.VIII</div>
            <ul>
              <li><b>09:30</b> — Duomo + Libreria Piccolomini</li>
              <li><b>11:00</b> — Torre del Mangia (88 m, 400 Stufen)</li>
              <li><b>12:30</b> — Pranzo · Tre Cristi (Pici-Klassiker)</li>
              <li><b>15:00</b> — Pinacoteca Nazionale</li>
              <li><b>17:00</b> — Spaziergang Fortezza Medicea</li>
              <li><b>20:00</b> — Enoteca I Terzi · Brunello-Verkostung</li>
            </ul>
          </div>
        </div>
      </section>

      {/* COSTI */}
      <section className="costs">
        <div className="costs__head">
          <div className="costs__eyebrow">§ IV — Il Conto</div>
          <h2 className="costs__title">Was kostet der Spaß</h2>
          <p className="costs__sub">pro Person, im Doppelzimmer · ohne Anreise</p>
        </div>
        <div className="costs__list">
          {COSTS.map((c, i) => (
            <div key={i} className="costs__row">
              <span className="costs__label">{c.item}</span>
              <span className="costs__dots"></span>
              <span className="costs__amt">€ {c.amount}</span>
            </div>
          ))}
          <div className="costs__total">
            <span className="costs__label">Totale</span>
            <span className="costs__dots"></span>
            <span className="costs__amt">€ {COSTS_TOTAL.toLocaleString("de-DE")}</span>
          </div>
        </div>
      </section>

      {/* TRENO */}
      <section className="train">
        <div className="train__head">
          <div className="train__eyebrow">§ V — Il Ritorno</div>
          <h2 className="train__title">Mit der Bahn zurück</h2>
        </div>
        <div className="train__card">
          <div className="train__line">
            <div className="train__time">08:35</div>
            <div className="train__sta"><b>Roma Termini</b><span>→ Bologna Centrale · Frecciarossa 9510</span></div>
            <div className="train__dur">3:00 h</div>
          </div>
          <div className="train__line">
            <div className="train__time">12:25</div>
            <div className="train__sta"><b>Bologna Centrale</b><span>→ München Hbf · EC 88 (Verona · Brennero)</span></div>
            <div className="train__dur">7:30 h</div>
          </div>
          <div className="train__line train__line--end">
            <div className="train__time">19:55</div>
            <div className="train__sta"><b>München Hauptbahnhof</b><span>casa</span></div>
            <div className="train__dur">—</div>
          </div>
          <div className="train__notes">
            <div><b>Fahrradticket:</b> Frecciarossa €12 (Reservierung Pflicht, nur 6 Räder pro Zug — sofort buchen!) · EC München €15</div>
            <div><b>Gesamtpreis:</b> ~€145 inkl. Fahrradticket · ~10:45 h reine Fahrtzeit</div>
            <div><b>Rad-Stellplatz:</b> Frecciarossa Wagen 5 oder 6 · EC Wagen 105 (Fahrradabteil)</div>
          </div>
        </div>
      </section>

      {/* OUTRO */}
      <section className="outro">
        <div className="outro__rule">·  ·  ·</div>
        <div className="outro__big">In bocca al lupo</div>
        <div className="outro__small">e che il vento sia sempre alle nostre spalle</div>
        <div className="outro__sig">— Strada del Sud · MMXXVI</div>
      </section>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
