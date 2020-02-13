const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const multer = require('multer')
const Excel = require('exceljs');

const uploadManager = require("./upload")
const upload = multer(uploadManager)


const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+"/index.html"));
})

app.get('/main.js', function (req, res) {
    res.sendFile(path.join(__dirname+"/main.js"));
})

app.get('/teste.xlsx', function (req, res) {
    res.sendFile(path.join(__dirname+"/teste.xlsx"));
})

app.post("/xlsx", upload.single("file"), function(req,res){
  let url = req.file.path
  var workbook = new Excel.Workbook();
  workbook.xlsx.readFile(url)
  .then(worksheet => {
      let sheet = worksheet.getWorksheet(1);
      let finalObj = [];
      sheet.eachRow(function(row, rowNumber) {
        if(rowNumber!=1){
          let r = row.values;
          let obj = {
            nome:r[1],
            telefone:r[2]
          }
          finalObj.push(obj)
        }
      });

      let string = ""

      finalObj.forEach(function(element){
        string += "BEGIN:VCARD\n"+
        "VERSION:3.0\n"+
        "FN:OVP-"+element.nome+"\n"+
        "item1.TEL:"+element.telefone+"\n"+
        "Categories:myContatcs\n"+
        "END:VCARD\n"
      });
    res.status(200).send({texto:string})
  });
})
app.listen(3000)