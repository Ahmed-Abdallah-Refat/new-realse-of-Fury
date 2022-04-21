const moment = require('moment');
const { MessageEmbed } = require("discord.js")
const { COLOR, PREFIX, OWNER_ID } = require("../config.json");
let week =0;


module.exports = {
  name: "stats",
  "aliases": ["status", "about", "info", "bot"],
  usage: `${PREFIX}stats`,
  description: "Get the detailed information of bot",
 async execute(client, message, args) {
     //----BOT UPTIME WITH Real Life
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
        week = 0;
        weeks += `${week} week, `;
    }

    if(minutes > 60){
        minutes = 0;
    }

    let uptime = `\`${days}\` Days, \`${hours}\` Hours, \`${minutes}\` Minutes, \`${seconds}\` Seconds`
    let ID = `\`${client.user.id}\``;
    //----

    let embed = new MessageEmbed()
    .setColor(COLOR)
    .setThumbnail(client.user.displayAvatarURL())
    .setAuthor(`${message.author.username}`, message.author.avatarURL())
    .setDescription(` **${client.user.username}** \`BOT\` **INFORMATION**`)
    .addField("SERVERS", client.guilds.cache.size, true)
    .addField("USERS", `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`, true)
    .addField("CHANNELS", client.channels.cache.size, true)
    .addField("PRESENCE", `${PREFIX}help`, true)
    .addField("STATUS", client.user.presence.status, true)
    .addField("PING" , `  ${Date.now() - message.createdTimestamp} ` + 'MS' , true)
    .addField('RAM', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("ID", `${ID}`, true)
    .addField(`OWNER`, `[**Ahmed Fury#7700**](https://discord.bio/p/fury)`, true)
    .addField("UPTIME", `${uptime}`, false)
    console.log(client.user.presence)
    message.channel.send(embed)
  }
};
