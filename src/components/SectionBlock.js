import React from 'react';
import { View, StyleSheet } from 'react-native';

const BLOCK_BG = '#252529';
const VARIANTS = {
  default: { bg: BLOCK_BG },
  temp: { bg: '#2a2a2e' },
  recobee: { bg: '#1a2e1a' },
};

/**
 * One block per section: dark grey bg, rounded corners, separated from black background.
 */
const SectionBlock = ({ children, variant = 'default' }) => {
  const { bg } = VARIANTS[variant] ?? VARIANTS.default;
  return (
    <View style={[styles.block, { backgroundColor: bg }]}>
      {children}
    </View>
  );
};

export default SectionBlock;

const styles = StyleSheet.create({
  block: {
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 18,
    padding: 16,
    overflow: 'hidden',
  },
});
