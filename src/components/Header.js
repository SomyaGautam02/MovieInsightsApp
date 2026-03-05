import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Menu, Bell } from 'lucide-react-native';
import resources from '../resources';

const HEADER_BG = '#1a1a1d';
const TEXT_COLOR = '#ffffff';
const SUBTITLE_COLOR = '#a0a0a5';

/**
 * Dark header: hamburger (left), "Insights" + subtitle (center), bell (right).
 */
const Header = () => (
  <View style={styles.container}>
    <View style={styles.left}>
      <Menu size={24} color={TEXT_COLOR} strokeWidth={2} />
    </View>
    <View style={styles.center}>
      <Text style={styles.title}>{resources.header.insightsTitle}</Text>
      <Text style={styles.subtitle}>{resources.header.insightsSubtitle}</Text>
    </View>
    <View style={styles.right}>
      <Bell size={24} color={TEXT_COLOR} strokeWidth={2} />
    </View>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    paddingTop: Platform.OS === 'ios' ? 56 : 44,
    backgroundColor: HEADER_BG,
  },
  left: {
    width: 40,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_COLOR,
  },
  subtitle: {
    fontSize: 12,
    color: SUBTITLE_COLOR,
    marginTop: 2,
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
});
