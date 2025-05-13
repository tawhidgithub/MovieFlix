import ProfileCard from "@/components/profileCard";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="bg-primary px-5 ">
        {/* header Part */}
        <View className="w-full bg-transparent h-[300] rounded-lg gap-2 justify-center  flex flex-col items-center">
          <Image
            className="h-[100px] w-[100px] rounded-[50]"
            resizeMode="cover"
            source={{
              uri: "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
            }}
          />
          <Text className="text-white text-xl font-bold">Tawhid Islam</Text>
          <Text className="text-white text-2xl font-normal">
            titawhid02@gmail.components
          </Text>
        </View>
        {/* Body Part */}
        <View className="mt-0">
          <ProfileCard title={"Email"} onClick={() => {}} />
          <ProfileCard title={"UserName"} onClick={() => {}} />
          <ProfileCard title={"Privacy"} onClick={() => {}} />
          <ProfileCard title={"Settings"} onClick={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({});
