import React from 'react';
import { View, ScrollView } from 'react-native';
import RecipeCard from '../components/RecipeCard';

const DishDetailScreen = ({ route }) => {
  const { dish } = route.params;

  return (
    <ScrollView>
      <RecipeCard recipe={dish} />
    </ScrollView>
  );
};

export default DishDetailScreen;