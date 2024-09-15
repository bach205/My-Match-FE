import React, { useCallback, useEffect, useState, useRef } from "react"
import { FormattedMessage } from "react-intl"
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view"
import { Button } from "react-native-paper"
import { io } from "socket.io-client"
import { SafeAreaViewContainer, SCALE, TEXT, BACKGROUND, BUTTON_TEXT, TEXT_TITLE } from "../../styles/StyleVariable"

const SOCKET_SERVER = "http://192.168.1.12:3002"
let socket;
const MYID = 0
const TYPESIZE = 16 * SCALE;

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
            keyboardShouldPersistTaps={"always"}
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

const RenderTextInput = React.memo(({ route, setData }) => {
    const initTypeHeight = useRef(0);
    const textInputRef = useRef(null);

    const [message, setMessage] = useState("");
    const [lineCount, setLineCount] = useState(1);

    useEffect(() => {
        socket = io(SOCKET_SERVER, { transports: ["websocket"] });
        socket.on("connect", () => {
            console.log("connect")
            socket.emit("joinRoom", { srcId: MYID, desId: route.params })
        })
        socket.on('connect_error', (err) => console.log('Connection Error:', err.message));
        // Kết nối tới server và lắng nghe sự kiện
        socket.on('message', (newMessage) => {
            console.log(newMessage);
            setData(data => [...data, {
                id: 1,
                message: newMessage.message,
                createAt: newMessage.createAt
            }]);
        });
        // Ngắt kết nối khi component bị hủy
        return () => {
            socket.emit("leaveRoom", { srcId: MYID, desId: route.params })
            socket.off("message");
            socket.disconnect();
        };
    }, []);

    const handleOnChangeText = (text) => {
        setMessage(text);
    }

    const handleOnPress = () => {
        const createAt = new Date();
        setData(data => [...data, {
            id: MYID,
            message,
            createAt
        }])
        socket.emit("message", {
            message,
            srcId: MYID,
            desId: route.params,
            createAt
        });
        setMessage("");
        setLineCount(1);
    }

    //cái đoạn này bị bug nhiều quá nên mấy cái logic bẩn mắt này để fix bug thui :(((
    //chỉ biết là để như này thì nó mới hoạt động bình thường được :((
    //không hiểu sao message = "" thì nó contentHeight lại bị nhận giá trị bất thường 
    const handleOnContentSizeChange = (event) => {
        const contentHeight = (message === "") ? 0 : event.nativeEvent.contentSize.height;
        if (!initTypeHeight.current) initTypeHeight.current = contentHeight;
        const numberOflines = Math.ceil((contentHeight - initTypeHeight.current) / TYPESIZE + 1);
        if (numberOflines <= 5 && numberOflines > 0 && numberOflines != lineCount)
            setLineCount(numberOflines < 0 ? 1 : numberOflines);
    }
    return (
        <>
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
        </>
    )
})

const MessageScreen = function ({ route }) {

    const [data, setData] = useState([])

    return (
        <>
            <StatusBar barStyle={"light-content"} />
            <SafeAreaViewContainer>
                <View style={{ flex: 1 }}>
                    <RenderFlatList data={data} />
                    <View style={styles.footer}>
                        <RenderTextInput route={route} setData={setData} />
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
        borderWidth: 1,
        borderColor: "#FFFFFF",
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
        fontSize: TYPESIZE,
    },
})
export default MessageScreen;