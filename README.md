# Movie Insights App

A React Native mobile application that delivers comprehensive movie insights, analytics, and audience sentiment data. The app provides real-time movie hype tracking, city-specific trends, and deep audience engagement metrics.

## Features

### Core Insights
- **Movie Hype Tracking** - Monitor excitement levels and trending movies in real-time
- **Audience Sentiment Analysis** - Track audience reactions and emotional responses
- **Excitement Drivers** - Identify key factors driving movie interest
- **Hype vs Trust Gap** - Analyze the difference between public excitement and credibility
- **Warning Signs** - Alert users to potential movie underperformers
- **City-Specific Analytics** - View movie trends across different cities

### User Interactions
- **Check-in System** - Users can provide feedback and answer contextual questions
- **Pulse Toggle** - Switch between different data visualization modes
- **Heat Slider** - Visualize intensity metrics with interactive sliders
- **Movie Search** - Search and filter movies with animated results

### Data Visualization
- **Hype Train** - See the trajectory of movie excitement over time
- **City Rankings** - Discover which cities are most interested in specific movies
- **Audience Chips** - Display demographic and audience segment data

## Tech Stack

- **Framework:** React Native with Expo
- **Navigation:** React Navigation (Bottom Tabs & Native Stack)
- **State Management:** React Hooks
- **Styling:** React Native StyleSheet
- **Icons:** Lucide React Native
- **Storage:** AsyncStorage
- **UI Components:** React Native, Expo Linear Gradient, SVG
- **Build Tool:** Expo (EAS Build)

## Installation

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development)
- Xcode (for iOS development)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MovieInsightsApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on specific platform**
   ```bash
   # Android
   npm run android

   # iOS
   npm run ios

   # Web
   npm run web
   ```

## Project Structure

```
MovieInsightsApp/
├── src/
│   ├── api/                    # API services
│   │   └── movieService.js     # Movie data fetching
│   ├── components/             # Reusable UI components
│   │   ├── AudienceChipsSection.js
│   │   ├── CheckInModal.js
│   │   ├── CitiesCraziestSection.js
│   │   ├── CityInsightCard.js
│   │   ├── ExcitementDriversSection.js
│   │   ├── HeatSliderSection.js
│   │   ├── HypeTrainSection.js
│   │   ├── HypeTrustGapSection.js
│   │   ├── MovieCard.js
│   │   ├── SentimentSection.js
│   │   ├── WarningSignsSection.js
│   │   └── ... (other components)
│   ├── config/                 # Configuration files
│   │   ├── movieConfig.js
│   │   ├── checkinQuestions.js
│   │   └── theme.js
│   ├── data/                   # Static/mock data
│   │   ├── movies.js
│   │   ├── movieHype.js
│   │   └── cityData.js
│   ├── navigation/             # Navigation setup
│   │   └── AppNavigator.js
│   ├── screens/                # Screen components
│   │   ├── InsightsScreen.js   # Main insights dashboard
│   │   └── DetailScreen.js     # Movie detail view
│   ├── storage/                # Local data storage
│   │   └── checkinStorage.js
│   └── resources/              # Localization & strings
│       └── strings.json
├── android/                    # Android native code
├── App.js                      # Root component
├── app.json                    # Expo configuration
├── eas.json                    # EAS Build configuration
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Build and run on Android device/emulator
- `npm run ios` - Build and run on iOS device/simulator
- `npm run web` - Run in web browser

## Key Components

### InsightsScreen
The main dashboard displaying movie insights, search functionality, and animated movie cards with real-time data.

### MovieCard
Individual movie card component showing basic movie info and hype metrics.

### DetailScreen
Detailed view of a selected movie with comprehensive analytics and insights.

### CheckInModal
Interactive modal for collecting user feedback and responses to contextual questions.

## Configuration

### Theme
Customize colors and styling in [src/config/theme.js](src/config/theme.js)

### Check-in Questions
Configure user survey questions in [src/config/checkinQuestions.js](src/config/checkinQuestions.js)

### Movie Configuration
Set up movie-specific settings in [src/config/movieConfig.js](src/config/movieConfig.js)

## Development Guidelines

### Component Structure
- Components should be functional and use React Hooks
- Use StyleSheet for all styling
- Keep components focused and single-responsibility

### State Management
- Use local state (useState) for UI state
- Use AsyncStorage for persistent data
- Lift state up when multiple components need access

### Data Flow
- Fetch data through API services in [src/api/](src/api/)
- Use useFocusEffect for screen-specific data refreshes
- Cache data appropriately to minimize API calls

## Building for Production

### Android
```bash
eas build --platform android
```

### iOS
```bash
eas build --platform ios
```

Configure build settings in [eas.json](eas.json) before building.

## Troubleshooting

- **Build issues:** Clear cache with `expo prebuild --clean`
- **Module not found:** Run `npm install` again
- **Android emulator:** Ensure Android SDK is properly installed
- **Hot reload not working:** Restart the development server


## Support

For issues or questions, please contact at somyagautam02@gmail.com.
