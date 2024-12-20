import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import _ from 'lodash';

const TestScreen = ({ navigation }: any) => {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getQuestionAPI = async () => {
    try {
      const response = await fetch('https://tgryl.pl/quiz/tests');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTests(_.shuffle);
    } catch (error) {
      console.error('Error fetching tests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestionAPI();
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
    borderWidth: 2,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  testTitle: {
    fontSize: 22,
    fontFamily: 'NunitoSans',
    marginBottom: 10,
  },
  testDescription: {
    fontSize: 16,
    fontFamily: 'Playwrite',
    color: '#777',
  },
});

export default TestScreen;
