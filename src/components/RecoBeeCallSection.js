import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CARD_BG = '#0D1410';
const BORDER_GREEN = '#34D399';
const BORDER_RED = '#ef4444';
const PREFIX_GREEN = '#34D399';
const PREFIX_RED = '#ef4444';
const VERDICT_GOLD = '#FFC107';
const VERDICT_RED = '#f87171';
const MUTED = '#A9A9A9';
const LIGHT_TEXT = '#F0F0F0';

const CONTEXT = 'If the movie released today';
const SECTION_LABEL = "RecoBee's call:";
const DISCLAIMER = "But a lot can change before release. Music response and advance bookings will tell the real story.";

/**
 * RecoBee's call: green for HIT, red for FLOP. Progress bars elsewhere stay theme gold.
 */
const RecoBeeCallSection = ({ call = 'It would be a HIT' }) => {
  const isHit = /hit/i.test(call);
  const match = String(call).match(/\b(HIT|FLOP)\b/i);
  const verdict = match ? match[1].toUpperCase() : (isHit ? 'HIT' : 'FLOP');
  const isFlop = verdict === 'FLOP';

  const gradientColors = isFlop
    ? ['#1A1B18', '#110D0D']
    : ['#101F16', '#07140D'];

  return (
    <View style={styles.section}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.cardBase, isFlop && styles.cardBaseFlop]}
      >
        <Text style={styles.context}>{CONTEXT}</Text>
        <Text style={styles.sectionLabel}>{SECTION_LABEL}</Text>
        <Text style={styles.callLine}>
          <Text style={[styles.callPrefix, isFlop && styles.callPrefixFlop]}>It would be a </Text>
          <Text style={[styles.callVerdict, isFlop && styles.callVerdictFlop]}>{verdict} ✨</Text>
        </Text>
        <Text style={styles.disclaimer}>{DISCLAIMER}</Text>
      </LinearGradient>
    </View>
  );
};

export default RecoBeeCallSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 18,
    marginHorizontal: 16,
  },
  cardBase: {
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: BORDER_GREEN,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: CARD_BG,
  },
  cardBaseFlop: {
    borderColor: BORDER_RED,
  },
  context: {
    fontSize: 14,
    color: MUTED,
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 16,
    color: LIGHT_TEXT,
    marginBottom: 14,
  },
  callLine: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 16,
  },
  callPrefix: {
    color: PREFIX_GREEN,
  },
  callPrefixFlop: {
    color: PREFIX_RED,
  },
  callVerdict: {
    color: VERDICT_GOLD,
  },
  callVerdictFlop: {
    color: VERDICT_RED,
  },
  disclaimer: {
    fontSize: 14,
    color: MUTED,
    fontStyle: 'italic',
    lineHeight: 22,
  },
});
