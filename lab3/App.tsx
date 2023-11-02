/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import VerricalView from './screens/VerticalView';
import HorizontalView from './screens/HorizontalView';
import { Dimensions, View } from 'react-native';
import { useState } from "react";

function App(): JSX.Element {
  
  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  const [orientation, setOrientation] = useState(isPortrait() ? 'portrait' : 'landscape');

  Dimensions.addEventListener('change', () => {
    setOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  return(
    <>
      {(orientation==='portrait') ? <VerricalView/> : <HorizontalView/>}
    </>
  )
}

export default App;
