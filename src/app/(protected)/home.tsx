import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Partilha!</Text>
      <Text style={styles.subtitle}>Você está logado.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/profile")}> 
        <Text style={styles.buttonText}>Ir para o Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f7f7fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3b2e5a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c6c80",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#6c47ff",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
    shadowColor: "#6c47ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1.1,
  },
});
