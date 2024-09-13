import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation"
import * as Components from "../components";
import { BACKGROUND, BUTTON_TEXT, TEXT, TEXT_TITLE } from "../styles/StyleVariable";

const Tab = createMaterialBottomTabNavigator();

const TabHome = () => {
    return (
        <Tab.Navigator initialRouteName="Home" inactiveColor={TEXT} activeColor={BUTTON_TEXT}
            barStyle={{ backgroundColor: BACKGROUND }}
            screenOptions={{ tabBarBadge: false }}>
            <Tab.Screen name="Unknown" component={Components.CreateData1} />
            <Tab.Screen name="Locket" component={Components.CreateData1} />
            <Tab.Screen name="Home" component={Components.HomeScreen} />
            <Tab.Screen name="Message" component={Components.ListConTacts} />
            <Tab.Screen name="Setting" component={Components.CreateData1} />
        </Tab.Navigator>
    )
}

export default TabHome