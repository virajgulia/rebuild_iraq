import { combineReducers } from "redux";

import auth from "./auth";
import listing from "./listing";
import user from "./user";
import project from "./project";
import news from "./news";
import category from "./category";
import tender from "./tender";
import company from "./company";
import contact from "./contact";
import plans from "./plans";
import subscriptions from "./subscriptions";

export default combineReducers({
  auth,
  listing,
  user,
  project,
  news,
  category,
  tender,
  company,
  contact,
  plans,
  subscriptions,
});
