import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TriangleAlert } from 'lucide-react-native';

const THEME = '#f4c430';
const ORANGE_DARK = '#f97316';
const TEXT = '#ffffff';
const MUTED = '#a0a0a5';
const GRADIENT_START = '#2a1508';
const GRADIENT_END = '#3b2010';

const SECTION_TITLE = 'And there are some warning signs too...';
const BLOCK_HEADING = 'A few things to watch out for';
const BLOCK_SUBTITLE = 'These could impact the opening';

/**
 * Gradient block with orange heading and list: bold orange title + italic subtext per item.
 */
const WarningSignsSection = ({ warnings = [] }) => {
  if (warnings.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{SECTION_TITLE}</Text>
      <LinearGradient
        colors={[GRADIENT_START, GRADIENT_END]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBlock}
      >
        <View style={styles.headerRow}>
          <TriangleAlert size={18} color={THEME} strokeWidth={2.5} style={styles.icon} />
          <Text style={styles.blockHeading}>{BLOCK_HEADING}</Text>
        </View>
        <Text style={styles.blockSubtitle}>{BLOCK_SUBTITLE}</Text>
        {warnings.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.bulletDot}>{'\u2022'}</Text>
            <View style={styles.bulletTextWrap}>
              <Text style={styles.bulletTitle}>{item.title}</Text>
              <Text style={styles.bulletSubtext}>{item.subtext}</Text>
            </View>
          </View>
        ))}
      </LinearGradient>
    </View>
  );
};

export default WarningSignsSection;

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
  gradientBlock: {
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: ORANGE_DARK,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  icon: {
    marginTop: 2,
  },
  blockHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME,
  },
  blockSubtitle: {
    fontSize: 13,
    color: TEXT,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 6,
  },
  bulletDot: {
    fontSize: 14,
    color: ORANGE_DARK,
    marginTop: 2,
  },
  bulletTextWrap: {
    flex: 1,
  },
  bulletTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME,
    marginBottom: 2,
  },
  bulletSubtext: {
    fontSize: 12,
    color: MUTED,
    lineHeight: 18,
  },
});
