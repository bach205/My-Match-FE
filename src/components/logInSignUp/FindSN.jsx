import React, { useCallback, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    BACKGROUND,
    BOX_SHADOW,
    BUTTON_STANDARD,
    BUTTON_TEXT,
    CHOICE,
    SafeAreaViewContainer,
    SCALE,
    TEXT,
    TITLE,
    WORD,
    WRAPPER_SHADOW
} from "../../styles/StyleVariable";

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

const FindSN = ({ navigation, route }) => {

    const defineSN = useRef("");
    const [first, setFirst] = useState("");
    const [second, setSecond] = useState("");
    const [third, setThird] = useState("");

    const HandleContinue = useCallback(() => {
        const temp = first + second + third;
        defineSN.current = temp >= 0 ? "S" : "N";
        // first !== "" &&
        //     second !== "" &&
        //     third !== "" &&
        navigation.navigate("FindTF", {
            ...route.params,
            defineSN: defineSN.current,
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
                    <Quest choice={first} setChoice={setFirst} question="I work best with" answer1="Details and practical knowledge" answer2="Ideas and possibilities" />
                    <Quest choice={second} setChoice={setSecond} question="I tend to trust" answer1="My experience" answer2="My intuition" />
                    <Quest choice={third} setChoice={setThird} question="When doing a task, I prefer" answer1="Using known effective methods" answer2="Trying to think of new methods" />
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
export default FindSN