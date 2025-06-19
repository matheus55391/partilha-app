import { login as loginService } from "@/services/loginService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSessionStore } from "src/stores/sessionStore";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();
    const setSession = useSessionStore((state) => state.setSession);

    const onSubmit = async (data: LoginData) => {
        try {
            const response = await loginService({
                email: data.email,
                password: data.senha,
            });
            setSession(response.access_token, response.refresh_token, "user_id");
            router.replace("/(protected)/(tabs)");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require("@/../assets/images/partial-react-logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Partilha</Text>
            <Text style={styles.subtitle}>Bem-vindo! Faça login para acessar sua conta.</Text>
            <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Email"
                placeholderTextColor="#888"
                {...register("email")}
                onChangeText={text => setValue("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
            <TextInput
                style={[styles.input, errors.senha && styles.inputError]}
                placeholder="Senha"
                placeholderTextColor="#888"
                {...register("senha")}
                onChangeText={text => setValue("senha", text)}
                secureTextEntry
            />
            {errors.senha && <Text style={styles.error}>{errors.senha.message}</Text>}
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
            >
                <Text style={styles.buttonText}>{isSubmitting ? "Entrando..." : "Entrar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/register")}
                style={styles.linkContainer}
            >
                <Text style={styles.linkText}>Não tem uma conta? <Text style={styles.linkBold}>Cadastre-se</Text></Text>
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
    logo: {
        width: 90,
        height: 90,
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#3b2e5a",
        marginBottom: 4,
        letterSpacing: 1.2,
    },
    subtitle: {
        fontSize: 16,
        color: "#6c6c80",
        marginBottom: 28,
    },
    input: {
        width: "100%",
        maxWidth: 320,
        height: 48,
        borderColor: "#e0e0e0",
        borderWidth: 1.5,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 14,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    inputError: {
        borderColor: "#e74c3c",
    },
    error: {
        color: "#e74c3c",
        marginBottom: 8,
        alignSelf: "flex-start",
        marginLeft: 8,
    },
    button: {
        width: "100%",
        maxWidth: 320,
        height: 48,
        backgroundColor: "#6c47ff",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
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
    linkContainer: {
        marginTop: 8,
    },
    linkText: {
        color: "#6c47ff",
        fontSize: 15,
    },
    linkBold: {
        fontWeight: "bold",
        color: "#3b2e5a",
    },
});