import { useLogout } from "@/hooks/useLogout";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const logout = useLogout();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <TouchableOpacity style={styles.button} onPress={() => {
        logout();
        router.replace("/login");
      }}>
        <Text style={styles.buttonText}>Sair</Text>
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
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#e74c3c",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
    shadowColor: "#e74c3c",
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
