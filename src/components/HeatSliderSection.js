import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const THEME = '#f4c430';
const TEXT = '#ffffff';
const MUTED = '#a0a0a5';
const COLD = '#3b82f6';
const RED = '#ef4444';

const SECTION_TITLE = 'The temperature is rising';
const SUBTITLE = "From cold to hot, here's where we're at";
const FOOTER = "We're in the hot zone. If this keeps up, opening weekend could surprise everyone.";

/**
 * Heat slider: LinearGradient (Blue -> #f4c430 -> Red). Fixed markers: Cold, Warm, Hot, Explosive.
 * White thumb positioned by heatLevel (0-100). blockVariant='temp' uses distinct block bg.
 */
const HeatSliderSection = ({ heatLevel = 50 }) => {
  const value = Math.min(100, Math.max(0, Number(heatLevel) || 0));
  const thumbLeftPercent = value;
  const activeIndex = value < 25 ? 0 : value < 50 ? 1 : value < 80 ? 2 : 3;

  const stages = [
    { label: 'Cold', emoji: '❄️' },
    { label: 'Warm', emoji: '🌤️' },
    { label: 'Hot', emoji: '🔥' },
    { label: 'Explosive', emoji: '🚀' },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{SECTION_TITLE}</Text>
      <Text style={styles.subtitle}>{SUBTITLE}</Text>
      <View style={styles.card}>
        <View style={styles.markers}>
          {stages.map((item, index) => (
            <View key={item.label} style={styles.marker}>
              <Text
                style={[
                  styles.markerEmoji,
                  index === activeIndex ? styles.markerEmojiActive : styles.markerEmojiMuted,
                ]}
              >
                {item.emoji}
              </Text>
              <Text
                style={[
                  styles.markerText,
                  index === activeIndex && styles.markerTextActive,
                ]}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.sliderWrap}>
          <LinearGradient
            colors={[COLD, THEME, RED]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
          <View
            style={[
              styles.thumb,
              { left: `${thumbLeftPercent}%` },
            ]}
          />
        </View>
        <Text style={styles.footer}>{FOOTER}</Text>
      </View>
    </View>
  );
};

export default HeatSliderSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: TEXT,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: MUTED,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#252529',
    borderRadius: 12,
    padding: 16,
  },
  markers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 0,
  },
  marker: {
    alignItems: 'center',
    gap: 4,
  },
  markerEmoji: {
    fontSize: 26,
  },
  markerEmojiActive: {
    opacity: 1,
  },
  markerEmojiMuted: {
    opacity: 0.4,
  },
  markerText: {
    fontSize: 12,
    fontWeight: '600',
    color: MUTED,
  },
  markerTextActive: {
    color: THEME,
  },
  sliderWrap: {
    height: 14,
    borderRadius: 7,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 7,
  },
  thumb: {
    position: 'absolute',
    top: 1,
    width: 16,
    height: 16,
    marginLeft: -8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: RED,
  },
  footer: {
    fontSize: 13,
    color: MUTED,
    fontStyle: 'italic',
    marginTop: 12,
    lineHeight: 18,
  },
});
