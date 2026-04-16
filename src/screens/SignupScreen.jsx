import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AuthService from '../services/AuthService';
import InputField from '../components/InputField';
import HeaderLogo from '../components/HeaderLogo';
import { BRAND_ORANGE, NAVY_BLUE } from '../config/config';

export default function SignupScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    driverLicenseNumber: '',
    agencyName: '',
  });
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState([]);
  const [showAgencyPicker, setShowAgencyPicker] = useState(false);
  const [loadingAgencies, setLoadingAgencies] = useState(false);

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    setLoadingAgencies(true);
    try {
      const response = await AuthService.getAgencies();
      const agencyList = response.data || response || [];
      setAgencies(Array.isArray(agencyList) ? agencyList : []);
    } catch (error) {
      console.error('Failed to load agencies:', error);
    } finally {
      setLoadingAgencies(false);
    }
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async () => {
    const { fullName, email, password, phoneNumber, agencyName } = formData;
    if (!fullName || !email || !password || !phoneNumber || !agencyName) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    console.log('Starting Signup process with data:', JSON.stringify(formData, null, 2));
    
    try {
      console.log('Calling AuthService.register...');
      const signupData = await AuthService.register(formData);
      console.log('Signup successful, response:', JSON.stringify(signupData, null, 2));
      
      Alert.alert('Success', 'Registration successful! Please verify your email.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('VerifyEmail', { email: formData.email }),
        },
      ]);
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
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
          contentContainerStyle={tw`px-6 py-12`}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <HeaderLogo showSubtitle={false} />

          {/* Form */}
          <View style={tw`bg-white p-6 rounded-3xl border border-gray-100 shadow-lg`}>
            <InputField
              label="FULL NAME"
              placeholder="John Doe"
              value={formData.fullName}
              onChangeText={(val) => handleChange('fullName', val)}
            />

            <InputField
              label="EMAIL ADDRESS"
              placeholder="john@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(val) => handleChange('email', val)}
            />

            <InputField
              label="PASSWORD"
              placeholder="••••••••"
              secureTextEntry
              value={formData.password}
              onChangeText={(val) => handleChange('password', val)}
            />

            <InputField
              label="PHONE NUMBER"
              placeholder="+61 400 123 456"
              keyboardType="phone-pad"
              value={formData.phoneNumber}
              onChangeText={(val) => handleChange('phoneNumber', val)}
            />

            <InputField
              label="DRIVER LICENSE NUMBER"
              placeholder="DL-2024-78916"
              value={formData.driverLicenseNumber}
              onChangeText={(val) => handleChange('driverLicenseNumber', val)}
            />

            {/* Agency Dropdown */}
            <View style={tw`mb-5`}>
              <Text style={tw`text-gray-400 text-xs font-bold mb-2`}>AGENCY NAME</Text>
              <TouchableOpacity
                onPress={() => setShowAgencyPicker(true)}
                style={tw`bg-gray-50 border border-gray-100 p-4 rounded-2xl flex-row justify-between items-center`}
              >
                <Text style={formData.agencyName ? tw`text-gray-900` : tw`text-gray-400`}>
                  {formData.agencyName || (loadingAgencies ? 'Loading agencies...' : 'Select Agency')}
                </Text>
                <Text style={tw`text-gray-400`}>▼</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleSignup}
              disabled={loading}
              activeOpacity={0.8}
              style={[
                tw`py-2 rounded-2xl items-center shadow-lg mt-4`,
                { backgroundColor: BRAND_ORANGE },
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={tw`text-white font-bold text-lg`}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={tw`flex-row justify-center mt-10`}>
            <Text style={tw`text-gray-500`}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <Text style={[tw`font-bold`, { color: BRAND_ORANGE }]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Agency Picker Modal */}
      <Modal
        visible={showAgencyPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAgencyPicker(false)}
      >
        <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-t-3xl p-6 h-2/3`}>
            <View style={tw`flex-row justify-between items-center mb-6`}>
              <Text style={[tw`text-xl font-bold`, { color: NAVY_BLUE }]}>Select Agency</Text>
              <TouchableOpacity onPress={() => setShowAgencyPicker(false)}>
                <Text style={tw`text-gray-500 font-bold text-lg`}>✕</Text>
              </TouchableOpacity>
            </View>
            
            {loadingAgencies ? (
              <ActivityIndicator color={BRAND_ORANGE} size="large" style={tw`mt-10`} />
            ) : agencies.length === 0 ? (
              <Text style={tw`text-center text-gray-500 mt-10`}>No agencies found</Text>
            ) : (
              <FlatList
                data={agencies}
                keyExtractor={(item, index) => item._id || item.id || index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={tw`py-4 border-b border-gray-100 flex-row justify-between items-center`}
                    onPress={() => {
                      const name = item.name || item.agencyName || (typeof item === 'string' ? item : 'Unknown');
                      handleChange('agencyName', name);
                      setShowAgencyPicker(false);
                    }}
                  >
                    <Text style={tw`text-gray-800 text-lg`}>
                      {item.name || item.agencyName || (typeof item === 'string' ? item : 'Unknown')}
                    </Text>
                    {formData.agencyName === (item.name || item.agencyName || item) && (
                      <Text style={{ color: BRAND_ORANGE, fontWeight: 'bold' }}>✓</Text>
                    )}
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
