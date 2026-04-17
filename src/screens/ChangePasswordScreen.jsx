import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AuthService from '../services/AuthService';
import InputField from '../components/InputField';
import { BRAND_ORANGE, NAVY_BLUE } from '../config/config';

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const response = await AuthService.changePassword(currentPassword, newPassword);
      Alert.alert('Success', response.message || 'Password changed successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to change password');
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
        <ScrollView contentContainerStyle={tw`p-6`} showsVerticalScrollIndicator={false}>
          <View style={tw`flex-row items-center mb-8`}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 mr-2`}>
              <Text style={tw`text-2xl font-bold`}>‹</Text>
            </TouchableOpacity>
            <Text style={[tw`text-2xl font-bold`, { color: NAVY_BLUE }]}>Change Password</Text>
          </View>

          <Text style={tw`text-gray-500 mb-8`}>
            Your new password must be different from previous used passwords.
          </Text>

          <View style={tw`bg-white p-6 rounded-3xl border border-gray-100 shadow-md`}>
            <InputField
              label="CURRENT PASSWORD"
              placeholder="Enter current password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />

            <InputField
              label="NEW PASSWORD"
              placeholder="Enter new password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <TouchableOpacity
              onPress={handleChangePassword}
              disabled={loading}
              activeOpacity={0.8}
              style={[
                tw`py-3 rounded-2xl items-center shadow-lg mt-4`,
                { backgroundColor: BRAND_ORANGE },
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={tw`text-white font-bold text-lg`}>Update Password</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
