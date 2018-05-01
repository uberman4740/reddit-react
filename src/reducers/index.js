import { combineReducers } from "redux"

import { postsReducer } from "./postsReducer"
import { categoriesReducer } from "./categoriesReducer"
import { activePostIdReducer } from "./activePostIdReducer"
import activeCategoryIdReducer from "./activeCategoryReducer"
import { commentsReducer } from "./commentsReducer"
export default combineReducers({
	activeCategoryId: activeCategoryIdReducer,
	activePostId: activePostIdReducer,
	posts: postsReducer,
	categories: categoriesReducer,
	comments: commentsReducer,
})
