var sheetId = "1XoaP3ib22Pa64AU_8JEMmmFKoQR5BJrZFUFKRiWj_T4";
var endpoints = {
  authUser:"authuser",
  addUser: "adduser",
  deleteUser:"deleteuser",
  updateUser: "updateuser"
};

var subSheets = {
  users:"devs",
  products:"products"
};

/* Service
 */

/* Read
 * request for all Data
 *
 * @request-parameter | action<string>
 * @example-request | ?action=read
 */
function doRead(request, sheetObject) {
   var data = {};
   
   data.records = _readData(sheetObject);

   return data;

}


function _readData(sheetObject, properties) {

   if (typeof properties == "undefined") {
      properties = _getHeaderRow(sheetObject);
      properties = properties.map(function (p) {
         return p.replace(/\s+/g, '_');
      });
   }

   var rows = _getDataRows(sheetObject),
      data = [];

   for (var r = 0, l = rows.length; r < l; r++) {
      var row = rows[r],
          record = {};

      for (var p in properties) {
         record[properties[p]] = row[p];
      }

      data.push(record);
   }
   
   return data;
}

function _getDataRows(sheetObject) {
   var sh = sheetObject;

   return sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
}

function _getHeaderRow(sheetObject) {
   var sh = sheetObject;
   return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
}

function response() {
   return {
      json: function(data) {
         return ContentService
            .createTextOutput(JSON.stringify(data))
            .setMimeType(ContentService.MimeType.JSON);
      }
   }
}

function _test(){
  var output = JSON.stringify({    status: 'success',    message: 'It worked',  });
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}