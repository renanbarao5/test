import React from "react";
import {
  FormLabel,
  TextField,
  withStyles
} from "@material-ui/core";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

const styles = theme => ({
  actionButton: {
    border: "none",
    background: "none",
    fontFamily: 'Roboto',
    fontWeight: "500",
    fontSize: "16px",
    paddingLeft: "21px"
  },
  validText: {
    paddingLeft: "21px"
  },
  errorText: {
    color: "red",
    paddingLeft: "21px"
  },
  errorLabel: {
    color: "red",
  }
});

function updateDateFormat(inputDate) {
  var outputDate = "";
  if (inputDate) {
    var dateSplit = inputDate.split("T");
    var dateValue = dateSplit[0];
    var dateValueSplit = dateValue.split("-");
    var year = dateValueSplit[0];
    var month = dateValueSplit[1];
    var day = dateValueSplit[2];
    outputDate = year + "-" + month + "-" + day;
  }
  return outputDate;
}

const CWETextField = (props) => {
  const {classes} = props;
  var value = props.field.elementValue;
  var label = props.field.elementConfig.label;
  if (props.field.validation.required) {
    label += " *";
  }
  if(props.field.elementType === "date"){
    value = updateDateFormat(value);
  }

  var urlExists = props.field.elementConfig.hasOwnProperty("url") &&
    props.field.elementConfig.url.length > 0;
  var fieldValue;
  if (urlExists) {
    fieldValue = (
      <Button
        onClick={props.field.clicked}
        className={classes.actionButton}>
        {value}
      </Button>
    )
  } else {
    fieldValue = (<span className="span">{value}</span>);
  }

  if(props.field.editable){
    return (
      <tr className="table-info">
        <th>
          <FormLabel component="legend">
            {label}
          </FormLabel>
        </th>
        <td width="80%">
          <TextField
            value={value}
            onChange={props.field.changed}
            placeholder={props.field.elementConfig.placeholder}
            type={props.field.elementType === "number" ? "text" : props.field.elementType}
            style={{ margin: 8 }}
            error={!props.field.isValid}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </td>
      </tr>
    )
  }
  else {
    if(props.field.elementType === "date"){
      return (
        <tr className="table-info">
          <th>
            <FormLabel component="legend"
              className={props.field.isValid ? null : classes.errorLabel}>
              {props.field.elementConfig.label}
            </FormLabel>
          </th>
          <td>
            <span
              className={props.field.isValid ? classes.validText : classes.errorText}>
              {value}
            </span>
          </td>
        </tr>
      )
    }
    else if (props.field.elementType === "password"){
      return (
        <tr className="table-info">
          <th>
            <FormLabel component="legend">
              {props.field.elementConfig.label}
            </FormLabel>
          </th>
          <td><span className="span">**************</span></td>
        </tr>
      )
    }
    else {
      return (
        <tr className="table-info">
          <th>
            <FormLabel
              component="legend"
              className={props.field.isValid ? null : classes.errorLabel}>
              {props.field.elementConfig.label}
            </FormLabel>
          </th>
          <td
            className={props.field.isValid ? classes.validText : classes.errorText}>
            {fieldValue}
          </td>
        </tr>
      )
    }
  }
}
CWETextField.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default (withStyles(styles)(CWETextField));