import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// Import DateTimePicker conditionally based on platform
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { registerWithEmailAndPassword } from '../utils/firebase';
// Import our custom WebDateTimePicker for web platform
import WebDateTimePicker from '../components/WebDateTimePicker';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Reset error message
    setError('');
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }
    
    // Set loading state
    setLoading(true);
    
    try {
      // Register with Firebase
      const { user, error: registerError } = await registerWithEmailAndPassword(email, password);
      
      if (registerError) {
        // Handle specific Firebase error messages
        if (registerError.includes('email-already-in-use')) {
          setError('Bu e-posta adresi zaten kullanılıyor.');
        } else if (registerError.includes('invalid-email')) {
          setError('Geçersiz e-posta adresi.');
        } else if (registerError.includes('weak-password')) {
          setError('Şifre çok zayıf. En az 6 karakter kullanın.');
        } else {
          setError('Kayıt olurken bir hata oluştu: ' + registerError);
        }
      } else if (user) {
        // TODO: Save additional user info (name, birthDate) to Firestore or Realtime Database
        // For now, we'll just navigate to the main screen
        navigation.navigate('Main');
      }
    } catch (err) {
      setError('Kayıt olurken bir hata oluştu.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidView}
        >
          <ScrollView contentContainerStyle={styles.scrollView}>
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
              <Text style={styles.title}>Kayıt Ol</Text>
              
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Ad Soyad"
                  placeholderTextColor="#666"
                  value={name}
                  onChangeText={setName}
                  editable={!loading}
                />
                
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
                
                <TextInput
                  style={styles.input}
                  placeholder="Şifre Tekrar"
                  placeholderTextColor="#666"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  editable={!loading}
                />
                
                <TouchableOpacity style={styles.datePickerButton} onPress={showDatepicker} disabled={loading}>
                  <Text style={styles.datePickerButtonText}>
                    {format(birthDate, 'dd MMMM yyyy', { locale: tr })}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.dateLabel}>Doğum Tarihi</Text>
                
                {showDatePicker && (
                  Platform.OS === 'web' ? (
                    <WebDateTimePicker
                      value={birthDate}
                      onChange={onDateChange}
                      mode="date"
                      maximumDate={new Date()}
                      minimumDate={new Date(1920, 0, 1)}
                    />
                  ) : (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={birthDate}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={onDateChange}
                      maximumDate={new Date()}
                      minimumDate={new Date(1920, 0, 1)}
                      style={{width: Platform.OS === 'ios' ? '100%' : undefined}}
                    />
                  )
                )}
              </View>
              
              <TouchableOpacity 
                style={styles.registerButton} 
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.registerButtonText}>Kayıt Ol</Text>
                )}
              </TouchableOpacity>
              
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Zaten hesabınız var mı? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} disabled={loading}>
                  <Text style={styles.loginLink}>Giriş Yap</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
  scrollView: {
    flexGrow: 1,
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
    paddingBottom: 50,
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
  datePickerButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  datePickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
    marginLeft: 5,
  },
  registerButton: {
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
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
    fontSize: 16,
  },
  loginLink: {
    color: '#8E44AD',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;