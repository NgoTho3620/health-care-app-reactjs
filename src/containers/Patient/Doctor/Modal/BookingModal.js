import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { fetchGenderSuccess } from './../../../../store/actions/adminActions';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userSevice';
import { toast } from 'react-toastify';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
            isShowLoading: false,
        };
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVI : item.valueEN;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        return result;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                });
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy,
        });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0],
        });
    };

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption,
        });
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    buildTimeBooking = (dataTime) => {
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
            return `${time} - ${date}`;
        }
        return '';
    };

    buildDoctorName = (dataTime) => {
        let { language } = this.props;

        if (dataTime && !_.isEmpty(dataTime)) {
            let name =
                language === LANGUAGES.VI
                    ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                    : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;

            return name;
        }
        return '';
    };

    handelConfirmBooking = async () => {
        this.setState({
            isShowLoading: true,
        });
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        });

        this.setState({
            isShowLoading: false,
        });

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment successfully');
            this.props.closeBookingModal();
        } else {
            toast.error('Booking a new appointment error');
        }
        console.log('check confirm', this.state);
    };

    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        return (
            <LoadingOverlay active={this.state.isShowLoading} spinner text="Loading ...">
                <Modal
                    isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size="lg"
                    centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left">
                                <FormattedMessage id="patient.booking-modal.title" />
                            </span>
                            <span className="right" onClick={closeBookingModal}>
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                        <div className="booking-modal-body">
                            <div className="doctor-info">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <i className="fas fa-user"></i>{' '}
                                    <label htmlFor="">
                                        <FormattedMessage id="patient.booking-modal.fullName" />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.fullName}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(event, 'fullName')
                                        }
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <i className="fas fa-mobile"></i>{' '}
                                    <label htmlFor="">
                                        <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(event, 'phoneNumber')
                                        }
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <i className="fas fa-envelope"></i>{' '}
                                    <label htmlFor="">
                                        <FormattedMessage id="patient.booking-modal.email" />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(event, 'email')
                                        }
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <i className="fas fa-address-card"></i>{' '}
                                    <label htmlFor="">
                                        <FormattedMessage id="patient.booking-modal.address" />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.address}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(event, 'address')
                                        }
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <i className="fas fa-plus-circle"></i>{' '}
                                    <label htmlFor="">
                                        <FormattedMessage id="patient.booking-modal.reason" />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.reason}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(event, 'reason')
                                        }
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <i className="fas fa-calendar-alt"></i>{' '}
                                    <label htmlFor="">
                                        <FormattedMessage id="patient.booking-modal.birthday" />
                                    </label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control"
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <i className="fas fa-venus-mars"></i>{' '}
                                    <label htmlFor="">
                                        <FormattedMessage id="patient.booking-modal.gender" />
                                    </label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button
                                className="btn-booking-confirm"
                                onClick={() => this.handelConfirmBooking()}
                            >
                                <FormattedMessage id="patient.booking-modal.btnConfirm" />
                            </button>
                            <button className="btn-booking-cancel" onClick={closeBookingModal}>
                                <FormattedMessage id="patient.booking-modal.btnCancel" />
                            </button>
                        </div>
                    </div>
                </Modal>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
