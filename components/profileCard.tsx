import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProfileCardProps {
  title: string;
  onClick: () => void;
}

const ProfileCard = ({ title, onClick }: ProfileCardProps) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View className="flex-row items-center w-full py-5 px-5 justify-between bg-dark-100 my-2 rounded-xl">
        <Text className="text-white text-xl">{title}</Text>
        <Text className="text-white text-2xl">{">"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({});
