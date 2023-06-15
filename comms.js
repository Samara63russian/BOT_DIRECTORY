const config = require('./config.json'); // Подключаем файл с параметрами и информацией
//const Discord = require_once('discord.js'); // Подключаем библиотеку discord.js
const prefix = config.prefix; // «Вытаскиваем» префикс

// Команды //

function test(robot, mess, args) {
  mess.channel.send('Test!')
}


// Список команд //

var comms_list = [{
  name: "test",
  out: test,
  about: "Тестовая команда"
}];


  
  function hello(robot, mess, args) {
    mess.reply("Привет!")
  }


// Name - название команды, на которую будет реагировать бот
// Out - название функции с командой
// About - описание команды 
