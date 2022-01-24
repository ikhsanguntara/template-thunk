const axios = require("axios").default;

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
});

export const setupAxios = (store) => {
  instance.interceptors.request.use(
    (config) => {
      const {
        auth: { token },
      } = store.getState();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );
};

export { instance as axios };
