import React from "react"
import { FormattedMessage } from "react-intl"
import { StatusBar, StyleSheet, Text, View } from "react-native"
import { BACKGROUND, SCALE, TEXT } from "../../styles/StyleVariable"
const HomeScreen = function ({ navigation }) {
    /**
     * Kiểm tra xem có phải được điều hướng từ LoadingScreen không
     * nếu có thì sẽ xóa stack của navigation rồi reset lại 
     * với First entry là LoginScreen
     */
    if (navigation.getState()["index"] !== 0) {
        navigation.reset({
            index: 0,
            routes: [{ name: "Home" }]
        });
    }
    return (
        <View style={styles.header}>
            <Text style={styles.text}>
                <FormattedMessage id="HomeTiltle" defaultMessage={"Home Screen"}></FormattedMessage>
            </Text>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: BACKGROUND,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: TEXT,
        fontSize: 16 * SCALE,
    },
})
export default HomeScreen;