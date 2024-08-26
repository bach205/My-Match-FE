import { IntlProviderWrapper } from "./src/HOC";
import * as Components from "./src/components"
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['com.huybach.MyMatch://'],
  config: {
    screens: {
      Login: 'login',
    },
  },
};

export default function App() {
  return (
    <IntlProviderWrapper>
      <NavigationContainer initialRouteName="Loading" theme={DarkTheme} linking={linking}>
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
          <Stack.Screen name="CountryCode" component={Components.CountryCode}
            options={{
              headerShown: true, title: "Country code",
              animation: "slide_from_right",
              detachPreviousScreen: false,
            }} />
          <Stack.Screen name="CreateData1" component={Components.CreateData1} />
          <Stack.Screen name="CreateData2" component={Components.CreateData2} />
          <Stack.Screen name="CreateData3" component={Components.CreateData3} />
          <Stack.Screen name="FindMBTI" component={Components.FindMBTI} />
          <Stack.Screen name="FindEI" component={Components.FindEI} />
          <Stack.Screen name="FindSN" component={Components.FindSN} />
          <Stack.Screen name="FindTF" component={Components.FindTF} />
          <Stack.Screen name="FindJP" component={Components.FindJP} />
          <Stack.Screen name="ResultMBTI" component={Components.ResultMBTI} />
        </Stack.Navigator>
      </NavigationContainer>
    </IntlProviderWrapper>
  );
}

