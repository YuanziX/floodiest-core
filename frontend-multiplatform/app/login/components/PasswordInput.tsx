import React from "react";
import { View, TextInput, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { Theme } from "../../utils/theme";
import styles from "../loginStyles";

interface PasswordInputProps {
    password: string;
    setPassword: (password: string) => void;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    theme: Theme;
}

export default function PasswordInput({
    password,
    setPassword,
    showPassword,
    setShowPassword,
    theme,
}: PasswordInputProps) {
    return (
        <View
            style={[
                styles.passwordContainer,
                { borderColor: theme.surfaceTextColor },
            ]}
        >
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor={theme.placeholderTextColor}
                style={[
                    styles.passwordField,
                    {
                        color: theme.surfaceTextColor,
                        borderColor: theme.containerTextColor,
                    },
                ]}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
                accessibilityLabel="Password input"
            />
            <Pressable
                onPress={() => setShowPassword(!showPassword)}
                accessibilityLabel={
                    showPassword ? "Hide password" : "Show password"
                }
            >
                <Icon
                    name={showPassword ? "eye-slash" : "eye"}
                    color={theme.containerTextColor}
                    size={20}
                    style={styles.eyeIcon}
                />
            </Pressable>
        </View>
    );
}
