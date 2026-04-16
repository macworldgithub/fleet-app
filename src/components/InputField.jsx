import React from 'react';
import { View, Text, TextInput } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function InputField({ label, ...props }) {
  return (
    <View style={tw`mb-5`}>
      <Text style={tw`text-gray-400 text-xs font-bold mb-2`}>{label}</Text>
      <TextInput
        style={tw`bg-gray-50 border border-gray-100 p-4 rounded-2xl text-gray-900`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
    </View>
  );
}
