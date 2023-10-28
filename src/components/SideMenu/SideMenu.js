// Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

// Hooks
import { useSelector } from "react-redux";

// Pages
import Home from '../../pages/Home/Home';
import List from '../../pages/List/List';
import Setting from '../../pages/Setting/Setting';

// Icons
import Icon from 'react-native-vector-icons/Foundation';

const SideMenu = () => {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

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
            drawerLabel: currentUser?.language === "portuguese" ? "Listas" : (currentUser?.language === "spanish" ? "Listas" : "List"),
            drawerLabelStyle: { color: "#f8ce24", fontSize: 24 },
            drawerIcon: ({ focused, size }) => (
              <Icon name="clipboard-pencil" size={100} color="#f8ce24" />
            )
          }
        }
      />

      <Drawer.Screen 
        name="Setting" 
        component={Setting} 
        options={
          { 
            headerTitleStyle: { display: "none" },
            headerStyle: { backgroundColor: "#0283ff" },
            headerTintColor: "#f8ce24",
            drawerLabel: currentUser?.language === "portuguese" ? "Ajustes" : (currentUser?.language === "spanish" ? "Ajustes" : "Settings"),
            drawerLabelStyle: { color: "#f8ce24", fontSize: 24 },
            drawerIcon: ({ focused, size }) => (
              <Icon name="widget" size={100} color="#f8ce24" />
            )
          }
        }
      />

    </Drawer.Navigator>
  )
}

export default SideMenu