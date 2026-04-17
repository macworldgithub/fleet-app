import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { BRAND_ORANGE, NAVY_BLUE } from '../config/config';

export default function Home({ navigation }) {
  return (
    <ScrollView style={tw`flex-1 bg-gray-100 p-4 mt-14`}>
      {/* Header */}
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <View>
          <Text style={tw`text-gray-500`}>Good Morning</Text>
          <Text style={[tw`text-xl font-bold`, { color: BRAND_ORANGE }]}>
            Sarah Mitchell
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={[tw`w-10 h-10 rounded-full items-center justify-center`, { backgroundColor: BRAND_ORANGE }]}
        >
          <Text style={tw`text-white font-bold `}>SM</Text>
        </TouchableOpacity>
      </View>

      {/* Car Card */}
      <View style={[tw`border rounded-xl p-4 mb-4 bg-white`, { borderColor: BRAND_ORANGE }]}>
        <View style={tw`flex-row justify-between items-center mb-3`}>
          <Text style={tw`font-semibold`}>🚗 2024 BMW X3</Text>
          <Text
            style={[tw`text-white px-3 py-1 rounded-full text-xs`, { backgroundColor: '#10B981' }]}
          >
            Active
          </Text>
        </View>

        <Text style={tw`text-gray-400 text-xs mb-3`}>ABC 123 - VIC</Text>

        <View style={tw`flex-row justify-between`}>
          <View style={tw`bg-gray-100 p-3 rounded-lg items-center w-24`}>
            <Text>⏱</Text>
            <Text style={tw`font-bold`}>42,380</Text>
            <Text style={tw`text-xs text-gray-400`}>Odometer</Text>
          </View>

          <View style={tw`bg-gray-100 p-3 rounded-lg items-center w-24`}>
            <Text>⛽</Text>
            <Text style={tw`font-bold`}>8.2</Text>
            <Text style={tw`text-xs text-gray-400`}>L/100km</Text>
          </View>

          <View style={tw`bg-gray-100 p-3 rounded-lg items-center w-24`}>
            <Text>📈</Text>
            <Text style={tw`font-bold`}>1,240</Text>
            <Text style={tw`text-xs text-gray-400`}>KM</Text>
          </View>
        </View>
      </View>

      {/* Active Alerts */}
      <Text style={tw`text-gray-500 font-semibold mb-2`}>ACTIVE ALERTS</Text>

      <TouchableOpacity
        style={[tw`border bg-white p-3 rounded-lg mb-2 flex-row justify-between`, { borderColor: '#FDBA74' }]}
      >
        <Text>🟠 Service due in 320 km</Text>
        <Text>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[tw`border bg-white p-3 rounded-lg mb-4 flex-row justify-between`, { borderColor: '#86EFAC' }]}
      >
        <Text>🟢 Rego expires 15 Mar 2026</Text>
        <Text>›</Text>
      </TouchableOpacity>

      {/* Recent Trips */}
      <View style={tw`flex-row justify-between mb-2`}>
        <Text style={tw`text-gray-500 font-semibold`}>RECENT TRIPS</Text>
        <Text style={tw`text-gray-400 text-xs`}>View All</Text>
      </View>

      {[1, 2, 3].map(item => (
        <View
          key={item}
          style={[tw`bg-white border p-3 rounded-lg mb-2 flex-row justify-between items-center`, { borderColor: '#FED7AA' }]}
        >
          <View>
            <Text style={tw`font-medium`}>
              📍 Office 12 Chapel St Inspection
            </Text>
            <Text style={tw`text-gray-400 text-xs`}>2h ago</Text>
          </View>

          <View style={tw`items-end`}>
            <Text style={tw`font-bold`}>14.2 km</Text>
            <Text
              style={[tw`text-white px-2 py-0.5 rounded-full text-xs`, { backgroundColor: '#10B981' }]}
            >
              Business
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
