import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";


import store from "../store/store";
import "./globals.css";

export default function RootLayout() {

return (
    <Provider store={store}>
      <StatusBar hidden />

      <Stack  >


<Stack.Screen name="(protected)" options={{headerShown:false}} />
<Stack.Screen name="loginScreen" options={{headerShown:false}} />
<Stack.Screen name="singUpScreen" options={{headerShown:false}} />
      </Stack>
        
      
    </Provider>
  );
}
