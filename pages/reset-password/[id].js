import React, { useState,useEffect } from 'react';
import Navbar from '../../components/Layouts/Navbar';
import PageBanner from '../../components/Common/PageBanner';
import Footer from '../../components/Layouts/Footer';
import Link from 'next/link';
import Router from 'next/router'
import { connect } from 'react-redux'
// components
import EmailField from '../../components/SignUp/EmailField'
import FormField from '../../components/SignUp/FormField'
// notification
import { toast, ToastContainer } from 'react-toastify';
// actions
import { login } from '../../redux/actions/auth'
import CircularProgress from "@material-ui/core/CircularProgress";
import { useRouter } from 'next/router'
import jwt_decode from "jwt-decode";
import {changePassword} from "../../redux/actions/user"

const ResetPassword = (props)=> {
  const router = useRouter();
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [isNewPassword, setisNewPassword] = useState('');
  const [isConfirmPassword, setisConfirmPassword] = useState('');
  const [loading, setloading] = useState(false);
  const [validateForm,setvalidateForm] = useState(false);
  const [email,setemail] = useState('');

  useEffect(() => {
    let query = router.query
    if (query.id) {
      console.log('Jwt_decode',jwt_decode(query.id))
      const decoded = jwt_decode(query.id);
      setemail(decoded.email);

      console.log('=====>11',decoded.email);
    }
  }, []);
//   useEffect(() => {
//     // let query = router.query
//     // if (query.id) {
//       //     console.log(query.id);
      
//       // }
//       console.log('=====>22',email);
//       changePassword(email,'Uxdlab@123456');
      
// }, [email]);

  const newPasswordChanged = values => {
    console.log(values.value);
    setisNewPassword(values.errors.length === 0 ? true : false);
    setnewPassword(values.value);
  }
  
  const confirmPasswordChanged = values => {
    console.log(values.value);
    setisConfirmPassword(values.errors.length === 0 ? true : false);
    setconfirmPassword(values.value);
    // if((confirmPassword!=='')&&(confirmPassword===newPassword)){
    //   setvalidateForm(true);
    //   console.log('validateForm',validateForm);
    // }else{
    //   setvalidateForm(false);
    //   console.log('validateForm',validateForm);
    // }

  }

  const onSubmit = async e => {
    e.preventDefault();
    if(newPassword===confirmPassword){
      const data = {
        email:email,
        password: newPassword,
      }
  
      console.log(data);
      await props.changePassword(data).then(()=>{
        Router.push('/login')
      });
    } else{
      toast.error('New Password And Confirm Password does not match');
    }
    // if (!this.state.loading) {
    //     this.setState({ loading: true });
    //   }

    // if (!this.state.loading) {
    //   this.setState({ loading: true });
    // }
    // const { email, password } = this.state;
    // await this.props.login({ email, password });
    // if (this.props.isLoggedin) {
    //   this.setState({ loading: false });
    //   toast.success('Login successful!')
    //   if (localStorage.getItem("isAdmin") === "true") {
    //     Router.push('/dashboard')
    //   } else {
    //     Router.push('/profile')
    //   }
    // }else{
    //   this.setState({ loading: false });
    //   toast.error('Username or password incorrect!');
    // }
  }

//   onChange = (value, name) => {
//     this.setState({ [name]: value })
//   }


    return (
      <React.Fragment>
        <Navbar />

        <section className="user-area-all-style log-in-area ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="contact-form-action">
                  <div className="form-heading text-center">
                    <h3 className="form-title">Reset Password</h3>
                  </div>

                  <form onSubmit={e => onSubmit(e)} noValidate>
                    <div className="row">
                      <div className='col-12'>
                        <FormField
                          type="password"
                          fieldId="newPassword"
                          label="New Password"
                          placeholder="Enter New Password"
                          onStateChanged={newPasswordChanged}
                        //   onStateChanged={this.emailChanged}
                          required
                        />
                      </div>

                      <div className='col-12'>
                        <FormField
                          type="password"
                          fieldId="confirmPassword"
                          label="Confirm New Password"
                          placeholder="Enter Confirm Password"
                          onStateChanged={confirmPasswordChanged}
                          required
                        />
                      </div>

                      

                      <div className="col-lg-6 col-sm-6 form-condition">
                        <div className="agree-label">
                          {/* <input type="checkbox" id="chb1" />
                                                    <label>Remember me</label> */}
                        </div>
                      </div>


                      <div className="col-12">
                        <button
                          type="submit"
                          // className={`default-btn btn-two ${validateForm && !loading ? '' : 'disabled-button'}`}
                          className={`default-btn btn-two`}
                          // disabled={validateForm && !loading ? false : true}
                          // disabled={validateForm ? false : true}
                        >Submit</button>
                          {loading && <CircularProgress size={25} style={{zIndex: 10}} />}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />

        <ToastContainer />

      </React.Fragment>
    );
}

const mapStateToProps = store => {
  return {
    isLoggedin: store.auth.isLoggedin
  }
}

const mapDispatchToProps = {
  changePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
// export default ResetPassword