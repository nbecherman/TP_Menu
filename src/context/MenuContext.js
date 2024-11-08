import React, { createContext, useState, useContext } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]); 
  console.log(menu);

  const addToMenu = (dish) => {
    const isDishInMenu = menu.some(item => item.id === dish.id);
    if (isDishInMenu) {
      alert('Este plato ya ha sido agregado al menú.');
      return;
    }

    if (menu.length >= 4) {
      alert('El menú ya tiene 4 platos.');
      return;
    }

    const veganCount = menu.filter(item => item.vegan).length;
    const nonVeganCount = menu.filter(item => !item.vegan).length;

    if (dish.vegan && veganCount >= 2) {
      alert('Ya tienes 2 platos veganos en el menú.');
      return;
    }

    if (!dish.vegan && nonVeganCount >= 2) {
      alert('Ya tienes 2 platos no veganos en el menú.');
      return;
    }

    setMenu([...menu, dish]);
    Alert.alert('Plato agregado', `${dish.title} ha sido agregado al menú.`);
  };

  const value = {
    menu,
    addToMenu,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenu = () => useContext(MenuContext);
