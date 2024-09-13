import { StatusBar, Text, TouchableOpacity } from "react-native";
import { BOX_SHADOW, BUTTON_STANDARD, SafeAreaViewContainer, WORD_20, WRAPPER_SHADOW } from "../../styles/StyleVariable";

const ResultMBTI = ({ navigation, route }) => {

    if (navigation.getState()["index"] !== 0) {
        navigation.reset({
            index: 0,
            routes: [{ name: "ResultMBTI", params: { ...route.params } }]
        });
    }

    console.log(route.params.defineMBTI)

    const handleOnPress = () => {
        navigation.navigate("TabHome")
    }
    return (
        <>
            <StatusBar barStyle={"light-content"} />
            <SafeAreaViewContainer>
                <TouchableOpacity
                    onPress={handleOnPress}
                    style={{ alignItems: "center" }}>
                    <Text style={[WORD_20, WRAPPER_SHADOW, BOX_SHADOW, BUTTON_STANDARD,]}>
                        Go to HomeScreen
                    </Text>
                </TouchableOpacity>
            </SafeAreaViewContainer>
        </>
    )
}
export default ResultMBTI