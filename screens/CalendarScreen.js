import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for astrological events
const astroEvents = [
  {
    id: '1',
    date: '15 Mart 2025',
    title: 'Merkür Retrosu Başlangıç',
    description: 'İletişim, teknoloji ve seyahat konularında aksaklıklar yaşanabilir.',
    type: 'retro',
    planet: 'Merkür',
  },
  {
    id: '2',
    date: '20 Mart 2025',
    title: 'İlkbahar Ekinoksu',
    description: 'Gece ve gündüz eşitlenir. Yeni başlangıçlar için uygun bir zaman.',
    type: 'event',
  },
  {
    id: '3',
    date: '28 Mart 2025',
    title: 'Koç Burcunda Yeni Ay',
    description: 'Yeni başlangıçlar, girişimler ve kişisel projeler için uygun bir zaman.',
    type: 'moon',
    phase: 'new',
  },
  {
    id: '4',
    title: 'Venüs-Mars Kavuşumu',
    date: '5 Nisan 2025',
    description: 'Aşk ve ilişkiler için güçlü bir dönem. Romantik ilişkiler başlayabilir veya derinleşebilir.',
    type: 'alignment',
    planets: ['Venüs', 'Mars'],
  },
  {
    id: '5',
    title: 'Jüpiter-Satürn Karesi',
    date: '12 Nisan 2025',
    description: 'Büyüme ve sınırlamalar arasında gerilim. Dengeli kararlar almak önemli olacak.',
    type: 'aspect',
    aspect: 'kare',
    planets: ['Jüpiter', 'Satürn'],
  },
  {
    id: '6',
    title: 'Dolunay - Terazi Burcu',
    date: '14 Nisan 2025',
    description: 'İlişkiler ve ortaklıklar konusunda farkındalık ve denge zamanı.',
    type: 'moon',
    phase: 'full',
  },
  {
    id: '7',
    title: 'Merkür Retrosu Bitiş',
    date: '6 Nisan 2025',
    description: 'İletişim ve teknoloji konularındaki aksaklıklar sona eriyor.',
    type: 'retro-end',
    planet: 'Merkür',
  },
];

// Mock data for months
const months = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

const CalendarScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState(2); // March (0-indexed)
  
  const renderEventItem = ({ item }) => {
    let iconName, iconColor;
    
    switch(item.type) {
      case 'retro':
        iconName = 'sync';
        iconColor = '#E74C3C';
        break;
      case 'retro-end':
        iconName = 'sync-circle';
        iconColor = '#2ECC71';
        break;
      case 'moon':
        iconName = item.phase === 'full' ? 'moon' : 'moon-outline';
        iconColor = '#3498DB';
        break;
      case 'alignment':
        iconName = 'git-merge';
        iconColor = '#9B59B6';
        break;
      case 'aspect':
        iconName = 'analytics';
        iconColor = '#F39C12';
        break;
      default:
        iconName = 'calendar';
        iconColor = '#8E44AD';
    }
    
    return (
      <View style={styles.eventCard}>
        <View style={styles.eventIconContainer}>
          <Ionicons name={iconName} size={24} color={iconColor} />
        </View>
        <View style={styles.eventContent}>
          <Text style={styles.eventDate}>{item.date}</Text>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDescription}>{item.description}</Text>
          {item.planet && <Text style={styles.eventTag}>Gezegen: {item.planet}</Text>}
          {item.planets && <Text style={styles.eventTag}>Gezegenler: {item.planets.join(', ')}</Text>}
        </View>
      </View>
    );
  };

  const changeMonth = (direction) => {
    if (direction === 'next' && selectedMonth < 11) {
      setSelectedMonth(selectedMonth + 1);
    } else if (direction === 'prev' && selectedMonth > 0) {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Astroloji Takvimi</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.monthSelector}>
        <TouchableOpacity 
          style={styles.monthArrow} 
          onPress={() => changeMonth('prev')}
          disabled={selectedMonth === 0}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={selectedMonth === 0 ? '#CCC' : '#8E44AD'} 
          />
        </TouchableOpacity>
        <Text style={styles.monthText}>{months[selectedMonth]} 2025</Text>
        <TouchableOpacity 
          style={styles.monthArrow} 
          onPress={() => changeMonth('next')}
          disabled={selectedMonth === 11}
        >
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color={selectedMonth === 11 ? '#CCC' : '#8E44AD'} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <Ionicons name="sync" size={16} color="#E74C3C" />
          <Text style={styles.legendText}>Retro Başlangıç</Text>
        </View>
        <View style={styles.legendItem}>
          <Ionicons name="sync-circle" size={16} color="#2ECC71" />
          <Text style={styles.legendText}>Retro Bitiş</Text>
        </View>
        <View style={styles.legendItem}>
          <Ionicons name="moon" size={16} color="#3498DB" />
          <Text style={styles.legendText}>Ay Fazları</Text>
        </View>
      </View>
      
      <FlatList
        data={astroEvents}
        renderItem={renderEventItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.eventsList}
        showsVerticalScrollIndicator={false}
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
  filterButton: {
    padding: 5,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  monthArrow: {
    padding: 5,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  eventsList: {
    padding: 15,
  },
  eventCard: {
    flexDirection: 'row',
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
  eventIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  eventContent: {
    flex: 1,
  },
  eventDate: {
    fontSize: 14,
    color: '#8E44AD',
    fontWeight: '500',
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  eventTag: {
    fontSize: 12,
    color: '#8E44AD',
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
});

export default CalendarScreen;