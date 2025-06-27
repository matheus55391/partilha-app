import { Toast } from "@/components/toast";
import { useRegisterMutation } from "@/hooks/use-register-mutation";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/errorUtils";
import { RegisterData, registerSchema } from "@/schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export function RegisterScreen() {
    const { toast, showError, showSuccess, hideToast } = useToast();

    const registerMutation = useRegisterMutation({
        onSuccess: () => {
            showSuccess("Conta criada com sucesso! Redirecionando para o login...");
        },
        onError: (error) => {
            const errorMessage = getErrorMessage(error);
            showError(errorMessage);
        }
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterData) => {
        registerMutation.mutate({
            name: data.name,
            email: data.email,
            password: data.password,
        });
    };

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
            <Text className="text-base text-[#6c6c80] mb-7">Crie sua conta para começar a compartilhar!</Text>
            <TextInput
                className={`w-full h-14 border rounded-lg px-3 text-base bg-white ${errors.name ? 'border-[#e74c3c]' : 'border-[#e0e0e0]'}`}
                placeholder="Nome"
                placeholderTextColor="#888"
                {...register("name")}
                onChangeText={text => setValue("name", text)}
            />
            {errors.name && <Text className="text-[#e74c3c] text-sm self-start ml-2 mt-1">{errors.name.message}</Text>}
            <View className="h-2" />
            <TextInput
                className={`w-full h-14 border rounded-lg px-3 text-base bg-white ${errors.email ? 'border-[#e74c3c]' : 'border-[#e0e0e0]'}`}
                placeholder="Email"
                placeholderTextColor="#888"
                {...register("email")}
                onChangeText={text => setValue("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {errors.email && <Text className="text-[#e74c3c] text-sm self-start ml-2 mt-1">{errors.email.message}</Text>}
            <View className="h-2" />
            <TextInput
                className={`w-full h-14 border rounded-lg px-3 text-base bg-white ${errors.password ? 'border-[#e74c3c]' : 'border-[#e0e0e0]'}`}
                placeholder="Senha"
                placeholderTextColor="#888"
                {...register("password")}
                onChangeText={text => setValue("password", text)}
                secureTextEntry
            />
            {errors.password && <Text className="text-[#e74c3c] text-sm self-start ml-2 mt-1">{errors.password.message}</Text>}
            <View className="h-2" />
            <TouchableOpacity
                className="w-full h-14 bg-[#6c47ff] rounded-lg justify-center items-center mt-2 mb-2"
                onPress={handleSubmit(onSubmit)}
                disabled={registerMutation.isPending}
            >
                <Text className="text-white text-lg font-bold tracking-wide">{registerMutation.isPending ? "Cadastrando..." : "Cadastrar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/")}
                className="mt-2"
            >
                <Text className="text-[#6c47ff] text-base">Já tem uma conta? <Text className="font-bold text-[#3b2e5a]">Entrar</Text></Text>
            </TouchableOpacity>
        </View>
    );
}
