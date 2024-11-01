import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { fetchRecipes } from '../api';
import { calculateTotalPrice, calculateAverageHealthScore } from '../utils/helpers';
import { MAX_DISHES, DIET_TYPES } from '../utils/constants';
import DishItem from '../components/DishItem';

const HomeScreen = ({ navigation }) => {
  const [dishes, setDishes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [averageHealthScore, setAverageHealthScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecipes();
      setDishes(data);
      updateTotalAndAverage(data);
    };
    fetchData();
  }, []);

  const updateTotalAndAverage = (dishes) => {
    setTotalPrice(calculateTotalPrice(dishes));
    setAverageHealthScore(calculateAverageHealthScore(dishes));
  };

  const handleAddDish = async (newDish) => {
    if (dishes.length < MAX_DISHES && validateDietType(newDish.dietType)) {
      // Aquí deberías agregar lógica para agregar un nuevo plato
    } else {
      // Mostrar un mensaje de error
    }
  };

  const handleRemoveDish = async (dishId) => {
    // Aquí deberías agregar lógica para eliminar un plato
  };

  const validateDietType = (dietType) => {
    const veganDishes = dishes.filter(dish => dish.dietType === DIET_TYPES.VEGAN).length;
    const nonVeganDishes = dishes.filter(dish => dish.dietType !== DIET_TYPES.VEGAN).length;

    if (dietType === DIET_TYPES.VEGAN && veganDishes < 2) {
      return true;
    } else if (dietType !== DIET_TYPES.VEGAN && nonVeganDishes < 2) {
      return true;
    }
    return false;
  };

  return (
    <View>
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DishItem
            dish={item}
            onPress={() => navigation.navigate('DishDetail', { dish: item })}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;