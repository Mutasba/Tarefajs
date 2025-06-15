import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  useColorScheme,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { lightTheme, darkTheme } from '../../componet/thema/thema';

export function tema() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
}

export default function Inicio({ navigation }) {
  const escala = useRef(new Animated.Value(1)).current;
  const opacidade = useRef(new Animated.Value(0)).current;
  const temaAtual = tema();
  const styles = criarStyles(temaAtual);

  useEffect(() => {
    Animated.timing(opacidade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(escala, {
        toValue: 25,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Tarefa');
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Animated.View
        style={[
          styles.logoWrapper,
          {
            opacity: opacidade,
            transform: [{ scale: escala }],
          },
        ]}
      >
        <Animated.Image
          source={require('../../image/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const criarStyles = (tema) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tema.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoWrapper: {
      backgroundColor: '#FFFFFF',
      borderRadius: 100, // deixa circular
      padding: 20,
      elevation: 5, // sombra Android
      shadowColor: '#000', // sombra iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    logo: {
      width: 120,
      height: 120,
    },
  });
