import React from "react";
import {
    Pressable,
    Text,
    ActivityIndicator,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";
import { Theme } from "../utils/theme";
import styles from "../login/loginStyles";

interface SignInButtonProps {
    label: string;
    onPress: () => void;
    theme: Theme;
    isLoading: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export default function MyButton({
    label,
    onPress,
    theme,
    isLoading,
    style,
    textStyle,
}: SignInButtonProps) {
    return (
        <Pressable
            style={[
                styles.button,
                { backgroundColor: theme.containerColor },
                style,
            ]}
            onPress={onPress}
            disabled={isLoading}
            accessibilityLabel={label}
        >
            {isLoading ? (
                <ActivityIndicator color={theme.surfaceColor} />
            ) : (
                <Text
                    style={[
                        styles.buttonText,
                        { color: theme.backgroundColor },
                        textStyle,
                    ]}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    );
}
