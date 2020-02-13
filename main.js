

let xlsx = document.getElementById("xlsx")


xlsx.onchange=function(event){
  const formdata = new FormData();
  formdata.append('file', event.target.files[0]);
  var req = new XMLHttpRequest();
  req.open("POST","/xlsx",true);
  req.send(formdata); 

  req.onreadystatechange = function() { // Chama a função quando o estado mudar.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log(JSON.parse(req.response).texto);
    }
}
}