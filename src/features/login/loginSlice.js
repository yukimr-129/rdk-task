import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:8000";
const token = localStorage.localJWT;

const initialState = {
  authen: {
    username: "",
    password: "",
  },
  isLoginView: true,
  profile: {
    id: 0,
    username: "",
  },
  fetchStatus: "",
  isLoding: false,
};

export const fetchAuthLoginAsync = createAsyncThunk(
  "login/post",
  async (auth) => {
    try {
      const res = await axios.post(`${apiUrl}/authen/jwt/create/`, auth, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        return res.data;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const fetchAuthRegisterAsync = createAsyncThunk(
  "login/register",
  async (auth) => {
    try {
      const res = await axios.post(`${apiUrl}/api/register/`, auth, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        return res.data;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const fetchAuthUserProfile = createAsyncThunk(
  "login/profile",
  async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/myself/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      if (res.status === 200) {
        return res.data;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    editUserName: (state, action) => {
      // state.authen.username = action.payload

      return {
        ...state,
        authen: {
          ...state.authen,
          username: action.payload,
        },
      };
    },

    editPassword: (state, action) => {
      // state.authen.password = action.payload
      return {
        ...state,
        authen: {
          ...state.authen,
          password: action.payload,
        },
      };
    },

    togleMode: (state, action) => {
      state.isLoginView = !state.isLoginView;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthLoginAsync.pending, (state, action) => {
        // state.isLoding = true;
        return {
          ...state,
          isLoding: true,
        };
      })
      .addCase(fetchAuthLoginAsync.fulfilled, (state, action) => {
        // state.isLoding = false;
        localStorage.setItem("localJWT", action.payload.access);
        action.payload.access && (window.location.href = "/tasks");
        return {
          ...state,
          isLoding: false,
        };
      })
      .addCase(fetchAuthLoginAsync.rejected, (state, action) => {
        // console.log(action.error.message);
        // state.isLoding = false;
        console.log(action);
        return {
          ...state,
          isLoding: false,
        };
      });

    builder
      .addCase(fetchAuthRegisterAsync.fulfilled, (state, action) => {
        // state.isLoding = true;
        return {
          ...state,
          isLoding: true,
        };
      })
      .addCase(fetchAuthRegisterAsync.rejected, (state, action) => {
        // state.isLoding = false;
        console.log(action);
        return {
          ...state,
          isLoding: false,
        };
      });

    builder
      .addCase(fetchAuthUserProfile.pending, (state, action) => {
        // state.isLoding = true;
      })
      .addCase(fetchAuthUserProfile.fulfilled, (state, action) => {
        // state.profile = action.payload
        // state.isLoding = false;
        return {
          ...state,
          profile: {
            ...state.profile,
            ...action.payload,
          },
          isLoding: false,
        };
      })
      .addCase(fetchAuthUserProfile.rejected, (state, action) => {
        // state.isLoding = false;
        console.log(action);
        return {
          ...state,
          isLoding: false,
        };
      });
  },
});

export const selectAuthen = (state) => state.login.authen;
export const selectIsLoginView = (state) => state.login.isLoginView;
export const selectProfile = (state) => state.login.profile;

export const { editUserName, editPassword, togleMode } = loginSlice.actions;

export default loginSlice.reducer;
