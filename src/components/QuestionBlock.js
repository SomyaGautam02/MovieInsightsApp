import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';

const THEME = '#f4c430';
const BLOCK_BG = '#1e1e22';
const OPTION_BG = '#252529';
const OPTION_BORDER = '#3a3a3e';
const TEXT = '#ffffff';
const MUTED = '#a0a0a5';
const ACK_GREEN = '#22c55e';

const BORDER_COLORS = {
  blue: '#60a5fa',
  orange: THEME,
  pink: '#d946ef',
};

const GRADIENT_TOP_COLORS = {
  blue: 'rgba(96, 165, 250, 0.14)',
  orange: 'rgba(244, 196, 48, 0.14)',
  pink: 'rgba(217, 70, 239, 0.14)',
};

/**
 * Single question block: question, subtext, points badge, options (single or multi).
 * When answered, shows ack bar (checkmark, line1, line2, +N pts).
 */
const QuestionBlock = ({ questionConfig, savedAnswer, onAnswer }) => {
  const {
    id,
    title,
    question,
    subtext,
    points,
    pointsLabel,
    type,
    options,
    borderVariant,
    ackLine1,
    ackLine2,
    showPointsBadge = true,
  } = questionConfig;

  const [pendingMulti, setPendingMulti] = useState([]);

  const borderColor = BORDER_COLORS[borderVariant] ?? BORDER_COLORS.orange;
  const isAnswered = savedAnswer !== undefined && savedAnswer !== null &&
    (Array.isArray(savedAnswer) ? savedAnswer.length > 0 : true);

  const effectiveMultiSelection = isAnswered ? savedAnswer : pendingMulti;

  const resolveOption = (idOrVal) => {
    if (typeof idOrVal === 'object' && idOrVal?.label) return idOrVal;
    return options.find((o) => o.id === idOrVal);
  };

  const getAckContent = () => {
    if (type === 'single') {
      const opt = resolveOption(savedAnswer);
      const line1 = typeof ackLine1 === 'function' ? ackLine1(opt) : ackLine1;
      return { line1, line2: ackLine2, pts: points };
    }
    const arr = Array.isArray(savedAnswer) ? savedAnswer : [];
    const line1 = typeof ackLine1 === 'function' ? ackLine1(arr, options) : ackLine1;
    return { line1, line2: ackLine2, pts: points * Math.max(0, arr.length) };
  };

  const handleSelectSingle = (optionId) => {
    if (isAnswered) return;
    onAnswer?.(id, optionId, points);
  };

  const handleToggleMulti = (optionId) => {
    if (isAnswered) return;
    setPendingMulti((prev) => {
      const idx = prev.indexOf(optionId);
      if (idx >= 0) return prev.filter((x) => x !== optionId);
      return [...prev, optionId];
    });
  };

  const handleLockMulti = () => {
    if (pendingMulti.length === 0) return;
    onAnswer?.(id, pendingMulti, points * pendingMulti.length);
  };

  const isSelected = (optionId) => {
    if (type === 'single') return savedAnswer === optionId;
    return effectiveMultiSelection.includes(optionId);
  };

  const gradientTopColor = GRADIENT_TOP_COLORS[borderVariant] ?? GRADIENT_TOP_COLORS.orange;

  if (isAnswered) {
    const { line1, line2, pts } = getAckContent();
    return (
      <View style={[styles.block, styles.blockBorder, { borderColor }]}>
        <LinearGradient
          colors={[gradientTopColor, 'transparent']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
          style={styles.blockGradient}
          pointerEvents="none"
        />
        <View style={styles.ackRow}>
          <View style={styles.checkWrap}>
            <Check size={20} color={ACK_GREEN} strokeWidth={3} />
          </View>
          <View style={styles.ackTextWrap}>
            <Text style={styles.ackLine1}>{line1}</Text>
            {line2 ? <Text style={styles.ackLine2}>{line2}</Text> : null}
          </View>
          <Text style={styles.ackPts}>+{pts} pts</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.block, styles.blockBorder, { borderColor }]}>
      <LinearGradient
        colors={[gradientTopColor, 'transparent']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
        style={styles.blockGradient}
        pointerEvents="none"
      />
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <Text style={styles.question}>{question}</Text>
      {subtext ? <Text style={styles.subtext}>{subtext}</Text> : null}
      {showPointsBadge && (
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsBadgeText}>{pointsLabel}</Text>
        </View>
      )}
      {type === 'single' && options.length === 3 ? (
        <View style={styles.optionsRowThree}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={styles.optionBtnThird}
              onPress={() => handleSelectSingle(opt.id)}
              activeOpacity={0.8}
            >
              {opt.emoji ? <Text style={styles.optionEmojiInline}>{opt.emoji}</Text> : null}
              <Text style={styles.optionLabel} numberOfLines={1}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : type === 'single' && options.length === 4 ? (
        <View style={styles.optionsGrid2x2}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={styles.optionBtn}
              onPress={() => handleSelectSingle(opt.id)}
              activeOpacity={0.8}
            >
              {opt.emoji ? <Text style={styles.optionEmojiInline}>{opt.emoji}</Text> : null}
              <Text style={styles.optionLabel} numberOfLines={1}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : type === 'single' && options.length >= 6 ? (
        <View style={styles.optionsGrid3}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={styles.optionBtnSmall}
              onPress={() => handleSelectSingle(opt.id)}
              activeOpacity={0.8}
            >
              {opt.emoji ? <Text style={styles.optionEmoji}>{opt.emoji}</Text> : null}
              <Text style={styles.optionLabel} numberOfLines={1}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : type === 'single' ? (
        <View style={styles.optionsRow}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={styles.optionBtnHorizontal}
              onPress={() => handleSelectSingle(opt.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.optionLabel}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : options.length >= 6 ? (
        <View style={styles.chipGrid3}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={[styles.chip, styles.chipThird, isSelected(opt.id) && styles.chipSelected]}
              onPress={() => handleToggleMulti(opt.id)}
              activeOpacity={0.8}
            >
              <Text style={[styles.chipText, isSelected(opt.id) && styles.chipTextSelected]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.chipWrap}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={[styles.chip, isSelected(opt.id) && styles.chipSelected]}
              onPress={() => handleToggleMulti(opt.id)}
              activeOpacity={0.8}
            >
              <Text style={[styles.chipText, isSelected(opt.id) && styles.chipTextSelected]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {type === 'multi' && !isAnswered && (
        <TouchableOpacity
          style={[styles.submitMulti, pendingMulti.length === 0 && styles.submitMultiDisabled]}
          onPress={handleLockMulti}
          disabled={pendingMulti.length === 0}
          activeOpacity={0.9}
        >
          <Text style={styles.submitMultiText}>Lock in</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QuestionBlock;

const styles = StyleSheet.create({
  block: {
    backgroundColor: BLOCK_BG,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  blockBorder: {
    borderWidth: 0.5,
  },
  blockGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: TEXT,
    marginBottom: 6,
  },
  question: {
    fontSize: 12,
    fontWeight: '600',
    color: TEXT,
    marginBottom: 4,
  },
  subtext: {
    fontSize: 14,
    color: MUTED,
    marginBottom: 12,
  },
  pointsBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(244, 196, 48, 0.2)',
    borderWidth: 1.5,
    borderColor: THEME,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 14,
  },
  pointsBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME,
  },
  optionsRowThree: {
    flexDirection: 'row',
    gap: 10,
  },
  optionBtnThird: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: OPTION_BG,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: OPTION_BORDER,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionBtnHorizontal: {
    backgroundColor: OPTION_BG,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: OPTION_BORDER,
  },
  optionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: TEXT,
  },
  optionsGrid2x2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionsGrid3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionBtnSmall: {
    width: '31%',
    backgroundColor: OPTION_BG,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: OPTION_BORDER,
    alignItems: 'center',
  },
  optionBtn: {
    width: '47%',
    backgroundColor: OPTION_BG,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: OPTION_BORDER,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  optionEmojiInline: {
    fontSize: 18,
    marginLeft: 8,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chipGrid3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chipThird: {
    width: '31%',
    minWidth: 0,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: OPTION_BG,
    borderWidth: 1.5,
    borderColor: OPTION_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: {
    borderColor: THEME,
    backgroundColor: 'rgba(244, 196, 48, 0.15)',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: TEXT,
    textAlign: 'center',
  },
  chipTextSelected: {
    color: THEME,
  },
  submitMulti: {
    marginTop: 14,
    alignSelf: 'flex-start',
    backgroundColor: THEME,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  submitMultiText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  submitMultiDisabled: {
    opacity: 0.5,
  },
  ackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: ACK_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ackTextWrap: {
    flex: 1,
  },
  ackLine1: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT,
  },
  ackLine2: {
    fontSize: 11,
    color: MUTED,
    marginTop: 2,
  },
  ackPts: {
    fontSize: 13,
    fontWeight: '700',
    color: ACK_GREEN,
  },
});
