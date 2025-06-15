import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from '../paga/inicio';
import Tarefa from '../paga/tarefa';
const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="inicio">
        <Stack.Screen name="inicio" component={Inicio} options={{ headerShown: false }}/>
        <Stack.Screen name='Tarefa'component={Tarefa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
