/**
 * Static city-level insights per movie context.
 * Keys: city names. Values: hypeLevel, wantToWatchPercentage, talkCount, trendStatus ('high' | 'low').
 */
export const cityData = {
  Mumbai: {
    hypeLevel: 87,
    wantToWatchPercentage: 82,
    talkCount: 1284,
    trendStatus: 'high',
  },
  Bangalore: {
    hypeLevel: 92,
    wantToWatchPercentage: 78,
    talkCount: 956,
    trendStatus: 'high',
  },
  Delhi: {
    hypeLevel: 78,
    wantToWatchPercentage: 65,
    talkCount: 612,
    trendStatus: 'low',
  },
  Hyderabad: {
    hypeLevel: 89,
    wantToWatchPercentage: 83,
    talkCount: 1198,
    trendStatus: 'high',
  },
};

export const cityList = ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad'];
