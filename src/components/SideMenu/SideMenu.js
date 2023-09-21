import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Drawer = createDrawerNavigator();

// Pages
import Home from '../../pages/Home/Home';
import List from '../../pages/List/List';

// Icons
import Icon from 'react-native-vector-icons/Foundation';

const SideMenu = () => {
  return (
    <Drawer.Navigator screenOptions={{ drawerStyle: { backgroundColor: "#0283ff" } }}>
      <Drawer.Screen 
        name="Home" 
        component={Home} 
        options={
          { 
            headerShown: false,
            drawerItemStyle: { display: "none" },
          }
        }
      />

      <Drawer.Screen 
        name="List" 
        component={List} 
        options={
          { 
            headerTitleStyle: { display: "none" },
            headerStyle: { backgroundColor: "#0283ff" },
            headerTintColor: "#f8ce24",
            drawerLabel: "Listas",
            drawerLabelStyle: { color: "#f8ce24", fontSize: 24 },
            drawerIcon: ({ focused, size }) => (
              <Icon name="clipboard-pencil" size={100} color="#f8ce24" />
            )
          }
        }
      />

    </Drawer.Navigator>
  )
}

export default SideMenu