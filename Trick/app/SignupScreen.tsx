import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Navigate to main app after successful signup
    router.replace('/(tabs)');
  };

  const handleLoginNavigation = () => {
    router.replace('./LoginScreen');
  };

  const handleGoogleSignup = () => {
    Alert.alert('Google Signup', 'Google authentication would be implemented here');
  };

  const handleFacebookSignup = () => {
    Alert.alert('Facebook Signup', 'Facebook authentication would be implemented here');
  };

  const handleTermsPress = () => {
    Alert.alert('Terms of Service', 'Terms of Service would be displayed here');
  };

  const handlePrivacyPress = () => {
    Alert.alert('Privacy Policy', 'Privacy Policy would be displayed here');
  };

  return (
    <>
      <StatusBar backgroundColor="#fdf7f4" barStyle="dark-content" />
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.appName}>Opnio</Text>
            <TouchableOpacity
              onPress={handleLoginNavigation}
              accessibilityLabel="Navigate to login"
              accessibilityRole="button"
            >
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Create your account</Text>
              <Text style={styles.subtitle}>Love starts with an opinion.</Text>
            </View>

            {/* Input Fields */}
            <View style={styles.inputSection}>
              <View style={[
                styles.inputContainer,
                focusedField === 'name' && styles.inputContainerFocused
              ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="#9a9a9a"
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  autoCapitalize="words"
                  autoComplete="name"
                  accessibilityLabel="Name input"
                  accessibilityHint="Enter your full name"
                />
              </View>

              <View style={[
                styles.inputContainer,
                focusedField === 'email' && styles.inputContainerFocused
              ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#9a9a9a"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  accessibilityLabel="Email input"
                  accessibilityHint="Enter your email address"
                />
              </View>

              <View style={[
                styles.inputContainer,
                focusedField === 'password' && styles.inputContainerFocused
              ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#9a9a9a"
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  secureTextEntry={true}
                  autoComplete="password-new"
                  accessibilityLabel="Password input"
                  accessibilityHint="Enter your password"
                />
              </View>

              <View style={[
                styles.inputContainer,
                focusedField === 'confirmPassword' && styles.inputContainerFocused
              ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#9a9a9a"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  secureTextEntry={true}
                  autoComplete="password-new"
                  accessibilityLabel="Confirm password input"
                  accessibilityHint="Re-enter your password to confirm"
                />
              </View>
            </View>

            {/* Signup Button */}
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
              activeOpacity={0.8}
              accessibilityLabel="Sign up button"
              accessibilityRole="button"
            >
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerSection}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or sign up with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Signup Buttons */}
            <View style={styles.socialButtonsSection}>
              <TouchableOpacity
                style={styles.googleButton}
                onPress={handleGoogleSignup}
                activeOpacity={0.7}
                accessibilityLabel="Continue with Google"
                accessibilityRole="button"
              >
                <Ionicons name="logo-google" size={20} color="#DB4437" />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.facebookButton}
                onPress={handleFacebookSignup}
                activeOpacity={0.7}
                accessibilityLabel="Continue with Facebook"
                accessibilityRole="button"
              >
                <Ionicons name="logo-facebook" size={20} color="#ffffff" />
                <Text style={styles.facebookButtonText}>Continue with Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By signing up, you agree to our{' '}
              <Text
                style={styles.linkText}
                onPress={handleTermsPress}
                accessibilityLabel="Terms of Service"
                accessibilityRole="button"
              >
                Terms of Service
              </Text>
              {' '}and{' '}
              <Text
                style={styles.linkText}
                onPress={handlePrivacyPress}
                accessibilityLabel="Privacy Policy"
                accessibilityRole="button"
              >
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf7f4',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    minHeight: height,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 20, // text-xl equivalent
    fontWeight: 'bold',
    color: '#1b110d',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f5a489',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  content: {
    flex: 1,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 30, // text-3xl equivalent
    fontWeight: 'bold',
    color: '#1b110d',
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16, // text-base equivalent
    color: '#666666',
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: 32,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12, // rounded-xl
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputContainerFocused: {
    borderColor: '#f5a489',
  },
  input: {
    fontSize: 16,
    color: '#1b110d',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  signupButton: {
    backgroundColor: '#f5a489',
    borderRadius: 12, // rounded-xl
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  dividerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#d1d5db',
    opacity: 0.5,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#9a9a9a',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  socialButtonsSection: {
    gap: 12,
    marginBottom: 40,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12, // rounded-xl
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  googleButtonText: {
    color: '#1b110d',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginLeft: 8,
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1877F2',
    borderRadius: 12, // rounded-xl
    height: 56,
    paddingHorizontal: 16,
  },
  facebookButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#9a9a9a',
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: '#f5a489',
    fontFamily: 'PlusJakartaSans-SemiBold',
    textDecorationLine: 'underline',
  },
});