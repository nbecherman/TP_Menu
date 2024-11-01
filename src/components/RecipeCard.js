import React from 'react';
import { View, Text } from 'react-native';

const RecipeCard = ({ recipe }) => {
  return (
    <View>
      <Text>{recipe.title}</Text>
      <Text>Ingredients: {recipe.extendedIngredients.map(ingredient => ingredient.name).join(', ')}</Text>
      <Text>Preparation Time: {recipe.readyInMinutes} minutes</Text>
    </View>
  );
};

export default RecipeCard;