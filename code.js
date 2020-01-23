
document.getElementById("chatinput").setAttribute("disabled", true);
var button_login=document.querySelector("#loginbutton");
button_login.addEventListener("click",onButtonLogin);

var user_name,room_name;

var server = new SillyClient();

function onButtonLogin()
{
	user_name = document.querySelector("#user_name").value;
	room_name = document.querySelector("#room_name").value;

	if(user_name!=="" && room_name!==""){
		document.getElementById("chatinput").removeAttribute("disabled");
		document.getElementById('id01').style.display='none';
		server.connect("wss://tamats.com:55000",room_name);
	}
	else{
		alert("Please enter a user name and room name");
	}
	
}
var chat_container = document.querySelector("#chat");


var input = document.querySelector("#chatinput");

input.addEventListener("keydown", onKeyDown );

var button = document.querySelector("#sendbutton");
button.addEventListener("click", onButtonSend );

var messageArray=[];

function onKeyDown(event)
{
if(event.key != "Enter")
return;
onButtonSend();
}

server.on_message  = function(user_id,msg_str){
	console.log(msg_str);
	var message = JSON.parse( msg_str );
	if(message.type === "msg"){
		messageArray=messageArray.push(message);
		var elem2 = document.createElement("div");
		elem2.className="comingText";
		var userId = document.createElement("label");
		userId.setAttribute("id","userName");
		userId.innerHTML = message.username;
		var userMessage = document.createElement("label");
		userMessage.innerHTML=message.text;
		elem2.appendChild(userId);
		elem2.appendChild(userMessage);
		chat_container.appendChild(elem2);
	}
	else if(message.type === "req"){
		console.log(messageArray);
		server.sendMessage(messageArray,message.userid);
	}
};

//this methods is called when a new user is connected
server.on_user_connected = function( user_id ){
	console.log("new");
	var message_req = {
		type:"req",
		userid : user_id
	};
	var msg_req = JSON.stringify(message_req);
	server.sendMessage(msg_req);
}
function onButtonSend()
{
	var elem = document.createElement("div");
	elem.className="myText";
	elem.innerHTML = input.value;

	var message = {
		type:"msg",
		text : input.value,
		username : user_name
		
	};
	
	input.value = "";
	chat_container.appendChild(elem);

	var msg_str = JSON.stringify( message );
	server.sendMessage(msg_str);



}
