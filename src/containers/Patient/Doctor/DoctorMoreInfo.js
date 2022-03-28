import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorMoreInfo.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getMoreInfoDoctorById } from '../../../services/userSevice';
import NumberFormat from 'react-number-format';

class DoctorMoreInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            moreInfo: {},
        };
    }

    async componentDidMount() {
        if (this.props.detailDoctorIdFromParent) {
            let res = await getMoreInfoDoctorById(this.props.detailDoctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    moreInfo: res.data,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.detailDoctorIdFromParent !== prevProps.detailDoctorIdFromParent) {
            let res = await getMoreInfoDoctorById(this.props.detailDoctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    moreInfo: res.data,
                });
            }
        }
    }

    showHideDetailInfo = (status) => {
        this.setState({ isShowDetailInfo: status });
    };

    render() {
        let { isShowDetailInfo, moreInfo } = this.state;
        console.log(this.state.moreInfo);
        let { language } = this.props;
        return (
            <div className="doctor-more-info-container">
                <div className="content-up">
                    <div className="title-address">
                        <FormattedMessage id="patient.more-info-doctor.text-address" />
                    </div>
                    <div className="name-clinic">
                        {moreInfo && moreInfo.nameClinic ? moreInfo.nameClinic : ''}
                    </div>
                    <div className="address-clinic">
                        {moreInfo && moreInfo.addressClinic ? moreInfo.addressClinic : ''}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfo ? (
                        <>
                            <div className="title-price">
                                <FormattedMessage id="patient.more-info-doctor.price" />
                            </div>
                            <div className="detail-info">
                                <div className="price">
                                    <span className="left">
                                        <FormattedMessage id="patient.more-info-doctor.price" />
                                    </span>
                                    <span className="right">
                                        {moreInfo &&
                                            moreInfo.priceTypeData &&
                                            moreInfo.priceTypeData.valueVI &&
                                            language === LANGUAGES.VI && (
                                                <NumberFormat
                                                    className="currency"
                                                    value={moreInfo.priceTypeData.valueVI}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VNĐ'}
                                                />
                                            )}
                                        {moreInfo &&
                                            moreInfo.priceTypeData &&
                                            moreInfo.priceTypeData.valueEN &&
                                            language === LANGUAGES.EN && (
                                                <NumberFormat
                                                    className="currency"
                                                    value={moreInfo.priceTypeData.valueEN}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                            )}
                                    </span>
                                </div>
                                <div className="note">
                                    {moreInfo && moreInfo.note ? moreInfo.note : ''}
                                </div>
                            </div>
                            <div className="payment">
                                <FormattedMessage id="patient.more-info-doctor.payment" />{' '}
                                {moreInfo && moreInfo.paymentTypeData && language === LANGUAGES.VI
                                    ? moreInfo.paymentTypeData.valueVI
                                    : ''}
                                {moreInfo && moreInfo.paymentTypeData && language === LANGUAGES.EN
                                    ? moreInfo.paymentTypeData.valueEN
                                    : ''}
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.showHideDetailInfo(false)}>
                                    <FormattedMessage id="patient.more-info-doctor.hide" />
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="show-price">
                            <span className="price-title">
                                <FormattedMessage id="patient.more-info-doctor.price" />
                            </span>
                            {moreInfo &&
                                moreInfo.priceTypeData &&
                                moreInfo.priceTypeData.valueVI &&
                                language === LANGUAGES.VI && (
                                    <NumberFormat
                                        className="currency"
                                        value={moreInfo.priceTypeData.valueVI}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VNĐ'}
                                    />
                                )}
                            {moreInfo &&
                                moreInfo.priceTypeData &&
                                moreInfo.priceTypeData.valueEN &&
                                language === LANGUAGES.EN && (
                                    <NumberFormat
                                        className="currency"
                                        value={moreInfo.priceTypeData.valueEN}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                    />
                                )}
                            <span className="detail" onClick={() => this.showHideDetailInfo(true)}>
                                {' '}
                                <FormattedMessage id="patient.more-info-doctor.show" />
                            </span>
                        </div>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorMoreInfo);
