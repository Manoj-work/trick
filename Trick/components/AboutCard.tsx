import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface AboutCardProps {
  aboutText: string;
}

export function AboutCard({ aboutText }: AboutCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate if text should be truncated (approximately 4 lines)
  const maxLength = 200; // Approximate character count for 4 lines
  const shouldTruncate = aboutText.length > maxLength;
  const displayText = isExpanded || !shouldTruncate 
    ? aboutText 
    : aboutText.substring(0, maxLength) + '...';

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Me</Text>
      <Text style={styles.aboutText}>
        {displayText}
      </Text>
      {shouldTruncate && (
        <TouchableOpacity
          onPress={toggleExpanded}
          style={styles.readMoreButton}
          accessibilityLabel={isExpanded ? 'Show less' : 'Read more'}
          accessibilityRole="button"
        >
          <Text style={styles.readMoreText}>
            {isExpanded ? 'Show less' : 'Read more'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    color: '#666666',
    fontFamily: 'PlusJakartaSans-Regular',
    lineHeight: 22,
  },
  readMoreButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 15,
    color: '#f5a489',
    fontFamily: 'PlusJakartaSans-Medium',
    fontWeight: '500',
  },
});