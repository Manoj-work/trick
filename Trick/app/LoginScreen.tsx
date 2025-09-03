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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Navigate to main app after successful login
    router.replace('/(tabs)');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality would be implemented here');
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Google authentication would be implemented here');
  };

  const handleFacebookLogin = () => {
    Alert.alert('Facebook Login', 'Facebook authentication would be implemented here');
  };

  const handleSignUp = () => {
    router.replace('./SignupScreen');
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
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeTitle}>Welcome Back</Text>
              <Text style={styles.welcomeSubtitle}>Love starts with an opinion.</Text>
            </View>

            {/* Input Fields */}
            <View style={styles.inputSection}>
              <View style={[
                styles.inputContainer,
                isEmailFocused && styles.inputContainerFocused
              ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Email or username"
                  placeholderTextColor="#9a5f4c"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  accessibilityLabel="Email or username input"
                  accessibilityHint="Enter your email address or username"
                />
              </View>

              <View style={[
                styles.inputContainer,
                isPasswordFocused && styles.inputContainerFocused
              ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#9a5f4c"
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                  accessibilityLabel="Password input"
                  accessibilityHint="Enter your password"
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                  accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#9a5f4c"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={handleForgotPassword}
                accessibilityLabel="Forgot password"
                accessibilityRole="button"
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
              accessibilityLabel="Log in button"
              accessibilityRole="button"
            >
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerSection}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialButtonsSection}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleGoogleLogin}
                activeOpacity={0.7}
                accessibilityLabel="Continue with Google"
                accessibilityRole="button"
              >
                <Ionicons name="logo-google" size={20} color="#DB4437" />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleFacebookLogin}
                activeOpacity={0.7}
                accessibilityLabel="Continue with Facebook"
                accessibilityRole="button"
              >
                <Ionicons name="logo-facebook" size={20} color="#4267B2" />
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text
                style={styles.signUpLink}
                onPress={handleSignUp}
                accessibilityLabel="Sign up"
                accessibilityRole="button"
              >
                Sign up
              </Text>
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
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 30, // text-3xl equivalent
    fontWeight: 'bold',
    color: '#1b110d',
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 30, // text-3xl equivalent
    fontWeight: 'bold',
    color: '#1b110d',
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16, // text-base equivalent
    color: '#9a5f4c',
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fceee9',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputContainerFocused: {
    borderColor: '#f5a489',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1b110d',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  passwordToggle: {
    padding: 4,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#f5a489',
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  loginButton: {
    backgroundColor: '#f5a489',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  loginButtonText: {
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
    backgroundColor: '#f5a489',
    opacity: 0.3,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#9a5f4c',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  socialButtonsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 40,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fceee9',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
  },
  socialButtonText: {
    color: '#1b110d',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 14,
    color: '#9a5f4c',
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
  },
  signUpLink: {
    color: '#f5a489',
    fontWeight: 'bold',
    fontFamily: 'PlusJakartaSans-Bold',
  },
});