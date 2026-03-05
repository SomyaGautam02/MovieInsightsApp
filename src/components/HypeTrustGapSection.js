import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const THEME = '#f4c430';
const TRUST_COLOR = '#3b82f6';
const CARD_BG = '#252529';
const TRACK_BG = '#1b1b1f';
const TEXT = '#ffffff';
const MUTED = '#a0a0a5';

const SECTION_TITLE = "But here's the interesting part...";
const CARD_HEADING = "There's a gap between hype and trust";

/**
 * Two parallel progress bars: Hype (#f4c430) and Trust (#3b82f6).
 * When trust < hype, show dynamic subtext from config.
 */
const HypeTrustGapSection = ({ hypeTrust }) => {
  const hype = Math.min(100, Math.max(0, hypeTrust?.hypePercent ?? 0));
  const trust = Math.min(100, Math.max(0, hypeTrust?.trustPercent ?? 0));
  const showSubtext = trust < hype && hypeTrust?.hypeTrustSubtext;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{SECTION_TITLE}</Text>
      <View style={styles.card}>
        <Text style={styles.heading}>{CARD_HEADING}</Text>
        <Text style={styles.lede}>
          People are excited, but some are skeptical about the story.
        </Text>
        <View style={styles.barRow}>
          <View style={styles.labelRow}>
            <Text style={styles.barLabel}>Hype</Text>
            <Text style={[styles.percent, { color: THEME }]}>{hype}%</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, styles.fillHype, { width: `${hype}%` }]} />
          </View>
        </View>
        <View style={styles.barRow}>
          <View style={styles.labelRow}>
            <Text style={styles.barLabel}>Trust</Text>
            <Text style={[styles.percent, { color: TRUST_COLOR }]}>{trust}%</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, styles.fillTrust, { width: `${trust}%` }]} />
          </View>
        </View>
        {showSubtext && (
          <Text style={styles.subtext}>{hypeTrust.hypeTrustSubtext}</Text>
        )}
      </View>
    </View>
  );
};

export default HypeTrustGapSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontStyle: 'italic',
    color: MUTED,
    marginBottom: 8,
    marginHorizontal: 4,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 14,
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: '800',
    color: TEXT,
    marginBottom: 4,
  },
  lede: {
    fontSize: 13,
    color: MUTED,
    marginBottom: 14,
  },
  barRow: {
    marginBottom: 12,
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  barLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: TEXT,
    minWidth: 44,
  },
  track: {
    flex: 1,
    height: 10,
    borderRadius: 8,
    backgroundColor: TRACK_BG,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 8,
  },
  fillHype: { backgroundColor: THEME },
  fillTrust: { backgroundColor: TRUST_COLOR },
  percent: {
    fontSize: 14,
    fontWeight: '700',
    minWidth: 36,
    textAlign: 'right',
  },
  subtext: {
    fontSize: 13,
    color: MUTED,
    fontStyle: 'italic',
    marginTop: 4,
    lineHeight: 18,
  },
});
