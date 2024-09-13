import React from "react"
import { FormattedMessage } from "react-intl"
import { View, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native"
import { BACKGROUND, SafeAreaViewContainer, SCALE, TEXT } from "../../styles/StyleVariable"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("screen")
const ListConTacts = function ({ navigation }) {
    return (
        <SafeAreaViewContainer >
            <View style={styles.header}>
                <Text style={styles.text}>
                    <FormattedMessage id="ListContacts" defaultMessage={"ListContacts"}></FormattedMessage>
                </Text>
            </View>
            <View style={styles.main}>
                <TouchableOpacity
                    style={styles.contact}
                    onPress={() => { navigation.navigate("MessageScreen") }}>
                    <Text style={styles.text}>you</Text>
                </TouchableOpacity>
            </View>
            <StatusBar barStyle={"light-content"} />
        </SafeAreaViewContainer>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: BACKGROUND,
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    main: {
        flex: 10
    },
    text: {
        color: TEXT,
        fontSize: 16 * SCALE,
    },
    contact: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        height: 70 * SCALE,
        width: width,
    }
})
export default ListConTacts;