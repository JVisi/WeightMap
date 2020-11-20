

/*let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
  
  document.getElementById('logBtn').disabled=false;
  document.getElementById('regBtn').disabled=false;
  if (this.readyState == 4) {
    if(this.status==200){
      //go to main page
    }
  }
  
};


function sendLogin(){
  let email=document.getElementById("email").value;
  let password=document.getElementById("password").value;
  console.log(email,password);
  console.log("sending");
  xhttp.open("POST", "/login");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify({"email":email,"password":password}));
  document.getElementById('logBtn').disabled=true;
  document.getElementById('regBtn').disabled=true;
}      
function sendRegister(){
  let email=document.getElementById("regEmail").value;
  let username=document.getElementById("regUser").value;
  let password=document.getElementById("regPass").value;
  if(password===document.getElementById("regPass2").value){
    xhttp.open("POST", "/register");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({"email":email, "name":username,"password":password}));
    
    document.getElementById('logBtn').disabled=true;
    document.getElementById('regBtn').disabled=true;
  }
}      
    */