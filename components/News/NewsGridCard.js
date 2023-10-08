import React, { Component, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAllNews } from "../../redux/actions/news";
import moment from "moment";
import Image from "next/image";

class NewsGridCard extends Component {
  componentDidMount = async() => {
    this.getNews();
  };

  getNews = async()=>{
    await this.props.getAllNews();
  }
  // useEffect () {   
  //    var data = await dispatch(getAllNews());
  //     console.log('dfswds', data )
  //   }   
  // ;
  // useEffect() {
  //   this.getNews();
  //   console.log('adad', this.getNews())
  // }
  //  getNews = async() => {
  //    const dispatch = useDispatch();
  //    await dispatch(getAllNews());
  // // console.log('erere', data) 
  // }

  handleViewMedia = (slug) => {
    window.open(`/article/${slug}`, "_blank");
  };
  // useEffect() {
  //   async 
  //   var data = await this.props.getAllNews();
  //   console.log('dfswds', data )
  // }

  render() {
    // useEffect(() => {
    //   this.getNews();
    //   console.log('adad', this.getNews())
    // }, [])
    const { news } = this.props;
    console.log(news)
    // const { news } = props;
    return (
      <section className="news-area ptb-100">
        <div className="container">
          <div className="row">
            {news && news.length > 0 ? (
              news.map((item, index) => (
                <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                  <div className="single-news">
                    <div className="news-content-wrap">
                      <ul>
                        <li>
                          {moment(item.releasedDate).format("MMM DD YYYY", "x")}
                        </li>
                      </ul>

                      <h3 style={{color: '#2ea3f2'}}>{item.title}</h3>

                      <div className="image-placeholder">
                      
                        {item.thumbnail ? (
                          <Image width={0} height={0} alt="" src={item.thumbnail.location || "/"} />
                        ) : (
                          <p>IMG PLACEHOLDER</p>
                        )}
                      </div>
                      <p className="truncated-text">{item.description}</p>
                      <a onClick={() => this.handleViewMedia(item.slug)}>
                        <button type="button" className={`default-btn btn-two`}>
                          Read More
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3 style={{ margin: "0 auto" }}>
                No news articles available at the moment.
                {/* Loading... */}
              </h3>
            )}

            {/* Pagination */}
            {/* <div className="col-lg-12">
                            <div className="page-navigation-area">
                                <nav aria-label="Page navigation example text-center">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <Link legacyBehavior href="#">
                                                <a className="page-link page-links">
                                                    <i className='bx bx-chevrons-left'></i>
                                                </a>
                                            </Link>
                                        </li>

                                        <li className="page-item active">
                                            <Link legacyBehavior href="#">
                                                <a className="page-link">1</a>
                                            </Link>
                                        </li>

                                        <li className="page-item">
                                            <Link legacyBehavior href="#">
                                                <a className="page-link">2</a>
                                            </Link>
                                        </li>

                                        <li className="page-item">
                                            <Link legacyBehavior href="#">
                                                <a className="page-link">3</a>
                                            </Link>
                                        </li>

                                        <li className="page-item">
                                            <Link legacyBehavior href="#">
                                                <a className="page-link">
                                                    <i className='bx bx-chevrons-right'></i>
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div> */}
          </div>
        </div>
      </section>
    );
  }
}



const mapStateToProps = (store) => {
  return {
    news: store.news.news,
  };
};

const mapDispatchToProps = {
  getAllNews,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsGridCard);
