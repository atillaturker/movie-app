import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { z } from "zod";

const Register = () => {
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
  return (
    <View>
      <Text>Register</Text>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
