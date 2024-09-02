import { createContext, useState } from "react";

export const CountryCodeContext = createContext();

export const CountryCodeProvider = ({ children }) => {


    const [countryCode, setCountryCode] = useState('+');

    return (
        <CountryCodeContext.Provider value={{ countryCode, setCountryCode }}>
            {children}
        </CountryCodeContext.Provider>
    )
}