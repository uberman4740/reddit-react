const uuidv4 = require("uuid/v4")

export function deleteComment(id,parentId) {
	return {
		"type": "DELETE_COMMENT",
		id,
		parentId
	}
}

export function addComment(id,body,parentId) {
	return {
		"type": "ADD_COMMENT",
		id,
		body,
		parentId,

	}
}

