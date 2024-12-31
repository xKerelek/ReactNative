import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl, Animated } from 'react-native';
import { loadTestsFromDatabase } from '../src/database';
import { fetchAndStoreTests } from '../src/fetchAndStoreTest';

const TestScreen = ({ navigation }: any) => {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const animatedValue = new Animated.Value(1);

  const fetchTests = async () => {
    setLoading(true);
    try {
      await fetchAndStoreTests();
      const dbTests = await loadTestsFromDatabase();
      setTests(dbTests);
    } catch (error) {
      console.error('Error loading tests in TestScreen:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchTests();
    } finally {
      setRefreshing(false);
    }
  };

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const renderTest = ({ item }: { item: { id: string; name: string; description: string } }) => (
    <Animated.View style={[styles.testCard, { transform: [{ scale: animatedValue }] }]}>
      <TouchableOpacity
        style={styles.testCardTouchable}
        onPress={() => {
          startAnimation();
          navigation.navigate('TestQuestionScreen', { testId: item.id });
        }}
      >
        <Text style={styles.testTitle}>{item.name}</Text>
        <Text style={styles.testDescription}>{item.description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text style={styles.loadingText}>Ładowanie testów...</Text>
      </View>
    );
  }

  if (tests.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Brak dostępnych testów. Spróbuj ponownie później.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wybierz swój test</Text>
      <FlatList
        data={tests}
        renderItem={renderTest}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1e88e5',
  },
  testCard: {
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#ffffff',
  },
  testCardTouchable: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  testTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 10,
  },
  testDescription: {
    fontSize: 16,
    color: '#757575',
  },
  loadingText: {
    fontSize: 18,
    color: '#4caf50',
    marginTop: 10,
  },
  emptyText: {
    fontSize: 18,
    color: '#b71c1c',
  },
});

export default TestScreen;
