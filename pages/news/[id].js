import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Layouts/Navbar";
import Footer from "../../components/Layouts/Footer";
import { Box, Button, Container } from "@material-ui/core";
import style from "../../assets/css/news-page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../redux/actions/news";

const ReactMarkdown = require("react-markdown/with-html");

function NewsDetail() {

let dispatch =useDispatch()
let news=useSelector(e=>e.news.newsDetail)
  const router = useRouter();
  const id = router.query["preId"];

  useEffect(() => {
    dispatch(getNews(id))
  }, []);


  return (
    <>
      <Navbar />
      {/* {arr &&
        arr
          .filter((el) => el._id === id)
          .map((e) => {
            return ( */}
              <>
                <div className={style.box}>
                  <h1 className={style.color}>{news.title}</h1>
                </div>
                <br />
                <br />
                <Container>
                  <Link legacyBehavior href="/news">
                    <Button variant="contained" color="primary">
                      Return
                    </Button>
                  </Link>
                </Container>
                <br />
                <br />
                <Container>
                  {/* <p>{e.editorHtml}</p> */}
                  <ReactMarkdown
                    escapeHtml={false}
                    source={news && news.editorHtml}
                  />
                </Container>
              </>
            {/* );
          })} */}
      <br />
      <br />
      <Footer />
    </>
  );
}

export default NewsDetail;
