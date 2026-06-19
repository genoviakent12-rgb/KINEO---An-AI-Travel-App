// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native'; // ← more reliable than custom hook in most cases
import 'react-native-reanimated';

export const unstable_settings = {
  // Optional but recommended for tab navigation stability
  anchor: '(tabs)',
  // Helps Expo Router understand initial route behavior
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme(); // 'light' | 'dark' | null

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          // Optional: global header style
          headerStyle: { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            // Prevents going back from tabs (common pattern)
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            title: 'Modal',
            // Modern iOS-style modal presentation
            animation: 'slide_from_bottom',
          }}
        />

        {/* Optional: add 404 or error screen */}
        <Stack.Screen
          name="+not-found"
          options={{ title: 'Not Found' }}
        />
      </Stack>

      {/* Better status bar handling */}
      <StatusBar
        style={colorScheme === 'dark' ? 'light' : 'dark'}
        backgroundColor="transparent"
        translucent={true}
      />
    </ThemeProvider>
  );
}