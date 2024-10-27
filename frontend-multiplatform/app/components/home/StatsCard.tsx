import { Theme } from "@/app/utils/theme";
import React, { ReactNode } from "react";
import { View, Text, ViewStyle, ActivityIndicator } from "react-native";

export default function StatsCard({
    theme,
    label,
    value,
    isLoading,
    style,
    icon,
}: {
    theme: Theme;
    label: string;
    value: string;
    icon: ReactNode;
    isLoading: boolean;
    style?: ViewStyle;
}) {
    return (
        <View
            style={[
                style,
                {
                    borderRadius: 10,
                    padding: 15,
                    alignItems: "center",
                    backgroundColor: theme.surfaceColor,
                    justifyContent: "center",
                    minHeight: 100,
                },
            ]}
        >
            {isLoading ? (
                <ActivityIndicator
                    size="large"
                    color={theme.containerTextColor}
                />
            ) : (
                <>
                    {icon}
                    <Text
                        style={{
                            fontSize: 14,
                            marginTop: 5,
                            color: theme.containerTextColor,
                        }}
                    >
                        {label}
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginTop: 5,
                            color: theme.containerTextColor,
                        }}
                    >
                        {value}
                    </Text>
                </>
            )}
        </View>
    );
}
