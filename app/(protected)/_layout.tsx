import { checkIsLogin } from "@/store/authSlice";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

export default function ProtectedLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, checkIsLoginIsLoading, checkIsLoginError ,userID } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(checkIsLogin());
  }, [dispatch]);

  // Show loading spinner while checking login status
if(checkIsLoginIsLoading){

  return <View className="flex-1 justify-center items-center bg-primary">
    <ActivityIndicator size="large" color="#fff" />
  </View>
}
  // After loading is done, handle errors if needed
 if(checkIsLoginIsLoading){
console.log(`Error checking in login Error =>${checkIsLoginError}`);

}

  // After loading, handle login check
  if (!isLoggedIn) {

    console.log(`isLogIn (after loading): ${isLoggedIn}`);
    return <Redirect href="/loginScreen" />;
  }

  // If logged in, show the protected stack
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="detailsPage/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
