import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AuthService from '../services/AuthService';
import { BRAND_ORANGE, NAVY_BLUE } from '../config/config';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      // Get the local cached user to find the ID
      const localUser = await AuthService.getUser();
      console.log('Local user data:', JSON.stringify(localUser, null, 2));

      // Sometimes APIs return the ID nested or under different names
      const userId = localUser?._id
        || localUser?.id
        || localUser?.userId
        || localUser?.user?._id
        || localUser?.user?.id;

      if (!userId) {
        Alert.alert('Error', 'User ID not found. Please log in again.');
        setLoading(false);
        return;
      }

      // Fetch fresh profile data using the endpoint
      const profileData = await AuthService.getUserById(userId);
      setUser(profileData?.user || profileData?.data || profileData);
    } catch (error) {
      console.error('Failed to load profile:', error);
      Alert.alert('Error', 'Failed to retrieve profile data.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AuthService.logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Signin' }],
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <ScrollView contentContainerStyle={tw`p-6`} showsVerticalScrollIndicator={false}>
        <View style={tw`flex-row items-center mb-8`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 mr-2`}>
            <Text style={tw`text-2xl font-bold`}>‹</Text>
          </TouchableOpacity>
          <Text style={[tw`text-2xl font-bold`, { color: NAVY_BLUE }]}>My Profile</Text>
        </View>

        {loading ? (
          <ActivityIndicator color={BRAND_ORANGE} size="large" style={tw`mt-10`} />
        ) : (
          <View style={tw`bg-white p-6 rounded-3xl border border-gray-100 shadow-md mb-6`}>
            {/* Profile Avatar */}
            <View style={tw`items-center mb-6`}>
              <View style={[tw`w-20 h-20 rounded-full items-center justify-center mb-3`, { backgroundColor: BRAND_ORANGE }]}>
                <Text style={tw`text-white text-3xl font-bold px-1`}>
                  {user?.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'US'}
                </Text>
              </View>
              <Text style={[tw`text-xl font-bold`, { color: NAVY_BLUE }]}>
                {user?.fullName || 'Driver Name'}
              </Text>
              <Text style={tw`text-gray-500 font-medium`}>{user?.role || 'DRIVER'}</Text>
            </View>

            {/* Profile Info Fields */}
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-400 text-xs font-bold mb-1`}>EMAIL</Text>
              <Text style={tw`text-gray-800 text-base font-medium`}>{user?.email || 'N/A'}</Text>
            </View>

            <View style={tw`h-px bg-gray-100 my-3`} />

            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-400 text-xs font-bold mb-1`}>PHONE NUMBER</Text>
              <Text style={tw`text-gray-800 text-base font-medium`}>{user?.phoneNumber || 'N/A'}</Text>
            </View>

            <View style={tw`h-px bg-gray-100 my-3`} />

            <View style={tw`mb-2`}>
              <Text style={tw`text-gray-400 text-xs font-bold mb-1`}>DRIVER LICENSE</Text>
              <Text style={tw`text-gray-800 text-base font-medium`}>{user?.driverLicenseNumber || 'N/A'}</Text>
            </View>
          </View>
        )}

        <View style={tw`mt-2`}>
          <TouchableOpacity
            style={tw`bg-white p-4 rounded-xl border border-gray-100 flex-row justify-between items-center mb-4`}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-lg mr-3`}>🔒</Text>
              <Text style={tw`text-lg font-medium text-gray-800`}>Change Password</Text>
            </View>
            <Text style={tw`text-gray-400 text-lg`}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`bg-red-50 p-4 rounded-xl border border-red-100 flex-row justify-between items-center`}
            onPress={handleLogout}
          >
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-lg mr-3`}>🚪</Text>
              <Text style={tw`text-lg font-bold text-red-600`}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
