import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
// TagChip component inline to avoid import issues
const TagChip = ({ tag }: { tag: string }) => (
  <View style={tagChipStyles.container}>
    <Text style={tagChipStyles.text}>#{tag}</Text>
  </View>
);

const tagChipStyles = StyleSheet.create({
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

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // Account for padding and gap

interface User {
  id: string;
  name: string;
  image: string;
  tags: string[];
  likes: number;
}

interface UserCardProps {
  user: User;
  onComment?: (userId: string) => void;
}

export function UserCard({ user, onComment }: UserCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(user.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    if (onComment) {
      onComment(user.id);
    } else {
      Alert.alert('Comments', `Opening comments for ${user.name}`);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${user.name}'s profile on Opnio!`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.image} />
      
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.6)']}
        style={styles.overlay}
      >
        {/* Tags */}
        <View style={styles.tagsContainer}>
          {user.tags.map((tag, index) => (
            <TagChip key={index} tag={tag} />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleLike}
            accessibilityLabel={isLiked ? "Unlike" : "Like"}
            accessibilityRole="button"
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={20}
              color="#ffffff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleComment}
            accessibilityLabel="Comment"
            accessibilityRole="button"
          >
            <Ionicons name="chatbubble-outline" size={20} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShare}
            accessibilityLabel="Share"
            accessibilityRole="button"
          >
            <Ionicons name="share-outline" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 'auto',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
});