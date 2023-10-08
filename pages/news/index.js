import {
  Grid,
  Card,
  Button,
  CardMedia,
  Container,
  Typography,
  CardContent,
  CardActions,
} from "@material-ui/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../components/Layouts/Navbar";
import Footer from "../../components/Layouts/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../../redux/actions/news";


function News() {
  let news=useSelector(e=>e.news.news)
  let dispatch =useDispatch()
  
  useEffect(() => {
    dispatch(getAllNews())
  }, []);

  return (
    <>
      <Navbar />
      <br />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {news.length>0 &&
            news.map((e) => {
              return (
                <Grid item sm={4} key={e._id}>
                  <NewsCard
                    id={e._id}
                    title={e.title}
                    desc={e.description}
                    imageUrl={e.thumbnail}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Container>
      <br />
      <Footer />
    </>
  );
}

function NewsCard({ imageUrl, title, desc, id }) {
  return (
    <Card>
      <CardMedia
        component="img"
        image={imageUrl}
        alt="News Image"
        height="140"
      />
      <CardContent>
        <Typography>
          <b>{title}</b>
        </Typography>
        <br />
        <br />
        <Typography>{desc}</Typography>
      </CardContent>
      <CardActions>
        <Link legacyBehavior href={{ pathname: "/news/detail", query: { preId: id } }}>
          <Button variant="contained" color="primary">
            Read More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default News;
