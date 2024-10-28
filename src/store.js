import { configureStore } from '@reduxjs/toolkit'
import snipReducer from './redux/SnipSlice'
export default configureStore({
  reducer:{
    snip: snipReducer
  }
})