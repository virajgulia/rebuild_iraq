import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment-timezone";
import { connect } from "react-redux";
import { getAllTender } from "../../../redux/actions/tender";
import { getProfile } from "../../../redux/actions/user";
import { getUserCategory } from "../../../redux/actions/user";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles((theme) => ({
  rootPagination: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  table: {
    minWidth: 400,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: 120,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(dateAdded, tenderCategories, expires) {
  return { dateAdded, tenderCategories, expires };
}
const UserTender = (props) => {
  const [listTenders, setlistTenders] = useState([]);
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [listcompany, setListCompany] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [categoryId, setcategoryId] = useState([]);
  const [sortlist, setSortlist] = useState(false);
  const [sortlistbyexpires, setSortlistbyexpires] = useState(false);
  const classes = useStyles();
  console.log("This is profile !!!!!00000000000", props.profile);

  useEffect(() => {
    handleFilterButton();
  }, [props.profile, props.tender]);
  useEffect(() => {
    const a = props.profile;
    if (a) {
      for (let i = 0; i < a.tenderCategories.length; i++) {
        categoryId[i] = a.tenderCategories[i];
        console.log(categoryId);
        console.log("This is profile !----!!!!", a);
      }
    }
  }, [props.profile]);
  const getNew = async () => {
    await props.getAllTender();
    //  console.log('this is user category', props.userCategory)

    await props.getProfile();
    //console.log("This is profile !!!!!", props.profile)
    const a = await props.profile;

    // if (a) {
    //     for (let i = 0; i < a.tenderCategories.length; i++) {
    //         categoryId[i] = a.tenderCategories[i];
    //         console.log(categoryId)
    //     }
    // }
    //console.log(a.tenderCategories.length)
    // for (let i = 0; i < a.tenderCategories.length; i++) {
    //     categoryId[i] = a.tenderCategories[i];
    //     console.log(categoryId)
    // }
  };
  useEffect(() => {
    getNew();
    let search = localStorage.getItem("search");
    if (search !== null && search !== undefined) {
      props.getAllTender(search);
    } else {
      props.getAllTender();
    }
  }, [props.tender]);

  console.log(props.tenders,"props props props props")
  useEffect(() => {
    setlistTenders(props.tenders);
  }, [props.tenders, dataList]);

  useEffect(() => {
    //getNew();
    const fetchListCompany =
      listTenders &&
      listTenders.map((item) => item.company && item.company.country);
    const removeDuplicates = (data) => {
      return [...new Set(data)];
    };
    const newFetchListCompany = removeDuplicates(fetchListCompany);
    setListCompany(newFetchListCompany);
    const fetchListCategory =
      listTenders &&
      listTenders.map(
        (item) => item.categories && item.categories.map((item1) => item1.title)
      );
    // console.log(fetchListCategory);
    if (fetchListCategory) {
      const mergeDedupe = (fetchListCategory) => {
        return [...new Set([].concat(...fetchListCategory))];
      };
      const newFetchListCategory = mergeDedupe(fetchListCategory);
      setListCategory(newFetchListCategory);
    }
  }, [listTenders]);

  let currentDate = moment().tz("Asia/Baghdad").format("MM/DD/YYYY HH:mm:ss");

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeCompany = (event) => {
    setCompany(event.target.value);
  };

  const handleFilterButton = () => {
    // if (company || category) {
    //     const filterThisTwo = listTenders.filter(
    //         (item) =>
    //             item.company.country === company &&
    //             item.categories.some((i) => i.title === category)
    //     );
    //     setlistTenders(filterThisTwo);
    // }
    // if (company && !category) {
    //     const filterThisCompany = listTenders.filter(
    //         (item) => item.company.country === company
    //     );
    //     setlistTenders(filterThisCompany);
    //     setCompany("");
    // } console.log(categoryId)
    let userinfo = props.profile;
    let arr =listTenders && listTenders.filter((q) => {
      let arr1 = q.categories.filter((w) => {
        //console.log('rww--', w._id)
        if (userinfo.tenderCategories.includes(w._id)) {
          return w;
        }
      });
      if (arr1.length > 0) {
        return q;
      }
    });
    console.log("sayya", arr);
    setlistTenders(arr);
    setCategory("");
    // if (categoryId && !company) {
    //     let ctr = 0;
    //     const set = new Set();
    //     var filtered = [];
    //     var unfilter = [];
    //     listTenders.map((it) => {
    //         if (it.categories.length != 0) {
    //             for (let i = 0; i < it.categories.length; i++) {
    //                 filtered[ctr] = it.categories[i]._id;
    //                 unfilter[ctr] = it.categories[i];
    //                 ctr++;
    //             }
    //             // filtered = it.categories[0]._id
    //             // console.log("this is tenders --->", it.categories[0]._id)
    //         }
    //     })
    //     set.add(filtered)
    //     console.log(unfilter)
    //     // console.log(filtered)
    //     // filtered.map((j) => console.log(j))
    //     // for (let k = 0; k < filtered.length; k++) {
    //     //     finalTender[k] = filtered[k];
    //     //     console.log(filtered[k])
    //     // }
    //     // console.log(finalTender);
    //     listTenders.map((item) => console.log(item.categories))
    //     const filterThisCategory = listTenders.filter((item) =>
    //         item.categories._id == unfilter)

    //     console.log(filterThisCategory)
    //     setlistTenders(filterThisCategory);
    //     setCategory("");
    // }
  };

  const handleRemoveFilterButton = () => {
    localStorage.removeItem("search");
    setCompany("");
    setCategory("");
    props.getAllTender();
  };

  const shortTable = () => {
    if (sortlist == false) {
      const data = listTenders.sort((a, b) => {
        return moment(a.createdAt) - moment(b.createdAt);
      });
      setSortlist(true);
      setDataList(data);
    } else {
      const data = listTenders.sort((a, b) => {
        return moment(b.createdAt) - moment(a.createdAt);
      });
      setSortlist(false);
      setDataList(data);
    }
  };

  const shortTableByExpire = () => {
    if (sortlistbyexpires == false) {
      const data = listTenders.sort((a, b) => {
        return moment(a.dueDate) - moment(b.dueDate);
      });
      setSortlistbyexpires(true);
      setDataList(data);
    } else {
      const data = listTenders.sort((a, b) => {
        return moment(b.dueDate) - moment(a.dueDate);
      });
      setSortlistbyexpires(false);
      setDataList(data);
    }
  };

  return (
    <div className="my_user_tender">
      <div className="container" style={{ marginRight: 5 }}>
        <div className="tenders-greeting">
          <h5 style={{ margin: "auto" }}>Available Tenders</h5>
        </div>
        <hr></hr>

        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    onClick={shortTable}
                    align="center"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    Date Added
                    {sortlist ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ justifyContent: "center" }}
                  >
                    Tender Details
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={shortTableByExpire}
                    align="center"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    Expires
                    {sortlistbyexpires ? (
                      <ArrowUpwardIcon />
                    ) : (
                      <ArrowDownwardIcon />
                    )}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryId.map((item) => console.log(item))}
                {listTenders &&
                  listTenders.map((item, i) => (
                    <StyledTableRow key={i}>
                      {item.categories.map((j) => console.log(j))}
                      {console.log("objectItem::", item.categories)}
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                        style={{ width: "15%" }}
                      >
                        <div className="tender-listing-posted-date">
                          <p>
                            {(item.createdAt &&
                              moment(item.createdAt).format("DD")) ||
                              ""}
                          </p>
                          <p>
                            {(item.createdAt &&
                              moment(item.createdAt).format("MMM")) ||
                              ""}
                          </p>
                          <p>
                            {(item.createdAt &&
                              moment(item.createdAt).format("YYYY")) ||
                              ""}
                          </p>
                        </div>
                      </StyledTableCell>

                      <StyledTableCell style={{ width: "200px !importent" }}>
                        <a href={`/tenders/${item.slug}`} target="_blank">
                          {item.tenderTitle || ""}
                        </a>
                        <br />
                        <div className="tender-listing-categories">
                          {item.categories &&
                            item.categories &&
                            item.categories.length > 0 &&
                            item.categories.map((cate, i) => (
                              <div key={i}>
                                <div className="">
                                  {" "}
                                  {cate.title} {"  "} | {"  "}
                                </div>
                              </div>
                            ))}
                          <p style={{ fontWeight: "normal", fontSize: 14 }}>
                            {(item.company && item.company.country) || ""}
                          </p>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ width: "15%" }}>
                        <div
                          className={`days-until-expiration${
                            moment(item.dueDate).isSameOrBefore(
                              currentDate,
                              "day"
                            )
                              ? " expiration-red"
                              : ""
                          }`}
                        >
                          {(moment(item.dueDate).isSameOrBefore(
                            currentDate,
                            "day"
                          )
                            ? moment(item.dueDate).format("YYYYMMDD") ===
                              moment(currentDate).format("YYYYMMDD")
                              ? "Today"
                              : "Expired"
                            : item.dueDate &&
                              moment(item.dueDate).diff(
                                moment(currentDate),
                                "days"
                              ) + " days") || ""}
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <hr></hr>
          {props.tenders / 10 > 0 && (
            <div className={classes.rootPagination}>
              <Pagination
                align="center"
                count={props.tenders / 10}
                variant="outlined"
                shape="rounded"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    tenders: store.tender.tenders,
    profile: store.user.profile,
    userCategory: store.user.userCategory,
  };
};

const mapDispatchToProps = {
  getAllTender,
  getProfile,
  getUserCategory,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserTender);
