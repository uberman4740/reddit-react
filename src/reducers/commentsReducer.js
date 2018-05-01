import { combineReducers } from "redux"


const initState = {
	"894tuq4ut84ut8v4t8wun89g": {
		id: "894tuq4ut84ut8v4t8wun89g",
		parentId: "8xf0y6ziyjabvozdd253nd",
		timestamp: 1468166872634,
		body: "Hi there! I am a COMMENT.",
		author: "thingtwo",
		voteScore: 6,
		deleted: false,
		parentDeleted: false,
	},
	"8tu4bsun805n8un48ve89": {
		id: "8tu4bsun805n8un48ve89",
		parentId: "8xf0y6ziyjabvozdd253nd",
		timestamp: 1469479767190,
		body: "Comments. Are. Cool.",
		author: "thingone",
		voteScore: -5,
		deleted: false,
		parentDeleted: false,
	},
	"894tuq4ut84ut8v4t8wun89e": {
		id: "894tuq4ut84ut8v4t8wun89e",
		parentId: "8xf0y6ziyjabvozdd253ne",
		timestamp: 1469479767190,
		body: "Comments!.",
		author: "thingone",
		voteScore: -5,
		deleted: false,
		parentDeleted: false,
	},


}

function commentsById(state = initState, action) {
	switch (action.type) {
		case "ADD_COMMENT":
			console.log("ACTION byId", action)

			const comment = {
				id: action.id,
				parentId: action.parentId,
				body: action.body,
				timestamp: Date.now(),
				author: "PLACEHOLDER AUHTOR",
				voteScore: 0,
				deleted: false,
				parentDeleted: false,
			}
			return {
				...state,
				[comment.id]: comment,
			}
		case 'DELETE_COMMENT':
			return{
				...state,
				[action.id]:{
					...state[action.id],
					deleted: true
				}
			}
		case 'DELETE_POST':
			const a = Object.assign({},state)
			console.log(a)
			for (let key in a){
				if (action.id === a[key].parentId){
					a[key].parentDeleted = true
				}
			}
			// const b = state.map(i=> (console.log(i)))
			console.log(action.id)
			console.log("parent",a)


			console.log("dP", action)

			return{
				...state,
				a


			}
		default:
			return state
	}
}

function allComments(state = [
	"894tuq4ut84ut8v4t8wun89g",
	"8tu4bsun805n8un48ve89",
	"894tuq4ut84ut8v4t8wun89e",
], action) {
	switch (action.type) {
		case "ADD_COMMENT":
			console.log("ACTION allComments", action)

			return state.concat(action.id)
		default:
			return state
	}

}


export const commentsReducer = combineReducers({
	"byId": commentsById,
	"allIds": allComments,
})
