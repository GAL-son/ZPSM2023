import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import MyButton from '../components/MyButton';
import Calculator from '../logic/calculations';

type myViewParams = {
    calculator: Calculator;
    styleBasic: any;
    styleOrientation: any;    
    buttons: string[];
}

const CalcView = (params: myViewParams) => {
    const [textContent, setText] = useState(" ");
    const [isResult, setIsResult] = useState(false);

    const type = (snum: string) => {
        // setText(textContent + snum)
        setIsResult(false);

        params.calculator.input(snum);
        setText(params.calculator.getText());
    }

    const clear = () => {
        params.calculator.clear();
        setText(params.calculator.getText());
        setIsResult(false);
    }

    const deleteInput = () => {
        //setText(textContent.substring(0, textContent.length - 1));
        params.calculator.delete();
        setText(params.calculator.getText());
        setIsResult(false);
    }

    const calculate = () => {
        setIsResult(true);
        params.calculator.calculate();
        setText(params.calculator.getText())
        // try {
        //     const result = eval(textContent);
        //     setText(result.toString());
        // } catch (e) {
        //     setText('ERROR');
        // }
    }

    const generateButtons = () => {
        // Generate 
        return (
            <View style={styles.buttonContainer}>
                {params.buttons.map((button, index) => {
                    const isNumber = !isNaN(parseInt(button)) || button === '.';
                    return (
                        <MyButton
                            key={index}
                            value={button}
                            styleButton={[
                                params.styleOrientation.button,
                                isNumber ? params.styleBasic.buttonNormal : params.styleBasic.buttonSpecial
                            ]}
                            styleText={params.styleOrientation.buttonText}
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
                    );
                })}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={[styles.input, (isResult ? params.styleBasic.inputResult : params.styleBasic.inputNormal)]}>{textContent}</Text>
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

export default CalcView;