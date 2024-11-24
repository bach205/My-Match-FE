import React from "react"
import { FormattedMessage } from "react-intl"
import { View, StatusBar, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native"
import { BACKGROUND, SafeAreaViewContainer, SCALE, TEXT } from "../../styles/StyleVariable"
import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("screen");
let contactsArray = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 }
];
const RenderListContacts = React.memo(({ navigation }) => {
    const handleRenderItem = ({ item }) => {
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
                    List contacts
                </Text>
            </View>
            <View style={styles.container}>
                <RenderListContacts navigation={navigation} />
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
        flex: 1
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
    },
    container: {
        flex: 6
    }
})
export default ListConTacts;