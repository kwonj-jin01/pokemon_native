import React from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { Card } from "./Card";
import { Row } from "./Row";

type Props = {
    value: "id" | "name";
    onChange: (v: "id" | "name") => void;
};

const options = [
    { label: "Number", value: "id" },
    { label: "Name", value: "name" },

]

export function SortButton({ value, onChange }: Props) {
    const colors = useThemeColors();
    const [ismodalVisible, setmodalVisiblility] = useState(false);
    const onButtonPress = () => {
        setmodalVisiblility(true);
    };
    const onClose = () => {
        setmodalVisiblility(false);
    };

    return (
        <>
            <Pressable onPress={onButtonPress}>
                <View style={[styles.button, { backgroundColor: colors.grayWhite }]}>
                    <Image
                        source={
                            value === "id"
                                ? require('@/assets/images/number.png')
                                : require('@/assets/images/alpha.png')
                        }
                        width={16}
                        height={16}
                    />
                </View>
            </Pressable>
            <Modal transparent visible={ismodalVisible} onRequestClose={onClose}>
                <View style={[styles.popup, { backgroundColor: colors.tint }]}>
                    <ThemedText style={styles.title} variant="subtitle2" color="grayWhite">
                        Sort by:
                    </ThemedText>
                    <Card style={styles.card}>
                        {options.map(option => (
                            <Row key={option.value}>
                                <ThemedText>{option.label}</ThemedText>
                            </Row>
                        ))}
                    </Card>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 32,
        height: 32,
        borderRadius: 32,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',

    },
    bacdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    popup: {
        padding: 4,
        paddingTop: 16,
        gap: 16,
        borderRadius: 12,
    },
    title: {
        paddingLeft: 20,
    },
    card: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        gap: 16,
    }
});