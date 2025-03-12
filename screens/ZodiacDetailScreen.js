import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getHoroscopePrediction } from '../utils/geminiService';

const ZodiacDetailScreen = ({ route, navigation }) => {
  const { zodiac } = route.params;
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  useEffect(() => {
    fetchPrediction();
  }, [selectedPeriod]);

  const fetchPrediction = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await getHoroscopePrediction(zodiac.name, selectedPeriod);
      setPrediction(result);
    } catch (err) {
      setError('Burç yorumu alınamadı. Lütfen daha sonra tekrar deneyin.');
      console.error('Error fetching prediction:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#8E44AD" />
          <Text style={styles.backButtonText}>Geri</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.zodiacHeader}>
          <Image source={zodiac.image} style={styles.zodiacImage} />
          <Text style={styles.zodiacName}>{zodiac.name}</Text>
          <Text style={styles.zodiacDate}>{zodiac.date}</Text>
          
          <View style={styles.zodiacMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Element</Text>
              <Text style={styles.metaValue}>{zodiac.element}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Gezegen</Text>
              <Text style={styles.metaValue}>{zodiac.planet}</Text>
            </View>
          </View>
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

        <View style={styles.predictionContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#8E44AD" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <Text style={styles.predictionText}>{prediction}</Text>
          )}
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#8E44AD',
    marginLeft: 5,
  },
  content: {
    padding: 20,
  },
  zodiacHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  zodiacImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  zodiacName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  zodiacDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  zodiacMeta: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  metaItem: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  metaLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  metaValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedPeriod: {
    backgroundColor: '#8E44AD',
  },
  periodText: {
    fontSize: 14,
    color: '#666',
  },
  selectedPeriodText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  predictionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    minHeight: 200,
    justifyContent: 'center',
  },
  predictionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#E74C3C',
    textAlign: 'center',
  },
});

export default ZodiacDetailScreen;