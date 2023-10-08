import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import About from '../components/Partners/About';
import PartnerCompanies from '../components/Partners/PartnerCompaniesSection';
import Footer from '../components/Layouts/Footer';

class About2 extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <About />
                <PartnerCompanies />
                <Footer />
            </React.Fragment>
        );
    }
}

export default About2;