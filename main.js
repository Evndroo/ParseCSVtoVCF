let xlsx = document.getElementById("xlsx")
var txt = "", 
    name= "";
xlsx.onchange = function (event) {
  const formdata = new FormData();
  console.log(event)
  formdata.append('file', event.target.files[0]);
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
      document.getElementById("btnDownload").setAttribute("style","display:block");
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


document.getElementById("btnDownload").setAttribute("style","display:none;")