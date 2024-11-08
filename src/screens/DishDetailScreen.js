import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';

const DishDetailScreen = ({ route }) => {
  const { dish } = route.params;
  const [menu, setMenu] = useState([]); 

  const addToMenu = (dish) => {
    if (menu.length >= 4) {
      Alert.alert('Menú completo', 'El menú ya tiene 4 platos.');
      return;
    }

    const veganCount = menu.filter(item => item.vegan).length;
    const nonVeganCount = menu.filter(item => !item.vegan).length;

    if (dish.vegan && veganCount >= 2) {
      Alert.alert('Límite de veganos', 'Ya tienes 2 platos veganos en el menú.');
      return;
    }

    if (!dish.vegan && nonVeganCount >= 2) {
      Alert.alert('Límite de no veganos', 'Ya tienes 2 platos no veganos en el menú.');
      return;
    }

    setMenu([...menu, dish]);
    Alert.alert('Plato agregado', `${dish.title} ha sido agregado al menú.`);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: dish.image }} style={styles.image} />
      <Text style={styles.title}>{dish.title}</Text>
      <Text style={styles.healthScore}>Health Score: {dish.healthScore}</Text>
      <Text style={styles.dietType}>
        {dish.vegan ? 'Vegan' : 'Not Vegan'}
      </Text>
      
      <Button title="Agregar al Menú" onPress={() => addToMenu(dish)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  healthScore: {
    fontSize: 18,
    marginVertical: 5,
  },
  dietType: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default DishDetailScreen;
