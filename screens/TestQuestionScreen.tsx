import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const TestQuestionScreen = ({ route, navigation }: any) => {
  const { testId } = route.params;
  const [testDetails, setTestDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

  
  const getQuestionIDFromAPI = async () => {
    try {
      const response = await fetch(`https://tgryl.pl/quiz/test/${testId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
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

  const handleAnswer = (index: number, isCorrect: boolean) => {
    setSelectedAnswerIndex(index);
    setTimeout(() => {
      if (currentIndex < (testDetails.tasks.length - 1)) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswerIndex(null);
      } else {
        navigation.navigate("Main", { screen: "Result" });
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
});

export default TestQuestionScreen;
