import React from 'react';
import { MenuProvider } from '../context/MenuContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BuscadorPlatos from '../screens/BuscadorPlatos';
import menu from '../screens/menu';

import DishDetailScreen from '../screens/DishDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <MenuProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={BuscadorPlatos} />
        <Stack.Screen name="DishDetail" component={DishDetailScreen} />
        <Stack.Screen name="MenuPlatos" component={menu} />
      </Stack.Navigator>
    </NavigationContainer>
    </MenuProvider>
  );
};

export default AppNavigator;