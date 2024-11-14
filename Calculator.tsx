import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import CalculateButton from './CalculateButton';
import SplashScreen from 'react-native-splash-screen';

const Calculator = () => {
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const handlePress = (value: string) => {
    if (value === 'AC') {
      setInput('');
      setResult('');
      setIsResultDisplayed(false);
    } else if (['+', '-', '×', '÷', '%', '√'].includes(value)) {
      // If a result is already displayed, use it as the starting point for the next calculation
      if (isResultDisplayed) {
        setInput(result + ` ${value} `);
        setIsResultDisplayed(false);
      } else {
        setInput((prev) => prev + ` ${value} `);
      }
    } else if (value === '=') {
      calculateResult();
    } else if (value === ',' || value === '.') {
      setInput((prev) => (prev.includes('.') ? prev : prev + '.'));
    } else if (['x²', 'x³', 'eˣ', '10ˣ', '1/x', '²√x', '³√x', 'ln', 'log₁₀', 'x!', 'sin', 'cos', 'tan'].includes(value)) {
      scientificCalculate(value);
    } else {
      if (isResultDisplayed) {
        setInput(value);
        setIsResultDisplayed(false);
      } else {
        setInput((prev) => prev + value);
      }
    }
  };

  const calculateResult = () => {
    try {
      let formattedEquation = input
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/√/g, 'Math.sqrt')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E');

      const finalResult = eval(formattedEquation).toString();
      setResult(finalResult);
      setInput(finalResult);
      setIsResultDisplayed(true);
    } catch (error) {
      setResult('Error');
    }
  };

  const scientificCalculate = (func: string) => {
    let x = parseFloat(input);
    let calcResult = '';

    switch (func) {
      case 'x²':
        calcResult = (x ** 2).toString();
        break;
      case 'x³':
        calcResult = (x ** 3).toString();
        break;
      case 'eˣ':
        calcResult = Math.exp(x).toString();
        break;
      case '10ˣ':
        calcResult = (10 ** x).toString();
        break;
      case '1/x':
        calcResult = x !== 0 ? (1 / x).toString() : 'Error';
        break;
      case '²√x':
        calcResult = Math.sqrt(x).toString();
        break;
      case '³√x':
        calcResult = Math.cbrt(x).toString();
        break;
      case 'ln':
        calcResult = x > 0 ? Math.log(x).toString() : 'Error';
        break;
      case 'log₁₀':
        calcResult = x > 0 ? Math.log10(x).toString() : 'Error';
        break;
      case 'x!':
        calcResult = factorial(x).toString();
        break;
      case 'sin':
        calcResult = trigValue('sin', x);
        break;
      case 'cos':
        calcResult = trigValue('cos', x);
        break;
      case 'tan':
        calcResult = trigValue('tan', x);
        break;
      default:
        return;
    }

    setResult(calcResult);
    setInput('');
  };

  const factorial = (n: number) => {
    if (n < 0) return 'Error';
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const trigValue = (func: string, angle: number) => {
    const angleMap = {
      30: { sin: '1/2', cos: '√3/2', tan: '1/√3' },
      45: { sin: '√2/2', cos: '√2/2', tan: '1' },
      60: { sin: '√3/2', cos: '1/2', tan: '√3' },
    };

    if (angleMap[angle]) {
      return angleMap[angle][func];
    }
    
    const radians = (angle * Math.PI) / 180;
    switch (func) {
      case 'sin':
        return Math.sin(radians).toString();
      case 'cos':
        return Math.cos(radians).toString();
      case 'tan':
        return Math.tan(radians).toString();
      default:
        return 'Error';
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

const renderPortraitButtons = (handlePress: { (value: string): void; (arg0: string): any; }) => {
  const rowsPortrait = [
    [
      { title: 'AC', backgroundColor: '#636466', color: '#e8e9ea', style: styles.acButton },
      { title: '÷', backgroundColor: '#ff9a00', color: '#e8e9ea', style: styles.divideButton },
    ],
    [
      { title: '7', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '8', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '9', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '×', backgroundColor: '#ff9a00', color: '#e8e9ea' },
    ],
    [
      { title: '4', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '5', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '6', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '-', backgroundColor: '#ff9a00', color: '#e8e9ea' },
    ],
    [
      { title: '1', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '2', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '3', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '+', backgroundColor: '#ff9a00', color: '#e8e9ea' },
    ],
    [
      { title: '0', backgroundColor: '#636466', color: '#e8e9ea', style: styles.zeroButton },
      { title: ',', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '=', backgroundColor: '#ff9a00', color: '#e8e9ea' },
    ],
  ];

  return rowsPortrait.map((row, rowIndex) => (
    <View key={rowIndex} style={styles.row}>
      {row.map((button, buttonIndex) => (
        <CalculateButton
          key={buttonIndex}
          label={button.title}
          onPress={() => handlePress(button.title)}
          style={[styles.buttonPortrait, { backgroundColor: button.backgroundColor }, button.style || null]}
          textStyle={{ color: button.color }}
        />
      ))}
    </View>
  ));
};

const renderLandscapeButtons = (handlePress: { (value: string): void; (arg0: string): any; }) => {
  const rowsLandscape = [
    [
      { title: '(', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: ')', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'mc', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'm+', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'm-', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'mr', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'AC', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '÷', backgroundColor: '#ff9a00', color: '#e8e9ea' },
    ],
    [
      { title: '2ⁿᵈ', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'x²', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'x³', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'xʸ', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'eˣ', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '10ˣ', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '7', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '8', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '9', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '×', backgroundColor: '#ff9a00', color: '#e8e9ea' },
    ],
    [
      { title: '1/x', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '²√x', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '³√x', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'ʸ√x', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'ln', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'log₁₀', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '4', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '5', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '6', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '-', backgroundColor: '#ff9a00', color: '#e8e9ea' },
    ],
    [
      { title: 'x!', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'sin', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'cos', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'tan', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'e', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'EE', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '1', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '2', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '3', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '+', backgroundColor: '#ff9a00', color: '#e8e9ea' },
    ],
    [
      { title: 'Rad', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'sinh', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'cosh', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'tanh', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'π', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: 'Rand', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '0', backgroundColor: '#636466', color: '#e8e9ea', style: styles.zeroButton },
      { title: ',', backgroundColor: '#636466', color: '#e8e9ea' },
      { title: '=', backgroundColor: '#ff9a00', color: '#e8e9ea' },
    ],
  ];

  return rowsLandscape.map((row, rowIndex) => (
    <View key={rowIndex} style={styles.row}>
      {row.map((button, buttonIndex) => (
        <CalculateButton
          key={buttonIndex}
          label={button.title}
          onPress={() => handlePress(button.title)}
          style={[styles.buttonLandscape, { backgroundColor: button.backgroundColor }, button.style || null]}
          textStyle={{ color: button.color }}
        />
      ))}
    </View>
  ));
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
  divideButton: {
    flex: 1,
  },

  acButton: {
    flex: 3.1,
  },
  zeroButton: {
    flex: 2.1,
  },
});

export default Calculator;
