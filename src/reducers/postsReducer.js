import { combineReducers } from "redux"


const initState = {
	"8xf0y6ziyjabvozdd253nd": {
		"id": "8xf0y6ziyjabvozdd253nd",
		"timestamp": 1467166872634,
		"title": "How hot is the sun?",
		"body": "Everyone says so after all.",
		"author": "thingtwo",
		"category": "react",
		"voteScore": 6,
		"deleted": false,
		"comments": [
			"894tuq4ut84ut8v4t8wun89g",
			"8tu4bsun805n8un48ve89",
		],
		"commentCount": 2,

	},

	"6ni6ok3ym7mf1p33lnez": {
		"id": "6ni6ok3ym7mf1p33lnez",
		"timestamp": 1468479767190,
		"title": "Learn Redux in 10 minutes!",
		"body": "Just kidding. It takes more than 10 minutes to learn technology.",
		"author": "thingone",
		"category": "redux",
		"voteScore": -5,
		"deleted": false,
		"comments": [],
		"commentCount": 0,
	},
	"8xf0y6ziyjabvozdd253ne": {
		"id": "8xf0y6ziyjabvozdd253ne",
		"timestamp": 1467166872634,
		"title": "How hot ?",
		"body": "Everyone ",
		"author": "thingtwo",
		"category": "redux",
		"voteScore": 6,
		"deleted": false,
		"comments": ["894tuq4ut84ut8v4t8wun89e"],
		"commentCount": 1,

	},
}


function addPostEntry(
	state
	, action,
) {
	const post = {
		"id": action.id,
		"title": action.title,
		"category": action.category,
		"timestamp": Date.now(),
		"body": "PLACEHOLDER BODY",
		"author": "PLACEHOLDER AUTHOR",
		"voteScore": 0,
		"deleted": false,
		"comments": [],
		"commentCount": 0,
	}
	return {
		...state,
		[action.id]: post,
	}
}


function addPostId(state, action) {
	return state.concat(action.id)
}

function allPosts(state = [
	"8xf0y6ziyjabvozdd253nd",
	"6ni6ok3ym7mf1p33lnez",
	"8xf0y6ziyjabvozdd253ne",
], action) {
	switch (action.type) {
		case "ADD_POST":
			return addPostId(state, action)

		default:
			return state
	}
}

function deletePost(state = initState, action) {
	if (action.type === "DELETE_POST") {
		return {
			...state,
			[action.id]: {
				...state[action.id],
				deleted: true
			}

		}
	}
	return state
}

function postsById(state = initState, action) {
	switch (action.type) {
		case "ADD_POST":
			return addPostEntry(state, action)
		case "DELETE_POST":
			return deletePost(state, action)
		case "ADD_COMMENT":
			return {
				...state,
				[action.parentId]: {
					...state[action.parentId],
					comments:state[action.parentId].comments.concat(action.id),
					commentCount: state[action.parentId].commentCount + 1

				}



			}
		case 'DELETE_COMMENT':
			const a = state[action.parentId].comments.filter(c => c !== action.id)
			console.log("DELETE CCOM",a)
			return {
				...state,
				[action.parentId]: {
					...state[action.parentId],
					comments: a,
					commentCount: state[action.parentId].commentCount - 1

				}
			}
		default:
			return state
	}
}

export const postsReducer = combineReducers({
	"byId": postsById,
	"allIds": allPosts,
})

