export function addPost(id,title,category){
    return{
        type: 'ADD_POST',
        id:id,
        title: title,
        category:category

    }
}
export function deletePost(id) {
    return{
        type:'DELETE_POST',
        id:id
    }

}
