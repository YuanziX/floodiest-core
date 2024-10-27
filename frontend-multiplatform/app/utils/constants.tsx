const baseURL = "http://155.248.241.153:1194/";
const version = "v1/";

const versionURL = `${baseURL}${version}`;

const healthCheck = `${versionURL}healthz`;
const login = `${versionURL}auth/login`;

const proximityLocations = `${versionURL}user-proximity-locations`;

const attendance = `${versionURL}attendance/`;

const checkin = `${attendance}checkin`;
const checkout = `${attendance}checkout`;

const manualCheckin = `${attendance}manual-checkin`;
const manualCheckout = `${attendance}manual-checkout`;

const currentAttendance = `${attendance}current`;
const attendanceHistory = `${attendance}history`;
const attendanceReport = `${attendance}report`;

export {
    healthCheck,
    login,
    proximityLocations,
    checkin,
    checkout,
    manualCheckin,
    manualCheckout,
    currentAttendance,
    attendanceHistory,
    attendanceReport,
};
