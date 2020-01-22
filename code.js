
var chat_container = document.querySelector("#chat");


var input = document.querySelector("#chatinput");

input.addEventListener("keydown", onKeyDown );


var button = document.querySelector("#sendbutton");
button.addEventListener("click", onButtonSend );

var server = new SillyClient();
server.connect("wss://tamats.com:55000","room1");
server.on_user_connected=function(user_id){
	console.log(user_id);
}
server.on_ready=function(id){
	console.log(id);
}
function onKeyDown(event)
{
if(event.key != "Enter")
return;
onButtonSend();
}

server.on_message  = function(user_id,message){
	console.log("User "+ user_id + " said " + message);
	var elem2 = document.createElement("div");
	elem2.className="comingText";
	var userId = document.createElement("label");
	userId.setAttribute("id","userName");
	userId.innerHTML = user_id;
	var userMessage = document.createElement("label");
	userMessage.innerHTML=message;
	elem2.appendChild(userId);
	elem2.appendChild(userMessage);
	chat_container.appendChild(elem2);
};


function onButtonSend()
{
	var elem = document.createElement("div");
	elem.className="myText";
	elem.innerHTML = input.value;

	var message = input.value;

	input.value = "";
	chat_container.appendChild(elem);


	server.sendMessage(message);



}
