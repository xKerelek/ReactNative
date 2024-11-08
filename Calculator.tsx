import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import CalculateButton from './CalculateButton';

const Calculator = () => {
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (value) => {
    if (value === 'AC') {
      setInput('');
      setResult('');
    } else if (['+', '-', '×', '÷'].includes(value)) {
      setInput((prev) => prev + ` ${value} `);
    } else if (value === '=') {
      calculateResult();
    } else if (value === ',' || value === '.') {
      setInput((prev) => (prev.includes('.') ? prev : prev + '.'));
    } else if (['x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '1/x', '²√x', '³√x', 'ln', 'log₁₀', 'x!'].includes(value)) {
      horizontalCalculate(value);
    } else {
      setInput((prev) => prev + value);
    }
  };

  const horizontalCalculate = (func) => {
    let x = parseFloat(input);
    let result;

    switch (func) {
      case 'x²':
        result = (x ** 2).toString();
        break;
      case 'x³':
        result = (x ** 3).toString();
        break;
      case 'xʸ':
        setInput(input + ' ^ ');
        return;
      case 'eˣ':
        result = Math.exp(x).toString();
        break;
      case '10ˣ':
        result = (10 ** x).toString();
        break;
      case '1/x':
        result = x !== 0 ? (1 / x).toString() : 'Error';
        break;
      case '²√x':
        result = Math.sqrt(x).toString();
        break;
      case '³√x':
        result = Math.cbrt(x).toString();
        break;
      case 'ln':
        result = x > 0 ? Math.log(x).toString() : 'Error';
        break;
      case 'log₁₀':
        result = x > 0 ? Math.log10(x).toString() : 'Error';
        break;
      case 'x!':
        result = factorial(x).toString();
        break;
      default:
        return;

    }
    setResult(result);
    setInput('');
  };

  const factorial = (n) => {
    if (n < 0) return 'Error';
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result *= i;
    }
    return result;
  };


  const calculateResult = () => {
    try {
      let formattedEquation = input.replace(/×/g, '*').replace(/÷/g, '/');
      const finalResult = eval(formattedEquation).toString();
      setResult(finalResult);
      setInput('');
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result || input}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {isPortrait ? renderPortraitButtons(handlePress) : renderLandscapeButtons(handlePress)}
      </View>
    </View>
  );
};

const renderPortraitButtons = (handlePress) => {
  const buttons = [
    ['AC', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', ',', '='],
  ];

  return buttons.map((row, rowIndex) => (
    <View key={rowIndex} style={styles.row}>
      {row.map((button, buttonIndex) => (
        <CalculateButton
          key={buttonIndex}
          label={button}
          onPress={handlePress}
          style={[
            styles.buttonPortrait,
            button === '0' ? styles.zeroButton : null,
            isOperator(button) ? styles.operatorButton : null,
            button === 'AC' ? styles.acButton : null,
          ]}
          textStyle={styles.buttonText}
        />
      ))}
    </View>
  ));
};

const renderLandscapeButtons = (handlePress) => {
  const buttons = [
    ['(', ')', 'mc', 'm+', 'm-', 'mr', 'AC', '÷'],
    ['2ⁿᵈ', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9', '×'],
    ['1/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', '4', '5', '6', '-'],
    ['x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+'],
    ['Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', ',', '='],
  ];

  return buttons.map((row, rowIndex) => (
    <View key={rowIndex} style={styles.row}>
      {row.map((button, buttonIndex) => (
        <CalculateButton
          key={buttonIndex}
          label={button}
          onPress={handlePress}
          style={[
            styles.buttonLandscape,
            button === '0' ? styles.zeroButton : null,
            isOperator(button) ? styles.operatorButton : null,
            isFunction(button) || isMemoryFunction(button) ? styles.functionButton : null,
            button === 'AC' ? styles.acButton : null,
          ]}
          textStyle={
            isFunction(button) || isMemoryFunction(button)
              ? styles.smallButtonText
              : styles.buttonText
          }
        />
      ))}
    </View>
  ));
};

const isMemoryFunction = (button) => {
  return ['(', ')', 'mc', 'm+', 'm-', 'mr'].includes(button);
};

const isFunction = (button) => {
  return [
    '2ⁿᵈ', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '1/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀',
    'x!', 'sin', 'cos', 'tan', 'e', 'EE', 'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand'
  ].includes(button);
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
    flex: 1,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },
  resultText: {
    color: '#00d9ff',
    fontSize: 50,
  },
  buttonsContainer: {
    flex: 4,
    padding: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonPortrait: {
    backgroundColor: '#505050',
    flex: 1,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 85,
    borderRadius: 5,
  },
  buttonLandscape: {
    backgroundColor: '#505050',
    flex: 1,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
  },
  zeroButton: {
    flex: 2.2,
  },
  operatorButton: {
    backgroundColor: '#ffa500',
  },
  acButton: {
    backgroundColor: '#505050',
    flex: 3.3,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderRadius: 5,
  },
  functionButton: {
    backgroundColor: '#424242',
    height: 50,
    width: 50,
    margin: 4,
  },
  smallButtonText: {
    fontSize: 15,
    color: '#ffffff',
  },
});

export default Calculator;
