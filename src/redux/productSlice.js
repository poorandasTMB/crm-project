// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  // Fetch products from your API here
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  return data;
});

// Initial state
const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

// Create a slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Add product
    addProduct: (state, action) => {
      state.products.products.push(action.payload);
    },
    // Update product
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.products.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.products.products[index] = updatedProduct;
      }
    },
    // Delete product
    deleteProduct: (state, action) => {
      const idToDelete = action.payload;
      state.products.products = state.products.products.filter((product) => product.id !== idToDelete);
    },
    
  },
  extraReducers: (builder) => {
    // Fetch products - pending
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    });
    // Fetch products - fulfilled
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.products = action.payload;
    });
    // Fetch products - rejected
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

// Export actions
export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;

// Export the reducer
export default productSlice.reducer;
