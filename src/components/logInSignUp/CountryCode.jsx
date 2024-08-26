import React, { useCallback, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { FlatList, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
    BACKGROUND,
    BOX_SHADOW,
    BUTTON_STANDARD,
    BUTTON_TEXT,
    CHOICE,
    SafeAreaViewContainer,
    SCALE,
    TEXT,
    TEXT_TITLE,
    TITLE,
    WORD,
    WRAPPER_SHADOW
} from "../../styles/StyleVariable";

const country = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
    "Comoros", "Congo", "Congo, Democratic Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
    "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
    "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
    "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
    "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia",
    "Zimbabwe"];

const code = [
    "+93",  // Afghanistan
    "+355", // Albania
    "+213", // Algeria
    "+376", // Andorra
    "+244", // Angola
    "+1", // Antigua and Barbuda
    "+54",  // Argentina
    "+374", // Armenia
    "+61",  // Australia
    "+43",  // Austria
    "+994", // Azerbaijan
    "+1", // Bahamas
    "+973", // Bahrain
    "+880", // Bangladesh
    "+1", // Barbados
    "+375", // Belarus
    "+32",  // Belgium
    "+501", // Belize
    "+229", // Benin
    "+975", // Bhutan
    "+591", // Bolivia
    "+387", // Bosnia and Herzegovina
    "+267", // Botswana
    "+55",  // Brazil
    "+673", // Brunei
    "+359", // Bulgaria
    "+226", // Burkina Faso
    "+257", // Burundi
    "+238", // Cabo Verde
    "+855", // Cambodia
    "+237", // Cameroon
    "+1", // Canada
    "+236", // Central African Republic
    "+235", // Chad
    "+56",  // Chile
    "+86",  // China
    "+57",  // Colombia
    "+269", // Comoros
    "+242", // Congo
    "+243", // Congo, Democratic Republic of the
    "+506", // Costa Rica
    "+385", // Croatia
    "+53",  // Cuba
    "+357", // Cyprus
    "+420", // Czech Republic
    "+45",  // Denmark
    "+253", // Djibouti
    "+1", // Dominica
    "+1", // Dominican Republic
    "+593", // Ecuador
    "+20",  // Egypt
    "+503", // El Salvador
    "+240", // Equatorial Guinea
    "+291", // Eritrea
    "+372", // Estonia
    "+268", // Eswatini
    "+251", // Ethiopia
    "+679", // Fiji
    "+358", // Finland
    "+33",  // France
    "+241", // Gabon
    "+220", // Gambia
    "+995", // Georgia
    "+49",  // Germany
    "+233", // Ghana
    "+30",  // Greece
    "+1", // Grenada
    "+502", // Guatemala
    "+224", // Guinea
    "+245", // Guinea-Bissau
    "+592", // Guyana
    "+509", // Haiti
    "+504", // Honduras
    "+36",  // Hungary
    "+354", // Iceland
    "+91",  // India
    "+62",  // Indonesia
    "+98",  // Iran
    "+964", // Iraq
    "+353", // Ireland
    "+972", // Israel
    "+39",  // Italy
    "+1", // Jamaica
    "+81",  // Japan
    "+962", // Jordan
    "+7",   // Kazakhstan
    "+254", // Kenya
    "+686", // Kiribati
    "+850", // Korea, North
    "+82",  // Korea, South
    "+383", // Kosovo
    "+965", // Kuwait
    "+996", // Kyrgyzstan
    "+856", // Laos
    "+371", // Latvia
    "+961", // Lebanon
    "+266", // Lesotho
    "+231", // Liberia
    "+218", // Libya
    "+423", // Liechtenstein
    "+370", // Lithuania
    "+352", // Luxembourg
    "+261", // Madagascar
    "+265", // Malawi
    "+60",  // Malaysia
    "+960", // Maldives
    "+223", // Mali
    "+356", // Malta
    "+692", // Marshall Islands
    "+222", // Mauritania
    "+230", // Mauritius
    "+52",  // Mexico
    "+691", // Micronesia
    "+373", // Moldova
    "+377", // Monaco
    "+976", // Mongolia
    "+382", // Montenegro
    "+212", // Morocco
    "+258", // Mozambique
    "+95",  // Myanmar
    "+264", // Namibia
    "+674", // Nauru
    "+977", // Nepal
    "+31",  // Netherlands
    "+64",  // New Zealand
    "+505", // Nicaragua
    "+227", // Niger
    "+234", // Nigeria
    "+389", // North Macedonia
    "+47",  // Norway
    "+968", // Oman
    "+92",  // Pakistan
    "+680", // Palau
    "+970", // Palestine
    "+507", // Panama
    "+675", // Papua New Guinea
    "+595", // Paraguay
    "+51",  // Peru
    "+63",  // Philippines
    "+48",  // Poland
    "+351", // Portugal
    "+974", // Qatar
    "+40",  // Romania
    "+7",   // Russia
    "+250", // Rwanda
    "+1", // Saint Kitts and Nevis
    "+1", // Saint Lucia
    "+1", // Saint Vincent and the Grenadines
    "+685", // Samoa
    "+378", // San Marino
    "+239", // Sao Tome and Principe
    "+966", // Saudi Arabia
    "+221", // Senegal
    "+381", // Serbia
    "+248", // Seychelles
    "+232", // Sierra Leone
    "+65",  // Singapore
    "+421", // Slovakia
    "+386", // Slovenia
    "+677", // Solomon Islands
    "+252", // Somalia
    "+27",  // South Africa
    "+211", // South Sudan
    "+34",  // Spain
    "+94",  // Sri Lanka
    "+249", // Sudan
    "+597", // Suriname
    "+46",  // Sweden
    "+41",  // Switzerland
    "+963", // Syria
    "+886", // Taiwan
    "+992", // Tajikistan
    "+255", // Tanzania
    "+66",  // Thailand
    "+670", // Timor-Leste
    "+90",  // Turkey
    "+993", // Turkmenistan
    "+688", // Tuvalu
    "+256", // Uganda
    "+380", // Ukraine
    "+971", // United Arab Emirates
    "+44",  // United Kingdom
    "+1",   // United States
    "+598", // Uruguay
    "+998", // Uzbekistan
    "+678", // Vanuatu
    "+379", // Vatican City
    "+58",  // Venezuela
    "+84",  // Vietnam
    "+967", // Yemen
    "+260", // Zambia
    "+263"  // Zimbabwe
]

const RenderItem = React.memo(({ item, index, route, navigation }) => (
    <TouchableOpacity
        onPress={() => {
            route.params.setCountryCode(code[index]);
            navigation.goBack();
        }}
        style={{ flexDirection: "row", justifyContent: "space-between", borderWidth: 1, borderColor: "#FFFFFF" }}>
        <Text style={styles.text}>{item}</Text>
        <Text style={styles.text}>{code[index]}</Text>
    </TouchableOpacity>
))

const CountryCode = ({ navigation, route }) => {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaViewContainer>
                <View style={styles.header}>
                    <TextInput
                        placeholderTextColor={TEXT_TITLE}
                        placeholder="Find country"
                        style={[styles.text]}
                    />
                </View>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={20}
                    windowSize={64}
                    maxToRenderPerBatch={64}
                    data={country}
                    style={styles.main}
                    renderItem={({ item, index }) => (
                        <RenderItem item={item} index={index} route={route} navigation={navigation} />
                    )}
                >
                </FlatList>
            </SafeAreaViewContainer>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 0
    },
    main: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#FFFFFF"
    },
    text: {
        padding: 10 * SCALE,
        textAlignVertical: "center",
        fontSize: 16 * SCALE,
        color: TEXT,
        height: 50 * SCALE,
    },
    textButton: {
        fontSize: 23 * SCALE,
        color: BUTTON_TEXT,
    },
    padding5: { padding: 10 * SCALE },
})
export default CountryCode