import React from "react"
import { FormattedMessage } from "react-intl"
import { View, StatusBar, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native"
import { BACKGROUND, SafeAreaViewContainer, SCALE, TEXT } from "../../styles/StyleVariable"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("screen");
let contactsArray = [
    { id: 0 },
    { id: 1 }
];
const RenderListContacts = React.memo(({ navigation }) => {
    const handleRenderItem = ({ item }) => {
        console.log("render")
        return (
            <TouchableOpacity
                style={styles.contact}
                onPress={() => { navigation.navigate("MessageScreen", item.id) }}>
                <Text style={styles.text}>{item.id}</Text>
            </TouchableOpacity>
        )
    }
    const handleKeyExtractor = item => item.id;
    return (
        <FlatList
            data={contactsArray}
            renderItem={handleRenderItem}
            keyExtractor={handleKeyExtractor}
            style={styles.main}
        />
    )
})
const ListConTacts = function ({ navigation }) {
    return (
        <SafeAreaViewContainer >
            <View style={styles.header}>
                <Text style={styles.text}>
                    <FormattedMessage id="ListContacts" defaultMessage={"ListContacts"}></FormattedMessage>
                </Text>
            </View>
            <RenderListContacts navigation={navigation} />
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
        flex: 0
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
    }
})
export default ListConTacts;