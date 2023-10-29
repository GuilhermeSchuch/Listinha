import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  StatusBar 
} from 'react-native';

// Hooks
import { useState } from 'react';
import { useSelector } from "react-redux";

// Icons
import Icon from 'react-native-vector-icons/Foundation';

const Table = ({ list, updateQty, deleteItem, isEditMode }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

  const checkItem = (itemId) => {
    const isChecked = checkedItems.includes(itemId);

    if(isChecked){
      setCheckedItems((prevItems) => (
        prevItems.filter((item) => item !== itemId)
      ));
    }
    else{
      setCheckedItems([...checkedItems, itemId]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.titleCell}>
                {currentUser?.language === "portuguese" && "Itens"}
                {currentUser?.language === "spanish" && "Articulos"}
                {currentUser?.language === "english" && "Items"}
              </Text>
            </View>

            <View style={styles.cell}>
              <Text style={styles.titleCell}>
                {currentUser?.language === "portuguese" && "QTD"}
                {currentUser?.language === "spanish" && "Cantidad"}
                {currentUser?.language === "english" && "QTY"}
              </Text>
            </View>
          </View>

          <ScrollView style={styles.scrollView}>
            {list && list.items.map((item) => (
              <View style={styles.row} key={item.id}>
                <TouchableOpacity onLongPress={() => deleteItem(item.id, list.id)} onPress={isEditMode ? () => console.log(item.id) : null}>
                  <View style={styles.cell}>
                    <Text style={[styles.cellText, checkedItems.includes(item.id) ? { color: '#008000', textDecorationLine: "line-through" } : { color: '#000' }]}>{item.name}</Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.cell}>
                  <TouchableOpacity onPress={() => updateQty(item.id, item.qty + 1)}>
                    <Icon name="plus" size={20} color="#f8ce24" style={{ marginHorizontal: 5 }} />
                  </TouchableOpacity>

                  <Text style={styles.cellText}>{item.qty}</Text>

                  <TouchableOpacity onPress={() => updateQty(item.id, item.qty - 1)}>
                    <Icon name="minus" size={15} color="#f8ce24" style={{ marginLeft: 5, marginTop: 2 }} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
    </SafeAreaView>
  );
}

export default Table;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    width: "100%",
  },
  text: {
    fontSize: 42,
  },

  table: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    width: "100%",
  },

  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    display: "flex",
    justifyContent: "space-between",
  },

  cell: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },

  cellText: {
    textAlign: 'center',
  },

  titleCell: {
    fontWeight: "700",
  }
});