/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { Dimensions, StyleSheet, } from 'react-native';
import { useState } from "react";

import VericalView from './screens/VerticalView';
import HorizontalView from './screens/HorizontalView';

import Calculator from './logic/calculations';
import CalcView from './screens/CalcView';

function App(): JSX.Element {
  const calc = new Calculator();
  
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
    '(',    ')',    'mc',   'm+',   'm-',   'mr',   'AC',   '+/-',  '%',    '<==',
    '2nd',  'x^2',  'x^3',  'x^y',  'e^x',  '10^x', '7',    '8',    '9',    '/',
    '1/x',  '√(2)', '√(3)', '√(x)', 'ln',   'log10','4',    '5',    '6',    '*',
    'x!',   'sin',  'cos',  'tan',  'e',    'EE',   '1',    '2',    '3',    '-',
    'Rad',  'sinh', 'cosh', 'tanh', 'pi',   'Rand', '0',    '.',    '=',    '+',
  ];

  return(
    <CalcView 
      calculator={calc} 
      styleBasic={styles} 
      styleOrientation={(orientation === 'portrait') ? stylesPortrait : stylesLandscape}
      buttons={(orientation === 'portrait') ? buttonsPortrait : buttonsLandscape}
    />
    // <>
    //   {(orientation==='portrait') ? <VericalView calculator = {calc}/> : <HorizontalView/>}
    // </>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: "#dfe0e2",
  },

  inputContainer: {
      padding: 15,
      height: 'auto',
      alignItems: 'flex-end',
  },

  inputNormal: {
      color: '#607285'
  },

  inputResult: {
      color: '#3b28cc'
  },

  buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
  },

  button: {
      justifyContent: 'center',
      alignItems: 'center',
  },

  buttonNormal: {
      backgroundColor: '#75abbc'
  },

  buttonSpecial: {
      backgroundColor: '#3b28cc'
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
      backgroundColor: '#555555',
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
    height: 45,
     width: '9.999%',
    padding: 10,
  },

  buttonText: {
    fontSize: 18,
  }
});

export default App;
