import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for favorite horoscopes
const favoriteHoroscopes = [
  {
    id: '1',
    name: 'Boğa',
    date: '20 Nisan - 20 Mayıs',
    element: 'Toprak',
    planet: 'Venüs',
    image: require('../assets/zodiac-logo.png'),
    prediction: 'Bugün finansal konularda şanslı bir gün geçirebilirsiniz. Uzun zamandır beklediğiniz bir gelir kapınızı çalabilir.',
    category: 'daily',
    savedDate: '12 Mart 2025',
  },
  {
    id: '2',
    name: 'İkizler',
    date: '21 Mayıs - 20 Haziran',
    element: 'Hava',
    planet: 'Merkür',
    image: require('../assets/zodiac-logo.png'),
    prediction: 'Bu hafta iletişim yetenekleriniz sayesinde iş hayatınızda önemli fırsatlar yakalayabilirsiniz. Yeni bir proje teklifi alabilirsiniz.',
    category: 'weekly',
    savedDate: '10 Mart 2025',
  },
  {
    id: '3',
    name: 'Aslan',
    date: '23 Temmuz - 22 Ağustos',
    element: 'Ateş',
    planet: 'Güneş',
    image: require('../assets/zodiac-logo.png'),
    prediction: 'Mart ayı boyunca yaratıcılığınız zirve yapacak. Sanatsal projeler için harika bir dönem. Aşk hayatınızda da hareketlilik olabilir.',
    category: 'monthly',
    savedDate: '1 Mart 2025',
  },
];

const FavoritesScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredFavorites = activeFilter === 'all' 
    ? favoriteHoroscopes 
    : favoriteHoroscopes.filter(item => item.category === activeFilter);

  const renderFavoriteItem = ({ item }) => {
    let categoryLabel = '';
    switch(item.category) {
      case 'daily':
        categoryLabel = 'Günlük';
        break;
      case 'weekly':
        categoryLabel = 'Haftalık';
        break;
      case 'monthly':
        categoryLabel = 'Aylık';
        break;
    }
    
    return (
      <View style={styles.favoriteCard}>
        <View style={styles.favoriteHeader}>
          <View style={styles.favoriteInfo}>
            <Image source={item.image} style={styles.favoriteImage} />
            <View>
              <Text style={styles.favoriteName}>{item.name}</Text>
              <Text style={styles.favoriteDate}>{item.date}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.favoriteAction}>
            <Ionicons name="heart" size={24} color="#E74C3C" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.favoriteContent}>
          <Text style={styles.favoritePrediction}>{item.prediction}</Text>
          
          <View style={styles.favoriteFooter}>
            <View style={styles.favoriteCategory}>
              <Text style={styles.favoriteCategoryText}>{categoryLabel}</Text>
            </View>
            <Text style={styles.favoriteSavedDate}>Kaydedildi: {item.savedDate}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={60} color="#CCCCCC" />
      <Text style={styles.emptyText}>Henüz favori burç yorumunuz yok</Text>
      <Text style={styles.emptySubtext}>Burç yorumlarını favorilere ekleyerek burada görüntüleyebilirsiniz</Text>
      <TouchableOpacity 
        style={styles.emptyButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.emptyButtonText}>Burçları Keşfet</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorilerim</Text>
      </View>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'all' && styles.activeFilter]}
          onPress={() => setActiveFilter('all')}
        >
          <Text style={[styles.filterText, activeFilter === 'all' && styles.activeFilterText]}>Tümü</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'daily' && styles.activeFilter]}
          onPress={() => setActiveFilter('daily')}
        >
          <Text style={[styles.filterText, activeFilter === 'daily' && styles.activeFilterText]}>Günlük</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'weekly' && styles.activeFilter]}
          onPress={() => setActiveFilter('weekly')}
        >
          <Text style={[styles.filterText, activeFilter === 'weekly' && styles.activeFilterText]}>Haftalık</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'monthly' && styles.activeFilter]}
          onPress={() => setActiveFilter('monthly')}
        >
          <Text style={[styles.filterText, activeFilter === 'monthly' && styles.activeFilterText]}>Aylık</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredFavorites}
        renderItem={renderFavoriteItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilter: {
    backgroundColor: '#8E44AD',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  listContainer: {
    padding: 15,
    flexGrow: 1,
  },
  favoriteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  favoriteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  favoriteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  favoriteDate: {
    fontSize: 12,
    color: '#666',
  },
  favoriteAction: {
    padding: 5,
  },
  favoriteContent: {
    padding: 15,
  },
  favoritePrediction: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 15,
  },
  favoriteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoriteCategory: {
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  favoriteCategoryText: {
    fontSize: 12,
    color: '#8E44AD',
    fontWeight: '500',
  },
  favoriteSavedDate: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  emptyButton: {
    backgroundColor: '#8E44AD',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;