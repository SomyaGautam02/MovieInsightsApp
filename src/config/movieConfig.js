/**
 * Central movie configuration for the Detail Deep-Dive.
 * Drives hype drivers, velocity, sentiment, and styling (hypeStatus → Yellow/Grey).
 * Supports best/mid/worst case states per movie.
 */

// Hype status: 'high' => Yellow for active/high, 'low' => Grey for low/inactive
const HYPE_HIGH = 'high';
const HYPE_LOW = 'low';

/** Default hype drivers: category label + boost value. Max boost = 100% width. */
const defaultHypeConfig = [
  { label: 'Trailer', boost: 18 },
  { label: 'Reviews', boost: 9 },
  { label: 'Song', boost: 7 },
  { label: 'Reel', boost: 4 },
  { label: 'Interviews', boost: 3 },
];

/** Default velocity (hype train): progress 0–100, status text, percent increase, footer. */
const defaultVelocityConfig = {
  progressPercent: 78,
  statusText: "It's heating up fast",
  percentIncrease: 12,
  percentLabel: '+12% more people want tickets after the teaser release',
  footerText: "At this rate, opening weekend could be massive",
  statusBadge: 'On Fire',
};

/** Sentiment: label, value (0–100), emoji. Used for bars and dynamic heading. */
const defaultSentimentConfig = [
  { label: 'Excited', value: 38, emoji: '😍' },
  { label: 'Super Hyped', value: 24, emoji: '🔥' },
  { label: 'Curious', value: 22, emoji: '🧐' },
  { label: 'Not Sure', value: 12, emoji: '😮' },
  { label: 'Not Interested', value: 4, emoji: '💤' },
];

/** Excitement section: header subtext and footer from config. */
const defaultExcitementMeta = {
  headerSubtext: "The trailer dropped and people went wild",
  footerText: "The trailer got 5M+ views in 24 hours. That's huge.",
};

/** Hype vs Trust: hypePercent, trustPercent (0–100). Subtext when trust < hype. */
const defaultHypeTrust = {
  hypePercent: 78,
  trustPercent: 65,
  hypeTrustSubtext: 'People are skeptical about the story',
};

/** Warning signs: title + subtext. Rendered with TriangleAlert icon. */
const defaultWarnings = [
  { title: 'Mixed early reviews', subtext: 'Critics are divided on pacing' },
  { title: 'Trailer drop timing', subtext: 'Released late in the campaign' },
];

/** Cities going craziest: city name + percentage. Rank 1 = ⚡️, rank 2 = 🔥 (from config). */
const defaultCitiesCraziest = [
  { city: 'Mumbai', percentage: 92 },
  { city: 'Hyderabad', percentage: 85 },
  { city: 'Bangalore', percentage: 78 },
  { city: 'Delhi', percentage: 62 },
];

const defaultCitiesFooter = 'Tech cities are more hyped. Family audiences in smaller cities are still deciding.';

/** Audience chips: label + isPumped + optional emoji. */
const defaultAudienceChips = [
  { label: 'College', isPumped: true, emoji: '🎓' },
  { label: 'Mass Fans', isPumped: true, emoji: '🔥' },
  { label: 'Female Urban', isPumped: true, emoji: '💃' },
  { label: 'Families', isPumped: false, emoji: '👨‍👩‍👧‍👦' },
  { label: 'Cinephiles', isPumped: false, emoji: '🎬' },
  { label: 'OTT Loyalists', isPumped: false, emoji: '💻' },
];
const defaultAudienceHeading = 'College students & mass fans are pumped';
const defaultAudienceSubtext = 'This is their kind of movie';
const defaultAudienceFooter = "Families and OTT fans aren't convinced yet. They want to see reviews first.";

/** Heat level 0–100 for slider thumb position. */
const defaultHeatLevel = 72;

/** RecoBee final call: "It would be a HIT" or "It would be a FLOP". */
const defaultCall = 'It would be a HIT';

/**
 * Per-movie overrides. Keys: movie id (string). Values: partial config overrides.
 * case: 'Best Case' | 'Mid Case' | 'Worst Case'
 */
const movieOverrides = {
  '1': {
    case: 'Best Case',
    hypeStatus: HYPE_HIGH,
    hypeConfig: defaultHypeConfig,
    excitementMeta: defaultExcitementMeta,
    velocityConfig: defaultVelocityConfig,
    sentimentConfig: defaultSentimentConfig,
    hypeTrust: defaultHypeTrust,
    warnings: defaultWarnings,
    citiesCraziest: defaultCitiesCraziest,
    audienceChips: defaultAudienceChips,
    heatLevel: defaultHeatLevel,
    call: defaultCall,
  },
  movie_1: {
    case: 'Best Case',
    hypeStatus: HYPE_HIGH,
    hypeConfig: defaultHypeConfig,
    excitementMeta: defaultExcitementMeta,
    velocityConfig: defaultVelocityConfig,
    sentimentConfig: defaultSentimentConfig,
    hypeTrust: defaultHypeTrust,
    warnings: defaultWarnings,
    citiesCraziest: defaultCitiesCraziest,
    audienceChips: defaultAudienceChips,
    heatLevel: defaultHeatLevel,
    call: defaultCall,
  },
  '2': {
    case: 'Mid Case',
    hypeStatus: HYPE_HIGH,
    hypeConfig: [
      { label: 'Reviews', boost: 12 },
      { label: 'Trailer', boost: 8 },
      { label: 'Song', boost: 5 },
      { label: 'Reel', boost: 3 },
      { label: 'Interviews', boost: 2 },
    ],
    excitementMeta: {
      headerSubtext: "Reviews are in and the word is good",
      footerText: "Critics are praising the performances.",
    },
    velocityConfig: {
      progressPercent: 55,
      statusText: "Steady interest",
      percentIncrease: 5,
      percentLabel: '+5% more people want tickets this week',
      footerText: "Steady growth — room to grow with promos.",
      statusBadge: 'Steady',
    },
    sentimentConfig: [
      { label: 'Curious', value: 35, emoji: '🧐' },
      { label: 'Excited', value: 28, emoji: '😍' },
      { label: 'Super Hyped', value: 18, emoji: '🔥' },
      { label: 'Not Sure', value: 14, emoji: '😮' },
      { label: 'Not Interested', value: 5, emoji: '💤' },
    ],
    hypeTrust: { hypePercent: 62, trustPercent: 58, hypeTrustSubtext: 'People are skeptical about the story' },
    warnings: [
      { title: 'Moderate buzz', subtext: 'Interest is steady but not viral' },
    ],
    citiesCraziest: [
      { city: 'Bangalore', percentage: 88 },
      { city: 'Mumbai', percentage: 75 },
      { city: 'Hyderabad', percentage: 68 },
      { city: 'Delhi', percentage: 55 },
    ],
    audienceChips: [
      { label: 'Youth', isPumped: true },
      { label: 'Families', isPumped: false },
      { label: 'Critics', isPumped: false },
    ],
    heatLevel: 48,
    call: 'It would be a HIT',
  },
  movie_2: {
    case: 'Mid Case',
    hypeStatus: HYPE_HIGH,
    hypeConfig: [
      { label: 'Reviews', boost: 12 },
      { label: 'Trailer', boost: 8 },
      { label: 'Song', boost: 5 },
      { label: 'Reel', boost: 3 },
      { label: 'Interviews', boost: 2 },
    ],
    excitementMeta: {
      headerSubtext: "Reviews are in and the word is good",
      footerText: "Critics are praising the performances.",
    },
    velocityConfig: {
      progressPercent: 55,
      statusText: "Steady interest",
      percentIncrease: 5,
      percentLabel: '+5% more people want tickets this week',
      footerText: "Steady growth — room to grow with promos.",
      statusBadge: 'Steady',
    },
    sentimentConfig: [
      { label: 'Curious', value: 35, emoji: '🧐' },
      { label: 'Excited', value: 28, emoji: '😍' },
      { label: 'Super Hyped', value: 18, emoji: '🔥' },
      { label: 'Not Sure', value: 14, emoji: '😮' },
      { label: 'Not Interested', value: 5, emoji: '💤' },
    ],
    hypeTrust: { hypePercent: 62, trustPercent: 58, hypeTrustSubtext: 'People are skeptical about the story' },
    warnings: [
      { title: 'Moderate buzz', subtext: 'Interest is steady but not viral' },
    ],
    citiesCraziest: [
      { city: 'Bangalore', percentage: 88 },
      { city: 'Mumbai', percentage: 75 },
      { city: 'Hyderabad', percentage: 68 },
      { city: 'Delhi', percentage: 55 },
    ],
    audienceChips: [
      { label: 'Youth', isPumped: true },
      { label: 'Families', isPumped: false },
      { label: 'Critics', isPumped: false },
    ],
    heatLevel: 48,
    call: 'It would be a HIT',
  },
  '3': {
    case: 'Worst Case',
    hypeStatus: HYPE_LOW,
    hypeConfig: [
      { label: 'Interviews', boost: 4 },
      { label: 'Reel', boost: 3 },
      { label: 'Song', boost: 2 },
      { label: 'Reviews', boost: 2 },
      { label: 'Trailer', boost: 1 },
    ],
    excitementMeta: {
      headerSubtext: "Limited buzz so far",
      footerText: "Early signals are weak; consider paid amplification.",
    },
    velocityConfig: {
      progressPercent: 12,
      statusText: "Cooling off",
      percentIncrease: -3,
      percentLabel: '-3% interest after last drop',
      footerText: "Limited buzz — consider new content drops.",
      statusBadge: 'Cold',
    },
    sentimentConfig: [
      { label: 'Not Sure', value: 40, emoji: '😮' },
      { label: 'Not Interested', value: 28, emoji: '💤' },
      { label: 'Curious', value: 20, emoji: '🧐' },
      { label: 'Excited', value: 8, emoji: '😍' },
      { label: 'Super Hyped', value: 4, emoji: '🔥' },
    ],
    hypeTrust: { hypePercent: 45, trustPercent: 38, hypeTrustSubtext: 'People are skeptical about the story' },
    warnings: [
      { title: 'Weak trailer response', subtext: 'Low engagement on social' },
      { title: 'Limited pre-release buzz', subtext: 'Few signals from target cities' },
    ],
    citiesCraziest: [
      { city: 'Delhi', percentage: 55 },
      { city: 'Mumbai', percentage: 42 },
      { city: 'Bangalore', percentage: 38 },
      { city: 'Hyderabad', percentage: 35 },
    ],
    audienceChips: [
      { label: 'Niche Fans', isPumped: false },
      { label: 'Families', isPumped: false },
      { label: 'Critics', isPumped: false },
    ],
    heatLevel: 22,
    call: 'It would be a FLOP',
  },
  movie_3: {
    case: 'Worst Case',
    hypeStatus: HYPE_LOW,
    hypeConfig: [
      { label: 'Interviews', boost: 4 },
      { label: 'Reel', boost: 3 },
      { label: 'Song', boost: 2 },
      { label: 'Reviews', boost: 2 },
      { label: 'Trailer', boost: 1 },
    ],
    excitementMeta: {
      headerSubtext: "Limited buzz so far",
      footerText: "Early signals are weak; consider paid amplification.",
    },
    velocityConfig: {
      progressPercent: 12,
      statusText: "Cooling off",
      percentIncrease: -3,
      percentLabel: '-3% interest after last drop',
      footerText: "Limited buzz — consider new content drops.",
      statusBadge: 'Cold',
    },
    sentimentConfig: [
      { label: 'Not Sure', value: 40, emoji: '😮' },
      { label: 'Not Interested', value: 28, emoji: '💤' },
      { label: 'Curious', value: 20, emoji: '🧐' },
      { label: 'Excited', value: 8, emoji: '😍' },
      { label: 'Super Hyped', value: 4, emoji: '🔥' },
    ],
    hypeTrust: { hypePercent: 45, trustPercent: 38, hypeTrustSubtext: 'People are skeptical about the story' },
    warnings: [
      { title: 'Weak trailer response', subtext: 'Low engagement on social' },
      { title: 'Limited pre-release buzz', subtext: 'Few signals from target cities' },
    ],
    citiesCraziest: [
      { city: 'Delhi', percentage: 55 },
      { city: 'Mumbai', percentage: 42 },
      { city: 'Bangalore', percentage: 38 },
      { city: 'Hyderabad', percentage: 35 },
    ],
    audienceChips: [
      { label: 'Niche Fans', isPumped: false },
      { label: 'Families', isPumped: false },
      { label: 'Critics', isPumped: false },
    ],
    heatLevel: 22,
    call: 'It would be a FLOP',
  },
};

/**
 * Get full config for a movie (and optional city for future per-city metrics).
 * @param {string} movieId - e.g. '1', '2', 'movie_1'
 * @param {string} [city] - optional city for city-specific overrides
 * @returns Merged config with hypeConfig, velocityConfig, sentimentConfig, excitementMeta, hypeStatus, case
 */
export function getMovieConfig(movieId, city) {
  const id = String(movieId || '1');
  const overrides = movieOverrides[id] || movieOverrides.movie_1 || movieOverrides['1'];
  return {
    case: overrides.case ?? 'Best Case',
    hypeStatus: overrides.hypeStatus ?? HYPE_HIGH,
    hypeConfig: overrides.hypeConfig ?? defaultHypeConfig,
    excitementMeta: overrides.excitementMeta ?? defaultExcitementMeta,
    velocityConfig: overrides.velocityConfig ?? defaultVelocityConfig,
    sentimentConfig: overrides.sentimentConfig ?? defaultSentimentConfig,
    hypeTrust: overrides.hypeTrust ?? defaultHypeTrust,
    warnings: overrides.warnings ?? defaultWarnings,
    citiesCraziest: overrides.citiesCraziest ?? defaultCitiesCraziest,
    citiesFooterText: overrides.citiesFooterText ?? defaultCitiesFooter,
    audienceChips: overrides.audienceChips ?? defaultAudienceChips,
    audienceHeading: overrides.audienceHeading ?? defaultAudienceHeading,
    audienceSubtext: overrides.audienceSubtext ?? defaultAudienceSubtext,
    audienceFooter: overrides.audienceFooter ?? defaultAudienceFooter,
    heatLevel: overrides.heatLevel ?? defaultHeatLevel,
    call: overrides.call ?? defaultCall,
  };
}

export { HYPE_HIGH, HYPE_LOW };
