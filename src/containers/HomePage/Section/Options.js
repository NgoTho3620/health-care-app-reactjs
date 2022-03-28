import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Options.scss';
import { FormattedMessage } from 'react-intl';

class Options extends Component {
    render() {
        return (
            <div className="option-container">
                <div className="option-title">
                    <div className="title">
                        <FormattedMessage id="section.title" />
                    </div>
                    <div className="sub-title">
                        <FormattedMessage id="section.subtitle" />
                    </div>
                    <button>
                        <FormattedMessage id="section.see-btn" />
                    </button>
                </div>
                <div className="option-detail">
                    <div className="option-child">
                        <div className="icon-child">
                            <i className="far fa-hospital"></i>
                        </div>
                        <div className="text-child">
                            <FormattedMessage id="section.child1" />
                        </div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                        <div className="text-child">
                            <FormattedMessage id="section.child2" />
                        </div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child">
                            <i className="fas fa-procedures"></i>
                        </div>
                        <div className="text-child">
                            <FormattedMessage id="section.child3" />
                        </div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child">
                            <i className="fas fa-flask"></i>
                        </div>
                        <div className="text-child">
                            <FormattedMessage id="section.child4" />
                        </div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child">
                            <i className="fas fa-user-md"></i>
                        </div>
                        <div className="text-child">
                            <FormattedMessage id="section.child5" />
                        </div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child">
                            <i className="fas fa-briefcase-medical"></i>
                        </div>
                        <div className="text-child">
                            <FormattedMessage id="section.child6" />
                        </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Options);
