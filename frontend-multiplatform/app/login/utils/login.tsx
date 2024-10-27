import { Alert } from "react-native";
import { login } from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginResponse {
    id: string;
    name: string;
    email: string;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
    api_key: string;
}

export async function loginFunc(
    email: string,
    password: string
): Promise<string[] | null> {
    try {
        const response = await fetch(login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();

            if (errorData.error === "incorrect password") {
                Alert.alert(
                    "Login Error",
                    "The password you entered is incorrect."
                );
            } else {
                throw new Error(errorData.error || "Login failed");
            }

            return null;
        }

        const userData: LoginResponse = await response.json();
        await AsyncStorage.setItem("name", userData.name);
        await AsyncStorage.setItem("api", userData.api_key);
        return [userData.name, userData.api_key];
    } catch (error) {
        if (error instanceof Error) {
            Alert.alert("Login Error", error.message);
        } else {
            Alert.alert("Login Error", "An unexpected error occurred");
        }
        return null;
    }
}
