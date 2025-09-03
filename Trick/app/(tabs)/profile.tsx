import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProfileHero } from '../../components/ProfileHero';
import { AboutCard } from '../../components/AboutCard';
import { StickyTabs } from '../../components/StickyTabs';
import { MasonryGrid } from '../../components/MasonryGrid';
import { BottomNav } from '../../components/BottomNav';

// Mock user data
const mockUser = {
  id: '1',
  firstName: 'Jessica',
  fullName: 'Jessica Miller',
  handle: '@jessicamiller',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b89555c4?w=300&h=300&fit=crop&crop=face',
  isFollowing: false,
  isOwnProfile: true,
  stats: {
    followers: 1200,
    following: 450,
    posts: 23,
  },
  about: 'Exploring the world one coffee shop at a time. Lover of art, spontaneous road trips, and deep conversations. Looking for someone to share laughs and adventures with. Love starts with an opinion, so tell me yours!',
};

// Mock posts data
const mockPosts = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=520&fit=crop',
    tags: ['#creative', '#thoughtful'],
    aspectRatio: 0.77,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=480&fit=crop',
    tags: ['#adventurous'],
    aspectRatio: 0.83,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    tags: ['#funny', '#charming'],
    aspectRatio: 0.8,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=550&fit=crop',
    tags: ['#artistic'],
    aspectRatio: 0.73,
  },
];

type TabType = 'home' | 'post' | 'community' | 'profile';

export default function ProfileDetailScreen() {
  const [user, setUser] = useState(mockUser);
  const [posts, setPosts] = useState(mockPosts);
  const [activeProfileTab, setActiveProfileTab] = useState<'posts' | 'opinions'>('posts');
  const [activeBottomTab, setActiveBottomTab] = useState<TabType>('profile');
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleBack = () => {
    router.back();
  };

  const handleMoreOptions = () => {
    const options = user.isOwnProfile 
      ? ['Edit Profile', 'Settings', 'Share Profile', 'Cancel']
      : ['Share Profile', 'Report', 'Block', 'Cancel'];
    
    Alert.alert(
      'Profile Options',
      'Choose an action',
      options.map((option, index) => ({
        text: option,
        style: option === 'Cancel' ? 'cancel' : index > 2 ? 'destructive' : 'default',
        onPress: () => {
          if (option !== 'Cancel') {
            console.log(`Selected: ${option}`);
          }
        },
      }))
    );
  };

  const handleFollow = () => {
    setUser(prev => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      stats: {
        ...prev.stats,
        followers: prev.isFollowing 
          ? prev.stats.followers - 1 
          : prev.stats.followers + 1,
      },
    }));
  };

  const handleStatsPress = (type: 'followers' | 'following' | 'posts') => {
    console.log(`Navigate to ${type} screen`);
    // In a real app, navigate to respective screens
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleTabPress = (tab: TabType) => {
    setActiveBottomTab(tab);
    switch (tab) {
      case 'home':
        router.push('/(tabs)/');
        break;
      case 'post':
        router.push('/(tabs)/post');
        break;
      case 'community':
        router.push('/(tabs)/explore');
        break;
      case 'profile':
        // Already on profile
        break;
    }
  };

  const handleProfileTabChange = (tab: 'posts' | 'opinions') => {
    setActiveProfileTab(tab);
  };

  const handlePostPress = (postId: string) => {
    console.log(`Navigate to post detail: ${postId}`);
    // In a real app, navigate to post detail screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fcf9f8" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Ionicons name="chevron-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{user.firstName}</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={handleMoreOptions}
          accessibilityLabel="More options"
          accessibilityRole="button"
        >
          <Ionicons name="ellipsis-horizontal" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 100 + insets.bottom }
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#f5a489"
            colors={['#f5a489']}
          />
        }
      >
        {/* Profile Hero Section */}
        <ProfileHero
          user={user}
          onFollow={handleFollow}
          onStatsPress={handleStatsPress}
        />

        {/* About Me Card */}
        <AboutCard aboutText={user.about} />

        {/* Sticky Tabs */}
        <StickyTabs
          activeTab={activeProfileTab}
          onTabChange={handleProfileTabChange}
        />

        {/* Content based on active tab */}
        {activeProfileTab === 'posts' ? (
          <MasonryGrid
            posts={posts}
            onPostPress={handlePostPress}
          />
        ) : (
          <View style={styles.opinionsContent}>
            <View style={styles.emptyState}>
              <Ionicons name="chatbubble-outline" size={48} color="#d1d5db" />
              <Text style={styles.emptyStateTitle}>No opinions yet</Text>
              <Text style={styles.emptyStateText}>
                When others share their thoughts about Jessica, they'll appear here.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeBottomTab} onTabPress={handleTabPress} />
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(252, 249, 248, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(245, 164, 137, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    fontFamily: 'PlusJakartaSans-Bold',
    flex: 1,
    textAlign: 'center',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(245, 164, 137, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingTop: 24,
  },
  opinionsContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
});