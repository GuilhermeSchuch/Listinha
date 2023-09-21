import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Icons
import Icon from 'react-native-vector-icons/Foundation';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Icon name="clipboard-pencil" size={100} color="#040606" />
      
      <TouchableOpacity onPress={() => navigation.navigate("List")}>
        <Text style={styles.title}>Entrar Listinha</Text>
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