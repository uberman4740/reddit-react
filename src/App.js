import React, {Component} from 'react';
import './App.css';
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {addPost, deletePost} from "./actions/postsActions";
import {openCategory} from "./actions/categoryActions";

const uuidv4 = require('uuid/v4');

const App = () => (
    <div>
        <CategoryTabs/>
        <CategoryDisplay/>

    </div>
)


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

const mapDispatchToTabsProps = (dispatch) => (
    {
        onClick: (id) => (
            dispatch(openCategory(id))
        )
    }
)

const mapStateToTabsProps = (state) => {
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
    return {
        tabs: categoryTabs
    }

}
const CategoryTabs = connect(
    mapStateToTabsProps,
    mapDispatchToTabsProps
)(Tabs)


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
    console.log(activeCategor[0].id)
    return {
        posts: activeCategoryPosts,
        activeCategoryId: activeCategor[0].id

    }
}


const mapDispatchToCategoryProps = (dispatch) => (
    {
        onPostClick: (id) => (
            dispatch(deletePost(id))),
        dispatch: dispatch
    }
)

const mergeCategoryProps = (stateProps, dispatchProps) => (
    {
        ...stateProps,
        ...dispatchProps,
        onNewPostSubmit: (title) => (
            dispatchProps.dispatch(
                addPost(uuidv4(), title, stateProps.activeCategoryId)
            )
        )
    }
)


const Category = (props) => (
    <div>
        <PostList
            posts={props.posts}
            onClick={props.onPostClick}

        />
        <TextFieldSubmit
            onSubmit={props.onNewPostSubmit}
        />
    </div>
)
const CategoryDisplay = connect(
    mapStateToCategoryProps,
    mapDispatchToCategoryProps,
    mergeCategoryProps
)(Category)

class TextFieldSubmit extends Component {
    componentDidMount() {
        Modal.setAppElement('body');
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
        this.setState({
            value: e.target.value
        })
    }
    handleSubmit = () => {
        this.props.onSubmit(this.state.value)
        this.setState({
            value: '',
            showModal: false
        })
    }

    render() {
        return (
            <div>
                <button
                    className={'ui primary button'}
                    onClick={this.handleOpenModal}
                >Add New Post
                </button>
                <Modal
                    isOpen={this.state.showModal}
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
                            type='submit'
                        >Submit Post
                        </button>

                    </div>
                </Modal>

            </div>






        )
    }
}

const PostList = (props) => (
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



export default App;
