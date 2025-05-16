import CustomButton from "@/components/customButton";
import TextField from "@/components/textField";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";


export default function LoginScreen() {

const route = useRouter();

  return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-primary"
      >
        <View className="flex-1 items-center px-5 mt-32">
          <View className="flex items-start w-full mb-32 mt-10">
            <Text className="text-white text-6xl font-bold ">Email</Text>
            <Text className="text-white text-lg font-normal mt-2 tracking-[1px]">
              Login with your Email
            </Text>
            <Text className="text-white text-lg font-normal tracking-[0.5px]">
              {"if you don't have an account then  "}
              <Text
                className="underline text-accent"
                onPress={() => route.push('/singUpScreen')}
              >
                Register
              </Text>
            </Text>
          </View>
          <View className="w-full gap-6">
            <TextField placeHolder={"Email"} />
            <TextField placeHolder={"Password"} passwordField />
          </View>

          <View className=" w-full mt-32">
            <CustomButton
              btnTitle={"Login"}
              onClick={() => {
                console.log("login button press");
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
}