import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
  pageNo: 1,
  pageSize: 10,
  totalRecord: 0,
};

// export const getUser = createAsyncThunk(
//   "layout/getUser",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`/api/user/search`, {
//         params: payload,
//       });
//       return response.data;
//     } catch (err) {
//       if (!err.response) throw err;
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

export const getUser = createAsyncThunk("layout/getUser", async (payload) => {
  const response = await axios.get(`/api/user/search`, {
    params: payload,
  });
  return response.data;
});

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    resetData: () => initialState,
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.data;
        state.pageNo = action.payload.data.pageNo;
        state.pageSize = action.payload.data.pageSize;
        state.totalRecord = action.payload.data.totalRecord;
      });
  },
});

export const { resetData, setSelected } = layoutSlice.actions;

export const selectData = (state) => state.layout.data;
export const selectLoading = (state) => state.layout.loading;
export const selectError = (state) => state.layout.error;
export const selectPageNo = (state) => state.layout.pageNo;
export const selectPageSize = (state) => state.layout.pageSize;
export const selectTotalRecord = (state) => state.layout.totalRecord;

export default layoutSlice.reducer;
