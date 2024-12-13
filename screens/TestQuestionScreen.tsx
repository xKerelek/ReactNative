import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const TestQuestionScreen = ({ route, navigation }: any) => {
  const { testId } = route.params;

  const monsterQuestions = [
    {
      question: "O którego potwora Vesemir zapytał Ciri na początku gry?",
      answers: [
        { content: "Baba wodna", isCorrect: false },
        { content: "Wiwerna", isCorrect: false },
        { content: "Ghoul", isCorrect: true },
        { content: "Wampir", isCorrect: false },
      ],
    },
    {
      question: "Który potwór jest odporny na srebro?",
      answers: [
        { content: "Bazyliszek", isCorrect: false },
        { content: "Kikimora", isCorrect: true },
        { content: "Strzyga", isCorrect: false },
        { content: "Wilkołak", isCorrect: false },
      ],
    },
    {
      question: "Jaki jest znak rozpoznawczy leszego?",
      answers: [
        { content: "Gałęzie na ciele", isCorrect: true },
        { content: "Czerwone oczy", isCorrect: false },
        { content: "Skrzydła", isCorrect: false },
        { content: "Kolce", isCorrect: false },
      ],
    },
    {
      question: "Który potwór często mieszka na bagnach?",
      answers: [
        { content: "Topielica", isCorrect: true },
        { content: "Ghoul", isCorrect: false },
        { content: "Koszmar", isCorrect: false },
        { content: "Żywiołak", isCorrect: false },
      ],
    },
    {
      question: "Który z tych potworów jest najmniejszy?",
      answers: [
        { content: "Nekker", isCorrect: true },
        { content: "Griffin", isCorrect: false },
        { content: "Bazyliszek", isCorrect: false },
        { content: "Endriaga", isCorrect: false },
      ],
    },
    {
      question: "Jaki eliksir zwiększa odporność na trucizny potworów?",
      answers: [
        { content: "Złota Oriole", isCorrect: true },
        { content: "Wilga", isCorrect: false },
        { content: "Kot", isCorrect: false },
        { content: "Jaskółka", isCorrect: false },
      ],
    },
    {
      question: "Który potwór zmienia formę w trakcie walki?",
      answers: [
        { content: "Strzyga", isCorrect: true },
        { content: "Ghoul", isCorrect: false },
        { content: "Endriaga", isCorrect: false },
        { content: "Wiwerna", isCorrect: false },
      ],
    },
    {
      question: "Co zabija ghoulów najszybciej?",
      answers: [
        { content: "Srebro", isCorrect: true },
        { content: "Ogień", isCorrect: false },
        { content: "Stal", isCorrect: false },
        { content: "Woda", isCorrect: false },
      ],
    },
    {
      question: "Który znak jest najbardziej skuteczny na wampiry?",
      answers: [
        { content: "Igni", isCorrect: false },
        { content: "Yrden", isCorrect: true },
        { content: "Quen", isCorrect: false },
        { content: "Aard", isCorrect: false },
      ],
    },
    {
      question: "Który potwór zjada ludzi w nocy?",
      answers: [
        { content: "Wilkołak", isCorrect: true },
        { content: "Bazyliszek", isCorrect: false },
        { content: "Endriaga", isCorrect: false },
        { content: "Leszy", isCorrect: false },
      ],
    },

  ];

  const gothicQuestions = [
    {
      question: "Jak nazywa się postać, która pomaga głównemu bohaterowi na samym poczatku gry?",
      answers: [
        { content: "Gomez", isCorrect: false },
        { content: "Milten", isCorrect: false },
        { content: "Gorn", isCorrect: false },
        { content: "Diego", isCorrect: true },
      ],
    },
    {
      question: "Ile magicznych kręgów występuje w grze?",
      answers: [
        { content: "3", isCorrect: false },
        { content: "5", isCorrect: false },
        { content: "4", isCorrect: false },
        { content: "6", isCorrect: true },
      ],
    },
    {
      question: "Jak nazywa się Nekromanta na terytorium orków?",
      answers: [
        { content: "Leszy", isCorrect: false },
        { content: "Gandalf", isCorrect: false },
        { content: "Saruman", isCorrect: false },
        { content: "Xardas", isCorrect: true },
      ],
    },
    {
      question: "Z kim możemy odbić wolną kopalnię?",
      answers: [
        { content: "Gorn", isCorrect: true },
        { content: "Lee", isCorrect: false },
        { content: "Gomez", isCorrect: false },
        { content: "Diego", isCorrect: false },
      ],
    },
    {
      question: "Ile smoków było w Górniczej Dolinie?",
      answers: [
        { content: "3", isCorrect: false },
        { content: "7", isCorrect: false },
        { content: "4", isCorrect: true },
        { content: "2", isCorrect: false },
      ],
    },
    {
      question: "Jak nazywał się ostateczny przeciwnik na Dworze Irdorath?",
      answers: [
        { content: "Śniący", isCorrect: false },
        { content: "Bennet", isCorrect: false },
        { content: "Smok Ożywieniec", isCorrect: true },
        { content: "Wiedźmin", isCorrect: false },
      ],
    },
    {
      question: "Jak nazywa się lokacja, do której Bezimienny bohater zbiera ornamenty?",
      answers: [
        { content: "Górnicza Dolina", isCorrect: false },
        { content: "Khorinis", isCorrect: false },
        { content: "Varant", isCorrect: false },
        { content: "Jarkendar", isCorrect: true },
      ],
    },
    {
      question: "Ile serc nieumarłych kapłanów musi przecić bohater by wygnać Śniącego ze świata ludzi?",
      answers: [
        { content: "5", isCorrect: true },
        { content: "4", isCorrect: false },
        { content: "6", isCorrect: false },
        { content: "12", isCorrect: false },
      ],
    },
    {
      question: "Jaką nazwę nosi miecz trzeba naładować wraz z Miltenem przy kopcu magicznej rudy?",
      answers: [
        { content: "Laga", isCorrect: false },
        { content: "Kostur sędziego", isCorrect: false },
        { content: "Aerondight", isCorrect: false },
        { content: "Uriziel", isCorrect: true },
      ],
    },
    {
      question: "Jak plemie orków nazywało potężnego demona?",
      answers: [
        { content: "Krushak", isCorrect: true },
        { content: "Krushog", isCorrect: false },
        { content: "Krush", isCorrect: false },
        { content: "Krush Agash", isCorrect: false },
      ],
    },
  ];

  const zzzQuestions = [
    {
      question: "Jak nazywa się rodzeństwo, czyli główni bohaterowie?",
      answers: [
        { content: "Bell i Wise", isCorrect: true },
        { content: "Jane i Yanagi", isCorrect: false },
        { content: "Burnice i Seth", isCorrect: false },
        { content: "Ben i Koleda", isCorrect: false },
      ],
    },
    {
      question: "Jaki rodzaj gadżetu moża zdobyć by wzmocnić postać?",
      answers: [
        { content: "Broń", isCorrect: false },
        { content: "W-Engine", isCorrect: true },
        { content: "Naszyjnik", isCorrect: false },
        { content: "Pierścień", isCorrect: false },
      ],
    },
    {
      question: "Gdzie można zdobywać ulepszenia do dysków postaci?",
      answers: [
        { content: "Scott Outpost", isCorrect: true },
        { content: "Six Street", isCorrect: false },
        { content: "Lumina Square", isCorrect: false },
        { content: "Blazewood", isCorrect: false },
      ],
    },
    {
      question: "Ile dysków postać może mieć założona?",
      answers: [
        { content: "7", isCorrect: false },
        { content: "5", isCorrect: false },
        { content: "4", isCorrect: false },
        { content: "6", isCorrect: true },
      ],
    },
    {
      question: "Jak nazywają się maskotki, które wspomagają postać w walce?",
      answers: [
        { content: "Goblin", isCorrect: false },
        { content: "Paimon", isCorrect: false },
        { content: "Bangboo", isCorrect: true },
        { content: "Nekomata", isCorrect: false },
      ],
    },
    {
      question: "Jak nazywa się przedmiot, dzięki któremu możemy sobie wybrać własne bonusy w dyskach?",
      answers: [
        { content: "Tuning Calibrator", isCorrect: true },
        { content: "Tuning W-Engine", isCorrect: false },
        { content: "Tuning Bangboo", isCorrect: false },
        { content: "Tuning Circle", isCorrect: false },
      ],
    },
    {
      question: "Ile punktów energii możemy mieć maksymalnie do limitu?",
      answers: [
        { content: "360", isCorrect: false },
        { content: "240", isCorrect: true },
        { content: "200", isCorrect: false },
        { content: "160", isCorrect: false },
      ],
    },
    {
      question: "Która z poniższych bohaterek włada ogniem?",
      answers: [
        { content: "Yanagi", isCorrect: false },
        { content: "Burnice", isCorrect: true },
        { content: "Ellen", isCorrect: false },
        { content: "Grace", isCorrect: false },
      ],
    },
    {
      question: "Ile razy można ulepszyć pasywne drzewko umiejętności?",
      answers: [
        { content: "3", isCorrect: false },
        { content: "4", isCorrect: false },
        { content: "5", isCorrect: false },
        { content: "6", isCorrect: true },
      ],
    },
    {
      question: "Jak nazywa się ostatni boss w Hollow Zero?",
      answers: [
        { content: "Nineveh", isCorrect: true },
        { content: "Roland", isCorrect: false },
        { content: "Twin Marionettes", isCorrect: false },
        { content: "Jane Doe", isCorrect: false },
      ],
    },

  ];

  const questions = testId === 1 ? monsterQuestions : testId === 2 ? gothicQuestions : zzzQuestions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswerIndex(null);
  };

  useFocusEffect(
    useCallback(() => {
      resetQuiz();
    }, [])
  );

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (index: number, isCorrect: boolean) => {
    setSelectedAnswerIndex(index);
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswerIndex(null);
      } else {
        navigation.navigate("Main", { screen: "Result" });

      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {testId === 1 ? "Wiedźmin #1" : testId === 2 ? "Gothic #2" : " #3 Zenless Zero Zone"}
      </Text>
      <Text style={styles.questionNumber}>
        Pytanie {currentIndex + 1}/{questions.length}
      </Text>
      <Text style={styles.question}>{currentQuestion.question}</Text>

      {currentQuestion.answers.map((answer, index) => (
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 18,
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  answerText: {
    fontSize: 16,
  },
  correctAnswer: {
    backgroundColor: "green",
  },
  wrongAnswer: {
    backgroundColor: "red",
  },
});

export default TestQuestionScreen;
