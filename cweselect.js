import React from "react";
import {
  FormLabel,
  MenuItem,
  TextField,
  Button,
  withStyles
} from "@material-ui/core";
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
});

const CWESelect = (props) => {
  const { classes } = props;
  var label = props.field.elementConfig.label;
  if (props.field.validation.required) {
    label += " *";
  }

  var urlExists = props.field.elementConfig.hasOwnProperty("url") &&
    props.field.elementConfig.url.length > 0;
  var fieldValue;
  if (urlExists) {
    fieldValue = (
      <Button
        onClick={props.field.clicked}
        className={classes.actionButton}>
        {props.field.elementValue}
      </Button>
    )
  } else {
    fieldValue = (<span className="span">{props.field.elementValue}</span>);
  }

  if (props.field.editable) {
    return (
      <tr className="table-info">
        <th>
          <FormLabel component="legend">
            {label}
          </FormLabel>
        </th>
        <td width="80%">
          <TextField
            required={props.field.validation.required}
            value={props.field.elementValue}
            onChange={props.field.changed}
            style={{ margin: 8 }}
            error={!props.field.isValid}
            fullWidth
            select
            margin="normal"
            variant="outlined"
          >
            {props.field.elementConfig.options.map((option, index) => {
              return <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
            })}
          </TextField>
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
        <td width="80%">{fieldValue}</td>
      </tr>
    )}
}
CWESelect.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default (withStyles(styles)(CWESelect));

