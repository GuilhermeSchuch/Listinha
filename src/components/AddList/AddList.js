import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

// Hooks
import { useState } from 'react';

// Icons
import Icon from 'react-native-vector-icons/Foundation';

const AddList = ({ isVisible, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    console.log(inputValue);

    setInputValue('');
  }

  return (
    <Modal isVisible={isVisible}>
      <View style={ styles.container }>

        <View style={ styles.formContainer }>
          <Text style={ styles.title } onPress={onClose}>Lista</Text>

          <View style={ styles.inputContainer }>
            <Icon name="shopping-cart" size={32} color="#f8ce24" /> 

            <TextInput
              style={ styles.input }
              placeholder="Adicione o item..."
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
            />
          </View>
          
          <View style={ styles.buttonContainer }>
            <TouchableOpacity onPress={handleSubmit} style={ styles.button }>
              <Text>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setInputValue('')} style={ styles.button }>
              <Text>Limpar</Text>
            </TouchableOpacity>
          </View>
          



          {/* <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  )
}

export default AddList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0398ff',
    alignItems: 'center',
    justifyContent: 'start',
    border: "1px solid red",
  },

  formContainer: {
    backgroundColor: '#0398ff',
    height: "90%",
    width: "90%",
    display: "flex",
    alignItems: "center",
  },

  inputContainer: {
    backgroundColor: '#0283ff',
    width: "100%",
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    borderRadius: 13,
  },

  input: {
    maxWidth: "70%",
    width: "70%",
    padding: 13,
    
  },

  title: {
    fontSize: 42,
    fontFamily: "Shrikhand",
    color: "#f8ce24",
  },

  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: 3,
  },

  button: {
    backgroundColor: "#f8ce24",
    borderRadius: 13,
    padding: 6,
    marginRight: 3,
  }
});