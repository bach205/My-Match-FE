import { IntlProviderWrapper, IntlStackNavigator } from "./src/HOC";
import * as Components from "./src/components"
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CountryCodeProvider } from "./src/HOC/CountryCodeContext";
import { PaperProvider } from "react-native-paper";

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
      <NavigationContainer theme={DarkTheme} linking={linking}>
        <CountryCodeProvider>
          <IntlStackNavigator />
        </CountryCodeProvider>
      </NavigationContainer>
    </IntlProviderWrapper>
  );
}

