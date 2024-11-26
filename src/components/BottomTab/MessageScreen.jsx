import * as SecureStore from 'expo-secure-store'
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Button, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view"
import { io } from "socket.io-client"
import { BACKGROUND, BUTTON_TEXT, SafeAreaViewContainer, SCALE, TEXT, TEXT_TITLE } from "../../styles/StyleVariable"
import Queue from '../../dataStructure/queue'

const SOCKET_SERVER = "http://192.168.1.78:3002"
let socket;
const MYID = 0
const TYPESIZE = 16 * SCALE;
//xac dinh so phong
const defineRoom = (a, b) => {
    if (a > b) {
        let tmp = a;
        a = b;
        b = tmp;
    }
    return "" + a + b
}
const deleteKey = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key);
        console.log(`Key ${key} has been deleted successfully.`);
    } catch (error) {
        console.error('Error deleting key', error);
    }
};
//ham gui tin nhan
const sendMessage = (socket, mess, route, data, setData) => {
    socket.emit("message", {
        ...mess,
        desId: route.params,
        status: "send"
    }, async (response) => {
        mess.status = response.status;

        //de react biet la da thay doi status cua mess trong data
        setData(data => [...data]);
        if (mess.status === "send") {
            console.log("load" + data)
            await saveDataToStorage(defineRoom(MYID, route.params), [...data.slice(-20)]);
        }
    });
}

//lưu {key: value} vào storage
const saveDataToStorage = async (key, value) => {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
}

//lấy value theo key từ storage sẽ trả ra null nếu không lấy được
const getDataFromStorage = async (key) => {
    try {
        const data = await SecureStore.getItemAsync(key)
        return JSON.parse(data);
    } catch (error) {
        return null
    }
}

const RenderFlatList = React.memo(({ data }) => {
    const keyExtractor = useCallback((_, index) => index, []);
    const handleRenderItem = useCallback(({ item, index }) => {
        const isLastItem = index === data.length - 1;
        return (
            <View style={{
                flexDirection: item.srcId == MYID ? "row-reverse" : "row"
            }}>
                <View style={[styles.vertical, styles.right]}>
                    {item.type === "text" && (<Text style={
                        [
                            styles.text,
                            styles.message,
                            item.srcId == MYID
                                ? {
                                    borderTopLeftRadius: 17 * SCALE, borderBottomLeftRadius: 17 * SCALE,
                                    backgroundColor: BUTTON_TEXT,
                                }
                                : {
                                    borderTopRightRadius: 17 * SCALE, borderBottomRightRadius: 17 * SCALE,
                                    backgroundColor: TEXT_TITLE,
                                }
                        ]}>{item.message}
                    </Text>)}
                    {isLastItem && item.srcId === MYID && (
                        <Text style={styles.text}>
                            {item.status}
                        </Text>

                    )}
                </View>
            </View>
        )
    }, [data])
    return (
        <KeyboardAwareFlatList
            keyboardShouldPersistTaps={"always"}
            style={[{ backgroundColor: BACKGROUND }]}
            data={data}
            keyExtractor={keyExtractor}
            initialNumToRender={16}
            windowSize={86}
            maxToRenderPerBatch={32}
            renderItem={handleRenderItem}
        />
    )
})

const RenderTextInput = React.memo(({ queue, data, route, setData }) => {
    const initTypeHeight = useRef(0);
    const textInputRef = useRef(null);

    const [message, setMessage] = useState("");
    const [lineCount, setLineCount] = useState(1);

    const handleOnChangeText = (text) => {
        setMessage(text);
    }

    const handleOnPress = () => {
        if (message) {
            const createAt = new Date();
            let mess = {
                srcId: MYID,
                message,
                type: 'text',
                status: "sending",
                createAt
            }
            setData(data => [...data, mess])
            setMessage("");
            setLineCount(1);
            if (socket.connected) {
                sendMessage(socket, mess, route, [...data, mess], setData);
            }
            else {
                queue.enqueue(mess);
            }
        }
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

const MessageScreen = function ({ route, navigation }) {

    const messageQueue = useRef(new Queue());

    const [data, setData] = useState([])
    useEffect(() => {
        socket = io(SOCKET_SERVER, { transports: ["websocket"] });
        return () => {
            socket.emit("leaveRoom", { srcId: MYID, desId: route.params })
            if (socket) {
                socket.disconnect();
            }

        }
    }, [])

    useEffect(() => {
        console.log("father" + data)
        socket.on("connect", () => {
            console.log("out sa" + data.length)
            // console.log("connect: " + socket.connected)
            // if (data.length === 0) {
            //     socket.emit("LoadMessage", { srcId: MYID, desId: route.params }, async response => {
            //         if (response.message) {
            //             console.log(2)
            //             setData(response.message);
            //             await saveDataToStorage(defineRoom(MYID, route.params), response.message);
            //         }
            //     })
            // }
            socket.emit("joinRoom", { srcId: MYID, desId: route.params })
            while (!messageQueue.current.isEmpty()) {
                console.log(data.length)
                let mess = messageQueue.current.dequeue().value;
                sendMessage(socket, mess, route, data, setData);
            }
        })
        socket.on('connect_error', (err) => console.log('Connection Error:', err.message));
        // Kết nối tới server và lắng nghe sự kiện
        socket.on('message', (newMessage) => {
            console.log(newMessage);
            setData(data => [...data, {
                srcId: newMessage.srcId,
                message: newMessage.message,
                type: newMessage.type,
                status: newMessage.status,
                createAt: newMessage.createAt
            }]);
        });
        //lay tin nhan tu trong locale
        getDataFromStorage(defineRoom(MYID, route.params))
            .then(oldMessage => {
                if (oldMessage && data.length === 0 && oldMessage.length !== 0) {
                    setData(oldMessage)
                }
            })
        // Ngắt kết nối khi component bị hủy
        return () => {
            //vi ham listener se bi dong bang neu khong unmount no ( tuc la gia tri cua data se bi dong bang o gia tri luc tao ham listener)
            socket.off("connect");
            socket.off("connect_error");
            socket.off("message");
        }
    }, [data]);
    return (
        <>
            <StatusBar barStyle={"light-content"} />
            <SafeAreaViewContainer>
                <View style={styles.header}>
                    <Button title="back" onPress={() => { socket.disconnect(); navigation.goBack() }} />
                </View>
                <View style={styles.main}>
                    <RenderFlatList data={data} />
                </View>
                <View style={styles.footer}>
                    <Button title='ok' onPress={() => deleteKey(defineRoom(MYID, route.params))} />
                    <RenderTextInput queue={messageQueue.current} data={data} route={route} setData={setData} />
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
    header: {
        flex: 1,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        flexDirection: "row",
    },
    main: {
        flex: 11
    },
    footer: {
        paddingLeft: 5 * SCALE,
        paddingRight: 5 * SCALE,
        flex: 1,
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
    vertical: {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        flexDirection: "column",
        gap: 0
    },
    right: {
        alignItems: "flex-end",
    }
})
export default MessageScreen;