import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Options from './Section/Options';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
//import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class HomePage extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false,
                        initialSlide: 3,
                    },
                },
                {
                    breakpoint: 375,
                    settings: {
                        dots: false,
                        infinite: true,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 2,
                    },
                },
            ],
        };
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Options />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutStandingDoctor settings={settings} />
                <Handbook settings={settings} />
                <About />
                <HomeFooter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
