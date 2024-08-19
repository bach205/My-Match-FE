import React, { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from '../locales/en.json';
import viMessages from '../locales/vi.json';
import { getLocales } from 'expo-localization';
import * as SecureStore from 'expo-secure-store';

// Lưu các bản dịch vào một đối tượng
const messages = {
    'en': enMessages,
    'vi': viMessages,
};
//lưu {key: value} vào storage
const saveLocaleToStorage = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
}

//lấy value theo key từ storage sẽ trả ra null nếu không lấy được
const getLocaleFromStorage = async () => {
    try {
        const userLocale = await SecureStore.getItemAsync(key)
        return userLocale;
    } catch (error) {
        return null
    }
}
/**
 * getLocale để lấy locale ở trong storage
 * nếu không có thì sẽ lấy locale mặc định ở máy người dùng
 * rồi kiểm tra xem locale đó có trong message không 
 * nếu không thì locale mặc định sẽ là en
 * rồi lưu vào local storage
 */
const getLocale = async () => {
    let userLocale = await getLocaleFromStorage();
    if (userLocale) {
        return userLocale
    }
    else {
        try {
            userLocale = getLocales()[0].languageCode;
            let count = 0;
            for (let key in messages) {
                if (key === userLocale) {
                    count++;
                    break;
                }
            }
            if (count === 0) userLocale = 'en';
            try {
                await saveLocaleToStorage('user_locale', userLocale);
                return userLocale;
            } catch (error) {
                console.log("Failed to save locale to storage");
                return 'en';
            }
        } catch (error) {
            return 'en';
        }
    }
}
const IntlProviderWrapper = function ({ children }) {
    const [locale, setLocale] = useState(getLocales()[0].languageCode)
    //lấy locale từ trong storage nếu không có thì lấy locale='en' mặc định rồi lưu lại vào locale
    useEffect(() => {
        getLocale()
            .then(locale => setLocale(locale))
    }, [])
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            {children}
        </IntlProvider >
    )
};

export default IntlProviderWrapper;



