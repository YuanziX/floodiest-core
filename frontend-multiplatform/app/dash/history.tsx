import React, { useEffect, useState, useCallback } from "react";
import { getTheme } from "../utils/theme";
import {
    useColorScheme,
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { getAllHistory, Attendance } from "../data/history";
import { useGlobalSearchParams } from "expo-router";

export default function HistoryScreen() {
    const theme = getTheme(useColorScheme() === "dark");
    const global = useGlobalSearchParams();
    const api = global.api as string;

    const [state, setState] = useState({
        isLoading: true,
        attendanceList: [] as Attendance[],
        error: null as string | null,
    });

    const fetchAttendanceHistory = useCallback(async () => {
        setState((prevState) => ({
            ...prevState,
            isLoading: true,
            error: null,
        }));
        try {
            const data = await getAllHistory(api);
            if (data === null) {
                throw new Error("Failed to fetch attendance history");
            }
            setState((prevState) => ({
                ...prevState,
                attendanceList: data,
                isLoading: false,
            }));
        } catch (error) {
            setState((prevState) => ({
                ...prevState,
                error:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
                isLoading: false,
            }));
        }
    }, [api]);

    useEffect(() => {
        fetchAttendanceHistory();
    }, [fetchAttendanceHistory]);

    const renderAttendanceItem = ({ item }: { item: Attendance }) => (
        <View
            style={[
                styles.attendanceItem,
                { backgroundColor: theme.surfaceColor },
            ]}
        >
            <Text
                style={[
                    styles.attendanceText,
                    { color: theme.containerTextColor },
                ]}
            >
                Check-in: {new Date(item.checkin_time).toLocaleString()}
            </Text>
            <Text
                style={[
                    styles.attendanceText,
                    { color: theme.containerTextColor },
                ]}
            >
                Check-out:{" "}
                {item.checkout_time
                    ? new Date(item.checkout_time).toLocaleString()
                    : "Not checked out"}
            </Text>
            <Text
                style={[
                    styles.attendanceText,
                    { color: theme.containerTextColor },
                ]}
            >
                Duration:{" "}
                {formatDuration(item.checkin_time, item.checkout_time)}
            </Text>

            <Text
                style={[
                    styles.attendanceText,
                    { color: theme.containerTextColor },
                ]}
            >
                Location: {item.location_name}
            </Text>
            <Text
                style={[
                    styles.attendanceText,
                    { color: theme.containerTextColor },
                ]}
            >
                Entry Type: {item.is_manual ? "Manual" : "Automatic"}
            </Text>
        </View>
    );

    const renderContent = () => {
        if (state.isLoading) {
            return (
                <ActivityIndicator size="large" color={theme.primaryColor} />
            );
        }

        if (state.error) {
            return (
                <View style={styles.centerContent}>
                    <Text
                        style={[styles.errorText, { color: theme.errorColor }]}
                    >
                        {state.error}
                    </Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={fetchAttendanceHistory}
                    >
                        <Text
                            style={[
                                styles.retryButtonText,
                                { color: theme.surfaceTextColor },
                            ]}
                        >
                            Retry
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }

        if (state.attendanceList.length === 0) {
            return (
                <View style={styles.centerContent}>
                    <Text
                        style={[
                            styles.noDataText,
                            { color: theme.surfaceTextColor },
                        ]}
                    >
                        No attendance history found.
                    </Text>
                </View>
            );
        }

        return (
            <FlatList
                data={state.attendanceList}
                renderItem={renderAttendanceItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        );
    };

    return (
        <View style={[{ flex: 1, backgroundColor: theme.backgroundColor }]}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: theme.surfaceColor,
                    height: 64,
                    marginBottom: 12,
                }}
            >
                <Text
                    style={{
                        color: theme.surfaceTextColor,
                        fontSize: 24,
                        fontWeight: "bold",
                        marginHorizontal: 16,
                    }}
                >
                    Your Attendance History
                </Text>
            </View>
            <View style={styles.container}>{renderContent()}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingBottom: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    listContainer: {
        flexGrow: 1,
    },
    attendanceItem: {
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
    },
    attendanceText: {
        fontSize: 14,
        marginBottom: 4,
    },
    centerContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: "center",
    },
    noDataText: {
        fontSize: 16,
        textAlign: "center",
    },
    retryButton: {
        padding: 12,
        backgroundColor: "#007AFF",
        borderRadius: 8,
    },
    retryButtonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

const formatDuration = (checkin_time: string, checkout_time: string) => {
    const checkinDate = new Date(checkin_time);
    const checkoutDate = new Date(checkout_time);

    const durationMs = (checkoutDate as any) - (checkinDate as any);
    const durationMinutes = Math.floor(durationMs / (1000 * 60));
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return `${hours}h ${minutes}m`;
};
