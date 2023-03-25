const socket = io('http://localhost:3002');
var T1=3000;
var nda = 0;
function load(){
    //nhiệt độ
    nda = Math.floor(Math.random() * (100 - 1))+1;
    document.getElementById('de1').innerHTML = nda + '%';
    var yValues = [100-nda,nda];
    var barColors = ["rgba(54, 52, 54, 0.1)","rgb(179, 19, 19,.8)"];
    new Chart("n_d", {
        type: "doughnut",
        data: {
        datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
    });
}
setInterval(load,T1);