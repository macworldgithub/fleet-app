import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL as BASE_URL } from '../config/config';

const logRequest = (type, payload) => {
  console.log(`\n[API REQUEST] - ${type}:`, JSON.stringify(payload, null, 2));
};

const logResponse = (type, response) => {
  console.log(`[API RESPONSE] - ${type}:`, JSON.stringify(response, null, 2));
};

const AuthService = {
  login: async (email, password) => {
    const payload = { email, password };
    logRequest('LOGIN', payload);

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      logResponse('LOGIN', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.token) {
        await AsyncStorage.setItem('userToken', data.token);
        const userToStore = data.user || data.driver || data;
        await AsyncStorage.setItem('userData', JSON.stringify(userToStore));
      }

      return data;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  },

  register: async (form) => {
    console.log('\n[API REQUEST] - REGISTER START');
    try {
      const data = new FormData();
      data.append('fullName', form.fullName || '');
      data.append('email', form.email || '');
      data.append('password', form.password || '');
      data.append('phoneNumber', form.phoneNumber || '');
      data.append('driverLicenseNumber', form.driverLicenseNumber || '');
      data.append('agencyName', form.agencyName || '');

      console.log('FormData prepared, calling fetch...');

      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'accept': '*/*',
        },
        body: data,
      });

      const result = await response.json();
      logResponse('REGISTER', result);

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      return result;
    } catch (error) {
      console.error('Register Error:', error);
      throw error;
    }
  },

  verifyOtp: async (email, otp) => {
    const payload = { email, otp };
    logRequest('VERIFY_OTP', payload);

    try {
      const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      logResponse('VERIFY_OTP', result);

      if (!response.ok) {
        throw new Error(result.message || 'OTP verification failed');
      }

      return result;
    } catch (error) {
      console.error('Verify OTP Error:', error);
      throw error;
    }
  },

  forgotPassword: async (email) => {
    const payload = { email };
    logRequest('FORGOT_PASSWORD', payload);

    try {
      const response = await fetch(`${BASE_URL}/auth/forgot-password-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      logResponse('FORGOT_PASSWORD', data);

      if (!response.ok) {
        throw new Error(data.message || 'Password reset request failed');
      }

      return data;
    } catch (error) {
      console.error('Forgot Password Error:', error);
      throw error;
    }
  },

  getAgencies: async () => {
    logRequest('GET_AGENCIES', {});
    try {
      const response = await fetch(`${BASE_URL}/agencies`, {
        method: 'GET',
        headers: {
          'accept': '*/*',
        },
      });

      const data = await response.json();
      logResponse('GET_AGENCIES', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch agencies');
      }

      return data;
    } catch (error) {
      console.error('Get Agencies Error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userData']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  getUser: async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  },

  getToken: async () => {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      return null;
    }
  },
};

export default AuthService;
