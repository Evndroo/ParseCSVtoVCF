/*
 * Injetando propriedades
 */

const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const multer = require('multer')
const Excel = require('exceljs');
const uploadManager = require("./upload")

/*
 * Instanciando dependências 
 */


const upload = multer(uploadManager)
const app = express()

/*
 * Definindo tipos de requisições aceitas
 */


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



/*
 *
 *
 * Configurando Rotas
 * 
 * 
 */

//Navegação


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+"/index.html"));
})



// Códigos

app.get('/main.js', function (req, res) {
    res.sendFile(path.join(__dirname+"/main.js"));
})

app.get('/style.css', function (req, res) {
  res.sendFile(path.join(__dirname+"/style.css"));
})



// API de resposta

app.post("/xlsx", upload.single("file"), function(req,res){
  //Puxa arquivo salvo e monta objeto baseado nele (arquivo excel) 
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
            codigo:r[1],
            nome:r[2],
            telefone:r[3] + ""+ r[4],
            
          }
          finalObj.push(obj)
        }
      });

      let string = ""

      finalObj.forEach(function(element){
        string += "BEGIN:VCARD\n"+
        "VERSION:3.0\n"+
        `FN:${element.codigo}-`+element.nome+"\n"+
        "item1.TEL:"+element.telefone+"\n"+
        "Categories:myContatcs\n"+
        "END:VCARD\n"
      });

      //criar arquivo .vcf

    res.status(200).send({texto:string, name:path.basename(req.file.originalname)})
  });
})
app.listen(process.env.PORT || 3000)