import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { loginWithEmailAndPassword } from '../utils/firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Reset error message
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    
    // Set loading state
    setLoading(true);
    
    // Authenticate with Firebase
    try {
      const { user, error: loginError } = await loginWithEmailAndPassword(email, password);
      
      if (loginError) {
        // Handle specific Firebase error messages
        if (loginError.includes('user-not-found')) {
          setError('Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.');
        } else if (loginError.includes('wrong-password')) {
          setError('Hatalı şifre girdiniz.');
        } else if (loginError.includes('invalid-email')) {
          setError('Geçersiz e-posta adresi.');
        } else {
          setError('Giriş yapılırken bir hata oluştu: ' + loginError);
        }
      } else if (user) {
        // Navigate to main screen on successful login
        navigation.navigate('Main');
      }
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidView}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Geri</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.formContainer}>
            <Image 
              source={require('../assets/zodiac-logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Giriş Yap</Text>
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="E-posta"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Şifre"
                placeholderTextColor="#666"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!loading}
              />
              
              <TouchableOpacity onPress={() => {/* TODO: Implement forgot password */}} disabled={loading}>
                <Text style={styles.forgotPassword}>Şifremi Unuttum</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Giriş Yap</Text>
              )}
            </TouchableOpacity>
            
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Hesabınız yok mu? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')} disabled={loading}>
                <Text style={styles.registerLink}>Kayıt Ol</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    paddingVertical: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#8E44AD',
    fontWeight: '500',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginBottom: 50,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  errorText: {
    color: '#E74C3C',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#8E44AD',
    textAlign: 'right',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#8E44AD',
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    color: '#666',
    fontSize: 16,
  },
  registerLink: {
    color: '#8E44AD',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;