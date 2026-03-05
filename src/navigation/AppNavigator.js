import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Home,
  Users,
  Compass,
  MessageCircle,
  User,
  Activity,
} from 'lucide-react-native';
import InsightsScreen from '../screens/InsightsScreen';
import DetailScreen from '../screens/DetailScreen';
import resources from '../resources';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ACTIVE_YELLOW = '#F5C518';
const TAB_INACTIVE = '#888888';
const TAB_BAR_BG = '#1a1a1d';

const InsightsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="InsightsList" component={InsightsScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
);

const PlaceholderScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#141418', paddingHorizontal: 32 }}>
    <Text style={{ fontSize: 16, color: '#a0a0a5', textAlign: 'center' }}>
      {resources.common.comingSoon}
    </Text>
  </View>
);

const AppNavigator = () => (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="InsightsTab"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: TAB_ACTIVE_YELLOW,
          tabBarInactiveTintColor: TAB_INACTIVE,
          tabBarStyle: {
            backgroundColor: TAB_BAR_BG,
            borderTopColor: '#2a2a2e',
          },
          tabBarLabelStyle: { fontSize: 11 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={PlaceholderScreen}
          options={{
            title: resources.tabs.home,
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Social"
          component={PlaceholderScreen}
          options={{
            title: resources.tabs.social,
            tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Explore"
          component={PlaceholderScreen}
          options={{
            title: resources.tabs.explore,
            tabBarIcon: ({ color, size }) => (
              <Compass size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={PlaceholderScreen}
          options={{
            title: resources.tabs.chat,
            tabBarIcon: ({ color, size }) => (
              <MessageCircle size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={PlaceholderScreen}
          options={{
            title: resources.tabs.profile,
            tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="InsightsTab"
          component={InsightsStack}
          options={{
            title: resources.tabs.insights,
            tabBarIcon: ({ color, size }) => (
              <Activity size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
