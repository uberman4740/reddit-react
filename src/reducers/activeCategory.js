// import {combineReducers} from 'redux'

function activeCategoryIdReducer(state = "redux", action) {
    switch (action.type){
        case 'OPEN_CATEGORY':
            return action.id
        default:
            return state
    }
}

export default activeCategoryIdReducer


// export const activeCategoryIdReducerr = combineReducers({
//     activeCategory.js: activeCategoryIdReducer
// });
