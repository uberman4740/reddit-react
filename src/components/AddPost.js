import React, {Component} from "react"
import Modal from "react-modal";


//CategoryDisplay | onSubmit
//

export class AddPost extends Component {
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
