import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import CWEInput from "../ui/fields/cweinput";
import PropTypes from "prop-types";
import {
  Button,
  Grid,
  Modal,
  Paper,
  Step,
  Stepper,
  StepConnector,
  StepLabel,
  Typography
} from "@material-ui/core";
import React, { Component } from "react";
import {
  Col,
  Row,
} from "reactstrap";
import Utility from "../common/utility"

const Auth = require("../../module/auth.js")();
const Backend = require("../../backend_wrapper/backend_express.js")();

const styles = theme => ({
  root: {
  },
  formLabel: {
    marginTop: 8,
    marginLeft: 8,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  div: {
    marginTop: 8,
    marginLeft: 7,
    fontSize: 13,
    width: "100%",
  },
  button: {
    marginTop: 8,
    marginLeft: 8,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  connectorActive: {
    "& $connectorLine": {
      borderColor: theme.palette.secondary.main,
    },
  },
  connectorCompleted: {
    "& $connectorLine": {
      borderColor: theme.palette.primary.main,
    },
  },
  connectorDisabled: {
    "& $connectorLine": {
      borderColor: theme.palette.grey[100],
    },
  },
  connectorLine: {
    transition: theme.transitions.create("border-color"),
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
  },
});

function getSteps() {
  return [
    "Information",
    "Review",

  ];
}


class AllocationAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseForm: {
        employeeId: {
          elementType: "select",
          elementConfig: {
            label: "Employee ID",
            options: [
              { value: "", label: "" },
            ],
          },
          editable: true,
          value: "",
          validation: {
            required: true,
          },
          valid: true,
          touched: false
        },
        projectId: {
          elementType: "select",
          elementConfig: {
            label: "Project ID",
            options: [
              { value: "", label: "" },
            ],
          },
          editable: true,
          value: "",
          validation: {
            required: true,
          },
          valid: true,
          touched: false
        },
        year: {
          elementType: "number",
          elementConfig: {
            label: "Year",
            placeholder: "Enter Year"
          },
          editable: true,
          value: "",
          validation: {
            required: true,
            isNumeric: true
          },
          valid: true,
          touched: false
        },
        month: {
          elementType: "number",
          elementConfig: {
            label: "Month",
            placeholder: "Enter Month"
          },
          editable: true,
          value: "",
          validation: {
            required: true,
            isNumeric: true
          },
          valid: true,
          touched: false
        },
        manhours: {
          elementType: "number",
          elementConfig: {
            label: "Manhours",
            placeholder: "Enter Manhours"
          },
          editable: true,
          value: "",
          validation: {
            required: true,
            isNumeric: true
          },
          valid: true,
          touched: false
        },

      },
      classInformation: {
        parentClassName: "",
        className: "allocation",
        classLabel: "Allocation",
      },
      activeStep: 0,
      visibleDanger: false,
      visibleLoading: false,
      loadingMessage: "Submitting...",
    };
    this.isStepSubmit = step => step === getSteps().length - 1;
  }

  componentDidMount = async () => {
    if (this.props.userCredentials === null) {
      this.props.history.push("/login");
    } else {
      var canAdd = this.isUserAuthorized("add");
      if (canAdd) {
        var { baseForm } = this.state;
        await this.getOptions(baseForm);
        this.setState({ baseForm: baseForm });
      } else {
        this.props.history.push("/pagenotfound"); // temporary only, this should be to dashboard
      }
    }
  }

  isUserAuthorized = (action) => {
    return Auth.isUserAuthorized(this.props.userCredentials.role, this.state.classInformation.className + "_" + action)
  }

  getOptions = async (baseForm) => {
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


  getStepContent = step => {
    const { classes } = this.props;
    switch(step){
      case 0:
        var group0Info = this.groupStates(0,4);
        var group0Content = this.generateContent(group0Info, true);
        return (
          <form id="group0Id"
            className="form-add"
            validate="true"
            autoComplete="off"
            onSubmit={(event) => this.handleNext(event, group0Info)}>
            <table hover="true" striped="true" responsive="true" className="table-info">
              <tbody>
                {group0Content}
              </tbody>
            </table>
            <Button
              disabled
              onClick={this.handleBack}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Next
            </Button>
        </form>
      );
      case 1:
        var review = this.groupStates(0,5);
        var reviewContent = this.generateContent(review, false);
        return (
          <table hover="true" striped="true" responsive="true" className="table-info">
            <tbody>
              {reviewContent}
            </tbody>
          </table>
        );
      default:
        return "Unknown step";
    }

  }

  groupStates = (startIndex, endIndex) => {
    var formElementsArray = [];
      Object.keys(this.state.baseForm).slice(startIndex, endIndex + 1).forEach(element => {
        formElementsArray.push({
          id: element,
          config: this.state.baseForm[element],
        })
      })
    return formElementsArray;
  }

  generateContent = (formElementsArray, toggleEditable) => {
    var content = (formElementsArray.map(formElement => (
      <CWEInput
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        editable={toggleEditable ? formElement.config.editable : false}
        elementValue={formElement.config.value}
        isValid={formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        clicked={(event) => this.inputClickedHandler(event, formElement.id)} />
    )))
    return content;
  }


  inputClickedHandler = (event, inputIdentifier) => {
    event.stopPropagation();
    /* do nothing for now */
  }


  inputChangedHandler = (event, inputIdentifier) => {
    var { baseForm } = this.state;
    var formValid = false;
    Utility.elementOnChangeHandler(event, inputIdentifier, baseForm, formValid);
    this.setState({
      baseForm: baseForm
    });
  }

  handleNext = (event, formElementsArray) => {
    var errorFlag = false;

    event.preventDefault();
    formElementsArray.forEach(formElement => {
        if ((formElement.config.validation.required && formElement.config.value === "") && formElement.config.elementType !== "checkbox") {
          var { baseForm} = this.state;
          baseForm[formElement.id].valid = false;

          this.setState({baseForm: baseForm})
          errorFlag = true;
        }
    });

    if (!errorFlag) {
      const { activeStep } = this.state;
      this.setState({
        activeStep: activeStep + 1,
      });
    }
  };


  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  onDismissDanger = () => {
    this.setState({ visibleDanger: false });
  };
  
  toggleVisibleDanger = () => {
    this.setState({ visibleDanger: !this.state.visibleDanger, visibleLoading: false });
  };

  showLoadingMessage = (message) => {
    this.setState({
      visibleLoading: true,
      loadingMessage: message
    });
  };

  dismissLoadingMessage = () => {
    this.setState({ visibleLoading: false });
  };
  
  onSubmit = async (event) => {
    event.preventDefault();
    this.submitForm(false);
  }

  onSubmitAndContinue = async (event) => {
    event.preventDefault();
    this.submitForm(true);
  }

  submitForm = async (submitAgain) => {
    this.showLoadingMessage("Submitting...");
    var { baseForm, classInformation } = this.state;
    var newForm = {};
    if (classInformation.parentClassName !== "") {
      newForm = { "parentId": this.props.match.params.id, ...newForm };
    }
    Utility.prepareForm(baseForm, newForm, true);
    Utility.uploadAllFiles(baseForm, newForm)
    .then(result => {
      if (!result) {
        throw new Error();
      }
    })
    .then(() => {
      return Backend.addEntry(classInformation.className, newForm);
    })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.message);
      } else {
        return response.data;
      }
    })
    .then(data => {
      this.dismissLoadingMessage();
      if (submitAgain) {
        for (let key in baseForm) {
          baseForm[key].valid = true;
          baseForm[key].value = "";
          baseForm[key].touched = false;
        }
        this.setState({ baseForm: baseForm, activeStep: 0})
      } else {
        this.props.history.push("/" + classInformation.className + "/info/" + data.ID);
      }
    })
    .catch(error => {
      console.log(error.message);
      this.toggleVisibleDanger();
    });
  }
  

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, classInformation } = this.state;
    const connector = (
      <StepConnector
        classes={{
          active: classes.connectorActive,
          completed: classes.connectorCompleted,
          disabled: classes.connectorDisabled,
          line: classes.connectorLine,
        }}
      />
    );
    return (
      <div className={classes.root}>
        <Grid className="nav-page-core" justify="center" container>
          <Grid item xs={12} md={12}>
            <p>Add {classInformation.classLabel}</p>
          </Grid>
        </Grid>
        <br />
        <Row className="row-padding">
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.visibleDanger}
            onClose={this.toggleVisibleDanger}
          >
            <div style={Utility.getModalStyle()} className={classes.paper}>
              <Typography variant="h6" id="modal-title">
                Error
              </Typography>
              <Typography variant="subtitle1" id="simple-modal-description">
                Failed to add a {classInformation.classLabel}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onDismissDanger}
                className={classes.button}
              >
                Close
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
          <Col sm="12">
            <Stepper position="static" activeStep={activeStep} connector={connector}>
              {steps.map((label, index) => {
                const props = {};
                const labelProps = {};
                return (
                  <Step key={label} {...props}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you "re finished
                    </Typography>
                  <Button onClick={this.handleReset} className={classes.button}>
                    Reset
                    </Button>
                </div>
              ) : (
                  <div>
                    <Paper className="form-add-paper" elevation={10}>
                      {this.getStepContent(activeStep)}
                      {this.isStepSubmit(activeStep) && (
                        <Button
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                      )}
                      {this.isStepSubmit(activeStep) && (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={this.onSubmit}
                          className={classes.button}
                        >
                          Submit
                        </Button>
                      )}
                      {this.isStepSubmit(activeStep) && (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={this.onSubmitAndContinue}
                          className={classes.button}
                        >
                          Submit and continue
                        </Button>
                      )}
                    </Paper>
                  </div>
                )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

AllocationAdd.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AllocationAdd);
