import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Animated,
} from 'react-native';
import _ from 'lodash';

const TestQuestionScreen = ({ route, navigation }: any) => {
  const { testId } = route.params;
  const [testDetails, setTestDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef<any>(null);

  const animatedValue = useRef(new Animated.Value(1)).current;

  const getQuestionIDFromAPI = async () => {
    try {
      const response = await fetch(`https://tgryl.pl/quiz/test/${testId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const shuffledTasks = _.shuffle(data.tasks || []);
      shuffledTasks.forEach((task: any) => {
        task.answers = _.shuffle(task.answers || []);
      });
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

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      handleTimeout();
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft]);

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

  const getProgressBarColor = () => {
    if (timeLeft > 19) {
      return 'green';
    } else if (timeLeft > 9) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  const handleTimeout = () => {
    if (selectedAnswerIndex === null) {
      if (currentIndex < testDetails.tasks.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswerIndex(null);
        setTimeLeft(30);
      } else {
        sendResults(score, testDetails.tasks.length);
      }
    }
  };

  const sendResults = async (score: number, total: number) => {
    const payload = {
      nick: 'Karol',
      score,
      total,
      type: testDetails.name,
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
        navigation.navigate('Main', { screen: 'Result' });
      } else {
        console.error('Nie udało się przesłać wyniku');
        navigation.navigate('Main', { screen: 'Result' });
      }
    } catch (error) {
      console.error('Wystąpił problem z przesłaniem wyniku: ', error);
      navigation.navigate('Main', { screen: 'Result' });
    }
  };

  const handleAnswer = (index: number, isCorrect: boolean) => {
    setSelectedAnswerIndex(index);
    if (isCorrect) {
      setScore(score + 1);
    }

    clearTimeout(timerRef.current);

    setTimeout(() => {
      if (currentIndex < testDetails.tasks.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswerIndex(null);
        setTimeLeft(30);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        sendResults(finalScore, testDetails.tasks.length);
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
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <Animated.Text style={[styles.title, { transform: [{ scale: animatedValue }] }]}>
          {testDetails.name}
        </Animated.Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${(timeLeft / 30) * 100}%`,
                backgroundColor: getProgressBarColor(),
              },
            ]}
          />
        </View>
        <Text style={styles.questionNumber}>
          Pytanie {currentIndex + 1}/{testDetails.tasks.length} | Czas: {timeLeft}s
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  progressBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  questionNumber: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
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
