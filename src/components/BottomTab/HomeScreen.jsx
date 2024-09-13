import React from "react"
import { FormattedMessage } from "react-intl"
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native"
import { BACKGROUND, SCALE, TEXT } from "../../styles/StyleVariable"
import { Button } from "react-native-paper"
const HomeScreen = function ({ navigation }) {
    return (
        <SafeAreaView style={styles.header}>
            <Text style={styles.text}>
                <FormattedMessage id="HomeTiltle" defaultMessage={"Home Screen"}></FormattedMessage>
            </Text>
            <Button>
                <Text>hi</Text>
            </Button>
            <StatusBar barStyle={"light-content"} />
        </SafeAreaView>
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