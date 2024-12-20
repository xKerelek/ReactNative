import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import _ from 'lodash';

const TestQuestionScreen = ({ route, navigation }: any) => {
  const { testId } = route.params;
  const [testDetails, setTestDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  
  const getQuestionIDFromAPI = async () => {
    try {
      const response = await fetch(`https://tgryl.pl/quiz/test/${testId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const shuffledTasks = _.shuffle(data.tasks);
      shuffledTasks.forEach((taks: any) => {
        taks.answer = _.shuffle(taks.answer);
      })
      data.tasks = shuffledTasks;
      setTestDetails(data);
    } catch (error) {
      console.error('Error fetching test details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestionIDFromAPI();
  }, [testId]);

  const sendResults = async (score: number, total: number) => {
    const payload = {
      nick: "Karol", score, total, type: testDetails.name,
    };
    try {
      const response = await fetch('https://tgryl.pl/quiz/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Alert.alert('Sukces', 'Wynik został pomyślnie przesłany!');
        navigation.navigate("Main", { screen: "Result" });
      } else {
        Alert.alert('Błąd', 'Nie udało się przesłać wyniku.');
      }
    } catch (error: any) {
      Alert.alert('Błąd', 'Wystąpił problem z przesłaniem wyniku: ', error);
    }
  }

  const handleAnswer = (index: number, isCorrect: boolean) => {
    setSelectedAnswerIndex(index);
    if(isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex < (testDetails.tasks.length - 1)) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswerIndex(null);
      } else {
        const finalScore = isCorrect ? score + 1: score;
        Alert.alert(
          'Koniec quizu!',
          `Twój wynik to ${finalScore}/${testDetails.tasks.length}.`,
          [
            {
              text: 'OK',
              onPress: () => sendResults(finalScore, testDetails.tasks.length),
            },
          ]
        );
      }
    }, 1000);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading test details...</Text>
      </View>
    );
  }

  if (!testDetails) {
    return (
      <View style={styles.container}>
        <Text>Error loading test details. Please try again.</Text>
      </View>
    );
  }

  const currentQuestion = testDetails.tasks[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{testDetails.name}</Text>
      <Text style={styles.questionNumber}>
        Pytanie {currentIndex + 1}/{testDetails.tasks.length}
      </Text>
      <Text style={styles.question}>{currentQuestion.question}</Text>

      {currentQuestion.answers.map((answer: any, index: number) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.answerButton,
            selectedAnswerIndex === index &&
              (answer.isCorrect ? styles.correctAnswer : styles.wrongAnswer),
          ]}
          onPress={() => handleAnswer(index, answer.isCorrect)}
          disabled={selectedAnswerIndex !== null}
        >
          <Text style={styles.answerText}>{answer.content}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 18,
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  answerText: {
    fontSize: 16,
  },
  correctAnswer: {
    backgroundColor: 'green',
  },
  wrongAnswer: {
    backgroundColor: 'red',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
});

export default TestQuestionScreen;