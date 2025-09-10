/* eslint-disable no-bitwise */
export const TYPE_CHIP_STYLES = {
  // Engineering / Releases
  feature: { bg: '#0366d6', color: '#ffffff' },
  'bug-fix': { bg: '#d73a49', color: '#ffffff' },
  hotfix: { bg: '#b31d28', color: '#ffffff' },
  deploy: { bg: '#6f42c1', color: '#ffffff' },
  rollback: { bg: '#e36209', color: '#ffffff' },
  'db-migration': { bg: '#005cc5', color: '#ffffff' },
  'code-review': { bg: '#6a737d', color: '#ffffff' },
  performance: { bg: '#2188ff', color: '#ffffff' },

  // Product / Research
  roadmap: { bg: '#0a5e2a', color: '#ffffff' },
  'product-spec': { bg: '#2cbe4e', color: '#ffffff' },
  'user-research': { bg: '#00a3bf', color: '#ffffff' },
  testing: { bg: '#f1e05a', color: '#000000' },

  // Design / Creative
  design: { bg: '#ff7b72', color: '#ffffff' },
  ux: { bg: '#e99695', color: '#ffffff' },
  branding: { bg: '#d876e3', color: '#ffffff' },
  'asset-production': { bg: '#fbca04', color: '#000000' },

  // Content / Marketing
  'content-creation': { bg: '#6f42c1', color: '#ffffff' },
  copywriting: { bg: '#0366d6', color: '#ffffff' },
  seo: { bg: '#28a745', color: '#ffffff' },
  social: { bg: '#1da1f2', color: '#ffffff' },
  'email-campaign': { bg: '#0052cc', color: '#ffffff' },
  'paid-ads': { bg: '#ff8b00', color: '#ffffff' },
  'marketing-campaign': { bg: '#fb6a2a', color: '#ffffff' },
  'growth-experiment': { bg: '#20c997', color: '#ffffff' },

  // Customer / Sales / Support
  'customer-support': { bg: '#6a737d', color: '#ffffff' },
  onboarding: { bg: '#2f80ed', color: '#ffffff' },
  'sales-outreach': { bg: '#ffd33d', color: '#000000' },
  partnerships: { bg: '#6f42c1', color: '#ffffff' },
  'incident-response': { bg: '#d73a49', color: '#ffffff' },

  // Ops / Infra / Security / Legal / Finance / HR
  monitoring: { bg: '#ffb84d', color: '#000000' },
  backup: { bg: '#6f42c1', color: '#ffffff' },
  security: { bg: '#24292e', color: '#ffffff' },
  'config-change': { bg: '#0366d6', color: '#ffffff' },
  automation: { bg: '#0a66c2', color: '#ffffff' },
  legal: { bg: '#8b5cf6', color: '#ffffff' },
  finance: { bg: '#0f766e', color: '#ffffff' },
  hr: { bg: '#ef4444', color: '#ffffff' },
  meeting: { bg: '#94a3b8', color: '#000000' },
  training: { bg: '#0ea5a4', color: '#ffffff' },

  // New
  'child-joined': { bg: '#2b9348', color: '#ffffff' },
  'seasonal-report': { bg: '#005f73', color: '#ffffff' },
};

export const getChipStyle = (type) =>
  TYPE_CHIP_STYLES[type] || { bg: '#6a737d', color: '#ffffff' };

// --------- Helpers: convert hex -> rgba and create very pale, low-saturation chip styles
export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;
  const bigint = parseInt(full, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}
function hexToRgba(hex, alpha = 1) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Create a very pale background + faint border and readable text for small chips
export function getChipSxFromBase(baseHex, opts = {}) {
  const bgAlpha = typeof opts.bgAlpha === 'number' ? opts.bgAlpha : 0.06; // 0.04 - 0.12 recommended
  const borderAlpha =
    typeof opts.borderAlpha === 'number' ? opts.borderAlpha : 0.14;
  const text = opts.forceTextColor ?? '#0f172a'; // prefer dark text for pale backgrounds

  return {
    backgroundColor: hexToRgba(baseHex, bgAlpha),
    color: text,
    border: `1px solid ${hexToRgba(baseHex, borderAlpha)}`,
    fontWeight: 200,
    height: 24,
    fontSize: '0.72rem',
    ml: 0.5,
  };
}
