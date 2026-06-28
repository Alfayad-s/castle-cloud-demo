const categoryStyles: Record<string, { from: string; to: string; emoji: string }> = {
  Binding: { from: "#475569", to: "#94a3b8", emoji: "🧱" },
  Structural: { from: "#1d4ed8", to: "#60a5fa", emoji: "🔩" },
  Aggregate: { from: "#b45309", to: "#fbbf24", emoji: "⛰️" },
  Masonry: { from: "#c2410c", to: "#fb923c", emoji: "🧱" },
  Finishing: { from: "#7c3aed", to: "#c4b5fd", emoji: "🎨" },
  Woodwork: { from: "#92400e", to: "#d97706", emoji: "🪵" },
  MEP: { from: "#0e7490", to: "#22d3ee", emoji: "⚡" },
  Plumbing: { from: "#0369a1", to: "#38bdf8", emoji: "🔧" },
};

const defaultStyle = { from: "#334155", to: "#64748b", emoji: "📦" };

export function getMaterialImageStyle(category: string) {
  return categoryStyles[category] ?? defaultStyle;
}

export function getMaterialImageAlt(material: { name: string; category: string }) {
  return `${material.name} — ${material.category}`;
}
