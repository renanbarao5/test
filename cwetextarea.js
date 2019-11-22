import React from "react";
import {
  FormLabel,
  TextField
} from "@material-ui/core";


const CWETextArea = (props) => {
  var label = props.field.elementConfig.label;
  if (props.field.validation.required) {
    label += " *";
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
          value={props.field.elementValue}
          onChange={props.field.changed}
          placeholder={props.field.elementConfig.placeholder}
          type="textarea"
          style={{ margin: 8 }}
          error={!props.field.isValid}
          fullWidth
          multiline
          margin="normal"
          variant="outlined"
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
        <td width="80%"><span className="span">{props.field.elementValue}</span></td>
      </tr>
    )
  }
}


export default CWETextArea;
