import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { FAB, useTheme } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tarefa() {
  const screenWidth = Dimensions.get('window').width;
  const { colors } = useTheme();

  const DATA = [
    {
      id: '1',
      titulo: 'Finalizar relatório',
      estado: 'Em andamento',
      tipo: 'Trabalho',
      dataHora: '10/06/2025 18:00',
    },
    {
      id: '2',
      titulo: 'Estudar React Native',
      estado: 'Pendente',
      tipo: 'Estudo',
      dataHora: '11/06/2025 20:00',
    },
    {
      id: '3',
      titulo: 'Comprar material',
      estado: 'Concluído',
      tipo: 'Pessoal',
      dataHora: '09/06/2025 12:00',
    },
    {
      id: '4',
      titulo: 'Comprar material',
      estado: 'Concluído',
      tipo: 'Pessoal',
      dataHora: '09/06/2025 12:00',
    },
    {
      id: '5',
      titulo: 'Comprar material',
      estado: 'Concluído',
      tipo: 'Pessoal',
      dataHora: '09/06/2025 12:00',
    },
    {
      id: '6',
      titulo: 'Comprar material',
      estado: 'Concluído',
      tipo: 'Pessoal',
      dataHora: '09/06/2025 12:00',
    },
    {
      id: '7',
      titulo: 'Comprar material',
      estado: 'Concluído',
      tipo: 'Pessoal',
      dataHora: '09/06/2025 12:00',
    },
    {
      id: '8',
      titulo: 'Comprar material',
      estado: 'Concluído',
      tipo: 'Pessoal',
      dataHora: '09/06/2025 12:00',
    },
  ];

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Concluído':
        return 'green';
      case 'Em andamento':
        return 'orange';
      case 'Pendente':
        return 'red';
      default:
        return 'gray';
    }
  };

  const onPressItem = (item) => {
    alert(`Você clicou na tarefa: ${item.titulo}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPressItem(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.titulo}>{item.titulo}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Estado:</Text>
        <Text style={[styles.value, { color: getEstadoColor(item.estado), fontWeight: 'bold' }]}>
          {item.estado}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{item.tipo}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Data e Hora:</Text>
        <Text style={styles.value}>{item.dataHora}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.outerContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.container, { width: screenWidth * 0.9 }]}>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
      <StatusBar
        hidden={false} 
        backgroundColor="transparent"
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log("Adicionar tarefa")}
        color="white"
      />

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    elevation: 3,
    width: '100%',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontWeight: '600',
    color: '#555',
    width: 100,
  },
  value: {
    color: '#777',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#6200ee',
  },
});
