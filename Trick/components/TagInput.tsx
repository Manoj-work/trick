import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TagInputProps {
  tags: string[];
  onTagsChanged: (tags: string[]) => void;
  maxTags?: number;
}

export function TagInput({ tags, onTagsChanged, maxTags = 8 }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const addTag = (text: string) => {
    const trimmedText = text.trim();
    
    if (!trimmedText) return;
    
    // Format tag with # prefix if not present
    const formattedTag = trimmedText.startsWith('#') ? trimmedText : `#${trimmedText}`;
    
    // Validate tag length (2-20 characters including #)
    if (formattedTag.length < 2 || formattedTag.length > 21) {
      return;
    }
    
    // Check if tag already exists
    if (tags.includes(formattedTag)) {
      return;
    }
    
    // Check max tags limit
    if (tags.length >= maxTags) {
      return;
    }
    
    onTagsChanged([...tags, formattedTag]);
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChanged(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTextChange = (text: string) => {
    setInputValue(text);
  };

  const handleSubmitEditing = () => {
    addTag(inputValue);
  };

  const handleKeyPress = ({ nativeEvent }: any) => {
    if (nativeEvent.key === 'Enter' || nativeEvent.key === ',') {
      addTag(inputValue);
    }
  };

  return (
    <View style={styles.container}>
      {/* Existing Tags */}
      {tags.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tagsContainer}
          contentContainerStyle={styles.tagsContent}
        >
          {tags.map((tag, index) => (
            <TagChip
              key={index}
              tag={tag}
              onRemove={() => removeTag(tag)}
            />
          ))}
        </ScrollView>
      )}
      
      {/* Tag Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.tagInput}
          placeholder="Add a tag and press Enter"
          placeholderTextColor="#9ca3af"
          value={inputValue}
          onChangeText={handleTextChange}
          onSubmitEditing={handleSubmitEditing}
          onKeyPress={handleKeyPress}
          maxLength={20}
          returnKeyType="done"
          accessibilityLabel="Add tag input"
        />
        {inputValue.length > 0 && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addTag(inputValue)}
            accessibilityLabel="Add tag"
            accessibilityRole="button"
          >
            <Ionicons name="add" size={20} color="#f5a489" />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Helper Text */}
      <Text style={styles.helperText}>
        {tags.length}/{maxTags} tags • Press Enter or comma to add
      </Text>
    </View>
  );
}

interface TagChipProps {
  tag: string;
  onRemove: () => void;
}

function TagChip({ tag, onRemove }: TagChipProps) {
  return (
    <View style={styles.tagChip}>
      <Text style={styles.tagText}>{tag}</Text>
      <TouchableOpacity
        style={styles.removeTagButton}
        onPress={onRemove}
        accessibilityLabel={`Remove tag ${tag}`}
        accessibilityRole="button"
      >
        <Ionicons name="close" size={14} color="#f5a489" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  tagsContainer: {
    maxHeight: 100,
  },
  tagsContent: {
    gap: 8,
    paddingVertical: 4,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fceee9',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    gap: 6,
  },
  tagText: {
    fontSize: 14,
    color: '#f5a489',
    fontFamily: 'PlusJakartaSans-Medium',
    fontWeight: '500',
  },
  removeTagButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(245, 164, 137, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f8c7b8',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  tagInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#333333',
    minHeight: 24,
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(245, 164, 137, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'PlusJakartaSans-Regular',
  },
});