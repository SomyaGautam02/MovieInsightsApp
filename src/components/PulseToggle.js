import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GOLD = '#c9a227';
const GOLD_DARK = '#a68b20';
const BG_DARK = '#1a1a1d';
const TEXT_ACTIVE = '#1a1a1a';
const TEXT_INACTIVE = '#a0a0a5';

const PulseToggle = ({ activeTab, onTabChange }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'Pulse' && styles.tabActive]}
      onPress={() => onTabChange('Pulse')}
      activeOpacity={0.8}
    >
      <Text style={[styles.tabText, activeTab === 'Pulse' && styles.tabTextActive]}>
        Pulse
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'Predictions' && styles.tabActive]}
      onPress={() => onTabChange('Predictions')}
      activeOpacity={0.8}
    >
      <Text style={[styles.tabText, activeTab === 'Predictions' && styles.tabTextActive]}>
        Predictions
      </Text>
    </TouchableOpacity>
  </View>
);

export default PulseToggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: BG_DARK,
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: GOLD,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: TEXT_INACTIVE,
  },
  tabTextActive: {
    color: TEXT_ACTIVE,
  },
});
