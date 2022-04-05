import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageHandbook.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { createNewHandbook } from '../../../services/userSevice';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            author: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        };
    }

    async componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    handelOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleSaveNewHandbook = async () => {
        let res = await createNewHandbook(this.state);
        if (res && res.errCode === 0) {
            toast.success('Add new handbook successfully!');
            this.setState({
                name: '',
                author: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            });
        } else {
            toast.error('Add new handbook error!');
        }
    };

    render() {
        return (
            <div className="manage-handbook-container">
                <div className="ms-title">Quản lý handbook</div>
                <div className="add-new-handbook row">
                    <div className="col-6 form-group">
                        <label htmlFor="">Tên bài viết</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={(event) => this.handelOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label htmlFor="">Tên tác giả</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.author}
                            onChange={(event) => this.handelOnChangeInput(event, 'author')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label htmlFor="">Ảnh bài viết</label>
                        <input
                            type="file"
                            className="form-control-file"
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                    </div>
                    <div className="col-12">
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            className="btn-save-handbook"
                            onClick={() => this.handleSaveNewHandbook()}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
