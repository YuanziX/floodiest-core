import React from "react";
import {
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    useColorScheme,
    View,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { getTheme } from "../utils/theme";

interface TabBarIconProps {
    focused: boolean;
    color: string;
    size: number;
}

const CustomTabBar: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
    const theme = getTheme(useColorScheme() === "dark");

    return (
        <View
            style={[styles.container, { backgroundColor: theme.surfaceColor }]}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={[
                            styles.tabItem,
                            isFocused && [
                                styles.focusedTabItem,
                                { backgroundColor: theme.backgroundColor },
                            ],
                        ]}
                    >
                        {options.tabBarIcon &&
                            options.tabBarIcon({
                                focused: isFocused,
                                color: isFocused
                                    ? theme.surfaceTextColor
                                    : theme.primaryColor,
                                size: 24,
                            } as TabBarIconProps)}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 64,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
    } as ViewStyle,
    tabItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        borderRadius: 16,
        marginHorizontal: 32,
        height: 36,
    } as ViewStyle,
    focusedTabItem: {} as ViewStyle,
});

export default CustomTabBar;
