import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// Modal
import Modal from 'react-native-modal';

// Hooks
import { useState, useEffect } from 'react';

// BD
import ListaService from '../../services/Lista';
import ItemService from '../../services/Item';

// Icons
import Icon from 'react-native-vector-icons/Foundation';

// Components
import Table from '../Table/Table';
import Loader from '../Loader/Loader';

const AddList = ({ isVisible, isEditMode, onClose, onSubmit, bdList }) => {
  const [inputValue, setInputValue] = useState('');
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  
  
  const [list, setList] = useState({
    title: "Lista",
    items: [],
  });

  console.log(list);

  // Convert data from BD to list data
  useEffect(() => {    
    if(isEditMode){
      const result = {
        title: bdList?.length > 0 ? bdList[0]?.list : "Lista",
        id: bdList[0]?.idList,
        items: bdList?.map(item => ({
          name: item?.item,
          qty: item?.qty,
          id: item?.id
        }))
      };
      setList(result);
    }
    else{
      setList({title: "Lista", items: []});
    }
  }, [isVisible]);
  
  const updateQty = (itemId, newQty) => {
    setList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item) =>
        item.id === itemId ? { ...item, qty: newQty } : item
      ),
    }));
  };

  const deleteItem = async (itemId, z) => {
    setIsLoading(true);

    try {
      if(isEditMode){
        
        setList((prevList) => ({
          ...prevList,
          items: prevList.items.filter((item) => item.id !== itemId),
        }));

        const deleteId = await ItemService.deleteData(itemId);
      }
      else{
        setList((prevList) => ({
          ...prevList,
          items: prevList.items.filter((item) => item.id !== itemId),
        }));
      }
      
    } catch (error) {
      console.error("Error adding data:", error);
    }
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    try {
      const insertId = await ListaService.addData(list);
      // You can now work with the insertId or perform any other actions after the data has been added.
      console.log("Data added with insertId:", insertId);
      setList({title: 'Lista', items: []});
      
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updateData = await ListaService.updateById([ list ]);

    } catch (error) {
      console.error("Error adding data:", error);
    }
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
              isEditMode={isEditMode}
            />
          </View>

          <TouchableOpacity onPress={ isEditMode ? handleUpdate : handleSubmit } style={ styles.create }>
            <Text>{ isEditMode ? "Salvar" : "Criar Lista" }</Text>
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
    flex: 1,
    width: "100%",
  },
});