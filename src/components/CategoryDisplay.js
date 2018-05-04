import React, {Component} from "react"

import {addPost, deletePost, openPost} from "../actions/postsActions"
import {PostList, TextFieldSubmit} from "./PostList"
import {connect} from "react-redux"
import {AddPost} from './AddPost'
const uuidv4 = require("uuid/v4")

//CategoryDisplay


const Category = props => (
    <div>
        <PostList
            posts={props.posts}
            onPostDeleteClick={props.onPostDeleteClick}
            onPostOpenClick={props.onPostOpenClick}
        />
        <AddPost
            onSubmit={props.onNewPostSubmit}
        />
    </div>
)

const mapDispatchToCategoryProps = dispatch => (
    {
        dispatch,
        onPostOpenClick: id => dispatch(openPost(id)),
        onPostDeleteClick: id => dispatch(deletePost(id)),
    }
)
const mapStateToCategoryProps = (state) => {
    const categories = []
    for (let key in state.categories.byId) {
        // console.log(state.categories.byId[key])
        categories.push(state.categories.byId[key])
    }
    const posts = []
    for (let key in state.posts.byId) {
        posts.push(state.posts.byId[key])
    }

    const activeCategoryId = state.activeCategoryId
    const activeCategory = categories.find(t => t.id === activeCategoryId)
    const activeCategoryPosts = posts.filter(p => ((p.category === activeCategory.id) && (p.deleted === false)))
    console.log("acp: CatDisplay", activeCategoryPosts)

    const categoryTabs = categories.map(c => (
        {
            title: c.name,
            active: c.id === activeCategoryId,
            id: c.id,

        }

    ))
    const activeCategor = categoryTabs.filter(c => c.active === true)
    console.log(activeCategor[0].id)
    return {
        posts: activeCategoryPosts,
        activeCategoryId: activeCategor[0].id,

    }
}

const mergeCategoryProps = (stateProps, dispatchProps) => (
    {
        ...stateProps,
        ...dispatchProps,
        "onNewPostSubmit": title =>
            dispatchProps.dispatch(addPost(uuidv4(), title, stateProps.activeCategoryId)),

    }
)
export const CategoryDisplay = connect(
    mapStateToCategoryProps,
    mapDispatchToCategoryProps,
    mergeCategoryProps,
)(Category)
