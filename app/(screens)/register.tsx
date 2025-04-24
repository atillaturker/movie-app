import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useAuthStore } from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";

const zodRegisterSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters.")
    .max(15, "Username must be at most 15 characters. "),

  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters.")
    .max(15, "Password must be at most 15 characters. "),
});

type registerFormData = z.infer<typeof zodRegisterSchema>;

const Register = () => {
  const { isAuth, error, isLoading, register } = useAuthStore();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormData>({
    resolver: zodResolver(zodRegisterSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: registerFormData) => {
    try {
      await register(data.username, data.email, data.password);
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };
  return (
    <View className="flex-1 bg-primary justify-center px-6">
      <View className="absolute inset-0 z-0">
        <Image
          source={images.bg}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0" />
      </View>
      <Image source={icons.logo} className="w-18 h-14 mb-5 mx-auto" />
      <View className="mb-10">
        <Text className="text-3xl text-white font-extrabold text-center mb-2">
          Sign Up Now
        </Text>
        <Text className="text-center text-gray-200 text-base">
          Please Sign Up to continue using our app
        </Text>
      </View>

      <View className="flex-row justify-center">
        {error && (
          <Text className="text-red-500 text-center mb-4">{error}</Text>
        )}
      </View>

      <View className="mb-4">
        <Controller
          control={control}
          name="username"
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <>
                <TextInput
                  className="bg-white/10 border border-gray-400 rounded-lg p-4 text-white"
                  placeholder="Username"
                  placeholderTextColor="#9CA3AF"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                />
                {error && (
                  <Text className="text-red-400 text-sm mt-1 ml-2">
                    {error.message}
                  </Text>
                )}
              </>
            );
          }}
        />
      </View>

      <View className="mb-4">
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <>
                <TextInput
                  className="bg-white/10 border border-gray-400 rounded-lg p-4 text-white"
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                />
                {error && (
                  <Text className="text-red-400 text-sm mt-1 ml-2">
                    {error.message}
                  </Text>
                )}
              </>
            );
          }}
        />
      </View>

      <View className="mb-4">
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <>
                <TextInput
                  className="bg-white/10 border border-gray-400 rounded-lg p-4 text-white"
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  secureTextEntry
                />
                {error && (
                  <Text className="text-red-400 text-sm mt-1 ml-2">
                    {error.message}
                  </Text>
                )}
              </>
            );
          }}
        />
      </View>

      <TouchableOpacity
        className="bg-blue-600 py-4 rounded-xl mb-4"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-center font-bold text-lg">
          Sign Up
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="text-gray-300">Already have a account? </Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/login")}>
          <Text className="text-blue-400 font-bold">Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
