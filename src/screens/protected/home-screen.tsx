import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Mock de grupos (substitua por fetch da API futuramente)
const groups = [
    { id: '1', name: 'Viagem Amigos', imageUrl: null },
    { id: '2', name: 'Família', imageUrl: null },
    { id: '3', name: 'Trabalho', imageUrl: null },
];

export function HomeScreen() {
    const router = useRouter();

    const goToGroup = (id: string) => {
        router.push('/(protected)/group/[id]', {});
    };

    const goToProfile = () => {
        router.push("/(protected)/profile");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Meus Grupos</Text>
                <TouchableOpacity style={styles.profileButton} onPress={goToProfile}>
                    <Ionicons name="person-circle-outline" size={36} color="#6c47ff" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={groups}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.groupCard} onPress={() => goToGroup(item.id)}>
                        <View style={styles.groupAvatar}>
                            {item.imageUrl ? (
                                <Image source={{ uri: item.imageUrl }} style={styles.groupImage} />
                            ) : (
                                <Ionicons name="people" size={32} color="#fff" />
                            )}
                        </View>
                        <Text style={styles.groupName}>{item.name}</Text>
                        <Ionicons name="chevron-forward" size={20} color="#bbb" style={{ marginLeft: 'auto' }} />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Você ainda não participa de nenhum grupo.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7fa",
        paddingTop: 48,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#3b2e5a",
    },
    profileButton: {
        marginLeft: 12,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    groupCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 18,
        marginBottom: 14,
        shadowColor: "#6c47ff",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 1,
    },
    groupAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#6c47ff",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    groupImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    groupName: {
        fontSize: 18,
        color: "#3b2e5a",
        fontWeight: "500",
    },
    emptyText: {
        textAlign: "center",
        color: "#aaa",
        marginTop: 40,
        fontSize: 16,
    },
});
