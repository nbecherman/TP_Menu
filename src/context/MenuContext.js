import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [averageHealthScore, setAverageHealthScore] = useState(0);

  useEffect(() => {

    // Calcula el total de precios y el promedio de healthScore cada vez que el menú cambia
    const calculateTotals = () => {
     
      const total = menu.reduce((sum, dish) => sum + dish.pricePerServing, 0);
      const ultPlato = menu[menu.length - 1]; // Obtiene el último plato agregado
      console.log('precio ult plato:', ultPlato.pricePerServing);
      const average = menu.length > 0 
        ? menu.reduce((sum, dish) => sum + dish.healthScore, 0) / menu.length
        : 0;

      setTotalPrice(total);
      setAverageHealthScore(average);
    };

    calculateTotals();
  }, [menu]);

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

  const removeFromMenu = (dishId) => {
    const updatedMenu = menu.filter(item => item.id !== dishId);
    setMenu(updatedMenu);
    Alert.alert('Plato eliminado', `El plato ha sido eliminado del menú.`);
  };

  const value = {
    menu,
    addToMenu,
    removeFromMenu,
    totalPrice,
    averageHealthScore,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenu = () => useContext(MenuContext);
