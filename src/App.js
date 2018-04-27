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
    categories: categoriesReducer
})

const store = createStore(reducer)



const App = () =>(
    <div>
        <CategoryTabs />
        <CategoryDisplay/>

    </div>
)
class CategoryTabs extends Component {
    componentDidMount() {
        store.subscribe(() => this.forceUpdate())
    }

    render() {
        const state = store.getState()
        const categories = []
        for (let key in state.categories.byId) {
            // console.log(state.categories.byId[key])
            categories.push(state.categories.byId[key])
        }
        const activeCategoryId = state.activeCategoryId
        const categoryTabs = categories.map(c => (
            {
                title: c.name,
                active: c.id === activeCategoryId,
                id: c.id

            }

        ))
        console.log("CT", categoryTabs)
        return (
            <div>

                <Tabs
                    tabs={categoryTabs}
                    onClick={(id) => (store.dispatch({
                        type: 'OPEN_CATEGORY',
                        id: id
                    }))}

                />

            </div>
        )
    }
}

const Tabs = (props) => (
    <div
        className={'ui top attached tabular menu'}
    >
        {
            props.tabs.map((tab, index) => (
                <div
                    key={index}
                    className={tab.active ? 'active item' : 'item'}
                    onClick={() => props.onClick(tab.id)}
                >
                    {tab.title}
                </div>
            ))
        }

    </div>

)


class CategoryDisplay extends Component {

    componentDidMount(){
        store.subscribe(()=>this.forceUpdate())
    }


    render() {
        const state = store.getState()

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
        const activeCategory = categories.find((t) => t.id === activeCategoryId)
        const activeCategoryPosts = posts.filter(p => ((p.category === activeCategory.id) && (p.deleted === false) ))
        console.log("acp: CatDisplay", activeCategoryPosts)

        const categoryTabs = categories.map(c => (
            {
                title: c.name,
                active: c.id === activeCategoryId,
                id: c.id

            }

        ))
        const activeCategor = categoryTabs.filter(c => c.active === true)
        // console.log("AC1", activeCategory[0].id)
        // console.log("AC2", activeCategory)




        return (
            <Category
                onNewPostSubmit={(text)=>(
                    store.dispatch({
                        type: 'ADD_POST',
                        id: uuidv4(),
                        title: text,
                        category: activeCategor[0].id
                    })
                )}
                posts = {activeCategoryPosts}
                onPostClick={(id)=>(
                    store.dispatch({
                        type: 'DELETE_POST',
                        id:id
                    })
                )}

            />

        )

    }
}


const Category = (props) => (
    <div>
        <PostList
            posts = {props.posts}
            onClick={props.onPostClick}

        />
        <TextFieldSubmit
            onSubmit={props.onNewPostSubmit}
        />
    </div>
)

class TextFieldSubmit extends Component{
    componentDidMount(){
        Modal.setAppElement('body');
    }
    state = {
        value:'',
        showModal: false
    }
    handleOpenModal = ()=>{
        this.setState({showModal:true})
    }
    handleCloseModal = ()=>{
        this.setState({showModal:false})
    }
    onChange=(e)=>{
        this.setState({
            value: e.target.value
        })
    }
    handleSubmit = ()=>{
        this.props.onSubmit(this.state.value)
        this.setState({value: '',
                       showModal:false
        })
    }
    render(){
        return(
            <div>
                <button
                    className={'ui primary button'}
                    onClick={this.handleOpenModal}
                >Add New Post</button>
                <Modal
                    isOpen = {this.state.showModal}
                    onRequestClose={this.handleCloseModal}
                >
                    <div
                        className={'ui input'}

                    >
                        <input
                            onChange={this.onChange}
                            type={'text'}
                            value={this.state.value}
                        />
                        <button
                            onClick={this.handleSubmit}
                            className={'ui primary button'}
                            type = 'submit'
                        >Submit Post</button>

                    </div>
                </Modal>

            </div>






        )
    }
}

const PostList = (props)=>(
    <div>{
        props.posts.map((post, index) => (
            <div key={index}
                 onClick={() => props.onClick(post.id)}
            >
                {post.title}
            </div>
        ))
    }



    </div>
)



// class PostInput extends Component {
//     // componentWillMount() {
//     //     Modal.setAppElement('body');
//     // }
//     componentDidMount() {
//         console.log("PIII", this.props.activeCategory)
//         // Modal.setAppElement('body');
//
//     }
//
//     state = {
//         value: '',
//         showModal: false
//
//     }
//
//     handleOpenModal = () => {
//         this.setState({showModal: true})
//     }
//
//     handleCloseModal = () => {
//         this.setState({showModal: false})
//     }
//
//     onChange = (e) => {
//         this.setState({value: e.target.value})
//     }
//     onNewPostSubmit = () => {
//         store.dispatch({
//             id: uuidv4(),
//             type: 'ADD_POST',
//             title: this.state.value,
//             category: this.props.activeCategory
//         })
//         console.log("in post input", this.props.activeCategory.title)
//         this.setState({
//             value: '',
//             showModal: false
//         })
//
//     }
//
//     render() {
//
//
//         return (
//             <div>
//                 <button onClick={this.handleOpenModal}
//                         className={'ui primary button'}
//
//                 > Add New Post
//                 </button>
//                 <Modal
//                     isOpen={this.state.showModal}
//
//                     contentLabel={"Minimal Modal Example"}
//                     onRequestClose={this.handleCloseModal}
//
//                 >
//                     <div className={'ui input'}>
//                         <input onChange={this.onChange}
//                                value={this.state.value}
//                                type={'text'}
//                         />
//                         <button onClick={this.onNewPostSubmit}
//                                 type={'submit'}
//                                 className={'ui primary button'}
//                         >
//                             Add new post
//                         </button>
//                     </div>
//                 </Modal>
//
//
//             </div>
//
//         )
//
//
//     }
// }





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
