import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {createStore, combineReducers} from 'redux'
import Modal from 'react-modal'
import {postsReducer} from './reducers/posts'
import {categoriesReducer} from "./reducers/categories";
import activeCategoryIdReducer from "./reducers/activeCategory"

const uuidv4 = require('uuid/v4');

const reducer = combineReducers({
    activeCategoryId: activeCategoryIdReducer,
    posts: postsReducer,
    categories:categoriesReducer
})

const store = createStore(reducer)


class App extends Component {
    componentDidMount() {
        // subscribe listens to a call back function that emmits a listener whenever STORE STATE changes.
        // Thus re rendering the components
        store.subscribe(() => this.forceUpdate())
    }

    render() {

        const state = store.getState()

        const activeCategoryId = state.activeCategoryId
        console.log("activeCategoryId",activeCategoryId)
        const categories = []
        // console.log(Object.entries(state))
        // state.forEach((k,v)=>{
        //     console.log(k)
        // })
        console.log("STTTATTEE", state)
        console.log("activecategoryId", state.activeCategoryId)
        console.log("ACCCC", state.categories.byId)
        for (let key in state.categories.byId) {
            // console.log(state.categories.byId[key])
            categories.push(state.categories.byId[key])
        }
        console.log(categories)
        const activeCategory = categories.find((t) => t.id === activeCategoryId)
        console.log("print")
        console.log(activeCategory)
        const posts = []
        for (let key in state.posts.byId) {
            posts.push(state.posts.byId[key])
        }
        console.log("posts", posts)
        console.log("activecategoryposts")
        const activeCategoryPosts = posts.filter(p => ((p.category === activeCategory.id) && (p.deleted === false) ))
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
        // const activeCategoryPosts = posts.filter(p=>p.category===state.activeCategory.js)
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
                active: c.id === activeCategoryId,
                id: c.id

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
    handleClick = (id) => {
        store.dispatch({
            type: 'OPEN_CATEGORY',
            id: id
        })

    }

    render() {
        //PROPS
        //categoryTabs = {
        // title: c.name,
        // active: c.id === activeCategory.js}

        const activeCategory = this.props.categoryTabs.filter(c => c.active === true)
        console.log("Acctiveee", activeCategory[0].id)

        const categoryTabs = this.props.categoryTabs.map((tab, index) => (
            <div
                key={index}
                className={tab.active ? 'active item' : 'item'}
                onClick={() => this.handleClick(tab.id)}


            >
                {tab.title}

            </div>


        ))
        return (
            <div>
                <div className='ui top attached tabular menu'>
                    {categoryTabs}
                </div>
                <div>
                    <PostInput activeCategory={activeCategory[0].id}/>
                </div>
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
    handleClick = (id) => {
        store.dispatch({
            type: 'DELETE_POST',
            id: id
        })
    }

    render() {
        const posts = this.props.category.map((post, index) => (
            <div key={index}
                 onClick={() => this.handleClick(post.id)}
            >
                {post.title}
            </div>
        ))
        return (
            <div>
                <div>
                    {posts}
                </div>

            </div>
        )


    }
}

class PostInput extends Component {
    // componentWillMount() {
    //     Modal.setAppElement('body');
    // }
    componentDidMount() {
        console.log("PIII", this.props.activeCategory)
        // Modal.setAppElement('body');

    }

    state = {
        value: '',
        showModal: false

    }

    handleOpenModal = () => {
        this.setState({showModal: true})
    }

    handleCloseModal = () => {
        this.setState({showModal: false})
    }

    onChange = (e) => {
        this.setState({value: e.target.value})
    }
    handleSubmit = () => {
        store.dispatch({
            id: uuidv4(),
            type: 'ADD_POST',
            title: this.state.value,
            category: this.props.activeCategory
        })
        console.log("in postinput", this.props.activeCategory.title)
        this.setState({
            value: '',
            showModal: false
        })

    }

    render() {


        return (
            <div>
                <button onClick={this.handleOpenModal}
                        className={'ui primary button'}

                > Add New Post
                </button>
                <Modal
                    isOpen={this.state.showModal}

                    contentLabel={"Minimal Modal Example"}
                    onRequestClose={this.handleCloseModal}

                >
                    <div className={'ui input'}>
                        <input onChange={this.onChange}
                               value={this.state.value}
                               type={'text'}
                        />
                        <button onClick={this.handleSubmit}
                                type={'submit'}
                                className={'ui primary button'}
                        >
                            Add new post
                        </button>
                    </div>
                </Modal>


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
