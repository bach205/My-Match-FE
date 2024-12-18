import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, Text, View } from 'react-native';
import { BACKGROUND, SCALE, TEXT } from "../../styles/StyleVariable";

/**
 * kiểm tra xem đã login hay chưa nếu có thì điều hướng sang Home
 * chưa thì điều hướng sang Login
 * sau khi điều hướng sẽ reset stack (tức xóa Loading ra khỏi stack)
 */
const LoadingScreen = function (props) {
    let [isLogin, setIsLogin] = useState(false)             //fix rewrite

    if (isLogin) props.navigation.navigate("TabHome")
    else props.navigation.navigate("Login");
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                <FormattedMessage id='Loading' defaultMessage={'Loading'} />
            </Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16 * SCALE,
        color: TEXT,
    }
});

export default LoadingScreen;