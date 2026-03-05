import { movies } from '../data/movies';

export const getInsightsData = () => Promise.resolve([...movies]);
