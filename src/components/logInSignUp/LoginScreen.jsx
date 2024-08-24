import React, { useState, useCallback, useEffect } from "react";
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
    BACKGROUND,
    BOX_SHADOW,
    BUTTON_STANDARD,
    SafeAreaViewContainer,
    SCALE,
    TEXT,
    WORD_20,
    WRAPPER_SHADOW,
} from "../../styles/StyleVariable";
import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/app';

const loginHandle = (navigation) => {
    //thiếu gửi yêu cầu đến Oauth fix

    //dùng tạm để kiểm tra xem có tài khoản hay không
    //backend kiểm tra xem trong CSDL có email đấy chưa nếu chưa thì sẽ trả ra false
    const isUserExist = false;
    if (isUserExist) navigation.navigate("Home");
    else navigation.navigate("CreateData1");

}
const LoginScreen = function ({ navigation }) {
    console.log(firebase.app().name);

    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

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
            console.log("succesfully");
        }
    }

    useEffect(() => {
        const subcriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subcriber;
    }, [])

    const signInWithPhoneNumber = useCallback(async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber, true);
            // Xử lý xác thực thành công, lưu confirmation để xác nhận mã OTP
            console.log('Confirmation result:', confirmation);
            setConfirm(confirmation);
        } catch (error) {
            // Xử lý lỗi
            switch (error.code) {
                case 'auth/invalid-phone-number':
                    alert('Số điện thoại không hợp lệ.');
                    break;
                case 'auth/missing-phone-number':
                    alert('Số điện thoại bị thiếu.');
                    break;
                case 'auth/quota-exceeded':
                    alert('Đã vượt quá hạn mức gửi SMS.');
                    break;
                case 'auth/user-disabled':
                    alert('Tài khoản người dùng bị vô hiệu hóa.');
                    break;
                case 'auth/operation-not-allowed':
                    alert('Nhà cung cấp xác thực chưa được bật trong Firebase Console.');
                    break;
                default:
                    alert('Lỗi không xác định');
                    console.error("undefine error when sent OTP: ", error.message);
                    break;
            }
        }
    }, [phoneNumber])
    const confirmCode = useCallback(async () => {
        try {
            confirm.confirm(code)
        } catch (error) {
            alert("Invalid code");
            console.error(error.message);
        }
    }, [code])

    return (
        <SafeAreaViewContainer style={styles.header}>
            {!confirm
                ? (<><TextInput
                    maxLength={15}
                    placeholder="09xxxxxxxx"
                    placeholderTextColor={TEXT}
                    value={phoneNumber}
                    onChangeText={newNumber => setPhoneNumber(newNumber)}
                    style={styles.text}>
                </TextInput>
                    <TouchableOpacity style={[WRAPPER_SHADOW, BOX_SHADOW, BUTTON_STANDARD, { justifyContent: "center" }]}
                        onPress={
                            () => signInWithPhoneNumber()
                        }
                    >
                        <Text style={[WORD_20, { color: BACKGROUND }]}>
                            Login with phone number
                        </Text>
                    </TouchableOpacity></>)
                : (<><TextInput
                    maxLength={6}
                    placeholder="Code"
                    placeholderTextColor={TEXT}
                    value={code}
                    onChangeText={newCode => setCode(newCode)}
                    style={styles.text}>
                </TextInput>
                    <TouchableOpacity style={[WRAPPER_SHADOW, BOX_SHADOW, BUTTON_STANDARD, { justifyContent: "center" }]}
                        onPress={
                            () => signInWithPhoneNumber()
                        }
                    >
                        <Text style={[WORD_20, { color: BACKGROUND }]}>
                            Login with phone number
                        </Text>
                    </TouchableOpacity></>)}
            <StatusBar style="auto" />
        </SafeAreaViewContainer>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: BACKGROUND,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 16 * SCALE,
        color: TEXT,
    }
})

export default LoginScreen;