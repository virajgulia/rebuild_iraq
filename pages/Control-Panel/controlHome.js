import React, { Component } from 'react';
import Link from "../../utils/ActiveLink";
import Control from './controlPanel';
import Footer from '../../components/Layouts/Footer';
import { getTotalNews } from '../../redux/actions/news';
import { connect } from 'react-redux';
import { getTotalTender } from '../../redux/actions/tender';
import { getProfile } from '../../redux/actions/user';
import Image from 'next/image';
class ControlHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totol: 0,
            totalT: 0,
            planName: ""

        }
    }
    componentDidMount() {
        this.getNew()
    }

    getNew = async () => {
        await this.props.getTotalNews()
        console.log(this.props.totalNew)
        this.setState({ totol: this.props.totalNew })
        await this.props.getTotalTender()
        console.log(this.props.totalTenders)
        this.setState({ totalT: this.props.totalTenders })
        await this.props.getProfile();
        this.setState({ planName: this.props.profile?.planName })
        console.log(this.props.getProfile())
        console.log(this.props.profile.planName)
    }
    render() {
        return (
            <><Control /><>
                <div className="contact-info-area pt-80 pb-70" >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-12">
                                <div className="single-contact-info">
                                    <h6>Tenders</h6>
                                    <hr />
                                    <h3>Total Tenders: {this.state.totalT}</h3>

                                    <div>
                                        <Image width={70} height={0}
                                            src="/TenderCountImg.png"
                                            alt="icon"
                                             />
                                        <Link legacyBehavior href="/tenders">
                                            <button className="btn-primary buttonControlHome" style={{ marginLeft: 5, fontSize: 15 }}>View All</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12">
                                <div className="single-contact-info">
                                    <h6>News</h6>
                                    <hr />
                                    <h3>Total News: {this.state.totol}</h3>
                                    <div>
                                        <Image  height={0}
                                            src="/NewsCountImg.png"
                                            alt="icon"
                                            width={70} />
                                        <Link legacyBehavior href="/news">
                                            <button className="btn-primary buttonControlHome" style={{ marginLeft: 5, fontSize: 15 }}>View All</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12">
                                <div className="single-contact-info">
                                    <h6>Subscription Level</h6>
                                    <hr />
                                    <h3>Your Subscription:<br />{this.state.planName} </h3>
                                    {/* <h5></h5> */}
                                    <Link legacyBehavior href="/pricing">
                                        <button className='btn-primary buttonControlHome' style={{ fontSize: 15, marginTop: 15 }}>Subscribe</button>
                                    </Link>
                                </div>
                            </div>

                            {/* <div className="col-lg-3 col-sm-6">
        <div className="single-contact-info">
            <i className="bx bx-support"></i>
            <h3>Live Chat</h3>
            <p>live chat all the time with our company 24/7</p>
        </div>
    </div> */}
                        </div>
                    </div>
                </div>
            </><Footer /></>
        );
    }
}
const mapStateToProps = store => {
    return {
        totalNew: store.news.totalNews,
        totalTenders: store.tender.totalTenders,
        profile: store.user.profile
    }
}
const mapDispatchToProps = {
    getTotalNews,
    getTotalTender,
    getProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlHome);