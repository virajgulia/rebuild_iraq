import moment from "moment-timezone"
import { connect, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getAllTender } from "../../redux/actions/tender";
import {getTotalTender } from '../../redux/actions/tender';
import {
  Box,
  Grid,
  Button,
  Select,
  MenuItem,
  Container,
  InputLabel,
  Typography,
  FormControl,
} from "@material-ui/core";
import { getProfile } from "../../redux/actions/user";
import router from "next/router";

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

const AllListings = (props) => {
  const [listTenders, setlistTenders] = useState([]);
  const [allTenders, setAllTenders] = useState([]);
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [listcompany, setListCompany] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [sortlist, setSortlist] = useState(false);
  const [pageIndex,setPageIndex] = useState(1)
  const [sortlistbyexpires, setSortlistbyexpires] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false)
  const classes = useStyles();

  useEffect(() => {
    
    let search = localStorage.getItem("search");
    if (search !== null && search !== undefined) {
      props.getAllTender(search);
    } else {
      props.getAllTender(undefined,pageIndex);
    }
    // console.log('okokookoookok')
  }, [pageIndex]);

  useEffect(()=>{
props.getTotalTender()
  },[])

  const userProfile = useSelector((state) => state.user.profile);
  const tenderCount = useSelector(state=>state.tender.totalTenders)

  useEffect(() => {
    async function one() {
      await props.getProfile()
      if (userProfile !== null) {
        console.log(userProfile.renew)
        let ee = new Date().getTime()
        if (moment(userProfile.renew * 1000).isSameOrBefore(ee, "day") && !userProfile.isAdmin) {
          router.push("/required-user");
        }
        else {
          setIsSubscribed(true)
        }
      }
    }
    one()

  }, [props])

  useEffect(() => {
    if (props.tenders.tenders) {
      const tenders = props.tenders.tenders;
      const data = tenders.sort((a, b) => {
        return moment(b.createdAt) - moment(a.createdAt);
      });
      setlistTenders(data);
      setAllTenders(data);
    }
  }, [props.tenders.tenders, dataList]);

  useEffect(() => {

    const fetchListCompany =
      allTenders &&
      allTenders.map((item) => item.company && item.company.country);
    const removeDuplicates = (data) => {
      return [...new Set(data)];
    };
    const newFetchListCompany = removeDuplicates(fetchListCompany);
    setListCompany(newFetchListCompany);
    const fetchListCategory =
      allTenders &&
      allTenders.map(
        (item) => item.categories && item.categories.map((item1) => item1.title)
      );
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
    if (company || category) {
      const filterThisTwo = [];
      allTenders.map((item) => {
        if (item.company) {
          if (item.company.country) {
            if (
              item.company.country === company &&
              item.categories.some((i) => i.title === category)
            ) {
              filterThisTwo.push(item);
            }
          }
        }
      });
      setlistTenders(filterThisTwo);
    }
    if (company && !category) {
      const filterThisCompany = [];
      allTenders.map((item) => {
        if (item.company) {
          if (item.company.country) {
            if (item.company.country === company) {
              filterThisCompany.push(item);
            }
          }
        }
      });
      setlistTenders(filterThisCompany);
      setCompany("");
    }
    if (category && !company) {
      const filterThisCategory = [];
      allTenders.map((item) => {
        if (item.company) {
          if (item.company.country) {
            if (item.categories.some((i) => i.title === category)) {
              filterThisCategory.push(item);
            }
          }
        }
      });
      setlistTenders(filterThisCategory);
      setCategory("");
    }
  };

  const handleRemoveFilterButton = () => {
    localStorage.removeItem("search");
    setCompany("");
    setCategory("");
    props.getAllTender();
  };

  return (
    <div className="all-tenders-page">
      <div className="container all-tenders-content">
        <div className="tenders-greeting">
          <h5 style={{ margin: "auto" }}>Available Tenders</h5>
          <Box alignItems="center" className="select-filter">
            <FormControl
              variant="filled"
              style={{ width: "142px" }}
              className={classes.formControl}
            >
              <InputLabel>All-Locations</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={company}
                onChange={handleChangeCompany}
              >
                {listcompany &&
                  listcompany.sort().map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl
              variant="filled"
              style={{ width: "120px" }}
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={category}
                onChange={handleChangeCategory}
              >
                {listCategory &&
                  listCategory.sort().map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Box className="button-two">
              <Button
                onClick={handleFilterButton}
                variant="contained"
                color="primary"
              >
                Filter
              </Button>
              <Button
                onClick={handleRemoveFilterButton}
                variant="contained"
                color="secondary"
              >
                Clear
              </Button>
            </Box>
          </Box>
        </div>

        <hr />

        <Container className="tender_header_sec">
          <Grid container spacing={2}>
            <Grid item md={2}>
              <Typography>
                <b>Date Added</b>
              </Typography>
            </Grid>
            <Grid item md={8}>
              <Typography>
                <b>Tender Details</b>
              </Typography>
            </Grid>
            <Grid item md={2}>
              <Typography>
                <b>Expires</b>
              </Typography>
            </Grid>
          </Grid>
          <hr />
        </Container>
        {isSubscribed ?
          <>
            {listTenders &&
              listTenders.map((item, index) => {
                return (
                  <Container key={index}>
                    <Grid container spacing={2}>
                      <Grid item md={2}>
                        <Typography>
                          <b>
                            <span>
                              {(item.createdAt &&
                                moment(item.createdAt).format("DD")) ||
                                ""}
                            </span>
                            &nbsp;
                            <span>
                              {(item.createdAt &&
                                moment(item.createdAt).format("MMM")) ||
                                ""}
                            </span>
                            &nbsp;
                            <span>
                              {(item.createdAt &&
                                moment(item.createdAt).format("YYYY")) ||
                                ""}
                            </span>
                          </b>
                        </Typography>
                      </Grid>
                      <Grid item md={8}>
                        <a href={`/tenders/${item.slug}`}>
                          <Typography>{item.tenderTitle || ""}</Typography>
                        </a>
                      </Grid>
                      <Grid item md={2}>
                        <div
                          className={`days-until-expiration${moment(item.dueDate).isSameOrBefore(currentDate, "day")
                            ? " expiration-red"
                            : ""
                            }`}
                        >
                          {(moment(item.dueDate).isSameOrBefore(currentDate, "day")
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
                      </Grid>
                    </Grid>
                    <hr />
                  </Container>
                );
              })}
          </> : null}
          <Grid container style={{height:'50px',background:'lightgray'}} className="d-flex justify-content-between align-items-center">
            {/* <div style={{fontSize:'14px',fontWeight:'500'}}><span className="border p-1 mr-1">1</span><span className="border p-1 mr-1">2</span><span className="border p-1 mr-1">3</span>........<span className="border p-1">{Math.round(tenderCount/50)}</span></div> */}
           <div className="px-2">
           <label className="mr-1" style={{fontSize:'14px',fontWeight:'500'}}>Select Page - </label>
            <select className="py-2" onChange={(e)=>setPageIndex(+(e.target.value))} style={{border:'1px solid lightgray'}}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value={Math.round(tenderCount/50)}>{Math.round(tenderCount/50)}</option>
            </select>
           </div>
            <div className=" d-flex justify-content-end align-items-center px-2" > 
            <div style={{fontSize:'14px',fontWeight:'500'}}>{pageIndex===1?'1':(pageIndex-1)*50} to {tenderCount - (pageIndex*50) + 50 < 50 ? tenderCount: 50*pageIndex}</div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div style={{fontSize:'14px',fontWeight:'500'}}>Total - { tenderCount}</div>
              <button className="btn btn-sm" disabled={pageIndex === 1?true:false} style={{fontSize:'25px',fontWeight:'600',marginRight:'20px'}} onClick={()=>setPageIndex(pageIndex-1)}>{`<<`}</button>
              <button className="btn btn-sm" disabled={tenderCount - (pageIndex*50) + 50 < 50?true:false} style={{fontSize:'25px',fontWeight:'600'}} onClick={()=>setPageIndex(pageIndex+1)}>{`>>`}</button>
              </div>
              
          </Grid>

      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    tenders: store.tender.tenders,
  };
};

const mapDispatchToProps = {
  getAllTender,
  getProfile,
  getTotalTender,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllListings);
