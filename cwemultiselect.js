import React from "react";
import {
  Chip,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Select,
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
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "100%",
    maxWidth: "100%",
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
});

const CWEMultiselect = (props) => {
  const { classes } = props;
  var label = props.field.elementConfig.label;
  if (props.field.validation.required) {
    label += " *";
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
          <FormControl className={classes.formControl}>
            <Select
              multiple
              value={props.field.elementValue}
              onChange={props.field.changed}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip}/>
                  ))}
                </div>
              )}
            >
              {props.field.elementConfig.options.map((option, index) => {
                return <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
              })}
            </Select>
          </FormControl>
        </td>
      </tr>
    )
  }
  else {
    var elementValue = props.field.elementValue.map((value, index) => {
      if (props.field.elementConfig.hasOwnProperty("url") && props.field.elementConfig.url.length > 0) {
        return(
          <div>
            <Button
              key={index}
              onClick={props.field.clicked}
              className={classes.actionButton}>
              {value}
            </Button>
          </div>
        );
      }
      else {
        return (
          <div
            key={index}
            className="span">
            {value}
          </div>
        );
      }
    });

    return (
      <tr className="table-info">
        <th>
          <FormLabel component="legend">
            {props.field.elementConfig.label}
          </FormLabel>
        </th>
        <td width="80%">
          {elementValue}
        </td>
      </tr>
    );
  }
}
CWEMultiselect.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default (withStyles(styles)(CWEMultiselect));

