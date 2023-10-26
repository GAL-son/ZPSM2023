/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
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

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [hidden, setHidden] = useState(true);

  const buttonPressed = () => {
    setHidden(!hidden);
  }

  const buttonText = hidden ? "Pokaż" : "Ukryj";

  return (
    <View style = {styles.container}>
        <View>
          <Text style = {styles.text}>Zadanie 2</Text>
          <TouchableOpacity 
              onPress={buttonPressed}
              style = {{alignItems:'center', backgroundColor: '#beda51', padding: 10}}>
            <Text>{buttonText}</Text>
          </TouchableOpacity>
        </View>
        {!hidden && (
          <View style={styles.hiddenContent}>
          <Text>Nazywam się</Text>
          <Text style = {{fontWeight: 'bold'}}>Bartłomiej Gala</Text>
        </View>
        )}                  
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    margin: 8,
    fontSize: 30,
  },
  hiddenContent: {
    marginTop: 20,
    alignItems: 'center',
  }
});

export default App;
