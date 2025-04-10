import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(5, "Password must be at least 5 characters."),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Profile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login:", data);
  };

  const router = useRouter();

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
          Log In Now
        </Text>
        <Text className="text-center text-gray-200 text-base">
          Please login to continue using our app
        </Text>
      </View>
      <View className="mb-6">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-white/10 border border-gray-400 rounded-lg p-4 mb-3 text-white"
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text className="text-red-400 text-sm mb-2 ml-2">
            {errors.email.message}
          </Text>
        )}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-white/10 border border-gray-400 rounded-lg p-4 mb-3 text-white"
              placeholderTextColor="#9CA3AF"
              placeholder="Password"
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text className="text-red-400 text-sm mb-2 ml-2">
            {errors.password.message}
          </Text>
        )}
        <TouchableOpacity className="self-end mb-6">
          <Text className="text-blue-300 text-sm font-medium">
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-blue-600 py-4 rounded-xl shadow-lg mb-6"
        >
          <Text className="text-center text-white font-bold text-lg">
            Log In
          </Text>
        </TouchableOpacity>
        <View className="flex-row justify-center">
          <Text className="text-gray-300 mr-1">Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/register/register")}>
            <Text className="text-blue-600">Sing Up</Text>
          </TouchableOpacity>
        </View>
        <View className="items-center mt-12">
          <Text className="text-gray-300 text-sm mb-4">Or connect with</Text>
          <View className="flex-row space-x-6">
            <TouchableOpacity className="bg-white p-3 rounded-full shadow">
              <Image
                // add google logo
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-3 rounded-full shadow">
              <Image
                // add google facebook logo
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-3 rounded-full shadow">
              <Image
                // add apple logo etc.
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
