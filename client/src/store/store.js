// const { configureStore } = require("@reduxjs/toolkit");
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import adminProductSlice from "./admin-slice/product-slice"
import shopProductsSlice from "./shop-slice/product-slice"
import shoppingCartSlice from "./shop-slice/cart-slice";
import shoppingAddressSlice from "./shop-slice/address-slice"
import shoppingOrderSlice from "./shop-slice/orders-slice"
import searchProductSlice from "./shop-slice/search-slice"
import productReviewSlice from "./shop-slice/review-slice"
import imageUploaderSlice from "./common-slice";
const store =configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:adminProductSlice,
        shopProductsSlice:shopProductsSlice,
        shopCartslice:shoppingCartSlice,
        shoppingAddressSlice:shoppingAddressSlice,
        shoppingOrderSlice:shoppingOrderSlice,
        searchProductSlice:searchProductSlice,
        productReviewSlice:productReviewSlice,
        imageUploaderSlice:imageUploaderSlice

    }
})
export default store;       