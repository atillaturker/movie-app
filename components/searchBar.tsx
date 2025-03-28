import { icons } from "@/constants/icons";
import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ onPress, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center rounded-full px-1 py-4">
      <Image
        source={icons.search}
        tintColor={"#AB8BFF"}
        className="size-6"
        resizeMode="contain"
      />
      <TextInput
        className="ml-4 flex-1 text-white"
        placeholder="Search for movies"
        value={value}
        onPress={onPress}
        onChangeText={onChangeText}
        placeholderTextColor={"#A8B1DB"}
      />
      {value ? (
        <TouchableOpacity onPress={() => onChangeText?.("")}>
          <Image
            source={icons.cross}
            tintColor={"#ffff"}
            className="size-5"
            resizeMode="contain"
            style={{ opacity: 1 }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
