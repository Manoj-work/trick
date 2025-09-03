import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, StatusBar, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Start fade out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        // Navigate to onboarding after fade out completes
        router.replace('./OnboardingScreen');
      });
    }, 5000); // 5 seconds display time

    return () => clearTimeout(timer);
  }, [fadeAnim, router]);

  return (
    <>
      <StatusBar backgroundColor="#fff0e9" barStyle="dark-content" />
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.content}>
          <Text style={styles.appName}>Opnio</Text>
          <Text style={styles.tagline}>Love starts with an opinion.</Text>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0e9',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 60, // Equivalent to text-6xl
    fontWeight: 'bold',
    color: '#36231a',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 18, // Equivalent to text-lg
    color: '#36231a',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    opacity: 0.9,
    maxWidth: 280,
    lineHeight: 24,
  },
});