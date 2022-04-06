import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailHandbook.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import { getAllDetailHandbookById } from '../../../services/userSevice';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import brgImg from '../../../assets/banner_1.png';

class DetailHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailHandbook: {},
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({ id: id });

            let res = await getAllDetailHandbookById({ id: id });

            this.setState({
                dataDetailHandbook: res.data,
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    // handelOnChangeSelect = async (event) => {
    //     if (this.props.match && this.props.match.params && this.props.match.params.id) {
    //         let id = this.props.match.params.id;

    //         let res = await getAllDetailHandbookById({ id: id});

    //             this.setState({
    //                 dataDetailHandbook: res.data,
    //             });
    //         }
    //     }

    render() {
        let { dataDetailHandbook } = this.state;
        console.log('check drtaa', this.state.dataDetailHandbook);

        let createdDate = new Date(this.state.dataDetailHandbook.createdAt).toLocaleDateString();
        let updatedDate = new Date(this.state.dataDetailHandbook.updatedAt).toLocaleDateString();
        let { language } = this.props;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="detail-handbook-container">
                    <div
                        className="detail-banner"
                        style={{
                            backgroundImage: `url(${brgImg})`,
                        }}
                    >
                        <div className="description-handbook">
                            <div className="title-handbook">
                                <div className="title-name">{dataDetailHandbook.name}</div>
                                <div className="author-name">
                                    Nhóm tác giả: {dataDetailHandbook.author}
                                </div>
                                <div className="time">
                                    <div className="create-at">Xuất bản: {createdDate}</div>
                                    <div className="update-at">
                                        Cập nhật lần cuối: {updatedDate}
                                    </div>
                                </div>
                            </div>
                            {dataDetailHandbook && !_.isEmpty(dataDetailHandbook) && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: dataDetailHandbook.descriptionHTML,
                                    }}
                                    className="detail-description"
                                ></div>
                            )}
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
