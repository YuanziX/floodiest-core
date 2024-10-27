import { attendanceHistory } from "../utils/constants";

interface Attendance {
    id: string;
    checkin_time: string;
    checkout_time: string;
    location_id: string;
    location_name: string;
    is_manual: boolean;
    created_at: string;
}

async function getAllHistory(api: string): Promise<Attendance[] | null> {
    try {
        const response = await fetch(attendanceHistory, {
            method: "GET",
            headers: {
                Authorization: `ApiKey ${api}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            if (error.error == "sql: no rows in result set") {
                return [];
            }
            return null;
        }

        const attendanceList: Attendance[] = await response.json();
        return attendanceList;
    } catch (error) {
        throw error;
    }
}

export { Attendance, getAllHistory };
