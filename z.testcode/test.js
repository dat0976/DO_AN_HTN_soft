// const toggleSwitch = document.querySelector('#dark-mode-toggle');
// const currentTheme = localStorage.getItem('theme');

// if (currentTheme) {
//   document.documentElement.setAttribute('data-theme', currentTheme);

//   if (currentTheme === 'dark') {
//     toggleSwitch.checked = true;
//   }
// }

// function switchTheme(e) {
//   if (e.target.checked) {
//     document.documentElement.setAttribute('data-theme', 'dark');
//     localStorage.setItem('theme', 'dark');
//   }
//   else {
//     document.documentElement.setAttribute('data-theme', 'light');
//     localStorage.setItem('theme', 'light');
//   }    
// }

// toggleSwitch.addEventListener('change', switchTheme, false);
// const toggleSwitch = document.querySelector('#dark-mode-toggle');
// const currentTheme = localStorage.getItem('theme');

// if (currentTheme) {
//   document.documentElement.setAttribute('data-theme', currentTheme);

//   if (currentTheme === 'dark') {
//     toggleSwitch.checked = true;
//   }
// }

// function switchTheme(e) {
//   if (e.target.checked) {
//     document.documentElement.setAttribute('data-theme', 'dark');
//     localStorage.setItem('theme', 'dark');
//   }
//   else {
//     document.documentElement.setAttribute('data-theme', 'light');
//     localStorage.setItem('theme', 'light');
//   }    
// }

// toggleSwitch.addEventListener('change', switchTheme, false);
// DELETE sensor_tt FROM sensor_tt LEFT JOIN ( SELECT id FROM sensor_tt ORDER BY id DESC LIMIT 1 ) AS result ON sensor_tt.id = result.id WHERE result.id IS NULL;











// // Lấy dữ liệu từ SQL bằng Node.js
// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'yourpassword',
//   database: 'yourdatabase'
// });

// connection.connect();

// connection.query('SELECT * FROM users', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });

// connection.end();

       
// // Bật/Tắt Dark Mode
// const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
// const currentTheme = localStorage.getItem('theme');

// if (currentTheme) {
//   document.documentElement.setAttribute('data-theme', currentTheme);
//   if (currentTheme === 'dark') {
//     toggleSwitch.checked = true;
//   }
// }

// function switchTheme(e) {
//   if (e.target.checked) {
//     document.documentElement.setAttribute('data-theme', 'dark');
//     localStorage.setItem('theme', 'dark');
//   }
//   else {
//     document.documentElement.setAttribute('data-theme', 'light');
//     localStorage.setItem('theme', 'light');
//   }    
// }

// toggleSwitch.addEventListener('change', switchTheme, false);






















// const mysql = require('mysql');

// // Thông tin database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'username',
//   password: 'password',
//   database: 'database'
// });

// // Kết nối database
// connection.connect();

// // Hàm lấy dữ liệu từ bảng setting theo nut_id
// function getSetting(nut_id) {
//   return new Promise((resolve, reject) => {
//     // Câu truy vấn
//     let query = `SELECT status FROM setting WHERE nut_id = ${nut_id}`;
//     connection.query(query, (error, results, fields) => {
//       if (error) {
//         reject(error);
//       } else {
//         const status = results[0].status;
//         // Nếu status = 1 thì bật dark mode, ngược lại thì vô hiệu hóa
//         const darkmode = status === 1 ? true : false;
//         resolve(darkmode);
//       }
//     });
//   });
// }

// // Sử dụng hàm để lấy dữ liệu theo nut_id = 1
// getSetting(1)
//   .then((darkmode) => {
//     console.log('Dark mode:', darkmode);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// // Ngắt kết nối database
// connection.end();

//dảkmode
const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);