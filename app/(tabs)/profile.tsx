import AppwriteService from "@/appwrite/service";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm,Controller } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";

import { z } from "zod";

const appwrite = new AppwriteService();

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

type RegisterFormData = z.infer<typeof zodRegisterSchema>;

const Profile = () => {
  const { control, handleSubmit, formState } = useForm<RegisterFormData>({
    resolver: zodResolver(zodRegisterSchema),
  });


  return (
    <View className="flex-1">
      <Text>Profile</Text>
      <TextInput className="" placeholder="email" />
      <TextInput placeholder="username" />
      <TextInput placeholder="password" />
      <Button title="Sign Up">Sign Up</Button>
    </View>
  );
};

export default Profile;
