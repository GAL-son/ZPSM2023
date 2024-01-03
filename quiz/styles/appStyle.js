import {Appearance} from 'react-native';

const colorsLight = {
    // Background colors
    bgPrimary: "#FDFDFF",
    bgSecondary: '#f3f3f3',
    action: "#70e000",
    danger: '#c1121f',
    accent: '',

    // Text Colors
    text: {
        regular: '#111111',
        inverse: '#EEEEEE',
        bright: '#EEEEEE',
        dark: '#333333',
    }
}

const colorsDark = {
    // Background Colors
    bgPrimary: "#020202",
    bgSecondary: "#343434",
    action: "#2c6e49",
    danger: '#780000',
    accent: '',
    
    // Text Colors
    text: {
        regular: '#EEEEEE',
        inverse: '#111111',
        bright: '#EEEEEE',
        dark: '#333333',  
    }  
}

const fonts = {
    primary: {
        regular: 'SignikaNegative-Regular',
        bold: 'SignikaNegative-Bold',
    },
    special: {
        regular: 'Comfortaa-Regular',
        bold: 'Comfortaa-Bold',
    },
}

const style = {
    colors: (Appearance.getColorScheme() === 'dark') ? colorsDark : colorsLight,
    fonts: fonts
}


export default APPSTYLE = style;
