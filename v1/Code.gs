function doGet(req) {
   var action = req.parameter.action;
   switch(action) {
       case "anycase":
            return response().json({
              status: true,
              message: "ohh found something",
              data: null
           });
           break;
       default:
           return response().json({
              status: false,
              message: "oops nothing here",
              data: null
           });
   }
}

function doPost(request = {}) {
  var db = SpreadsheetApp.openById(sheetId);
  var sheetUsers = db.getSheetByName(subSheets.users);
//  var sheetProducts = db.getSheetByName(subSheets.products);
  
  var { parameter, postData: { contents, type } = {} } = request;
  var { source, action } = parameter;
  var jsonData = JSON.parse(contents);

  
  if (type === 'application/json'){
      if(action == endpoints.authUser){
          return authUser(jsonData, sheetUsers);
      }
      else if(action == endpoints.addUser){
          return addUser(jsonData, sheetUsers);
      }
      else if(action == endpoints.deleteUser){
          return deleteUser(jsonData, sheetUsers);
      }
      else if(action == endpoints.updateUser){
          return updateUser(jsonData, sheetUsers);
      }
      else{
          return ContentService.createTextOutput(JSON.stringify({text:"messed up"}));
      }
  }

  if (type === 'application/x-www-form-urlencoded') {
    var json = {};
    contents
      .split('&')
      .map((input) => input.split('='))
      .forEach(([key, value]) => {
        json[decodeURIComponent(key)] = decodeURIComponent(value);
      });
    return ContentService.createTextOutput(JSON.stringify(json));
  }

  return ContentService.createTextOutput(contents);
};










