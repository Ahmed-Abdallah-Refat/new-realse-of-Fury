const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const { COLOR, PREFIX } = require("../config.json");
let embed = new MessageEmbed()
let week = 0;
module.exports = {
  name: "uptime",
  aliases: ["up"],
  usage: `${PREFIX}uptime`,
  description: "BOT Up time",
  execute(client, message, args) {
let uptime = ``;
      let weeks = Math.floor(client.uptime / 604800000);
      let days = Math.floor(client.uptime / 86400000);
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;
    if(hours > 23){
        days = days + 1;
        hours = 0;
    }

    if(days == 7){
        days = 0;
        week = week + 1;
    }

    if(week > 0){
        uptime += `${week} week, `;
    }

    if(minutes > 60){
        minutes = 0;
    }

    embed.setDescription(":hourglass:**Uptime** : " + `   \`${days}\`** Days**,   \`${hours}\` **Hours**,    \`${minutes}\` **Minutes**,   \`${seconds}\` **Seconds** `)
    .setColor(COLOR) 
    message.channel.send(embed);
  }
  }
