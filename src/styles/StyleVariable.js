import { Dimensions, SafeAreaView, StyleSheet } from "react-native";

let { width } = Dimensions.get("window");
const WIDTH_STANDARD = 375;
const SCALE = (width / WIDTH_STANDARD);
const BACKGROUND = "#000000";                //den
const TEXT = "#FFFFFF";                             //xam
const BUTTON_TEXT = "#FFCCCC";                      //hong nhat
const BORDER = "#6600CC"                            //tim dam
const TEXT_TITLE = "#E0E0E0"                        //trắng xám

const BOX_SHADOW = StyleSheet.create({
    backgroundColor: BACKGROUND,
    //ios shadow properties
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 3 * SCALE },
    shadowOpacity: 0.3,
    shadowRadius: 5 * SCALE,
    // Android elevation
    elevation: 5 * SCALE,
})

const BUTTON_STANDARD = StyleSheet.create({
    textAlign: "center",
    textAlignVertical: "center",
    marginLeft: 12 * SCALE,
    marginRight: 12 * SCALE,
    color: TEXT,
    borderWidth: 1,
    backgroundColor: "#FFCCCC",
    borderRadius: 25 * SCALE,
    height: 50 * SCALE,
    width: 300 * SCALE,
    color: "#000000"
})

const WRAPPER_SHADOW = StyleSheet.create({
    borderWidth: 2 * SCALE,
    borderColor: "rgba(255, 204, 246, 0.2)",
    borderRadius: 30 * SCALE,
})

const SafeAreaViewContainer = ({ children }) => {
    return (
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    )
}

const TITLE = StyleSheet.create({
    color: TEXT_TITLE,
    fontSize: 32 * SCALE,
    marginBottom: 0,
    textAlign: "center",
})

const CHOICE = StyleSheet.create({
    padding: 3 * SCALE,
    height: 30 * SCALE,
    minWidth: 110 * SCALE,
})

const WORD = StyleSheet.create({
    padding: 1 * SCALE,
    color: TEXT,
    fontSize: 15 * SCALE,
    textAlign: "center",
    textAlignVertical: "center"
})

const WORD_20 = StyleSheet.create({
    padding: 1 * SCALE,
    color: TEXT,
    fontSize: 20 * SCALE,
    textAlign: "center",
    textAlignVertical: "center"
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUND,
        flex: 1,
        padding: 10 * SCALE
    }
})

export {
    SafeAreaViewContainer,
    WIDTH_STANDARD,
    BACKGROUND,
    TEXT, SCALE,
    BUTTON_TEXT,
    BORDER,
    BOX_SHADOW,
    TEXT_TITLE,
    BUTTON_STANDARD,
    WRAPPER_SHADOW,
    TITLE,
    CHOICE,
    WORD,
    WORD_20,
}