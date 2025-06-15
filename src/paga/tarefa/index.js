import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  ImageBackground,
} from 'react-native';
import { FAB, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { lightTheme, darkTheme } from "../../componet/thema/thema";
import { AddTarefa } from '../../componet/addTarefa';

export function tema() {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? darkTheme : lightTheme;
}

export default function Tarefa() {
  const screenWidth = Dimensions.get('window').width;
  const colorScheme = useColorScheme();
  const temaAtual = tema();
  const styles = criarStyle(temaAtual);

  const [modalAberto, setModalAberto] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [tarefas, setTarefas] = useState([
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
      titulo: 'Estudar matemática',
      estado: 'Em andamento',
      tipo: 'Estudo',
      dataHora: '12/06/2025 14:00',
    },
  ]);

  const tarefasFiltradas = tarefas.filter(item =>
    item.titulo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Concluído': return 'green';
      case 'Em andamento': return 'orange';
      case 'Pendente': return 'red';
      default: return temaAtual.colors.text;
    }
  };

  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case 'Trabalho': return 'briefcase';
      case 'Estudo': return 'book-open-variant';
      case 'Pessoal': return 'account-heart';
      default: return 'clipboard-text';
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
      <View style={styles.iconContainer}>
        <Icon
          name={getTipoIcon(item.tipo)}
          size={28}
          color={temaAtual.colors.primary}
        />
      </View>

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

  const backgroundImage = colorScheme === 'dark'
    ? require('../../image/escuro.avif')
    : require('../../image/claro.jpeg');

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.outerContainer}>
        <Searchbar
          placeholder="Pesquisar tarefa..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ margin: 16 }}
          inputStyle={{ color: temaAtual.colors.text }}
          iconColor={temaAtual.colors.primary}
        />

        <AddTarefa
          visivel={modalAberto}
          aoFechar={() => setModalAberto(false)}
          aoSalvar={(dados) => {
            const novaTarefa = {
              id: (tarefas.length + 1).toString(),
              ...dados,
              estado: 'Pendente',
            };
            setTarefas([...tarefas, novaTarefa]);
            setModalAberto(false);
          }}
        />

        <StatusBar barStyle="dark-content" />
        <View style={[styles.container, { width: screenWidth * 0.9 }]}>
          <FlatList
            data={tarefasFiltradas}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>

        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => setModalAberto(true)}
          color="white"
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const criarStyle = (tema) => StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: tema.colors.surface + 'dd',
    borderRadius: 10,
    padding: 15,
    paddingLeft: 50,
    marginVertical: 8,
    elevation: 3,
    width: '100%',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: tema.colors.text,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontWeight: '600',
    color: tema.colors.text,
    width: 100,
  },
  value: {
    color: tema.colors.text,
  },
  iconContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#6200ee',
  },
});
