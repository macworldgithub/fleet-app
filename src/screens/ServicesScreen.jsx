import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const services = [
  { id: 1, name: 'Oil Change', due: '320 km', status: 'Due Soon', color: 'orange' },
  { id: 2, name: 'Tyre Rotation', due: '1,200 km', status: 'Upcoming', color: 'blue' },
  { id: 3, name: 'Brake Inspection', due: '2,500 km', status: 'Good', color: 'green' },
  { id: 4, name: 'Air Filter', due: '5,000 km', status: 'Good', color: 'green' },
  { id: 5, name: 'Registration Renewal', due: '15 Mar 2026', status: 'Upcoming', color: 'blue' },
];

const statusStyle = {
  'Due Soon': { bg: tw`bg-orange-100`, text: tw`text-orange-600` },
  Upcoming: { bg: tw`bg-blue-100`, text: tw`text-blue-600` },
  Good: { bg: tw`bg-green-100`, text: tw`text-green-600` },
};

export default function ServicesScreen() {
  return (
    <ScrollView style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`bg-white px-4 pt-6 pb-4 border-b border-gray-200`}>
        <Text style={tw`text-2xl font-bold text-gray-800`}>Services</Text>
        <Text style={tw`text-gray-400 text-sm mt-1`}>Maintenance & reminders</Text>
      </View>

      {/* Next Service Banner */}
      <View style={tw`bg-orange-600 mx-4 mt-4 mb-3 p-4 rounded-xl`}>
        <Text style={tw`text-white text-xs font-semibold`}>NEXT SERVICE</Text>
        <Text style={tw`text-white text-lg font-bold mt-1`}>🔧 Oil Change</Text>
        <Text style={tw`text-orange-200 text-sm`}>Due in 320 km · 2024 BMW X3</Text>
      </View>

      {/* Services List */}
      <Text style={tw`text-gray-500 font-semibold text-xs px-4 mb-2`}>ALL SERVICES</Text>
      {services.map(service => {
        const style = statusStyle[service.status] || statusStyle['Good'];
        return (
          <TouchableOpacity
            key={service.id}
            style={tw`bg-white mx-4 mb-2 p-4 rounded-xl border border-gray-100 flex-row justify-between items-center`}
          >
            <View>
              <Text style={tw`font-semibold text-gray-800`}>{service.name}</Text>
              <Text style={tw`text-gray-400 text-xs mt-1`}>Due: {service.due}</Text>
            </View>
            <View style={[tw`px-3 py-1 rounded-full`, style.bg]}>
              <Text style={[tw`text-xs font-semibold`, style.text]}>{service.status}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
