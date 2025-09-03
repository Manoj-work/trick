import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface StickyTabsProps {
  activeTab: 'posts' | 'opinions';
  onTabChange: (tab: 'posts' | 'opinions') => void;
}

export function StickyTabs({ activeTab, onTabChange }: StickyTabsProps) {
  const tabs = [
    { id: 'posts' as const, label: 'Posts by Them' },
    { id: 'opinions' as const, label: 'Opinions About Them' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => onTabChange(tab.id)}
              accessibilityLabel={tab.label}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fcf9f8',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    marginBottom: 24,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    // Active tab styling is handled by indicator
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    fontFamily: 'PlusJakartaSans-Medium',
  },
  activeTabText: {
    color: '#f5a489',
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#f5a489',
  },
});