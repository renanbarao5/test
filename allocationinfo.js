import {
  AppBar,
  Button,
  Grid,
  Link,
  Modal,
  Paper,
  Tab,
  Tabs,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress";
import Description from "@material-ui/icons/Description"
import Breadcrumbs from "@material-ui/lab/Breadcrumbs"
import CWEInput from "../ui/fields/cweinput"
import PDFViewer from "../ui/imageviewer/cwepdfviewer"
import PropTypes from "prop-types"
import React, { Component } from "react"
import {
  Card,
  CardBody,
  Col,
  Row,
} from "reactstrap"
import Utility from "../common/utility"
import HistoryList from "../history/historylist"

const Auth = require("../../module/auth.js")();
const Backend = require("../../backend_wrapper/backend_express.js")();


const styles = theme => ({
  tab: {
    color: "#fff",
    background: "#245f77",
  },
  breadCrumbs: {
    padding: 10
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
  },
  breadCrumbsLink: {
    cursor: "pointer"
  },
  divButton: {
    float: "right",
    marginTop: "10px",
    marginBottom: "10px",
  },
  actionButton: {
    marginRight: "20px",
  },
  appBar: {
    position: "relative",
  },
  datatablePadding: {
    paddingLeft: "0%",
    paddingRight: "0%",
  },
  addButton: {
    float: "right",
    margin: theme.spacing.unit,
    marginRight: 15,
  },
  tabLabel: {
    fontSize: 15,
  }
});


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


class AllocationInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseForm: {
        employeeId: {
          elementType: "select",
          elementConfig: {
            label: "Employee ID",
            options: [
              {value: "", label: ""},
            ]
          },
          editable: true,
          value: "",
          validation: {
            required: true,
          },
          valid: true,
          touched: false,
        },
        projectId: {
          elementType: "select",
          elementConfig: {
            label: "Project ID",
            options: [
              {value: "", label: ""},
            ]
          },
          editable: true,
          value: "",
          validation: {
            required: true,
          },
          valid: true,
          touched: false,
        },
        year: {
          elementType: "number",
          elementConfig: {
            placeholder: "Enter Year",
            label: "Year",
          },
          editable: true,
          value: "",
          validation: {
            required: true,
            isNumeric: true,
          },
          valid: true,
          touched: false,
        },
        month: {
          elementType: "number",
          elementConfig: {
            placeholder: "Enter Month",
            label: "Month",
          },
          editable: true,
          value: "",
          validation: {
            required: true,
            isNumeric: true,
          },
          valid: true,
          touched: false,
        },
        manhours: {
          elementType: "number",
          elementConfig: {
            placeholder: "Enter Manhours",
            label: "Manhours",
          },
          editable: true,
          value: "",
          validation: {
            required: true,
            isNumeric: true,
          },
          valid: true,
          touched: false,
        },

      },
      groups: ["Information","History",],
      classInformation: {
        className: "allocation",
        classLabel: "Allocation",
        parentClassName: "",

        entryId: "",
        parentId: "",
      },
      pdfViewerInfo: {
        pdfViewerEnabled: false,
        passFileName: "",
        passfileUrl: ""
      },
      accessRights: {
        canUpdate: false,
        canDelete: false,
      },
      formEnable: false,
      formValid: true,
      value: 0,
      visibleDanger: false,
      dangerMessage: "",
      visible: false,
      visibleLoading: true,
      loadingMessage: "",
      visibleConfirm: false,
      visibleUpdateComplete: false,
      loadError: false,
    };
  }

  componentDidMount = () => {
    if (this.props.userCredentials === null) {
      this.props.history.push("/login");
    } else {
      var canView = this.isUserAuthorized("info");
      if (canView) {
        var { accessRights } = this.state;
        accessRights.canUpdate = this.isUserAuthorized("update");
        accessRights.canDelete = this.isUserAuthorized("delete");
        this.setState({ accessRights: accessRights });
        this.refreshStatus(this.props.match.params.id);
      } else {
        this.props.history.push("/pagenotfound"); // temporary only, this should be to dashboard
      }
    }
  }

  isUserAuthorized = (action) => {
    return Auth.isUserAuthorized(this.props.userCredentials.role, this.state.classInformation.className + "_" + action)
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };


  showConfirmationMessage = () => {
    this.setState(
      {
        visibleLoading: false,
        visibleConfirm: true
      }
    );
  }


  dismissConfirmation = (event) => {
    this.setState({ visibleConfirm: false });
  };


  showDangerMessage = (message, loadError = false) => {
    this.setState(
      {
        visibleLoading: false,
        visibleConfirm: false,
        visibleUpdateComplete: false,
        visibleDanger: true,
        dangerMessage: message,
        loadError: loadError
      }
    );
  };


  dismissDangerMessage = (event) => {
    this.setState({ visibleDanger: false });
    if (this.state.loadError) {
      this.props.history.push("/" + this.state.classInformation.className + "/list");
    }
  };


  showLoadingMessage = (message) => {
    this.setState({
      visibleLoading: true,
      loadingMessage: message
    });
  };


  dismissLoadingMessage = () => {
    this.setState({
      visibleLoading: false,
    });
  };

  showUpdateCompleteMessage = () => {
    this.setState(
      {
        formEnable: false,
        visibleLoading: false,
        visibleUpdateComplete: true
      }
    );
  }

  onUpdateComplete = () => {
    this.setState(
      {
        visibleUpdateComplete: false
      }
    );
    this.refreshStatus(this.state.classInformation.entryId);
  }


  handleUpdateCancel = () => {
    this.setState({formEnable: false});
    this.refreshStatus(this.state.classInformation.entryId);
  };


  onUpdateHandler = async (event) => {
    var { baseForm, groups } = this.state;
    var { value } = this.state;
    if (value >= groups.length - 1) {
      value = 0;
    }
    await this.getUpdateOptions(baseForm);
    this.setState(
      {
        baseForm: baseForm,
        value: value,
        formEnable: true
      }
    );
  }

  getUpdateOptions = async (baseForm) => {
    var retVal;
    var fieldArray = [];
    fieldArray = ["entryId", ];
    retVal = Backend.getAllEntries("employee", fieldArray, []);
    await retVal.then(response => {
      if (response.data) {
        baseForm.employeeId.elementConfig.options = [];
        response.data.forEach( function(element) {
          baseForm.employeeId.elementConfig.options.push({
            value: element.entryId,
            label: element.entryId
          });
        });
        baseForm.employeeId.elementConfig.options.push({
          value: "None",
          label: "None"
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
    fieldArray = ["entryId", ];
    retVal = Backend.getAllEntries("project", fieldArray, []);
    await retVal.then(response => {
      if (response.data) {
        baseForm.projectId.elementConfig.options = [];
        response.data.forEach( function(element) {
          baseForm.projectId.elementConfig.options.push({
            value: element.entryId,
            label: element.entryId
          });
        });
        baseForm.projectId.elementConfig.options.push({
          value: "None",
          label: "None"
        });
      }
    })
    .catch(error => {
      console.log(error);
    });

  }


  onReload = (event) => {
    this.props.history.push("/" + this.state.classInformation.className + "/list/info/" + this.state.classInformation.entryId);
  }


  onDeleteHandler = (event) => {
    var { classInformation } = this.state;

    this.dismissConfirmation();
    this.showLoadingMessage("Deleting entry");

    Backend.deleteEntry(classInformation.className, { entryId: classInformation.entryId })
    .then(response => {
      if (response.status === 200) {
        this.dismissLoadingMessage();
        if (classInformation.parentClassName === "") {
          this.props.history.push("/" + classInformation.className + "/list/");
        } else {
          this.props.history.push("/" + classInformation.parentClassName + "/list/" + classInformation.parentId);
        }
      }
      else {
        throw new Error(response.message);
      }
    })
    .catch(error => {
      console.log(error);
      this.showDangerMessage("Unable to delete entry. " + error.message);
    })
  }

  onSubmit = async (event) => {
    event.preventDefault();
    var { baseForm, classInformation } = this.state;

    //var newForm = { "entryId": classInformation.entryId };
    var newForm = {};
    if (classInformation.parentClassName !== "") {
      newForm = {...newForm, "parentId": classInformation.parentId};
    }
    Utility.prepareForm(baseForm, newForm, false);
    console.log(newForm);
    Utility.uploadAllFiles(baseForm, newForm)
    .then(result => {
      if (!result) {
        throw new Error();
      }
    })
    .then(() => {
      return Backend.updateEntry(classInformation.className, classInformation.entryId, newForm)
    })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.message);
      } else {
        this.showUpdateCompleteMessage();
      }
    })
    .catch(error => {
      this.showDangerMessage("Unable to update entry. " + error.message);
    });
  }

  refreshStatus = async (id) => {
    var { baseForm, pdfViewerInfo, classInformation } = this.state;
    this.showLoadingMessage("Retrieving information...");
    Backend.getEntry(classInformation.className, id)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.message);
      } else {
        return response.data;
      }
    })
    .then(data => {
      return Utility.refreshForm(data, baseForm, pdfViewerInfo);
    })
    .then(data => {
      return Utility.refreshClassInformation(data, classInformation);
    })
    .then(async data => {
      await this.getOptions(baseForm);
      this.setState(
        {
          baseForm: baseForm,
          pdfViewerInfo: pdfViewerInfo,
          classInformation: classInformation
        }
      );
      this.dismissLoadingMessage();
    })
    .catch(error => {
      console.log(error);
      this.showDangerMessage("Unable to retrieve entry. " + error.message);
    });
  }


  inputClickedHandler = async (event, inputIdentifier) => {
    event.stopPropagation();
    var { baseForm, pdfViewerInfo } = this.state;
    Utility.elementOnClickHandler(baseForm[inputIdentifier], pdfViewerInfo)
    .catch(error => {
      console.log(error.message);
      this.showDangerMessage(error.message);
    });
  }


  inputChangedHandler = (event, inputIdentifier) => {
    var { baseForm, formValid } = this.state;
    Utility.elementOnChangeHandler(event, inputIdentifier, baseForm, formValid);
    this.setState({
      baseForm: baseForm,
      formValid: formValid,
    });
  }


  getOptions = async (baseForm) => {

  }


  showTabContent = (classes, startIndex, endIndex) => {
    const { baseForm, formEnable } = this.state;
    const formElementsArray = [];

    Object.keys(baseForm).slice(startIndex, endIndex + 1).forEach(element => {
      formElementsArray.push({
        id: element,
        config: baseForm[element],
      })
    })

    const content = (
      formElementsArray.map(formElement => (
        <CWEInput
          key={formElement.id}
          pageType="update"
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          editable={formEnable? formElement.config.editable: false}
          elementValue={formElement.config.value}
          isValid={formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
          clicked={(event) => this.inputClickedHandler(event, formElement.id)} />
      ))
    );

    let tabContent = (
      <div className="tab-contents-padding">
        <form id="formId"
          className="form-add"
          validate="true"
          autoComplete="off"
          onSubmit={this.onSubmit}>
          <table hover="true" striped="true" responsive="true" className="table-info">
            <tbody>
              {content}
            </tbody>
          </table>
        </form>
      </div>
    );

    if (!formEnable) {
      tabContent = (
        <div className="tab-contents-padding">
          <table hover="true" striped="true" responsive="true" className="table-info">
            <tbody>
              {content}
            </tbody>
          </table>
        </div>
      );

    }

    return(
      <>
       {tabContent}
      </>
      );
  }


  showActionButton = (classes) => {
    const { accessRights, formEnable } = this.state;
    if (formEnable) {
      return (
        <div className={classes.divButton}>
          <Button
            onClick={this.handleUpdateCancel}
            className={classes.actionButton}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={this.onSubmit}
            className={classes.actionButton}
            disabled={!this.state.formValid}>
            Save
          </Button>
        </div>
      );

    }
    else {
      let deleteButton = null;
      let updateButton = null;
      if (accessRights.canDelete) {
        deleteButton = (
          <Button
            variant="contained"
            color="secondary"
            type="button"
            className={classes.actionButton}
            onClick={this.showConfirmationMessage}>
           Delete
          </Button>
        );
      }
      if (accessRights.canUpdate) {
        updateButton = (
          <Button
            variant="contained"
            color="primary"
            type="button"
            className={classes.actionButton}
            onClick={this.onUpdateHandler}>
            Update
         </Button>
        );
      }
      return (
        <div className={classes.divButton}>
          {deleteButton}
          {updateButton}
        </div>
      )
    }
  }


  render() {
    const { classes } = this.props;
    const { value, formEnable, classInformation, pdfViewerInfo, groups } = this.state;

    return (
      <div className="testtest animated fadeIn">
        <Grid className="nav-page-core" justify="center" container>
          <Grid item xs={12} md={12}>
            <Breadcrumbs className={classes.breadCrumbs} aria-label="Breadcrumb">
              <Link color="inherit" onClick={() => this.props.history.push("/" + classInformation.className + "/list")}  className={classes.breadCrumbsLink}>
                {classInformation.classLabel} List
              </Link>
              <Typography color="textPrimary">{classInformation.classLabel} #{classInformation.entryId} </Typography>

            </Breadcrumbs>
          </Grid>
        </Grid>
        <Row className="row-padding view-info-padding">
          <Col sm="12">
            <Card className="card-prd">
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.visibleConfirm}
              >
                <div style={Utility.getModalStyle()} className={classes.paper}>
                  <Typography variant="h6" id="modal-title">
                    Warning
                  </Typography>
                  <Typography variant="subtitle1" id="simple-modal-description">
                    Are you sure you want to delete this item?
                  </Typography>
                  <br/>
                  <Button
                    variant="contained"
                    onClick={this.dismissConfirmation}
                    color="default"
                    className={classes.button}
                  >
                  No
                  </Button>
                  &nbsp;
                  <Button
                    variant="contained"
                    onClick={this.onDeleteHandler}
                    color="secondary"
                    className={classes.button}
                  >
                  Yes
                  </Button>
                </div>
              </Modal>
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
                open={this.state.visibleUpdateComplete}
              >
                <div style={Utility.getModalStyle()} className={classes.paper}>
                  <Typography variant="h6" id="modal-title">
                    Success
                  </Typography>
                  <Typography variant="subtitle1" id="simple-modal-description">
                    Successfully updated information
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={this.onUpdateComplete}
                    color="primary"
                    className={classes.button}
                  >
                  Close
                  </Button>
                </div>
              </Modal>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.visibleDanger}
              >
                <div style={Utility.getModalStyle()} className={classes.paper}>
                  <Typography variant="h6" id="modal-title">
                    Error
                  </Typography>
                  <Typography variant="subtitle1" id="simple-modal-description">
                    {this.state.dangerMessage}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.dismissDangerMessage}
                    className={classes.button}
                  >
                  Close
                  </Button>
                </div>
              </Modal>
              <CardBody>
                <div className={classes.root}>
                  <Grid container spacing={8}>
                    <Grid alignItems="center" justify="space-between" container>
                      <Grid item xs={6}>
                        <h2 className="font-style-h2">&nbsp;&nbsp;&nbsp;{classInformation.classLabel} #{classInformation.entryId}</h2>
                      </Grid>
                      <Grid item xs={6}>
                        {this.showActionButton(classes)}
                      </Grid>
                    </Grid>
                    <Grid item xs={pdfViewerInfo.pdfViewerEnabled ? 8 : 12}>
                      <AppBar position="static" color="default" className="tab-view-prd">
                        <Tabs
                          value={value}
                          scrollButtons="on"
                          onChange={this.handleTabChange}
                          variant="fullWidth"
                          indicatorColor="primary"
                          textColor="primary"
                          inkbarstyle={{ background: "#fff" }}
                        >
                          <Tab label={<span className={classes.tabLabel}>{groups[0]}</span>} />
                          {!formEnable && <Tab label={<span className={classes.tabLabel}>{groups[1]}</span>} />}
                        </Tabs>
                      </AppBar>
                      <Paper className={classes.padding}>
                        {value === 0 && <TabContainer padding={24}>
                          <div className="tab-contents-padding">
                            {this.showTabContent(classes, 0, 4)}
                          </div>
                        </TabContainer>}
                        {value === 1 && <TabContainer padding={0}>
                          <HistoryList sub={true} classID={classInformation.entryId} history={this.props.history} userCredentials={this.props.userCredentials}/>
                        </TabContainer>}
                      </Paper>
                    </Grid>
                    {pdfViewerInfo.pdfViewerEnabled && <Grid item xs={4}>
                      <PDFViewer filename={pdfViewerInfo.passFileName} fileUrl={pdfViewerInfo.passfileUrl} />
                    </Grid>}
                  </Grid>
                </div>
              </CardBody>

            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}


AllocationInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AllocationInfo);