export const movieHype = {
  // High-voltage commercial film: big city opening, social buzz everywhere.
  movie_1: {
    id: 'movie_1',
    title: 'The Wolf of Wall Street',
    case: 'Best Case',
    boostPercent: 88,
    boostText: '+18 boost',
    status: 'On Fire',
    trend: 'up',
    insightText:
      "Everyone's talking about it — memeable moments, quotes and finance jokes are flooding socials.",
  },
  // Fan-favourite franchise film: strong core, growing family interest.
  movie_2: {
    id: 'movie_2',
    title: 'Star Wars',
    case: 'Mid Case',
    boostPercent: 64,
    boostText: '+9 boost',
    status: 'Steady',
    trend: 'up',
    insightText:
      'Core fans are locked in; families and casual viewers are warming up after the latest TV spots.',
  },
  // Brainy sci‑fi: niche excitement, but mass audience still unsure.
  movie_3: {
    id: 'movie_3',
    title: 'Inception',
    case: 'Worst Case',
    boostPercent: 28,
    boostText: '+3 boost',
    status: 'Cold/Slow',
    trend: 'down',
    insightText:
      'Conversation is fragmented — people are curious but the marketing is leaving many confused for now.',
  },
};

export function getMovieHype(id) {
  return movieHype[id] || movieHype.movie_1;
}
