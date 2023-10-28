import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Dropdown
import SelectDropdown from 'react-native-select-dropdown';

// Redux
import { useDispatch } from "react-redux";
import { setLanguage } from "../../redux/user/actions";

// Hooks
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

// DB
import UserService from '../../services/User';

// Components
import Loader from '../../components/Loader/Loader';

const Setting = ({ navigation }) => {
  const languages = ["Português", "Español", "English"];

  // Redux
  const dispatch = useDispatch();
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

  const [isLoading, setIsLoading] = useState(false);
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
  
    const updatedUserData = { id: 0, language: updatedLanguage };
    console.log(updatedUserData);
  
    try {
      await UserService.updateById(updatedUserData);
    } catch (error) {
      console.error("Error updating user language:", error);
    }
  }

  // useEffect(() => {
  //   setIsLoading(true);
  //   UserService.findUser().then((user) => setUserData(user[0]));
  //   setIsLoading(false);

  //   console.log("sim");
  //   console.log(userData);
  //   dispatch(setLanguage({ language: userData.language }))
  // }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <Loader/> : (
        <>
          <View>
            <Text style={styles.title}>
              {currentUser?.language === "portuguese" && "Ajustes"}
              {currentUser?.language === "spanish" && "Ajustes"}
              {currentUser?.language === "english" && "Settings"}
            </Text>
          </View>

          <View>
            <Text>
              {currentUser?.language === "portuguese" && "Idioma:"}
              {currentUser?.language === "spanish" && "Idioma:"}
              {currentUser?.language === "english" && "Language:"}
            </Text>

            <SelectDropdown
              data={languages}
              onSelect={(selectedItem, index) => handleUser(selectedItem, index)}
              defaultButtonText={currentUser?.language === "portuguese" ? "Selecionar Idioma" : (currentUser?.language === "spanish" ? "Seleccionar" : "")}
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