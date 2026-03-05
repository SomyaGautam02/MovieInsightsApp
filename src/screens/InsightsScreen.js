import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Search, ChevronDown } from 'lucide-react-native';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import { getInsightsData } from '../api/movieService';
import resources from '../resources';

const STAGGER_MS = 70;
const SLIDE_DURATION = 380;
const SLIDE_FROM = 80;

const AnimatedMovieCard = ({ movie, index, onPress, animationKey }) => {
  const translateY = useRef(new Animated.Value(SLIDE_FROM)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animationKey === 0) return;
    translateY.setValue(SLIDE_FROM);
    opacity.setValue(0);
    const delay = index * STAGGER_MS;
    const t = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: SLIDE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: SLIDE_DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
    return () => clearTimeout(t);
  }, [animationKey, index]);

  return (
    <Animated.View
      style={[
        styles.animatedCardWrap,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <MovieCard movie={movie} onPress={onPress} />
    </Animated.View>
  );
};

const TIME_TABS = [
  { key: 'week', label: resources.insights.filters.week, days: 7 },
  { key: 'month', label: resources.insights.filters.month, days: 30 },
  { key: 'next60', label: resources.insights.filters.next60, days: 60 },
];

const SCREEN_BG = '#141418';
const CARD_BG = '#252529';
const INPUT_BG = '#1e1e22';
const TEXT_PRIMARY = '#ffffff';
const TEXT_MUTED = '#a0a0a5';
const TAB_INACTIVE_BG = '#252529';
const TAB_ACTIVE_YELLOW = '#F5C518';
const TAB_ACTIVE_TEXT = '#1a1a1a';

const getReferenceDate = () => new Date('2026-03-01');

const isDateInRange = (releaseDateStr, startDate, numDays) => {
  const release = new Date(releaseDateStr);
  const end = new Date(startDate);
  end.setDate(end.getDate() + numDays);
  return release >= startDate && release <= end;
};

const InsightsScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTimeTab, setActiveTimeTab] = useState('next60');
  const [animationKey, setAnimationKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setAnimationKey((k) => k + 1);
    }, [])
  );

  useEffect(() => {
    getInsightsData()
      .then((data) => setMovies(data))
      .finally(() => setLoading(false));
  }, []);

  const refDate = useMemo(() => getReferenceDate(), []);

  const filteredMovies = useMemo(() => {
    const days = TIME_TABS.find((t) => t.key === activeTimeTab)?.days ?? 60;
    return movies.filter((movie) => {
      const inRange = isDateInRange(movie.releaseDate, refDate, days);
      const matchesSearch =
        !searchQuery.trim() ||
        movie.title.toLowerCase().includes(searchQuery.trim().toLowerCase());
      return inRange && matchesSearch;
    });
  }, [movies, searchQuery, activeTimeTab, refDate]);

  const handleMoviePress = (movie) => {
    navigation.navigate('Detail', { movie });
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.searchRow}>
        <View style={styles.searchWrap}>
          <Search size={20} color={TEXT_MUTED} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={resources.insights.searchPlaceholder}
            placeholderTextColor={TEXT_MUTED}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      <Text style={styles.sectionTitle}>{resources.insights.sectionTitle}</Text>
      <View style={styles.chipsRow}>
        {TIME_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.chip,
              activeTimeTab === tab.key && styles.chipActive,
            ]}
            onPress={() => setActiveTimeTab(tab.key)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.chipText,
                activeTimeTab === tab.key && styles.chipTextActive,
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={styles.genreChip}>
          <Text style={styles.genreLabel}>{resources.insights.filters.genre}</Text>
          <ChevronDown size={14} color={TEXT_MUTED} />
        </View>
      </View>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={TAB_ACTIVE_YELLOW} />
        </View>
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <AnimatedMovieCard
              movie={item}
              index={index}
              onPress={handleMoviePress}
              animationKey={animationKey}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>{resources.insights.emptyList}</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default InsightsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  searchRow: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: INPUT_BG,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2a2a2e',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: TEXT_PRIMARY,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 6,
    paddingBottom: 16,
    alignItems: 'stretch',
  },
  chip: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: TAB_INACTIVE_BG,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
  },
  chipActive: {
    backgroundColor: TAB_ACTIVE_YELLOW,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '500',
    color: TEXT_MUTED,
  },
  chipTextActive: {
    color: TAB_ACTIVE_TEXT,
    fontWeight: '600',
  },
  genreChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: TAB_INACTIVE_BG,
    borderWidth: 1,
    borderColor: '#2a2a2e',
    flexShrink: 0,
  },
  genreLabel: {
    fontSize: 11,
    color: TEXT_MUTED,
  },
  animatedCardWrap: {},
  listContent: {
    paddingBottom: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: TEXT_MUTED,
  },
});
