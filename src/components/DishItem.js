import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const DishItem = ({ dish, onPress }) => {
  if (!dish) return null; 

  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Image source={{ uri: dish.image }} style={{ width: '100%', height: 200 }} />
        <Text>{dish.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DishItem;