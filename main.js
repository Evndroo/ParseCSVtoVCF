const xlsx = document.getElementById("xlsx")
const fileNameView = document.querySelector("#fileName"); 
const drag_n_hold = document.querySelector("#main .card");

var txt = "", 
    name= "";

/*
 *
 *Iniciando manipulação DOM 
 * 
 * 
 */

document.getElementById("result").setAttribute("style","display:none;")

//input type file

xlsx.setAttribute("style","display:none;")

xlsx.onchange = function (event) {
  callServer(event.target.files[0]);
}


//drag and drop configuring


;['dragenter', 'dragover', 'dragleave'].forEach(eventName => {
  drag_n_hold.addEventListener(eventName, preventDefaults, false)
})

drag_n_hold.addEventListener("click", function(){
  xlsx.click();
})

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