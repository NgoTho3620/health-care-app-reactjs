import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllHandbook } from '../../../services/userSevice';
import { withRouter } from 'react-router';
import './ListHandbook.scss';

class ListHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHandbook: [],
        };
    }

    async componentDidMount() {
        let res = await getAllHandbook();
        if (res && res.errCode === 0) {
            this.setState({ dataHandbook: res.data ? res.data : [] });
        }
    }

    handleViewDetailHandbook = (handbook) => {
        this.props.history.push(`/detail-handbook/${handbook.id}`);
    };

    render() {
        let { dataHandbook } = this.state;
        return (
            <>
                <HomeHeader />

                <div className="section-share section-handbook">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">
                                <FormattedMessage id="homepage.list-handbook" />
                            </span>
                        </div>
                        <div className="section-body">
                            {dataHandbook &&
                                dataHandbook.length > 0 &&
                                dataHandbook.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="section-customize handbook-child"
                                            onClick={() => this.handleViewDetailHandbook(item)}
                                        >
                                            <div
                                                className="bg-image section-handbook"
                                                style={{
                                                    backgroundImage: `url(${item.image})`,
                                                }}
                                            ></div>
                                            <div className="handbook-name">{item.name}</div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <HomeFooter />
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListHandbook));
