import CustomButton from "@/components/customButton";
import TextField from "@/components/textField";
import { SingUp } from "@/services/appWrith";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Text, View } from "react-native";

export default function SingUpScreen() {
  const [pass, setPass] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [signUpError, setSignUpError] = useState<string>();
  const [confirmPass, setConfirmPass] = useState<any | null>();
  const [validPass, setValidPass] = useState<boolean | null>();
  const [passwordMessage, setPasswordMessage] = useState<string | null>();
  const {
    data,
    loading: signUpLoading,
    reFetch,
    error: signUpErrorMessage,
  } = useFetch(
    () => SingUp({ Email: email!, Password: pass, Name: name }),
    false
  );

  useEffect(() => {
    if (!pass || !confirmPass) {
      // setPasswordMessage("❌ both Field are required"),
      setValidPass(false);
    } else if (pass === confirmPass) {
      if (!email) {
        setPasswordMessage("❌ Email is Required");
        setValidPass(false);
      } else {
        setValidPass(true);
        setPasswordMessage("");
      }
    } else {
      setValidPass(false);
      setPasswordMessage("❌ Passwords do not match");
    }
  }, [confirmPass, email, pass]);

  useEffect(() => {
    if (signUpErrorMessage) {
      setSignUpError(signUpErrorMessage.message);
    } else {
      setSignUpError("");
    }
  }, [signUpErrorMessage]);

  const route = useRouter();

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
          <Text className="text-white text-6xl font-bold leading-relaxed">
            Registration
          </Text>
          <Text className="text-white text-lg font-normal mt-2 tracking-[1px]">
            SignUp with your Email
          </Text>
          <Text className="text-white text-lg font-normal tracking-[0.5px]">
            {"if already have a  account! "}
            <Text
              className="underline text-accent"
              onPress={() => route.push("/loginScreen")}
            >
              Login
            </Text>
          </Text>
        </View>
        <View className="w-full gap-6">
          <TextField
            placeHolder={"Name"}
            value={name}
            onChangeText={(value) => setName(value)}
          />
          <TextField
            placeHolder={"Email"}
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          {signUpError && (
            <View className="w-full  px-4">
              <Text className="text-sm text-red-800">{signUpError}</Text>
            </View>
          )}
          <TextField
            placeHolder={"Password"}
            passwordField
            value={pass}
            onChangeText={(value) => setPass(value)}
          />
          <TextField
            placeHolder={"Confirm Password"}
            passwordField
            value={confirmPass}
            onChangeText={(value) => setConfirmPass(value)}
          />
        </View>
        <View className="w-full mt-4 px-4">
          <Text className="text-sm text-red-800">{passwordMessage}</Text>
        </View>

        <View className=" w-full mt-32">
          <CustomButton
            loading={signUpLoading}
            btnTitle={"Registration"}
            disabled={validPass ? false : true}
            onClick={() => {
              reFetch();
              if (signUpErrorMessage) {
                setSignUpError(signUpErrorMessage.message);
                console.log(`Error${signUpError}`);
              } else {

                if(!signUpLoading){
 setSignUpError("");
                route.push("/loginScreen");
                }
               

              }

             
              console.log("----Registration button press");
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
