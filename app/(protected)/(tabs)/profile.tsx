import ProfileCard from "@/components/profileCard";
import { logOutFromAccount } from "@/services/appWrith";
import { getUserData } from "@/services/databaseStorage";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const router = useRouter();
  const {
    data: userData,
    loading: userLoading,
    reFetch: userReFetch,
    error: userError,
  } = useFetch<userProps|null>(() => getUserData() );
  const {
    data: logoutData,
    loading: logoutLoading,
    reFetch: logoutReFetch,
    error: logoutError,
  } = useFetch(() => logOutFromAccount(), false);
  return (
    <SafeAreaView className="flex-1 bg-primary">
      {userLoading ? (
        <View className="flex-1 justify-center  items-center">
          
          <ActivityIndicator size="large" className="text-white " />
        </View>
      ) : (
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
            <Text className="text-white text-xl font-bold">
              {userData?.name ?? "Unnamed"}
            </Text>
            <Text className="text-white text-2xl font-normal">
              {userData?.email ?? "No Email"}
            </Text>
          </View>
          {/* Body Part */}
          <View className="mt-0">
            <ProfileCard title={"Email"} onClick={() => {}} />
            <ProfileCard
              title={"UserName"}
              onClick={() => router.push("/loginScreen")}
            />
            <ProfileCard
              title={"Privacy"}
              onClick={() => {              }}
            />
            <ProfileCard title={"Settings"} onClick={() => {}} />
            <ProfileCard
              title={"Logout"}
              onClick={() => {
                logoutReFetch();
                router.replace("/loginScreen");
              }}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Profile;

