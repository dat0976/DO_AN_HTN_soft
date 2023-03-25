const socket = io('http://localhost:8888');
var quantity_in = 0;
var quantity_out =0;
// socket.on("quantityin",function(data_received){
//     quantity_in = data_received;
// })
// socket.on("quantityout",function(data_received){
//     quantity_out = data_received;
// })
var temp1 = 0;
var humi1 = 0;
var light1 = 0;
var temp2 = 0;
var humi2 = 0;
var light2 = 0;

socket.on("temp_1",function(data_received){
    temp1 = data_received;
})
socket.on("humi_1",function(data_received){
    humi1 = data_received;
})
socket.on("light_1",function(data_received){
    light1 = data_received;
})
socket.on("temp_2",function(data_received){
    temp1 = data_received;
})
socket.on("humi_2",function(data_received){
    humi2 = data_received;
})
socket.on("light_2",function(data_received){
    light2 = data_received;
})

  








