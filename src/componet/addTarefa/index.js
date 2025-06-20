import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  useColorScheme,
} from 'react-native';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const VISIBLE_ITEMS = 3;
const ITEM_HEIGHT = 60;
const PADDING_HEIGHT = ((VISIBLE_ITEMS - 1) / 2) * ITEM_HEIGHT;
const LOOP_COUNT = 100;

export function AddTarefa({ visivel, aoFechar, salvar }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const agora = new Date();
  const [horaSelecionada, setHoraSelecionada] = useState(agora.getHours());
  const [minutoSelecionado, setMinutoSelecionado] = useState(agora.getMinutes());
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [diaSemanaSelecionado, setDiaSemanaSelecionado] = useState(agora.getDay());
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('Pessoal');
  const [descricao, setDescricao] = useState('');

  const formatarDataExtenso = (data) => {
    const opcoes = { weekday: 'long', day: 'numeric', month: 'long' };
    return data.toLocaleDateString('pt-BR', opcoes);
  };

  const themeStyles = getThemeStyles(isDark);

  const renderInfiniteFlatList = (originalData, selectedValue, setValue) => {
    const extendedData = Array.from({ length: LOOP_COUNT * originalData.length }, (_, i) =>
      originalData[i % originalData.length]
    );
    const initialIndex = Math.floor(extendedData.length / 2) + selectedValue;

    return (
      <FlatList
        data={extendedData}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        initialScrollIndex={initialIndex}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        onMomentumScrollEnd={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          const index = Math.round(offsetY / ITEM_HEIGHT);
          const value = extendedData[index % originalData.length];
          setValue(value);
        }}
        ListHeaderComponent={<View style={{ height: PADDING_HEIGHT }} />}
        ListFooterComponent={<View style={{ height: PADDING_HEIGHT }} />}
        style={{ width: 60 }}
        renderItem={({ item }) => (
          <View style={styles.timeItem}>
            <Text
              style={[
                styles.timeText,
                item === selectedValue && styles.selectedTimeText,
              ]}
            >
              {item < 10 ? `0${item}` : item}
            </Text>
          </View>
        )}
      />
    );
  };

  return (
    <Modal visible={visivel} animationType="slide" transparent onRequestClose={aoFechar}>
      <View style={styles.container}>
        <View style={[styles.modalContent, themeStyles.modalBackground]}>
          {/* Picker de Hora e Minuto */}
          <View style={styles.pickerContainer}>
            {renderInfiniteFlatList(HOURS, horaSelecionada, setHoraSelecionada)}
            <View style={styles.separator}>
              <Text style={styles.separatorText}>:</Text>
            </View>
            {renderInfiniteFlatList(MINUTES, minutoSelecionado, setMinutoSelecionado)}
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={styles.dataContainer}>
              <Text style={[styles.dataExtenso, themeStyles.text]}>
                {formatarDataExtenso(dataSelecionada)}
              </Text>
              <TouchableOpacity onPress={() => alert('Abrir seletor de calendário')}>
                <Text style={{ fontSize: 28, color: '#6C63FF' }}>📅</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diasSemanaContainer}>
              {diasSemana.map((dia, index) => {
                const isSelected = index === diaSemanaSelecionado;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.diaSemana, isSelected && styles.diaSemanaSelecionado]}
                    onPress={() => {
                      setDiaSemanaSelecionado(index);
                      const hoje = new Date();
                      const diff = index - hoje.getDay();
                      const novaData = new Date(hoje);
                      novaData.setDate(hoje.getDate() + diff);
                      setDataSelecionada(novaData);
                    }}
                  >
                    <Text style={[styles.diaSemanaTexto, isSelected && styles.diaSemanaTextoSelecionado]}>
                      {dia}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TextInput
              placeholder="Título da tarefa"
              placeholderTextColor="#aaa"
              style={[styles.input, themeStyles.input]}
              value={titulo}
              onChangeText={setTitulo}
            />

            <View style={styles.tipoContainer}>
              <Text style={[styles.tipoLabel, themeStyles.text]}>Tipo:</Text>
              {['Pessoal', 'Trabalho', 'Estudo'].map((tipoItem) => (
                <TouchableOpacity
                  key={tipoItem}
                  onPress={() => setTipo(tipoItem)}
                  style={[styles.tipoBotao, tipo === tipoItem && styles.tipoSelecionado]}
                >
                  <Text style={[styles.tipoTexto, tipo === tipoItem && styles.tipoTextoSelecionado]}>
                    {tipoItem}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              placeholder="Descrição"
              placeholderTextColor="#aaa"
              multiline
              style={[styles.input, themeStyles.input, { height: 80, textAlignVertical: 'top' }]}
              value={descricao}
              onChangeText={setDescricao}
            />
          </ScrollView>

          <View style={styles.buttonsRow}>
            <TouchableOpacity onPress={aoFechar} style={styles.buttonCancelar}>
              <Text style={styles.textCancelar}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => salvar({ horaSelecionada, minutoSelecionado, dataSelecionada, titulo, tipo, descricao })}
              style={styles.buttonSalvar}
            >
              <Text style={styles.textSalvar}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const getThemeStyles = (isDark) => ({
  modalBackground: {
    backgroundColor: isDark ? '#111' : '#fff',
  },
  input: {
    backgroundColor: isDark ? '#1a1a1a' : '#f0f0f0',
    color: isDark ? '#fff' : '#000',
  },
  text: {
    color: isDark ? '#fff' : '#000',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    height: '75%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    marginBottom: 10,
  },
  timeItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 30,
    color: 'rgba(160, 160, 160, 0.4)',
  },
  selectedTimeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
  separator: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
  },
  separatorText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dataExtenso: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  diasSemanaContainer: {
    marginBottom: 15,
  },
  diaSemana: {
    borderRadius: 8,
    marginRight: 6,
    backgroundColor: '#eee',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  diaSemanaSelecionado: {
    backgroundColor: '#6C63FF',
  },
  diaSemanaTexto: {
    color: '#333',
    fontWeight: 'bold',
  },
  diaSemanaTextoSelecionado: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  tipoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  tipoLabel: {
    marginRight: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipoBotao: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginRight: 10,
  },
  tipoSelecionado: {
    backgroundColor: '#6C63FF',
  },
  tipoTexto: {
    fontWeight: 'bold',
    color: '#333',
  },
  tipoTextoSelecionado: {
    color: '#fff',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingBottom: 10,
  },
  buttonCancelar: {
    backgroundColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonSalvar: {
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  textCancelar: {
    fontWeight: 'bold',
    color: '#333',
  },
  textSalvar: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
