
function simplu(){
   var newNode = document.createElement('div');
   newNode.innerHTML = 'bai mergeee calm down si alte alea';
   document.getElementById('aici').appendChild(newNode);
}


function mergipls(){
   var countup = this;
   var newNode = document.createElement('div');
   newNode.innerHTML = 'tell me you are working!';
   document.getElementById('dd').appendChild(newNode);
 }


 function navi ( ){
   let data = sessionStorage.getItem('name');
   console.log (data);
   if ( data != "null" ){
     document.write ( '<a class="menu-item" href="LoginForm.html"><i class="fa fa-file-text"></i> Login </a>');
     document.write ( '<a class="menu-item" href="RegisterForm.html"><i class="fa fa-heart"></i> Signin </a>');
     console.log( "aici");
   }
   else{
     document.write( '<a class="menu-item"><i class="fa fa-file-heart"></i> WELCOME,');
     document.write( req.session.user);
     document.write(' </a>' );
     document.write ( '<a  onclick="Logout()" class="menu-item" href="home.html"><i class="fa fa-heart"></i> LOGOUT </a>');
     console.log ("kjhv");
   }
 }


function Logout () {
  sessionStorage.clear();
  sessionStorage.setItem('name', 'null');
}





var window.iAmGlobal = "Welcome";
