import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import img from '../../assets/healthcare-logo.png';
import './HomeFooter.scss';
import { withRouter } from 'react-router';

class HomeFooter extends Component {
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };
    render() {
        return (
            <>
                <div className="more-info-need">
                    <p>
                        Cần tìm hiểu thêm?{' '}
                        <Link className="more-info-link" to="/home">
                            Xem câu hỏi thường gặp.
                        </Link>
                    </p>
                </div>
                <div className="home-footer-container">
                    <div className="footer_wrapper">
                        <div className="left-footer">
                            <div className="brand-logo">
                                <img src={img} alt="" onClick={() => this.returnToHome()} />
                            </div>
                            <div className="name-company">
                                Công ty Cổ phần Dịch Vụ Y tế HealthCARE
                            </div>
                            <div className="address">
                                <i class="fas fa-map-marker-alt"></i> 241 Xuân Thủy, Dịch Vọng Hậu,
                                Cầu Giấy, Hà Nội
                            </div>
                            <div className="certification">
                                <img
                                    src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg"
                                    alt=""
                                />
                                <img
                                    src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="center-footer">
                            <ul>
                                <li>Liên hệ hợp tác</li>
                                <li>Câu hỏi thường gặp</li>
                                <li>Điều khoản sử dụng</li>
                                <li>Chính sách bảo mật</li>
                                <li>Quy chế hoạt động</li>
                                <li>Quy chế giải quyết khiếu nại</li>
                            </ul>
                        </div>
                        <div className="right-footer">
                            <div className="branch">
                                <div className="name-branch">Trụ sở tại Hà Nội</div>
                                <div className="address-branch">
                                    241 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
                                </div>
                            </div>
                            <div className="branch">
                                <div className="name-branch">Văn phòng tại TP Hồ Chí Minh</div>
                                <div className="address-branch">
                                    177 Trần Bình Trọng, Phường 3, Quận 5, TP Hồ Chí Minh
                                </div>
                            </div>
                            <div className="branch">
                                <div className="name-branch">Hỗ trợ khách hàng</div>
                                <div className="address-branch">support@healthcare.vn (7h-18h)</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <div className="company">
                        <p>&copy; 2022 HealthCARE</p>
                    </div>
                    <div className="social">
                        <i class="fab fa-facebook-square"></i>
                        <i class="fab fa-youtube"></i>
                    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeFooter));
