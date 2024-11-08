import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useMenu } from '../context/MenuContext';
import Navbar from '../components/navbar';

const MenuScreen = ({ navigation }) => {
  const { menu } = useMenu();

  const renderDish = ({ item }) => (
    <TouchableOpacity
      style={styles.dishItem}
      onPress={() => navigation.navigate('DishDetail', { dish: item })}
    >
      <Image source={{ uri: item.image }} style={styles.dishImage} />
      <Text style={styles.dishTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Navbar />
      {menu.length === 0 ? (
        <Text style={styles.emptyText}>No hay platos en el menú.</Text>
      ) : (
        <FlatList
          data={menu}
          renderItem={renderDish}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dishItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    alignItems: 'center',
  },
  dishImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  dishTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MenuScreen;