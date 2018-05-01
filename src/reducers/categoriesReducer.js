import { combineReducers } from "redux"

function categoriesById(state = {
	"react": {
		"id": "react",
		"name": "react",
		"path": "react",
	},
	"redux": {
		"id": "redux",
		"name": "redux",
		"path": "redux",
	},
	"work": {
		"id": "work",
		"name": "work",
		"path": "work",
	},
}, action) {
	return state
}
function allCategories(state = [
	"react",
	"redux",
	"work",
], action) {
	return state
}

export const categoriesReducer = combineReducers({
	"byId": categoriesById,
	"allIds": allCategories,
})
