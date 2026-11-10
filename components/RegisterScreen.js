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
import { validateEmail, validateName, validateRegisterPassword } from './validators';

export default function RegisterScreen({ onNavigateLogin }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    errors: {},
    isLoading: false,
  });

  const [focusedInput, setFocusedInput] = useState(null);

  const handleNameChange = (text) => {
    setForm((prev) => ({
      ...prev,
      name: text,
      errors: {
        ...prev.errors,
        name: text && !validateName(text) ? 'Minimal 3 karakter, tanpa angka/simbol' : '',
      },
    }));
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
    const passwordError = validateRegisterPassword(text);
    setForm((prev) => ({
      ...prev,
      password: text,
      errors: {
        ...prev.errors,
        password: text ? passwordError : '',
      },
    }));
  };

  const handleConfirmPasswordChange = (text) => {
    setForm((prev) => ({
      ...prev,
      confirmPassword: text,
      errors: {
        ...prev.errors,
        confirmPassword: text && text !== prev.password ? 'Password tidak cocok' : '',
      },
    }));
  };

  const isFormValid =
    validateName(form.name) &&
    validateEmail(form.email) &&
    !validateRegisterPassword(form.password) &&
    form.password === form.confirmPassword &&
    form.agreeTerms;

  const handleRegister = async () => {
    if (!isFormValid) {
      alert('Mohon periksa kembali form atau setujui Syarat & Ketentuan!');
      return;
    }

    setForm((prev) => ({ ...prev, isLoading: true }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert('Registrasi Berhasil!');
      onNavigateLogin();
    } catch (err) {
      alert('Registrasi Gagal.');
    } finally {
      setForm((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Buat Akun</Text>
          <Text style={styles.subtitle}>Daftar untuk mulai menggunakan aplikasi</Text>

          {/* Full Name Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'name' && styles.inputFocused,
                form.errors.name && styles.inputError,
              ]}
              placeholder="Masukkan nama lengkap"
              placeholderTextColor="#aaa"
              value={form.name}
              onChangeText={handleNameChange}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
              editable={!form.isLoading}
            />
            {form.errors.name ? <Text style={styles.errorText}>{form.errors.name}</Text> : null}
          </View>

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
              placeholder="Min 8 karakter, ada huruf besar & angka"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              value={form.password}
              onChangeText={handlePasswordChange}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              editable={!form.isLoading}
            />
            {form.errors.password ? <Text style={styles.errorText}>{form.errors.password}</Text> : null}
          </View>

          {/* Confirm Password Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Konfirmasi Password</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'confirmPassword' && styles.inputFocused,
                form.errors.confirmPassword && styles.inputError,
              ]}
              placeholder="Ulangi password"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              value={form.confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              onFocus={() => setFocusedInput('confirmPassword')}
              onBlur={() => setFocusedInput(null)}
              editable={!form.isLoading}
            />
            {form.errors.confirmPassword ? <Text style={styles.errorText}>{form.errors.confirmPassword}</Text> : null}
          </View>

          {/* Checkbox Terms & Conditions */}
          <View style={styles.termsContainer}>
            <Switch
              value={form.agreeTerms}
              onValueChange={(val) => setForm((prev) => ({ ...prev, agreeTerms: val }))}
              trackColor={{ false: '#ccc', true: '#00b894' }}
            />
            <Text style={styles.termsText}>I agree with Terms & Conditions</Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, (!isFormValid || form.isLoading) && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={!isFormValid || form.isLoading}
          >
            <Text style={styles.buttonText}>
              {form.isLoading ? 'Loading...' : 'Daftar Sekarang'}
            </Text>
          </TouchableOpacity>

          {/* Navigation to Login */}
          <View style={styles.navContainer}>
            <Text style={styles.navText}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={onNavigateLogin}>
              <Text style={styles.navLink}>Login</Text>
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
  subtitle: { fontSize: 14, color: '#999', marginBottom: 20 },
  formGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  inputFocused: { borderColor: '#00b894' },
  inputError: { borderColor: '#f44336' },
  errorText: { color: '#f44336', fontSize: 12, marginTop: 4 },
  termsContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  termsText: { marginLeft: 10, fontSize: 13, color: '#555' },
  button: {
    backgroundColor: '#00b894',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  navContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 15 },
  navText: { fontSize: 13, color: '#777' },
  navLink: { fontSize: 13, color: '#00b894', fontWeight: '700' },
});