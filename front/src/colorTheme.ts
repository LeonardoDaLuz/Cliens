import Color from 'color';

const colorTheme = {
    primary: Color('#7E3BB2'),
    primaryText: Color('#FFF'),
    subtlePrimary: Color('#8861BA'),
    subtlePrimaryText: Color('#FFF'),
    darkPrimary: Color('#652A94'),
    secondary: Color('#DCB0FF'),
    secondaryText: Color('#FFF'),
    subtleSecondary: Color('#F4EDFF'),
    subtleSecondaryText: '#000',
    tertiary: Color('#FBF6FF'),
    tertiaryText: Color('#000'),
    lightContent: Color('#846D8E'),
    placeholderText: Color('#AD8FD3'),
    textLabelColor: Color('#846D8E'),
    title: Color('#5F4687'),
    inputError: Color('#992277'),
}


type convertedType<Type> = {
    [Property in keyof Type]: any; 
};

export default colorTheme as convertedType<typeof colorTheme>;