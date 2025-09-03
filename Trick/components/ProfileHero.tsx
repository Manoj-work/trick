import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

interface User {
  id: string;
  firstName: string;
  fullName: string;
  handle: string;
  avatar: string;
  isFollowing: boolean;
  isOwnProfile: boolean;
  stats: {
    followers: number;
    following: number;
    posts: number;
  };
}

interface ProfileHeroProps {
  user: User;
  onFollow: () => void;
  onStatsPress: (type: 'followers' | 'following' | 'posts') => void;
}

export function ProfileHero({ user, onFollow, onStatsPress }: ProfileHeroProps) {
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const handleAvatarEdit = async () => {
    if (!user.isOwnProfile) return;

    Alert.alert(
      'Change Profile Photo',
      'Choose how you\'d like to update your profile photo',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Photo Library', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera permission is needed to take photos.');
      return;
    }

    setIsUploadingAvatar(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        // In a real app, upload the image to server
        console.log('New avatar URI:', result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Photo library permission is needed to select images.');
      return;
    }

    setIsUploadingAvatar(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        // In a real app, upload the image to server
        console.log('New avatar URI:', result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          {isUploadingAvatar && (
            <View style={styles.uploadingOverlay}>
              <Ionicons name="hourglass-outline" size={24} color="#ffffff" />
            </View>
          )}
        </View>
        {user.isOwnProfile && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleAvatarEdit}
            accessibilityLabel="Edit profile photo"
            accessibilityRole="button"
          >
            <Ionicons name="pencil" size={16} color="#ffffff" />
          </TouchableOpacity>
        )}
      </View>

      {/* Name and Handle */}
      <View style={styles.nameContainer}>
        <Text style={styles.fullName}>{user.fullName}</Text>
        <Text style={styles.handle}>{user.handle}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => onStatsPress('followers')}
          accessibilityLabel={`${user.stats.followers} followers`}
          accessibilityRole="button"
        >
          <Text style={styles.statNumber}>{formatNumber(user.stats.followers)}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => onStatsPress('following')}
          accessibilityLabel={`${user.stats.following} following`}
          accessibilityRole="button"
        >
          <Text style={styles.statNumber}>{formatNumber(user.stats.following)}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => onStatsPress('posts')}
          accessibilityLabel={`${user.stats.posts} posts`}
          accessibilityRole="button"
        >
          <Text style={styles.statNumber}>{formatNumber(user.stats.posts)}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </TouchableOpacity>
      </View>

      {/* Follow Button */}
      {!user.isOwnProfile && (
        <TouchableOpacity
          style={[
            styles.followButton,
            user.isFollowing && styles.followingButton
          ]}
          onPress={onFollow}
          accessibilityLabel={user.isFollowing ? 'Following' : 'Follow'}
          accessibilityRole="button"
        >
          <Text style={[
            styles.followButtonText,
            user.isFollowing && styles.followingButtonText
          ]}>
            {user.isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5a489',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  nameContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  fullName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  handle: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  followButton: {
    backgroundColor: '#f5a489',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: width - 48,
    maxWidth: 300,
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#f5a489',
  },
  followButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  followingButtonText: {
    color: '#f5a489',
  },
});