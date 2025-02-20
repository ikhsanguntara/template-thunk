import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../axios";

const dummyUser = {
  id: 1,
  username: "admin",
  password: "demo",
  email: "admin@demo.com",
  authToken: "auth-token-8f3ae836da744329a6f93bf20594b5cc",
  refreshToken: "auth-token-f8c137a2c98743f48b643e71161d90aa",
  roles: [1], // Administrator
  pic: "",
  fullname: "Sean S",
  firstname: "Sean",
  lastname: "Stark",
  occupation: "CEO",
  companyName: "Keenthemes",
  phone: "456669067890",
  language: "en",
  timeZone: "International Date Line West",
  website: "https://keenthemes.com",
  emailSettings: {
    emailNotification: true,
    sendCopyToPersonalEmail: false,
    activityRelatesEmail: {
      youHaveNewNotifications: false,
      youAreSentADirectMessage: false,
      someoneAddsYouAsAsAConnection: true,
      uponNewOrder: false,
      newMembershipApproval: false,
      memberRegistration: true,
    },
    updatesFromKeenthemes: {
      newsAboutKeenthemesProductsAndFeatureUpdates: false,
      tipsOnGettingMoreOutOfKeen: false,
      thingsYouMissedSindeYouLastLoggedIntoKeen: true,
      newsAboutMetronicOnPartnerProductsAndOtherServices: true,
      tipsOnMetronicBusinessProducts: true,
    },
  },
  communication: {
    email: true,
    sms: true,
    phone: false,
  },
  address: {
    addressLine: "L-12-20 Vertex, Cybersquare",
    city: "San Francisco",
    state: "California",
    postCode: "45000",
  },
  socialNetworks: {
    linkedIn: "https://linkedin.com/admin",
    facebook: "https://facebook.com/admin",
    twitter: "https://twitter.com/admin",
    instagram: "https://instagram.com/admin",
  },
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/login", payload);
      return response.data;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

export const me = createAsyncThunk(
  "auth/me",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/me");
      console.log(response.data, "test");
      return response.data;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: null,
    user: dummyUser,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action, "action");
        state.loading = false;
        state.token = action.payload.access_token;
      })
      .addCase(me.pending, (state) => {
        state.loading = true;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        // state.user = dummyUser;
      });
  },
});

export const { logout } = authSlice.actions;


export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get("/api/user/me");
}


export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
