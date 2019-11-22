const axios = require("axios");
const config = require("../config/config");
const Auth = require("../module/auth.js")();


function getHeaderConfig() {
  var credentials = Auth.getUserCredentials(null);

  var config = {
    "Authorization" : credentials.token,
    "role": credentials.role
  }

  return config;
};


function getHeaderConfigWithFile()  {
  var credentials = Auth.getUserCredentials(null);

  var config = {
    "Authorization" : credentials.token,
    "content-type": "multipart/form-data",
    "role": credentials.role
  }

  return config;
};


module.exports = function() {
  return {
    authenticateUser: function(data) {
      var urlPath = config.HTTPTAG + config.IPADDRESS + ":" + config.PORTNUMBER + "/auth/login";
      return axios({
        method: 'post',
        url: urlPath,
        data: data,
        timeout: config.TIMEOUT
      })
      .then(resData => {
        console.log("authenticateUser [SUCCESS]: " + JSON.stringify(resData));
        return resData;
      })
      .catch(errData => {
        console.log("authenticateUser [FAIL]: " + JSON.stringify(errData));
        return errData;
      })
    },

    addEntry: function(className, data) {
      console.log("className: " +  className);
      var urlPath = config.HTTPTAG + config.IPADDRESS + ":" + config.PORTNUMBER + "/" + className + "/add";
      return axios({
        method: 'post',
        url: urlPath,
        data: data,
        timeout: config.TIMEOUT,
        headers: getHeaderConfig()
      })
      .then(resData => {
        if (resData.status !== 200) {
          console.log("addEntry [FAIL]: " + JSON.stringify(resData));
        }
        else {
          console.log("addEntry [SUCCESS]: " + JSON.stringify(resData));
        }
        return resData;
      })
      .catch(errData => {
        console.log("addEntry [FAIL]: " + JSON.stringify(errData));
        return errData;
      })
    },
    
    addBatch: function(className, data) {
      console.log("className: " +  className);
      var urlPath = config.HTTPTAG + config.IPADDRESS + ":" + config.PORTNUMBER + "/" + className + "/addbatch";
      return axios({
        method: 'post',
        url: urlPath,
        data: data,
        timeout: config.TIMEOUT,
        headers: getHeaderConfig()
      })
      .then(resData => {
        if (resData.status !== 200) {
          console.log("addBatch [FAIL]: " + JSON.stringify(resData));
        }
        else {
          console.log("addBatch [SUCCESS]: " + JSON.stringify(resData));
        }
        return resData;
      })
      .catch(errData => {
        console.log("addBatch [FAIL]: " + JSON.stringify(errData));
        return errData;
      })
    },

    updateEntry: function(className, entryId, data) {
      console.log("className: " +  className);
      var urlPath = config.HTTPTAG + config.IPADDRESS + ":" + config.PORTNUMBER+ "/"+ className + "/update/" + entryId;
      return axios({
        method: 'post',
        url: urlPath,
        data: data,
        timeout: config.TIMEOUT,
        headers: getHeaderConfig()
      })
      .then(resData => {
        if (resData.status !== 200) {
          console.log("updateEntry [FAIL]: " + JSON.stringify(resData));
        }
        else {
          console.log("updateEntry [SUCCESS]: " + JSON.stringify(resData));
        }
        return resData;
      })
      .catch(errData => {
        console.log("updateEntry [FAIL]: " + JSON.stringify(errData));
        return errData;
      })
    },
    
    updateBatch: function(className, data) {
      console.log("className: " +  className);
      var urlPath = config.HTTPTAG + config.IPADDRESS + ":" + config.PORTNUMBER+ "/"+ className + "/updatebatch";
      return axios({
        method: 'post',
        url: urlPath,
        data: data,
        timeout: config.TIMEOUT,
        headers: getHeaderConfig()
      })
      .then(resData => {
        if (resData.status !== 200) {
          console.log("updateBatch [FAIL]: " + JSON.stringify(resData));
        }
        else {
          console.log("updateBatch [SUCCESS]: " + JSON.stringify(resData));
        }
        return resData;
      })
      .catch(errData => {
        console.log("updateBatch [FAIL]: " + JSON.stringify(errData));
        return errData;
      })
    },

    getEntry: function(className, entryId) {
      console.log("className: " +  className);
      var urlPath = config.HTTPTAG + config.IPADDRESS + ":" + config.PORTNUMBER+ "/"+ className + "/info/" + entryId;
      return axios({
        method: 'get',
        url: urlPath,
        timeout: config.TIMEOUT,
        headers: getHeaderConfig()
      })
      .then(resData => {
        if (resData.status !== 200) {
          console.log("getEntry [FAIL]: " + JSON.stringify(resData));
        }
        else {
          console.log("getEntry [SUCCESS]: " + JSON.stringify(resData));
        }
        return resData;
      })
      .catch(errData => {
        console.log("getEntry [FAIL]: " + JSON.stringify(errData));
        return errData;
      })
    },

    getAllEntries: function(className, fields, filters) {
      console.log("className: " + className + ", fields: " + fields + ", filters: " + filters);
      var urlPath = config.HTTPTAG + config.IPADDRESS + ":" + config.PORTNUMBER + "/" + className + "/list/";
      if (fields.length) {
        urlPath += "?$include=" + fields[0];
        for (var index = 1; index < fields.length; index++) {
          urlPath += "," + fields[index];
        }
      }

      if (filters.length > 0) {
        if (fields.length === 0) {
          urlPath += "?";
        } else {
          urlPath += "&";
        }

        var first = true;
        for (var index2 = 0; index2 < filters.length; index2++) {
          for (var key in filters[index2]) {
            if (first) {
              first = false;
              urlPath += encodeURIComponent(key) + "=" + encodeURIComponent(filters[index2][key]);
            } else {
              urlPath += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(filters[index2][key]);
            }
          }
        }
      }

      console.log("\n\nURL PATH: " + urlPath);

      return axios({
        method: 'get',
        url: urlPath,
        timeout: config.TIMEOUT,
        headers: getHeaderConfig()
      })
      .then(resData => {
        if (resData.status !== 200) {
          console.log("getAllEntries [FAIL]: " + JSON.stringify(resData));
        }
        else {
          console.log("getAllEntries [SUCCESS]: " + JSON.stringify(resData));
        }
        return resData;
      })
      .catch(errData => {
        console.log("getAllEntries [FAIL]: " + JSON.stringify(errData));
        return errData;
      })
    },

    deleteEntry: function(className, data) {
      console.log("className: " +  className);
      var urlPath = config.HTTPTAG + config.IPADDRESS + ":" + config.PORTNUMBER+ "/"+ className + "/delete/" + data.entryId;
      return axios({
        method: 'delete',
        url: urlPath,
        timeout: config.TIMEOUT,
        headers: getHeaderConfig()
      })
      .then(resData => {
        if (resData.status !== 200) {
          console.log("deleteEntry [FAIL]: " + JSON.stringify(resData));
        }
        else {
          console.log("deleteEntry [SUCCESS]: " + JSON.stringify(resData));
        }
        return resData;
      })
      .catch(errData => {
        console.log("deleteEntry [FAIL]: " + JSON.stringify(errData));
        return errData;
      })
    },

    deleteBatch: function (className, data) {
      console.log("className: " + className);
      var urlPath = config.HTTPTAG + config.IPADDRESS + ":" + config.PORTNUMBER + "/" + className + "/deleteBatch";
      return axios({
        method: 'post',
        url: urlPath,
        data: data,
        timeout: config.TIMEOUT,
        headers: getHeaderConfig()
      })
        .then(resData => {
          if (resData.status !== 200) {
            console.log("deleteBatch [FAIL]: " + JSON.stringify(resData));
          }
          else {
            console.log("deleteBatch [SUCCESS]: " + JSON.stringify(resData));
          }
          return resData;
        })
        .catch(errData => {
          console.log("deleteBatch [FAIL]: " + JSON.stringify(errData));
          return errData;
        })
    },

    uploadFile: function(className, file, filename) {
      console.log("className: " +  className);
      var urlPath = config.HTTPTAG + config.IPADDRESS + ":" + config.PORTNUMBER + "/" + className + "/upload";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", filename);

      return axios({
        method: 'post',
        url: urlPath,
        data: formData,
        timeout: config.TIMEOUT,
        headers: getHeaderConfigWithFile()
      })
      .then(resData => {
        if (resData.status !== 200) {
          console.log("uploadFile [FAIL]: " + JSON.stringify(resData));
        }
        else {
          console.log("uploadFile [SUCCESS]: " + JSON.stringify(resData));
        }
        return resData;
      })
      .catch(errData => {
        console.log("uploadFile [FAIL]: " + JSON.stringify(errData));
        return errData;
      })
    },

    getFile: function (className, entryId) {
      var urlPath = config.HTTPTAG + config.IPADDRESS + ":" + config.PORTNUMBER + "/" + className + "/download/" + entryId;
      return axios({
        method: 'get',
        url: urlPath,
        responseType: 'blob',
        timeout: config.TIMEOUT,
        headers: getHeaderConfig()
      })
      .then(resData => {
        if (resData.status !== 200) {
          console.log("getFile [FAIL]: " + JSON.stringify(resData));
        }
        else {
          console.log("getFile [SUCCESS]: " + JSON.stringify(resData));
        }
        return resData;
      })
      .catch(errData => {
        console.log("getFile [FAIL]: " + JSON.stringify(errData));
        return errData;
      })
    },

    getUsernames: function() {
      var urlPath = config.HTTPTAG + config.IPADDRESS + ":" + config.PORTNUMBER+ "/auth/names";
      return axios({
        method: 'get',
        url: urlPath,
        timeout: config.TIMEOUT,
        headers: getHeaderConfig()
      })
      .then(resData => {
        if (resData.status !== 200) {
          console.log("getUsernames [FAIL]: " + JSON.stringify(resData));
        }
        else {
          console.log("getUsernames [SUCCESS]: " + JSON.stringify(resData));
        }
        return resData;
      })
      .catch(errData => {
        console.log("getUsernames [FAIL]: " + JSON.stringify(errData));
        return errData;
      })
    },
  }
}
