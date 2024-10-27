import React from "react";
import { useColorScheme, View } from "react-native";
import MyButton from "../components/MyButton";
import { getTheme } from "../utils/theme";

export default function SettingsScreen() {
    const theme = getTheme(useColorScheme() === "dark");

    return <View></View>;
}
