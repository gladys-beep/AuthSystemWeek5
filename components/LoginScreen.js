import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { validateEmail, validateLoginPassword } from './validators';

export default function LoginScreen({ onNavigateRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
    if (text && !validateEmail(text)) {
      setEmailError('Format email tidak valid (harus ada @ dan domain)');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text && !validateLoginPassword(text)) {
      setPasswordError('Password minimal 6 karakter');
    } else {
      setPasswordError('');
    }
  };

  const isFormValid =
    validateEmail(email) &&
    validateLoginPassword(password) &&
    !emailError &&
    !passwordError;

  const handleLogin = async () => {
    if (!isFormValid) {
      alert('Mohon lengkapi form dengan benar!');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert('Login Berhasil!');
    } catch (err) {
      alert('Login Gagal, periksa koneksi Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Selamat Datang</Text>
          <Text style={styles.subtitle}>Masuk untuk melanjutkan</Text>

          {/* Email Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'email' && styles.inputFocused,
                emailError && styles.inputError,
              ]}
              placeholder="nama@email.com"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={handleEmailChange}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              editable={!isLoading}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          {/* Password Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'password' && styles.inputFocused,
                passwordError && styles.inputError,
              ]}
              placeholder="Minimal 6 karakter"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              value={password}
              onChangeText={handlePasswordChange}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              editable={!isLoading}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, (!isFormValid || isLoading) && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={!isFormValid || isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Loading...' : 'Masuk'}
            </Text>
          </TouchableOpacity>

          {/* Navigation to Register */}
          <View style={styles.navContainer}>
            <Text style={styles.navText}>Belum punya akun? </Text>
            <TouchableOpacity onPress={onNavigateRegister}>
              <Text style={styles.navLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContent: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, elevation: 3 },
  title: { fontSize: 28, fontWeight: '700', color: '#00b894', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#999', marginBottom: 25 },
  formGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    padding: 14,
    borderRadius: 8,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  inputFocused: { borderColor: '#00b894' },
  inputError: { borderColor: '#f44336' },
  errorText: { color: '#f44336', fontSize: 12, marginTop: 6 },
  button: {
    backgroundColor: '#00b894',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  navContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  navText: { fontSize: 13, color: '#777' },
  navLink: { fontSize: 13, color: '#00b894', fontWeight: '700' },
}); 