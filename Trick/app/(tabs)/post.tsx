import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ImageUploader } from '../../components/ImageUploader';
import { TagInput } from '../../components/TagInput';
import { BottomNav } from '../../components/BottomNav';

// Form validation schema
const postSchema = z.object({
  opinion: z.string().min(5, 'Opinion must be at least 5 characters').max(500, 'Opinion must be less than 500 characters'),
  tags: z.array(z.string()).max(8, 'Maximum 8 tags allowed'),
  image: z.string().optional(),
  anonymous: z.boolean(),
});

type PostFormData = z.infer<typeof postSchema>;

type TabType = 'home' | 'post' | 'community' | 'profile';

export default function PostOpinionScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('post');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { control, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      opinion: '',
      tags: [],
      image: undefined,
      anonymous: false,
    },
    mode: 'onChange',
  });

  const opinionText = watch('opinion');
  const tags = watch('tags');

  const handleBack = () => {
    router.back();
  };

  const handleTabPress = (tab: TabType) => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        router.push('/(tabs)/');
        break;
      case 'post':
        // Already on post screen
        break;
      case 'community':
        router.push('/(tabs)/explore');
        break;
      case 'profile':
        // Navigate to profile when implemented
        console.log('Navigate to profile');
        break;
    }
  };

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      Alert.alert(
        'Success!',
        'Your opinion has been posted successfully.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/(tabs)/'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to post opinion. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelected = (imageUri: string) => {
    setValue('image', imageUri);
  };

  const handleImageRemoved = () => {
    setValue('image', undefined);
  };

  const handleTagsChanged = (newTags: string[]) => {
    setValue('tags', newTags);
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
        <Text style={styles.headerTitle}>Post an Opinion</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 120 + insets.bottom }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Upload Photo Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upload Photo</Text>
            <Controller
              control={control}
              name="image"
              render={({ field: { value } }) => (
                <ImageUploader
                  imageUri={value}
                  onImageSelected={handleImageSelected}
                  onImageRemoved={handleImageRemoved}
                />
              )}
            />
          </View>

          {/* Your Opinion Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Opinion</Text>
            <Controller
              control={control}
              name="opinion"
              render={({ field: { onChange, value } }) => (
                <View>
                  <TextInput
                    style={[
                      styles.opinionInput,
                      errors.opinion && styles.inputError
                    ]}
                    placeholder="Share your story or opinion..."
                    placeholderTextColor="#9ca3af"
                    multiline
                    value={value}
                    onChangeText={onChange}
                    textAlignVertical="top"
                    accessibilityLabel="Opinion text input"
                  />
                  <View style={styles.characterCount}>
                    <Text style={styles.characterCountText}>
                      {value.length}/500
                    </Text>
                  </View>
                  {errors.opinion && (
                    <Text style={styles.errorText}>{errors.opinion.message}</Text>
                  )}
                </View>
              )}
            />
          </View>

          {/* Tags Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <TagInput
              tags={tags}
              onTagsChanged={handleTagsChanged}
              maxTags={8}
            />
            {errors.tags && (
              <Text style={styles.errorText}>{errors.tags.message}</Text>
            )}
          </View>

          {/* Post Anonymously Section */}
          <View style={styles.section}>
            <View style={styles.anonymousContainer}>
              <Text style={styles.anonymousLabel}>Post Anonymously</Text>
              <Controller
                control={control}
                name="anonymous"
                render={({ field: { onChange, value } }) => (
                  <Switch
                    value={value}
                    onValueChange={onChange}
                    trackColor={{ false: '#e5e7eb', true: '#f5a489' }}
                    thumbColor={value ? '#ffffff' : '#f4f3f4'}
                    accessibilityLabel="Post anonymously toggle"
                  />
                )}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!isValid || isSubmitting) && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
            accessibilityLabel="Post opinion"
            accessibilityRole="button"
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Posting...' : 'Post Opinion'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

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
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fcf9f8',
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
  headerSpacer: {
    width: 40,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginBottom: 12,
  },
  opinionInput: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f8c7b8',
    padding: 16,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#333333',
    minHeight: 120,
    maxHeight: 200,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  characterCount: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  characterCountText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 4,
  },
  anonymousContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  anonymousLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    fontFamily: 'PlusJakartaSans-Medium',
  },
  submitButton: {
    backgroundColor: '#f5a489',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'PlusJakartaSans-Bold',
  },
});