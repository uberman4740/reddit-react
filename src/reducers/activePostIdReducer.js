export function activePostIdReducer(state = "8xf0y6ziyjabvozdd253nd", action) {
	switch (action.type) {
	case "OPEN_POST":
		return action.id
	default:
		return state
	}
}
