import React, { useCallback, useEffect, useState, useRef } from "react"
import { FormattedMessage } from "react-intl"
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view"
import { Button } from "react-native-paper"
import { io } from "socket.io-client"
import { SafeAreaViewContainer, SCALE, TEXT, BACKGROUND, BUTTON_TEXT, TEXT_TITLE } from "../../styles/StyleVariable"

const SOCKET_SERVER = "http://192.168.1.12:3002"
const MYID = "0000"

const RenderFlatList = React.memo(({ data }) => {
    const keyExtractor = useCallback((_, index) => index, [])
    const handleRenderItem = useCallback(({ item }) => {
        return (
            <View style={{
                flexDirection: item.id == MYID ? "row-reverse" : "row"
            }}>
                <Text style={
                    [
                        styles.text,
                        styles.message,
                        item.id == MYID
                            ? {
                                borderTopLeftRadius: 17 * SCALE, borderBottomLeftRadius: 17 * SCALE,
                                backgroundColor: BUTTON_TEXT,
                            }
                            : {
                                borderTopRightRadius: 17 * SCALE, borderBottomRightRadius: 17 * SCALE,
                                backgroundColor: TEXT_TITLE,
                            }
                    ]}>{item.message}</Text>
            </View>
        )
    }, [data])
    return (
        <KeyboardAwareFlatList
            extraHeight={0}
            keyboardShouldPersistTaps={"handled"}
            style={[{ backgroundColor: BACKGROUND }, styles.main]}
            data={data}
            keyExtractor={keyExtractor}
            initialNumToRender={16}
            windowSize={86}
            maxToRenderPerBatch={32}
            renderItem={handleRenderItem}
        />
    )
})

const MessageScreen = function ({ navigation }) {
    const [message, setMessage] = useState("");
    const [data, setData] = useState([])
    const [lineCount, setLineCount] = useState(1);

    const textInputRef = useRef(null);
    const typeHeight = useRef(0);

    const handleOnChangeText = (text) => {
        setMessage(text);
    }
    useEffect(() => {
        const socket = io(SOCKET_SERVER, { transports: ["websocket"] })
        socket.on("connect", () => {
            console.log("connect")
        })
        socket.on('connect_error', (err) => { console.log('Connection Error:', err); });
        // Kết nối tới server và lắng nghe sự kiện
        socket.on('message', (newMessage) => {
            setData([...data, {
                id: "0001",
                message: newMessage,
                createAt: new Date()
            }]);
        });
        // Ngắt kết nối khi component bị hủy
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (textInputRef.current) {
            textInputRef.current.measure((x, y, width, height) => {
                typeHeight.current = height;
            });
        }
    }, [])

    const handleOnPress = () => {
        // socket.emit("message", message);
        setData(data => [...data, {
            id: "0000",
            message,
            createAt: new Date()
        }])

        setMessage("");
    }
    const handleOnContentSizeChange = (event) => {
        const contentHeight = event.nativeEvent.contentSize.height;
        const numberOflines = Math.ceil((contentHeight - typeHeight.current) / 16 * SCALE + 1);
        if (numberOflines <= 5 && numberOflines > 0 && numberOflines != lineCount)
            setLineCount(numberOflines);
    }



    return (
        <>
            <StatusBar barStyle={"light-content"} />
            <SafeAreaViewContainer>
                <View style={{ flex: 1 }}>
                    <RenderFlatList data={data} />
                    <View style={styles.footer}>
                        <TextInput
                            ref={textInputRef}
                            style={styles.type}
                            multiline={true}
                            numberOfLines={lineCount}
                            placeholder="type..."
                            placeholderTextColor={TEXT}
                            value={message}
                            onChangeText={handleOnChangeText}
                            onContentSizeChange={handleOnContentSizeChange}
                        />
                        <TouchableOpacity
                            onPress={handleOnPress}>
                            <Text style={styles.text}>send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaViewContainer>
        </>
    )
}

const styles = StyleSheet.create({
    message: {
        color: BACKGROUND,
        minWidth: 50 * SCALE,
        maxWidth: 200 * SCALE,
        flexWrap: "wrap",
        margin: 2 * SCALE,
        padding: 7 * SCALE,
        borderRadius: 5 * SCALE,
        textAlign: "center",
    },
    main: {
        borderColor: "#ffffff",
        borderWidth: 1,
        flex: 0
    },
    footer: {
        paddingLeft: 5 * SCALE,
        paddingRight: 5 * SCALE,
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        alignContent: "flex-end",
        justifyContent: "flex-end",
        gap: 2 * SCALE,
    },
    type: {
        flex: 1,
        borderColor: "#ffffff",
        borderWidth: 1 * SCALE,
        borderRadius: 20 * SCALE,
        padding: 2 * SCALE,
        paddingLeft: 15 * SCALE,
        paddingRight: 15 * SCALE,
        color: TEXT,
    },
    text: {
        color: TEXT,
        fontSize: 16 * SCALE,
    },
})
export default MessageScreen;