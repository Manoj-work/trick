import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Text,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 64) / 2; // 24px padding on each side + 16px gap

interface Post {
  id: string;
  image: string;
  tags: string[];
  aspectRatio: number;
}

interface MasonryGridProps {
  posts: Post[];
  onPostPress: (postId: string) => void;
}

interface TagChipProps {
  tag: string;
}

function TagChip({ tag }: TagChipProps) {
  return (
    <View style={styles.tagChip}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
  );
}

interface PostCardProps {
  post: Post;
  onPress: () => void;
}

function PostCard({ post, onPress }: PostCardProps) {
  const cardHeight = itemWidth / post.aspectRatio;

  return (
    <TouchableOpacity
      style={[styles.postCard, { height: cardHeight }]}
      onPress={onPress}
      accessibilityLabel={`Post with tags ${post.tags.join(', ')}`}
      accessibilityRole="button"
    >
      <Image
        source={{ uri: post.image }}
        style={styles.postImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <View style={styles.tagsContainer}>
          {post.tags.map((tag, index) => (
            <TagChip key={index} tag={tag} />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function MasonryGrid({ posts, onPostPress }: MasonryGridProps) {
  // Simple 2-column layout instead of complex masonry
  const renderPost = ({ item, index }: { item: Post; index: number }) => (
    <View style={[styles.postWrapper, { marginLeft: index % 2 === 0 ? 0 : 8 }]}>
      <PostCard
        post={item}
        onPress={() => onPostPress(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // Parent ScrollView handles scrolling
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  gridContent: {
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  postWrapper: {
    flex: 1,
    maxWidth: itemWidth,
  },
  postCard: {
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: 'PlusJakartaSans-Medium',
    fontWeight: '500',
  },
});