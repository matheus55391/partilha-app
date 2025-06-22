import { useLogout } from "@/hooks/useLogout";
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MOCK_USER = {
  id: 'user_mock_id',
  name: 'Matheus Santiago',
  email: 'matheus@email.com',
  image: 'https://ui-avatars.com/api/?name=Matheus+Santiago',
  createdAt: '2025-06-21T00:00:00Z',
};

function useProfile() {
  // Aqui você pode trocar para a chamada real depois
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      // Simula delay
      await new Promise(r => setTimeout(r, 400));
      return MOCK_USER;
    },
  });
}

export default function ProfileScreen() {
  const logout = useLogout();
  const { data: user, isLoading } = useProfile();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#3b2e5a" />
      </TouchableOpacity>
      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarShadow} />
            <View style={styles.avatarBorder}>
            <img
              src={user?.image || "https://ui-avatars.com/api/?name=Usuário"}
              alt="Avatar"
              style={{ width: 90, height: 90, borderRadius: 45 }}
            />
            </View>
        </View>
        <Text style={styles.profileName}>{user?.name}</Text>
        <Text style={styles.profileEmail}>{user?.email}</Text>
      </View>
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
  backButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    zIndex: 10,
    backgroundColor: 'transparent',
    padding: 4,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    marginBottom: 32,
    width: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarWrapper: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarShadow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    opacity: 0.3,
    top: 5,
    left: 5,
    zIndex: 0,
  },
  avatarBorder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#3b2e5a',
    overflow: 'hidden',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3b2e5a',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#7a7a7a',
    marginBottom: 12,
  },
});
