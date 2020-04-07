const xlsx = document.getElementById("xlsx")
const fileNameView = document.querySelector("#fileName"); 
const drag_n_hold = document.querySelector("#main .card");
const see_more = document.querySelector(".see-more");
const see_less_x = document.querySelector("#close");
const see_less = document.querySelector(".see-less");
const instructions = document.querySelector("#instruction .card-body")
const btn = document.querySelector("#btnDownload");
const btnAddFile = document.querySelector("#btnAddFile");

var txt = "", 
    name= "";

/*
 *
 *Iniciando manipulação DOM 
 * 
 * 
 */


document.getElementById("result").setAttribute("style","display:none;")

see_less.style.display = "none";
instructions.style.display = "none";

see_more.addEventListener("click",function(){
  see_less.style.display = "block"
  instructions.style.display = "block";
})

see_less_x.addEventListener("click",function(){
  see_less.style.display = "none"
  see_more.style.display = "block"
  instructions.style.display = "none";
  
})

var btnModeloClick = function(){
  
  var a = document.createElement("a");
  a.setAttribute("href","modelo.csv")
  a.click()
}

//input type file

xlsx.setAttribute("style","display:none;")

xlsx.onchange = function (event) {
  callServer(event.target.files[0]);
}


//drag and drop configuring


;['dragenter', 'dragover', 'dragleave'].forEach(eventName => {
  drag_n_hold.addEventListener(eventName, preventDefaults, false)
})

/*drag_n_hold.addEventListener("click", function(){
  xlsx.click();
})*/

/*
btnAddFile.addEventListener("click", function(){
  xlsx.click();
})*/

drag_n_hold.addEventListener("drop", function(event){
  event.preventDefault();
  event.stopPropagation();
  let file = event.dataTransfer.files[0];
  callServer(file);
})

/*
 *
 * Função para previnir download de arquivo duplicado 
 *                    +
 * Funções para chamada do servidor e download de arquivos
 * 
 */

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function callServer(file){
  const formdata = new FormData();
  formdata.append('file', file);
  name = file.name
  fileNameView.innerHTML = name;

  var req = new XMLHttpRequest();
  req.open("POST", "/xlsx", true);
  req.send(formdata);
  req.onreadystatechange = function () { // Chama a função quando o estado mudar.
    txt= "";
    name = "";
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const vcf = document.getElementById("vcf");
      txt = JSON.parse(req.response).texto;
      name = JSON.parse(req.response).name;
      vcf.innerHTML = txt.split("\n").join("<br>");
      document.getElementById("result").setAttribute("style","display:block");
      window.location.href= "/#result";
    }
  }
}

function download() { 
  if(txt!==""){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/vcard;charset=utf-8,' + encodeURIComponent(txt));
    element.setAttribute('download', name+".vcf");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}



function colSM(x) {
  if (x.matches) { // If media query matches
    let parent = document.querySelector(".card-header .row");
    parent.children[0].classList[0] = "col-sm-4"
    parent.children[0].classList[0] = "offset-sm-4"
    parent.children[1].classList[0] = "col-sm-4"
    
  } 
}

var x = window.matchMedia("(max-width: 767px)")
colSM(x) // Call listener function at run time
x.addListener(colSM)

function colSM(x) {
  if (x.matches) { // If media query matches
    let parent = document.querySelector(".card-header .row");
    parent.children[0].classList[0] = "col-sm-4"
    parent.children[0].classList[0] = "offset-sm-4"
    parent.children[1].classList[0] = "col-sm-4"
    
  } 
}

var x = window.matchMedia("(max-width: 575px)")
colXM(x) // Call listener function at run time
x.addListener(colXM)

function colXM(x) {
  if (x.matches) { // If media query matches
    let parent = document.querySelector(".card-header .row");
    parent.children[0].classList[0] = "col-xm-4"
    parent.children[0].classList[0] = "offset-xm-4"
    parent.children[1].classList[0] = "col-xm-4"
    
  } 
}

var x = window.matchMedia("(min-width: 767px)")
colSM(x) // Call listener function at run time
x.addListener(colSM)

function colSM(x) {
  if (x.matches) { // If media query matches
    let parent = document.querySelector(".card-header .row");
    parent.children[0].classList[0] = "col-md-4"
    parent.children[0].classList[0] = "offset-md-4"
    parent.children[1].classList[0] = "col-md-4"
    
  } 
}