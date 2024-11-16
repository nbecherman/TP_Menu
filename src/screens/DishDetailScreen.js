import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useMenu } from '../context/MenuContext'; 
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons para la cruz

const DishDetailScreen = ({ route, navigation }) => {
  const { dish } = route.params;
  const { menu, addToMenu, removeFromMenu } = useMenu(); // Agregar removeFromMenu
  const isDishInMenu = menu.some(menuItem => menuItem.id === dish.id);

  // Configura la cruz en la parte superior izquierda
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color="black" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: dish.image }} style={styles.image} />
      <Text style={styles.title}>{dish.title}</Text>
      <Text style={styles.healthScore}>Health Score: {dish.healthScore}</Text>
      <Text style={styles.healthScore}>Precio: {dish.pricePerServing}</Text>
      <Text style={styles.dietType}>
        {dish.vegan ? 'Vegan' : 'No es Vegano'}
      </Text>

      {isDishInMenu ? (
        <Button
          title="Eliminar del Menú"
          onPress={() => removeFromMenu(dish.id)}
          color="red" // Cambia el color a rojo
        />
      ) : (
        <Button
          title="Agregar al Menú"
          onPress={() => addToMenu(dish)}
          color="blue" // Mantiene el color azul por defecto
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  healthScore: {
    fontSize: 18,
    marginVertical: 5,
    color: '#777',
  },
  dietType: {
    fontSize: 18,
    marginVertical: 5,
    color: '#777',
  },
  button: {
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#67b7e1', // Azul pastel
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default DishDetailScreen;
