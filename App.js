import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IntlProviderWrapper, IntlStackNavigator } from "./src/HOC";
import { CountryCodeProvider } from "./src/HOC/CountryCodeContext";

const Stack = createNativeStackNavigator();

const MyTheme = {
  dark: true,  // Chế độ tối
  colors: {
    primary: 'rgb(255, 45, 85)',  // Màu sắc chủ đạo, có thể giữ nguyên hoặc điều chỉnh nếu cần
    background: 'rgb(0, 0, 0)',  // Màu nền tối
    card: 'rgb(50, 50, 50)',  // Màu nền thẻ tối
    text: 'rgb(255, 255, 255)',  // Màu văn bản sáng
    border: 'rgb(75, 75, 75)',  // Màu viền tối hơn để phù hợp với nền tối
    notification: 'rgb(255, 69, 58)',  // Màu thông báo có thể giữ nguyên hoặc thay đổi tùy theo yêu cầu
  },
};

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
      <NavigationContainer theme={MyTheme} linking={linking}>
        <CountryCodeProvider>
          <IntlStackNavigator />
        </CountryCodeProvider>
      </NavigationContainer>
    </IntlProviderWrapper>
  );
}

