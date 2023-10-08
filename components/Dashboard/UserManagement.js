import React, { useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getAllUsers } from "../../redux/actions/user";
import moment from "moment";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  root: {
    width: "100%",
  },
});

function CustomizedTables({ users, getAllUsers, props }) {
  const classes = useStyles();
  useEffect(() => {
    async function fetchMyAPI() {
      await getAllUsers();
    }
    fetchMyAPI();
  }, []);

  function createData(id, name, email, userType, isConfirmed, createdAt, planName, startPlan, renew) {
    return { id, name, email, userType, isConfirmed, createdAt, planName, startPlan, renew };
  }

  const rows = users.map((item) => {
    return createData(
      item._id,
      item.firstName,
      item.email,
      item.isAdmin ? "Admin" : "User",
      item.isConfirmed ? "Yes" : "No",
      moment(item.createdAt).format("DD MMM YYYY", "x"),
      item.planName,
      item.startPlan,
      item.renew
    );
  });

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">E-Mail</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
              <StyledTableCell align="center">Plan</StyledTableCell>
              <StyledTableCell align="center">Last Renewed</StyledTableCell>
              <StyledTableCell align="center">Expiry Date</StyledTableCell>
              <StyledTableCell align="center">Confirmed</StyledTableCell>
              <StyledTableCell align="right">Created At</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.userType}</StyledTableCell>

                <StyledTableCell align="center">
                  <IconButton aria-label="manage-listing">
                    <Link legacyBehavior href={`./edit-page/${row.id}`}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title="Delete User">
                    <IconButton aria-label="manage-listing">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell align="center">{row.planName}</StyledTableCell>
                <StyledTableCell align="center">{new Date(row.startPlan).getDate()}/{new Date(row.startPlan).getMonth()} / {new Date(row.startPlan).getFullYear()}


                </StyledTableCell>
                <StyledTableCell align="center">
                  {
                    moment
                      .unix(row.renew)
                      .local()
                      .format("MM/DD/YYYY") ||
                    ""}


                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.isConfirmed}
                </StyledTableCell>
                <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <hr></hr>

      {/* <Button
  onClick={() => props.selectedComponent("default")}
  color="primary"
  variant="contained"
  autoFocus
>
  Back to Control Panel
</Button>   */}
    </div >
  );
}

const mapStateToProps = (store) => {
  return {
    users: store.user.users,
  };
};

const mapDispatchToProps = {
  getAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedTables);
