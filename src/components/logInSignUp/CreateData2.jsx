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
} from "../../styles/StyleVariable"
import { FormattedMessage } from "react-intl";

const TargetRelationOption = React.memo(({ targetRelation, setTargetRelation, label }) => {
    return (
        <Pressable style={[WRAPPER_SHADOW, BOX_SHADOW, CHOICE,
            { height: 40 * SCALE, justifyContent: "center", },
            targetRelation == label && { backgroundColor: BUTTON_TEXT, }]}
            onPress={() => setTargetRelation(label)}>
            <Text style={[WORD, targetRelation === label && { color: BACKGROUND }]}>
                <FormattedMessage id={label} defaultMessage={label} />
            </Text>
        </Pressable>
    )
})

const GetTargetRelation = React.memo(({ targetRelation, setTargetRelation }) => {
    return (
        <View style={[styles.mainChild, WRAPPER_SHADOW, BOX_SHADOW, styles.padding5]}>
            <View style={[WRAPPER_SHADOW, BOX_SHADOW, { gap: 10 * SCALE, flex: 1 }, styles.padding5]}>
                <Text style={TITLE}>
                    <FormattedMessage id="You wanna seek" defaultMessage={"You wanna seek"} />
                </Text>
                <TargetRelationOption targetRelation={targetRelation}
                    setTargetRelation={setTargetRelation}
                    label={"Lover"} />
                <TargetRelationOption targetRelation={targetRelation}
                    setTargetRelation={setTargetRelation}
                    label={"Friend"} />
            </View>
        </View>
    )
})

const TargetGenderOption = React.memo(({ targetGender, setTargetGender, label }) => {
    return (
        <Pressable style={[WRAPPER_SHADOW, BOX_SHADOW, CHOICE,
            { height: 35 * SCALE, justifyContent: "center", minWidth: 140 * SCALE },
            targetGender == label && { backgroundColor: BUTTON_TEXT, }]}
            onPress={() => setTargetGender(label)}>
            <Text style={[WORD, targetGender === label && { color: BACKGROUND }]}>
                <FormattedMessage id={label} defaultMessage={label} />
            </Text>
        </Pressable>
    )
})

const GetTargetGender = React.memo(({ targetGender, setTargetGender }) => {
    return (
        <View style={[styles.mainChild, WRAPPER_SHADOW, BOX_SHADOW, styles.padding5, { flex: 2 }]}>
            <View style={[WRAPPER_SHADOW, BOX_SHADOW, { flex: 1 }, { padding: 21 * SCALE }]}>
                <Text style={TITLE}>
                    <FormattedMessage id="The gender that you seek" defaultMessage={"The gender that you seek"} />
                </Text>
                <View style={{
                    flexDirection: "row", flexWrap: "wrap", flex: 1,
                    gap: 15 * SCALE
                    , justifyContent: "center",
                    alignContent: "center",
                }}>
                    <TargetGenderOption targetGender={targetGender} setTargetGender={setTargetGender} label={"Man"} />
                    <TargetGenderOption targetGender={targetGender} setTargetGender={setTargetGender} label={"Woman"} />
                    <TargetGenderOption targetGender={targetGender} setTargetGender={setTargetGender} label={"Gay"} />
                    <TargetGenderOption targetGender={targetGender} setTargetGender={setTargetGender} label={"Lesbian"} />
                    <TargetGenderOption targetGender={targetGender} setTargetGender={setTargetGender} label={"Bisexual"} />
                </View>
            </View>
        </View >
    )
})

const CreateData2 = function ({ navigation, route }) {
    const [targetGender, setTargetGender] = useState("");
    const [targetRelation, setTargetRelation] = useState("");
    const { name, gender, birth } = route.params;
    const HandleContinue = useCallback(() => {
        // targetRelation !== "" &&
        //     targetGender !== "" &&
        navigation.navigate("CreateData3", {
            name,
            gender,
            birth,
            targetGender,
            targetRelation
        })
    }, [targetGender, targetRelation])

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
                    <GetTargetRelation targetRelation={targetRelation}
                        setTargetRelation={setTargetRelation} />
                    <GetTargetGender targetGender={targetGender} setTargetGender={setTargetGender} />
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={() => HandleContinue()}
                        activeOpacity={
                            targetGender !== "" && targetRelation !== "" ? 0 : 1
                        }
                    >
                        <Text style={[styles.textButton, BUTTON_STANDARD, WRAPPER_SHADOW,
                        ((targetGender === "" || targetRelation === "") && { backgroundColor: "#FFCCCC80" })
                        ]}>
                            <FormattedMessage
                                id="Continue"
                                defaultMessage={"Continue"} />
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
export default CreateData2