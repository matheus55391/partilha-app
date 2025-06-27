import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// Mock de extrato do grupo
const mockTransactions = [
    { id: '1', title: 'Pizza', amount: 120, createdAt: '2025-06-19', paidBy: 'Você' },
    { id: '2', title: 'Mercado', amount: 80, createdAt: '2025-06-18', paidBy: 'Maria' },
];

export function GroupScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");

    const handleAddExpense = () => {
        // Aqui você faria a chamada para API
        setShowModal(false);
        setTitle("");
        setAmount("");
    };

    const handleGoBack = () => {
        try {
            router.back();
        } catch (error) {
            console.error("Erro ao voltar:", error);
            router.push('/home');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={28} color="#3b2e5a" />
                </TouchableOpacity>
                <Text style={styles.title}>Grupo #{id}</Text>
                <View style={{ width: 28 }} />
            </View>
            <FlatList
                data={mockTransactions}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.transactionCard}>
                        <Text style={styles.transactionTitle}>{item.title}</Text>
                        <Text style={styles.transactionAmount}>R$ {item.amount.toFixed(2)}</Text>
                        <Text style={styles.transactionMeta}>Pago por {item.paidBy} em {item.createdAt}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma transação ainda.</Text>}
            />
            <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
                <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
            <Modal visible={showModal} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Nova Despesa</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Título"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Valor (R$)"
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                        />
                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
                                <Text style={styles.cancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={handleAddExpense}>
                                <Text style={styles.saveText}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7fa",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 48,
        paddingBottom: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#3b2e5a",
    },
    listContent: {
        padding: 16,
        paddingBottom: 80,
    },
    transactionCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 18,
        marginBottom: 14,
        shadowColor: "#6c47ff",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 1,
    },
    transactionTitle: {
        fontSize: 18,
        fontWeight: "500",
        color: "#3b2e5a",
    },
    transactionAmount: {
        fontSize: 16,
        color: "#6c47ff",
        fontWeight: "bold",
        marginTop: 4,
    },
    transactionMeta: {
        fontSize: 13,
        color: "#888",
        marginTop: 2,
    },
    emptyText: {
        textAlign: "center",
        color: "#aaa",
        marginTop: 40,
        fontSize: 16,
    },
    fab: {
        position: "absolute",
        right: 24,
        bottom: 32,
        backgroundColor: "#6c47ff",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#6c47ff",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
        elevation: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        padding: 24,
        paddingBottom: 32,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#3b2e5a",
        marginBottom: 18,
    },
    input: {
        borderWidth: 1.2,
        borderColor: "#e0e0e0",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 14,
        backgroundColor: "#fafafa",
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 8,
    },
    cancelButton: {
        marginRight: 18,
        paddingVertical: 10,
        paddingHorizontal: 18,
    },
    cancelText: {
        color: "#888",
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: "#6c47ff",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 22,
    },
    saveText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
