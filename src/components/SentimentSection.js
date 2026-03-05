import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getHypeColors } from '../config/theme';

const SECTION_TITLE = 'So how are people actually feeling about it?';
const HEADING_PREFIX = 'The crowd is mostly ';

/**
 * "How are people feeling about it?" section.
 * - Dynamic heading: highest-scored sentiment (e.g. "The crowd is mostly Excited").
 * - Subtext: e.g. "62% are either excited or super hyped" (top two sentiments).
 * - Sentiment bars from config (label, value, emoji); horizontal bar + percentage.
 */
const SentimentSection = ({ sentimentConfig, hypeStatus }) => {
  const colors = getHypeColors(hypeStatus);
  const sorted = [...(sentimentConfig ?? [])].sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
  const top = sorted[0];
  const topTwo = sorted.slice(0, 2);
  const topTwoSum = topTwo.reduce((s, i) => s + (i.value ?? 0), 0);
  const topLabel = top?.label ?? 'Excited';
  const subtext = topTwo.length >= 2
    ? `${topTwoSum}% are either ${topTwo[0].label.toLowerCase()} or ${topTwo[1].label.toLowerCase()}`
    : `${top?.value ?? 0}% ${topLabel.toLowerCase()}`;

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.muted }]}>{SECTION_TITLE}</Text>
      <View style={[styles.card, { backgroundColor: '#252529' }]}>
        <Text style={[styles.heading, { color: colors.text }]}>
          {HEADING_PREFIX}{topLabel}
        </Text>
        <Text style={[styles.subtext, { color: colors.muted }]}>{subtext}</Text>
        {(sentimentConfig ?? []).map((item) => {
          const pct = item.value ?? 0;
          return (
            <View key={item.label} style={styles.row}>
              <View style={styles.topRow}>
                <Text style={styles.emoji}>{item.emoji}</Text>
                <Text style={[styles.label, { color: colors.text }]}>{item.label}</Text>
                <Text style={[styles.pct, { color: colors.text }]}>{pct}%</Text>
              </View>
              <View style={[styles.barTrack, { backgroundColor: colors.track }]}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${pct}%`,
                      backgroundColor: colors.primary,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default SentimentSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 8,
    marginHorizontal: 4,
  },
  card: {
    borderRadius: 14,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtext: {
    fontSize: 14,
    marginBottom: 14,
  },
  row: {
    marginBottom: 10,
    gap: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  emoji: {
    fontSize: 22,
    width: 32,
    textAlign: 'center',
  },
  barTrack: {
    height: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginLeft: 4,
  },
  pct: {
    fontSize: 14,
    fontWeight: '700',
    minWidth: 40,
    textAlign: 'right',
  },
});
