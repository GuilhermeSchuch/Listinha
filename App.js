import 'react-native-gesture-handler';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// DB
import DatabaseInit from "./src/database/bd";
new DatabaseInit

// Fonts
import { useFonts } from 'expo-font';

// Components
import SideMenu from './src/components/SideMenu/SideMenu';

// Redux
import { Provider } from "react-redux";
import store from "./src/redux/store";

// Hooks
import { useEffect } from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Shrikhand': require('./src/assets/fonts/Shrikhand/Shrikhand-Regular.ttf'),
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#03998ff" } }}>
          <Stack.Screen name="SideMenu" component={SideMenu} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}
