import CWEDatatable from "../ui/datatable/cwedatatable";
import React, { Component } from "react";
import {
  Fab,
  Button,
  Grid,
  Modal,
  Typography,
} from "@material-ui/core";
import Utility from "../common/utility"
import { withStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"
import CircularProgress from "@material-ui/core/CircularProgress";
const Auth = require("../../module/auth.js")();
const Backend = require("../../backend_wrapper/backend_express.js")();

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
  }
});


class AllocationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      elementType: 'datatable',
      label: 'Allocation',
      columns: [
        {
          name: "Entry ID",
          key: "entryId",
          options: {
            filter: true,
            sort: true,
            display:true,
            filterList: [],
          }
        },
        {
          name: "Employee ID",
          key: "employeeId",
          options: {
            filter: true,
            sort: true,
            display:true,
            filterList: [],
          }
        },
        {
          name: "Project ID",
          key: "projectId",
          options: {
            filter: true,
            sort: true,
            display:true,
            filterList: [],
          }
        },
        {
          name: "Year",
          key: "year",
          options: {
            filter: true,
            sort: true,
            display:true,
            filterList: [],
          }
        },
        {
          name: "Month",
          key: "month",
          options: {
            filter: true,
            sort: true,
            display:true,
            filterList: [],
          }
        },
        {
          name: "Manhours",
          key: "manhours",
          options: {
            filter: true,
            sort: true,
            display:true,
            filterList: [],
          }
        },

      ],
      data: [[]],
      className: "allocation",
      parentClassName: "",
      canAdd: false,
      visibleLoading: false,
      loadingMessage: "",
      visibleError: false,
      errorMessage: "",
      trackingInformation: {

      }
    };
  }


  componentDidMount() {
    if (this.props.userCredentials === null) {
      this.props.history.push("/login");
    } else {
      var canList = this.isUserAuthorized("list");

      if (canList) {
        var params = [];
        var rowDataTables = [];
        var { trackingInformation } = this.state;
        this.setState({ visibleLoading: true });
        if (this.props.hasOwnProperty("data")) {
          this.fillDataTable(this.props.data, rowDataTables, trackingInformation);
          this.setState(
            {
              data: rowDataTables,
              visibleLoading: false,
              canAdd: this.isUserAuthorized("add"),
              trackingInformation: trackingInformation
            }
          );
        } else {
          if (this.props.hasOwnProperty("parentId")) {
            params.push({ "parentId": this.props.parentId });
          }
          if (this.props.hasOwnProperty("location") && this.props.location.search !== "") {
            var queries = this.props.location.search.replace("?", "").split("&");
            queries.forEach(function (query) {
              console.log(query);
              if (query.length > 0 && query.includes("=")) {
                var queryTokens = query.split("=");
                params.push({ [queryTokens[0]]: queryTokens[1] });
              }
            });
          }
          Backend.getAllEntries(this.state.className, [], params)
            .then(response => {
              if (response.status === 200) {
                this.fillDataTable(response.data, rowDataTables, trackingInformation);
                this.setState(
                  {
                    data: rowDataTables,
                    visibleLoading: false,
                    canAdd: this.isUserAuthorized("add"),
                    trackingInformation: trackingInformation
                  }
                );
              } else {
                this.setState(
                  {
                    errorMessage: "Unable to retrieve entries.",
                    visibleError: true,
                    visibleLoading: false,
                  }
                );
              }
            })
            .catch(function (error) {
              console.log(error);
              this.setState(
                {
                  errorMessage: error,
                  visibleError: true,
                  visibleLoading: false,
                }
              );
            });
        }
      } else {
        this.props.history.push("/pagenotfound"); // temporary only, this should be to dashboard
      }
    }
  }

  isUserAuthorized = (action) => {
    return Auth.isUserAuthorized(this.props.userCredentials.role, this.state.className + "_" + action)
  }


  fillDataTable = (data, rowDataTables, trackingInformation) => {
    trackingInformation = {};
    if (data.length) {
      const { columns } = this.state;
      data.map(function (currentData, i) {
        var tempArray = [];
        for (var index = 0; index < columns.length; index++) {
          if (currentData.hasOwnProperty(columns[index].key)) {
            if (columns[index].hasOwnProperty("file") && columns[index].file) {
              tempArray = [...tempArray, currentData[columns[index].key].fileName];
            } else {
              tempArray = [...tempArray, currentData[columns[index].key]];
            }

          }
        }
        rowDataTables.push(tempArray);
        return (<></>);
      });
    }
  }

  showAddButton = () => {
    if (this.state.canAdd) {
     return (
        <Fab
         left='20'
         variant="extended"
         size="small"
         color="primary"
         aria-label="Add"
         className="btn-right-prd"
         onClick={() => this.props.history.push("/" + this.state.className + "/add/" + this.props.parentId)}>
          +  {this.state.label}&nbsp;&nbsp;
        </Fab>
      )
   }
 }

  renderDashboard() {
    const { trackingInformation } = this.state;
    return (
      null
    );
  }

  render() {
    const { classes } = this.props;
    const { parentClassName } = this.state;
    var sub = false;
    if (this.props.hasOwnProperty("sub")) {
      sub = this.props.sub;
    }
    var options = {
      viewColumns: false,
      responsive: "scroll",
      filter: true,
      filterType: "dropdown",
      rowsPerPageOptions: [5, 10, 15, 20, 50, 100],
      downloadOptions: {filename: "list.csv", separator: ","},
      selectableRows: false,
      fixedHeader: true,
      onRowClick: (rowIndex) => this.props.history.push("/" + this.state.className + "/info/" + rowIndex[0]),
      textLabels: {
        toolbar: {
          search: "Search",
        },
      },
    };
    var elementConfig = {
      data: this.state.data,
      label: this.state.label + " List",
      columns: this.state.columns,
      options: options,
    }
    return (
      <div className="animated fadeIn">
        {parentClassName === "" && !sub && <Grid className="nav-page-core" justify="center" container>
          <Grid item xs={12} md={12}>
            <p>&nbsp;&nbsp;{this.state.label} List</p>
          </Grid>
        </Grid>}
        {this.renderDashboard()}
        {this.showAddButton()}
        <CWEDatatable
          elementConfig={elementConfig}
          history={this.props.history}
        />
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.visibleLoading}
        >
          <div style={Utility.getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="simple-modal-description">
              <center><CircularProgress disableShrink /></center>
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              <center>{this.state.loadingMessage}</center>
            </Typography>
          </div>
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.visibleError}
        >
          <div style={Utility.getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Error
                  </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              <center>{this.state.errorMessage}</center>
                  </Typography>
            <Button
              variant="contained"
              onClick={() => this.setState({visibleError: false})}
              color="primary"
              className={classes.button}
            >
              Close
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

AllocationList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllocationList);