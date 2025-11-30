import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  token?: string;
  email?: string;
};

const initialState: AuthState = {
  isAuthenticated: false,
  token: undefined,
  email: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ token: string; email?: string }>
    ) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.email || state.email;
      localStorage.setItem("token", action.payload.token);
      if (action.payload.email) {
        localStorage.setItem("email", action.payload.email);
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = undefined;
      state.email = undefined;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
