/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { TouchableOpacity } from 'react-native';
import MyButton from './components/MyButton';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [textContent, setText] = useState(" ");
  const [isResult, setIsResult] = useState(false);

  const type = (snum : string) => {
      setText(textContent + snum)
      setIsResult(false);
  }

  const clear = () => {
    setText('');
    setIsResult(false);
  }

  const deleteInput = () => {
    setText(textContent.substring(0,textContent.length-1));
    setIsResult(false);
  }

  const calculate = () => {
    setIsResult(true);
    try {
      const result = eval(textContent);
      setText(result.toString());
    } catch(e) {
      setText('ERROR');
    }
  }

  const buttons = [
    'AC', '', '', '<==',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
  ];

  const generateButtons = () => {
    // Generate 
    return (
      <View style={styles.buttonContainer}>
        {buttons.map((button, index) => {
              const isNumber = !isNaN(parseInt(button)) || button === '.';
              return (
                <MyButton 
                  key={index}
                  value={button} 
                  styleButton={[
                    styles.button,
                    isNumber ? styles.buttonNormal : styles.buttonSpecial
                  ]}
                  styleText={styles.buttonText}
                  onPress={() => {
                    if (button === '=') {
                      calculate();
                    } else if (button === 'AC') {
                      clear();
                    } else if (button === '<==') {
                      deleteInput();
                    } else {
                      type(button);
                    }
                  }}
                />

              // <TouchableOpacity
              //         key={index}
              //         style={[
              //           styles.button,
              //           isNumber ? styles.buttonNormal : styles.buttonSpecial
              //         ]}
                      // onPress={() => {
                      //   if (button === '=') {
                      //     calculate();
                      //   } else if (button === 'AC') {
                      //     clear();
                      //   } else if (button === '<==') {
                      //     deleteInput();
                      //   } else {
                      //     type(button);
                      //   }
                      // }}
              //     >
              //       <Text style={styles.buttonText}>{button}</Text>
              //     </TouchableOpacity>
              );
            })}
      </View>
    );
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={[styles.input,( isResult ? styles.inputResult : styles.inputNormal)]}>{textContent}</Text>
      </View>
      {generateButtons()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: "#dfe0e2",
  },

  inputContainer: {
    //backgroundColor: "#555555",
    padding: 15,
    height: 'auto',
    alignItems: 'flex-end',
  },

  input: {
    fontSize: 45,
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
    height: 100,
    width: '25%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 25,
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

  buttonDoubleWidth: {
    width: '50%',
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

export default App;
