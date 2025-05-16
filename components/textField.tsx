import HiddenEye from "@/assets/icons/hiddenEye.png";
import openEye from "@/assets/icons/openEye.png";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

interface Props {
  placeHolder: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
  passwordField?: boolean;
}

const TextField = ({
  placeHolder,
  onPress,
  value,
  onChangeText,
  passwordField = false,
}: Props) => {
  const [secureTextEntryValue, setSecureTextEntryValue] = useState(passwordField? true: false);

  return (
    <View className="flex-row items-center bg-dark-200 rounded-3xl px-5 py-4">
      <TextInput
        onPress={onPress}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
        secureTextEntry={secureTextEntryValue}
      />
      {passwordField && (
        <TouchableOpacity
          onPress={() => setSecureTextEntryValue(!secureTextEntryValue)}
        >
          <Image
            source={secureTextEntryValue ? HiddenEye : openEye}
            className="size-6 text-white"
            tintColor={"white"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextField;
