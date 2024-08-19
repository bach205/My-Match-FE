import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Pressable } from "react-native"
import React from "react";
import {
    BACKGROUND, TEXT, SCALE, BUTTON_TEXT, SafeAreaViewContainer
    , WRAPPER_SHADOW, BOX_SHADOW, TITLE, CHOICE, WORD
} from "../styles/StyleVariable"
import { FormattedMessage } from "react-intl";

const FindMBTI = ({ navigation, route }) => {
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
                            <Pressable style={[WRAPPER_SHADOW, BOX_SHADOW, CHOICE
                                , {
                                    height: 40 * SCALE, justifyContent: "center",
                                    backgroundColor: BUTTON_TEXT
                                }
                            ]}>
                                <Text style={[WORD, { color: BACKGROUND, }]}>
                                    <FormattedMessage id="I already know my type" defaultMessage={"I already know my type"} />
                                </Text>
                            </Pressable>
                            <Pressable style={[WRAPPER_SHADOW, BOX_SHADOW, CHOICE,
                                {
                                    height: 40 * SCALE, justifyContent: "center",
                                    backgroundColor: BUTTON_TEXT
                                }
                            ]}>
                                <Text style={[WORD, { color: BACKGROUND, }]}>
                                    <FormattedMessage id="Take a short quiz" defaultMessage={"Take a short quiz"} />
                                </Text>
                            </Pressable>
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