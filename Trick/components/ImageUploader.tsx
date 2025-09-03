import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface ImageUploaderProps {
  imageUri?: string;
  onImageSelected: (uri: string) => void;
  onImageRemoved: () => void;
}

export function ImageUploader({ imageUri, onImageSelected, onImageRemoved }: ImageUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Sorry, we need camera roll permissions to make this work!'
        );
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setIsLoading(true);
    
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        
        // Validate file size (10MB limit)
        if (asset.fileSize && asset.fileSize > 10 * 1024 * 1024) {
          Alert.alert('File Too Large', 'Please select an image smaller than 10MB');
          return;
        }

        // Validate file type
        if (asset.mimeType && !['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(asset.mimeType)) {
          Alert.alert('Invalid File Type', 'Please select a JPG, PNG, GIF, or SVG image');
          return;
        }

        onImageSelected(asset.uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    } finally {
      setIsLoading(false);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    // Request camera permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera permissions to take photos!'
      );
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    } finally {
      setIsLoading(false);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Select Image',
      'Choose how you\'d like to add an image',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Photo Library', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const removeImage = () => {
    Alert.alert(
      'Remove Image',
      'Are you sure you want to remove this image?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: onImageRemoved },
      ],
      { cancelable: true }
    );
  };

  if (imageUri) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
        <TouchableOpacity
          style={styles.removeButton}
          onPress={removeImage}
          accessibilityLabel="Remove image"
          accessibilityRole="button"
        >
          <Ionicons name="close" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.uploadContainer}
      onPress={showImageOptions}
      disabled={isLoading}
      accessibilityLabel="Upload image"
      accessibilityRole="button"
    >
      <View style={styles.uploadContent}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name={isLoading ? "hourglass-outline" : "cloud-upload-outline"} 
            size={48} 
            color="#f5a489" 
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.uploadText}>
            <Text style={styles.highlightText}>Click to upload</Text>
            <Text style={styles.normalText}> or drag and drop</Text>
          </Text>
          <Text style={styles.captionText}>SVG, PNG, JPG or GIF</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  uploadContainer: {
    height: 192,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f8c7b8',
    borderStyle: 'dashed',
    backgroundColor: '#fceee9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  uploadContent: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  textContainer: {
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    marginBottom: 4,
    textAlign: 'center',
  },
  highlightText: {
    color: '#f5a489',
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  normalText: {
    color: '#333333',
  },
  captionText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
  },
  previewContainer: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 192,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});