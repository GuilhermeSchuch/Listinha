import React from 'react';
import { View, StyleSheet } from 'react-native';

const MiniCircle = () => {
  return <View style={styles.miniCircle}></View>;
};

const styles = StyleSheet.create({
  miniCircle: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#F6C602',
    marginRight: 5,
  },
});

export default MiniCircle;
