import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

const ResultScreen = () => {
  const [results, setResults] = useState([
    { nick: "Maciek", score: 18, total: 20, type: "test"},
    { nick: "Józef", score: 15, total: 20, type: "Gothic"},
    { nick: "Tomasz", score: 20, total: 20, type: "Wiedźmin"},
    { nick: "Karol", score: 12, total: 20, type: "ZZZ"},
  ]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setResults((prevResults) => [
        ...prevResults,
        { nick: "Krystian", score: 14, total: 20, type: "ZZZ"},
      ]);
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = ({ item, index }: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.nick}</Text>
      <Text style={styles.cell}>{item.score}</Text>
      <Text style={styles.cell}>{item.total}</Text>
      <Text style={styles.cell}>{item.type}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      <ScrollView horizontal>
        <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>#</Text>
            <Text style={styles.headerText}>Player</Text>
            <Text style={styles.headerText}>Score</Text>
            <Text style={styles.headerText}>Total</Text>
            <Text style={styles.headerText}>Type</Text>
          </View>
          <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      </ScrollView>
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
    justifyContent: 'flex-start',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    minWidth: 70,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    fontSize: 16,
    minWidth: 70,
    textAlign: 'center',
  },
});

export default ResultScreen;
