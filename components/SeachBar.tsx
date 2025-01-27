import { StyleSheet, TextInput, Image } from 'react-native';
import { Row } from '@/components/Row';
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = {
    value: string;
    onChange: (s: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
    const colors = useThemeColors();
    return (
        <Row
        gap={18}
        style={[styles.wrapper, {backgroundColor: colors.grayWhite}]}>
            <Image source={require('@/assets/images/search.png')} width={16} height={16} />

            <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={colors.grayMedium}
            />
        </Row>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        borderRadius: 16,
        height: 32,
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        height: '100%',
        color: 'black',
    },
});