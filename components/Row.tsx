import { View, type ViewProps, type ViewStyle } from 'react-native';

type Props =  ViewProps & {
    gap?: number;
};

export function Row({ style, gap, ...rest }: Props) {
    return (
        <View style={[rowStyles, style]} {...rest}/>
    );
};

const rowStyles = {
        flexDirection: 'row',
        alignItems: 'center',
} satisfies ViewStyle;