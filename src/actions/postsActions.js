
export function addPost(id, title, category) {
	return {
		"type": "ADD_POST",
		id,
		title,
		category,

	}
}
export function deletePost(id) {
	return {
		"type": "DELETE_POST",
		id,
	}
}

export function openPost(id) {
	return {
		"type": "OPEN_POST",
		id
	}
}

