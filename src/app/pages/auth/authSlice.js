import { createSlice } from "@reduxjs/toolkit";

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

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.token = "test";
      state.user = dummyUser;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
