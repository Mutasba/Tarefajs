import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function visualizar() {
  
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getTipoIcone = (tipo) => {
    switch (tipo) {
      case 'Estudo':
        return 'book-open-page-variant';
      case 'Trabalho':
        return 'briefcase';
      case 'Pessoal':
      default:
        return 'home';
    }
  };

  const formatarDataHora = (data, hora, minuto) => {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horaStr = String(hora).padStart(2, '0');
    const minutoStr = String(minuto).padStart(2, '0');
    return `${dia}/${mes}/${ano} às ${horaStr}:${minutoStr}`;
  };

  const dataCriacao = new Date();

  const themeStyles = getThemeStyles(isDark);

  return (
    <View style={[styles.container, themeStyles.background]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color={themeStyles.icon.color} />
        </TouchableOpacity>
        <Text style={[styles.headerText, themeStyles.text]}>Detalhes da Tarefa</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditarTarefa', { tarefa })}>
          <Icon name="pencil" size={26} color="#6C63FF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconeTipo}>
          <Icon name={getTipoIcone(tarefa.tipo)} size={60} color="#6C63FF" />
        </View>

        <Text style={[styles.label, themeStyles.text]}>Status</Text>
        <Text style={[styles.valor, themeStyles.text]}>{tarefa.status || 'Pendente'}</Text>

        <Text style={[styles.label, themeStyles.text]}>Tipo</Text>
        <Text style={[styles.valor, themeStyles.text]}>{tarefa.tipo}</Text>

        <Text style={[styles.label, themeStyles.text]}>Data de Criação</Text>
        <Text style={[styles.valor, themeStyles.text]}>{formatarDataHora(dataCriacao)}</Text>

        <Text style={[styles.label, themeStyles.text]}>Data de Lembrete</Text>
        <Text style={[styles.valor, themeStyles.text]}>
          {formatarDataHora(tarefa.dataSelecionada, tarefa.horaSelecionada, tarefa.minutoSelecionado)}
        </Text>

        <Text style={[styles.label, themeStyles.text]}>Descrição</Text>
        <Text style={[styles.valor, themeStyles.text]}>
          {tarefa.descricao || 'Sem descrição.'}
        </Text>
      </ScrollView>
    </View>
  );
}

const getThemeStyles = (isDark) => ({
  background: {
    backgroundColor: isDark ? '#111' : '#fff',
  },
  text: {
    color: isDark ? '#eee' : '#111',
  },
  icon: {
    color: isDark ? '#eee' : '#111',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 30,
  },
  iconeTipo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  valor: {
    fontSize: 18,
    marginBottom: 10,
  },
});
