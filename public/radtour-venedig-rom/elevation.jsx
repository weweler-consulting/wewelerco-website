// Höhenprofil-Komponente
const ElevationProfile = ({ data, hm, height = 80 }) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 100;
  const w = 600;
  const h = height;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 8) - 4;
    return [x, y];
  });

  const linePath = points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");
  const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: `${h}px`, display: "block" }}>
      <defs>
        <linearGradient id={`elevGrad${hm}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a8341f" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#a8341f" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#elevGrad${hm})`} />
      <path d={linePath} fill="none" stroke="#7a1f10" strokeWidth="1.8" strokeLinejoin="round" />
      <text x={w - 8} y={14} textAnchor="end" fontSize="9" fill="#7a1f10" fontStyle="italic" opacity="0.7">
        {max} m
      </text>
      <text x={8} y={h - 4} fontSize="9" fill="#7a1f10" fontStyle="italic" opacity="0.7">
        {min} m
      </text>
    </svg>
  );
};

window.ElevationProfile = ElevationProfile;
