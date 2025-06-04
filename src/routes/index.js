import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts,PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import { ActivityIndicator } from 'react-native';
export default function Routes() {
 
 
  const [carregarFonte]=useFonts({PermanentMarker_400Regular,});


  if (!carregarFonte) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};



  return (
    <View style={styles.container}>
      <View style={styles.T}>
        <Text style={styles.texto}>T</Text>
      </View>
      <View style={styles.b}>
        <Text style={styles.texto}>b</Text>
      </View>
      <View style={styles.a}>
        <Text style={styles.texto}>a</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:40
  },

  T: {
    height: 400,
    width: 50,
    borderWidth: 2,
    borderColor: "black",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 45
  },

    b: {
    height: 300,
    width: 60,
    borderWidth: 2,
    borderColor: "black",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 120,
    marginBottom:-100,
    backgroundColor:"cyan"
  },

    a: {
    height: 200,
    width: 60,
    borderWidth: 2,
    borderColor: "black",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 199,
    marginBottom:-200,
    backgroundColor:"cyan"
  },
  texto:{
   fontSize:80,
   fontFamily:"PermanentMarker_400Regular"
  }
});
