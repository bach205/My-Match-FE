import {
    StyleSheet, StatusBar,
    View, Text, TouchableOpacity, KeyboardAvoidingView,
    TextInput, Platform, Keyboard,
    TouchableWithoutFeedback,
    ScrollView, SafeAreaView,
} from "react-native"
import React, { useCallback, useRef, useState } from "react";
import {
    BACKGROUND,
    TEXT,
    SCALE,
    BUTTON_TEXT,
    BORDER,
    BOX_SHADOW,
    BUTTON_STANDARD,
    WRAPPER_SHADOW,
    TITLE,
    SafeAreaViewContainer
} from "../styles/StyleVariable"
import { FormattedMessage } from "react-intl";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const NameRender = React.memo(function ({ setName }) {
    return (
        <View style={styles.mainChild}>
            <Text style={[styles.inputPosition, TITLE]}>
                <FormattedMessage id="WhatIsYourName" defaultMessage={"What is your name ?"} />
            </Text>
            <View style={[WRAPPER_SHADOW, styles.inputPosition,
                BOX_SHADOW, { marginBottom: 6 * SCALE }]}>
                <TextInput
                    style={[styles.input, BOX_SHADOW]}
                    placeholder="Your name..."
                    placeholderTextColor={TEXT}
                    maxLength={20}
                    onChangeText={newName => setName.current = newName}
                />
            </View>
        </View>
    )
})

const GenderOption = React.memo(function ({ gender, setGender, label }) {
    return (
        <View style={[styles.optionChoice,
            WRAPPER_SHADOW,
            BOX_SHADOW,]}>
            <TouchableOpacity
                style={[styles.optionChoice,
                gender === label && styles.ischoice,

                { justifyContent: "center", alignItems: "center", borderRadius: 13.5 * SCALE }]}
                onPress={() => setGender(label)}
            >
                <Text style={[styles.text, gender === label && { color: BACKGROUND }]}>
                    <FormattedMessage id={label} defaultMessage={label} />
                </Text>
            </TouchableOpacity>
        </View>
    )
})

const GenderRender = React.memo(function ({ gender, setGender }) {
    return (
        <View style={styles.mainChild}>
            <Text style={[styles.inputPosition, TITLE]}>
                <FormattedMessage id="Gender" defaultMessage={"Gender"} />
            </Text>
            <View style={styles.option}>
                <GenderOption gender={gender} setGender={setGender} label={"Man"} />
                <GenderOption gender={gender} setGender={setGender} label={"Woman"} />
                <GenderOption gender={gender} setGender={setGender} label={"Gay"} />
                <GenderOption gender={gender} setGender={setGender} label={"Lesbian"} />
                <GenderOption gender={gender} setGender={setGender} label={"Bisexual"} />
            </View>
        </View>
    )
})

const BirthGender = React.memo(function ({ isShown, setIsShown, birth, setBirth,
    age, setAge, zodiac, setZodiac
}) {

    const [date, setDate] = useState(new Date())

    const calculateAge = function (date) {
        const current = new Date();

        let age = current.getFullYear() - date.getFullYear();
        const hadHasBirthDayThisYear =
            current.getMonth() > date.getMonth() ||
            (current.getMonth() === date.getMonth() && current.getDate() >= date.getDate());
        if (!hadHasBirthDayThisYear) age--;
        return age
    }

    function getZodiacSign(date) {
        const zodiacSigns = [
            { sign: "Capricorn", start: [12, 22], end: [1, 19] },
            { sign: "Aquarius", start: [1, 20], end: [2, 18] },
            { sign: "Pisces", start: [2, 19], end: [3, 20] },
            { sign: "Aries", start: [3, 21], end: [4, 19] },
            { sign: "Taurus", start: [4, 20], end: [5, 20] },
            { sign: "Gemini", start: [5, 21], end: [6, 20] },
            { sign: "Cancer", start: [6, 21], end: [7, 22] },
            { sign: "Leo", start: [7, 23], end: [8, 22] },
            { sign: "Virgo", start: [8, 23], end: [9, 22] },
            { sign: "Libra", start: [9, 23], end: [10, 22] },
            { sign: "Scorpio", start: [10, 23], end: [11, 21] },
            { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
        ];

        const day = date.getDate() + 1;
        const month = date.getMonth() + 1;
        // Tìm cung hoàng đạo dựa trên ngày và tháng
        for (let i = 0; i < zodiacSigns.length; i++) {
            const { sign, start, end } = zodiacSigns[i];
            const [startMonth, startDay] = start;
            const [endMonth, endDay] = end;

            // Kiểm tra nếu ngày sinh nằm trong khoảng của cung hoàng đạo hiện tại
            if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
                return sign;
            }
        }
        // Trường hợp mặc định nếu không tìm thấy cung hoàng đạo
        return "Capricorn";
    }


    const handleOnChange = useCallback((event, theDate) => {
        if (event.type === "set") {
            setDate(theDate);
            setAge(calculateAge(theDate));
            setZodiac(getZodiacSign(theDate));
            if (Platform.OS === "android") {
                setIsShown(false);
                setBirth(formatDate(theDate))
            }
        }
        else {
            setIsShown(false);
        }
    }, [])

    const formatDate = useCallback(rawDate => {
        let day = rawDate.getDate();
        if (day < 10) day = '0' + day;
        let month = rawDate.getMonth() + 1;
        if (month < 10) month = '0' + month;
        const year = rawDate.getFullYear();
        return "" + month + "/" + day + "/" + year
    }, [])

    return (
        <View style={styles.mainChild}>
            <Text style={[styles.inputPosition, TITLE, { flex: 2 }]}>
                <FormattedMessage id="Birthday" defaultMessage={"Birthday"} />
            </Text>
            <TouchableOpacity
                onPress={() => { setIsShown(true) }}
                style={[styles.inputPosition, WRAPPER_SHADOW, { flex: 2 }]}>
                <TextInput
                    style={[styles.input, BOX_SHADOW,]}
                    placeholder="MM/DD/YYYY"
                    value={birth}
                    placeholderTextColor={TEXT}
                    editable={false}
                    onPressIn={() => setIsShown(true)}
                />
            </TouchableOpacity>

            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", gap: 3 * SCALE }}>
                <Text style={{ color: TEXT }}>{age}</Text>
                <Text style={{ color: TEXT }}>{zodiac}</Text>
            </View>

            {isShown && (
                <RNDateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    textColor="white"
                    minimumDate={new Date(1950, 0, 1)}
                    maximumDate={new Date()}
                    onChange={handleOnChange}
                    style={{
                        height: 100 * SCALE,
                    }}
                />
            )}

            {isShown && Platform.OS === "ios" && (
                <View style={{
                    flex: 1, flexDirection: "row",
                    justifyContent: "space-around",
                }}>
                    <TouchableOpacity onPress={() => setIsShown(false)}>
                        <Text style={[styles.text, { fontSize: 20 * SCALE, color: "red" }]}>
                            <FormattedMessage id="Cancel" defaultMessage={"Cancel"} />
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        setIsShown(false);
                        setBirth(formatDate(date));
                    }}>
                        <Text style={[styles.text, { fontSize: 20 * SCALE, color: BUTTON_TEXT }]}>
                            <FormattedMessage id="Confirm" defaultMessage={"Confirm"} />
                        </Text>
                    </TouchableOpacity>
                </View>

            )}
        </View>
    )
})

const CreateData1 = ({ navigation }) => {
    const name = useRef("");
    const [gender, setGender] = useState("");
    const [birth, setBirth] = useState("");
    const [isShown, setIsShown] = useState(false);
    const [age, setAge] = useState("");
    const [zodiac, setZodiac] = useState("");
    const HandleContinue = useCallback(function (name, gender, birth) {
        // name !== "" &&
        //     gender !== "" &&
        //     birth !== "" &&
        navigation.navigate("CreateData2", {
            name,
            gender,
            birth,
            age,
            zodiac
        });
    }, [gender, birth])

    return (
        <>
            <StatusBar barStyle={'light-content'} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}>
                    <SafeAreaViewContainer>
                        <View style={styles.header}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={[styles.inputPosition, styles.textButton]}>
                                    <FormattedMessage id="GoBack" defaultMessage={"Go Back"} />
                                </Text>
                            </TouchableOpacity>
                        </View >

                        <ScrollView style={styles.main}>
                            <View style={[styles.mainChild,
                            { marginBottom: 30 * SCALE, marginTop: 20 * SCALE }]}>
                                <NameRender setName={name} />
                            </View>
                            <View style={[styles.mainChild,
                            { marginBottom: 30 * SCALE, marginTop: 20 * SCALE }]}>
                                <GenderRender gender={gender} setGender={setGender} />
                            </View>
                            <View style={[styles.mainChild,
                            { marginBottom: 30 * SCALE, marginTop: 20 * SCALE }]}>
                                <BirthGender isShown={isShown} setIsShown={setIsShown}
                                    birth={birth} setBirth={setBirth}
                                    age={age} setAge={setAge}
                                    zodiac={zodiac} setZodiac={setZodiac} />
                            </View>
                        </ScrollView>

                        <View style={styles.footer}>
                            <TouchableOpacity
                                onPress={() => HandleContinue(name.current, gender, birth)}
                                activeOpacity={
                                    name !== "" &&
                                        gender !== "" &&
                                        birth !== "" ? 0 : 1
                                }
                            >
                                <Text style={[styles.textButton,
                                    BOX_SHADOW,
                                    BUTTON_STANDARD,
                                (name === "" ||
                                    gender === "" ||
                                    birth === "") && { backgroundColor: "#FFCCCC80" }
                                ]}>
                                    <FormattedMessage id="Continue" defaultMessage={"Continue"} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaViewContainer>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUND,
        flex: 1,
        padding: 2
    },
    header: {
        flex: 0,
        backgroundColor: BACKGROUND,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    main: {
        flex: 1,
        backgroundColor: BACKGROUND,
        zIndex: 1,
    },
    footer: {
        flex: 0,
        backgroundColor: BACKGROUND,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 10 * SCALE,
        color: TEXT,
        textAlign: "center",
    },
    textButton: {
        fontSize: 23 * SCALE,
        color: BUTTON_TEXT,
    },
    input: {
        color: TEXT,
        height: 50 * SCALE,
        borderWidth: 3 * SCALE,
        borderRadius: 25 * SCALE,
        padding: 15 * SCALE,
        textAlign: "center"
    },
    inputPosition: {
        color: TEXT,
    },
    mainChild: {
        flex: 1,
        ...BOX_SHADOW,
        ...WRAPPER_SHADOW,
        padding: 5 * SCALE,
    },
    option: {
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 10 * SCALE,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 15 * SCALE,
    },
    optionChoice: {
        borderWidth: 3 * SCALE,
        borderRadius: 15 * SCALE,
        height: 30 * SCALE,
        minWidth: 80 * SCALE,
    },
    ischoice: {
        backgroundColor: BUTTON_TEXT,
    },
})
export default CreateData1