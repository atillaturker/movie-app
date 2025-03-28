import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MovieDetails = () => {
  const id = useLocalSearchParams();
  return (
    <View>
      <Text className="text-red-600">123{id.title}</Text>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
