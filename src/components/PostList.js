import React, {Component} from "react";
import {PostDisplay} from "./PostDisplay";


// CategoryDisplay (posts,onPostDeleteClick,onPostOpenClick)
//  |
// PostsList
//  |
// PostDisplay | posts

export const PostList = (props) => (

    <div>{
        props.posts.map((post, index) => (

            <div key={index}

            >

                {post.title}
                <button className={'ui button green'}
                        onClick={()=>props.onPostOpenClick(post.id)}
                >
                    Open
                </button>
                <button
                    className={'ui red button'}
                    onClick={()=>props.onPostDeleteClick(post.id)}
                >
                    Delete Post
                </button>
            </div>
        ))
    }
        <div>
            <PostDisplay posts = {props.posts}/>
        </div>


    </div>
)


