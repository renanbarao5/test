import React from "react";
import {
  FormLabel,
  withStyles
} from "@material-ui/core";
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    textTransform: "none",
  },
  fileDisplay: {
    textTransform: "none",
    "font-weight": "400",
  },
  input: {
    display: 'none',
  },
  invalid: {
    textTransform: "none",
    "font-weight": "400",
    color: "#f00",
  },

});

const CWEFile = (props) => {
  const { classes } = props;

  var label = props.field.elementConfig.label;
  if (props.field.validation.required) {
    label += " *";
  }

  if (props.field.editable) {
    const inputId = "contained-button-file" + label.replace(" ", "");
    return (
      <tr className="table-info">
        <th>
          <FormLabel component="legend">
            {label}
          </FormLabel>
        </th>
        <td width="80%">
          <label htmlFor={inputId}>
            <Button variant="contained" component="span" className={classes.button}>
              Browse
            </Button>
            <span className={classes.fileDisplay}>{props.field.elementValue}</span>
            <span className={classes.invalid}>{!props.field.isValid?"This field is required":null}</span>
          </label>
          <input
            className={classes.input}
            id={inputId}
            type="file"
            onChange={props.field.changed}
          />
        </td>
      </tr>
    )
  }
  else {

    return (
      <tr className="table-info">
        <th>
          <FormLabel component="legend">
            {props.field.elementConfig.label}
          </FormLabel>
        </th>
        <td width="80%">
          <button
            type="button"
            className="link-button"
            onClick={props.field.clicked}>
            <span className="span">{props.field.elementValue}</span>
          </button>
        </td>
      </tr>
    )
  }
}

export default (withStyles(styles)(CWEFile));

