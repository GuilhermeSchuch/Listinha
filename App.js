import 'react-native-gesture-handler';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Fonts
import { useFonts } from 'expo-font';

// Components
import SideMenu from './src/components/SideMenu/SideMenu';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Shrikhand': require('./src/assets/fonts/Shrikhand/Shrikhand-Regular.ttf'),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#03998ff" } }}>
        <Stack.Screen name="SideMenu" component={SideMenu} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
