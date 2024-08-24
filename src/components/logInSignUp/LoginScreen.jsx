import React from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    BACKGROUND,
    BOX_SHADOW,
    BUTTON_STANDARD,
    SCALE,
    TEXT,
    WORD_20,
    WRAPPER_SHADOW,
} from "../../styles/StyleVariable";

//Client_id
//android 606859683199-ac0a499qf4ukl4ek2qnvneehk6otptnu.apps.googleusercontent.com
//ios 606859683199-feg0vme79got7qude8tqq231o9e4enhk.apps.googleusercontent.com

const loginHandle = (navigation) => {
    //thiếu gửi yêu cầu đến Oauth fix

    //dùng tạm để kiểm tra xem có tài khoản hay không
    //backend kiểm tra xem trong CSDL có email đấy chưa nếu chưa thì sẽ trả ra false
    const isUserExist = false;
    if (isUserExist) navigation.navigate("Home");
    else navigation.navigate("CreateData1");

}

const LoginScreen = function ({ navigation }) {

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
    return (
        <View style={styles.header}>
            <Text style={styles.text}>
                Hello from Loginscreen
            </Text>
            <TouchableOpacity style={[WRAPPER_SHADOW, BOX_SHADOW, BUTTON_STANDARD, { justifyContent: "center" }]}
                onPress={
                    () => console.log(1)
                }
            >
                <Text style={[WORD_20, { color: BACKGROUND }]}>
                    Login with google
                </Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
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