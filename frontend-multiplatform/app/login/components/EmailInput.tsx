import React from "react";
import { TextInput } from "react-native";
import { Theme } from "../../utils/theme";
import styles from "../loginStyles";

interface EmailInputProps {
    email: string;
    setEmail: (email: string) => void;
    theme: Theme;
}

export default function EmailInput({
    email,
    setEmail,
    theme,
}: EmailInputProps) {
    return (
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={theme.placeholderTextColor}
            style={[
                styles.textField,
                {
                    color: theme.surfaceTextColor,
                    borderColor: theme.containerTextColor,
                },
            ]}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            accessibilityLabel="Email input"
        />
    );
}
