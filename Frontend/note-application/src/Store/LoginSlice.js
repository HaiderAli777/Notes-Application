import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "LoginManagement",
  initialState: {
    login: false,
    modal: false,
    submitbtn: false,
    updatebtn: false,
    refresh: 1,
    data: {
      title: "",
      description: "",
      id: "",
    },
  },
  reducers: {
    IsLogin: (state, action) => {
      state.login = true;
      console.log(state.login);
    },
    IsLogout: (state, action) => {
      state.login = false;
      console.log(state.login);
    },
    IsModal: (state, action) => {
      state.modal = !state.modal;
    },
    Submit: (state, action) => {
      state.submitbtn = !state.submitbtn;
    },
    Update: (state, action) => {
      state.updatebtn = !state.updatebtn;
    },
    IsRefresh(state, action) {
      state.refresh = state.refresh + 1;
    },
    fillData(state, action) {
      state.data.title = action.payload.title;
      state.data.description = action.payload.description;
      state.data.id = action.payload.noteId;
    },
  },
});

const { actions } = LoginSlice;
export const {
  IsLogin,
  IsLogout,
  IsModal,
  Submit,
  Update,
  IsRefresh,
  fillData,
} = actions;
export default LoginSlice.reducer;
