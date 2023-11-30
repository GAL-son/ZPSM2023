import {Appearance} from 'react-native';


const colorsLight = {
    action: "#70e000",
    danger: '#c1121f'
}

const colorsDark = {
    action: "#2c6e49",
    danger: '#780000'
}

export default ACTIONCOLORS = (Appearance.getColorScheme() === 'dark') ? colorsDark : colorsLight;