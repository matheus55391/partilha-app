import { Toast } from "@/components/toast";
import { useLoginMutation } from "@/hooks/use-login-mutation";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/errorUtils";
import { LoginData, loginSchema } from "@/schemas/login-schema";
import { useSessionStore } from "@/stores/session-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Redirect, router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export function LoginScreen() {
    const { toast, showError, hideToast } = useToast();

    const loginMutation = useLoginMutation({
        onError: (error) => {
            const errorMessage = getErrorMessage(error);
            showError(errorMessage);
        }
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginData) => {
        loginMutation.mutate({
            email: data.email,
            password: data.senha,
        });
    };

    const session = useSessionStore();
    if (session.accessToken) {
        return (
            <Redirect href="/home" />
        )
    }

    return (
        <View className="flex-1 justify-center items-center p-6 bg-[#f7f7fa]">
            <Toast
                message={toast.message}
                type={toast.type}
                visible={toast.visible}
                onHide={hideToast}
            />
            <Image source={require("@/../assets/images/partial-react-logo.png")}
                className="w-24 h-24 mb-4"
                resizeMode="contain"
            />
            <Text className="text-3xl font-bold text-[#3b2e5a] mb-1 tracking-wide">Partilha</Text>
            <Text className="text-base text-[#6c6c80] mb-7">Bem-vindo! Faça login para acessar sua conta.</Text>
            <TextInput
                className={`w-full h-14 border rounded-lg px-3 text-base bg-white ${errors.email ? 'border-[#e74c3c]' : 'border-[#e0e0e0]'}`}
                placeholder="Email"
                placeholderTextColor="#888"
                testID="email-input"
                {...register("email")}
                onChangeText={text => setValue("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {errors.email && <Text className="text-[#e74c3c] text-sm self-start ml-2 mt-1">{errors.email.message}</Text>}
            <View className="h-2" />
            <TextInput
                className={`w-full h-14 border rounded-lg px-3 text-base bg-white ${errors.senha ? 'border-[#e74c3c]' : 'border-[#e0e0e0]'}`}
                placeholder="Senha"
                placeholderTextColor="#888"
                testID="password-input"
                {...register("senha")}
                onChangeText={text => setValue("senha", text)}
                secureTextEntry
            />
            {errors.senha && <Text className="text-[#e74c3c] text-sm self-start ml-2 mt-1">{errors.senha.message}</Text>}
            <View className="h-2" />
            <TouchableOpacity
                className="w-full h-14 bg-[#6c47ff] rounded-lg justify-center items-center mt-2 mb-2 "
                onPress={handleSubmit(onSubmit)}
                disabled={loginMutation.isPending}
                testID="login-button"
            >
                <Text className="text-white text-lg font-bold tracking-wide">{loginMutation.isPending ? "Entrando..." : "Entrar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/register")}
                className="mt-2"
            >
                <Text className="text-[#6c47ff] text-base">Não tem uma conta? <Text className="font-bold text-[#3b2e5a]">Cadastre-se</Text></Text>
            </TouchableOpacity>
        </View>
    );
}
