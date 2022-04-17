import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VerifyEmail.scss';
import { postVerifyBookAppointment } from '../../services/userSevice';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId,
            });

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                });
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="verify-email-container">
                    {statusVerify === false ? (
                        <div className="status-booking">Loading data...</div>
                    ) : (
                        <div>
                            {errCode === 0 ? (
                                <>
                                    <div className="status-booking">
                                        Xác nhận lịch khám thành công!
                                    </div>
                                    <div className="booking-more-info">
                                        Cám ơn bạn đã tin tưởng và đặt lịch khám tại HealthCARE!{' '}
                                        <br />
                                        Mọi thông tin chi tiết xin vui lòng liên hệ hotline:
                                        1900.9095. Hoặc gửi về hòm thư: support@healthcare.vn
                                        (7h-18h)
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="status-booking">
                                        Lịch hẹn không tồn tại hoặc đã được xác nhận!
                                    </div>
                                    <div className="booking-more-info">
                                        Mọi thông tin chi tiết xin vui lòng liên hệ hotline:
                                        1900.9095. Hoặc gửi về hòm thư: support@healthcare.vn
                                        (7h-18h)!
                                    </div>
                                </>
                            )}
                        </div>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
