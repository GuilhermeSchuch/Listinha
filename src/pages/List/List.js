import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  SafeAreaView, 
  ScrollView
} from 'react-native';

// Hooks
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Components
import AddList from '../../components/AddList/AddList';
import MiniCircle from '../../components/Border/MiniCircle';
import Loader from '../../components/Loader/Loader';

// BD
import ListaService from '../../services/Lista';
import UserService from '../../services/User';

const List = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [listData, setListData] = useState([]);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [userData, setUserData] = useState({
    id: 0,
    language: '',
  });

  console.log(listData);
  console.log(list);

  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

  const toggleModal = () => {
    setIsLoading(true);
    setReload(!reload);
    setModalVisible(!isModalVisible);
    setIsLoading(false);
  }

  const handleFormSubmit = () => {
    toggleModal();
  }

  useEffect(() => {
    setIsLoading(true);
    ListaService.findList().then((list) => setListData(list._array));
    setIsLoading(false);
    setIsEditMode(false);
  }, [reload]);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);

      const deleteId = await ListaService.deleteData(id);

      setReload(!reload);
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleFindList = async (id) => {
    try {
      setIsLoading(true);

      const listId = await ListaService.findById(id).then((list) => setList(list));

      setReload(!reload);
      setIsLoading(false);
      setIsEditMode(true);
      
      toggleModal();
    } catch (error) {
      console.error("Error finding data:", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      { isLoading ? <Loader /> : (
        <>
          <Text style={styles.title}>
            {currentUser?.language === "portuguese" && "Listas"}
            {currentUser?.language === "spanish" && "Listas"}
            {currentUser?.language === "english" && "Lists"}
          </Text>

          <ScrollView>
            { listData && listData.map((list) => (
              <View key={list.id} style={styles.listContainer}>
                <TouchableOpacity onPress={ async () => await handleFindList(list.id) } onLongPress={ async () => await handleDelete(list.id)} >
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
          </ScrollView>

          <TouchableOpacity style={[styles.button, { marginBottom: 10 }]} onPress={toggleModal}>
            <Text style={styles.newList}>
              {currentUser?.language === "portuguese" && "Criar nova lista"}
              {currentUser?.language === "spanish" && "Crear nueva lista"}
              {currentUser?.language === "english" && "Create new list"}
            </Text>
          </TouchableOpacity>
        </>
      ) }
      

      <AddList 
        isVisible={isModalVisible}
        isEditMode={isEditMode}
        onClose={toggleModal}
        onSubmit={handleFormSubmit}
        bdList={list || ''}
      />
    </SafeAreaView>
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