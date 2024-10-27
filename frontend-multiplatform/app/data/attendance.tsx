import { Alert } from "react-native";
import {
    attendanceHistory,
    checkin,
    checkout,
    currentAttendance,
    manualCheckin,
} from "../utils/constants";
import { Location as loc } from "./locations";

interface Attendance {
    id: string;
    user_id: string;
    checkin_time: string;
    checkout_time: string;
    location_id: string;
    location_name: string;
    is_manual: boolean;
}

const doManualCheckin = async (
    api: string,
    location: loc
): Promise<boolean> => {
    if (location.distance > location.radius) {
        throw new Error("You're too far away from the location.");
    }

    const response = await fetch(manualCheckin, {
        method: "POST",
        headers: {
            Authorization: `ApiKey ${api}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ location_id: location.id }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Check-in failed");
    }

    return true;
};

const doCheckout = async function (api: string): Promise<boolean | null> {
    try {
        const response = await fetch(checkout, {
            method: "GET",
            headers: {
                Authorization: `ApiKey ${api}`,
            },
        });

        if (!response.ok) {
            throw new Error((await response.json()).error);
        }
        return true;
    } catch (error: any) {
        Alert.alert("Error", error.message);
        return false;
    }
};

const getCurrentAttendance = async (
    api: string
): Promise<Attendance | null> => {
    try {
        const response = await fetch(currentAttendance, {
            method: "GET",
            headers: {
                Authorization: `ApiKey ${api}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            if (
                error.error === "not currently checked-in" ||
                error.error === "sql: no rows in result set"
            ) {
                throw new Error("You are not currently checked in.");
            } else {
                throw new Error("Something went wrong, please try again.");
            }
        }

        const attendance: Attendance = await response.json();
        return attendance;
    } catch (error: any) {
        if (error.message != "You are not currently checked in.")
            Alert.alert("Error", error.message || "Failed to fetch attendance");
        return null;
    }
};

const getAttendanceHistory = async (
    api: string
): Promise<Attendance[] | null> => {
    try {
        const response = await fetch(attendanceHistory, {
            method: "GET",
            headers: {
                Authorization: `ApiKey ${api}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            if (
                error.error === "not currently checked-in" ||
                error.error === "sql: no rows in result set"
            ) {
                throw new Error("You are not currently checked in.");
            } else {
                throw new Error("Something went wrong, please try again.");
            }
        }

        const attendance: Attendance[] = await response.json();
        return attendance;
    } catch (error) {
        throw error;
    }
};

export { Attendance, doManualCheckin, doCheckout, getCurrentAttendance };
