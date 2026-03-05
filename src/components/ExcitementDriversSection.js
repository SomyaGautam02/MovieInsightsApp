import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';
import { getHypeColors } from '../config/theme';

const SECTION_TITLE = "But what's driving all this excitement?";
const HEADER_TITLE = "Here's what got everyone hyped";

/**
 * "What's driving all this excitement?" section.
 * - Header: highest-performing category with 🔥 Trending badge (lucide Flame).
 * - Relative progress bars: max value = 100% width, others proportional from hypeConfig.
 * - Footer: descriptive text from config.
 */
const ExcitementDriversSection = ({ hypeConfig, excitementMeta, hypeStatus }) => {
  const colors = getHypeColors(hypeStatus);
  const maxBoost = Math.max(...hypeConfig.map((item) => item.boost), 1);
  const topItem = hypeConfig.reduce((best, cur) => (cur.boost > (best?.boost ?? -1) ? cur : best), null);

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.muted }]}>{SECTION_TITLE}</Text>
      <View style={[styles.card, { backgroundColor: '#252529' }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{HEADER_TITLE}</Text>
        <Text style={[styles.headerSubtext, { color: colors.muted }]}>
          {excitementMeta?.headerSubtext ?? ''}
        </Text>
        {hypeConfig.map((item) => {
          const isTop = topItem && item.label === topItem.label;
          const fillPercent = (item.boost / maxBoost) * 100;
          return (
            <View key={item.label} style={styles.row}>
              <View style={styles.labelRow}>
                <Text style={[styles.label, { color: colors.text }]}>{item.label}</Text>
                {isTop && (
                  <View style={styles.trendingBadge}>
                    <Flame size={12} color="#22c55e" strokeWidth={2.5} />
                    <Text style={styles.trendingText}>Trending</Text>
                  </View>
                )}
              </View>
              <View style={styles.barAndValueRow}>
                <View style={[styles.barTrack, { backgroundColor: colors.track }]}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${fillPercent}%`,
                        backgroundColor: colors.primary,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.boostValue, { color: colors.primary }]}>
                  +{item.boost} boost
                </Text>
              </View>
            </View>
          );
        })}
        <Text style={[styles.footer, { color: colors.muted }]}>
          {excitementMeta?.footerText ?? ''}
        </Text>
      </View>
    </View>
  );
};

export default ExcitementDriversSection;

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
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  headerSubtext: {
    fontSize: 13,
    marginBottom: 14,
  },
  row: {
    marginBottom: 10,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#22c55e',
  },
  barAndValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  barTrack: {
    flex: 1,
    height: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 8,
  },
  boostValue: {
    fontSize: 12,
    fontWeight: '700',
    minWidth: 64,
    textAlign: 'right',
  },
  footer: {
    fontSize: 13,
    marginTop: 12,
    lineHeight: 18,
  },
});
