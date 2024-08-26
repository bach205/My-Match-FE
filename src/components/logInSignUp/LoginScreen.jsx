import auth from "@react-native-firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Keyboard, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import {
    BACKGROUND,
    BOX_SHADOW,
    BUTTON_STANDARD,
    BUTTON_TEXT,
    SafeAreaViewContainer,
    SCALE,
    TEXT,
    TEXT_TITLE,
    TITLE,
    WORD,
    WORD_20,
    WRAPPER_SHADOW,
} from "../../styles/StyleVariable";
import { FormattedMessage } from "react-intl";



const loginHandle = (navigation) => {
    //thiếu gửi yêu cầu đến Oauth fix

    //dùng tạm để kiểm tra xem có tài khoản hay không
    //backend kiểm tra xem trong CSDL có email đấy chưa nếu chưa thì sẽ trả ra false
    const isUserExist = false;
    if (isUserExist) navigation.navigate("Home");
    else navigation.navigate("CreateData1");

}
const LoginScreen = function ({ navigation }) {

    const [confirm, setConfirm] = useState(null);
    const [isPhoneFocus, setIsPhoneFocus] = useState(false);
    const [CountryCode, setCountryCode] = useState('+');

    const phoneNumber = useRef('');
    const inputRefs = useRef([]);
    const codeRefs = useRef(["", "", "", "", "", ""]);
    const code = useRef('');

    /**
     * Xóa stack của navigation rồi reset lại 
     * với First entry là LoginScreen
     */

    if (navigation.getState()["index"] !== 0) {
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
        });
    }

    //ẩn verify code cho các android tự động nhập 
    const onAuthStateChanged = user => {
        if (user) {
            console.log(user);
        }
    }

    useEffect(() => {
        const subcriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subcriber;
    }, [])

    const signInWithPhoneNumber = async (number) => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(number);
            // Xử lý xác thực thành công, lưu confirmation để xác nhận mã OTP
            console.log('Confirmation result:', confirmation);
            setConfirm(confirmation);
        } catch (error) {
            console.error(error.message)
        }
    }


    const confirmCode = async () => {
        try {
            confirm.confirm(code.current)
        } catch (error) {
            alert("Invalid code");
            console.error(error.message);
        }
    }

    //optional chaining (?) kiểm tra xem là null hay undefine thì sẽ trả ra undefine chứ kh gây lỗi
    const handleOnChangeCode = (text, index) => {
        if (text !== 'Backspace') {
            codeRefs.current[index] = text;
            inputRefs.current[index + 1]?.focus();
        } else {
            codeRefs.current[index] = ''
            inputRefs.current[index - 1]?.focus();
        }
    }

    return (

        <SafeAreaViewContainer style={styles.header}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                {!confirm
                    ? (
                        <View style={styles.main}>
                            <View style={{ padding: 40 * SCALE }}>
                                <Text style={[TITLE, { fontSize: 26, color: TEXT }]}>
                                    <FormattedMessage id="Verify your phone number" defaultMessage={"Verify your phone number"} />
                                </Text>
                                <Text style={[WORD, { color: TEXT_TITLE }]}>
                                    <FormattedMessage id="Please confirm your country code and enter your phone number" defaultMessage={"Please confirm your country code and enter your phone number"} />
                                </Text>
                            </View>
                            <View style={{ marginBottom: 40 * SCALE, flexDirection: "row" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("CountryCode", { setCountryCode })}>
                                    <TextInput
                                        editable={false}
                                        value={CountryCode}
                                        placeholderTextColor={TEXT}
                                        style={[styles.text, styles.phoneInput,
                                        {
                                            minWidth: 60 * SCALE, padding: 10 * SCALE,
                                            borderRightWidth: 0
                                        }]} />
                                </TouchableOpacity>
                                <View style={{ borderColor: "#FFFFFF", borderWidth: 0.5 * SCALE }}></View>
                                <TextInput
                                    onFocus={() => setIsPhoneFocus(true)}
                                    onBlur={() => setIsPhoneFocus(false)}
                                    maxLength={12}
                                    placeholder="000 000 0000"
                                    placeholderTextColor={TEXT_TITLE}
                                    keyboardType="numeric"
                                    onChangeText={newNumber => { phoneNumber.current = newNumber }}
                                    style={[styles.text, styles.phoneInput,
                                    {
                                        minWidth: 240 * SCALE, maxWidth: 240 * SCALE, padding: 10 * SCALE,
                                        borderLeftWidth: 0, paddingLeft: 20 * SCALE, paddingRight: 20 * SCALE,
                                    },
                                    isPhoneFocus && { borderColor: BUTTON_TEXT }]} />
                            </View>
                            <TouchableOpacity style={[WRAPPER_SHADOW, BOX_SHADOW, BUTTON_STANDARD, { justifyContent: "center" }]}
                                onPress={
                                    () => signInWithPhoneNumber(CountryCode + phoneNumber.current)
                                }
                            >
                                <Text style={[WORD_20, { color: BACKGROUND }]}>
                                    <FormattedMessage id="Send code" defaultMessage={"Send code"} />
                                </Text>
                            </TouchableOpacity>
                        </View>)
                    : (
                        <View style={styles.main}>
                            <View style={{ padding: 40 * SCALE }}>
                                <Text style={[TITLE, { fontSize: 26, color: TEXT }]}>
                                    <FormattedMessage id="Verification code" defaultMessage={"Verification code"} />
                                </Text>
                                <Text style={[WORD, { color: TEXT_TITLE }]}>
                                    <FormattedMessage id="We have sent the verificatoin code to" defaultMessage={"We have sent the verificatoin code to"} />
                                </Text>
                                <Text style={[WORD, { color: TEXT_TITLE }]}>
                                    <FormattedMessage id="Please write the code below and hit the button" defaultMessage={"Please write the code below and hit the button"} />
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", gap: 15 * SCALE, marginBottom: 30 * SCALE }}>
                                {codeRefs.current.map((_, index) => {
                                    return (
                                        <TextInput
                                            ref={ref => {
                                                if (ref && !inputRefs.current.includes(ref)) {
                                                    inputRefs.current.push(ref);
                                                }
                                            }}
                                            key={index}
                                            keyboardType="numeric"
                                            maxLength={1}
                                            contextMenuHidden
                                            selectTextOnFocus
                                            onKeyPress={event => handleOnChangeCode(event.nativeEvent.key, index)}
                                            style={[styles.text,
                                            {
                                                height: 50 * SCALE,
                                                minWidth: 40 * SCALE, maxWidth: 40 * SCALE, marginBottom: 20 * SCALE,
                                                backgroundColor: TEXT, color: BACKGROUND, fontSize: 25 * SCALE
                                            }
                                            ]}>
                                        </TextInput>)
                                })}
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => setConfirm(false)}>
                                    <Text style={[styles.text, { marginBottom: 10 * SCALE, color: "lightblue" }]}>
                                        <FormattedMessage id="GoBack" defaultMessage={"Go Back"} />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={[WRAPPER_SHADOW, BOX_SHADOW, BUTTON_STANDARD, { justifyContent: "center" }]}
                                onPress={
                                    () => {
                                        code.current = "";
                                        codeRefs.current.forEach(element => {
                                            code.current += element;
                                        });
                                        confirmCode();
                                    }
                                }
                            >
                                <Text style={[WORD_20, { color: BACKGROUND }]}>
                                    Verify code
                                </Text>
                            </TouchableOpacity>
                        </View>)}
            </TouchableWithoutFeedback>
            <StatusBar barStyle={"light-content"} />
        </SafeAreaViewContainer>

    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 16 * SCALE,
        color: TEXT,
        textAlign: "center",
        borderRadius: 10 * SCALE,
    },
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    phoneInput: {
        height: 50 * SCALE,
        borderColor: "#FFFFFF",
        borderWidth: 1,
        textAlign: "left",
        textAlign: "left",
    }
})

export default LoginScreen;