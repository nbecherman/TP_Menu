import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const DishDetailScreen = ({ dish, isInMenu, onAddToMenu, onRemoveFromMenu }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{dish.title}</Text>
      <Text style={styles.attribute}>Health Score: {dish.healthScore}</Text>
      <Text style={styles.attribute}>Vegan: {dish.vegan ? 'Yes' : 'No'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  attribute: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default DishDetailScreen;