import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return "";
    },
  },
});

const { setNotification, removeNotification } = notificationSlice.actions;

export const showNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => dispatch(removeNotification()), seconds * 1000);
  };
};

export default notificationSlice.reducer;
