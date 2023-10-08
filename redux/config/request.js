/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import axios from "axios";
import Router from 'next/router'

const debugData = data => {
  return Promise.resolve(data);
};

const debugError = er => {
  if (er.response && er.response.status === 401) {
    console.log(er.response)
    localStorage.clear();
    Router.push('/login')
  }
  return Promise.reject(er.response);
};

const request = () => {
  const token = localStorage.getItem("zyen_token");
  const axiosApi = axios.create({
    baseURL: process.env.ROOT_URL || "/api/",
    headers: {
      Authorization: `${token}`,
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "PUT, POST, PATCH, DELETE, GET",

    },
    paramsSerializer(params) {
      let urlParameters = "";
      Object.keys(params).forEach(function (keys) {
        if (typeof params[keys] === "object") {
          Object.keys(params[keys]).forEach(function (step_1_value, step_1_index) {
            if (typeof params[keys][step_1_value] === "object") {
              Object.keys(params[keys][step_1_value]).forEach(function (step_2_value, step_2_index) {
                urlParameters +=
                  `${keys}[${step_1_value}]` +
                  `[${step_2_value}]` +
                  `=${
                  typeof params[keys][step_1_value][step_2_value] === "string" &&
                    params[keys][step_1_value][step_2_value].split(" ").length > 0
                    ? params[keys][step_1_value][step_2_value]
                      .split(" ")
                      .map(e => e)
                      .join("+")
                    : params[keys][step_1_value][step_2_value].toString()
                  }&`;
              });
            } else {
              urlParameters += `${keys}[${step_1_value}]` + `=${params[keys][step_1_value]}&`;
            }
          });
        } else if (params[keys] !== undefined) {
          urlParameters += `${keys}=${params[keys]}`;
        }
      });
      urlParameters =
        urlParameters.substring(urlParameters.length - 2, urlParameters.length - 1) === "&"
          ? urlParameters.substring(0, urlParameters.length - 1)
          : urlParameters;
      return urlParameters;
    },
  });

  return {
    async get(url, params = {}, options = {}) {
      try {
        const data = await axiosApi
          .get(url, { params });
        return debugData(data);
      } catch (er) {
        return debugError(er);
      }
    },
    async post(url, data, options = {}) {
      try {
        const data_1 = await axiosApi
          .post(url, data);
        return debugData(data_1);
      } catch (er) {
        return debugError(er);
      }
    },
    async put(url, data, options = {}) {
      try {
        const data_1 = await axiosApi
          .put(url, data);
        return debugData(data_1);
      } catch (er) {
        return debugError(er);
      }
    },
    async delete(url, params = {}, options = {}) {
      try {
        const data = await axiosApi
          .delete(url, { data: params });
        return debugData(data);
      } catch (er) {
        return debugError(er);
      }
    },
  };
};

export default request;