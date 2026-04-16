import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AuthService from '../services/AuthService';
import HeaderLogo from '../components/HeaderLogo';
import { BRAND_ORANGE, NAVY_BLUE } from '../config/config';

export default function VerifyEmailScreen({ route, navigation }) {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp || otp.length < 4) {
      Alert.alert('Error', 'Please enter a valid OTP');
      return;
    }

    setLoading(true);
    try {
      const data = await AuthService.verifyOtp(email, otp);
      Alert.alert('Success', data.message || 'Email verified successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Signin') },
      ]);
    } catch (error) {
      Alert.alert('Verification Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <ScrollView
          contentContainerStyle={tw`flex-grow justify-center px-6 pb-12`}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <HeaderLogo showSubtitle={false} />
          
          <View style={tw`items-center mb-10`}>
            <Text style={tw`text-gray-500 mt-6 text-center px-6`}>
              We've sent a verification code to your email. Please enter the OTP below to verify your account.
            </Text>
            <Text style={[tw`font-bold mt-2`, { color: NAVY_BLUE }]}>
              {email}
            </Text>
          </View>

          {/* OTP Form */}
          <View style={tw`bg-white p-6 rounded-3xl border border-gray-100 shadow-lg`}>
            <Text style={[tw`text-xl font-bold mb-6`, { color: NAVY_BLUE }]}>
              Verify Email
            </Text>

            <View style={tw`mb-8`}>
              <Text style={tw`text-gray-400 text-xs font-bold mb-2`}>
                ENTER OTP
              </Text>
              <TextInput
                style={tw`bg-gray-50 border border-gray-100 p-4 rounded-2xl text-gray-900 text-center text-lg`}
                placeholder="Enter 6-digit OTP"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
              />
            </View>

            <TouchableOpacity
              onPress={handleVerify}
              disabled={loading}
              activeOpacity={0.8}
              style={[
                tw`py-2 rounded-2xl items-center shadow-lg`,
                { backgroundColor: BRAND_ORANGE },
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={tw`text-white font-bold text-lg`}>Verify</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={tw`flex-row justify-center mt-10`}>
            <Text style={tw`text-gray-500`}>Already verified? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <Text style={[tw`font-bold`, { color: BRAND_ORANGE }]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
