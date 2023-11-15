import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToastAndroid,
} from 'react-native';

import MyButton from '../components/MyButton';
import Calculator from '../logic/calculations';
import { string } from 'mathjs';

type myViewParams = {
    calculator: Calculator;
    styleBasic: any;
    styleOrientation: any;    
    buttons: string[];
    colorArray: number[];
}

const CalcView = (params: myViewParams) => {
    const [textContent, setText] = useState(" ");
    const [isResult, setIsResult] = useState(false);

    const colorArray = [
        params.styleBasic.color0,
        params.styleBasic.color1,
        params.styleBasic.color2,
        params.styleBasic.color3,
    ]

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
        params.calculator.delete();
        setText(params.calculator.getText());
        setIsResult(false);
    }

    const calculate = () => {
        setIsResult(true);
        params.calculator.calculate();
        setText(params.calculator.getText());
    }

    const handleMemory = (button: string) => {
        let toastText: string = "";
        switch (button) {
            case "mc":
                params.calculator.memoryClear();
                toastText = "Memory has been cleared!";
                break;
            case "mr":
                params.calculator.memoryRecall();
                break;
            case "m+":
                calculate();                
                if(params.calculator.isError) {
                    toastText = "ERROR occured"
                } else {
                    params.calculator.memoryAdd();
                    toastText = "Added to memory"
                }
                break;
            case "m-":
                calculate();                
                if(params.calculator.isError) {
                    toastText = "ERROR occured"
                } else {
                    params.calculator.memorySubtract();
                    toastText = "Subtracted from memory"
                }
                break;
            default:
                break;
        }

        ToastAndroid.show(toastText, ToastAndroid.SHORT);
    }



    const generateButtons = () => {
        // Generate 
        return (
            <View style={[params.styleBasic.buttonContainer]}>
                {params.buttons.map((button, index) => {
                    const isNumber = !isNaN(parseInt(button)) || button === '.';
                    return (
                        <MyButton
                            key={index}
                            value={button}
                            styleButton={[
                                params.styleBasic.button,   
                                params.styleOrientation.button,
                                colorArray[params.colorArray[index]]
                            ]}
                            styleText={[
                                params.styleOrientation.buttonText,
                                (params.colorArray[index] == 0) ? params.styleBasic.textLight : params.styleBasic.textDefault
                            ]}
                            onPress={() => {
                                switch (button) {
                                    case "=":
                                        calculate();
                                        break;
                                    case "AC":
                                        clear();
                                        break;
                                    case "<==":
                                        deleteInput();
                                        break;
                                    case "mc":
                                    case "m+":
                                    case "m-":
                                    case "mr":
                                        handleMemory(button);
                                        break;
                                    default:
                                        
                                }
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
        <View style={params.styleBasic.container}>
            <View style={styles.inputContainer}>
                <Text style={[styles.input, (isResult ? params.styleBasic.inputResult : params.styleBasic.inputNormal)]}>{textContent}</Text>
            </View>
            {generateButtons()}
        </View>
    );
}

const styles = StyleSheet.create({
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
});

export default CalcView;