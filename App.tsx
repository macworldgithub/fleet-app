// import React, { useEffect } from 'react';
// import { StatusBar } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import BottomTabNavigator from './src/navigation/BottomTabNavigator';
// import { View, Text, Button, Alert } from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import tw from 'tailwind-react-native-classnames';

// export default function Home() {
//   useEffect(() => {
//     initFCM();

//     // This is the part that handles foreground notifications
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log('Foreground FCM message:', remoteMessage);
//       Alert.alert(
//         remoteMessage.notification?.title ?? 'Notification',
//         remoteMessage.notification?.body ?? ''
//       );
//     });

//     // Cleanup subscription on unmount
//     return unsubscribe;
//   }, []);

//   const initFCM = async () => {
//     try {
//       const authStatus = await messaging().requestPermission();
//       if (
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL
//       ) {
//         console.log('Permission granted');
//         await messaging().registerDeviceForRemoteMessages();

//         const token = await messaging().getToken();
//         console.log('FCM Token:', token);
//       }
//     } catch (error) {
//       console.log('FCM INIT ERROR:', error);
//     }
//   };

//   return (
//      <SafeAreaProvider>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
//       <NavigationContainer>
//         <BottomTabNavigator />
//     <View style={tw`flex-1 items-center justify-center bg-white`}>
//       <Text style={tw`text-lg font-bold text-blue-500`}>
//         Tailwind Working 🚀
//       </Text>
//       <Button title="Get FCM Token" onPress={initFCM} />
//     </View>
//     </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import VerifyEmailScreen from './src/screens/VerifyEmailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Signin"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name="VerifyEmail"
            component={VerifyEmailScreen}
          />
          <Stack.Screen name="Home" component={BottomTabNavigator} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
