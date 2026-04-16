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

export default function SigninScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Defaulting role to 'DRIVER' as requested
      const data = await AuthService.login(email, password, 'DRIVER');
      Alert.alert('Success', 'Login successful!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
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

          {/* Form Section */}
          <View
            style={tw`bg-white p-6 rounded-3xl border border-gray-100 shadow-lg`}
          >
            <Text style={[tw`text-xl font-bold mb-6`, { color: NAVY_BLUE }]}>
              Sign In
            </Text>

            <View style={tw`mb-5`}>
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

            <View style={tw`mb-8`}>
              <Text style={tw`text-gray-400 text-xs font-bold mb-2`}>
                PASSWORD
              </Text>
              <TextInput
                style={tw`bg-gray-50 border border-gray-100 p-4 rounded-2xl text-gray-900`}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                style={tw`mt-3 self-end`}
              >
                <Text style={[tw`text-xs font-bold`, { color: BRAND_ORANGE }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
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
                <Text style={tw`text-white font-bold text-lg`}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer Section */}
          <View style={tw`flex-row justify-center mt-10`}>
            <Text style={tw`text-gray-500`}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={[tw`font-bold`, { color: BRAND_ORANGE }]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
