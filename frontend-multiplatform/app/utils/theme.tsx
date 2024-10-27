export interface Theme {
    surfaceColor: string;
    surfaceTextColor: string;
    containerTextColor: string;
    containerColor: string;
    placeholderTextColor: string;
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    errorColor: string;
    successColor: string;
    warningColor: string;
    infoColor: string;
    borderColor: string;
    shadowColor: string;
}

const lightTheme: Theme = {
    surfaceColor: "#cce3de", // Mint green for surface
    surfaceTextColor: "#354f52", // Darker tone for better contrast with surface (darkened Viridian)
    containerTextColor: "#2f3e46", // Even darker for container text (almost black-green)
    containerColor: "#a4c3b2", // Cambridge blue for containers
    placeholderTextColor: "#a4c3b2", // Cambridge blue for placeholder text
    backgroundColor: "#f6fff8", // Mint cream for light green background
    primaryColor: "#6b9080", // Viridian for primary elements (buttons, links, etc.)
    secondaryColor: "#57cc99", // Emerald for secondary buttons and other less prominent elements
    accentColor: "#80ed99", // Light green (more vibrant) for icons or accents
    errorColor: "#B00020", // Standard red for errors
    successColor: "#4CAF50", // Standard green for success
    warningColor: "#FFEB3B", // Standard yellow for warnings
    infoColor: "#2196F3", // Blue for informational messages
    borderColor: "#a4c3b2", // Cambridge blue for borders
    shadowColor: "#BDBDBD", // Light shadow
};

const darkTheme: Theme = {
    surfaceColor: "#486860", // Slightly lighter version of Dark Viridian for surface
    surfaceTextColor: "#f6fff8", // Mint cream text on dark surfaces
    containerTextColor: "#f6fff8", // Mint cream text in containers
    containerColor: "#a4c3b2", // Cambridge blue for container
    placeholderTextColor: "#eaf4f4", // Azure (web) as placeholder text
    backgroundColor: "#2f4f4f", // Dark Viridian for background
    primaryColor: "#6b9080", // Viridian as primary
    secondaryColor: "#cce3de", // Mint green as secondary
    accentColor: "#eaf4f4", // Azure (web) for accents
    errorColor: "#CF6679", // Light red for errors
    successColor: "#03DAC6", // Teal for success
    warningColor: "#FBC02D", // Yellow for warnings
    infoColor: "#2196F3", // Blue for informational messages
    borderColor: "#333333", // Dark borders
    shadowColor: "#000000", // Dark shadow
};

export function getTheme(isDarkMode: boolean): Theme {
    return isDarkMode ? darkTheme : lightTheme;
}
