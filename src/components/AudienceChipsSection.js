import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const THEME = '#f4c430';
const CHIP_BG = '#1e1e22';
const CHIP_BG_PUMPED = 'rgba(244, 196, 48, 0.2)';
const CHIP_BORDER = '#3a3a3e';
const TEXT = '#ffffff';
const MUTED = '#a0a0a5';

const SECTION_TITLE = 'And the crowd going crazy is...';
const DEFAULT_HEADING = 'College students & mass fans are pumped';
const DEFAULT_SUBTEXT = 'This is their kind of movie';
const DEFAULT_FOOTER = "Families and OTT fans aren't convinced yet. They want to see reviews first.";

/**
 * Section title outside block. Block: heading, subtext, chips (optional emoji), footer.
 * Pumped chips: #f4c430 border + tinted background.
 */
const AudienceChipsSection = ({
  audienceChips = [],
  heading,
  subtext,
  footer,
}) => {
  const displayHeading = heading ?? DEFAULT_HEADING;
  const displaySubtext = subtext ?? DEFAULT_SUBTEXT;
  const displayFooter = footer ?? DEFAULT_FOOTER;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{SECTION_TITLE}</Text>
      <View style={styles.card}>
        <Text style={styles.heading}>{displayHeading}</Text>
        <Text style={styles.subtext}>{displaySubtext}</Text>
        <View style={styles.chipRow}>
          {audienceChips.map((chip, index) => (
            <View
              key={index}
              style={[
                styles.chip,
                chip.isPumped && styles.chipPumped,
              ]}
            >
              {chip.emoji ? <Text style={styles.chipEmoji}>{chip.emoji}</Text> : null}
              <Text style={[styles.chipText, chip.isPumped && styles.chipTextPumped]}>
                {chip.label}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.footer}>{displayFooter}</Text>
      </View>
    </View>
  );
};

export default AudienceChipsSection;

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
    backgroundColor: '#252529',
    borderRadius: 14,
    padding: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: '800',
    color: TEXT,
    marginBottom: 4,
  },
  subtext: {
    fontSize: 13,
    color: MUTED,
    marginBottom: 14,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: CHIP_BG,
    borderWidth: 1.5,
    borderColor: CHIP_BORDER,
    gap: 6,
  },
  chipPumped: {
    borderColor: THEME,
    backgroundColor: CHIP_BG_PUMPED,
  },
  chipEmoji: {
    fontSize: 16,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: TEXT,
  },
  chipTextPumped: {
    color: THEME,
  },
  footer: {
    fontSize: 12,
    fontStyle: 'italic',
    color: MUTED,
    marginTop: 14,
    lineHeight: 18,
  },
});
