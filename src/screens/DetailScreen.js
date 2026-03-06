import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import { ChevronLeft, ChevronDown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import resources from '../resources';
import PulseToggle from '../components/PulseToggle';
import CityInsightCard from '../components/CityInsightCard';
import CheckInModal from '../components/CheckInModal';
import {
  setCheckinCompleted,
  getStoredAnswers,
  saveAnswerAndPoints,
} from '../storage/checkinStorage';
import { cityList } from '../data/cityData';
import { getMovieHype } from '../data/movieHype';
import { getMovieConfig } from '../config/movieConfig';
import {
  getQuestionsByPlacement,
  PLACEMENT_ORDER,
} from '../config/checkinQuestions';
import HypeTrainSection from '../components/HypeTrainSection';
import SentimentSection from '../components/SentimentSection';
import HypeTrustGapSection from '../components/HypeTrustGapSection';
import WarningSignsSection from '../components/WarningSignsSection';
import AudienceChipsSection from '../components/AudienceChipsSection';
import CitiesCraziestSection from '../components/CitiesCraziestSection';
import HeatSliderSection from '../components/HeatSliderSection';
import RecoBeeCallSection from '../components/RecoBeeCallSection';
import QuestionBlock from '../components/QuestionBlock';

const BG = '#141418';
const TEXT = '#ffffff';
const MUTED = '#a0a0a5';
const GOLD = '#c9a227';
const THEME = '#f4c430';
const CHIP_BG = '#252529';
const CHIP_ACTIVE_BG = GOLD;
const CHIP_ACTIVE_TEXT = '#1a1a1a';

const DetailScreen = ({ route, navigation }) => {
  const { movie, movieId: paramMovieId } = route.params ?? {};
  const [activeTab, setActiveTab] = useState('Pulse');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [headerCityDropdownOpen, setHeaderCityDropdownOpen] = useState(false);
  const [checkInModalVisible, setCheckInModalVisible] = useState(false);
   const [questionAnswers, setQuestionAnswers] = useState({});

  const movieId = paramMovieId ?? movie?.id ?? 'movie_1';

  useEffect(() => {
    let isMounted = true;
    const loadAnswers = async () => {
      const stored = await getStoredAnswers(movieId);
      if (isMounted) {
        setQuestionAnswers(stored || {});
      }
    };
    loadAnswers();
    return () => {
      isMounted = false;
    };
  }, [movieId]);

  const movieConfig = getMovieConfig(movieId, selectedCity);

  const handleQuestionAnswer = async (questionId, value, pointsToAdd) => {
    setQuestionAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    await saveAnswerAndPoints(movieId, questionId, value, pointsToAdd);
  };

  const renderQuestionsForPlacement = (placementKey) => {
    const questions = getQuestionsByPlacement(placementKey);
    if (!questions.length) return null;
    return questions.map((q) => (
      <QuestionBlock
        key={q.id}
        questionConfig={q}
        savedAnswer={questionAnswers[q.id]}
        onAnswer={handleQuestionAnswer}
      />
    ));
  };

  if (!movie && !movieId) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>{resources.detail.noMovieSelected}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Row 1: Back, Title, City dropdown */}
      <View style={styles.navRow1}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ChevronLeft size={28} color={TEXT} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {movie?.title ?? getMovieHype(movieId).title}
        </Text>
        <View style={styles.headerCityWrap}>
          <Text style={styles.headerCityText}>Mumbai</Text>
        </View>
      </View>

      {/* Row 2: Theatre, OTT, 7d */}
      <View style={styles.navRow2}>
        <View style={styles.chipRow}>
          <View style={[styles.chip, styles.chipActive]}>
            <Text style={[styles.chipText, styles.chipTextActive]}>{resources.detail.theatre}</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{resources.detail.ott}</Text>
          </View>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{resources.detail.timeframe7d}</Text>
        </View>
      </View>

      {/* Pulse / Predictions toggle */}
      <PulseToggle activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      {activeTab === 'Predictions' ? (
        <View style={styles.comingSoonWrap}>
          <Text style={styles.comingSoonText}>{resources.detail.predictionsComingSoon}</Text>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <CityInsightCard
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              movieId={movieId}
            />
            <HypeTrainSection
              velocityConfig={movieConfig.velocityConfig}
              hypeStatus={movieConfig.hypeStatus}
            />
            {renderQuestionsForPlacement('afterHypeTrain')}
            <SentimentSection
              sentimentConfig={movieConfig.sentimentConfig}
              hypeStatus={movieConfig.hypeStatus}
            />
            {renderQuestionsForPlacement('afterSentiment')}
            <HypeTrustGapSection hypeTrust={movieConfig.hypeTrust} />
            <WarningSignsSection warnings={movieConfig.warnings} />
            <CitiesCraziestSection
              citiesCraziest={movieConfig.citiesCraziest}
              footerText={movieConfig.citiesFooterText}
            />
            <AudienceChipsSection
              audienceChips={movieConfig.audienceChips}
              heading={movieConfig.audienceHeading}
              subtext={movieConfig.audienceSubtext}
              footer={movieConfig.audienceFooter}
            />
            {renderQuestionsForPlacement('afterAudienceChips')}
            <HeatSliderSection heatLevel={movieConfig.heatLevel} />
            <RecoBeeCallSection call={movieConfig.call} />
            {renderQuestionsForPlacement('afterRecoBeeCall')}
            <TouchableOpacity
              style={styles.completeCheckInBtnWrap}
              onPress={() => setCheckInModalVisible(true)}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[THEME, '#e5a82a']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.completeCheckInBtn}
              >
                <Text style={styles.completeCheckInBtnText}>
                  Complete Check-in & Earn +20 pts
                </Text>
                <Text style={styles.completeCheckInIcon}>🎯</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>

          <CheckInModal
            visible={checkInModalVisible}
            movieId={movieId}
            onClose={() => setCheckInModalVisible(false)}
            onSubmit={async () => {
              await setCheckinCompleted(movieId);
              setCheckInModalVisible(false);
            }}
          />
        </>
      )}

      {/* Header city dropdown modal */}
      <Modal
        visible={headerCityDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setHeaderCityDropdownOpen(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setHeaderCityDropdownOpen(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={cityList}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalRow}
                  onPress={() => {
                    setSelectedCity(item);
                    setHeaderCityDropdownOpen(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalRowText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingTop: Platform.OS === 'ios' ? 56 : 44,
  },
  navRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  backButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: TEXT,
    textAlign: 'center',
  },
  headerCityWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  headerCityText: {
    fontSize: 14,
    fontWeight: '600',
    color: TEXT,
  },
  navRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: CHIP_BG,
  },
  chipActive: {
    backgroundColor: CHIP_ACTIVE_BG,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: MUTED,
  },
  chipTextActive: {
    color: CHIP_ACTIVE_TEXT,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  completeCheckInBtnWrap: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 14,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: THEME,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: { elevation: 6 },
    }),
  },
  completeCheckInBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  completeCheckInBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  completeCheckInIcon: {
    fontSize: 18,
  },
  comingSoonWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: '600',
    color: MUTED,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BG,
  },
  text: {
    fontSize: 16,
    color: MUTED,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#252529',
    borderRadius: 12,
    minWidth: 200,
    maxHeight: 280,
  },
  modalRow: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2e',
  },
  modalRowText: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT,
  },
});
