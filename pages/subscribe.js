import React, { Component ,useEffect,useState} from 'react';
import API from '../redux/config/request'
import Navbar from '../components/Layouts/Navbar';
import PageBanner from '../components/Common/PageBanner';
import Footer from '../components/Layouts/Footer';
import Router, {useRouter} from 'next/router'
import axios from "axios";

const Subscribe =  ()=> {
    const [StatusSub, setStatusSub] = useState(false)
    const router  = useRouter()
    const data  =  router.query;
    console.log(router.query)
    const sub  =(token)=>{

        axios.create({
            baseURL: process.env.ROOT_URL || "/api/",
            headers: {
              'Access-Control-Allow-Origin': '*',
              "Access-Control-Allow-Methods": "PUT, POST, PATCH, DELETE, GET",
            },
            paramsSerializer(params) {
              
            },
          });
        console.log('data',token)
        axios.get(`api/user/subscribe?token=${token}&subscribe=false`)
        .then((res) => {
            console.log('resulttt',res)
            console.log(res.result1)
            setStatusSub(true)
        })
        .catch((err) => {
          console.log("err: ", err);
         
        })
    }
    useEffect(()=>{
        if(localStorage.getItem("zyen_token")){
            const token = localStorage.getItem("zyen_token");
            sub(token)
        }else{
            Router.push("/login");
        }
    }
    , [])     
        return (
            <React.Fragment>
                {StatusSub
                ?
            <><div className="text-container ptb-100">
            <div className="col-sm-4"></div>
                <div className="col-sm-8 shadow b-1 p-100" style={{marginLeft:"20%",border:"1px solid",padding:"20px"}}>
                    <h1>You have been Unsubscribed</h1>
                    <p>Your Email Address is removed from our maiing list. We are sorry to see you go , we won't be sending any more email to your email address.</p>
                </div>
                <div className="col-sm-4"></div>
            </div></> 
            :
                    <div></div>
            }
            
            </React.Fragment>
        );
  
}

export default Subscribe;