var mysql = require("mysql")
var express = require("express") //tạo giao diện dùng ejs thay
var mqtt = require("mqtt") //gọi pub hoặc sub
var client = mqtt.connect('mqtt://192.168.0.112')

//kết nối mysql để nhập vào database
var app = express()
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:"",
    database: "doan"
});

//thông báo ở teminal khi kết nối thành công mqtt
con.connect(function(err){
    if(err) throw err;
    console.log("mysql connected")
})

app.use('/public', express.static('public'));
app.set("view engine", "ejs")
app.set("views","./views")

//giao thức
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3002);//port server hoạt động

// Kiem tra ket noi với MQTT
client.on('connect',function(){
    console.log("mqtt connected")
    client.subscribe("sensor") //nhận gói tin sensor từ server khi đã pub
  })

//chạy file liem.ejs
app.get("/",function(req,res){
    res.render("dashboard")
})
app.get("/",function(req,res){
    res.render("room")
})
app.get("/",function(req,res){
    res.render("devices")
})
app.get("/",function(req,res){
    res.render("security")
})
app.get("/",function(req,res){
    res.render("statistics")
})



// lắng nghe các topic đã sub vào
client.on("message",function(topic,message,h){
    const data = JSON.parse(message)// tách các giá trị nhiệt độ, độ ẩm , ánh sáng từ chuỗi về thành mảng gồm 3 phần tử
    var state_1 = data.state_1              //nhận dữ liệu
    var state_2 = data.state_2
    var temp_data =  data.temperature//.toFixed(0)  
    var humi_data =  data.humidity//.toFixed(0)
    var light_data = data.light//.toFixed(0)
    
    //đẩy dữ liệu vào database mysql
    var sql = "insert into datasensors(temp,humi,light) value ( "+temp_data+" , "+humi_data+" ,"+light_data+")" //inset vào database
    con.query(sql,function(err,result){
        if (err) throw err
        console.log( " temp: "+temp_data+" ,humi: "+humi_data+", light: "+light_data+" ")                  //hiện thông số ở cmd
    })
      
    //io.emit là gửi cho tất cả client kết nối đến
    io.emit("temp",temp_data) //gửi temp_data cho temp
    io.emit("humi",humi_data)
    io.emit("light",light_data)
    io.emit("relay_1",state_1)
    io.emit("relay_2",state_2)
})

io.on("connection",function(socket){//lắng nghe sự kiện 
    console.log('user ' + socket.id + " connected") //hiển thị ở cmd id khi kết nối thành công
    socket.on("control_relay_1",function(state){ //lắng nghe sự kiện control_relay_1
        if(state == "0"){ //nếu state =o thì pub gói tin "0" đến topic relay_1 
            client.publish("relay_1","0")    
            //con.query("insert into relay(relay_id, state) value ( 'relay_1' , 'OFF') " )
        }else{
            client.publish("relay_1","1")
            //con.query("insert into relay(relay_id, state) value ( 'relay_1' , 'ON') " )
        }
    })

    socket.on("control_relay_2",function(state2){
        if(state2 == "0"){
            client.publish("relay_2","0")
            //con.query("insert into relay(relay_id, state) value ( 'relay_2' , 'OFF') " )
        }else{
            client.publish("relay_2","1")
            //con.query("insert into relay(relay_id, state) value ( 'relay_2' , 'ON') " )
        }
    })
})
