import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

// Modal
import Modal from 'react-native-modal';

// Hooks
import { useState, useEffect } from 'react';

// BD
import ListaService from '../../services/Lista';

// Icons
import Icon from 'react-native-vector-icons/Foundation';

// Components
import Table from '../Table/Table';

const AddList = ({ isVisible, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [qty, setQty] = useState(1);

  const [list, setList] = useState({
    title: "Lista",
    items: [],
  });
  


  const updateQty = (itemId, newQty) => {
    setList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item) =>
        item.id === itemId ? { ...item, qty: newQty } : item
      ),
    }));
  };

  const deleteItem = (itemId) => {
    setList((prevList) => ({
      ...prevList,
      items: prevList.items.filter((item) => item.id !== itemId),
    }));
  };

  // console.log(list);

  const handleSubmit = () => {
    ListaService.addData(list);
  }

  const handleList = () => {
    const item = {
      id: list.items.length,
      name: inputValue,
      qty
    }

    setList(prevItems => ({...prevItems, items: [...list.items, item]}))

    setInputValue('');
  }

  // useEffect(() => {
  //   ListaService.findList().then((res) => console.log(res));
  // }, [list]);

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.7}
      onBackdropPress={onClose}
      style={{ marginBottom: 0 }}
    >
      <View style={ styles.container }>

        <View style={ styles.formContainer }>
          <TextInput style={ styles.title } onChangeText={(text) => setList(prevItems => ({...prevItems, "title": text}))}>{ list.title }</TextInput>

          <View style={ styles.inputGroup }>
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
              <TouchableOpacity onPress={handleList} style={ styles.button }>
                <Text>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setInputValue('')} style={ styles.button }>
                <Text>Limpar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={ styles.table }>
            <Table
              list={list}
              updateQty={updateQty}
              deleteItem={deleteItem}
            />
          </View>

          <TouchableOpacity onPress={handleSubmit} style={ styles.create }>
            <Text>Criar lista</Text>
          </TouchableOpacity>
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
  },

  formContainer: {
    backgroundColor: '#0398ff',
    height: "100%",
    width: "90%",
    display: "flex",
    alignItems: "center",    
  },

  inputGroup: {
    width: "100%",
    backgroundColor: '#0398ff',
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
  },

  create: {
    backgroundColor: "#f8ce24",
    borderRadius: 13,
    padding: 6,
    marginRight: 3,
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 10
  },

  table: {
    width: "100%",
    marginTop: 50,
  },
});