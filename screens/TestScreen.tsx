import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const TestScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wybierz swój test</Text>
      <TouchableOpacity
        style={styles.testCard}
        onPress={() => navigation.navigate('TestQuestionScreen', { testId: 1 })}
      >
     <Text style={styles.testTitle}>Wiedźmin #1</Text>
        <Text style={styles.testDescription}>Test o potworach w grach </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.testCard}
        onPress={() => navigation.navigate('TestQuestionScreen', { testId: 2 })}
      >
     <Text style={styles.testTitle}>Gothic #2</Text>
     <Text style={styles.testDescription}>Test wiedzy z gry Gothic</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.testCard}
        onPress={() => navigation.navigate('TestQuestionScreen', { testId: 3 })}
      >
     <Text style={styles.testTitle}>Zenless Zone Zero #3</Text>
     <Text style={styles.testDescription}>Test wiedzy z gry Zenless Zone Zero</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <TouchableOpacity 
            style={styles.resultCard}
            onPress={() => navigation.navigate('Result')}>
            <Text style={styles.footerText}>Sprawdź swoje wyniki</Text>       
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  testDescription: {
    fontSize: 16,
    color: '#777',
  },

  resultCard: {
    backgroundColor: '#7C7372',
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
  footerText: {
    textAlign: 'center',
    fontSize: 18,
  }

});

export default TestScreen;