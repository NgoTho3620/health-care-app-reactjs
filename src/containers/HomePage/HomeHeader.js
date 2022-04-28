import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import img from '../../assets/healthcare-logo.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowNavbar: false,
        };
    }

    changeLanguage = (language) => {
        //fire redux event
        this.props.changeLanguageAppRedux(language);
    };

    handleShowHideNavbar = () => {
        this.setState({ isShowNavbar: !this.state.isShowNavbar });
    };

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };

    handleViewListHandbook = () => {
        this.props.history.push(`/list-handbook`);
    };

    handleViewListSpecialty = () => {
        this.props.history.push(`/list-specialty`);
    };

    handleViewListClinic = () => {
        this.props.history.push(`/list-clinic`);
    };

    render() {
        let { isShowNavbar } = this.state;
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className={isShowNavbar ? 'right-navbar' : 'right-navbar hide'}>
                    <div className="navbar-content">
                        <div className="navbar-close" onClick={() => this.handleShowHideNavbar()}>
                            <i className="fas fa-times"></i>
                        </div>
                        <ul>
                            <li>
                                <Link
                                    className="navbar-link"
                                    to=""
                                    onClick={() => this.returnToHome()}
                                >
                                    <FormattedMessage id="homeheader.home" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="navbar-link"
                                    to=""
                                    onClick={() => this.handleViewListHandbook()}
                                >
                                    <FormattedMessage id="homepage.list-handbook" />
                                </Link>
                            </li>
                            <li>
                                <Link className="navbar-link" to="">
                                    <FormattedMessage id="homeheader.contact" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="navbar-link"
                                    to=""
                                    onClick={() => this.handleViewListSpecialty()}
                                >
                                    <FormattedMessage id="homeheader.specialty" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="navbar-link"
                                    to=""
                                    onClick={() => this.handleViewListClinic()}
                                >
                                    <FormattedMessage id="homeheader.health-facility" />
                                </Link>
                            </li>
                            <li>
                                <Link className="navbar-link" to="">
                                    <FormattedMessage id="homeheader.doctor" />
                                </Link>
                            </li>
                            <li>
                                <Link className="navbar-link" to="">
                                    <FormattedMessage id="homeheader.fee" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div onClick={() => this.handleShowHideNavbar()} className="overlay"></div>
                </div>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i
                                onClick={() => this.handleShowHideNavbar()}
                                className="fas fa-bars"
                            ></i>
                            <div className="header-logo">
                                <img src={img} alt="" onClick={() => this.returnToHome()} />
                            </div>
                        </div>
                        <div className="center-content">
                            <div
                                className="child-content"
                                onClick={() => this.handleViewListSpecialty()}
                            >
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.specialty" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.search-doctor" />
                                </div>
                            </div>
                            <div
                                className="child-content"
                                onClick={() => this.handleViewListClinic()}
                            >
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.health-facility" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.doctor" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.fee" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>{' '}
                                <FormattedMessage id="homeheader.support" />
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'
                                }
                            >
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.EN ? 'language-en active' : 'language-en'
                                }
                            >
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner && (
                    <div className="home-header-banner">
                        <div className="content-left">
                            <div className="title1">
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className="title2">
                                <FormattedMessage id="banner.title2" />
                            </div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder="Tìm bác sĩ, chuyên khoa,..." />
                            </div>
                            <button>
                                <FormattedMessage id="banner.booking" />
                            </button>
                        </div>
                        <div className="content-right"></div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
