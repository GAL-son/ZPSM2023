/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';

import { Dimensions, StyleSheet, useColorScheme, StatusBar, SafeAreaView,} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import VericalView from './screens/VerticalView';
import HorizontalView from './screens/HorizontalView';

import Calculator from './logic/calculations';
import CalcView from './screens/CalcView';
import SplashScreen from 'react-native-splash-screen';

function App(): JSX.Element {
  const calc = new Calculator();

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  const [orientation, setOrientation] = useState(isPortrait() ? 'portrait' : 'landscape');

  Dimensions.addEventListener('change', () => {
    setOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const buttonsPortrait = [
    'AC', '', '', '<==',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
  ];

  const buttonsLandscape = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', 'AC', '+/-', '%', '<==',
    '2nd', 'x^2', 'x^3', 'x^y', 'e^x', '10^x', '7', '8', '9', '/',
    '1/x', '√(2)', '√(3)', '√(x)', 'ln', 'log10', '4', '5', '6', '*',
    'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '-',
    'Rad', 'sinh', 'cosh', 'tanh', 'pi', 'Rand', '0', '.', '=', '+',
  ];

  const buttonColorMaskLandscape = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 2, 2, 2, 3,
    1, 1, 1, 1, 1, 1, 2, 2, 2, 3,
    1, 1, 1, 1, 1, 1, 2, 2, 2, 3,
    1, 1, 1, 1, 1, 1, 2, 2, 3, 3
  ];

  const buttonColorMaskPortrait = [
    0, 0, 0, 0,
    2, 2, 2, 3,
    2, 2, 2, 3,
    2, 2, 2, 3,
    2, 2, 3, 3
  ];

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <CalcView
        calculator={calc}
        styleBasic={styles}
        styleOrientation={(orientation === 'portrait') ? stylesPortrait : stylesLandscape}
        buttons={(orientation === 'portrait') ? buttonsPortrait : buttonsLandscape}
        colorArray={(orientation === 'portrait') ? buttonColorMaskPortrait : buttonColorMaskLandscape}
      />
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: "#bcffdb",
  },

  inputContainer: {
    padding: 15,
    height: 'auto',
    alignItems: 'flex-end',
  },

  inputNormal: {
    color: '#2f2f2f'
  },

  inputResult: {
    color: '#4f9d69'
  },

  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-evenly"
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  color0: {
    backgroundColor: '#2f2f2f'
  },

  color1: {
    backgroundColor: '#68d89b'
  },

  color2: {
    backgroundColor: '#8dffcd'
  },

  color3: {
    backgroundColor: '#4f9d69'
  },

  textDefault: {
    color: '#2f2f2f'
  },

  textLight: {
    color: '#bcffdb'
  },

  fieldHeight: {
    height: 100,
  },

  buttonClear: {
    backgroundColor: '#F35555'
  },

  textField: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#bcffdb',
  },

  text: {
    color: '#dddddd',
    alignSelf: 'flex-end',
    margin: 1,
    fontSize: 65,
  },
});

const stylesPortrait = StyleSheet.create({
  input: {
    fontSize: 45,
  },

  button: {
    height: 100,
    width: '25%',
    padding: 10,
  },

  buttonText: {
    fontSize: 25,
  }
});

const stylesLandscape = StyleSheet.create({
  input: {
    fontSize: 35,
  },

  button: {
    height: 48,
    width: '9.999%',
    padding: 10,
  },

  buttonText: {
    fontSize: 18,
  }
});

export default App;
