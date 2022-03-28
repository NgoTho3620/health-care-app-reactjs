import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { getProfileDoctorById } from '../../../services/userSevice';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId);
        this.setState({ dataProfile: data });
    }

    getInfoDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            // this.getInfoDoctor(this.props.doctorId);
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let labelVi = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY');
            let labelViFormatted = this.capitalizeFirstLetter(labelVi);

            let time =
                language === LANGUAGES.VI
                    ? dataTime.timeTypeData.valueVI
                    : dataTime.timeTypeData.valueEN;

            let date =
                language === LANGUAGES.VI
                    ? labelViFormatted
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale('en')
                          .format('ddd - MM/DD/YYYY');
            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                    <div>
                        <FormattedMessage id="patient.booking-modal.free-booking" />
                    </div>
                </>
            );
        }
        return <></>;
    };

    render() {
        let { dataProfile } = this.state;
        let {
            language,
            isShowDescriptionDoctor,
            dataTime,
            isShowLinkDetail,
            isShowPrice,
            doctorId,
        } = this.props;

        let nameVi = '',
            nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVI}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEN}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div
                        className="content-left"
                        style={{
                            backgroundImage: `url(${
                                dataProfile && dataProfile.image ? dataProfile.image : ''
                            })`,
                        }}
                    ></div>
                    <div className="content-right">
                        <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div className="down">
                            {isShowDescriptionDoctor ? (
                                <>
                                    {dataProfile &&
                                        dataProfile.Markdown &&
                                        dataProfile.Markdown.description && (
                                            <span>{dataProfile.Markdown.description}</span>
                                        )}
                                </>
                            ) : (
                                <>{this.renderTimeBooking(dataTime)}</>
                            )}
                            {isShowLinkDetail && (
                                <div className="view-detail-doctor">
                                    <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                                </div>
                            )}
                            {isShowPrice && (
                                <div className="price">
                                    <FormattedMessage id="patient.booking-modal.price-booking" />:{' '}
                                    {dataProfile &&
                                    dataProfile.Doctor_Info &&
                                    language === LANGUAGES.VI ? (
                                        <NumberFormat
                                            value={dataProfile.Doctor_Info.priceTypeData.valueVI}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VNĐ'}
                                        />
                                    ) : (
                                        ''
                                    )}
                                    {dataProfile &&
                                    dataProfile.Doctor_Info &&
                                    language === LANGUAGES.EN ? (
                                        <NumberFormat
                                            value={dataProfile.Doctor_Info.priceTypeData.valueEN}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </div>
                            )}
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
