import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const vehicles = [
  {
    id: 1,
    name: '2024 BMW X3',
    plate: 'ABC 123 - VIC',
    status: 'Active',
    odometer: '42,380 km',
    fuel: '8.2 L/100km',
    statusColor: tw`bg-green-500`,
  },
  {
    id: 2,
    name: '2022 Toyota HiLux',
    plate: 'XYZ 789 - VIC',
    status: 'Parked',
    odometer: '67,210 km',
    fuel: '10.1 L/100km',
    statusColor: tw`bg-blue-500`,
  },
  {
    id: 3,
    name: '2021 Ford Ranger',
    plate: 'DEF 456 - NSW',
    status: 'Maintenance',
    odometer: '91,540 km',
    fuel: '11.4 L/100km',
    statusColor: tw`bg-orange-500`,
  },
];

export default function VehicleScreen() {
  return (
    <ScrollView style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`bg-white px-4 pt-6 pb-4 border-b border-gray-200`}>
        <Text style={tw`text-2xl font-bold text-gray-800`}>Vehicles</Text>
        <Text style={tw`text-gray-400 text-sm mt-1`}>
          {vehicles.length} vehicles in fleet
        </Text>
      </View>

      {/* Fleet Summary */}
      <View style={tw`flex-row mx-4 mt-4 mb-3`}>
        <View style={tw`flex-1 bg-green-50 border border-green-200 rounded-xl p-3 mr-2 items-center`}>
          <Text style={tw`text-xl font-bold text-green-600`}>1</Text>
          <Text style={tw`text-xs text-gray-500`}>Active</Text>
        </View>
        <View style={tw`flex-1 bg-blue-50 border border-blue-200 rounded-xl p-3 mr-2 items-center`}>
          <Text style={tw`text-xl font-bold text-blue-600`}>1</Text>
          <Text style={tw`text-xs text-gray-500`}>Parked</Text>
        </View>
        <View style={tw`flex-1 bg-orange-50 border border-orange-200 rounded-xl p-3 items-center`}>
          <Text style={tw`text-xl font-bold text-orange-600`}>1</Text>
          <Text style={tw`text-xs text-gray-500`}>In Service</Text>
        </View>
      </View>

      {/* Vehicle List */}
      <Text style={tw`text-gray-500 font-semibold text-xs px-4 mb-2`}>
        ALL VEHICLES
      </Text>
      {vehicles.map(v => (
        <TouchableOpacity
          key={v.id}
          style={tw`bg-white mx-4 mb-3 p-4 rounded-xl border border-orange-100`}
        >
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`font-bold text-gray-800`}>🚗 {v.name}</Text>
            <View style={[tw`px-3 py-1 rounded-full`, v.statusColor]}>
              <Text style={tw`text-white text-xs font-semibold`}>{v.status}</Text>
            </View>
          </View>
          <Text style={tw`text-gray-400 text-xs mb-3`}>{v.plate}</Text>
          <View style={tw`flex-row justify-between`}>
            <View style={tw`bg-gray-100 px-3 py-2 rounded-lg items-center`}>
              <Text style={tw`font-bold text-gray-700 text-sm`}>{v.odometer}</Text>
              <Text style={tw`text-xs text-gray-400`}>Odometer</Text>
            </View>
            <View style={tw`bg-gray-100 px-3 py-2 rounded-lg items-center`}>
              <Text style={tw`font-bold text-gray-700 text-sm`}>{v.fuel}</Text>
              <Text style={tw`text-xs text-gray-400`}>Fuel Use</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
