import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    console.log(productData, "productData ma k aaako xa");
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("countInStock", productData.countInStock);
      formData.append("description", productData.description);
      formData.append("image", productData.image);
      formData.append("user", productData.user);

      const response = await axios.post(
        "http://localhost:5001/product/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchProductList = createAsyncThunk(
  "products/fetchProductList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5001/product/fetchproducts"
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("countInStock", productData.countInStock);
      formData.append("description", productData.description);
      formData.append("image", productData.image);

      const response = await axios.put(
        `http://localhost:5001/product/updateProduct/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/product/deleteProduct/${productId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchIndividualProduct = createAsyncThunk(
  "products/fetchIndividualProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/product/${productId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createProductReview = createAsyncThunk(
  "products/createProductReview",
  async ({ product_id, reviewData, userInfo }, { rejectWithValue }) => {
    try {
      console.log(
        product_id,
        reviewData,
        userInfo,
        "productSlice bata  aako review k xa"
      );
      const response = await axios.post(
        `http://localhost:5001/product/review/${product_id}`,
        { ...reviewData, userInfo }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const recommendProducts = createAsyncThunk(
  "products/recommendProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5001/recommend"
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    updateSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(fetchProductList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(fetchIndividualProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchIndividualProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.success = true;
      })
      .addCase(fetchIndividualProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(createProductReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(recommendProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recommendProducts.fulfilled, (state, action) => {
        console.log(action.payload, "ma database bata recommended vyera aaako");
        state.loading = false;
        state.products = action.payload.products;
        state.error = null;
      })
      .addCase(recommendProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateSuccess } = productSlice.actions;
export default productSlice.reducer;
