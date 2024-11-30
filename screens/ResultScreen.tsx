import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ResultScreen = () => {
  const resultsData = [
    { id: 1, playerName: 'Player 1', testNumber: 1, score: 8 },
    { id: 2, playerName: 'Player 2', testNumber: 2, score: 7 },
    { id: 3, playerName: 'Player 3', testNumber: 3, score: 9 },
    { id: 4, playerName: 'Player 4', testNumber: 4, score: 6 },
  ];

  const renderItem = ({ item, index }: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.playerName}</Text>
      <Text style={styles.cell}>{item.testNumber}</Text>
      <Text style={styles.cell}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>#</Text>
        <Text style={styles.headerText}>Player</Text>
        <Text style={styles.headerText}>Test</Text>
        <Text style={styles.headerText}>Score</Text>
      </View>
      <FlatList
        data={resultsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#7C7372',
    paddingVertical: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    width: '23%',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    fontSize: 16,
    width: '23%',
    textAlign: 'center',
  },
});

export default ResultScreen;
