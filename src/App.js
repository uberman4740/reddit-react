import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {createStore} from 'redux'


const initialState = {
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
function reducer(state=initialState,action){
    // switch(action.type){
    //     case 'DELETE_COMMENT': {
    //         state =
    //     }
    // }

    return state
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
        const comments = []
        for (let key in state.comments.byId){
            console.log(state.comments.byId[key])
            comments.push( state.comments.byId[key] );

        }
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
        console.log(comments)



        return(
            <div>
                <CommentsView comments = {comments}/>
            </div>
        )

    }

}

class CommentsView extends Component{
    // App (comments)
    handleClickDelete(id){
        store.dispatch({
            type: 'DELETE_COMMENT',
            id: id
        })
    }
    render(){
        console.log(typeof this.props.comments)
        const comments = this.props.comments.map((comment, index)=>(
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
        return(
            <div>
                {comments}
            </div>
        )

    }
}

export default App;
