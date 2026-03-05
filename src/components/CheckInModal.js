import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { X, Film, Tv } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const THEME = '#f4c430';
const BG = '#141418';
const CARD_BG = '#252529';
const OPTION_BG = '#1e1e22';
const OPTION_BORDER = '#3a3a3e';
const TEXT = '#ffffff';
const MUTED = '#a0a0a5';
const TOTAL_STEPS = 4;

const STEP_CONFIG = [
  {
    question: 'Likely to watch?',
    subtext: 'Your honest first reaction',
    options: [
      { id: 'definitely', label: 'Definitely', emoji: '🔥' },
      { id: 'maybe', label: 'Maybe', emoji: '🤔' },
      { id: 'no', label: 'No', emoji: '😮' },
    ],
    single: true,
  },
  {
    question: 'Where would you watch?',
    subtext: 'Your preferred platform',
    options: [
      { id: 'theatre', label: 'Theatre', icon: 'Film' },
      { id: 'ott', label: 'OTT', icon: 'Tv' },
      { id: 'not_sure', label: 'Not sure', emoji: '🤷' },
    ],
    single: true,
  },
  {
    question: "What's drawing you in?",
    subtext: 'Select all that apply',
    options: [
      { id: 'story', label: 'Story' },
      { id: 'music', label: 'Music' },
      { id: 'reviews', label: 'Reviews' },
      { id: 'star', label: 'Star' },
      { id: 'director', label: 'Director' },
      { id: 'fomo', label: 'FOMO' },
    ],
    single: false,
  },
  {
    question: 'How confident?',
    subtext: 'About your choice',
    options: [
      { id: 'low', label: 'Low', subtext: 'Just a feeling', emoji: '🤷‍♀️' },
      { id: 'medium', label: 'Medium', subtext: 'Pretty sure', emoji: '🎯' },
      { id: 'high', label: 'High', subtext: 'Very confident', emoji: '💯' },
    ],
    single: true,
  },
];

const CheckInModal = ({ visible, onClose, onSubmit }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const config = STEP_CONFIG[step];
  const isLastStep = step === TOTAL_STEPS - 1;

  const handleOptionSelect = (optionId) => {
    if (config.single) {
      setAnswers((prev) => ({ ...prev, [step]: optionId }));
    }
  };

  const handleOptionSelectMulti = (optionId) => {
    setAnswers((prev) => {
      const current = prev[step] || [];
      const set = new Set(Array.isArray(current) ? current : []);
      if (set.has(optionId)) set.delete(optionId);
      else set.add(optionId);
      return { ...prev, [step]: Array.from(set) };
    });
  };

  const getSelected = (optionId) => {
    const val = answers[step];
    if (config.single) return val === optionId;
    return Array.isArray(val) && val.includes(optionId);
  };

  const canContinue = () => {
    const val = answers[step];
    if (config.single) return val != null;
    return Array.isArray(val) && val.length > 0;
  };

  const handleContinue = () => {
    if (isLastStep) {
      onSubmit?.(answers);
      handleClose();
    } else {
      setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
    }
  };

  const handleClose = () => {
    setStep(0);
    setAnswers({});
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>⚡️ Quick Check-in</Text>
            <TouchableOpacity
              onPress={handleClose}
              hitSlop={12}
              style={styles.closeBtn}
            >
              <X size={22} color={TEXT} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Progress */}
          <View style={styles.progressWrap}>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.progressSegment,
                  i <= step && styles.progressSegmentActive,
                ]}
              />
            ))}
          </View>

          <ScrollView
            style={styles.body}
            contentContainerStyle={styles.bodyContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.question}>{config.question}</Text>
            <Text style={styles.subtext}>{config.subtext}</Text>

            {config.single ? (
              config.options.map((opt) => {
                const selected = getSelected(opt.id);
                return (
                  <TouchableOpacity
                    key={opt.id}
                    style={[styles.optionRow, selected && styles.optionRowActive]}
                    onPress={() => handleOptionSelect(opt.id)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.optionLeft}>
                      <Text
                        style={[
                          styles.optionLabel,
                          selected && styles.optionLabelActive,
                        ]}
                      >
                        {opt.label}
                      </Text>
                      {opt.subtext && (
                        <Text
                          style={[
                            styles.optionSub,
                            selected && styles.optionSubActive,
                          ]}
                        >
                          {opt.subtext}
                        </Text>
                      )}
                    </View>
                    {(opt.emoji || opt.icon) && (
                      <View style={styles.optionRight}>
                        {opt.icon === 'Film' && (
                          <Film size={20} color={selected ? '#1a1a1a' : TEXT} strokeWidth={2} />
                        )}
                        {opt.icon === 'Tv' && (
                          <Tv size={20} color={selected ? '#1a1a1a' : TEXT} strokeWidth={2} />
                        )}
                        {opt.emoji && (
                          <Text style={styles.optionEmoji}>{opt.emoji}</Text>
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={styles.chipWrap}>
                {config.options.map((opt) => {
                  const selected = getSelected(opt.id);
                  return (
                    <TouchableOpacity
                      key={opt.id}
                      style={[
                        styles.chip,
                        selected && styles.chipActive,
                      ]}
                      onPress={() => handleOptionSelectMulti(opt.id)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          selected && styles.chipTextActive,
                        ]}
                      >
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            <TouchableOpacity
              style={styles.continueBtnWrap}
              onPress={handleContinue}
              disabled={!canContinue()}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[THEME, '#e5a82a']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.continueBtn,
                  !canContinue() && styles.continueBtnDisabled,
                ]}
              >
                <Text style={styles.continueBtnText}>
                  {isLastStep ? 'Submit Check-in' : 'Continue'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CheckInModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: CARD_BG,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT,
  },
  closeBtn: {
    padding: 4,
  },
  progressWrap: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: OPTION_BORDER,
  },
  progressSegmentActive: {
    backgroundColor: THEME,
  },
  body: {
    maxHeight: 400,
  },
  bodyContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  question: {
    fontSize: 20,
    fontWeight: '800',
    color: TEXT,
    marginBottom: 6,
  },
  subtext: {
    fontSize: 14,
    color: MUTED,
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: OPTION_BG,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  optionRowActive: {
    backgroundColor: THEME,
    borderColor: THEME,
  },
  optionLeft: {},
  optionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT,
  },
  optionLabelActive: {
    color: '#1a1a1a',
  },
  optionSub: {
    fontSize: 13,
    color: MUTED,
    marginTop: 2,
  },
  optionSubActive: {
    color: 'rgba(0,0,0,0.7)',
  },
  optionRight: {},
  optionEmoji: {
    fontSize: 18,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  chip: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: OPTION_BG,
    borderWidth: 1.5,
    borderColor: OPTION_BORDER,
  },
  chipActive: {
    backgroundColor: THEME,
    borderColor: THEME,
  },
  chipText: {
    fontSize: 15,
    fontWeight: '600',
    color: TEXT,
  },
  chipTextActive: {
    color: '#1a1a1a',
  },
  continueBtnWrap: {
    marginTop: 8,
  },
  continueBtn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
  continueBtnDisabled: {
    opacity: 0.5,
  },
  continueBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
  },
});
