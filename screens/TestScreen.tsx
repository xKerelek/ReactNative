import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { loadTestsFromDatabase } from '../database';

const TestScreen = ({ navigation }: any) => {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const dbTests = await loadTestsFromDatabase();
        console.log('Tests loaded in TestScreen:', dbTests);
        setTests(dbTests);
      } catch (error) {
        console.error('Error loading tests in TestScreen:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTests();
  }, []);
  

  const renderTest = ({ item }: { item: { id: string; name: string; description: string } }) => (
    <TouchableOpacity
      style={styles.testCard}
      onPress={() => navigation.navigate('TestQuestionScreen', { testId: item.id })}
    >
      <Text style={styles.testTitle}>{item.name}</Text>
      <Text style={styles.testDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading tests...</Text>
      </View>
    );
  }

  if (tests.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No tests available. Try again later.</Text>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  testCard: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  testTitle: {
    fontSize: 22,
  },
  testDescription: {
    fontSize: 16,
    color: '#777',
  },
});

export default TestScreen;
