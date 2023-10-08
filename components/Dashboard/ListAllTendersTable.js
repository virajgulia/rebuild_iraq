import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControlLabel,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const columns = [
  { field: "id", hide: true },
  { field: "tenderTitle", headerName: "Title", width: 200 },
  { field: "tenderValue", headerName: "Value", width: 150 },
  {
    field: "tenderDetail",
    headerName: "Detail",
    width: 325,
  },
  // {
  //   field: "tenderURL",
  //   headerName: "URL", width: 150
  // },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 175,
  },
  {
    field: "actions",
    headerName: "Action",
    with: 120,
  },
];

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const headCells = [
  {
    id: "tenderTitle",
    numeric: false,
    disablePadding: true,
    label: "Title",
  },
  { id: "tenderValue", numeric: false, disablePadding: false, label: "Value" },
  {
    id: "tenderDetail",
    numeric: false,
    disablePadding: false,
    label: "Detail",
  },
  { id: "dueDate", numeric: false, disablePadding: false, label: "Due Date" },
  { id: "startdate", numeric: false, disablePadding: false, label: "Start Date" },
  { id: "action", numeric: true, disablePadding: false, label: "Actions" },
];

const EnhancedTableHead = (props) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function DataTable(props) {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate,setStartDate]=useState('');
  const [editID, setEditID] = useState("");
  const [rows, setRows] = useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [isShowDelete, setIsShowDelete] = useState(false);
  // const [deleteId, setDeleteId] = useState(null);
  const [checkedDelete, setCheckedDelete] = useState({
    company: false,
    contact: false,
    tender: false,
  });

  useEffect(() => {
    console.log("kkk", props);
    let newData = [];
    if (props.data.tenders) {
      for (let i = 0; i < props.data.tenders.length; i++) {
        const el = props.data.tenders[i];
        el.id = i + 1;
        newData.push(el);
      }
      setRows(newData);
    }
  }, [props.data]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleChangeCheckboxDelete = (event) => {
    setCheckedDelete({
      ...checkedDelete,
      [event.target.name]: event.target.checked,
    });
  };
  const editData = async (id) => {
    setEditID(id);
    const data = await axios.get(`api/tenders/gettender/${id}`);
    // const details = parse(data.data.tenderDetail);
    setTitle(data.data.tenderTitle);
    setDescription(data.data.tenderDetail);
    // setStartDate()
    console.log(data.data.createdAt)
  };
  const updateTender = async () => {
    const doc = {
      tenderTitle: title,
      tenderDetail: details.value,
    };
    const data = await axios.put(`api/tenders/updateTender/${editID}`, doc);
    // console.log("Data", data);
    setEditID("");
    props.onCloseEdit();
    props.changeEitd();
  };

  const handleConfirmDelete = () => {
    props.onDelete(props.deleteId, {
      isContact: checkedDelete.contact,
      isCompany: checkedDelete.company,
      isTender: checkedDelete.tender,
    });
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    // <div style={{ height: 400, width: "100%" }}>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.tenderTitle}
                      </TableCell>
                      <TableCell align="center">{row.tenderValue}</TableCell>
                      <TableCell align="left">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: row.tenderDetail.substring(0, 175) + "...",
                          }}
                        ></span>
                      </TableCell>

                      <TableCell align="right">
                        {row.dueDate &&
                          moment(row.dueDate).format("MM/DD/YYYY")}
                      </TableCell>

                      <TableCell align="right">
                        {row.dueDate &&
                          moment(row.createdAt).format("MM/DD/YYYY")}
                      </TableCell>

                      <TableCell align="right">
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => {
                            props.onEditRow(row._id);
                            editData(row._id);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">

                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClick={() => props.onDeleteRow(row._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog
        open={props.isShowEdit}
        onClose={props.handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit tender</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Choose which of the following you wish to Edit
          </DialogContentText>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label labelFontSize">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
                <label className='form-label labelFontSize mr-4'>Start Date</label>
                <input type='date' value={startDate}/><br/>
              <label className='form-label labelFontSize mr-4'>Due Date</label>
              <input type='date'/>

            <div className="mb-3">
              <label htmlFor="details" className="form-label labelFontSize">
                Detail
              </label>
              <textarea
                id="details"
                cols="30"
                rows="10"
                className="textArea"
                // dangerouslySetInnerHTML={{
                //   __html: { description },
                // }}
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => updateTender()}
            variant="contained"
            color="secondary"
          >
            Edit
          </Button>
          <Button
            onClick={props.onCloseEdit}
            variant="contained"
            color="default"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={props.isShowDelete}
        onClose={props.onClosePopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete tender</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Choose which of the following you wish to delete
          </DialogContentText>

          {/* <FormControlLabel
            style={{ width: "100%" }}
            value="end"
            control={
              <Checkbox
                value={checkedDelete.company}
                name="company"
                onChange={handleChangeCheckboxDelete}
              />
            }
            label="Company Info"
            labelPlacement="end"
          />

          <FormControlLabel
            style={{ width: "100%" }}
            value="end"
            control={
              <Checkbox
                value={checkedDelete.company}
                name="contact"
                onChange={handleChangeCheckboxDelete}
              />
            }
            label="Contact"
            labelPlacement="end"
          />

          <FormControlLabel
            style={{ width: "100%" }}
            value="end"
            control={
              <Checkbox
                value={checkedDelete.company}
                name="tender"
                onChange={handleChangeCheckboxDelete}
              />
            }
            label="Tender"
            labelPlacement="end"
          /> */}

          <FormControlLabel
            style={{ width: "100%" }}
            value="end"
            control={
              <Checkbox
                value={checkedDelete.company}
                name="tender"
                onChange={handleChangeCheckboxDelete}
              />
            }
            label="Tender"
            labelPlacement="end"
          />
          <FormControlLabel
            style={{ width: "100%" }}
            value="end"
            control={<Checkbox value={checkedDelete.company} name="" />}
            label="Categories"
            labelPlacement="end"
          />
          <FormControlLabel
            style={{ width: "100%" }}
            value="end"
            control={<Checkbox value={checkedDelete.company} />}
            label="Subcategories"
            labelPlacement="end"
          />
          <FormControlLabel
            style={{ width: "100%" }}
            value="end"
            control={<Checkbox value={checkedDelete.company} />}
            label="Locations"
            labelPlacement="end"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
          <Button
            onClick={props.onClosePopup}
            variant="contained"
            color="default"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
