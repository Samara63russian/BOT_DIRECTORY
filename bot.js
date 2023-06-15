// делаем мешанину языков
import { createRequire } from 'module'
const require = createRequire(import.meta.url);

//const ROOT_DIR = 'C:/testdiscordbot';
const ROOT_DIR = 'D:/!!!DISCORD BOT 3/';

const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./creds.json');
const doc = new GoogleSpreadsheet('1bj8TwqoZAo1xO4us9C3kiW4aWwHLV0tqpPetFvxpMLQ');
//const robot = new Discord.Client(); // Объявляем, что robot - бот

const nodeHtmlToImage = require('node-html-to-image')
const Jimp = require('jimp');
const wrap = require('word-wrap');

import { Console } from 'node:console'
import { Transform } from 'node:stream'

//const Console = require('node:console');
//const Transform = require('node:stream');


const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
const logger = new Console({ stdout: ts })

function getTable (data) {
  logger.table(data)
  return (ts.read() || '').toString()
}

let res1;

const { Client, GatewayIntentBits, Events } = require('discord.js');

const robot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

//const comms = require("./comms.cjs"); // Подключаем файл с командами для бота
const fs = require('fs'); // Подключаем родной модуль файловой системы node.js  
let config = require('./config.json'); // Подключаем файл с параметрами и информацией
const { channel } = require('diagnostics_channel');
let token = config.token; // «Вытаскиваем» из него токен
let prefix = config.prefix; // «Вытаскиваем» из него префикс

let sheet;
let rows; 
let message = [];

function breakLines(text, imageWidth, font){
  const texts = text.split('\n');
  if (texts.length > 1) {
      for (let i = 0; i < texts.length - 1; i++) {
          let width = Jimp.measureText(font, texts[i] + '|');
          while (width < imageWidth) {
              texts[i] += ' ';
              width = Jimp.measureText(font, texts[i] + '|');
          }
      }
      text = texts.join('');
  }
  return text;
}



robot.on('ready', () => {
    console.log(`Logged in as ${robot.user.tag}!`);
  });
  
  robot.on('messageCreate', msg => {
    //msg.channel.send("https://swgoh.gg/g/dSZUgLnyRpG12s-nm-yagg/");
    //await(5000);
    if (msg.content === '/guild-info') {
      message=["Гильдии альянса:"];
      (async function() {
        await doc.useServiceAccountAuth({
          client_email: creds.client_email,
          private_key: creds.private_key,
        });
        await doc.loadInfo();
    
        sheet = doc.sheetsByIndex[0];
        rows = await sheet.getRows(); // Получаем все строки таблицы
        //console.log(rows);
        
        rows.forEach(function(r){ 
            var guildName = r['_rawData'][1]+("\n");
            var guildLink = r['_rawData'][12]+("\n");
            message.push( r['_rawData'][0] + ' ' + guildName + ':boom: ' + r['_rawData'][2] + ' :busts_in_silhouette: ' + r['_rawData'][3] + '  '  + guildLink); 
        }); // Генерируем сообщение для отправки в бота
        msg.channel.send(message.join('\n')); // Отправляем сообщение с данными в чат
        
      }());
      
    }

    if (msg.content === '/pic_test') {
      message=["Гильдии альянса:"];
      (async function() {
        await doc.useServiceAccountAuth({
          client_email: creds.client_email,
          private_key: creds.private_key,
        });
        await doc.loadInfo();
    
        sheet = doc.sheetsByIndex[0];
        rows = await sheet.getRows(); // Получаем все строки таблицы
        //console.log(rows);
        
        message = "https://docs.google.com/spreadsheets/d/1bj8TwqoZAo1xO4us9C3kiW4aWwHLV0tqpPetFvxpMLQ/embed/oimg?id=1bj8TwqoZAo1xO4us9C3kiW4aWwHLV0tqpPetFvxpMLQ&oid=698785305&disposition=ATTACHMENT&bo=false&filetype=png&zx="+Date.now();
        msg.channel.send(message); // Отправляем сообщение с данными в чат
        
      }());
      
    }

    if (msg.content === '/all-info') {
        var TEXT_REMEMBER='';
        message=["Гильдии альянса:"];
        (async function() {
          await doc.useServiceAccountAuth({
            client_email: creds.client_email,
            private_key: creds.private_key,
          });
          await doc.loadInfo();
      
          sheet = doc.sheetsByIndex[0];
          rows = await sheet.getRows(); // Получаем все строки таблицы
          
          var tableForSend = [];
          
          

          //tableForSend = getTable(tableForSend);
          
          //msg.channel.send(Table);

          
            var xml = '';
            xml = '<table style="border-collapse: collapse; width: auto; margin: 0 auto;">';

            xml += `<style>
              table {
                 font-family: "Arial";
                  border-collapse: collapse;
                  /*убираем пустые промежутки между ячейками*/
                  border: 1px solid grey;
                  /*устанавливаем для таблицы внешнюю границу серого цвета толщиной 1px*/
              }
              
              table tr.isOdd {
                background-color: lightgray;
              }
              td {
                white-space: nowrap;
              }
               
            </style>`;
          
            rows.forEach(function(r, index){ 
                 
                let isOdd = index % 2;

                xml += '<tr' + (isOdd ?' class="isOdd"' : '' )+ '>';
                
                //temp
  
                  for( let k in r['_rawData'] ){
                    xml += '<td>'+r['_rawData'][k]+'</td>';
                  }
  
                //temp
  
                xml += '</tr>';
            }); // Генерируем сообщение для отправки в бота*/
            
            
            xml += '</table>';
  
            fs.writeFile(ROOT_DIR+"/temp.html", xml, function(){}); 

            nodeHtmlToImage(
              {
                output: 'D:/!!!DISCORD BOT 3/edited.png',
                html: xml
              }
            ).then(() => {
              console.log('The image was created successfully!')
              const fileAttach = new Discord.AttachmentBuilder('D:/!!!DISCORD BOT 3/edited.png');
              const exampleEmbed = new Discord.EmbedBuilder()
                      .setTitle('Гильдии альянса')
                      .setImage('attachment://edited.png');
  
              msg.channel.send({ embeds: [exampleEmbed], files: [fileAttach] });
            })
        }());


      }

      if (msg.content === '/l') {
        var TEXT_REMEMBER='';
        message=["Гильдии альянса:"];
        (async function() {
          await doc.useServiceAccountAuth({
            client_email: creds.client_email,
            private_key: creds.private_key,
          });
          await doc.loadInfo();
      
          sheet = doc.sheetsByIndex[0];
          rows = await sheet.getRows(); // Получаем все строки таблицы
          
          var tableForSend = [];
          
          

          //tableForSend = getTable(tableForSend);
          
          //msg.channel.send(Table);

          
          
            var xml = '';
            xml = '<table style="border-collapse: collapse; width: auto; margin: 0 auto;">';

            xml += `<style>
              table {
                  font-family: "Arial";
                  border-collapse: collapse;
                  /*убираем пустые промежутки между ячейками*/
                  border: 1px solid grey;
                  /*устанавливаем для таблицы внешнюю границу серого цвета толщиной 1px*/
              }
              
              table tr.isOdd {
                background-color: lightgray;
              }
              td {
                white-space: nowrap;
              }
              body {
                width: 1040px;
                height: 362px;
              }
            </style>`;
          
            rows.forEach(function(r, index){ 
                 
                let isOdd = index % 2;

                xml += '<tr' + (isOdd ?' class="isOdd"' : '' )+ '>';
                
                //temp
                  xml += '<td>'+r['_rawData'][0]+'</td>' + '<td>'+r['_rawData'][1]+'</td>' + '<td>'+r['_rawData'][2]+'</td>' + '<td>'+r['_rawData'][16]+'</td>' + '<td>'+r['_rawData'][17]+'</td>' + '<td>'+r['_rawData'][18]+'</td>' + '<td>'+r['_rawData'][19]+'</td>' + '<td>'+r['_rawData'][20]+'</td>';
                  for( let k in r['_rawData'] ){
                    //xml += '<td>'+r['_rawData'][k]+'</td>';
                  }
  
                //temp
  
                xml += '</tr>';
            }); // Генерируем сообщение для отправки в бота*/
            
            
            xml += '</table>';
  
            fs.writeFile(ROOT_DIR+"/temp.html", xml, function(){}); 

            nodeHtmlToImage(
              {
                output: 'D:/!!!DISCORD BOT 3/edited.png',
                html: xml
              }
            ).then(() => {
              console.log('The image was created successfully!')
              const fileAttach = new Discord.AttachmentBuilder('D:/!!!DISCORD BOT 3/edited.png');
              const exampleEmbed = new Discord.EmbedBuilder()
                      .setTitle('Гильдии альянса')
                      .setImage('attachment://edited.png');
  
              msg.channel.send({ embeds: [exampleEmbed], files: [fileAttach] });
            })
        }());


      }
  
  });

 
robot.login(token); // Авторизация бота

//message = message.join('\n');
//const options = { width: 500, indent: ' ' };
//const wrappedText = wrap(message, options);
//image.print(font, 50, 50, wrappedText);