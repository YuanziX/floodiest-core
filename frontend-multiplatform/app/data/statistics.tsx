import { attendanceReport } from "../utils/constants";

interface Report {
    user_id: string;
    total_seconds: number;
    num_days_attended: number;
}

const fetchReport = async (api: string): Promise<Report> => {
    const response = await fetch(attendanceReport, {
        method: "GET",
        headers: {
            Authorization: `ApiKey ${api}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to get statistics");
    }

    return response.json();
};

export { fetchReport, Report };
