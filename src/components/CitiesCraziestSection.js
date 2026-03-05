import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const THEME = '#f4c430';
const TRACK_BG = '#1b1b1f';
const TEXT = '#ffffff';
const MUTED = '#a0a0a5';

const SECTION_TITLE = 'So which cities are going the craziest?';
const DEFAULT_FOOTER = 'Tech cities are more hyped. Family audiences in smaller cities are still deciding.';

/**
 * "{TopCity} is leading the pack", "X and Y are close behind", city name + progress bar + % on right, footer italic.
 */
const CitiesCraziestSection = ({ citiesCraziest = [], footerText }) => {
  const maxPct = Math.max(...citiesCraziest.map((c) => c.percentage), 1);
  const leading = citiesCraziest[0];
  const closeBehind = citiesCraziest.slice(1, 3).map((c) => c.city).join(' and ');
  const footer = footerText || DEFAULT_FOOTER;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{SECTION_TITLE}</Text>
      <View style={styles.card}>
        {leading && (
          <Text style={styles.leadingLine}>{leading.city} is leading the pack</Text>
        )}
        {closeBehind && (
          <Text style={styles.closeBehindLine}>{closeBehind} {citiesCraziest.slice(1, 3).length > 1 ? 'are' : 'is'} close behind</Text>
        )}
        {citiesCraziest.map((item, index) => {
          const widthPercent = (item.percentage / maxPct) * 100;
          const suffix = index === 0 ? ' ⚡' : index === 1 ? ' 🔥' : '';
          return (
            <View key={item.city} style={styles.row}>
              <Text style={styles.cityLabel} numberOfLines={1}>
                {item.city}
                {suffix}
              </Text>
              <View style={styles.barWrap}>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      {
                        width: `${Math.max(widthPercent, 18)}%`,
                        minWidth: 44,
                      },
                    ]}
                  >
                    <Text style={styles.percentInside}>{item.percentage}%</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        <Text style={styles.footer}>{footer}</Text>
      </View>
    </View>
  );
};

export default CitiesCraziestSection;

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
  leadingLine: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT,
    marginBottom: 4,
  },
  closeBehindLine: {
    fontSize: 13,
    color: MUTED,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  cityLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: TEXT,
    minWidth: 90,
  },
  barWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  track: {
    flex: 1,
    height: 16,
    borderRadius: 8,
    backgroundColor: TRACK_BG,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    minHeight: 16,
    borderRadius: 8,
    backgroundColor: THEME,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  percentInside: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111111',
  },
  footer: {
    fontSize: 12,
    fontStyle: 'italic',
    color: MUTED,
    marginTop: 12,
    lineHeight: 18,
  },
});
