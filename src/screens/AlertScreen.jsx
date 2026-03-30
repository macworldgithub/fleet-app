import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const alerts = [
  {
    id: 1,
    icon: '🟠',
    title: 'Service due in 320 km',
    desc: 'Oil change required · 2024 BMW X3',
    time: '2 hours ago',
    severity: 'warning',
  },
  {
    id: 2,
    icon: '🟢',
    title: 'Rego expires 15 Mar 2026',
    desc: 'Registration renewal upcoming · ABC 123',
    time: '1 day ago',
    severity: 'info',
  },
  {
    id: 3,
    icon: '🔴',
    title: 'Tyre pressure low — Rear Left',
    desc: 'Pressure: 27 PSI (recommended: 35 PSI)',
    time: '3 hours ago',
    severity: 'danger',
  },
  {
    id: 4,
    icon: '🟡',
    title: 'Fuel level below 15%',
    desc: 'Estimated range: 62 km remaining',
    time: '30 minutes ago',
    severity: 'warning',
  },
  {
    id: 5,
    icon: '🟢',
    title: 'Tyre rotation completed',
    desc: 'Serviced at AutoCentre Southbank',
    time: '3 days ago',
    severity: 'success',
  },
];

const severityBorder = {
  danger: tw`border-red-300`,
  warning: tw`border-orange-300`,
  info: tw`border-green-300`,
  success: tw`border-green-200`,
};

export default function AlertScreen() {
  return (
    <ScrollView style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`bg-white px-4 pt-6 pb-4 border-b border-gray-200`}>
        <Text style={tw`text-2xl font-bold text-gray-800`}>Alerts</Text>
        <Text style={tw`text-gray-400 text-sm mt-1`}>
          {alerts.length} active notifications
        </Text>
      </View>

      {/* Alert Cards */}
      <View style={tw`mt-4 px-4`}>
        <Text style={tw`text-gray-500 font-semibold text-xs mb-2`}>
          ACTIVE ALERTS
        </Text>
        {alerts.map(alert => (
          <TouchableOpacity
            key={alert.id}
            style={[
              tw`bg-white p-4 rounded-xl mb-2 border flex-row items-start`,
              severityBorder[alert.severity],
            ]}
          >
            <Text style={tw`text-lg mr-3 mt-0.5`}>{alert.icon}</Text>
            <View style={tw`flex-1`}>
              <Text style={tw`font-semibold text-gray-800`}>{alert.title}</Text>
              <Text style={tw`text-gray-500 text-xs mt-0.5`}>{alert.desc}</Text>
              <Text style={tw`text-gray-400 text-xs mt-1`}>{alert.time}</Text>
            </View>
            <Text style={tw`text-gray-400 text-lg`}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
