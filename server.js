const http = require('http');
const express = require('express');
const app = express();
const discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const client = new discord.Client({
  disableEveryone: true,
  disabledEvents: ["TYPING_START"]
});
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX, COLOR } = require("./config.json");
const sql = require("sqlite");
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const moment = require("moment")
//--------------
//--------------
var server = require('http').createServer(app);
app.get("/", (request, response) => {
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//--------------
// Guild Create
client.on("guildCreate", guild => {

let defaultChannel = " ";
guild.channels.cache.forEach((channel) => {
  if(channel.type == "text" && defaultChannel == " ") {
    if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
      defaultChannel = channel;
    }
  }
})
  let embed = new discord.MessageEmbed()
  embed.setColor("GREEN")
  embed.setDescription(`Thanks For Adding me, my Prefix is \`${PREFIX}\` For Commands \`,help\` or \`,commands\`  https://top.gg/bot/708255528106721340 \` for Invite me\` or \`,invite\``) 
defaultChannel.send(embed)});
//-------------
client.on("guildDelete", (guild, message) => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});
//CLIENT EVENTS
client.on('ready', () => {
  client.user.setStatus("online");
  var playing = [`on ${client.guilds.cache.size} servers`,
                 `${PREFIX}help`]
  var interval = setInterval(function() {
    var game = Math.floor((Math.random() * playing.length) + 0);
    client.user.setActivity({
      name: playing[game],
      type: 'PLAYING',
      url: "https://www.twitch.tv/fury"
    })
  }, 20 * 1000);
  console.log(`Logged in as ${client.user.tag}!`);
});
//----------------------
let data = {}
data.playlists = {}

client.on("warn", info => console.log(info));
client.on("error", console.error);
//DEFINIING
client.commands = new discord.Collection();
client.prefix = PREFIX;
client.queue = new Map();
client.vote = new Map();
const Timers = new Map();
module.exports = { Timers: Timers };
//LETS LOAD ALL FILES
const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file =>
  file.endsWith(".js")
);
for (const file of cmdFiles) {
  const command = require(join(__dirname, "commands", file));
  client.commands.set(command.name, command);
} //LOADING DONE

// WHEN SOME ONE MENTION THE BOT
client.on('message', message => {
     const embed = new discord.MessageEmbed()
        .setColor(COLOR)
        .setDescription(`Hello ${message.author}, My prefix is  \`${client.prefix}\` or \`@mention\``)
const ar = {
        Mention1: `<@${client.user.id}>`,
        Mention2: `<@!${client.user.id}>`
    }
   //trigger 
        if (message.content.toLowerCase() === ar.Mention2) {
            message.channel.send(embed).then(t => t.delete({ timeout: 15000 })
        )
    } else {
        if (message.content.toLowerCase() === ar.Mention1) {
            message.channel.send(embed).then(t => t.delete({ timeout: 15000 }))
        }
    }
});
//-----------SET NAME/AVATAR
client.on("message", message => {
  // 2-0-0-2
  let embed = new MessageEmbed()
  let argresult = message.content
    .split(` `)
    .slice(1)
    .join(" ");
  if (message.content.startsWith(PREFIX + "setName")) {
    if (!argresult)
      embed.setDescription("Name Changed to" + `\`${message.guild.name}\``);
    client.user.setUsername(argresult);
    return message.channel.send(embed);
  } else if (message.content.startsWith(PREFIX + "setAvatar")) {
    embed.setDescription("Avatar is Changed");
    client.user.setAvatar(argresult);
    return message.channel.send(embed);
  }
});
//----------------- if message == DM
client.on("message", function(message) {
  if (message.channel.type === "dm") {
    if (message.author.id === client.user.id) return;
    var Me = new MessageEmbed()
      .setColor(COLOR)
      .setTimestamp()
      .setTitle("You have New Message")
      .setThumbnail(message.author.avatarURL())
      .setDescription(`\n\n\`\`\`${message.content}\`\`\``)
      .setFooter(
        `Message From : ${
          message.author.tag
        } (${message.author.presence.status.toUpperCase()})`
      );
    client.channels.cache.get(`714929631601360916`).send({ embed: Me });
  }
});

//WHEN SOMEONE MESSAGE
client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;
const cooldowns = new discord.Collection();

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new discord.Collection());
  }
let squeue = message.client.queue.get(message.guild.id);
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(client, message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
});

//DONT DO ANYTHING WITH THIS TOKEN lol
client.login(TOKEN);
  
