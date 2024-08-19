import { IntlProviderWrapper } from "./src/HOC";
import * as Components from "./src/components"
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <IntlProviderWrapper>
      <NavigationContainer initialRouteName="Loading" theme={DarkTheme}>
        <Stack.Navigator
          screenOptions={{
            animationEnabled: true,
            headerShown: false,
            presentation: 'transparentModal',
            detachPreviousScreen: true,
            animation: "fade"
          }}>
          <Stack.Screen name="Loading" component={Components.LoadingScreen} />
          <Stack.Screen name="Home" component={Components.HomeScreen} />
          <Stack.Screen name="Login" component={Components.LoginScreen} />
          <Stack.Screen name="CreateData1" component={Components.CreateData1} />
          <Stack.Screen name="CreateData2" component={Components.CreateData2} />
          <Stack.Screen name="CreateData3" component={Components.CreateData3} />
          <Stack.Screen name="FindMBTI" component={Components.FindMBTI} />
        </Stack.Navigator>
      </NavigationContainer>
    </IntlProviderWrapper>
  );
}

