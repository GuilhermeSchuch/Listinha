import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Dropdown
import SelectDropdown from 'react-native-select-dropdown';

// Redux
import { useDispatch } from "react-redux";
import { setLanguage } from "../../redux/user/actions";

// Hooks
import { useState, useEffect } from 'react';

// DB
import UserService from '../../services/User';

// Components
import Loader from '../../components/Loader/Loader';

const Setting = ({ navigation }) => {
  const languages = ["Português", "Español", "English"];

  // Redux
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    id: 0,
    language: '',
  });

  const handleUser = async (selectedItem, index) => {
    let updatedLanguage = '';
  
    if(selectedItem === "Português") {
      updatedLanguage = "portuguese";
      dispatch(setLanguage({ language: "portuguese" }));
    } 
    else if(selectedItem === "Español") {
      updatedLanguage = "spanish";
      dispatch(setLanguage({ language: "spanish" }));
    } 
    else if(selectedItem === "English") {
      updatedLanguage = "english";
      dispatch(setLanguage({ language: "english" }));
    }
  
    const updatedUserData = { ...userData, language: updatedLanguage };
  
    try {
      await UserService.updateById(updatedUserData);
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error updating user language:", error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    UserService.findUser().then((user) => setUserData(user[0]));
    setIsLoading(false);

    dispatch(setLanguage({ language: userData.language }));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <Loader/> : (
        <>
          <View>
            <Text style={styles.title}>
              {userData?.language === "portuguese" && "Ajustes"}
              {userData?.language === "spanish" && "Ajustes"}
              {userData?.language === "english" && "Settings"}
            </Text>
          </View>

          <View>
            <Text>
              {userData?.language === "portuguese" && "Idioma:"}
              {userData?.language === "spanish" && "Idioma:"}
              {userData?.language === "english" && "Language:"}
            </Text>

            <SelectDropdown
              data={languages}
              onSelect={(selectedItem, index) => handleUser(selectedItem, index)}
              defaultButtonText={userData?.language === "portuguese" ? "Selecionar Idioma" : (userData?.language === "spanish" ? "Seleccionar" : "")}
              buttonStyle={styles.button}
              dropdownStyle={styles.dropdown}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />
          </View>
        </>
      )}



      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0398ff',
    alignItems: 'center',
    justifyContent: 'start',
  },
  
  title: {
    fontSize: 42,
    fontFamily: "Shrikhand",
    color: "#545454",
  },

  button: {
    backgroundColor: "#f8ce24",
    borderRadius: 13,
    padding: 6,
  },

  dropdown: {
    backgroundColor: "#f8ce24",
    borderRadius: 13,
    borderWidth: 2,
  },

});


export default Setting