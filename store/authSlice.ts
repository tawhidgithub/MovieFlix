import {
  loginToAccount,
  logOutFromAccount,
  signUpProps,
  SingUp,
} from "@/services/appWrith";
import { getLoginSession } from "@/services/databaseStorage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/// Initial state

interface AuthState {
  isLoggedIn: boolean;

  loginLoading: boolean;
  loginError: string | null;

  logoutLoading: boolean;
  logoutError: string | null;

  registrationLoading: boolean;
  registrationError: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,

  loginLoading: false,
  loginError: null,

  logoutLoading: false,
  logoutError: null,

  registrationLoading: false,
  registrationError: null,
};

// Thunk to check Login

export const checkLogin = createAsyncThunk("auth/checkLogin", async () => {
  const session = await getLoginSession();
  return !!session?.userId;
});

interface LoginProps {
  Email: string;
  Pass: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ Email, Pass }: LoginProps) => {
    try {
      const loginData = await loginToAccount({ Email: Email, Password: Pass });
      return loginData;
    } catch (error) {
      console.log(`Error ocher in login AuthSlice Redux,Error :-${error}`);
      throw error;
    }
  }
);

export const registration = createAsyncThunk(
  "auth/signUp",
  async ({ Email, Password, Name }: signUpProps) => {
    try {
      return await SingUp({ Email: Email, Password: Password, Name: Name });
    } catch (error) {
      console.log(
        `Error ocher in registration AuthSlice Redux,Error :-${error}`
      );
      throw error;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await logOutFromAccount();
  return false;
});

export const checkIsLogin = createAsyncThunk("auth/checkIsLogin", async () => {
  const session = await getLoginSession();
  console.log("Session in checkIsLogin thunk:", session);

  return !!session?.userId

});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
      })
      .addCase(login.pending, (state) => {
        // eslint-disable-next-line no-unused-expressions
        (state.loginLoading = true), (state.loginError = null);
      })
      .addCase(login.fulfilled, (state) => {
        // eslint-disable-next-line no-unused-expressions
        (state.loginLoading = false), (state.isLoggedIn = true);
      })
      .addCase(login.rejected, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        (state.loginLoading = false),
          (state.loginError = action.error.message || "Login failed");
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.registrationLoading = false;
      })
      .addCase(registration.pending, (state) => {
        state.registrationLoading = true;
      })
      .addCase(registration.rejected, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        (state.registrationLoading = true),
          (state.registrationError =
            action.error.message || "Registration failed ");
      })
      .addCase(checkIsLogin.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
      });
  },
});

export default authSlice.reducer;
