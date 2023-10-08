import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBanner from '../components/Common/PageBanner';
import Footer from '../components/Layouts/Footer';
import SampleTender from '../components/TenderListings/SampleTender';

class Tenders extends Component {
    render() {
        return(
            <React.Fragment>
                <Navbar />
                {/* <PageBanner 
                    pageTitle="Tenders"
                /> */}
                <SampleTender />
                <Footer />
            </React.Fragment>
        );
    }
}

export default Tenders;