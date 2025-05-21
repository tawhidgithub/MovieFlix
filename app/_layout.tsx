import { Stack } from "expo-router";
import { StatusBar } from "react-native";

import "./globals.css";

export default function RootLayout() {

return (
    <>
      <StatusBar hidden />

      <Stack  >


<Stack.Screen name="(protected)" options={{headerShown:false}} />
<Stack.Screen name="loginScreen" options={{headerShown:false}} />
<Stack.Screen name="singUpScreen" options={{headerShown:false}} />
      </Stack>
        
      
    </>
  );
}
