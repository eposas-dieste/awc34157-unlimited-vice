const arg = process.argv[2];
const fs = require('fs');
var testFolder;
var arr = [];

if(arg === 's' || 'span' || 'spanish' || 'SPANISH'){
  testFolder = 'SPANISH';
}else if(arg === 'e' || 'eng' || 'english' || 'ENGLISH'){
  testFolder = 'ENGLISH';
}else{
  testFolder = 'SPANISH';
}

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    arr.push(file);
  });
  if(arr.includes('.DS_Store')){
    arr.splice(0,1);
  }
  console.log(arr);
});

/* prints all arguments passed to the node script 
(function(){
  process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });
}());
*/