import React from "react";
import { View } from "react-native";
import StartScreen from "../start";

export default function HomeScreen() {
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <StartScreen />
        </View>
    );
}
