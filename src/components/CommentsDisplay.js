import React, {Component} from "react";
import Modal from "react-modal";


// PostDisplay (comments, onCommentDeleteClick)
//  |
// CommentsDisplay

export const CommentsDisplay = (props) => {
    console.log("props",props)
    return (

        <div>
            {props.comments.map((comment, index) => (
                <div key={index}
                >
                    {comment.body}
                    <button
						className={'ui button red'}
						onClick={()=>props.onCommentDeleteClick(comment.id)}
					>
						Delete Comment
					</button>
                </div>
            ))
            }
        </div>


    )

}


