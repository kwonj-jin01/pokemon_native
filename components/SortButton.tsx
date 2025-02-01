import React, { useRef } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Image, Modal, Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { Card } from "@/components/Card";
import { Row } from "@/components/Row";
import { Radio } from "@/components/Radio";
import { Shadows } from "@/constants/Shadows";

type Props = {
    value: "id" | "name";
    onChange: (v: "id" | "name") => void;
};

const options = [
    { label: "Number", value: "id" },
    { label: "Name", value: "name" },

] as const;

export function SortButton({ value, onChange }: Props) {
    const buttonRef = useRef<View>(null);
    const colors = useThemeColors();
    const [ismodalVisible, setmodalVisiblility] = useState(false);
    const [position, setPosition] = useState<null | {
        top: number;
        right: number;
    }>(null);

    const onButtonPress = () => {
        buttonRef.current?.measureInWindow((x, y, width, height) => {
            setPosition({
                top: y + height,
                right: Dimensions.get("window").width - x - width,
            });
            setmodalVisiblility(true);
        });
    };

    const onClose = () => {
        setmodalVisiblility(false);
    };

    return (
        <>
            <Pressable onPress={onButtonPress}>
                <View 
                    ref={buttonRef}
                    style={[styles.button, { backgroundColor: colors.grayWhite }]}>
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
            <Modal
                animationType="fade"
                transparent
                visible={ismodalVisible}
                onRequestClose={onClose}>
                <Pressable style={styles.backdrop} onPress={onClose} />
                {position && (
                    <View 
                        style={[
                            styles.popup, 
                            { 
                                backgroundColor: colors.tint,
                                top: position.top,
                                right: position.right 
                            }
                        ]}>
                        <ThemedText
                            style={styles.title}
                            variant="subtitle2"
                            color="grayWhite">
                            Sort by:
                        </ThemedText>
                        <Card style={styles.card}>
                            {options.map((o) => (
                                <Pressable
                                    key={o.value}
                                    onPress={() => {
                                        onChange(o.value);
                                    }}
                                >
                                    <Row gap={18}>
                                        <Radio checked={o.value === value} />
                                        <ThemedText>{o.label}</ThemedText>
                                    </Row>
                                </Pressable>
                            ))}
                        </Card>
                    </View>
                )}
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
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    popup: {
        position: 'absolute',
        width: 113,
        padding: 4,
        paddingTop: 16,
        gap: 16,
        borderRadius: 12,
        ...Shadows.dp2,
        zIndex: 1000
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