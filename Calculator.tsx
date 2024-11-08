import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';

const Calculator = () => {
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [equation, setEquation] = useState('');
  const [specialFunction, setSpecialFunction] = useState('');

  const handlePress = (value) => {
    if (value === 'AC') {
      setInput('');
      setResult('');
      setEquation('');
      setSpecialFunction('');
    } else if (['+', '-', '×', '÷'].includes(value)) {
      setEquation((prev) => prev + input + ` ${value} `);
      setInput('');
    } else if (value === '=') {
      calculateResult();
      if (!specialFunction) {
        setEquation((prev) => prev + input + ' =');
      } else {
        setEquation(specialFunction + ' =');
      }
    } else if (['x²', 'x³', '²√x', '³√x', '10ˣ', 'ln', 'log₁₀'].includes(value)) {
      applySpecialFunction(value);
    } else {
      setInput((prev) => prev + value);
    }
  };

  const applySpecialFunction = (func) => {
    let x = parseFloat(input);
    let expression = '';
    let result = '';

    switch (func) {
      case 'x²':
        expression = `${x}^2`;
        result = (x ** 2).toString();
        break;
      case 'x³':
        expression = `${x}^3`;
        result = (x ** 3).toString();
        break;
      case '²√x':
        expression = `√(${x})`;
        result = (Math.sqrt(x)).toString();
        break;
      case '³√x':
        expression = `∛(${x})`;
        result = (Math.cbrt(x)).toString();
        break;
      case '10ˣ':
        expression = `10^${x}`;
        result = (10 ** x).toString();
        break;
      case 'ln':
        expression = `ln(${x})`;
        result = (Math.log(x)).toString();
        break;
      case 'log₁₀':
        expression = `log₁₀(${x})`;
        result = (Math.log10(x)).toString();
        break;
      default:
        return;
    }

    setSpecialFunction(expression);
    setInput('');
    setResult(result);
  };

  const calculateResult = () => {
    try {
      let finalResult = '';
      if (!specialFunction) {
        let formattedEquation = equation + input;
        formattedEquation = formattedEquation.replace(/×/g, '*').replace(/÷/g, '/');
        finalResult = eval(formattedEquation).toString();
      } else {
        finalResult = result;
      }
      setResult(finalResult);
      setInput('');
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.equationText}>{equation}{specialFunction || input}</Text>
        {result !== '' && <Text style={styles.resultText}>{result}</Text>}
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
        <TouchableOpacity
          key={buttonIndex}
          style={[
            styles.buttonPortrait,
            button === '0' ? styles.zeroButton : null,
            isOperator(button) ? styles.operatorButton : null,
            button === 'AC' ? styles.acButton : null
          ]}
          onPress={() => handlePress(button)}
        >
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>
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
        <TouchableOpacity
          key={buttonIndex}
          style={[
            styles.buttonLandscape,
            button === '0' ? styles.zeroButton : null,
            isOperator(button) ? styles.operatorButton : null,
            isFunction(button) || isMemoryFunction(button) ? styles.functionButton : null,
            button === 'AC' ? styles.acButton : null
          ]}
          onPress={() => handlePress(button)}
        >
          <Text style={isFunction(button) || isMemoryFunction(button) ? styles.smallButtonText : styles.buttonText}>
            {button}
          </Text>
        </TouchableOpacity>
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
  equationText: {
    color: '#ffffff',
    fontSize: 30,
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
  smallMemoryButton: {
    backgroundColor: '#505050',
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
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
