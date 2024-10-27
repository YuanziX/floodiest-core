import React, { useState } from "react";
import {
    View,
    useColorScheme,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import MyButton from "../components/MyButton";
import { getTheme } from "../utils/theme";
import styles from "./loginStyles";
import { loginFunc } from "./utils/login";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";
    const theme = getTheme(isDarkMode);

    const router = useRouter();

    const handleSubmit = async () => {
        if (email.trim() && password.trim()) {
            setIsLoading(true);
            const data = await loginFunc(email, password); // gets null, or list(name, api)
            setIsLoading(false);

            if (data) {
                router.replace({
                    pathname: "/dash/home",
                    params: { name: data[0], api: data[1] },
                });
            }
        } else {
            Alert.alert("Login Error", "Please enter both email and password");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.screen, { backgroundColor: theme.backgroundColor }]}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Icon
                        name="fingerprint"
                        color={theme.backgroundColor}
                        size={100}
                        style={[
                            styles.icon,
                            { backgroundColor: theme.containerTextColor },
                        ]}
                    />
                    <View
                        style={[
                            styles.container,
                            { backgroundColor: theme.surfaceColor },
                        ]}
                    >
                        <EmailInput
                            email={email}
                            setEmail={setEmail}
                            theme={theme}
                        />
                        <PasswordInput
                            password={password}
                            setPassword={setPassword}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            theme={theme}
                        />
                    </View>
                    <MyButton
                        label={"Sign In"}
                        onPress={handleSubmit}
                        theme={theme}
                        isLoading={isLoading}
                        style={{
                            marginTop: 20,
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
