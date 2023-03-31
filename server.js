// mở wed bằng file .ejs
var express = require('express');
var app = express();
app.set('view engine','ejs');
app.set('views','./views');
//app.use(express.static(__dirname+'/public'));//khai báo foder public
app.use('/public', express.static('public'));
//chạy file liem.ejs
app.get("/",function(req,res){
    res.render("dashboard");
});
app.get("/room",function(req,res){
    res.render("room");
});
app.get("/devices",function(req,res){
    res.render("devices");
});
app.get("/security",function(req,res){
    res.render("security");
});
app.get("/statistics",function(req,res){
    res.render("statistics");
});
app.get("/logout",function(req,res){
  res.render("logout");
});
///*
//tạo bảng dữ liệu cảm biến và nút nhấn ---start-----------------------
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "database"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //xóa các mảng cũ
  // var sql = "DROP TABLE sensor_tt";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("xóa mảng sensor_tt cũ thành công");
  // }); 
  // var sql = "DROP TABLE button_tt";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("xóa mảng button_tt cũ thành công");
  // });
  // var sql = "DROP TABLE setting";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("xóa mảng set cũ thành công");
  // });
  
  // //tạo bảng data cảm biến
  // var sql = "CREATE TABLE sensor_tt (id int(10) auto_increment primary key, nhiet_do1 float(10),do_am1 float(10),nhiet_do2 float(10),do_am2 float(10), time_x TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("tạo thành công table sensor_tt");
  // });
  // //tạo bảng data nút nhấn
  // var sql = "CREATE TABLE button_tt (id int(10) auto_increment primary key,nut_id text,status text, time_x TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("tạo thành công table nút nhấn");
  // });
  // var sql = "CREATE TABLE setting (id int(10) auto_increment primary key,nut_id text,status text, lock_s text, time_x TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("tạo thành công table nút nhấn");
  // });

 // */      
});
//tạo bảng dữ liệu cảm biến và nút nhấn ---end-------------------------
//kết nối MQTT
var mqtt = require("mqtt");
// var client = mqtt.connect('mqtt:net-radio.vov.link');
var client = mqtt.connect('mqtt://192.168.31.202');
// Kiem tra ket noi với MQTT
client.on("connect",function(){
  console.log("mqtt connected")
  client.subscribe("sub_sever");
})
//
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3003);
//nhận tín hiệu từ MQTT
client.on("message",function(topic,message,h){
    const data     = JSON.parse(message)
    var state_1    = data.state_1            
    var state_2    = data.state_2
    var state_3    = data.state_3
    var state_4    = data.state_4
    var temp_data1  = data.temperature1//.toFixed(2)
    var humi_data1  = data.humidity1//.toFixed(2)
    var temp_data2  = data.temperature2//.toFixed(2)
    var humi_data2  = data.humidity2//.toFixed(2)
    // var gas_data   = data.gas.toFixed(2)
    var light_data1 = data.light1
    var light_data2 = data.light2
    var sql = "insert into sensor_tt(nhiet_do1,do_am1,nhiet_do2,do_am2) value ( "+temp_data1+" , "+humi_data1+" ,"+temp_data2+","+humi_data2+")"
    con.query(sql,function(err,result){
        if (err) throw err
         //console.log( " nd: "+temp_data1+" da: "+humi_data1+" gas: "+temp_data2+" as: "+humi_data2+" ")
    }) 
    var dark_mode;
    con.query("SELECT status FROM setting", (error, results, fields) => {
      if (error) throw error;
      //const json_Data = JSON.parse(results[0].status);
       dark_mode =results[0].status; 
       io.emit("darkmode",dark_mode)
    });  
    // var lock;
    // con.query("SELECT lock_s FROM setting", (error, results, fields) => {
    //   if (error) throw error;
    //   //const json_Data = JSON.parse(results[0].lock_s);
    //    lock =results[0].lock_s; 
    //    io.emit("lock",lock)
    // });
    //truyền data bawngf cacs topic
    io.emit("temp_1",temp_data1)
    io.emit("humi_1",humi_data1)
    io.emit("light_1",light_data1)
    io.emit("temp_2",temp_data2)
    io.emit("humi_2",humi_data2)
    io.emit("light_2",light_data2) 
    io.emit("relay_1",state_1)
    io.emit("relay_2",state_2)
    io.emit("relay_3",state_3)
    io.emit("relay_auto",state_4)
    
});
//nhận tín hiệu nút nhấn từ client
io.on("connection",function(socket){
  console.log('user ' + socket.id + " connected")
  socket.on("control_relay_1",function(state){
    if(state == 0){
      client.publish("relay_1","0")
      con.query("insert into button_tt(nut_id, status) value ( '1' , '0') " )
    }else{
      client.publish("relay_1","1")
      con.query("insert into button_tt(nut_id, status) value ( '1' , '1') " )
    }
  })
  socket.on("control_relay_2",function(state2){
    if(state2 == 0){
      client.publish("relay_2","0")
      con.query("insert into button_tt(nut_id, status) value ( '2' , '0') ")
    }else{
      client.publish("relay_2","1")
      con.query("insert into button_tt(nut_id, status) value ( '2' , '1') ")
    }
  })
  socket.on("control_relay_3",function(state3){
    if(state3 == 0){
      client.publish("relay_3","0")
      con.query("insert into button_tt(nut_id, status) value ( '3' , '0') " )
    }else{
      client.publish("relay_3","1")
      con.query("insert into button_tt(nut_id, status) value ( '3' , '1') " )
    }
  })
  socket.on("control_relay_4",function(state4){
    if(state4 == 0){
      client.publish("relay_4","0")
      con.query("insert into button_tt(nut_id, status) value ( '4' , '0') " )
    }else{
      client.publish("relay_4","1")
      con.query("insert into button_tt(nut_id, status) value ( '4' , '1') " )
    }
  })
  socket.on("control_relay_5",function(state5){
    if(state5 == 0){
      var sql = "DELETE setting FROM setting LEFT JOIN ( SELECT id FROM setting ORDER BY id DESC LIMIT 0 ) AS result ON setting.id = result.id WHERE result.id IS NULL;";
      con.query(sql, function (err, result) {
        if (err) throw err;
        //console.log("darkmodeoff");             
      });
      con.query("insert into setting(nut_id, status) value ( '5' , '0') " )
    }else{
      var sql = "DELETE setting FROM setting LEFT JOIN ( SELECT id FROM setting ORDER BY id DESC LIMIT 0 ) AS result ON setting.id = result.id WHERE result.id IS NULL;";
      con.query(sql, function (err, result) {
        if (err) throw err;
        //console.log("darkmodeon");             
      });
      con.query("insert into setting(nut_id, status) value ( '5' , '1') " )
    }
  })
  // socket.on("control_relay_6",function(state6){
  //   if(state6 == 0){
  //     var sql = "DELETE setting FROM setting LEFT JOIN ( SELECT id FROM setting ORDER BY id DESC LIMIT 0 ) AS result ON setting.id = result.id WHERE result.id IS NULL;";
  //     con.query(sql, function (err, result) {
  //       if (err) throw err;
  //       //console.log("darkmodeoff");             
  //     });
  //     con.query("insert into setting(nut_id, status) value ( '5' , '0') " )
  //   }else{
  //     var sql = "DELETE setting FROM setting LEFT JOIN ( SELECT id FROM setting ORDER BY id DESC LIMIT 0 ) AS result ON setting.id = result.id WHERE result.id IS NULL;";
  //     con.query(sql, function (err, result) {
  //       if (err) throw err;
  //       //console.log("darkmodeon");             
  //     });
  //     con.query("insert into setting(nut_id, status) value ( '5' , '1') " )
  //   }
  // })
});
    