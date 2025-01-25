import { Image, StyleSheet, View, type ViewStyle } from "react-native";
import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
    style?: ViewStyle;
    id: number;
    name: string;
};

export function PokemonCard({ style, id, name }: Props) {
    const colors = useThemeColors();
    return <Card style={[style, styles.card]}>
        <View style={[styles.shadow, {backgroundColor: colors.grayBackground}]} />

        <ThemedText style={styles.id} variant="caption" color="grayMedium">#{id.toString().padStart(3, '0')}</ThemedText>
        <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` }}
            width={72}
            height={72}
        />
        <ThemedText>{name}</ThemedText>

    </Card>
}

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        alignItems: 'center',
        padding: 4
    },
    id: {
        alignSelf: 'flex-end'
    },
    shadow: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 44,
        borderRadius: 7,

    }
});