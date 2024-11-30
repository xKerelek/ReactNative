import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const TestQuestionScreen = ({ route, navigation }: any) => {
  const { testId } = route.params;
  const questionData = [
    { question: "Iorem Ipsum?", answers: ["1", "2", "3", "4"], correctAnswer: "1" },
    { question: "Iorem Ipsum?", answers: ["1", "2", "3", "4"], correctAnswer: "2" },
    { question: "Iorem Ipsum?", answers: ["1", "2", "3", "4"], correctAnswer: "3" },
    { question: "Iorem Ipsum?", answers: ["1", "2", "3", "4"], correctAnswer: "4" }
  ];

  const currentQuestion = questionData[testId - 1];
  const totalQuestions = questionData.length;

  const [seconds, setSeconds] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);

    if (answer === currentQuestion.correctAnswer) {
      Alert.alert("Correct answer!");
    } else {
      Alert.alert("Wrong answer!");
    }

    navigation.navigate("Test");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionNumber}>Question {testId}/{totalQuestions}</Text>
      <Text style={styles.timer}>Time Left: {seconds}s</Text>
      <Text style={styles.question}>{currentQuestion.question}</Text>

      {currentQuestion.answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.answerButton,
            selectedAnswer === answer && styles.selectedAnswer,
          ]}
          onPress={() => handleAnswer(answer)}
        >
          <Text style={styles.answerText}>{answer}</Text>
        </TouchableOpacity>
      ))}

      <Button title="Next Question" onPress={() => navigation.navigate("Test")} />
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
  questionNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  answerButton: {
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
    width: '100%',
  },
  answerText: {
    fontSize: 18,
    textAlign: 'center',
  },
  selectedAnswer: {
   
  },
});

export default TestQuestionScreen;
