import React, {Component} from "react";
import Modal from "react-modal";

import PostDisplay from "./PostDisplay";
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

export class TextFieldSubmit extends Component {
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
