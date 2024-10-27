import * as ExpoLocation from "expo-location";
import { proximityLocations } from "../utils/constants";

export interface Location {
    id: string;
    name: string;
    distance: number;
    radius: number;
}

export const fetchProximityLocations = async (
    api: string
): Promise<Location[]> => {
    const location = await ExpoLocation.getCurrentPositionAsync({});
    const { latitude: lat, longitude: lon } = location.coords;

    const response = await fetch(proximityLocations, {
        method: "POST",
        headers: {
            Authorization: `ApiKey ${api}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ latitude: lat, longitude: lon }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch locations");
    }

    return response.json();
};
