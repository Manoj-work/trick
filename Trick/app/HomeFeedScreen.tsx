import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserCard } from '../components/UserCard';
import { BottomNav } from '../components/BottomNav';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Sample data - in a real app, this would come from an API
const generateSampleUsers = () => [
  {
    id: '1',
    name: 'Emma',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b89555c4?w=400&h=600&fit=crop',
    tags: ['friendly', 'adventurous'],
    likes: 24,
  },
  {
    id: '2',
    name: 'James',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    tags: ['funny'],
    likes: 18,
  },
  {
    id: '3',
    name: 'Sofia',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=550&fit=crop',
    tags: ['creative', 'thoughtful'],
    likes: 32,
  },
  {
    id: '4',
    name: 'Alex',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=580&fit=crop',
    tags: ['stylish'],
    likes: 27,
  },
  {
    id: '5',
    name: 'Maya',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=520&fit=crop',
    tags: ['artistic', 'thoughtful'],
    likes: 41,
  },
  {
    id: '6',
    name: 'David',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=480&fit=crop',
    tags: ['confident', 'ambitious'],
    likes: 19,
  },
];

type TabType = 'home' | 'post' | 'community' | 'profile';

export default function HomeFeedScreen() {
  const [users, setUsers] = useState(generateSampleUsers());
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setUsers(generateSampleUsers());
      setRefreshing(false);
    }, 1000);
  };

  const loadMoreUsers = () => {
    if (loading) return;
    setLoading(true);
    
    // Simulate loading more users
    setTimeout(() => {
      const newUsers = generateSampleUsers().map(user => ({
        ...user,
        id: user.id + '-' + Date.now(),
      }));
      setUsers(prev => [...prev, ...newUsers]);
      setLoading(false);
    }, 1000);
  };

  const handleTabPress = (tab: TabType) => {
    setActiveTab(tab);
    // Handle navigation based on tab
    switch (tab) {
      case 'home':
        // Already on home
        break;
      case 'post':
        // Navigate to post creation
        router.push('/(tabs)/post');
        break;
      case 'community':
        // Navigate to community/matches
        console.log('Navigate to community');
        break;
      case 'profile':
        // Navigate to profile
        router.push('/(tabs)/profile');
        break;
    }
  };

  const handleComment = (userId: string) => {
    console.log(`Navigate to comments for user ${userId}`);
    // In a real app, navigate to comments screen
  };

  const handleLogout = () => {
    // Navigate back to login screen
    router.replace('./LoginScreen');
  };

  const renderUser = ({ item, index }: { item: any; index: number }) => (
    <View style={[styles.cardWrapper, { marginLeft: index % 2 === 0 ? 0 : 8 }]}>
      <UserCard user={item} onComment={handleComment} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fcf9f8" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          accessibilityLabel="Logout"
          accessibilityRole="button"
        >
          <Ionicons name="log-out-outline" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      {/* Feed */}
      <FlatList
        data={users}
        renderItem={renderUser}
        numColumns={2}
        contentContainerStyle={[
          styles.feedContent,
          { paddingBottom: 100 + insets.bottom }
        ]}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#f5a489"
            colors={['#f5a489']}
          />
        }
        onEndReached={loadMoreUsers}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id}
      />

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf9f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fcf9f8',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 20, // text-xl equivalent
    fontWeight: 'bold',
    color: '#333333',
    fontFamily: 'PlusJakartaSans-Bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // Offset for logout button
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(245, 164, 137, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  cardWrapper: {
    flex: 1,
    maxWidth: '48%',
  },
});