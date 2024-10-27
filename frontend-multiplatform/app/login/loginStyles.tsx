import { StyleSheet } from "react-native";

export default StyleSheet.create({
    screen: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    icon: {
        marginBottom: 40,
        padding: 20,
        borderRadius: 100,
    },
    container: {
        width: "100%",
        borderRadius: 12,
        alignItems: "center",
        padding: 20,
    },
    textField: {
        height: 60,
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        height: 60,
    },
    passwordField: {
        flex: 1,
        height: "100%",
        padding: 10,
    },
    eyeIcon: {
        marginHorizontal: 10,
    },
    button: {
        borderRadius: 12,
        height: 60,
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 16,
    },
});
