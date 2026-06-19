import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
// import { StyleSheet } from 'react-native';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0B5ED7',
        tabBarInactiveTintColor: '#999',
      }}
    >
      
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
            name="compass-outline" 
            size={size} 
            color={color} 
            style={{ transform: [{ rotate: '18deg' }] }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="mytrip"
        options={{
          tabBarLabel: "Trips",
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
            name="airplane-sharp" 
            size={size} 
            color={color} 
            style={{ transform: [{ rotate: '-23deg' }] }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}