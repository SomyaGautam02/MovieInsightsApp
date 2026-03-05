import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { TrendingUp, TrendingDown, ChevronRight, Film } from 'lucide-react-native';
import resources from '../resources';

const CARD_BG = '#252529';
const TEXT_PRIMARY = '#ffffff';
const TEXT_MUTED = '#a0a0a5';
const BUZZ_YELLOW = '#F5C518';
const BUZZ_NUMBER_COLOR = '#f4c430';
const BUZZ_GLOW_COLOR = '#f4c430';
const CITY_TAG_BG = 'rgba(232, 177, 27, 0.22)'; // darker golden-brown for distinct pill tag
const GREEN = '#22c55e';
const RED = '#ef4444';

const formatReleaseDate = (dateStr) => {
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

/**
 * Movie insight card: thumbnail, title, date, Buzz (yellow), Intent % with trend, signals, insight, CTA.
 */
const MovieCard = ({ movie, onPress }) => {
  const {
    title,
    imageUrl,
    releaseDate,
    buzz,
    intentScore,
    trend,
    signalsCount,
    city,
    insightText,
  } = movie;

  const [imageError, setImageError] = useState(false);
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  const trendColor = trend === 'up' ? GREEN : RED;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(movie)}
      activeOpacity={0.8}
    >
      <View style={styles.posterWrap}>
        {!imageError ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.poster}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : null}
        {imageError ? (
          <View style={styles.posterFallback}>
            <Film size={40} color={TEXT_MUTED} strokeWidth={1.5} />
          </View>
        ) : null}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.releaseDate}>{formatReleaseDate(releaseDate)}</Text>
        <View style={styles.metricsRow}>
          <View style={styles.buzzRow}>
            <View style={styles.buzzNumberPill}>
              <Text style={styles.buzzNumber}>{buzz}</Text>
            </View>
            <Text style={styles.buzzLabel}>{resources.movieCard.buzz}</Text>
          </View>
          <View style={styles.intentRow}>
            <Text style={styles.intentNumber}>{intentScore}%</Text>
            <Text style={styles.intentLabel}>{resources.movieCard.intent}</Text>
            <TrendIcon size={14} color={trendColor} strokeWidth={2.5} />
          </View>
        </View>
        <View style={styles.signalsRow}>
          <Text style={styles.signalsLabel}>{resources.movieCard.signalsThisWeek}</Text>
          <Text style={styles.signalsNumber}>{signalsCount.toLocaleString()}</Text>
        </View>
        <View style={styles.insightRow}>
          {city ? (
            <View style={styles.cityChip}>
              <Text style={styles.cityChipText}>{city}</Text>
            </View>
          ) : null}
          <Text style={styles.insight} numberOfLines={1}>
            {insightText}
          </Text>
        </View>
        <View style={styles.ctaRow}>
          <Text style={styles.cta}>{resources.movieCard.viewDeepInsights}</Text>
          <ChevronRight size={16} color={BUZZ_YELLOW} strokeWidth={2.5} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: CARD_BG,
    borderRadius: 12,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    marginBottom: 12,
    padding: 12,
    gap: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },
  posterWrap: {
    width: 80,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
  },
  poster: {
    width: 80,
    height: 120,
    backgroundColor: '#333',
    borderRadius: 12,
  },
  posterFallback: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 80,
    height: 120,
    backgroundColor: '#333',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingVertical: 0,
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: 'space-between',
    minWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },
  releaseDate: {
    fontSize: 12,
    color: TEXT_MUTED,
    marginTop: 2,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 6,
  },
  buzzRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buzzNumberPill: {
    paddingVertical: 2,
    // backgroundColor: 'rgba(244, 196, 48, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buzzNumber: {
    fontSize: 18,
    fontWeight: '700',
    borderRadius: 999,
    color: BUZZ_NUMBER_COLOR,
   },
  buzzLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: BUZZ_YELLOW,
  },
  intentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  intentNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },
  intentLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: TEXT_MUTED,
  },
  signalsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  signalsLabel: {
    fontSize: 12,
    color: TEXT_MUTED,
  },
  signalsNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: TEXT_PRIMARY,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  cityChip: {
    backgroundColor: CITY_TAG_BG,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    alignSelf: 'flex-start',
  },
  cityChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#f4c430',
    letterSpacing: 0.3,
  },
  insight: {
    fontSize: 12,
    color: TEXT_MUTED,
    flex: 1,
    minWidth: 0,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  cta: {
    fontSize: 12,
    fontWeight: '600',
    color: BUZZ_YELLOW,
  },
});
