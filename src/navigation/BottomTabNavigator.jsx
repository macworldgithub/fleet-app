import React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import LogbookScreen from '../screens/LogbookScreen';
import ServicesScreen from '../screens/ServicesScreen';
import AlertScreen from '../screens/AlertScreen';
import VehicleScreen from '../screens/VehicleScreen';

const Tab = createBottomTabNavigator();

// Import your PNG icons
const TAB_ICONS = {
  Home: require('../../assets/icons/Book.png'),
  Logbook: require('../../assets/icons/Book.png'),
  Services: require('../../assets/icons/Service.png'),
  Alert: require('../../assets/icons/alert.png'),
  Vehicle: require('../../assets/icons/vehicle.png'),
};

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused }) => (
          <View
            style={{ alignItems: 'center', justifyContent: 'center', top: 2 }}
          >
            <Image
              source={TAB_ICONS[route.name]}
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? '#EA580C' : '#9CA3AF', // 👈 active/inactive color
                resizeMode: 'contain',
              }}
            />
          </View>
        ),

        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              fontSize: 11,
              fontWeight: focused ? '700' : '500',
              color: focused ? '#EA580C' : '#9CA3AF',
              marginBottom: 2,
            }}
          >
            {route.name}
          </Text>
        ),

        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          height: 70,
          paddingTop: 6,
          paddingBottom: 10,
          elevation: 10,

          // 👇 Rounded top corners like your design
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',

          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
        },

        tabBarActiveTintColor: '#EA580C',
        tabBarInactiveTintColor: '#9CA3AF',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Logbook" component={LogbookScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Alert" component={AlertScreen} />
      <Tab.Screen name="Vehicle" component={VehicleScreen} />
    </Tab.Navigator>
  );
}
