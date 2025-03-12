import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Zodiac sign data
const zodiacSigns = [
  {
    id: '1',
    name: 'Koç',
    date: '21 Mart - 19 Nisan',
    element: 'Ateş',
    planet: 'Mars',
    image: require('../assets/zodiac-logo.png'), // Placeholder, replace with actual images
  },
  {
    id: '2',
    name: 'Boğa',
    date: '20 Nisan - 20 Mayıs',
    element: 'Toprak',
    planet: 'Venüs',
    image: require('../assets/zodiac-logo.png'),
  },
  {
    id: '3',
    name: 'İkizler',
    date: '21 Mayıs - 20 Haziran',
    element: 'Hava',
    planet: 'Merkür',
    image: require('../assets/zodiac-logo.png'),
  },
  {
    id: '4',
    name: 'Yengeç',
    date: '21 Haziran - 22 Temmuz',
    element: 'Su',
    planet: 'Ay',
    image: require('../assets/zodiac-logo.png'),
  },
  {
    id: '5',
    name: 'Aslan',
    date: '23 Temmuz - 22 Ağustos',
    element: 'Ateş',
    planet: 'Güneş',
    image: require('../assets/zodiac-logo.png'),
  },
  {
    id: '6',
    name: 'Başak',
    date: '23 Ağustos - 22 Eylül',
    element: 'Toprak',
    planet: 'Merkür',
    image: require('../assets/zodiac-logo.png'),
  },
  {
    id: '7',
    name: 'Terazi',
    date: '23 Eylül - 22 Ekim',
    element: 'Hava',
    planet: 'Venüs',
    image: require('../assets/zodiac-logo.png'),
  },
  {
    id: '8',
    name: 'Akrep',
    date: '23 Ekim - 21 Kasım',
    element: 'Su',
    planet: 'Plüton',
    image: require('../assets/zodiac-logo.png'),
  },
  {
    id: '9',
    name: 'Yay',
    date: '22 Kasım - 21 Aralık',
    element: 'Ateş',
    planet: 'Jüpiter',
    image: require('../assets/zodiac-logo.png'),
  },
  {
    id: '10',
    name: 'Oğlak',
    date: '22 Aralık - 19 Ocak',
    element: 'Toprak',
    planet: 'Satürn',
    image: require('../assets/zodiac-logo.png'),
  },
  {
    id: '11',
    name: 'Kova',
    date: '20 Ocak - 18 Şubat',
    element: 'Hava',
    planet: 'Uranüs',
    image: require('../assets/zodiac-logo.png'),
  },
  {
    id: '12',
    name: 'Balık',
    date: '19 Şubat - 20 Mart',
    element: 'Su',
    planet: 'Neptün',
    image: require('../assets/zodiac-logo.png'),
  },
];

const HomeScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  const renderZodiacItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.zodiacCard}
      onPress={() => navigation.navigate('ZodiacDetail', { zodiac: item })}
    >
      <Image source={item.image} style={styles.zodiacImage} />
      <View style={styles.zodiacInfo}>
        <Text style={styles.zodiacName}>{item.name}</Text>
        <Text style={styles.zodiacDate}>{item.date}</Text>
        <View style={styles.zodiacMeta}>
          <Text style={styles.zodiacElement}>{item.element}</Text>
          <Text style={styles.zodiacPlanet}>{item.planet}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#8E44AD" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <View style={styles.header}>
        <Text style={styles.title}>Burç Rehberi</Text>
        <TouchableOpacity style={styles.themeToggle}>
          <Ionicons name="moon-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.periodSelector}>
        <TouchableOpacity 
          style={[styles.periodButton, selectedPeriod === 'daily' && styles.selectedPeriod]}
          onPress={() => setSelectedPeriod('daily')}
        >
          <Text style={[styles.periodText, selectedPeriod === 'daily' && styles.selectedPeriodText]}>Günlük</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.periodButton, selectedPeriod === 'weekly' && styles.selectedPeriod]}
          onPress={() => setSelectedPeriod('weekly')}
        >
          <Text style={[styles.periodText, selectedPeriod === 'weekly' && styles.selectedPeriodText]}>Haftalık</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.periodButton, selectedPeriod === 'monthly' && styles.selectedPeriod]}
          onPress={() => setSelectedPeriod('monthly')}
        >
          <Text style={[styles.periodText, selectedPeriod === 'monthly' && styles.selectedPeriodText]}>Aylık</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={zodiacSigns}
        renderItem={renderZodiacItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
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
  themeToggle: {
    padding: 5,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  selectedPeriod: {
    backgroundColor: '#8E44AD',
  },
  periodText: {
    fontSize: 16,
    color: '#666',
  },
  selectedPeriodText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  listContainer: {
    padding: 15,
  },
  zodiacCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  zodiacImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  zodiacInfo: {
    flex: 1,
  },
  zodiacName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  zodiacDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  zodiacMeta: {
    flexDirection: 'row',
  },
  zodiacElement: {
    fontSize: 12,
    color: '#8E44AD',
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  zodiacPlanet: {
    fontSize: 12,
    color: '#4A148C',
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
});

export default HomeScreen;