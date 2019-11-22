import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";

const styles = theme => ({
  noSelected: {
    fontStyle: "italic",
    color: "#6b6666",
  },
  checkbox: {
    paddingTop: "1px !important",
    marginTop: "1px !important",
    paddingBottom: "1px !important",
    paddingLeft: "6px !important",
  },
  checkboxContainer: {
    paddingLeft: "0px !important",
    marginLeft: "0px !important",
  }
});


function printCheckboxValues(checkboxValues, classes) {
  var selected =[];

  checkboxValues.forEach((option, index) => {
    if (option.check) {
      return selected.push(option.label)
    }
  });

  if (selected.length === 0) {
    return (
      <span  className={classes.noSelected}>
        No Selected
      </span>
    );
  }
  else {
    return (
      selected.map((option, index) => {
        return <div key={index}>{option}</div>
      })
    );
  }
}

const CWECheckbox = (props) => {
  const { classes } = props;
  var label = props.field.elementConfig.label;
  if (props.field.validation.required) {
    label += " *";
  }

  if(props.field.editable) {
    return(
      <tr className="table-info">
        <th>
          <FormLabel component="legend">
            {label}
          </FormLabel>
        </th>
        <td width="80%">
          {props.field.elementConfig.options.map((option, index) => {
            return (
              <div key={index}>
              <FormControlLabel
                className={classes.checkboxContainer}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={option.check}
                    onChange={props.field.changed}
                    value={option.value}
                    aria-label={option.label}
                  />
                }
                label={option.label}
              />
              </div>
            );
          })}
        </td>
      </tr>
    )
  }
  else {
    return(
      <tr className="table-info">
        <th>
          <FormLabel component="legend">
            {props.field.elementConfig.label}
          </FormLabel>
        </th>
        <td width="80%">
          <span className="span">{printCheckboxValues(props.field.elementConfig.options, classes)}</span>
        </td>
      </tr>);
  }
}

CWECheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(CWECheckbox));