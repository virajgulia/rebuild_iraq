import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBanner from '../components/Common/PageBanner';
import Footer from '../components/Layouts/Footer';
import NewsGridCard from '../components/News/NewsGridCard';
import Pricing from '../components/Pricing/Pricing';

class Media extends Component {
    render() {
        return(
            <React.Fragment>
                <Navbar />
                <PageBanner 
                    pageTitle="Media"
                />
                <Pricing />
                <Footer />
            </React.Fragment>
        );
    }
}

export default Media;


