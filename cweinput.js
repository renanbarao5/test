import React from 'react';
import CWETextField from "./cwetextfield";
import CWETextArea from "./cwetextarea";
import CWEFile from "./cwefile";
import CWERadio from "./cweradio";
import CWECheckbox from "./cwecheckbox";
import CWESelect from "./cweselect";
import CWEMultiselect from "./cwemultiselect";

const CWEInput = ( props ) => {
  let displayElement = null;

  var field = {
    elementConfig: props.elementConfig,
    elementValue: props.elementValue,
    changed: props.changed,
    clicked: props.clicked,
    elementType:props.elementType,
    isValid: props.isValid,
    editable: props.editable,
    validation: props.shouldValidate,
    history: props.history,
  };

  switch ( props.elementType ) {
    case ( "text" ):
    case ( "number" ):
    case ( "date"):
    case ( "password"):
    case ( "email"):
    {
      displayElement = <CWETextField
      field={field}
      />;
      break;
    }
    case ( "textarea" ):
    {
      displayElement = <CWETextArea
      field={field}
      />;
      break;
    }
    case ( "radio" ):
    {
      displayElement = <CWERadio
      field={field}
      />;
      break;
    }
    case ( "select" ):
    {
      displayElement = <CWESelect
      field={field}
      />;
      break;
    }
    case ( "multiselect" ):
    {
      displayElement = <CWEMultiselect
      field={field}
      />;
      break;
    }
    case ( "checkbox" ):
    {
      displayElement = <CWECheckbox
      field={field}
      />;
      break;
    }
    case ( "file" ):
    {
      displayElement = <CWEFile
      field={field}
      />;
      break;
    }
    default:
    {
      displayElement = <tr></tr>;
    }
  }
  return (
  <>{displayElement}</>
  );

}


export default CWEInput;