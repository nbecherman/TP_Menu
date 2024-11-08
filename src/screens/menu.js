import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useMenu } from '../context/MenuContext'; 

const menu = ({ route }) => {
  const { dish } = route.params;
  const { menu, addToMenu } = useMenu(); 

  return (
    <View style={styles.container}>
      
    </View>
  );
};


export default menu;