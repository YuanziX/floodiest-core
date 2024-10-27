import React, { useEffect, useState } from "react";
import { View, Alert, Linking, useColorScheme, Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { getTheme } from "../utils/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import MyButton from "../components/MyButton";

const openSettings = () => {
    if (Platform.OS === "ios") {
        Linking.openURL("app-settings:");
    } else {
        Linking.openSettings();
    }
};

export default function StartScreen() {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";
    const theme = getTheme(isDarkMode);
    const router = useRouter();

    const [permissionGranted, setPermissionGranted] = useState(true);

    const checkLocationPermission = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setPermissionGranted(false);
                Alert.alert(
                    "Permission Required",
                    "Location permission is required to use this app. Grant from settings.",
                    [
                        {
                            text: "Open Settings",
                            onPress: () => {
                                openSettings();
                            },
                        },
                        {
                            text: "OK",
                            onPress: () => {},
                        },
                    ]
                );
                return;
            }

            setPermissionGranted(true);

            const checkAPIKey = async () => {
                try {
                    const api = await AsyncStorage.getItem("api");
                    const name = await AsyncStorage.getItem("name");
                    if (api) {
                        router.replace({
                            pathname: "/dash/home",
                            params: { name: name, api: api },
                        });
                    } else {
                        router.replace("/login");
                    }
                } catch (error) {
                    console.error("Error checking API key:", error);
                }
            };
            checkAPIKey();
        } catch (error) {
            console.error("Error requesting location permission:", error);
        }
    };

    useEffect(() => {
        checkLocationPermission();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.surfaceColor,
            }}
        >
            <Icon
                name="fingerprint"
                color={theme.surfaceColor}
                size={150}
                style={{
                    backgroundColor: theme.containerTextColor,
                    borderRadius: 150,
                    padding: 20,
                    marginBottom: 20,
                }}
            />
            {permissionGranted === false && (
                <MyButton
                    label="Grant Permission"
                    onPress={checkLocationPermission}
                    theme={theme}
                    isLoading={false}
                />
            )}
        </View>
    );
}
