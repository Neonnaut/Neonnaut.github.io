function handleFiles(files) {
  // Check for the various File API support.
  if (window.FileReader) {
    // FileReader are supported.
    getAsText(files[0]);
  } else {
    alert('FileReader are not supported in this browser.');
  }
}

function getAsText(fileToRead) {
  var reader = new FileReader();
  // Handle errors load
  reader.onload = loadHandler;
  reader.onerror = errorHandler;
  // Read file into memory as UTF-8      
  reader.readAsText(fileToRead);
}

function loadHandler(event) {
  var csv = event.target.result;
  processData(csv);
}

function processData(csv) {
  var allTextLines = csv.split(/\r\n|\n/);
  var lines = [];
  var reg = /[,\t]/gm;
  while (allTextLines.length) {
    lines.push(allTextLines.shift().split(reg));
  }
  console.log(lines);
  drawOutput(lines);
}

function errorHandler(evt) {
  if (evt.target.error.name == "NotReadableError") {
    alert("Cannot read file !");
  }
}

function drawOutput(lines) {
  //Clear previous data
  document.getElementById("output").innerHTML = "";
  var table = document.createElement("table");
  for (var i = 0; i < lines.length; i++) {
    var row = table.insertRow(-1);
    for (var j = 0; j < lines[i].length; j++) {
      var firstNameCell = row.insertCell(-1);
      firstNameCell.appendChild(document.createTextNode(lines[i][j]));
    }
  }
  document.getElementById("output").appendChild(table);
}


const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");


$(window).load(function () {
  const myForm = document.getElementById("myForm");
  const csvFile = document.getElementById("csvFile");
  myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Form submitted");
  });
});