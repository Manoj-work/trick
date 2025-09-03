import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

type TabType = 'home' | 'post' | 'community' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

const tabs = [
  { id: 'home' as TabType, label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { id: 'post' as TabType, label: 'Post', icon: 'add-circle-outline', activeIcon: 'add-circle' },
  { id: 'community' as TabType, label: 'Community', icon: 'search-outline', activeIcon: 'search' },
  { id: 'profile' as TabType, label: 'Profile', icon: 'person-outline', activeIcon: 'person' },
];

export function BottomNav({ activeTab, onTabPress }: BottomNavProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 12 }]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress(tab.id)}
            accessibilityLabel={tab.label}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Ionicons
              name={isActive ? tab.activeIcon as any : tab.icon as any}
              size={24}
              color={isActive ? '#f5a489' : '#9ca3af'}
            />
            <Text
              style={[
                styles.tabLabel,
                isActive && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: width / 4,
  },
  tabLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  activeTabLabel: {
    color: '#f5a489',
    fontWeight: 'bold',
    fontFamily: 'PlusJakartaSans-Bold',
  },
});