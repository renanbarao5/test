const Backend = require("../../backend_wrapper/backend_express.js")();

const getModalStyle = () => {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  else {
    return true;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid
  }
  return isValid;
}

const uploadFile = async (formElement) => {
  var retVal = Backend.uploadFile("uploadedfile", formElement.elementConfig.filebinary, formElement.value)
  return retVal.then(response => {
    return response;
  })
  .catch(error => {
    console.log(error);
    return error;
  })
}

const uploadAllFiles = async (baseForm, newForm) => {
  let retVal = null;
  for (let key in baseForm) {
    if (baseForm[key].elementType === "file") {
      if (baseForm[key].touched === true) {
        retVal = await uploadFile(baseForm[key]);
        if (retVal.status === 200) {
          newForm[key]["entryId"] = retVal.data.ID;
        } else {
          return false;
        }
      }
    }
  }
  return true;
}

const getFile = async (entryId) => {
  var retGetFile = Backend.getFile("uploadedfile", entryId);
  return retGetFile.then(response => {
    return response;
  })
  .catch(error => {
    return error;
  })
}

const refreshForm = async (data, baseForm, pdfViewerInfo) => {
  var foundFirstFile = false;
  for (let key in data) {
    if (baseForm.hasOwnProperty(key)) {
      baseForm[key].touched = false;
      if (baseForm[key].elementType === "file") {
        baseForm[key].value = data[key].fileName;
        baseForm[key].entryId = data[key].entryId;
        if (data[key].entryId === '') {
          baseForm[key].valid = false;
        } else {
          baseForm[key].valid = true;
          if (pdfViewerInfo.pdfViewerEnabled && !foundFirstFile) {
            foundFirstFile = true;
            var retVal = await getFile(baseForm[key].entryId);
            if (retVal.status === 200) {
              const file = new Blob([retVal.data], { type: "application/pdf" });
              pdfViewerInfo.passFileName = baseForm[key].value;
              pdfViewerInfo.passfileUrl = URL.createObjectURL(file);
            }
          }
        }
      } else if (baseForm[key].elementType === "checkbox") {
        Object.keys(data[key]).forEach((element, index) => {
          baseForm[key].elementConfig.options[index].check = data[key][element]
        });
        baseForm[key].valid = true;
      } else {
        baseForm[key].value = data[key];
        baseForm[key].valid = true;
      }
    }
  }
  return data;
}

const refreshClassInformation = async (data, classInformation) => {
  if (classInformation.parentClassName !== "") {
    var parentIds = data.parentRoute.split("/");
    for (var parentIndex = 0; parentIndex < parentIds.length - 1; parentIndex++) {
      classInformation.parentIdRoute[parentIds.length - 2 - parentIndex].id = parentIds[parentIndex];
    }
  }
  if (data.hasOwnProperty("entryId")) {
    classInformation.entryId = data.entryId;
  }
  if (data.hasOwnProperty("parentId")) {
    classInformation.parentId = data.parentId;
  }
  return data;
}

const elementOnClickHandler = async (formElement, pdfViewerInfo) => {
  if (formElement.elementType === "file") {
    getFile(formElement.entryId)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.message);
      } else {
        return response.data;
      }
    })
    .then(data => {
      const file = new Blob([data], { type: "application/pdf" });
      if (pdfViewerInfo.pdfViewerEnabled) {
        pdfViewerInfo.passfileUrl = URL.createObjectURL(file);
        pdfViewerInfo.passFileName = formElement.value;
        this.setState({ pdfViewerInfo: pdfViewerInfo });
      } else {
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }
    })
    .catch(error => {
      throw new Error("Unable to retrive file. " + error.message);
    });
  }
}

const elementOnChangeHandler = (event, inputIdentifier, baseForm, formValid) => {
  var formElement = baseForm[inputIdentifier];
  if (formElement.elementType === "file") {
    if (event.target.files[0]) {
      formElement.value = event.target.files[0].name;
      formElement.elementConfig.filebinary = event.target.files[0]
    }
    formElement.touched = true;
  } else {
    if (formElement.elementType === "checkbox") {
      var checkedValue = event.target.value;
      for (var i = 0; i < formElement.elementConfig.options.length; i++) {
        if (formElement.elementConfig.options[i].value === checkedValue) {
          formElement.elementConfig.options[i].check = event.target.checked
          break;
        }
      }
      formElement.valid = true;
    }

    formElement.value = event.target.value;
    formElement.valid = checkValidity(formElement.value, formElement.validation);
    formElement.touched = true;

    let formIsInvalid = false;
    for (let key in baseForm) {
      formIsInvalid |= !baseForm[key].valid;
    }
    formValid = !formIsInvalid;
  }
}

const prepareForm = (baseForm, newForm, all) => {
  for (let key in baseForm) {
    if (all || baseForm[key].touched) {
      if (baseForm[key].elementType === "checkbox") {
        var types = {};
        baseForm[key].elementConfig.options.forEach(element => {
          types = {
            ...types,
            [element.value]: element.check
          };
        });
        newForm[key] = types;
      } else if (baseForm[key].elementType === "file") {
        newForm[key] = {};
        newForm[key]["fileName"] = baseForm[key].value;
      } else {
        newForm[key] = baseForm[key].value;
      }
    }
  }
}

const Utility = {
  getModalStyle,
  checkValidity,
  uploadFile,
  uploadAllFiles,
  getFile,
  refreshForm,
  refreshClassInformation,
  elementOnClickHandler,
  elementOnChangeHandler,
  prepareForm
};

export default Utility;
