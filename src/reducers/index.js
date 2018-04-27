import { combineReducers } from 'redux'

import {postsReducer} from './posts'
import {categoriesReducer} from "./categories";
import activeCategoryIdReducer from "./activeCategory"
export default combineReducers({
    activeCategoryId: activeCategoryIdReducer,
    posts: postsReducer,
    categories: categoriesReducer
})
