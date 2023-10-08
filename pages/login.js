import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBanner from '../components/Common/PageBanner';
import Footer from '../components/Layouts/Footer';
import Link from 'next/link';
import Router from 'next/router'
  import { connect } from 'react-redux'
// components
import EmailField from '../components/SignUp/EmailField'
import FormField from '../components/SignUp/FormField'
// notification
import { toast, ToastContainer } from 'react-toastify';
// actions
import { login } from '../redux/actions/auth'
import CircularProgress from "@material-ui/core/CircularProgress";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isEmail: false,
      isPassword: false,
      loading: false,
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem("zyen_token")) {
      Router.push("/")
    } else {
      Router.push("/login")
    }
  }

  emailChanged = values => {
    this.setState({
      isEmail: values.errors.length === 0 ? true : false,
      email: values.value
    })
  }

  passwordChanged = values => {
    this.setState({
      isPassword: values.errors.length === 0 ? true : false,
      password: values.value
    })
  }

  onSubmit = async e => {
    e.preventDefault();
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
    const { email, password } = this.state;
    await this.props.login({ email, password });
    if (this.props.isLoggedin) {
      this.setState({ loading: false });
      toast.success('Login successful!')
      if (localStorage.getItem("isAdmin") === "true") {
        Router.push('/dash')
      } else {
        Router.push('/profile')
      }
    }else{
      this.setState({ loading: false });
      toast.error('Username or password incorrect!');
    }
  }

  onChange = (value, name) => {
    this.setState({ [name]: value })
  }

  render() {
    const { email, password, isPassword, isEmail, loading } = this.state;
    const validateForm = isEmail && isPassword;

    return (
      <React.Fragment>
        <Navbar />

        <section className="user-area-all-style log-in-area ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="contact-form-action">
                  <div className="form-heading text-center">
                    <h3 className="form-title">Login to your account</h3>
                  </div>

                  <form onSubmit={e => this.onSubmit(e)} noValidate>
                    <div className="row">

                      <div className='col-12'>
                        <EmailField
                          fieldId="email"
                          label="Email"
                          placeholder="Enter Email Address"
                          onStateChanged={this.emailChanged}
                          required
                          role="login"
                        />
                      </div>

                      <div className='col-12'>
                        <FormField
                          type="password"
                          fieldId="password"
                          label="Password"
                          placeholder="Enter password"
                          onStateChanged={this.passwordChanged}
                          required
                          role="login"
                        />
                      </div>

                      {/* <div className="col-12">
                        <div className="form-group">
                          <input className="form-control" type='email' value={email} type="text" name="email" placeholder="Username or Email" onChange={e => this.onChange(e.target.value, 'email')} />
                        </div>
                      </div> */}
                      {/* 
                      <div className="col-12">
                        <div className="form-group">
                          <input className="form-control" value={password} type="password" name="password" placeholder="Password" onChange={e => this.onChange(e.target.value, 'password')} />
                        </div>
                      </div> */}

                      <div className="col-lg-6 col-sm-6 form-condition">
                        <div className="agree-label">
                          {/* <input type="checkbox" id="chb1" />
                                                    <label>Remember me</label> */}
                        </div>
                      </div>

                      <div className="col-lg-6 col-sm-6">
                        <Link legacyBehavior href="/recover-password">
                          <a className="forget">Forgot password?</a>
                        </Link>
                      </div>

                      <div className="col-12">
                        <button
                          type="submit"
                          className={`default-btn btn-two ${validateForm && !loading ? '' : 'disabled-button'}`}
                          disabled={validateForm && !loading ? false : true}
                        >Log In Now</button>
                          {loading && <CircularProgress size={25} style={{zIndex: 10}} />}
                      </div>

                      <div className="col-12">
                        <p className="account-desc">
                          Not a member?
                                                    <Link legacyBehavior href="/sign-up">
                            <a>Register</a>
                          </Link>
                        </p>
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
}

const mapStateToProps = store => {
  return {
    isLoggedin: store.auth.isLoggedin
  }
}

const mapDispatchToProps = {
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);