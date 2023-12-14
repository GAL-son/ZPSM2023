import {Appearance} from 'react-native';

const colorsLight = {
    bgPrimary: "#FDFDFF",
    bgSecondary: '#f3f3f3',
    action: "#70e000",
    danger: '#c1121f',
}

const colorsDark = {
    bgPrimary: "#020202",
    bgSecondary: "#343434",
    action: "#2c6e49",
    danger: '#780000'
}


export default APPSTYLE = (Appearance.getColorScheme() === 'dark') ? colorsDark : colorsLight;
