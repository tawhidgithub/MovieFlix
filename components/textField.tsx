import React from "react";
import { TextInput, View } from "react-native";


interface Props {
  placeHolder: string;
  onPress?: () => void;
  onChangeText?:(text:string)=>void;
  value?:string
}

const TextField = ({ placeHolder, onPress, value,onChangeText}: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <TextInput
        onPress={onPress}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default TextField;

