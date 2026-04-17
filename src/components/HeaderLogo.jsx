import React from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { BRAND_ORANGE, NAVY_BLUE } from '../config/config';

export default function HeaderLogo({ showSubtitle = true }) {
  return (
    <View style={tw`items-center mb-10`}>
      <View style={tw`flex-row items-center`}>
        <View
          style={[
            tw`px-4 py-3 rounded-xl shadow-lg mr-4`,
            { backgroundColor: BRAND_ORANGE },
          ]}
        >
          <Text style={tw`text-white font-bold text-xl`}>AG</Text>
        </View>
        <View>
          <Text
            style={[
              tw`font-bold text-2xl`,
              { color: NAVY_BLUE, lineHeight: 28 },
            ]}
          >
            Agency Garage
          </Text>
          <Text
            style={[
              tw`text-xs font-bold mt-1`,
              { color: BRAND_ORANGE, letterSpacing: 4 },
            ]}
          >
            FLEET360
          </Text>
        </View>
      </View>
      {showSubtitle && (
        <Text style={tw`text-gray-500 mt-6 text-center px-6`}>
          Agency Garage internal fleet tracking platform.
        </Text>
      )}
    </View>
  );
}
