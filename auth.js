const USER_DATA = "user_data";
const storage = window.localStorage;

module.exports = function() {
  return {
    getUserCredentials: function(props) {
      var data = storage.getItem(USER_DATA);
      if (data === null) {
        return null;
      } else {
        return JSON.parse(data);
      }
    },


    setUserCredentials: function(data, token) {
      var userCredentials = {
        id: data.id,
        username: data.username,
        fullname: data.fullname,
        role: data.role,
        token: token,
        accessrights: {
          operation: data.accessrights.operation,
          status: data.accessrights.status, 
        }
      };

      storage.setItem(USER_DATA, JSON.stringify(userCredentials));
    },


    clearUserCredentials: function () {
      storage.removeItem(USER_DATA);
    },


    isUserAuthorized (userRole, operation) {
      var data = storage.getItem(USER_DATA);
      if (data === null) {
        return false;
      } else {
        var accessRights = JSON.parse(data);
        if (accessRights && accessRights.accessrights.operation.includes(operation)) {
          return true;
        } else {
          return false;
        }
      }
    },

  }
}