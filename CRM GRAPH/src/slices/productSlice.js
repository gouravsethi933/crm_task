import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export const selectProducts = (state) => state.products.data;
export default productSlice.reducer;
