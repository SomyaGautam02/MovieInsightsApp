import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = '@recobee_';
const KEY_ANSWERS = (movieId) => `${PREFIX}answers_${movieId}`;
const KEY_POINTS = `${PREFIX}points`;
const KEY_CHECKIN_DONE = (movieId) => `${PREFIX}checkin_done_${movieId}`;

/**
 * Get stored answers for a movie. Returns { questionId: value } where value is string or string[].
 */
export async function getStoredAnswers(movieId) {
  try {
    const raw = await AsyncStorage.getItem(KEY_ANSWERS(movieId));
    return raw != null ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Save one question's answer and add points. Merges with existing answers.
 */
export async function saveAnswerAndPoints(movieId, questionId, value, pointsToAdd) {
  try {
    const key = KEY_ANSWERS(movieId);
    const existing = await getStoredAnswers(movieId);
    const next = { ...existing, [questionId]: value };
    await AsyncStorage.setItem(key, JSON.stringify(next));
    if (pointsToAdd > 0) {
      const total = await getTotalPoints();
      await AsyncStorage.setItem(KEY_POINTS, String(total + pointsToAdd));
    }
    return next;
  } catch (e) {
    console.warn('checkinStorage saveAnswerAndPoints', e);
    try {
      return await getStoredAnswers(movieId);
    } catch {
      return {};
    }
  }
}

/**
 * Total points (all questions + check-in bonus).
 */
export async function getTotalPoints() {
  try {
    const raw = await AsyncStorage.getItem(KEY_POINTS);
    const n = parseInt(raw, 10);
    return isNaN(n) ? 0 : n;
  } catch {
    return 0;
  }
}

/**
 * Mark check-in modal as completed for this movie and add +20 pts.
 */
export async function setCheckinCompleted(movieId) {
  try {
    await AsyncStorage.setItem(KEY_CHECKIN_DONE(movieId), '1');
    const total = await getTotalPoints();
    await AsyncStorage.setItem(KEY_POINTS, String(total + 20));
  } catch (e) {
    console.warn('checkinStorage setCheckinCompleted', e);
  }
}

/**
 * Whether user completed the full check-in modal for this movie.
 */
export async function isCheckinCompleted(movieId) {
  try {
    const v = await AsyncStorage.getItem(KEY_CHECKIN_DONE(movieId));
    return v === '1';
  } catch {
    return false;
  }
}

/**
 * Clear all in-page question answers. Call on app launch so answers persist until app is closed.
 */
export async function clearAllInPageAnswers() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const answerKeys = keys.filter((k) => k.startsWith(PREFIX) && k.includes('answers_'));
    if (answerKeys.length > 0) {
      await AsyncStorage.multiRemove(answerKeys);
    }
  } catch (e) {
    console.warn('checkinStorage clearAllInPageAnswers', e);
  }
}
