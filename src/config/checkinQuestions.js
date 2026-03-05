/**
 * In-page check-in questions: order, placement key, points, options, ack text.
 * Placement = after which section (used to order in CityInsightCard).
 */

export const QUESTION_IDS = {
  OPENING_WEEKEND: 'opening_weekend',
  FEEL_ABOUT_RELEASE: 'feel_about_release',
  PULLING_IN: 'pulling_in',
  FAVOURITE_TYPE: 'favourite_type',
  WATCHING_WITH: 'watching_with',
  BEST_PART_TRAILER: 'best_part_trailer',
};

/** Order of placement keys = order questions appear on the page. */
export const PLACEMENT_ORDER = [
  'afterHypeTrain',      // Q: Will this beat opening weekend expectations?
  'afterSentiment',      // Q: How do you feel about this release?
  'afterAudienceChips',  // Q: What's pulling you in?
  'afterRecoBeeCall',    // Q: What's your favourite type?
  'afterFavouriteType',  // Q: Who are you watching with?
  'afterWatchingWith',   // Q: Best part of the trailer?
];

export const CHECKIN_QUESTIONS = [
  {
    id: QUESTION_IDS.OPENING_WEEKEND,
    placement: 'afterHypeTrain',
    title: 'Quick question for you',
    question: "Will this beat opening weekend expectations?",
    subtext: null,
    points: 15,
    pointsLabel: '+15 pts for your take',
    type: 'single',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
      { id: 'close_call', label: 'Close Call' },
    ],
    borderVariant: 'orange',
    showPointsBadge: true,
    ackLine1: (answer) => `Your take: ${answer?.label ?? answer}`,
    ackLine2: 'Locked in!',
  },
  {
    id: QUESTION_IDS.FEEL_ABOUT_RELEASE,
    placement: 'afterSentiment',
    title: 'What about you?',
    question: 'How do you feel about this release?',
    subtext: null,
    points: 10,
    pointsLabel: '+10 pts',
    type: 'single',
    options: [
      { id: 'excited', label: 'Excited', emoji: '🤗' },
      { id: 'curious', label: 'Curious', emoji: '🧐' },
      { id: 'not_sure', label: 'Not Sure', emoji: '😕' },
    ],
    borderVariant: 'blue',
    showPointsBadge: true,
    ackLine1: (answer) => `You feel: ${answer?.emoji ?? ''} ${answer?.label ?? answer}`.trim(),
    ackLine2: 'Got it!',
  },
  {
    id: QUESTION_IDS.PULLING_IN,
    placement: 'afterAudienceChips',
    question: "What's pulling you in?",
    subtext: 'Pick what excites you most (select all that apply)',
    points: 5,
    pointsLabel: '+5 pts each',
    type: 'multi',
    options: [
      { id: 'action', label: 'Action' },
      { id: 'cast', label: 'Cast' },
      { id: 'story', label: 'Story' },
      { id: 'vfx', label: 'VFX' },
      { id: 'music', label: 'Music' },
      { id: 'director', label: 'Director' },
    ],
    borderVariant: 'orange',
    showPointsBadge: true,
    ackLine1: (answers, opts) => {
      const labels = (answers || []).map((id) => opts?.find((o) => o.id === id)?.label ?? id).filter(Boolean);
      return labels.length ? `What excites you: ${labels.join(', ')}` : 'What excites you';
    },
    ackLine2: 'Nice picks!',
  },
  {
    id: QUESTION_IDS.FAVOURITE_TYPE,
    placement: 'afterRecoBeeCall',
    question: "Quick - what's your favourite type?",
    subtext: 'Just curious 😊',
    points: 5,
    pointsLabel: '+5 pts',
    type: 'single',
    options: [
      { id: 'action', label: 'Action', emoji: '💥' },
      { id: 'comedy', label: 'Comedy', emoji: '😂' },
      { id: 'drama', label: 'Drama', emoji: '🎭' },
      { id: 'horror', label: 'Horror', emoji: '😱' },
      { id: 'scifi', label: 'Sci-Fi', emoji: '🚀' },
      { id: 'romance', label: 'Romance', emoji: '💕' },
    ],
    borderVariant: 'pink',
    showPointsBadge: false,
    ackLine1: (answer) => answer ? `${answer.label} fan! Nice ${answer.emoji ?? ''}`.trim() : 'Nice!',
    ackLine2: null,
  },
  {
    id: QUESTION_IDS.WATCHING_WITH,
    placement: 'afterFavouriteType',
    question: 'Who are you watching with?',
    subtext: 'Your movie crew',
    points: 5,
    pointsLabel: '+5 pts',
    type: 'single',
    options: [
      { id: 'solo', label: 'Solo', emoji: '🧘' },
      { id: 'friends', label: 'Friends', emoji: '👯' },
      { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
      { id: 'partner', label: 'Partner', emoji: '💖' },
    ],
    borderVariant: 'blue',
    showPointsBadge: false,
    ackLine1: (answer) => answer ? `${answer.label} vibes ${answer.emoji ?? '🍿'}`.trim() : 'Got it!',
    ackLine2: null,
  },
  {
    id: QUESTION_IDS.BEST_PART_TRAILER,
    placement: 'afterWatchingWith',
    question: 'Best part of the trailer?',
    subtext: 'What made you go "woah"',
    points: 5,
    pointsLabel: '+5 pts',
    type: 'single',
    options: [
      { id: 'action_scenes', label: 'Action' },
      { id: 'dialogue', label: 'Dialogue' },
      { id: 'music', label: 'Music' },
      { id: 'star_power', label: 'Star Power' },
      { id: 'vfx', label: 'VFX' },
      { id: 'story_tease', label: 'Story Tease' },
    ],
    borderVariant: 'orange',
    showPointsBadge: false,
    ackLine1: (answer) => answer ? `${answer.label} 🔥` : 'Nice!',
    ackLine2: null,
  },
];

export function getQuestionsByPlacement(placement) {
  return CHECKIN_QUESTIONS.filter((q) => q.placement === placement);
}

export function getQuestionById(id) {
  return CHECKIN_QUESTIONS.find((q) => q.id === id);
}
