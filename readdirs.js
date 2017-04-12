const testFolder = 'SPANISH/';
const fs = require('fs');
var arr = [];
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    arr.push(file);
  });
  if(arr.includes('.DS_Store')){
    arr.splice(0,1);
  }
  console.log(arr);
});