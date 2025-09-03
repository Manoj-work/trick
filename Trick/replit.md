# Opnio - Expo React Native App

## Overview

Opnio is a cross-platform mobile application built with Expo and React Native. The app appears to be a dating/social platform with the tagline "Love starts with an opinion." It features a modern mobile architecture supporting iOS, Android, and web platforms through Expo's universal app framework.

The application follows Expo's file-based routing system and implements a tab-based navigation structure with onboarding flow. It includes custom theming support for light/dark modes and uses modern React Native development practices with TypeScript.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Expo SDK 53 with React Native 0.79.2 and React 19
- **Navigation**: File-based routing with Expo Router 5.0, featuring tab navigation via React Navigation
- **Styling**: Custom theming system with light/dark mode support, utilizing React Native StyleSheet
- **Typography**: Poppins and Plus Jakarta Sans font families with multiple weights loaded via Expo Google Fonts
- **UI Components**: Custom themed components (ThemedText, ThemedView) with automatic color scheme adaptation
- **Platform Support**: Cross-platform compatibility for iOS, Android, and web with platform-specific optimizations

### App Flow Structure
- **Splash Screen**: Production-ready animated entry point with soft peach background (#fff0e9), "Opnio" branding in Poppins Bold font, 2-second display with smooth fade transition to onboarding
- **Onboarding**: Welcome screen with "Get Started" button that navigates to login
- **Login Screen**: Full-featured authentication screen with email/password inputs, social login options, and navigation to signup
- **Signup Screen**: Complete registration form with name, email, password confirmation, social signup options, and terms acceptance
- **Home Feed**: Interactive masonry grid layout with user cards, hashtag tags, like/comment/share actions, and custom bottom navigation
- **Tab Navigation**: Four-tab structure with Home, Post, Community/Explore, and Profile screens (accessible after authentication)
- **Error Handling**: 404 not-found screen with navigation back to home

## Recent Changes (September 2025)

### Splash Screen Implementation
- Added production-ready SplashScreen component with full-screen responsive layout
- Implemented fade animation using React Native Animated API
- Added Poppins font integration via @expo-google-fonts/poppins
- Set up proper navigation flow: SplashScreen → OnboardingScreen → LoginScreen → Tab Navigation
- Updated root layout to include new screens and font loading

### Login Screen Implementation
- Created production-ready LoginScreen component with responsive layout (#fdf7f4 background)
- Implemented Plus Jakarta Sans font family via @expo-google-fonts/plus-jakarta-sans
- Added form inputs with focus states, proper validation, and accessibility labels
- Created social login buttons for Google and Facebook with proper branding
- Integrated secure password visibility toggle and forgot password functionality
- Added proper keyboard handling with KeyboardAvoidingView and ScrollView
- Implemented complete navigation flow with proper screen transitions

### Signup Screen Implementation
- Built comprehensive SignupScreen with clean responsive layout and proper form structure
- Implemented header navigation with "Opnio" branding and "Log in" link for easy screen switching
- Created four-field registration form: Name, Email, Password, and Confirm Password with validation
- Added white input backgrounds with peach focus highlights for improved UX
- Integrated Google and Facebook social signup buttons with platform-appropriate styling
- Implemented terms and privacy policy footer with clickable legal links
- Added complete form validation including password confirmation matching
- Ensured full keyboard handling and accessibility compliance for production deployment

### Home Feed Implementation
- Created production-ready HomeFeedScreen with masonry grid layout for optimal performance
- Built reusable UserCard component with image overlays, gradient backgrounds, and action buttons
- Implemented TagChip component for hashtag pills with semi-transparent blur effects
- Added interactive features: like toggling, comment navigation, share functionality, and infinite scroll
- Created custom BottomNav component with Home, Post, Community, Profile tabs using Material icons
- Integrated sticky header with logout button and proper responsive design (#fcf9f8 background)
- Added pull-to-refresh functionality and smooth animations for enhanced user experience

### Post Opinion Screen Implementation (September 2025)
- Built comprehensive PostOpinionScreen with production-ready form validation using react-hook-form and zod
- Implemented ImageUploader component with expo-image-picker integration supporting camera and photo library access
- Created TagInput and TagChip components for dynamic tag management with validation (max 8 tags, 2-20 characters each)
- Added file validation for image uploads (type checking for JPG/PNG/GIF/SVG, 10MB size limit)
- Integrated anonymous posting toggle with proper accessibility labels and switch controls
- Built responsive layout with KeyboardAvoidingView, ScrollView, and sticky header/bottom navigation
- Added complete form validation: opinion text (5-500 characters), tag management, and image handling
- Implemented proper error handling with inline validation messages and success/error alerts
- Added cross-platform compatibility with web drag-and-drop support and mobile camera access
- Created seamless navigation integration with existing tab structure and routing

### Profile Detail Screen Implementation (September 2025)
- Built comprehensive ProfileDetailScreen matching the provided design with sticky header and bottom navigation
- Created ProfileHero component with centered avatar (120px with white ring and shadow), editable avatar for own profile
- Implemented stats row with formatted numbers (1.2k format) for followers, following, and posts with tap navigation
- Added Follow/Following button with haptic feedback and optimistic updates, full-width rounded design
- Built AboutCard component with expandable "Read more" functionality for long text content
- Created StickyTabs component for switching between "Posts by Them" and "Opinions About Them" with active indicators
- Implemented MasonryGrid component with 2-column layout, image cards with tag overlays and gradient backgrounds
- Added mock user data and API structure for profile information, posts, and statistics
- Integrated more options menu with different actions for own profile vs other users (Edit Profile, Settings, Share vs Report, Block)
- Created empty states for opinions tab with friendly messaging and iconography
- Added pull-to-refresh functionality and proper accessibility labels throughout all components
- Ensured cross-platform compatibility and responsive design with proper safe area handling

### Development Architecture
- **Language**: TypeScript with strict mode enabled for type safety
- **Code Quality**: ESLint with Expo configuration for consistent code standards
- **Testing**: Jest testing framework with Expo-specific preset
- **Asset Management**: Optimized image handling with Expo Image component
- **Build System**: Metro bundler for web builds with static output

### Component Architecture
- **Reusable Components**: Modular component library including collapsible sections, parallax scroll views, and haptic feedback tabs
- **Icon System**: Cross-platform icon solution using SF Symbols on iOS and Material Icons on Android/web
- **Animation**: React Native Reanimated for smooth animations and transitions
- **Accessibility**: Built-in support for haptic feedback and safe area handling

## External Dependencies

### Core Framework Dependencies
- **Expo SDK**: Complete development platform including router, constants, fonts, and system UI components
- **React Navigation**: Tab navigation with bottom tabs and native elements
- **React Native Reanimated**: Advanced animation library for smooth UI transitions
- **React Native Gesture Handler**: Touch gesture recognition system

### UI and Design Dependencies
- **Expo Google Fonts**: Poppins font family integration
- **Expo Vector Icons**: Comprehensive icon library with Material Icons support
- **Expo Symbols**: SF Symbols support for iOS platform
- **Expo Blur**: Native blur effects for iOS tab bar backgrounds

### Platform-Specific Features
- **Expo Haptics**: Tactile feedback for enhanced user interactions
- **Expo Status Bar**: Cross-platform status bar management
- **React Native Safe Area Context**: Safe area handling for modern devices
- **React Native Screens**: Native screen management for optimal performance

### Development Tools
- **TypeScript**: Static type checking and enhanced developer experience
- **ESLint**: Code linting with Expo-specific configuration
- **Jest**: Testing framework with Expo testing utilities
- **Babel**: JavaScript compilation for cross-platform compatibility