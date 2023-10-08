import "../assets/css/animate.css";
import "../assets/css/flaticon.css";
import "../assets/css/boxicons.min.css";
import "../assets/css/bootstrap.min.css";
// import "../node_modules/react-modal-video/css/modal-video.min.css";
// import "react-accessible-accordion/dist/fancy-example.css";
import "../assets/css/style.css";
import "../assets/css/custom.scss";
import "../assets/css/responsive.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import App from "next/app";
import { DefaultSeo } from "next-seo";
import Loader from "../components/Shared/Loader";
import GoTop from "../components/Shared/GoTop";
import AutoLogout from "../components/AutoLogout/AutoLogout";
import { ConfirmProvider } from "material-ui-confirm";

// notification
import { ToastContainer } from "react-toastify";

// redux
import { Provider } from "react-redux";

import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../redux/reducers/index";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    };
  }

  // Preloader
  state = {
    loading: true,
  };
  componentDidMount() {
    this.timerHandle = setTimeout(
      () => this.setState({ loading: false }),
      2000
    );
  }
  componentWillUnmount() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider store={store}>
        <ConfirmProvider>
          <React.Fragment>
            <DefaultSeo
              title="Rebuilding Iraq"
              description=""
              openGraph={{
                type: "website",
                locale: "en_IE",
                url: "https://rebuildingiraq.net/",
                site_name: "Rebuilding Iraq",
              }}
            />

            <Component {...pageProps} />
            {typeof localStorage !== "undefined" &&
              localStorage.getItem("zyen_token") && <AutoLogout />}
            <Loader loading={this.state.loading} />
            <GoTop scrollStepInPx="100" delayInMs="10.50" />

            <ToastContainer />
          </React.Fragment>
        </ConfirmProvider>
      </Provider>
    );
  }
}
