import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Redux
import { useDispatch } from "react-redux";
import { setLanguage } from "../../redux/user/actions";
import { useSelector } from "react-redux";

// Hooks
import { useState, useEffect } from 'react';

// DB
import UserService from '../../services/User';


// Icons
import Icon from 'react-native-vector-icons/Foundation';

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);  

  // Redux
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    UserService.findUser().then((user) => dispatch(setLanguage({ language: user[0].language })));
    setIsLoading(false);
  }, []);


  return (
    <View style={styles.container}>
      <Icon name="clipboard-pencil" size={100} color="#040606" />
      
      <TouchableOpacity onPress={() => navigation.navigate("List")}>
        {currentUser?.language === "portuguese" && <Text style={styles.title}>Entrar Listinha</Text>}
        {currentUser?.language === "spanish" && <Text style={styles.title}>Entra Listinha</Text>}
        {currentUser?.language === "english" && <Text style={styles.title}>Join Listinha</Text>}
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0398ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: "#f8ce24",
    fontSize: 32
  }
});


export default Home