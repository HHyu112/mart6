var code;
function createCaptcha() {

  document.getElementById('captcha').innerHTML = "";
  var charsArray ="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
  var lengthOtp = 6;
  var captcha = [];
  for (var i = 0; i < lengthOtp; i++) {
    var index = Math.floor(Math.random() * charsArray.length + 1);
    if (captcha.indexOf(charsArray[index]) == -1)
      captcha.push(charsArray[index]);
    else i--;
  }
  var canv = document.createElement("canvas");
  canv.id = "captcha";
  canv.width = 100;
  canv.height = 50;
  var ctx = canv.getContext("2d");
  ctx.font = "25px Georgia";
  ctx.strokeText(captcha.join(""), 0, 30);
  code = captcha.join("");
  document.getElementById("captcha").appendChild(canv);
}
function validateCaptcha() {
  
  if (document.getElementById("cpatchaTextBox").value == code) {
    alert("Login Successful")
  }else{
    event.preventDefault();
    alert("Invalid Captcha. try Again");
    document.getElementById("sendmessage").innerHTML="Invalid Captcha. try Again";
    createCaptcha();
  }
}
function checkuser(){
var loginuser=document.getElementById("username").value;
var loginpass=document.getElementById("password1").value;
let login=JSON.parse(localStorage.getItem("user"));
if (loginuser!=login["user"]|| loginpass!=login["pass"]){
    event.preventDefault();
    document.getElementById("sendmessage").innerHTML="Invalid User (Please register)";
    alert("Invalid User")
} else {
var object={"user":loginuser,"pass":loginpass}
localStorage.setItem("loginuser",JSON.stringify(object));
}
}

function userexist(){
    if (localStorage.hasOwnProperty("loginuser")){
    location.replace("product.html")
}
}
var pass;
function validatepassword(){
    pass=document.getElementById("password1").value;
    if (document.getElementById("password2").value !== pass){
    event.preventDefault();
      document.getElementById("sendmessage").innerHTML="Invalid Password";
       alert("Invalid Password. try Again");
    }
}
function validateCaptcha1() {
  if (document.getElementById("sendmessage").textContent !="Invalid Password"){
document.getElementById("sendmessage").innerHTML="Valid Password";
  if (document.getElementById("cpatchaTextBox").value == code) {
    alert("Register Successful");
    passpassword();
  }else{
    event.preventDefault();
    alert("Invalid Captcha. try Again");
    document.getElementById("sendmessage").innerHTML="Invalid Captcha. try Again";
    createCaptcha();
  }
}
}

function passpassword(){
    var username=document.getElementById("username").value
    var password=document.getElementById("password1").value
    var object={"user":username,"pass":password}
    localStorage.setItem("user",JSON.stringify(object));
    localStorage.setItem("loginuser",JSON.stringify(object));
}
function userexist(){
    if (localStorage.hasOwnProperty("loginuser")){
    location.replace("product.html")
}
}
//////////////////// login
    function passvalue(){
    
	var pn=document.getElementById("product").value;
    var po=document.getElementById("order").value;
    var pn1=document.getElementById("product1").value;
    var po1=document.getElementById("order1").value;
    var pn2=document.getElementById("product2").value;
    var po2=document.getElementById("order2").value;
    if (po >0 ){
    var object={"p":"Plan 30%","pn":pn,"po":po}
    localStorage.setItem("pn",JSON.stringify(object));
    } else if (po1>0){
    var object1={"p":"Plan 40%","pn":pn1,"po":po1}
    localStorage.setItem("pn1",JSON.stringify(object1));
    } else if (po2>0){
    var object2={"p":"Plan 50%","pn":pn2,"po":po2}
    localStorage.setItem("pn2",JSON.stringify(object2));
    } 
    return false;    
    }
function checklogin(){
if (localStorage.getItem("loginuser") === null){
    alert("Please register or login")
    location.replace("register.html")
}
}
function logout(){
    localStorage.removeItem("loginuser");
    alert("Log Out successful")
}
function updatecart(){
var key = "";
var cartorder=0;
for (i = 0; i <= localStorage.length-1; i++) {
            key = localStorage.key(i);
            if (key =="pn" || key=="pn1"|| key=="pn2"){
            let value=JSON.parse(localStorage.getItem(key))
            if (value["po"]>0){
            cartorder+=parseInt(value["po"]);
            }
            }
}
document.getElementById("cartorder").innerHTML=cartorder;
}
//////////////////// 
function balance(){
    alert("Insufficient Balance ,Please Top Up In order complete order")
     event.preventDefault();
}
function checkout(){
var key = "";
var list = "";
var i = 0;
var amount=0;
for (i = 0; i <= localStorage.length-1; i++) {
            key = localStorage.key(i);
            if (key =="pn" || key=="pn1"|| key=="pn2"){
            let value=JSON.parse(localStorage.getItem(key))
            if (value["po"]>0){
            list += "<tr><td id="+key +">" + value["p"] + "</td><td>"+ value["pn"] + "</td><td>x" +value["po"]+ "</td></td></tr>";
            amount+=value["pn"]*value["po"];}
            }
            }
document.getElementById('list').innerHTML = list;
document.getElementById('amount').innerHTML = "Amount  :"+ amount +" USD";
document.getElementById('amount1').setAttribute("value",amount);
addorder(amount)
}
function addorder(amount){
var d = Date(Date.now());
a = d.toString()
var object={"amount":amount,"date":a}
localStorage.setItem("Order",JSON.stringify(object));
}

var removekey = "";
function clearcart(){
if(document.getElementById("buyername").value!=="" && document.getElementById("email").value!=="" ){
for (i = 0; i <= localStorage.length-1; i++) {
            removekey = localStorage.key(i);
            if (removekey =="pn" || removekey=="pn1"|| removekey=="pn2"){
            localStorage.removeItem(removekey)
}
}
}
}
////////////////////
function cart(){
 if (localStorage.getItem("pn") === null && localStorage.getItem("pn1") === null && localStorage.getItem("pn2") === null){
    document.getElementById("main").innerHTML = "<h3>Your Shopping Cart</h3>Your Cart is Empty <a href='product.html'>Order Now</a>";
 }
var key = "";
var list = "";
var i = 0;
var amount=0;
var cartorder=0;
for (i = 0; i <= localStorage.length-1; i++) {
            key = localStorage.key(i);
            if (key =="pn" || key=="pn1"|| key=="pn2"){
            let value=JSON.parse(localStorage.getItem(key))
            if (value["po"]>0){
            list += "<tr><td>" + value["p"] + "</td><td>"+ value["pn"] + "</td><td>x" +value["po"]+ "</td><td><button id='"+key +"' onclick='remove("+key+")' value='"+key+"'>Remove</button></td></tr>";
            amount+=value["pn"]*value["po"];
            cartorder+=parseInt(value["po"]);
            }
            }
            }

document.getElementById('cartlist').innerHTML = list;
document.getElementById('amount').innerHTML = "Amount  :"+ amount +" USD";
document.getElementById('amount1').setAttribute("value",amount);
document.getElementById("cartorder").innerHTML=cartorder;
}
var removekeycart="";
var pn="pn";
var pn1="pn1";
var pn2="pn2";
function remove(removekeycart){
    localStorage.removeItem(removekeycart);
    location.reload();
}
////////////////////
function updatecart(){
var key = "";
var cartorder=0;
for (i = 0; i <= localStorage.length-1; i++) {
            key = localStorage.key(i);
            if (key =="pn" || key=="pn1"|| key=="pn2"){
            let value=JSON.parse(localStorage.getItem(key))
            if (value["po"]>0){
            cartorder+=parseInt(value["po"]);
            }
            }
}document.getElementById("cartorder").innerHTML=cartorder;
}
////////////////////
function order(){
if (localStorage.getItem("Order") === null){
    document.getElementById("order").innerHTML = "Order History is Empty";
}
}
var list = "";
function pendingorder(){
if (localStorage.hasOwnProperty("Order")){
    order=JSON.parse(localStorage.getItem("Order"))
    list += "<tr><td>" + order["amount"] +" USD" + "</td><td>"+ order["date"] +  "</td><td> Pending</td></tr>";
    document.getElementById('orderlist').innerHTML = list;
}
}
//////////////////// payment
function copyaddressbtc() {
  var copyElement = document.getElementsByClassName("author_bitcoin")[0];
  var range = document.createRange();
  range.selectNode(copyElement);
  window.getSelection().addRange(range);
  document.execCommand('copy');
  alert("Bitcoin address has been copied to the clipboard.");
}
function copyaddressbch() {
  var copyElement = document.getElementsByClassName("author_bitcoincash")[0];
  var range = document.createRange();
  range.selectNode(copyElement);
  window.getSelection().addRange(range);
  document.execCommand('copy');
  alert("Wallet address has been copied to the clipboard.");
}
function copyaddressltc() {
  var copyElement = document.getElementsByClassName("author_litecoin")[0];
  var range = document.createRange();
  range.selectNode(copyElement);
  window.getSelection().addRange(range);
  document.execCommand('copy');
  alert("Wallet address has been copied to the clipboard.");
}
function checkorder(){
if (localStorage.getItem("Order") === null){
    alert("Please Place Order")
    location.replace("product.html")
}
}
function verification(){
    let verificationcodehex=(Math.floor(Math.random()*99999999999999999)).toString(16);
    document.getElementById("verificationcode").innerHTML=verificationcodehex;
}
////////////////////setting
function checkpass(){
var currentpass= document.getElementById("password").value;
let login=JSON.parse(localStorage.getItem("user"));
if (currentpass!=login["pass"]){
    event.preventDefault();
    document.getElementById("sendmessage1").innerHTML="Invalid Password";
    alert("Invalid Password")
}
}

var passsetting;
function validatepassword2(){
    passsetting=document.getElementById("password1").value;
    if (document.getElementById("password2").value != passsetting){
    event.preventDefault();
      document.getElementById("sendmessage1").innerHTML="Invalid Repeating Password";
    alert("Invalid Repeating Password")
    }
}
function passpassword1(){
    if (document.getElementById("sendmessage1").textContent!="Invalid Repeating Password"&& document.getElementById("sendmessage1").textContent!="Invalid Password"){
    alert("Password Has Been Changed")
    let login1=JSON.parse(localStorage.getItem("user"));
    var username=login1["user"];
    var password=document.getElementById("password1").value;
    var object={"user":username,"pass":password}
    localStorage.setItem("user",JSON.stringify(object));
    document.getElementById("sendmessage1").innerHTML="";

} 
}


////////////////////wallet
function withdraw(){
    
}
function topup(){
    var topup =document.getElementById("topup1").value;
    var d = Date(Date.now());
    a = d.toString()
    var object={"amount":topup,"date":a}
    localStorage.setItem("Order",JSON.stringify(object));
}

function load(){
    debugger;
}
