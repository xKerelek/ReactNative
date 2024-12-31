import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Animated } from 'react-native';

const ResultScreen = () => {
  const navigation = useNavigation();

  const [results, setResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const animatedValue = useRef(new Animated.Value(1)).current;

  const getPlayerFromAPI = async () => {
    try {
      const response = await fetch('https://tgryl.pl/quiz/results?last=20');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  useEffect(() => {
    getPlayerFromAPI();
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getPlayerFromAPI().finally(() => setRefreshing(false));
  }, []);

  const handleRowPress = (id: any) => {
    setSelectedPlayerId(selectedPlayerId === id ? null : id);
  };

  const renderItem = ({ item, index }: any) => (
    <>
      <TouchableOpacity style={styles.row} onPress={() => handleRowPress(item.id)}>
        <Text style={styles.cell}>{index + 1}</Text>
        <Text style={styles.cell}>{item.nick}</Text>
        <Text style={styles.cell}>{item.score}</Text>
        <Text style={styles.cell}>{item.total}</Text>
        <Text style={[styles.cell, styles.typeCell]}>{item.type}</Text>
      </TouchableOpacity>
      {selectedPlayerId === item.id && (
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>{item.createdOn}</Text>
        </View>
      )}
    </>
  );

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <Animated.Text style={[styles.title, { transform: [{ scale: animatedValue }] }]}>
          Wyniki graczy
        </Animated.Text>
        <View style={styles.tableContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>#</Text>
            <Text style={styles.headerText}>Player</Text>
            <Text style={styles.headerText}>Points</Text>
            <Text style={styles.headerText}>Score</Text>
            <Text style={[styles.headerText, styles.typeHeader]}>Type</Text>
          </View>
          <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  tableContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#7C7372',
    paddingVertical: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    minWidth: 70,
    textAlign: 'center',
  },
  typeHeader: {
    flex: 1,
    textAlign: 'left',
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
    color: '#fff',
  },
  typeCell: {
    flex: 1,
    textAlign: 'left',
    flexWrap: 'wrap', 
  },
  detailRow: {
    backgroundColor: '#5e5a59',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  detailText: {
    fontSize: 16,
    fontFamily: 'NunitoSans',
    color: 'white',
    textAlign: 'center',
  },
});

export default ResultScreen;
