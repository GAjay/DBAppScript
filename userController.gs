function authUser(request, sheetUsers){
      var users = _readData(sheetUsers);
      var isAuthorized = false;
      var data = _readData(sheetUsers);
      for(var i =0; i <data.length; i++){
          if(request.username == data[i].username && request.password == data[i].password){
              isAuthorized = true;
               break;
          }
      }
      if(isAuthorized){
        return response().json({
              status: true,
              data: { username: request.username}
        });
      }else{
          return response().json({
              status: false,
              data: null
        });
      }
}

function addUser(req, sheet){
   var phone = req.phone;
   var username = req.username;
   var password = req.password;
   var address = req.address;
   var flag = 1;
   
   var Row = sheet.getLastRow();
   for (var i = 1; i <= Row; i++) {
      var idTemp = sheet.getRange(i, 1).getValue();
      if (idTemp == phone) {
         flag = 0;
         var result = "Phone already exists";
         var status = false;
      }
   }
   
   if (flag == 1) {
      var timestamp = Date.now();
      var currentTime = new Date().toLocaleString(); 
      var rowData = sheet.appendRow([
         phone,
         username,
         password,
         address,
         timestamp,
         currentTime
      ]);
      var result = "Insertion successful";
      var status = true;

   }

   return response().json({
       status: status,
      messege: result,
      data: null
   });
}

function deleteUser(req, sheet) {
   var phone = req.phone;
   var flag = 0;

   var Row = sheet.getLastRow();
   for (var i = 1; i <= Row; i++) {
      var idTemp = sheet.getRange(i, 1).getValue();
      if (idTemp == phone) {
         sheet.deleteRow(i);
         var result = "deleted successfully";
         flag = 1;
      }

   }

   if (flag == 0) {
      return response().json({
         status: false,
         message: "user not found"
      });
   }

   return response().json({
      status: true,
      message: result
   });
}

function updateUser(req, sheet){
   var id = req.phone;
   var updates = req;
  
   var lr = sheet.getLastRow();
   var flag = 0;
   var headers = _getHeaderRow(sheet);
   var updatesHeader = Object.keys(updates);
   
   // Looping for row
   for (var row = 1; row <= lr; row++) {
      // Looping for available header / column
      for (var i = 0; i <= (headers.length - 1); i++) {
         var header = headers[i];
         // Looping for column need to updated
         for (var update in updatesHeader) {
            if (updatesHeader[update] == header) {
               // Get ID for every row
               var rid = sheet.getRange(row, 1).getValue();

               if (rid == id) {
                  // Lets Update
                  sheet.getRange(row, i + 1).setValue(updates[updatesHeader[update]]);
               }
            }
         }
      }
   }

   
   // Output
   return response().json({
      status: true,
      message: "Update successfully"
   });
}