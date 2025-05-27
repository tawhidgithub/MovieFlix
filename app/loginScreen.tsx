import CustomButton from "@/components/customButton";
import TextField from "@/components/textField";
import { login } from "@/store/authSlice";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

export default function LoginScreen() {
  const [pass, setPass] = useState<any | null>();
  const [email, setEmail] = useState<any | null>();

  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, loginLoading, loginError } = useSelector(
    (state: RootState) => state.auth
  );

  // const {
  //   data: loginData,
  //   loading: loginLoading,
  //   reFetch,
  //   error: loginError,
  // } = useFetch(() => loginToAccount({ Email: email, Password: pass }), false);
  //   const {
  //   data: logoutData,
  //   loading: logoutLoading,
  //   reFetch: logoutReFetch,
  //   error: logoutError,
  // } = useFetch(() => logOutFromAccount(), false);

  const route = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      route.replace("/(protected)/(tabs)");
      console.log(`------------------isLogin ${isLoggedIn}`);
    }
  }, [dispatch]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-primary"
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <View className="flex-1 items-center px-5 mt-32">
        <View className="flex items-start w-full mb-32 mt-10">
          <Text className="text-white text-6xl font-bold leading-relaxed ">
            Login
          </Text>
          <Text className="text-white text-lg font-normal mt-2 tracking-[1px]">
            Login with your Email
          </Text>
          <Text className="text-white text-lg font-normal tracking-[0.5px]">
            {"if you don't have an account then  "}
            <Text
              className="underline text-accent"
              onPress={() => route.push("/singUpScreen")}
            >
              Register
            </Text>
          </Text>
        </View>
        <View className="w-full gap-6">
          <TextField
            placeHolder={"Email"}
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <TextField
            placeHolder={"Password"}
            passwordField
            value={pass}
            onChangeText={(value) => setPass(value)}
          />
        </View>

        <View className=" w-full mt-32">
          <CustomButton
            loading={loginLoading}
            btnTitle={"Login"}
            onClick={() => {
              dispatch(login({ Email: email, Pass: pass })).then(() => {
                route.replace("/(protected)/(tabs)")
              });
              // dispatch(logout())
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
