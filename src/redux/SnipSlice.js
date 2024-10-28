import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  snips: localStorage.getItem("snips")
    ? JSON.parse(localStorage.getItem("snips"))
    : [],
};

export const snipSlice = createSlice({
  name: 'snip',
  initialState,
  reducers: {
    addToSnips: (state, action) => {
      const snip = { ...action.payload, _id: Date.now().toString() }; // Convert ID to string
      const existingSnip = state.snips.find(existing => existing.title === snip.title);

      if (existingSnip) {
        toast.error("Snip with this title already exists");
      } else {
        state.snips.push(snip);
        localStorage.setItem("snips", JSON.stringify(state.snips));
        toast.success("Snip Created Successfully");
      }
    },
    updateToSnips: (state, action) => {
      const snip = action.payload;
      const index = state.snips.findIndex((item) => item._id === snip._id);

      if (index >= 0) {
        state.snips[index] = snip;
        localStorage.setItem("snips", JSON.stringify(state.snips));
        toast.success("Snip Updated");
      }
    },
    resetAllSnips: (state) => {
      state.snips = [];
      localStorage.removeItem("snips");
    },
    removeFromSnips: (state, action) => {
      const snipId = action.payload;
      const index = state.snips.findIndex((item) => item._id === snipId);

      if (index >= 0) {
        state.snips.splice(index, 1);
        localStorage.setItem("snips", JSON.stringify(state.snips));
        toast.success("Snip Deleted");
      }
    }
  }
});

// Action creators
export const { addToSnips, updateToSnips, resetAllSnips, removeFromSnips } = snipSlice.actions;

export default snipSlice.reducer;
