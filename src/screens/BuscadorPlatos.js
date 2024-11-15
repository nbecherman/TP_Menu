import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { obtenerPlatosBusqueda } from '../api';
import Navbar from '../components/navbar';
import { useMenu } from '../context/MenuContext';

const BuscadorPlatosScreen = ({ navigation }) => {
  const [dishes, setDishes] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const { totalPrice, averageHealthScore } = useMenu(); // Obtener valores del contexto

  useEffect(() => {
    const fetchData = async () => {
      if (query.length >= 2) {
        try {
          const data = await obtenerPlatosBusqueda(query);
          setDishes(data);
        } catch (err) {
          setError('Hubo un problema al cargar los platos.');
        }
      }
    };
    fetchData();
  }, [query]);

  const renderDish = ({ item }) => (
    <TouchableOpacity
      style={styles.dishItem}
      onPress={() => navigation.navigate('DishDetail', { dish: item })}
    >
      <Image source={{ uri: item.image }} style={styles.dishImage} />
      <Text style={styles.dishTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Navbar />
      <TextInput
        style={styles.searchInput}
        placeholder="Busca platos"
        value={query}
        onChangeText={setQuery}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.infoText}>Precio total del menú: ${totalPrice.toFixed(2)}</Text>
      <Text style={styles.infoText}>Promedio de Health Score: {averageHealthScore.toFixed(2)}</Text>

      <FlatList
        data={dishes}
        renderItem={renderDish}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  dishItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    alignItems: 'center',
  },
  dishImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  dishTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

export default BuscadorPlatosScreen;
