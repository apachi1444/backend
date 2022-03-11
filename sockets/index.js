//instancier express
const app = require("express")();

//créer le serveur http qui va utiliser express
const http = require("http").createServer(app);

//instancier socket.io
const io=require("socket.io")(http);

//creer une route vers "/" et le callback c'est ce qu'on repond
app.get("/",(req,res)=>{
    //console.log(req);
    //pour utiliser la reponse renvoyé par la requete
    //__dirname une variable systeme pour chercher un fichier
    res.sendFile(__dirname + "/chat.html");
});

//on ecoute l'evenement "connection" de socket io avec la fonction socket.on
//l'initialisation en quelque sorte
io.on("connection",(socket)=>{
	//on pourra effectuer d'autres actions ici lorsqu'une personne sera en ligne
    console.log("Une connection activée au socket");

    //pour ecouter les deconnections
    socket.on("disconnect",()=>{
        console.log("Un utilisateur s'est déconnecté");
    })

    //la partie de gestion du chat
    //on met n'importe quel nom comme nom d'evenement à ecouter là par exemple on met chat_message
    socket.on("chat_message",(msge)=>{
        //une fois le message recu on le renvoie à tout le monde qui ecouteront received_message
        io.emit("received_message",msge);
    })
})

//demander au serveur http de repondre sur le port 3000
http.listen(process.env.PORT || 3000,()=>{
    console.log("En train d'ecouter le port 3000");
});
