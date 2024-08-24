import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Pressable } from "react-native"
import React, { useCallback, useRef, useState } from "react";
import {
    BACKGROUND, TEXT, SCALE, BUTTON_TEXT, SafeAreaViewContainer
    , WRAPPER_SHADOW, BOX_SHADOW, TITLE, CHOICE, WORD,
    BUTTON_STANDARD
} from "../../styles/StyleVariable"
import { FormattedMessage } from "react-intl";

const QuestAnswer = React.memo(({ choice, setChoice, answer, label }) => {
    return (
        <Pressable
            onPress={() => setChoice(label)}
            style={[WRAPPER_SHADOW, BOX_SHADOW, CHOICE,
                {
                    height: 40 * SCALE, justifyContent: "center",
                },
                choice === label && { backgroundColor: BUTTON_TEXT, }
            ]}>
            <Text style={[WORD,
                choice === label && { color: BACKGROUND }
            ]}>
                <FormattedMessage id={answer} defaultMessage={answer} />
            </Text>
        </Pressable>
    )
})

const Quest = React.memo(({ choice, setChoice, question, answer1, answer2 }) => {
    return (
        <View style={[WRAPPER_SHADOW, BOX_SHADOW, styles.padding5]}>
            <View style={[WRAPPER_SHADOW, BOX_SHADOW, styles.padding5,
            ]}>
                <Text style={[TITLE]}>
                    <FormattedMessage id={question} defaultMessage={question} />
                </Text>
                <QuestAnswer choice={choice} setChoice={setChoice} answer={answer1} label={1} />
                <QuestAnswer choice={choice} setChoice={setChoice} answer={answer2} label={-1} />

            </View>
        </View>
    )
})

const FindJP = ({ navigation, route }) => {

    const defineJP = useRef("");
    const [first, setFirst] = useState("");
    const [second, setSecond] = useState("");
    const [third, setThird] = useState("");

    const HandleContinue = useCallback(() => {
        const temp = first + second + third;
        defineJP.current = temp >= 0 ? "J" : "P";

        const defineMBTI = route.params.defineEI +
            route.params.defineSN +
            route.params.defineTF +
            defineJP.current
        // first !== "" &&
        //     second !== "" &&
        //     third !== "" &&
        navigation.navigate("ResultMBTI", {
            ...route.params,
            defineMBTI: defineMBTI,
        });
    }, [first, second, third])

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
                    <Quest choice={first} setChoice={setFirst} question="Before a trip, I usually" answer1="Plan a detailed and clear schedule" answer2="Go with the flow" />
                    <Quest choice={second} setChoice={setSecond} question="Things go better if" answer1="They are prepared in advance" answer2="They happen naturally" />
                    <Quest choice={third} setChoice={setThird} question="I usually finish tasks" answer1="Before the deadline" answer2="Close to the deadline" />
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={() => HandleContinue()}
                        activeOpacity={
                            first !== "" &&
                                second !== "" &&
                                third !== "" ? 0 : 1}
                    >
                        <Text style={[styles.textButton,
                            BOX_SHADOW,
                            BUTTON_STANDARD,
                        (first === "" ||
                            second === "" ||
                            third === "") && { backgroundColor: "#FFCCCC80" }

                        ]}>
                            <FormattedMessage id="Continue" defaultMessage={"Continue"} />
                        </Text>
                    </TouchableOpacity>
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
        flex: 10,
        gap: 20 * SCALE,
        zIndex: 1,
    },
    footer: {
        flex: 10,
        backgroundColor: BACKGROUND,
        justifyContent: "flex-end",
        alignItems: "center",
        zIndex: 0,
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
export default FindJP