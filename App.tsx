import React from 'react';
import { View, Text } from 'react-native';
import tw from './src/utils/tw';

export default function Home() {
  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <Text style={tw`text-lg font-bold text-blue-500`}>
        Tailwind Working 🚀
      </Text>
    </View>
  );
}
