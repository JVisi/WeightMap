let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    console.log(this.responseText);
  }
};
function sendLogin(){
  let username=document.getElementById("username").value;
  let password=document.getElementById("password").value;
  console.log(username,password);
  console.log("sending");
  xhttp.open("POST", "/login");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify({"name":username,"password":password}));
}      
function sendRegister(){
  let username=document.getElementById("regUser").value;
  let password=document.getElementById("regPass").value;
  if(password===document.getElementById("regPass2").value){
    console.log(username,password);
    console.log("sending");
    xhttp.open("POST", "/login");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({"name":username,"password":password}));
  }
}      
    