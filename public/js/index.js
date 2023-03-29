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
//menu
let auto=document.querySelector('.auto')
var ttd4=0;
let checkbox3=document.getElementById('check3');
checkbox3.addEventListener('click', function(){
  if(checkbox3.checked==true){
    var result=confirm("Bật Chế Độ Auto ʕ´•ᴥ•`ʔ")
    if(result){
      socket.emit("control_relay_4","1")
    }else{
      checkbox3.checked=false
    }
  }else{
    socket.emit("control_relay_4","0"); 
  }}
);
socket.on("relay_auto",function(data_received){
  ttd4=data_received;
  if(ttd4==1){
    document.getElementById("check3").checked=true
    document.getElementById('e4').classList.add('icon-1');
    document.getElementById('checkauto').classList.add('autobr');
    auto.classList.add('tive');
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
    document.getElementById("check3").checked=false
    document.getElementById('e4').classList.remove('icon-1');
    document.getElementById('checkauto').classList.remove('autobr');
    auto.classList.remove("tive");
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
    document.getElementById("check").checked=true
    document.getElementById('e1').classList.add('ic-light');
  }else{
    document.getElementById("check").checked=false
    document.getElementById('e1').classList.remove('ic-light');
  };
})
let checkbox=document.getElementById('check');
checkbox.addEventListener('click', function(){
  if(checkbox.checked==true){
    var result=confirm("Bật Đèn 1 ʕ´•ᴥ•`ʔ")
    if(result){
      socket.emit("control_relay_1","1")
    }else{
    checkbox.checked=false
    }
  }else{
    socket.emit("control_relay_1","0")
  }}
);
//n2
var ttd2=0;
socket.on("relay_2",function(data_received){
  ttd2=data_received;
  if(ttd2==1){
    document.getElementById("check1").checked=true
    document.getElementById('e2').classList.add('ic-light');
  }else{
    document.getElementById("check1").checked=false
    document.getElementById('e2').classList.remove('ic-light');
  }
})
let checkbox1=document.getElementById('check1');
checkbox1.addEventListener('click',function(){
  if(checkbox1.checked==true){
    var result=confirm("Bật Đèn 2 ʕ´•ᴥ•`ʔ")
    if(result){
      socket.emit("control_relay_2","1")
    }else{
      checkbox1.checked=false
    }
  }else{
    socket.emit("control_relay_2","0")
  }}
);
//n3
var ttd3=0;
socket.on("relay_3",function(data_received){
  ttd3=data_received;
  if(ttd3==1){
    document.getElementById("check2").checked=true;
    document.getElementById('e3').classList.add('icon-1')
  }else{
    document.getElementById("check2").checked=false;
    document.getElementById('e3').classList.remove('icon-1')
  }
})
let checkbox2=document.getElementById('check2')
checkbox2.addEventListener('click',function(){
  if (checkbox2.checked==true){
    var result=confirm("Bật Thiết Bị Làm Mát ʕ´•ᴥ•`ʔ")
    if(result){
      socket.emit("control_relay_3","1")
    }else{
      checkbox2.checked=false
    }
    }else{
      socket.emit("control_relay_3","0")
    }}
);

var xValues = ["temp-1", "humidity-1", "temp-2", "humidity-2", "Argentina"];

var barColors = ["red", "green","blue","orange","brown"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: [x1, 50, 50, 20, x1],
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


/////////////////////////
(function () {
    var DIV = "div";
    var BUTTON = "button";
    var SPAN = "span";
    var P = "p";
    var A = "a";
  
    var defaults = {
      title: "QUANTITY",
      catagories: [
        {
          name: "INSIDE",
          value: 60,
          color: "#00be3f",
        },
        {
          name: "OUTSIDE",
          value: 100-60,
          color: "#636363",
        },
  
      ],
    };
  
    window.addEventListener("load", function () {
      initSteppedProgress();
    });
  
    function initSteppedProgress() {
      [].forEach.call(
        document.querySelectorAll("[data-stepped-bar]"),
        function (steppedProgress, index) {
          if (steppedProgress) {
            var valueTotal = 0;
            var data;
            if (steppedProgress.getAttribute("data-stepped-bar")) {
              data = JSON.parse(steppedProgress.getAttribute("data-stepped-bar"));
            } else {
              data = defaults;
            }
  
            //#region: Markup
  
            var title = createElementWithClass(P, "syncro-card-title");
            title.textContent = data.title;
  
            var step = createElementWithClass(DIV, "syncro-progress-stepped");
  
            var row = createElementWithClass(DIV, "syncro-row");
  
            data.catagories.forEach(function (catagory, i) {
              valueTotal += catagory.value;
            });
  
            data.catagories.forEach(function (catagory, i) {
              stepItem = createElementWithClass(
                DIV,
                "syncro-progress-stepped-item"
              );
              stepItem.setAttribute(
                "data-id",
                "progress-stepped-item-" + index + "-" + i
              );
              stepItem.textContent = catagory.value;
              stepItem.style.width = (catagory.value / valueTotal) * 100 + "%";
              stepItem.style.backgroundColor = catagory.color;
  
              step.appendChild(stepItem);
  
              var dot = createElementWithClass(SPAN, "syncro-dot");
              dot.style.backgroundColor = catagory.color;
  
              var category = createElementWithClass(SPAN, "syncro-category-name");
              category.textContent = catagory.name;
  
              var btn = createElementWithClass(BUTTON, "syncro-btn");
              btn.setAttribute(
                "data-target",
                "progress-stepped-item-" + index + "-" + i
              );
              btn.appendChild(dot);
              btn.appendChild(category);
  
              var col = createElementWithClass(DIV, "syncro-col-auto");
              col.appendChild(btn);
  
              row.appendChild(col);
            });
  
            var cardBody = createElementWithClass(DIV, "syncro-card-body");
            cardBody.appendChild(title);
            cardBody.appendChild(step);
            cardBody.appendChild(row);
  
            var card = createElementWithClass(DIV, "syncro-card");
            card.appendChild(cardBody);
  
            var markup = createElementWithClass(DIV);
            markup.appendChild(card);
  
            steppedProgress.innerHTML = markup.innerHTML;
  
            //#endregion: Markup
  
            //ham an trong chart:
            [].forEach.call(
              steppedProgress.querySelectorAll(".syncro-progress-stepped-item"),
              function (el) {
                el.addEventListener("mouseenter", (e) => {
                  toggleActive(e, el);
                });
                el.addEventListener("mouseleave", (e) => {
                  toggleActive(e, el);
                });
              }
            );
            //ham an dau cham
            [].forEach.call(
              steppedProgress.querySelectorAll(".syncro-btn"),
              function (el) {
                el.addEventListener("click", function () {
                  const dataID = el.getAttribute("data-target");
                  var targetElm = document.querySelector(
                    '[data-id="' + dataID + '"]'
                  );
  
                  if (targetElm.classList.contains("active")) {
                    targetElm.classList.remove("active");
                  } else {
                    [].forEach.call(
                      steppedProgress.querySelectorAll(
                        ".syncro-progress-stepped-item"
                      ),
                      function (el) {
                        el.classList.remove("active");
                      }
                    );
                    targetElm.classList.add("active");
                  }
                });
              }
            );
            //#endregion
          }
        }
      );
    }
  //ham hover
    function toggleActive(e, el) {
      if (e.type === "mouseenter") {
        if (!el.classList.contains("active")) {
          el.classList.add("active");
        }
      } else if (e.type === "mouseleave") {
        if (el.classList.contains("active")) {
          el.classList.remove("active");
        }
      }
    }
  
    function createElementWithClass(element, className = "") {
      var ele = document.createElement(element);
      if (className) {
        var classList = className.split(" ");
        classList.forEach(function (value, index) {
          ele.classList.add(value);
        });
      }
      return ele;
    }
  })();
