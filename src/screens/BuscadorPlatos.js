import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { obtenerPlatosBusqueda } from '../api';
import Navbar from '../components/navbar';
import { useMenu } from '../context/MenuContext';

const BuscadorPlatosScreen = ({ navigation }) => {
  const [dishes, setDishes] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false); //para la paginacion
  const [hasSearched, setHasSearched] = useState(false); //booleano para que no aparezca no hay platos antes de haber buscado

  const { totalPrice, averageHealthScore } = useMenu();

  useEffect(() => {
    const fetchData = async () => {
      if (query.length >= 3) {
        try {
          setIsLoading(true); //si esta buscando
          const data = await obtenerPlatosBusqueda(query, page);
          if (data.length === 0) setHasMore(false); //si hay resultado deja poner sig
          setDishes(data);
        } catch (err) {
          setError('Hubo un problema al cargar los platos.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setDishes([]);//no muestra los platos
        setHasMore(false) //si hay menos de 3 letras no te deja siguiente
      }
    };
  
    fetchData();
  }, [query, page]); //se llama cuando se cambia la query en el buscador o se avanza de page
  
  const handleNextPage = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    } //si hay mas resultado(se verifica en el efect arriba), prevpage es la pagina actual y se le suma uno
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      setHasMore(true); //si fue para atras hay una siguiente
    }
  };

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
        onChangeText={(text) => {
          setQuery(text);
          setPage(1); 
          setHasMore(true);
          setHasSearched(true);
        }}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.infoText}>Precio total del menú: ${totalPrice.toFixed(2)}</Text>
      <Text style={styles.infoText}>Promedio de Health Score: {averageHealthScore.toFixed(2)}</Text>

      <FlatList
        data={dishes}
        renderItem={renderDish}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={!isLoading && hasSearched && <Text style={styles.errorText}>No se encontraron platos.</Text>}
      />

      <View style={styles.paginationContainer}>
        <Button title="Anterior" onPress={handlePrevPage} disabled={page === 1} />
        <Text style={styles.pageText}>Página {page}</Text>
        <Button title="Siguiente" onPress={handleNextPage} disabled={!hasMore} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7', // Fondo más suave
  },
  searchInput: {
    height: 40,
    borderColor: '#d3d3d3', // Gris claro
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#fff', // Blanco para el campo de búsqueda
  },
  dishItem: {
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e1e1e1', // Gris claro
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  dishImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
  },
  dishTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555', // Tono más suave
  },
  errorText: {
    color: '#e74c3c', // Rojo más sutil
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginVertical: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#777', // Gris suave
  },
});


export default BuscadorPlatosScreen;
