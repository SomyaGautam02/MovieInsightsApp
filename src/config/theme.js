/**
 * Theme colors. Progress bars use gold everywhere; only RecoBee's call uses red for FLOP.
 */
export const COLORS = {
  highHype: '#e5b020',
  highHypeGold: '#c9a227',
  lowHype: '#6b7280',
  trackBg: '#1b1b1f',
  cardBg: '#252529',
  text: '#ffffff',
  muted: '#a0a0a5',
  trendingBadge: '#22c55e',
};

export function getHypeColors() {
  return {
    primary: COLORS.highHype,
    track: COLORS.trackBg,
    text: COLORS.text,
    muted: COLORS.muted,
  };
}
