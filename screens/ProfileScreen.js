import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Switch, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [dailyHoroscope, setDailyHoroscope] = useState(true);
  const [specialEvents, setSpecialEvents] = useState(true);
  
  // Mock user data
  const user = {
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    birthDate: '15 Mayıs 1990',
    zodiacSign: 'Boğa',
    element: 'Toprak',
    planet: 'Venüs',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color="#8E44AD" />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <Image 
            source={require('../assets/profile-placeholder.png')} 
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <View style={styles.zodiacInfo}>
            <View style={styles.zodiacItem}>
              <Text style={styles.zodiacLabel}>Burç</Text>
              <Text style={styles.zodiacValue}>{user.zodiacSign}</Text>
            </View>
            <View style={styles.zodiacItem}>
              <Text style={styles.zodiacLabel}>Element</Text>
              <Text style={styles.zodiacValue}>{user.element}</Text>
            </View>
            <View style={styles.zodiacItem}>
              <Text style={styles.zodiacLabel}>Gezegen</Text>
              <Text style={styles.zodiacValue}>{user.planet}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Ayarlar</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon-outline" size={22} color="#333" style={styles.settingIcon} />
              <Text style={styles.settingText}>Karanlık Mod</Text>
            </View>
            <Switch
              trackColor={{ false: '#E0E0E0', true: '#D1C4E9' }}
              thumbColor={darkMode ? '#8E44AD' : '#f4f3f4'}
              onValueChange={() => setDarkMode(previousState => !previousState)}
              value={darkMode}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications-outline" size={22} color="#333" style={styles.settingIcon} />
              <Text style={styles.settingText}>Bildirimler</Text>
            </View>
            <Switch
              trackColor={{ false: '#E0E0E0', true: '#D1C4E9' }}
              thumbColor={notifications ? '#8E44AD' : '#f4f3f4'}
              onValueChange={() => setNotifications(previousState => !previousState)}
              value={notifications}
            />
          </View>
          
          {notifications && (
            <>
              <View style={styles.subSettingItem}>
                <Text style={styles.subSettingText}>Günlük Burç Yorumları</Text>
                <Switch
                  trackColor={{ false: '#E0E0E0', true: '#D1C4E9' }}
                  thumbColor={dailyHoroscope ? '#8E44AD' : '#f4f3f4'}
                  onValueChange={() => setDailyHoroscope(previousState => !previousState)}
                  value={dailyHoroscope}
                />
              </View>
              
              <View style={styles.subSettingItem}>
                <Text style={styles.subSettingText}>Özel Astrolojik Olaylar</Text>
                <Switch
                  trackColor={{ false: '#E0E0E0', true: '#D1C4E9' }}
                  thumbColor={specialEvents ? '#8E44AD' : '#f4f3f4'}
                  onValueChange={() => setSpecialEvents(previousState => !previousState)}
                  value={specialEvents}
                />
              </View>
            </>
          )}
        </View>
        
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle-outline" size={22} color="#333" style={styles.actionIcon} />
            <Text style={styles.actionText}>Yardım ve Destek</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="information-circle-outline" size={22} color="#333" style={styles.actionIcon} />
            <Text style={styles.actionText}>Hakkında</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="star-outline" size={22} color="#333" style={styles.actionIcon} />
            <Text style={styles.actionText}>Uygulamayı Değerlendir</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.logoutButton]}>
            <Ionicons name="log-out-outline" size={22} color="#E74C3C" style={styles.actionIcon} />
            <Text style={[styles.actionText, styles.logoutText]}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    padding: 5,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  zodiacInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 15,
  },
  zodiacItem: {
    alignItems: 'center',
  },
  zodiacLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  zodiacValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8E44AD',
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 10,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  subSettingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  subSettingText: {
    fontSize: 15,
    color: '#666',
  },
  actionsSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  actionIcon: {
    marginRight: 10,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  logoutButton: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#E74C3C',
  },
});

export default ProfileScreen;