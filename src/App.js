import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {createStore, combineReducers} from 'redux'


const initialState = {
    activePostId: "8xf0y6ziyjabvozdd253nd",
    activeCategoryId: "redux",
    categories: {
        byId: {
            "react": {
                id: "react",
                name: "react",
                path: "react"
            },
            "redux": {
                id: "redux",
                name: "redux",
                path: "redux"
            },
            "work": {
                id: "work",
                name: "work",
                path: "work"
            },

        },
        allIds: ["react", "redux", "work"]
    },

    posts: {
        byId: {
            "8xf0y6ziyjabvozdd253nd": {
                id: '8xf0y6ziyjabvozdd253nd',
                timestamp: 1467166872634,
                title: 'How hot is the sun?',
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
            },
            "8xf0y6ziyjabvozdd253ne": {
                id: '8xf0y6ziyjabvozdd253ne',
                timestamp: 1467166872634,
                title: 'How hot ?',
                body: 'Everyone ',
                author: 'thingtwo',
                category: 'redux',
                voteScore: 6,
                deleted: false,
                comments: ["894tuq4ut84ut8v4t8wun89e"],
                commentCount: 2,

            },
        },

        allIds: ["8xf0y6ziyjabvozdd253nd", "6ni6ok3ym7mf1p33lnez", "8xf0y6ziyjabvozdd253ne"]
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
            "894tuq4ut84ut8v4t8wun89e": {
                id: '894tuq4ut84ut8v4t8wun89e',
                parentId: "8xf0y6ziyjabvozdd253ne",
                timestamp: 1469479767190,
                body: 'Comments!.',
                author: 'thingone',
                voteScore: -5,
                deleted: false,
                parentDeleted: false
            }


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

function reducer(state, action) {
    return state
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
// const reducer = combineReducers({
//     activePostId: activePostIdReducer,
//     posts: postsReducer,
//     activeCategoryId: activeCategoryIdReducer,
//     categories: categoryReducer
// })
//
// function categoryReducer(state = {
//     byId: {
//         "react": {
//             id: "react",
//             name: "react",
//             path: "react"
//         },
//         "redux": {
//             id: "redux",
//             name: "redux",
//             path: "redux"
//         },
//         "work": {
//             id: "work",
//             name: "work",
//             path: "work"
//         },
//
//     },
//     allIds: ["react", "redux", "work"]
// }, action) {
//     return state
// }

// function activeCategoryIdReducer(state="react",action){
//     if (action.type =="OPEN_CATEGORY"){
//         return action.id
//     }
//     else{
//         return state
//     }
//
// }

// function postsReducer(state = {
//     byId: {
//         "8xf0y6ziyjabvozdd253nd": {
//             id: '8xf0y6ziyjabvozdd253nd',
//             timestamp: 1467166872634,
//             title: 'How hot is the sun?',
//             body: 'Everyone says so after all.',
//             author: 'thingtwo',
//             category: 'react',
//             voteScore: 6,
//             deleted: false,
//             comments: ["894tuq4ut84ut8v4t8wun89g", "8tu4bsun805n8un48ve89"],
//             commentCount: 2,
//
//         },
//         "6ni6ok3ym7mf1p33lnez": {
//             id: '6ni6ok3ym7mf1p33lnez',
//             timestamp: 1468479767190,
//             title: 'Learn Redux in 10 minutes!',
//             body: 'Just kidding. It takes more than 10 minutes to learn technology.',
//             author: 'thingone',
//             category: 'redux',
//             voteScore: -5,
//             deleted: false,
//             comments: [],
//             commentCount: 0,
//         }
//     },
//     allIds: ["8xf0y6ziyjabvozdd253nd", "6ni6ok3ym7mf1p33lnez"]
// }, action) {
//     return state
// }

// function activePostIdReducer(state = '8xf0y6ziyjabvozdd253nd', action) {
//     if (action.type === "OPEN_POST") {
//         return action.id
//
//     }
//     else {
//         return state
//     }
// }

const store = createStore(reducer, initialState)


class App extends Component {
    componentDidMount() {
        // subscribe listens to a call back function that emmits a listener whenever STORE STATE changes.
        // Thus re rendering the components
        store.subscribe(() => this.forceUpdate())
    }

    render() {

        const state = store.getState()
        const activeCategoryId = state.activeCategoryId
        const categories = []
        // console.log(Object.entries(state))
        // state.forEach((k,v)=>{
        //     console.log(k)
        // })
        for (let key in state.categories.byId) {
            // console.log(state.categories.byId[key])
            categories.push(state.categories.byId[key])
        }
        console.log(categories)
        const activeCategory = categories.find((t) => t.id === activeCategoryId)
        console.log("print")
        console.log(activeCategory)
        const posts = []
        for (let key in state.posts.byId){
            posts.push(state.posts.byId[key])
        }
        console.log("posts", posts)
        console.log("activecategoryposts")
        const activeCategoryPosts = posts.filter(p=>p.category === activeCategory.id)
        console.table(activeCategoryPosts)


        // for (let i in state.categories.entries()){
        //     console.log(i)
        //     // console.log(Object.keys(i))
        //     // console.log(state.categories.byId)
        //     // console.log(state.categories.byId.)
        // }


        // console.log(state)
        //
        //
        // const categoryList = []
        // for (let key in state.categories.byId){
        //     console.log(key)
        //     console.log(state.categories.byId[key])
        //
        //     categoryList.push(state.categories.byId[key])
        //
        // }
        // console.log("__")
        // console.log(categoryList)
        //
        // console.log(state.posts)
        // const posts = []
        // for (let key in state.posts.byId) {
        //     console.log(state.posts)
        //     posts.push(state.posts.byId[key])
        // }
        // const activePostId = state.activePostId
        // console.log(activePostId)
        // console.log(posts)
        //
        //
        // const activeCategoryPosts = posts.filter(p=>p.category===state.activeCategoryId)
        //
        // console.log("++")
        // console.log(activeCategoryPosts)
        // console.log("++")
        //
        // const postsList = activeCategoryPosts.map(post => (
        //     {
        //         id: post.id,
        //         title: post.title,
        //         active: post.id === activePostId
        //
        //     }
        // ))
        // console.log(postsList)
        // const activePost = activeCategoryPosts.find((p) => p.id === activePostId)
        //
        // console.log(activePost)

        const categoryTabs = categories.map(c => (
            {
                title: c.name,
                active: c.id === activeCategoryId

            }

        ))
        console.table(categoryTabs)


        return (
            <div>
                <CategoryTabs categoryTabs={categoryTabs}/>
                <Category category={activeCategoryPosts}/>

            </div>
        )

    }

}

class CategoryTabs extends Component {
    render() {
        //PROPS
        //categoryTabs = {
        // title: c.name,
        // active: c.id === activeCategoryId}

        const categoryTabs = this.props.categoryTabs.map((tab, index) => (
            <div
                key={index}
                className={tab.active ? 'active item' : 'item'}


            >
                {tab.title}

            </div>


        ))
        return (
            <div className='ui top attached tabular menu'>
                {categoryTabs}
            </div>
        )
    }
}

class Category extends Component {
    // // PROPS
    // category = [
    //     {id:,
    //      title:,
    //      body:
    //      author:,
    //     },
    //     {id:,
    //     title:,
    //     body:
    //     author:,
    //     },
    //
    //     ]
    render() {
        const posts = this.props.category.map((post,index)=>(
            <div key={index}>
                {post.title}
            </div>
        ))
        return(
            <div>
                {posts}
            </div>
        )


    }
}

// class CategoryList extends Component{
//     handleClick=(id)=>{
//         store.dispatch({
//             type:"OPEN_CATEGORY",
//             id: id
//
//         })
//     }
//     render(){
//         const category = this.props.categoryList.map((c,index)=>(
//             <div key={index}
//                  onClick={()=>this.handleClick(c.id)}
//             >
//                 {c.name}
//             </div>
//         ))
//         return(
//             <div>
//                 {category}
//
//             </div>
//         )
//     }
// }
//
// class PostsList extends Component {
//     handleClick = (id) => {
//         store.dispatch({
//             type: 'OPEN_POST',
//             id: id
//         })
//     }
//
//
//     render() {
//         const postsList = this.props.postsList.map((post, index) => (
//             <div
//                 key={index}
//                 onClick={() => this.handleClick(post.id)}
//             >
//                 {post.title}
//             </div>
//         ))
//         return (
//             <div>
//                 {postsList}
//
//             </div>
//         )
//     }
// }
//
// class Post extends Component {
//
//
//     render() {
//
//         // const commentsArr = this.props.post.comments
//         // console.log("COMMMENTS")
//         // console.log(commentsArr)
//         // const commentsId = commentsArr.map(cId => (
//         //     <div>{cId}</div>
//         //
//         // ))
//
//
//         return (
//             <div>
//                 <div>
//                     {this.props.post.title}
//                 </div>
//                 <div>
//                     {/*{commentsId}*/}
//
//                 </div>
//
//             </div>
//         )
//     }
// }
//
// class CommentsView extends Component {
//     // App (comments)
//     handleClickDelete(id) {
//         store.dispatch({
//             type: 'DELETE_COMMENT',
//             id: id
//         })
//     }
//
//     render() {
//         console.log(typeof this.props.comments)
//         const comments = this.props.comments.map((comment, index) => (
//             <div
//                 key={index}
//
//
//             >
//                 {/*<button*/}
//                 {/*onClick={()=>this.handleClickDelete(comment.id)}*/}
//                 {/*></button>*/}
//                 _BODY_
//                 {comment.body}
//                 <span>
//         _AUTHOR_
//                     {comment.author}
//         </span>
//
//             </div>
//         ))
//         return (
//             <div>
//                 {comments}
//             </div>
//         )
//
//     }
// }

export default App;
