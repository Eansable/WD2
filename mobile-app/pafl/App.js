import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Text, View, useColorScheme } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context"
import styles from './styles';
import HomeScreen from './app/index';
import Header from './components/Header/header';


export default function App() {
  // const [fonts] = useFonts({
  //   "Philosopher-Regular": require("./assets/fonts/Philosopher-Regular.ttf"),
  //   "Philosopher-Italic": require("./assets/fonts/Philosopher-Italic.ttf"),
  //   "Philosopher-Bold": require("./assets/fonts/Philosopher-Bold.ttf"),
  //   "Philosopher-BI": require("./assets/fonts/Philosopher-BoldItalic.ttf"),
  // })
  return (<SafeAreaProvider >
    <Header />
    <HomeScreen />
  </SafeAreaProvider>
  );
}

