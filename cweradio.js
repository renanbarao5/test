import React from "react";
import {
  FormControlLabel,
  FormLabel,
  Radio
} from "@material-ui/core";


const CWERadio = (props) => {
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
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={props.field.elementValue === option.value}
                    onChange={props.field.changed}
                    value={option.value}
                    name={props.field.elementConfig.name}
                    aria-label={option.label}
                  />
                }
                label={option.label}
              />
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
          <span className="span">{props.field.elementValue}</span>
        </td>
      </tr>
    )
  }
}


export default CWERadio;
