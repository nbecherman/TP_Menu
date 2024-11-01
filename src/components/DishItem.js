import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const DishItem = ({ dish, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Image source={{ uri: dish.image }} style={{ width: '100%', height: 200 }} />
        <Text>{dish.title}</Text>
        <Text>Health Score: {dish.healthScore}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DishItem;