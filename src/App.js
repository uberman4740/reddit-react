import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {createStore} from 'redux'


const initialState = {
    activePostId: "8xf0y6ziyjabvozdd253nd",

    posts: {
        byId: {
            "8xf0y6ziyjabvozdd253nd": {
                id: '8xf0y6ziyjabvozdd253nd',
                timestamp: 1467166872634,
                title: 'Udacity is the best place to learn React',
                body: 'Everyone says so after all.',
                author: 'thingtwo',
                category: 'react',
                voteScore: 6,
                deleted: false,
                comments: ["894tuq4ut84ut8v4t8wun89g", "8tu4bsun805n8un48ve89"],
                commentCount: 2,

            },
            "6ni6ok3ym7mf1p33lnez": {
                id: '6ni6ok3ym7mf1p33lnez',
                timestamp: 1468479767190,
                title: 'Learn Redux in 10 minutes!',
                body: 'Just kidding. It takes more than 10 minutes to learn technology.',
                author: 'thingone',
                category: 'redux',
                voteScore: -5,
                deleted: false,
                comments: [],
                commentCount: 0,
            }
        },
        allIds: ["8xf0y6ziyjabvozdd253nd", "6ni6ok3ym7mf1p33lnez"]
    },
    comments: {
        byId: {
            "894tuq4ut84ut8v4t8wun89g": {
                id: '894tuq4ut84ut8v4t8wun89g',
                parentId: "8xf0y6ziyjabvozdd253nd",
                timestamp: 1468166872634,
                body: 'Hi there! I am a COMMENT.',
                author: 'thingtwo',
                voteScore: 6,
                deleted: false,
                parentDeleted: false
            },
            "8tu4bsun805n8un48ve89": {
                id: '8tu4bsun805n8un48ve89',
                parentId: "8xf0y6ziyjabvozdd253nd",
                timestamp: 1469479767190,
                body: 'Comments. Are. Cool.',
                author: 'thingone',
                voteScore: -5,
                deleted: false,
                parentDeleted: false
            },

        },
        allIds: ["894tuq4ut84ut8v4t8wun89g", "8tu4bsun805n8un48ve89"]
    },
    authors: {
        byId: {
            "thingtwo": {
                username: "thingtwo",

            },
            "thingone": {
                username: "thingone",

            },


        },
        allIds: ["thingtwo", "thingone"]
    }
}

// function reducer(state, action) {
//     switch(action.type){
//         case 'OPEN_POST': {
//             return{
//                 ...state,
//                 activePostId:action.id
//             }
//         }
//     }
//
//     return state
// }
function reducer(state,action){
    return {
        activePostId: activePostIdReducer(state.activePostId,action),
        posts: postsReducer(state.posts,action)

    }
}
function postsReducer(state,action) {
    return state
}
function activePostIdReducer(state,action) {
    if (action.type === "OPEN_POST"){
        return action.id

    }
    else{
        return state
    }
}

const store = createStore(reducer, initialState)


class App extends Component {
    componentDidMount() {
        // subscribe listens to a call back function that emmits a listener whenever STORE STATE changes.
        // Thus re rendering the components
        store.subscribe(() => this.forceUpdate())
    }

    render() {
        const state = store.getState()
        // const comments = []
        // for (let key in state.comments.byId) {
        //     // console.log(state.comments.byId[key])
        //     comments.push(state.comments.byId[key]);
        //
        // }
        // console.log(comments)
        console.log(state.posts)
        const posts = []
        for (let key in state.posts.byId) {
            console.log(state.posts)
            posts.push(state.posts.byId[key])
        }
        const activePostId = state.activePostId
        console.log(activePostId)
        console.log(posts)
        const activePost = posts.find((p) => p.id === activePostId)
        // const comments = commentsArr.map(c=>(
        //     {
        //         id:c.id,
        //         parentId: c.parentId,
        //         timestamp:c.timestamp ,
        //         body:c.body ,
        //         author:c.author ,
        //         voteScore:c.voteScore ,
        //         deleted: c.deleted,
        //         parentDeleted:c.parentDeleted
        //     }
        // ))
        console.log(activePost)
        const postsList = posts.map(post => (
            {
                id: post.id,
                title: post.title,
                active: post.id === activePostId

            }
        ))
        console.log(postsList)


        return (
            <div>
                <PostsList postsList={postsList}/>
                <Post post={activePost}/>

            </div>
        )

    }

}
class PostsList extends Component{
    handleClick=(id)=>{
        store.dispatch({
            type:'OPEN_POST',
            id: id
        })
    }


    render(){
        const postsList = this.props.postsList.map((post,index)=>(
            <div
                key={index}
                onClick={()=>this.handleClick(post.id)}
            >
                {post.title}
            </div>
        ))
        return(
            <div>
                {postsList}

            </div>
        )
    }
}

class Post extends Component {


    render() {

        const commentsArr = this.props.post.comments
        console.log(commentsArr)
        const commentsId = commentsArr.map(cId => (
            <div>{cId}</div>

        ))


        return (
            <div>
                <div>
                    {this.props.post.title}
                </div>
                <div>
                    {commentsId}

                </div>

            </div>
        )
    }
}

class CommentsView extends Component {
    // App (comments)
    handleClickDelete(id) {
        store.dispatch({
            type: 'DELETE_COMMENT',
            id: id
        })
    }

    render() {
        console.log(typeof this.props.comments)
        const comments = this.props.comments.map((comment, index) => (
            <div
                key={index}


            >
                {/*<button*/}
                {/*onClick={()=>this.handleClickDelete(comment.id)}*/}
                {/*></button>*/}
                _BODY_
                {comment.body}
                <span>
        _AUTHOR_
                    {comment.author}
        </span>

            </div>
        ))
        return (
            <div>
                {comments}
            </div>
        )

    }
}

export default App;
