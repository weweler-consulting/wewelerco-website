// Etappen-Karte
const StageCard = ({ stage, expanded, onToggle }) => {
  const s = stage;
  const isRest = s.rest;
  const isTrain = s.train;

  return (
    <article className={`stage ${expanded ? "stage--open" : ""} ${isRest ? "stage--rest" : ""} ${isTrain ? "stage--train" : ""} ${s.queen ? "stage--queen" : ""}`}>
      <header className="stage__header" onClick={onToggle}>
        <div className="stage__num">
          <span className="stage__num-label">Tappa</span>
          <span className="stage__num-val">{String(s.n).padStart(2, "0")}</span>
        </div>
        <div className="stage__route">
          <div className="stage__date">{s.date}</div>
          <h3 className="stage__title">
            <span>{s.from}</span>
            <span className="stage__arrow">→</span>
            <span>{s.to}</span>
          </h3>
          <div className="stage__profile">{s.profile}{s.queen && " · TAPPA REGINA"}</div>
        </div>
        <div className="stage__stats">
          {!isRest && !isTrain && (
            <>
              <div className="stat"><span className="stat__v">{s.km}</span><span className="stat__u">km</span></div>
              <div className="stat"><span className="stat__v">{s.hm}</span><span className="stat__u">hm ↑</span></div>
              <div className="stat stat--equiv"><span className="stat__v">{s.equiv}</span><span className="stat__u">equiv.</span></div>
            </>
          )}
          {isRest && <div className="stat stat--big"><span className="stat__v">RIPOSO</span></div>}
          {isTrain && <div className="stat stat--big"><span className="stat__v">TRENO</span></div>}
        </div>
        <div className="stage__chev">{expanded ? "−" : "+"}</div>
      </header>

      {expanded && (
        <div className="stage__body">
          <p className="stage__note">{s.note}</p>

          {!isRest && !isTrain && s.elevation && (
            <div className="stage__elev">
              <div className="stage__elev-label">
                <span>Profilo altimetrico</span>
                {s.climb && <span className="stage__climb">↗ {s.climb.name} · {s.climb.length} · {s.climb.grade}</span>}
              </div>
              <ElevationProfile data={s.elevation} hm={s.hm} />
            </div>
          )}

          <div className="stage__grid">
            {!isRest && !isTrain && (
              <div className="stage__col">
                <div className="stage__col-label">Strada</div>
                <div className="kv"><span>Asfalto</span><span>{s.asphalt}</span></div>
                <div className="kv"><span>Tracciato</span><span>{s.surface}</span></div>
              </div>
            )}

            <div className="stage__col">
              <div className="stage__col-label">{isTrain ? "Itinerario treno" : "Punti notevoli"}</div>
              <ul className="hl-list">
                {s.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>

            {!isTrain && (
              <div className="stage__col">
                <div className="stage__col-label">Notte</div>
                <div className="lodging">
                  <div className="lodging__name">{s.sleep.name}</div>
                  <div className="lodging__type">{s.sleep.type}</div>
                  <div className="lodging__area">{s.sleep.area}</div>
                  {s.sleep.vibe !== "—" && <div className="lodging__vibe">{s.sleep.vibe}</div>}
                  {s.sleep.price !== "—" && <div className="lodging__price">{s.sleep.price}</div>}
                </div>
              </div>
            )}

            {!isTrain && s.dinner && (
              <div className="stage__col">
                <div className="stage__col-label">Cena</div>
                <div className="lodging">
                  <div className="lodging__name">{s.dinner.name}</div>
                  <div className="lodging__type">{s.dinner.cuisine}</div>
                  {s.dinner.alt && <div className="lodging__area">{s.dinner.alt}</div>}
                  <div className="lodging__price">{s.dinner.stars}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

window.StageCard = StageCard;
