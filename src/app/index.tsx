import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LoginScreen from '../../components/LoginScreen';
import RegisterScreen from '../../components/RegisterScreen';

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register'>('login');

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen === 'login' ? (
        <LoginScreen onNavigateRegister={() => setCurrentScreen('register')} />
      ) : (
        <RegisterScreen onNavigateLogin={() => setCurrentScreen('login')} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});