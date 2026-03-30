import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const trips = [
  { id: 1, title: 'Office → Client Site', date: 'Today, 9:30 AM', km: '14.2 km', type: 'Business' },
  { id: 2, title: 'Home → Office', date: 'Today, 8:00 AM', km: '6.8 km', type: 'Business' },
  { id: 3, title: 'Lunch Run', date: 'Yesterday, 12:15 PM', km: '3.4 km', type: 'Personal' },
  { id: 4, title: 'Client Meeting - CBD', date: 'Yesterday, 10:00 AM', km: '22.1 km', type: 'Business' },
  { id: 5, title: 'Airport Drop-off', date: 'Mon, 6:00 AM', km: '38.5 km', type: 'Business' },
];

export default function LogbookScreen() {
  return (
    <ScrollView style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`bg-white px-4 pt-6 pb-4 border-b border-gray-200`}>
        <Text style={tw`text-2xl font-bold text-gray-800`}>Logbook</Text>
        <Text style={tw`text-gray-400 text-sm mt-1`}>All recorded trips</Text>
      </View>

      {/* Summary Row */}
      <View style={tw`flex-row mx-4 mt-4 mb-3`}>
        <View style={tw`flex-1 bg-orange-50 border border-orange-200 rounded-xl p-3 mr-2 items-center`}>
          <Text style={tw`text-xl font-bold text-orange-600`}>85.0</Text>
          <Text style={tw`text-xs text-gray-500`}>Total KM</Text>
        </View>
        <View style={tw`flex-1 bg-green-50 border border-green-200 rounded-xl p-3 mr-2 items-center`}>
          <Text style={tw`text-xl font-bold text-green-600`}>5</Text>
          <Text style={tw`text-xs text-gray-500`}>Trips</Text>
        </View>
        <View style={tw`flex-1 bg-blue-50 border border-blue-200 rounded-xl p-3 items-center`}>
          <Text style={tw`text-xl font-bold text-blue-600`}>4</Text>
          <Text style={tw`text-xs text-gray-500`}>Business</Text>
        </View>
      </View>

      {/* Trip List */}
      <Text style={tw`text-gray-500 font-semibold text-xs px-4 mb-2`}>RECENT TRIPS</Text>
      {trips.map(trip => (
        <TouchableOpacity
          key={trip.id}
          style={tw`bg-white mx-4 mb-2 p-4 rounded-xl border border-gray-100 flex-row justify-between items-center`}
        >
          <View style={tw`flex-1`}>
            <Text style={tw`font-semibold text-gray-800`}>📍 {trip.title}</Text>
            <Text style={tw`text-gray-400 text-xs mt-1`}>{trip.date}</Text>
          </View>
          <View style={tw`items-end`}>
            <Text style={tw`font-bold text-gray-800`}>{trip.km}</Text>
            <Text
              style={[
                tw`text-xs px-2 py-0.5 rounded-full mt-1`,
                trip.type === 'Business'
                  ? tw`bg-green-100 text-green-700`
                  : tw`bg-gray-200 text-gray-600`,
              ]}
            >
              {trip.type}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
