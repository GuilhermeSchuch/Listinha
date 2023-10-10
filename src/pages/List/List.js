import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Hooks
import { useEffect, useState } from "react";

// Components
import AddList from '../../components/AddList/AddList';
import MiniCircle from '../../components/Border/MiniCircle';

// BD
import ListaService from '../../services/Lista';

const List = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [listData, setListData] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  const handleFormSubmit = (inputValue) => {
    console.log('Form submitted with value:', inputValue);
    toggleModal();
  }

  useEffect(() => {
    ListaService.findList().then((list) => setListData(list._array));
  }, [isModalVisible]);

  console.log(listData);

  const handleDelete = async (id) => {
    try {
      console.log("ID: " + id);
      console.log(typeof(id));
      const deleteId = await ListaService.deleteData(id);

      console.log("Data deleted with deleteId:", deleteId);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listas</Text>

      
      { listData && listData.map((list) => (
        <View key={list.id} style={styles.listContainer}>
          <TouchableOpacity onLongPress={async () => await handleDelete(list.id)}>
            <Text style={styles.listName}>{ list.name }</Text>

            <View style={styles.border}>
              <MiniCircle />
              <MiniCircle />
              <MiniCircle />
              <MiniCircle />
              <MiniCircle />
              <MiniCircle />
              <MiniCircle />
              <MiniCircle />
              <MiniCircle />
              <MiniCircle />
              <MiniCircle />
              <MiniCircle />
            </View>
          </TouchableOpacity>        
        </View>
      ))}

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
  },

  listContainer: {
    marginBottom: 13,
  },

  listName: {
    fontSize: 16
  },

  border: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
});