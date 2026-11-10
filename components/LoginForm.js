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
  Switch,
} from 'react-native';

export default function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    rememberMe: false,
    errors: { email: '', password: '' },
    isLoading: false,
  });

  const [focusedInput, setFocusedInput] = useState(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Hitung kekuatan password (1 - 4)
  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength += 1;
    if (/[A-Z]/.test(pwd)) strength += 1;
    if (/[0-9]/.test(pwd)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 1;
    return strength;
  };

  const getStrengthLabel = (score) => {
    switch (score) {
      case 1: return { text: 'Lemah', color: '#f44336', width: '25%' };
      case 2: return { text: 'Cukup', color: '#ff9800', width: '50%' };
      case 3: return { text: 'Kuat', color: '#2196f3', width: '75%' };
      case 4: return { text: 'Sangat Kuat', color: '#00b894', width: '100%' };
      default: return { text: 'Sangat Lemah', color: '#ccc', width: '10%' };
    }
  };

  const handleEmailChange = (text) => {
    setForm((prev) => ({
      ...prev,
      email: text,
      errors: {
        ...prev.errors,
        email: text && !validateEmail(text) ? 'Format email tidak valid' : '',
      },
    }));
  };

  const handlePasswordChange = (text) => {
    setForm((prev) => ({
      ...prev,
      password: text,
      errors: {
        ...prev.errors,
        password: text && text.length < 6 ? 'Minimal 6 karakter' : '',
      },
    }));
  };

  const handleLogin = async () => {
    if (!validateEmail(form.email) || form.password.length < 6) {
      alert('Mohon perbaiki error pada form terlebih dahulu!');
      return;
    }

    setForm((prev) => ({ ...prev, isLoading: true }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(`Login Berhasil! (Remember Me: ${form.rememberMe ? 'Ya' : 'Tidak'})`);
    } catch (err) {
      alert('Login Gagal, periksa koneksi Anda.');
    } finally {
      setForm((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const strengthScore = getPasswordStrength(form.password);
  const strengthInfo = getStrengthLabel(strengthScore);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Selamat Datang</Text>
          <Text style={styles.subtitle}>Masuk untuk melanjutkan ke aplikasi</Text>

          {/* Email Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'email' && styles.inputFocused,
                form.errors.email && styles.inputError,
              ]}
              placeholder="nama@email.com"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={handleEmailChange}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              editable={!form.isLoading}
            />
            {form.errors.email ? <Text style={styles.errorText}>{form.errors.email}</Text> : null}
          </View>

          {/* Password Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'password' && styles.inputFocused,
                form.errors.password && styles.inputError,
              ]}
              placeholder="Minimal 6 karakter"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              value={form.password}
              onChangeText={handlePasswordChange}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              editable={!form.isLoading}
            />
            {form.errors.password ? <Text style={styles.errorText}>{form.errors.password}</Text> : null}

            {/* 3. Strength Meter untuk Password */}
            {form.password.length > 0 && (
              <View style={styles.strengthContainer}>
                <View style={styles.strengthBarBackground}>
                  <View
                    style={[
                      styles.strengthBarFill,
                      { width: strengthInfo.width, backgroundColor: strengthInfo.color },
                    ]}
                  />
                </View>
                <Text style={[styles.strengthText, { color: strengthInfo.color }]}>
                  Kekuatan: {strengthInfo.text}
                </Text>
              </View>
            )}
          </View>

          {/* 4. "Remember me" Checkbox / Switch */}
          <View style={styles.rowBetween}>
            <View style={styles.rememberContainer}>
              <Switch
                value={form.rememberMe}
                onValueChange={(val) => setForm((prev) => ({ ...prev, rememberMe: val }))}
                trackColor={{ false: '#ccc', true: '#00b894' }}
              />
              <Text style={styles.rememberText}>Ingat Saya</Text>
            </View>

            {/* 1. "Forgot Password?" Link */}
            <TouchableOpacity onPress={() => alert('Navigasi ke halaman Lupa Password')}>
              <Text style={styles.forgotText}>Lupa Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, form.isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={form.isLoading}
          >
            <Text style={styles.buttonText}>
              {form.isLoading ? 'Memuat...' : 'Masuk'}
            </Text>
          </TouchableOpacity>

          {/* 2. "Sign Up" Navigation */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupLabel}>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => alert('Navigasi ke halaman Register')}>
              <Text style={styles.signupLink}>Daftar di sini</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#00b894',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  inputFocused: {
    borderColor: '#00b894',
  },
  inputError: {
    borderColor: '#f44336',
  },
  errorText: {
    color: '#f44336',
    fontSize: 12,
    marginTop: 4,
  },
  strengthContainer: {
    marginTop: 8,
  },
  strengthBarBackground: {
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  strengthBarFill: {
    height: '100%',
  },
  strengthText: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 8,
    fontSize: 13,
    color: '#555',
  },
  forgotText: {
    fontSize: 13,
    color: '#00b894',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#00b894',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupLabel: {
    fontSize: 13,
    color: '#777',
  },
  signupLink: {
    fontSize: 13,
    color: '#00b894',
    fontWeight: '700',
  },
});