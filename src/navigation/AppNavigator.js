import React from 'react';
import { MenuProvider } from '../context/MenuContext'; // Asegúrate de que el contexto esté correctamente importado.
import { NavigationContainer } from '@react-navigation/native'; // Para envolver la aplicación con el contenedor de navegación.
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Usamos BottomTabNavigator para simular el cambio de contenido.
import { createStackNavigator } from '@react-navigation/stack'; // Si necesitas Stack dentro de algún Tab.

import BuscadorPlatos from '../screens/BuscadorPlatos'; // Pantalla de inicio.
import MenuScreen from '../screens/menu'; // Pantalla de menú (puedes mostrarla como contenido dentro de un Tab).
import DishDetailScreen from '../screens/DishDetailScreen'; // Detalles del plato.

const Tab = createBottomTabNavigator(); // Usamos BottomTabNavigator para manejar las secciones.
//const Stack = createStackNavigator(); // Si deseas un Stack dentro de alguna pantalla específica.

const AppNavigator = () => {
  return (
    <MenuProvider>
      <NavigationContainer>
        {}
        <Tab.Navigator 
          initialRouteName="Home" 
          screenOptions={{ headerShown: true }} 
        >
          {}
          
          <Tab.Screen name="Home" component={BuscadorPlatos} 
           options={{
            tabBarButton: () => null,
            tabBarIcon: () => null
          }} />
          {}
          <Tab.Screen name="Menu" component={MenuScreen}
           options={{
            tabBarButton: () => null,
            tabBarIcon: () => null
          }} />

          {}
          <Tab.Screen 
            name="DishDetail" 
            component={DishDetailScreen}
            options={{
              tabBarButton: () => null,
              tabBarIcon: () => null
            }}
/>
        </Tab.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
};

export default AppNavigator;
