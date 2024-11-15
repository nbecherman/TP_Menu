import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useMenu } from '../context/MenuContext'; 

const DishDetailScreen = ({ route }) => {
  const { dish } = route.params;
  const { menu, addToMenu, removeFromMenu } = useMenu(); // Agregar removeFromMenu

  // Verifica si el plato ya está en el menú
  const isDishInMenu = menu.some(menuItem => menuItem.id === dish.id);

  return (
    <View style={styles.container}>
      <Image source={{ uri: dish.image }} style={styles.image} />
      <Text style={styles.title}>{dish.title}</Text>
      <Text style={styles.healthScore}>Health Score: {dish.healthScore}</Text>
      <Text style={styles.dietType}>
        {dish.vegan ? 'Vegan' : 'Not Vegan'}
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
