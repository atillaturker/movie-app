import React from "react";
import { StyleSheet, Text } from "react-native";
import ProtectedRoute from "../../components/protectedRoute";

const Homescreen = () => {
  return (
    <ProtectedRoute>
      <Text>Homescreen</Text>
    </ProtectedRoute>
  );
};

export default Homescreen;

const styles = StyleSheet.create({});
