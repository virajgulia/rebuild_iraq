import API from "../config/request";

export function addNews(data) {
  return (dispatch) => {
    return API()
      .post(`news/add`, data)
      .then((res) => {
        dispatch({
          type: "ACTION_ADD_NEWS",
          data: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ERROR_ADD_NEWS",
          msg: "Add failed",
        });
      });
  };
}

export function getAllNews() {
  return (dispatch) => {
    return API()
      .get(`news/all`)
      .then((res) => {
        dispatch({
          type: "ACTION_ALL_NEWS",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function getTotalNews() {
  return (dispatch) => {
    return API()
      .get(`news/total/allNews`)
      .then((res) => {
        // console.log('data', res.data)
        dispatch({
          type: "ACTION_TOTAL_NEWS",
          data: res.data.newsCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getNews(id) {
  return (dispatch) => {
    return API()
      .get(`news/${id}`)
      .then((res) => {
        dispatch({
          type: "ACTION_GET_NEWS",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getNewBySlug(slug) {
  return (dispatch) => {
    return API()
      .get(`news/slugs/${slug}`)
      .then((res) => {
        dispatch({
          type: "ACTION_GET_NEWS_SLUG",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deleteNews(id) {
  return (dispatch) => {
    return API()
      .delete(`news/delete/${id}`)
      .then((res) => {
        dispatch({
          type: "ACTION_DELETE_NEWS",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
}

export function updateNews(id, data) {
  return (dispatch) => {
    return API()
      .put(`news/edit/${id}`, data)
      .then((res) => {
        dispatch({
          type: "ACTION_EDIT_NEWS",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
}

export default {
  addNews,
  getAllNews,
  getNews,
  getNewBySlug,
  deleteNews,
  updateNews,
};
