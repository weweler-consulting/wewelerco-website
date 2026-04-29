// Map-Komponente: stilisierte Italien-Karte mit Etappen-Markern
const TourMap = ({ activeStage, onSelectStage }) => {
  // Approximative Koordinaten (lat/lng) der Stopps, für Plakat-Zwecke vereinfacht
  // Mapping: lng 9.5 → x=80, lng 13.5 → x=720; lat 45.5 → y=80, lat 41.8 → y=820
  const cities = [
    { n: 1, name: "Venezia", x: 600, y: 130, lng: 12.32, lat: 45.43 },
    { n: 1, name: "Ferrara", x: 480, y: 230, lng: 11.62, lat: 44.83, end: true },
    { n: 2, name: "Bologna", x: 410, y: 290, lng: 11.34, lat: 44.49, end: true },
    { n: 3, name: "Monzuno", x: 400, y: 340, lng: 11.27, lat: 44.27, end: true },
    { n: 4, name: "Firenze", x: 410, y: 430, lng: 11.25, lat: 43.77, end: true, big: true },
    { n: 6, name: "Greve", x: 400, y: 480, lng: 11.31, lat: 43.58, end: true },
    { n: 7, name: "Siena", x: 390, y: 540, lng: 11.33, lat: 43.32, end: true, big: true },
    { n: 9, name: "Pienza", x: 410, y: 610, lng: 11.68, lat: 43.07, end: true },
    { n: 10, name: "Acquapendente", x: 420, y: 660, lng: 11.86, lat: 42.74, end: true },
    { n: 11, name: "Sutri", x: 460, y: 740, lng: 12.22, lat: 42.24, end: true },
    { n: 12, name: "Roma", x: 470, y: 800, lng: 12.50, lat: 41.90, end: true, big: true, final: true },
  ];

  // Pfad durch alle Städte
  const pathD = cities.reduce((acc, c, i) => {
    if (i === 0) return `M ${c.x} ${c.y}`;
    const prev = cities[i - 1];
    // Bezier mit leichter Krümmung
    const cx = (prev.x + c.x) / 2 + (i % 2 === 0 ? 30 : -30);
    const cy = (prev.y + c.y) / 2;
    return `${acc} Q ${cx} ${cy} ${c.x} ${c.y}`;
  }, "");

  return (
    <svg viewBox="0 0 800 900" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <pattern id="paperGrain" patternUnits="userSpaceOnUse" width="4" height="4">
          <rect width="4" height="4" fill="#f4ead5" />
          <circle cx="1" cy="1" r="0.3" fill="#d4c4a0" opacity="0.4" />
          <circle cx="3" cy="2.5" r="0.2" fill="#b8a37a" opacity="0.3" />
        </pattern>
        <filter id="rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" />
          <feDisplacementMap in="SourceGraphic" scale="1.5" />
        </filter>
      </defs>

      {/* Papierhintergrund */}
      <rect width="800" height="900" fill="url(#paperGrain)" />

      {/* Italien-Silhouette stark vereinfacht */}
      <path
        d="M 350 80 Q 380 100 400 140 Q 380 180 360 220 Q 350 260 380 300 Q 420 340 410 400 Q 380 460 360 540 Q 350 620 380 700 Q 420 780 460 830 Q 500 850 530 830 L 540 880 L 460 880 L 420 850 Q 380 820 360 770 Q 340 700 330 620 Q 320 540 340 460 Q 360 380 340 320 Q 320 260 340 200 Q 350 130 350 80 Z"
        fill="#e8d9b8"
        stroke="#8b6f47"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Adria-Linie */}
      <path
        d="M 540 100 Q 580 200 600 320 Q 620 440 600 560 Q 580 680 540 800"
        fill="none"
        stroke="#5a7a8a"
        strokeWidth="0.8"
        strokeDasharray="3,3"
        opacity="0.5"
      />
      <text x="640" y="350" fontSize="16" fill="#5a7a8a" fontStyle="italic" opacity="0.7" letterSpacing="4">M A R E   A D R I A T I C O</text>

      {/* Tyrrhenisches Meer */}
      <text x="160" y="600" fontSize="14" fill="#5a7a8a" fontStyle="italic" opacity="0.6" letterSpacing="3">M A R   T I R R E N O</text>

      {/* Apennin-Schraffur */}
      <g opacity="0.35" stroke="#8b6f47" strokeWidth="0.6" fill="none">
        {Array.from({ length: 14 }).map((_, i) => (
          <path key={i} d={`M ${330 + i * 4} ${280 + i * 30} l 10 -8 l -8 12 l 12 -6`} />
        ))}
      </g>

      {/* Hauptroute */}
      <path d={pathD} fill="none" stroke="#a8341f" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="0" />
      <path d={pathD} fill="none" stroke="#7a1f10" strokeWidth="1" strokeLinecap="round" strokeDasharray="6,4" opacity="0.8" />

      {/* Bahnrückfahrt (gestrichelt nach oben) */}
      <path
        d={`M 470 800 Q 350 600 280 400 Q 230 220 250 60`}
        fill="none"
        stroke="#3a3a3a"
        strokeWidth="1.5"
        strokeDasharray="2,6"
        opacity="0.5"
      />
      <text x="180" y="180" fontSize="12" fill="#3a3a3a" opacity="0.6" fontStyle="italic">il treno torna a Monaco</text>

      {/* Städte */}
      {cities.map((c, i) => {
        const isActive = activeStage && c.n === activeStage;
        const r = c.big ? 9 : 5;
        return (
          <g key={i} style={{ cursor: "pointer" }} onClick={() => onSelectStage && onSelectStage(c.n)}>
            <circle cx={c.x} cy={c.y} r={r + 8} fill="#a8341f" opacity={isActive ? 0.2 : 0} />
            <circle cx={c.x} cy={c.y} r={r} fill={c.final ? "#7a1f10" : "#f4ead5"} stroke="#7a1f10" strokeWidth="2.5" />
            {c.big && <circle cx={c.x} cy={c.y} r={r - 3} fill="#7a1f10" />}
            <text
              x={c.x + r + 8}
              y={c.y + 4}
              fontSize={c.big ? 18 : 13}
              fill="#2a1a0a"
              fontFamily="'DM Serif Display', serif"
              fontWeight={c.big ? 700 : 500}
              style={{ textTransform: "uppercase", letterSpacing: c.big ? "2px" : "1px" }}
            >
              {c.name}
            </text>
          </g>
        );
      })}

      {/* Kompass */}
      <g transform="translate(720, 120)">
        <circle r="32" fill="#f4ead5" stroke="#7a1f10" strokeWidth="1.5" />
        <path d="M 0 -28 L 5 0 L 0 28 L -5 0 Z" fill="#7a1f10" />
        <path d="M -28 0 L 0 -5 L 28 0 L 0 5 Z" fill="#7a1f10" opacity="0.4" />
        <text y="-38" textAnchor="middle" fontSize="11" fill="#7a1f10" fontWeight="700">N</text>
      </g>

      {/* Maßstab */}
      <g transform="translate(60, 850)">
        <line x1="0" y1="0" x2="120" y2="0" stroke="#2a1a0a" strokeWidth="2" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#2a1a0a" strokeWidth="2" />
        <line x1="60" y1="-3" x2="60" y2="3" stroke="#2a1a0a" strokeWidth="1" />
        <line x1="120" y1="-4" x2="120" y2="4" stroke="#2a1a0a" strokeWidth="2" />
        <text x="60" y="20" textAnchor="middle" fontSize="11" fill="#2a1a0a" fontStyle="italic">~ 100 km</text>
      </g>

      {/* Plakat-Titel */}
      <text x="60" y="60" fontSize="28" fill="#7a1f10" fontFamily="'DM Serif Display', serif" fontWeight="700" letterSpacing="3">
        ITINERARIO
      </text>
      <text x="60" y="80" fontSize="11" fill="#7a1f10" letterSpacing="2" opacity="0.7">VENEZIA · BOLOGNA · FIRENZE · SIENA · ROMA</text>
    </svg>
  );
};

window.TourMap = TourMap;
