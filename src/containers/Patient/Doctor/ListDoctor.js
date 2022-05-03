import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
import './ListDoctor.scss';

class ListDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            });
        }
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    };

    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="section-share section-outstanding-doctor">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">
                                <FormattedMessage id="homepage.outstanding-doctor" />
                            </span>
                        </div>
                        <div className="section-body">
                            {arrDoctors &&
                                arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString(
                                            'binary'
                                        );
                                    }
                                    let nameVi = `${item.positionData.valueVI}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEN}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div
                                            className="section-customize"
                                            key={index}
                                            onClick={() => this.handleViewDetailDoctor(item)}
                                        >
                                            <div className="bg">
                                                <div
                                                    className="bg-image section-outstanding-doctor"
                                                    style={{
                                                        backgroundImage: `url(${imageBase64})`,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="position mb-5">
                                                <div>
                                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                                </div>
                                                <div>{item.Doctor_Info.specialtyData.name}</div>
                                            </div>
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
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListDoctor));
