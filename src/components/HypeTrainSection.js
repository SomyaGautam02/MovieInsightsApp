import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Flame } from 'lucide-react-native';
import { getHypeColors } from '../config/theme';

const SECTION_TITLE = "And the hype train isn't slowing down...";
const RING_SIZE = 72;
const STROKE = 6;
const RADIUS = (RING_SIZE - STROKE) / 2;
const CENTER = RING_SIZE / 2;

/**
 * Circular progress ring (rounded, filling). Progress 0–100 from velocityConfig.
 * Center: Flame icon. Right: status text + percent increase + footer.
 */
const HypeTrainSection = ({ velocityConfig, hypeStatus }) => {
  const colors = getHypeColors(hypeStatus);
  const percent = Math.min(100, Math.max(0, velocityConfig?.progressPercent ?? 0));
  const circumference = 2 * Math.PI * RADIUS;
  const filled = (percent / 100) * circumference;
  const gap = circumference - filled;

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.muted }]}>{SECTION_TITLE}</Text>
      <View style={[styles.card, { backgroundColor: '#252529' }]}>
        <Text style={[styles.statusText, { color: colors.text }]}>
          {velocityConfig?.statusText ?? "It's heating up fast"}
        </Text>
        <Text style={[styles.percentLabel, { color: colors.muted }]}>
          {velocityConfig?.percentLabel ?? '+12% more people want tickets after the teaser release'}
        </Text>
        <View style={styles.content}>
          <View style={styles.ringWrap}>
            <Svg width={RING_SIZE} height={RING_SIZE} style={styles.svg}>
              <Circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                stroke={colors.track}
                strokeWidth={STROKE}
                fill="none"
                strokeLinecap="round"
              />
              <Circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                stroke={colors.primary}
                strokeWidth={STROKE}
                fill="none"
                strokeDasharray={`${filled} ${gap}`}
                strokeLinecap="round"
                transform={`rotate(-90 ${CENTER} ${CENTER})`}
                origin={`${CENTER}, ${CENTER}`}
              />
            </Svg>
            <View style={styles.ringCenter}>
              <Flame size={28} color={colors.primary} strokeWidth={2} />
            </View>
          </View>
          <View style={styles.textBlock}>
            <View style={styles.badgeRow}>
              <Text style={styles.badgeEmoji}>🔥</Text>
              <Text style={[styles.badgeText, { color: colors.text }]}>
                {velocityConfig?.statusBadge ?? 'On Fire'}
              </Text>
            </View>
            <Text style={[styles.footer, { color: colors.muted }]}>
              {velocityConfig?.footerText ?? "At this rate, opening weekend could be massive"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HypeTrainSection;

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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  ringWrap: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  ringCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  percentLabel: {
    fontSize: 13,
    marginBottom: 14,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  badgeEmoji: {
    fontSize: 20,
  },
  badgeText: {
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    fontSize: 13,
    lineHeight: 18,
  },
});
