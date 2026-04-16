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

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const data = await AuthService.forgotPassword(email);
      Alert.alert('Success', data.message || 'Password reset link sent to your email.', [
        { text: 'OK', onPress: () => navigation.navigate('Signin') },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
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
              Enter your email address and we'll send you a link to reset your password.
            </Text>
          </View>

          {/* Form */}
          <View style={tw`bg-white p-6 rounded-3xl border border-gray-100 shadow-lg`}>
            <View style={tw`mb-8`}>
              <Text style={tw`text-gray-400 text-xs font-bold mb-2`}>
                EMAIL ADDRESS
              </Text>
              <TextInput
                style={tw`bg-gray-50 border border-gray-100 p-4 rounded-2xl text-gray-900`}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <TouchableOpacity
              onPress={handleReset}
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
                <Text style={tw`text-white font-bold text-lg`}>Forget Password</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={tw`flex-row justify-center mt-10`}>
            <Text style={tw`text-gray-500`}>Remember your password? </Text>
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
