import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Text, View, useColorScheme } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context"
import styles from '../styles';
import { Link } from 'expo-router';
import Header from '../components/Header/header';

const HomeScreen = () => {
    const insets = useSafeAreaInsets()

    return <View style={{
        paddingTop: insets.top + 5,
        minHeight: "100%"
    }}>
        <Header></Header>
        <Text
            style={[styles.homeTitle]}
        >
            Добро пожаловать в приложение Пинской любительской футбольной лиги
        </Text>
        <Link 
        href="/account"
        >
                В личный кабинет
        </Link>
        <StatusBar style="auto" />
    </View>
}


export default HomeScreen