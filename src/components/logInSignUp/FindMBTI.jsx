import React from "react";
import { FormattedMessage } from "react-intl";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    BACKGROUND,
    BOX_SHADOW,
    BUTTON_TEXT,
    CHOICE,
    SafeAreaViewContainer,
    SCALE,
    TEXT,
    TITLE,
    WORD,
    WRAPPER_SHADOW
} from "../../styles/StyleVariable";

const FindMBTI = ({ navigation, route }) => {

    const handleLogin = (destination) => {
        navigation.navigate(destination, route.params);
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaViewContainer>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[styles.textButton,]}>
                            <FormattedMessage id="GoBack" defaultMessage={"Go Back"} />
                        </Text>
                    </TouchableOpacity>
                </View >
                <View style={styles.main}>
                    <View style={[WRAPPER_SHADOW, BOX_SHADOW, styles.padding5]}>
                        <View style={[WRAPPER_SHADOW, BOX_SHADOW, styles.padding5,
                            { gap: 15 * SCALE }
                        ]}>
                            <Text style={[TITLE]}>
                                <FormattedMessage id="MBTI test" defaultMessage={"MBTI test"} />
                            </Text>
                            <TouchableOpacity style={[WRAPPER_SHADOW, BOX_SHADOW, CHOICE
                                , {
                                    height: 40 * SCALE, justifyContent: "center",
                                    backgroundColor: BUTTON_TEXT
                                }
                            ]}>
                                <Text style={[WORD, { color: BACKGROUND, }]}>
                                    <FormattedMessage id="I already know my type" defaultMessage={"I already know my type"} />
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    [WRAPPER_SHADOW, BOX_SHADOW, CHOICE,
                                        {
                                            height: 40 * SCALE, justifyContent: "center",
                                            backgroundColor: BUTTON_TEXT
                                        }
                                    ]}
                                onPress={() => handleLogin("FindEI")}>
                                <Text style={[WORD, { color: BACKGROUND, }]}>
                                    <FormattedMessage id="Take a short quiz" defaultMessage={"Take a short quiz"} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaViewContainer>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: BACKGROUND,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    main: {
        flex: 9,
        justifyContent: "center",
        alignContent: "center",
        paddingBottom: 60 * SCALE,
    },
    text: {
        fontSize: 16 * SCALE,
        color: TEXT,
    },
    textButton: {
        fontSize: 23 * SCALE,
        color: BUTTON_TEXT,
    },
    padding5: { padding: 10 * SCALE },
})
export default FindMBTI