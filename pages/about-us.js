import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBanner from '../components/Common/PageBanner';
import OurMission from '../components/WhyEnergyTokens/OurMission';
import Footer from '../components/Layouts/Footer';
import MainBanner from '../components/WhyEnergyTokens/MainBanner'
import ProblemsSection from '../components/WhyEnergyTokens/ProblemsSection';
import SolutionSection from '../components/WhyEnergyTokens/SolutionSection';
import ApproachSection from '../components/WhyEnergyTokens/ApproachSection';

class Services extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <MainBanner />
                <OurMission />
                <ProblemsSection />
                <SolutionSection />
                {/* <ApproachSection /> */}
                <Footer />
            </React.Fragment>
        );
    }
}

export default Services;