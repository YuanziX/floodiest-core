import React, { useState, useEffect } from "react";
import { useColorScheme, View, Text } from "react-native";
import { getTheme } from "../utils/theme";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { getApiFromGlobal } from "../utils/api";
import CurrentAttendanceCard from "../components/home/CurrentAttendanceCard";
import MyButton from "../components/MyButton";
import { doCheckout } from "../data/attendance";
import { Ionicons } from "@expo/vector-icons";
import StatsCard from "../components/home/StatsCard";
import { fetchReport, Report } from "../data/statistics";

export default function HomeScreen() {
    const theme = getTheme(useColorScheme() === "dark");
    const global = useGlobalSearchParams();
    const api = getApiFromGlobal(global.api);
    const router = useRouter();
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [checkCurrent, setCheckCurrent] = useState(true);
    const [report, setReport] = useState<Report | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadReport = async () => {
            try {
                const data = await fetchReport(api);
                setReport(data);
            } catch (error) {
                console.error("Failed to fetch report:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadReport();
    }, [api]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.backgroundColor,
            }}
        >
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
                    Hi there, {global.name}
                </Text>
            </View>
            <Text
                style={{
                    color: theme.containerTextColor,
                    fontSize: 20,
                    paddingLeft: 2,
                    fontWeight: "bold",
                    marginHorizontal: 16,
                    marginBottom: 6,
                }}
            >
                Your Attendance Report
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    marginBottom: 16,
                    marginHorizontal: 16,
                    justifyContent: "space-between",
                }}
            >
                <StatsCard
                    theme={theme}
                    label="Total Time"
                    value={formatTime(report?.total_seconds || 0)}
                    icon={
                        <Ionicons
                            name="time-outline"
                            size={24}
                            color={theme.containerTextColor}
                        />
                    }
                    isLoading={isLoading}
                    style={{ width: "48%" }}
                />
                <StatsCard
                    theme={theme}
                    label="Days Attended"
                    value={report?.num_days_attended.toString() || "0"}
                    icon={
                        <Ionicons
                            name="calendar-outline"
                            size={24}
                            color={theme.containerTextColor}
                        />
                    }
                    isLoading={isLoading}
                    style={{ width: "48%" }}
                />
            </View>

            <Text
                style={{
                    color: theme.containerTextColor,
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingLeft: 2,
                    marginHorizontal: 16,
                    marginBottom: 0,
                }}
            >
                Current Attendance
            </Text>

            <CurrentAttendanceCard
                api={api}
                theme={theme}
                style={{ marginBottom: 16 }}
                checkCurrent={checkCurrent}
                setCheckCurrent={setCheckCurrent}
            />

            <Text
                style={{
                    color: theme.containerTextColor,
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingLeft: 2,
                    marginHorizontal: 16,
                    marginBottom: 6,
                }}
            >
                Check in Manually
            </Text>

            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 16,
                }}
            >
                <MyButton
                    label="Check In"
                    onPress={() => {
                        router.push({
                            pathname: "/sub/selectLocations",
                            params: { api: api },
                        });
                    }}
                    theme={theme}
                    isLoading={false}
                    style={{
                        width: "48%",
                    }}
                />
                <MyButton
                    label="Check Out"
                    onPress={async () => {
                        setCheckoutLoading(true);
                        const res = await doCheckout(api);
                        if (res) {
                            setCheckCurrent(true);
                        }
                        setCheckoutLoading(false);
                    }}
                    theme={theme}
                    isLoading={checkoutLoading}
                    style={{
                        width: "48%",
                        backgroundColor: theme.surfaceColor,
                    }}
                    textStyle={{
                        color: theme.surfaceTextColor,
                    }}
                />
            </View>
        </View>
    );
}
