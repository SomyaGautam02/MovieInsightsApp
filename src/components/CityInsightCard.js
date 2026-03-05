import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus, Flame, Clock } from 'lucide-react-native';
import { cityData, cityList } from '../data/cityData';
import { getMovieHype } from '../data/movieHype';

const CARD_BG = '#252529';
const GOLD = '#c9a227';
const GOLD_MUTED = 'rgba(201, 162, 39, 0.6)';
const TEXT = '#ffffff';
const MUTED = '#a0a0a5';
const GREEN = '#22c55e';
const RED = '#ef4444';
const YELLOW_FLAT = '#e5b020';

const WaveSvg = () => (
  <Svg width="100%" height="80" viewBox="0 0 300 80" style={styles.waveSvg} preserveAspectRatio="none">
    <Path
      d="M0,40 Q75,10 150,40 T300,40"
      stroke={GOLD_MUTED}
      strokeWidth="2"
      fill="none"
      opacity={0.8}
    />
    <Path
      d="M0,55 Q75,25 150,55 T300,55"
      stroke={GOLD_MUTED}
      strokeWidth="1.5"
      fill="none"
      opacity={0.5}
    />
  </Svg>
);

const CityInsightCard = ({ selectedCity, onCityChange, movieId = 'movie_1' }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const city = selectedCity || 'Mumbai';

  const data = cityData[city] || cityData.Mumbai;
  const isHighHype = data.trendStatus === 'high';
  const title = isHighHype ? 'The city is going crazy' : 'The city is staying calm';
  const subtitle = isHighHype
    ? `${data.talkCount.toLocaleString()} people are talking about this movie. And it's growing every hour.`
    : `${data.talkCount.toLocaleString()} people are talking about this movie.`;

  const TrendIcon = isHighHype ? TrendingUp : (data.wantToWatchPercentage < 60 ? TrendingDown : Minus);
  const trendColor = isHighHype ? GREEN : (data.wantToWatchPercentage < 60 ? RED : YELLOW_FLAT);

  // Movie-specific hype/velocity data
  const movie = getMovieHype(movieId);
  const hypePct = movie.boostPercent ?? 0;
  const hypeColor = hypePct >= 80 ? GOLD : (hypePct >= 40 ? YELLOW_FLAT : '#6b7280');
  const showTrendingBadge = hypePct > 80;
  const StatusIcon = movie.status === 'On Fire' ? Flame : Clock;

  const handleSelectCity = (newCity) => {
    onCityChange?.(newCity);
    setDropdownOpen(false);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.citySelector}
        onPress={() => setDropdownOpen((v) => !v)}
        activeOpacity={0.8}
      >
        <View style={styles.liveRow}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live from</Text>
        </View>
        <View style={styles.cityRow}>
          <Text style={styles.cityName}>{city}</Text>
          {dropdownOpen ? (
            <ChevronUp size={18} color={GOLD} strokeWidth={2.5} />
          ) : (
            <ChevronDown size={18} color={GOLD} strokeWidth={2.5} />
          )}
        </View>
      </TouchableOpacity>

      {dropdownOpen ? (
        <View style={styles.dropdown}>
          <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
            {cityList.map((cityName, index) => {
              const d = cityData[cityName];
              const up = d.trendStatus === 'high';
              return (
                <TouchableOpacity
                  key={cityName}
                  style={[styles.dropdownRow, index === cityList.length - 1 && styles.dropdownRowLast]}
                  onPress={() => handleSelectCity(cityName)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dropdownCity}>{cityName}</Text>
                  <Text style={styles.dropdownValue}>{d.hypeLevel}</Text>
                  {up ? (
                    <TrendingUp size={14} color={GREEN} strokeWidth={2.5} />
                  ) : (
                    <TrendingDown size={14} color={RED} strokeWidth={2.5} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : null}

      <Text style={styles.rightNow}>Right now in {city}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.talkCount}>{subtitle}</Text>

      <View style={styles.metricsWrap}>
        <View style={styles.waveBg}>
          <WaveSvg />
        </View>
        <View style={styles.metricsRow}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{data.wantToWatchPercentage}%</Text>
            <Text style={styles.metricLabel}>want to watch</Text>
          </View>
          <View style={styles.metric}>
            <View style={styles.hypeRow}>
              <Text style={styles.metricValue}>{data.hypeLevel}</Text>
              <TrendIcon size={20} color={trendColor} strokeWidth={2.5} style={styles.trendIcon} />
            </View>
            <Text style={styles.metricLabel}>hype level</Text>
          </View>
        </View>
      </View>

      <Text style={styles.cta}>But what's driving all this excitement?</Text>
      
      {/* Hype Boosts / Velocity */}
      <View style={styles.hypeSection}>
        <Text style={styles.sectionTitle}>What everyone got hyped</Text>

        <View style={styles.hypeRowMain}>
          <View style={[styles.velocityRing, { borderColor: hypeColor }]}>
            <StatusIcon size={22} color={hypeColor} />
          </View>
          <View style={styles.hypeDetails}>
            <View style={styles.hypeBoostRow}>
              <Text style={[styles.boostText, { color: hypeColor }]}>{movie.boostText}</Text>
              {showTrendingBadge ? (
                <View style={[styles.badge, { backgroundColor: hypeColor }]}>
                  <Flame size={12} color="#111" />
                  <Text style={styles.badgeText}>Trending</Text>
                </View>
              ) : null}
            </View>

            <View style={styles.hypeBarTrack}>
              <View style={[styles.hypeBarFill, { width: `${hypePct}%`, backgroundColor: hypeColor }]} />
            </View>
            <Text style={styles.insightText}>{movie.insightText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CityInsightCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: { elevation: 8 },
    }),
  },
  citySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: GOLD,
  },
  liveText: {
    fontSize: 14,
    color: GOLD,
    fontWeight: '500',
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 8,
  },
  cityName: {
    fontSize: 14,
    fontWeight: '700',
    color: GOLD,
  },
  dropdown: {
    backgroundColor: '#1e1e22',
    borderRadius: 10,
    marginBottom: 12,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#2a2a2e',
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2e',
  },
  dropdownRowLast: {
    borderBottomWidth: 0,
  },
  dropdownCity: {
    fontSize: 15,
    fontWeight: '600',
    color: TEXT,
  },
  dropdownValue: {
    fontSize: 15,
    fontWeight: '600',
    color: TEXT,
  },
  rightNow: {
    fontSize: 12,
    color: MUTED,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: TEXT,
    marginBottom: 8,
  },
  talkCount: {
    fontSize: 13,
    color: MUTED,
    lineHeight: 20,
    marginBottom: 16,
  },
  metricsWrap: {
    position: 'relative',
    minHeight: 100,
    marginBottom: 12,
  },
  waveBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    opacity: 0.9,
  },
  waveSvg: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 24,
    position: 'relative',
    zIndex: 1,
  },
  metric: {
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '800',
    color: GOLD,
  },
  metricLabel: {
    fontSize: 12,
    color: MUTED,
    marginTop: 2,
  },
  hypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trendIcon: {
    marginLeft: 4,
  },
  cta: {
    fontSize: 13,
    color: MUTED,
    fontStyle: 'italic',
  },
  hypeSection: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT,
    marginBottom: 10,
  },
  hypeRowMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  velocityRing: {
    width: 54,
    height: 54,
    borderRadius: 28,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hypeDetails: {
    flex: 1,
  },
  hypeBoostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  boostText: {
    fontSize: 16,
    fontWeight: '800',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 14,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111',
  },
  hypeBarTrack: {
    height: 10,
    backgroundColor: '#1b1b1f',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  hypeBarFill: {
    height: '100%',
    borderRadius: 8,
  },
  insightText: {
    fontSize: 13,
    color: MUTED,
  },
});
