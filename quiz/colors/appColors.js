import {Appearance} from 'react-native';

const colorsLight = {
    bgPrimary: "#FDFDFF",
    bgSecondary: '#f3f3f3'
}

const colorsDark = {
    bgPrimary: "#020202",
    bgSecondary: "#343434"
}

export default APPCOLORS = (Appearance.getColorScheme() === 'dark') ? colorsDark : colorsLight;