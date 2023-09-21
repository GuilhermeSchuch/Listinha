import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Hooks
import { useState } from "react";


// Components
import AddList from '../../components/AddList/AddList';

const List = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  const handleFormSubmit = (inputValue) => {
    console.log('Form submitted with value:', inputValue);
    toggleModal();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listas</Text>

      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.newList}>Criar nova lista</Text>
      </TouchableOpacity>

      <AddList 
        isVisible={isModalVisible}
        onClose={toggleModal}
        onSubmit={handleFormSubmit}
      />
    </View>
  )
}

export default List

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0398ff',
    alignItems: 'center',
    justifyContent: 'start',
    border: "1px solid red",
  },

  title: {
    fontSize: 42,
    fontFamily: "Shrikhand",
    color: "#545454",
  },

  newList: {
    fontSize: 18,
  },

  button: {
    backgroundColor: "#f8ce24",
    borderRadius: 13,
    padding: 6,
  }
});