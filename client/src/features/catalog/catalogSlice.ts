import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProcuctsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
   async (_, thunkAPI) => {
    try {
        return await agent.Catalog.list();
    } catch(error : any) {
        return thunkAPI.rejectWithValue({error: error.date})
    }
   }
)

export const fetchProcuctAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
   async (productId, thunkAPI) => {
    try {
        return await agent.Catalog.details(productId);
    } catch(error : any) {
        return thunkAPI.rejectWithValue({error: error.data})
    }
   }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProcuctsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProcuctsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProcuctsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProcuctAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProcuctAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProcuctAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        })
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);