import {
    StyleSheet, View, Text, TouchableOpacity,
    StatusBar,
    Pressable,

} from "react-native"
import React, { useCallback, useState } from "react";
import {
    SCALE, BUTTON_TEXT, SafeAreaViewContainer, BUTTON_STANDARD,
    WRAPPER_SHADOW, TEXT_TITLE, TITLE, BOX_SHADOW, CHOICE, WORD,
    BACKGROUND
} from "../styles/StyleVariable"
import { FormattedMessage } from "react-intl";

const CommunicationStyleOption = React.memo(({ communicationStyle, setCommunicationStyle, label }) => {
    return (
        <Pressable style={[WRAPPER_SHADOW, BOX_SHADOW, CHOICE,
            { height: 40 * SCALE, justifyContent: "center", },
            communicationStyle == label && { backgroundColor: BUTTON_TEXT, }]}
            onPress={() => setCommunicationStyle(label)}>
            <Text style={[WORD, communicationStyle === label && { color: BACKGROUND }]}>
                <FormattedMessage id={label} defaultMessage={label} />
            </Text>
        </Pressable>
    )
})

const GetCommunicationStyle = React.memo(({ communicationStyle, setCommunicationStyle }) => {
    return (
        <View style={[styles.mainChild, WRAPPER_SHADOW, BOX_SHADOW, styles.padding5]}>
            <View style={[WRAPPER_SHADOW, BOX_SHADOW, { gap: 3 * SCALE, flex: 1 }, styles.padding5]}>
                <Text style={TITLE}>
                    <FormattedMessage id="communicationStyle" defaultMessage={"Your communication style ?"} />
                </Text>
                <CommunicationStyleOption communicationStyle={communicationStyle}
                    setCommunicationStyle={setCommunicationStyle}
                    label={"Like texting"} />
                <CommunicationStyleOption communicationStyle={communicationStyle}
                    setCommunicationStyle={setCommunicationStyle}
                    label={"Like voice chat"} />
                <CommunicationStyleOption communicationStyle={communicationStyle}
                    setCommunicationStyle={setCommunicationStyle}
                    label={"Like video call"} />
                <CommunicationStyleOption communicationStyle={communicationStyle}
                    setCommunicationStyle={setCommunicationStyle}
                    label={"Like hanging out"} />
            </View>
        </View>
    )
})

const AcademicBackgroundOption = React.memo(({ academic, setAcademic, label }) => {
    return (
        <Pressable style={[WRAPPER_SHADOW, BOX_SHADOW, CHOICE,
            { height: 35 * SCALE, justifyContent: "center", minWidth: 140 * SCALE },
            academic == label && { backgroundColor: BUTTON_TEXT, }]}
            onPress={() => setAcademic(label)}>
            <Text style={[WORD, academic === label && { color: BACKGROUND }]}>
                <FormattedMessage id={label} defaultMessage={label} />
            </Text>
        </Pressable>
    )
})

const GetAcademicBackground = React.memo(({ academic, setAcademic }) => {
    return (
        <View style={[styles.mainChild, WRAPPER_SHADOW, BOX_SHADOW, styles.padding5]}>
            <View style={[WRAPPER_SHADOW, BOX_SHADOW, { gap: 5 * SCALE, flex: 1 }, styles.padding5]}>
                <Text style={TITLE}>
                    <FormattedMessage id="Academic background" defaultMessage={"Your academic background ?"} />
                </Text>
                <View style={{
                    flexDirection: "row", flexWrap: "wrap", flex: 1,
                    gap: 15 * SCALE
                    , justifyContent: "center",
                    alignContent: "center",
                }}>
                    <AcademicBackgroundOption academic={academic} setAcademic={setAcademic} label={"Middle school"} />
                    <AcademicBackgroundOption academic={academic} setAcademic={setAcademic} label={"High school"} />
                    <AcademicBackgroundOption academic={academic} setAcademic={setAcademic} label={"College"} />
                    <AcademicBackgroundOption academic={academic} setAcademic={setAcademic} label={"University"} />
                    <AcademicBackgroundOption academic={academic} setAcademic={setAcademic} label={"Bachelor's degree"} />
                    <AcademicBackgroundOption academic={academic} setAcademic={setAcademic} label={"Master's degree"} />
                    <AcademicBackgroundOption academic={academic} setAcademic={setAcademic} label={"Engineer"} />
                    <AcademicBackgroundOption academic={academic} setAcademic={setAcademic} label={"Doctor"} />
                </View>
            </View>
        </View >
    )
})

const CreateData3 = function ({ navigation, route }) {

    const [communicationStyle, setCommunicationStyle] = useState("");
    const [academic, setAcademic] = useState("");
    const { name, gender, birth, targetGender, targetRelation } = route.params;
    const HandleContinue = useCallback(() => {
        navigation.navigate("FindMBTI", {
            name,
            gender,
            birth,
            communicationStyle,
            academic,
            targetGender,
            targetRelation
        })
    }, [communicationStyle, academic])

    return (
        <>
            <StatusBar barStyle={'light-content'} />
            <SafeAreaViewContainer>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[styles.textButton, styles.back]}>
                            <FormattedMessage id="GoBack" defaultMessage={"Go Back"} />
                        </Text>
                    </TouchableOpacity>
                </View >
                <View style={styles.main}>
                    <GetCommunicationStyle communicationStyle={communicationStyle}
                        setCommunicationStyle={setCommunicationStyle} />
                    <GetAcademicBackground academic={academic} setAcademic={setAcademic} />
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={() => HandleContinue()}
                    >
                        <Text style={[styles.textButton, BUTTON_STANDARD, WRAPPER_SHADOW,
                        ((communicationStyle === "" && academic === "") && { backgroundColor: "#E0E0E0" })
                        ]}>
                            <FormattedMessage
                                id={(communicationStyle !== "" || academic !== "") ? "Continue" : "Skip"}
                                defaultMessage={(communicationStyle !== "" || academic !== "") ? "Continue" : "Skip"} />
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
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    main: {
        flex: 8 * SCALE,
        gap: 10 * SCALE,
        color: TEXT_TITLE,
    },
    mainChild: {
        flex: 1,
        gap: 5 * SCALE,
    },
    footer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    padding5: {
        padding: 5 * SCALE
    },
    textButton: {
        fontSize: 23 * SCALE,
        color: BUTTON_TEXT,
    },
})
export default CreateData3