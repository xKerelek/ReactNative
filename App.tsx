import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState('');

  const handlePress = (value) => {
    if (value === 'AC') {
      setInput('');
      setResult('');
      setOperator(null);
      setPreviousValue('');
    } else if (['+', '-', '×', '÷'].includes(value)) {
      setOperator(value);
      setPreviousValue(input);
      setInput('');
    } else if (value === '=') {
      calculateResult();
    } else {
      setInput(input + value);
    }
  };

  const calculateResult = () => {
    let num1 = parseFloat(previousValue);
    let num2 = parseFloat(input);
    let finalResult = 0;

    switch (operator) {
      case '+':
        finalResult = num1 + num2;
        break;
      case '-':
        finalResult = num1 - num2;
        break;
      case '×':
        finalResult = num1 * num2;
        break;
      case '÷':
        if(num2 == 0) {
          setResult('Dont divide by 0' )
          return;
        }
        finalResult = num1 / num2;
        break;
      default:
        return;
    }

    setResult(finalResult.toFixed(2));
    setInput('' + finalResult.toFixed(2));
    setOperator(null);
    setPreviousValue('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result ? result : input || '0'}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {renderButtons(handlePress)}
      </View>
    </View>
  );
};

const renderButtons = (handlePress) => {
  const buttons = [
    ['AC', '', '', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', ',', '=']
  ];

  return buttons.map((row, rowIndex) => (
    <View key={rowIndex} style={styles.row}>
      {row.map((button, buttonIndex) => (
        <TouchableOpacity
          key={buttonIndex}
          style={[
            styles.button,
            button === '0' ? styles.zeroButton : null, 
            isOperator(button) ? styles.operatorButton : null
          ]}
          onPress={() => handlePress(button)}
        >
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>
      ))}
    </View>
  ));
};

const isOperator = (button) => {
  return ['÷', '×', '-', '+', '='].includes(button);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    justifyContent: 'center',
  },
  resultContainer: {
    flex: 2,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  resultText: {
    color: '#00d9ff',
    fontSize: 48,
  },
  buttonsContainer: {
    flex: 3,
    padding: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#ff5757',
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  buttonText: {
    fontSize: 28,
    color: '#ffffff',
  },
  zeroButton: {
    flex: 2.1,
  },
  operatorButton: {
    backgroundColor: '#ffa500',
  },
});

export default Calculator;
