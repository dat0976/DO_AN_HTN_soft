const menu=document.querySelector('.menu')
const navbar=document.querySelector('.nav-bar')
const left=document.querySelector('.the-left')
const avt=document.querySelector('.ptm4')
const mg1=document.querySelector('.mg1')
const mg2=document.querySelector('.mg2')
const wt=document.querySelector('.water')
menu.onclick=function(){
  navbar.classList.toggle('active')
  left.classList.toggle('active')
  avt.classList.toggle('active')
  mg1.classList.toggle('active')
  mg2.classList.toggle('active')
  wt.classList.toggle('active')
}
const cl=document.querySelector('.cl')
const clock=document.querySelector('.clock')
cl.onclick=function(){
  clock.classList.add('clx')
}
const ucl=document.querySelector('.ucl')
ucl.onclick=function(){
  clock.classList.remove('clx')
}
const socket=io('');
// window.addEventListener('load', function(){
//   socket.emit("control_relay_5","1"); 
// });
//menu
let ptc3=document.querySelector('.ptc3')
let auto=document.querySelector('.auto')
let btm=document.querySelector('.btm')
var ttd4=0;
let checkbox4=document.getElementById('check4');
checkbox4.addEventListener('click', function(){
  if(checkbox4.checked==true){
    var result=confirm("Bật Chế Độ Auto ʕ´•ᴥ•`ʔ")
    if(result){
      socket.emit("control_relay_4","1")
    }else{
      checkbox4.checked=false
    }
  }else{
    socket.emit("control_relay_4","0"); 
  }}
);
socket.on("relay_auto",function(data_received){
  ttd4=data_received;
  if(ttd4==1){
    document.getElementById("check4").checked=true
    document.getElementById('e4').classList.add('icon-1');
    document.getElementById('checkauto').classList.add('autobr');
    auto.classList.add('tive');
    btm.classList.add('btmrad');
    ptc3.classList.add('active')
    // if(temp1>26||temp2>26){
    //   socket.emit("control_relay_3","1")
    // }else{
    //   socket.emit("control_relay_3","0")
    // }
    // if(light1<400){
    //   socket.emit("control_relay_1","1")
    // }else{
    //   socket.emit("control_relay_1","0")
    // }
    // if(light2<400){
    //   socket.emit("control_relay_2","1")
    // }else{
    //   socket.emit("control_relay_2","0")
    // }
  }else{
    document.getElementById("check4").checked=false
    document.getElementById('e4').classList.remove('icon-1');
    document.getElementById('checkauto').classList.remove('autobr');
    auto.classList.remove("tive");
    btm.classList.remove('btmrad')
    ptc3.classList.remove('active')
  }
})
//data
var temp1;
var humi1;
var light1;
var temp2;
var humi2;
var light2;
var x;
socket.on("temp_1",function(data_received){
  temp1=data_received;
  document.getElementById("temp-1").innerHTML=temp1+"°C";
})
socket.on("humi_1",function(data_received){
  humi1=data_received;
  document.getElementById("humi-1").innerHTML=humi1+"%";
})
socket.on("light_1",function(data_received){
  light1=data_received;
  //x=light1
  document.getElementById("light-1").innerHTML=light1 +"lux";   
  //document.getElementById("temp-1").innerHTML = x + "°C";
})
socket.on("temp_2",function(data_received){
  temp2=data_received;
  document.getElementById("temp-2").innerHTML=temp1+"°C";
})
socket.on("humi_2",function(data_received){
  humi2=data_received;
  document.getElementById("humi-2").innerHTML=humi2+"%";
})
socket.on("light_2",function(data_received){
  light2=data_received;
  document.getElementById("light-2").innerHTML=light2+"lux";
})
//n1
var ttd1=0;
socket.on("relay_1",function(data_received){
  ttd1=data_received;
  if(ttd1==1){
    document.getElementById("check1").checked=true
    document.getElementById('e1').classList.add('ic-light');
  }else{
    document.getElementById("check1").checked=false
    document.getElementById('e1').classList.remove('ic-light');
  };
})
let checkbox1=document.getElementById('check1');
checkbox1.addEventListener('click', function(){
  if(checkbox1.checked==true){
    // var result=confirm("Bật Đèn 1 ʕ´•ᴥ•`ʔ")
    // if(result){
      socket.emit("control_relay_1","1")
    // }else{
    // checkbox1.checked=false
    // }
  }else{
    socket.emit("control_relay_1","0")
  }}
);
//n2
var ttd2=0;
socket.on("relay_2",function(data_received){
  ttd2=data_received;
  if(ttd2==1){
    document.getElementById("check2").checked=true
    document.getElementById('e2').classList.add('ic-light');
  }else{
    document.getElementById("check2").checked=false
    document.getElementById('e2').classList.remove('ic-light');
  }
})
let checkbox2=document.getElementById('check2');
checkbox2.addEventListener('click',function(){
  if(checkbox2.checked==true){
    // var result=confirm("Bật Đèn 2 ʕ´•ᴥ•`ʔ")
    // if(result){
      socket.emit("control_relay_2","1")
    // }else{
    //   checkbox2.checked=false
    // }
  }else{
    socket.emit("control_relay_2","0")
  }}
);
//n3
var ttd3=0;
socket.on("relay_3",function(data_received){
  ttd3=data_received;
  if(ttd3==1){
    document.getElementById("check3").checked=true;
    document.getElementById('e3').classList.add('icon-1')
  }else{
    document.getElementById("check3").checked=false;
    document.getElementById('e3').classList.remove('icon-1')
  }
})
let checkbox3=document.getElementById('check3')
checkbox3.addEventListener('click',function(){
  if (checkbox3.checked==true){
    // var result=confirm("Bật Thiết Bị Làm Mát ʕ´•ᴥ•`ʔ")
    // if(result){
      socket.emit("control_relay_3","1")
    // }else{
    //   checkbox3.checked=false
    // }
  }else{
    socket.emit("control_relay_3","0")
  }}
);
//nut dm
const body=document.querySelector('body')
const lime=document.querySelector('.LimE-container')
const nav=document.querySelector('.nav-bar')
const bor=document.querySelector('.nav-bar ul li')
const abc=document.querySelector('.abc')
const textnav=document.querySelector('.textnav')
const iot=document.querySelector('.iot')
const darkmodept=document.querySelectorAll('.darkmode')
// const lightvar=document.querySelectorAll('.var-size')
const ptm4=document.querySelector('.ptm4')
const btm1=document.querySelector('.btm')
var ttd5=0;  
socket.on("darkmode",function(data_received){
  ttd5=data_received;
  if(ttd5==1){  
    document.getElementById("check5").checked=true;
    document.getElementById('e5').classList.add('ic-light');
    document.getElementById('DM').classList.add('darkmoderad');
    body.classList.add('darkpr');
    lime.classList.add('darksdbr','darkbr');
    nav.classList.add('darksdnav')
    bor.classList.add('active')
    abc.classList.add('darkbr','text-dark')
    textnav.classList.add('text-dark')
    darkmodept.forEach(element => {
      element.classList.add('darkpt');
    });
    // lightvar.forEach(element1 => {
    //   element1.classList.add('text-dark')
    // });
    ptm4.classList.add('darkpr')
    btm1.classList.add('btmrad1')
  }else{
    document.getElementById("check5").checked=false;
    document.getElementById('e5').classList.remove('ic-light');
    document.getElementById('DM').classList.remove('darkmoderad');
    body.classList.remove('darkpr');
    lime.classList.remove('darksdbr','darkbr');
    nav.classList.remove('darksdnav')
    bor.classList.remove('active')
    abc.classList.remove('darkbr','text-dark')
    textnav.classList.remove('text-dark')
    darkmodept.forEach(element => {
      element.classList.remove('darkpt')
    });
    ptm4.classList.remove('darkpr')
    btm1.classList.remove('btmrad1')
  }
})
let checkbox5=document.getElementById('check5');
checkbox5.addEventListener('click', function(){
  if(checkbox5.checked==true){
    var result=confirm("Bật DarkMode ʕ´•ᴥ•`ʔ")
    if(result){
      socket.emit("control_relay_5","1")
    }else{
    checkbox5.checked=false
    }
  }else{
    socket.emit("control_relay_5","0")
  }}
);
//chart1
var xValues1 = ["INSIDE", "OUTSIDE"];
var barColors1 = ["rgba(207, 0, 0, 0.555)", "#586c8a86"];
setInterval(function(){
  new Chart("myChart1", {
    type: "horizontalBar",
    data: {
      labels: xValues1,
      datasets: [{
        backgroundColor: barColors1,
        data: [49,100-44]
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
      },
      scales: {
        xAxes: [{ticks: {min: 10, max:60}}]
      }
    }
  });
},3000) 
//chart2
var xValues = ["Temp-1", "Humidity-1", "Light-1", "Temp-2", "Humidity-2", "Light-2"];
var barColors = ["rgba(207, 0, 0, 0.555)", "rgb(0, 166, 207, 0.555)","rgb(233, 233, 0, 0.555)","rgba(207, 0, 0, 0.555)","rgb(0, 166, 207, 0.555)","rgb(233, 233, 0, 0.555)"];
setInterval(function(){
  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: [49, 44, light1, 24, 50, light2]
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "The Chart"
      }
    }
  });
},7000) 
//mes
// const myTimeout = setTimeout(myGreeting, 25000);
// function myGreeting(){
//   document.getElementById("m1").innerHTML = ""
//   document.getElementById("m2").innerHTML = ""
//   document.getElementById("m3").innerHTML = "Hệ thống hoạt động ổn định"
//   document.getElementById("m4").innerHTML = "Chúc bạn ngày mới tốt lành"
//   document.getElementById("m5").innerHTML = "Code:..."
// }
// var tt_1=0;
// setInterval(timett,1000);
// function timett(){
//   if(x>27 || x>27){
//     document.getElementById('m1').innerHTML="Thông báo:"
//     document.getElementById('m2').innerHTML="Nhiệt độ đang dần tăng cao"
//     document.getElementById('m3').innerHTML="Bạn nên bật thiết bị làm mát hoặc chế độ auto"
//     document.getElementById('m4').innerHTML="Bạn có thể bỏ qua thông báo nếu không quan tâm"
//     document.getElementById('m5').innerHTML="(Code:...)"
//   }else{
//     document.getElementById('m1').innerHTML="Hoạt động ổn định"
//     document.getElementById('m2').innerHTML=""
//     document.getElementById('m3').innerHTML=""
//     document.getElementById('m4').innerHTML=""
//     document.getElementById('m5').innerHTML="(Code:...)"
//   }
// }


