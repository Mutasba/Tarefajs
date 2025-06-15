import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, ActivityIndicator } from 'react-native';
import { useFonts, PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'react-native-paper';


export default function Inicio({ navigation }) {


    const [carregarFonte] = useFonts({ PermanentMarker_400Regular, });
    const animacaoEsquerda = useRef(new Animated.Value(-200)).current;
    const animeOpacity = useRef(new Animated.Value(0)).current;
    const animacaoB = useRef(new Animated.Value(0)).current;
    const animacaoA = useRef(new Animated.Value(0)).current;
    const animacaoB_Y = useRef(new Animated.Value(100)).current;
    const animacaoA_Y = useRef(new Animated.Value(100)).current;
    const {colors} = useTheme();

    useEffect(() => {
        if (carregarFonte) {
            Animated.parallel([
                Animated.timing(animacaoEsquerda, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(animeOpacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(animacaoB_Y, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: false,
                }),
                Animated.timing(animacaoB, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: false,
                }),
                Animated.timing(animacaoA_Y, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: false,
                }),
                Animated.timing(animacaoA, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: false,
                })
            ]).start();

        }
        const timer = setTimeout(() => {
            navigation.replace('Tarefa');
        }, 1500);

        return () => clearTimeout(timer);
    }, [carregarFonte]);

    if (!carregarFonte) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    };



    return (
        <View style={styles.container}>
            <View style={styles.containerCentral}>

                <Animated.View style={[styles.T, { left: animacaoEsquerda, opacity: animeOpacity }]}>
                    <Text style={styles.texto}>T</Text>
                </Animated.View>
                <Animated.View style={[styles.b, { opacity: animacaoB, transform: [{ translateY: animacaoB_Y }] }]}>
                    <Text style={styles.texto}>b</Text>
                </Animated.View>

                <Animated.View style={[styles.a, { opacity: animacaoA, transform: [{ translateY: animacaoA_Y }] }]}>
                    <Text style={styles.texto}>a</Text>
                </Animated.View>
                <StatusBar style="auto" />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: 'center', 
        justifyContent: 'center',

    },
    containerCentral: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center', 
        justifyContent: 'center',
        marginLeft: -250
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
        left: 45,
        backgroundColor: "rgb(235, 81, 64)"
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
        left: 95,
        marginBottom: -100,
        backgroundColor: "hsl(59, 95.60%, 55.70%)"
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
        marginBottom: -200,
        backgroundColor: "rgb(60, 237, 48)"
    },
    texto: {
        fontSize: 80,
        fontFamily: "PermanentMarker_400Regular"
    },

});
