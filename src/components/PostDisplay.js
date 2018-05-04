import React, { Component } from "react"
import { connect } from "react-redux"
import { CommentsDisplay, TextFieldComment } from "./CommentsDisplay"
import { addComment,deleteComment } from "../actions/commentActions"
import {AddComment} from "./AddComment";
const uuidv4 = require("uuid/v4")

// PostList  (posts)
//  |
// PostDisplay
//  |
// CommentDisplay (comments,onCommentDeleteClick)     AddComment | (onSubmit)


const Post = props => (

	<div className="ui segments">
		<div className="ui segment">
			Body
		</div>
		<div className="ui secondary segment">
			{props.post.body}
		</div>
		<div className="ui segment">
			Author
		</div>
		<div className="ui secondary segment">
			{props.post.author}
		</div>
		<div className="ui segment">
			Vote Score
		</div>
		<div className="ui secondary segment">
			{props.post.voteScore}
		</div>
		<div className="ui segment">
			Comment Count
		</div>
		<div className="ui secondary segment">
			{props.post.commentCount}
		</div>
		<CommentsDisplay
			comments={props.comments}
			onCommentDeleteClick={props.onCommentDeleteClick}
		/>
		 <AddComment onSubmit={props.onCommentAddClick}/>
	</div>

)
const mapDispatchToPostProps = dispatch => (
	{
		dispatch,
		// onCommentAddClick: (body)=>dispatch(addComment({body:body}))

	}
)
const mapStateToPostProps = (state,ownProps) => {
	console.log("PROPSPOSTS", ownProps)
	console.log("COMMENTS BY ID",state.comments.byId)
	const post = state.posts.byId[state.activePostId]
	const commentsIdList = post.comments
	const comments = []
	for (let key in state.comments.byId) {
		if (commentsIdList !== undefined){
			commentsIdList.map((c) => {
				if (key === c) {
					comments.push(state.comments.byId[key])
				}
			})
		}

	}
	console.log("comments", comments)
	console.log("activepostId", state.activePostId)


	return {
		activePostId: state.activePostId,
		post: post,
		comments: comments,

	}
}
const mergePostProps = (stateProps, dispatchProps)=>(
	{
		...stateProps,
		...dispatchProps,
		"onCommentAddClick": body=>dispatchProps.dispatch(addComment(

				uuidv4(),
				body,
				stateProps.activePostId
			)),
		"onCommentDeleteClick":id=>dispatchProps.dispatch(deleteComment(

			id,
			stateProps.activePostId
		))
	}
)
export const PostDisplay = connect(
	mapStateToPostProps,
	mapDispatchToPostProps,
	mergePostProps
)(Post)
