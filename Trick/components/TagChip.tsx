import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TagChipProps {
  tag: string;
}

export function TagChip({ tag }: TagChipProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>#{tag}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
  },
  text: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});