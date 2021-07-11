import Color from 'color';

let colorTheme = {
    primary: '#7E3BB2',
    primaryText: '#FFF',
    subtlePrimary: '#8861BA',
    subtlePrimaryText: '#FFF',
    darkPrimary: '#652A94',
    secondary: '#DCB0FF',
    secondaryText: '#FFF',
    subtleSecondary: '#F4EDFF',
    subtleSecondaryText: '#000',
    tertiary: '#FBF6FF',
    tertiaryText: '#000',
    lightContent: '#846D8E',
    placeholderText: '#AD8FD3',
    textLabelColor: '#846D8E',
  
}

Object.keys(colorTheme).forEach(key => {
    colorTheme[key] = Color(colorTheme[key])
});

console.log(colorTheme);

export default colorTheme;