import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Hooks
import { useState } from 'react';

// Icons
import Icon from 'react-native-vector-icons/Foundation';

const Table = ({ list, updateQty, deleteItem, isEditMode }) => {
  const [checkedItems, setCheckedItems] = useState([]);

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
    <View style={styles.table}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.cellText}>Itens</Text>
        </View>

        <View style={styles.cell}>
          <Text style={styles.cellText}>QTD</Text>
        </View>
      </View>

      {list && list.items.map((item) => (
        <View style={styles.row} key={item.id}>
          <TouchableOpacity onLongPress={() => deleteItem(item.id, list.id)} onPress={isEditMode ? () => checkItem(item.id) : null}>
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
    </View>
  );
}

export default Table;


const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    display: "flex",
    justifyContent: "space-between"
  },
  cell: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  cellText: {
    textAlign: 'center',
  },
});