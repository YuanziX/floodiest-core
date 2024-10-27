import { Attendance, getCurrentAttendance } from "@/app/data/attendance";
import { Theme } from "@/app/utils/theme";
import React, { ReactNode, useEffect, useState } from "react";
import {
    ActivityIndicator,
    View,
    Text,
    ViewStyle,
    StyleProp,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CardContainer = ({
    children,
    style,
    theme,
}: {
    children: ReactNode;
    style: StyleProp<ViewStyle>;
    theme: Theme;
}) => (
    <View
        style={[
            style,
            {
                width: "97%",
                alignItems: "center",
                alignSelf: "center",
            },
        ]}
    >
        <View
            style={{
                height: 85,
                flexDirection: "column",
                width: "95%",
                paddingHorizontal: 12,
                backgroundColor: theme.surfaceColor,
                borderRadius: 16,
                marginTop: 8,
            }}
        >
            {children}
        </View>
    </View>
);

const AttendanceStatus = ({
    isCheckedIn,
    checkinTime,
    theme,
}: {
    isCheckedIn: boolean;
    checkinTime: string;
    theme: Theme;
}) => (
    <View style={{ flex: 1, flexDirection: "row" }}>
        <Ionicons
            name={isCheckedIn ? "checkmark-circle" : "close-circle"}
            size={24}
            color={isCheckedIn ? theme.successColor : theme.errorColor}
            style={{ marginRight: 16 }}
        />
        <Text
            style={{
                fontSize: 20,
                color: isCheckedIn
                    ? theme.placeholderTextColor
                    : theme.surfaceTextColor,
            }}
        >
            {isCheckedIn
                ? `Checked-in since ${new Date(checkinTime).toLocaleTimeString(
                      [],
                      {
                          hour: "2-digit",
                          minute: "2-digit",
                      }
                  )}`
                : "Not Checked in"}
        </Text>
    </View>
);

export default function CurrentAttendanceCard({
    api,
    theme,
    style,
    checkCurrent,
    setCheckCurrent,
}: {
    api: string;
    theme: Theme;
    style?: StyleProp<ViewStyle>;
    checkCurrent: boolean;
    setCheckCurrent: (value: boolean) => void;
}) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Attendance | null>(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            setLoading(true);
            try {
                const result = await getCurrentAttendance(api);
                setData(result);
            } catch (error) {
                console.error("Failed to fetch attendance:", error);
            } finally {
                setLoading(false);
            }
        };

        if (checkCurrent) {
            fetchAttendance();
            setCheckCurrent(false);
        }
    }, [checkCurrent, api, setCheckCurrent]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <ActivityIndicator
                    size="large"
                    color={theme.containerTextColor}
                />
            );
        }

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    paddingVertical: 8,
                    paddingHorizontal: 2,
                }}
            >
                <Text
                    style={{
                        fontWeight: "600",
                        fontSize: 24,
                        color: theme.surfaceTextColor,
                        marginBottom: 8,
                    }}
                >
                    Current Attendance
                </Text>
                <AttendanceStatus
                    isCheckedIn={data !== null}
                    checkinTime={data?.checkin_time || ""}
                    theme={theme}
                />
            </View>
        );
    };

    return (
        <CardContainer
            style={[
                style,
                {
                    justifyContent: "center",
                    alignItems: "center",
                },
            ]}
            theme={theme}
        >
            {renderContent()}
        </CardContainer>
    );
}
