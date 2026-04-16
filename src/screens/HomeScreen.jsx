import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AuthService from '../services/AuthService';

const BRAND_ORANGE = '#C46A0A';
const NAVY_BLUE = '#0F172A';

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    await AuthService.logout();
    navigation.navigate('Signin');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white items-center justify-center px-6`}>
      <View style={tw`items-center mb-10`}>
        <View style={tw`flex-row items-center mb-8`}>
          <View style={[tw`px-4 py-3 rounded-xl shadow-lg mr-4`, { backgroundColor: BRAND_ORANGE }]}>
            <Text style={tw`text-white font-bold text-xl`}>AG</Text>
          </View>
          <View>
            <Text style={[tw`font-bold text-2xl leading-none`, { color: NAVY_BLUE }]}>Agency Garage</Text>
            <Text style={[tw`text-xs font-bold mt-1`, { color: BRAND_ORANGE, letterSpacing: 4 }]}>FLEET360</Text>
          </View>
        </View>
        
        <Text style={[tw`text-3xl font-bold text-center`, { color: NAVY_BLUE }]}>Welcome Back!</Text>
        <Text style={tw`text-gray-500 mt-2 text-center`}>You are successfully logged in as a Driver.</Text>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        style={[tw`py-4 px-10 rounded-2xl items-center shadow-lg`, { backgroundColor: BRAND_ORANGE }]}
      >
        <Text style={tw`text-white font-bold text-lg`}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
