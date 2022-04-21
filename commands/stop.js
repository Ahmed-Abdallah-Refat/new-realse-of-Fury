const { MessageEmbed } = require("discord.js");
const { COLOR, PREFIX } = require("../config.json");
let embed = new MessageEmbed()
.setColor(COLOR)
const discord = require("discord.js");

module.exports = {
  name: "stop",
  aliases: ["st", "end"],
  usage: `${PREFIX}stop`,
  description: "Stop the music",
  execute(client, message, args) {
    
    let RE = new MessageEmbed()
    const { channel } = message.member.voice;
    if (!channel) {
      RE.setColor("RED")
      RE.setAuthor("YOU ARE NOT IN VOICE CHANNEL");    
      return message.channel.send(RE);
    }
         const vq = message.client.queue.get(message.guild.id);

     if (vq && channel !== message.guild.me.voice.channel)
      return message.channel.send(` <@!${message.author.id}> SORRY JUST JOIN ${message.client.user} CHANNEL`)
      .catch(console.error);
  
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setColor("RED")
      embed.setAuthor("NOTHING PLAYING TO STOP");
      return message.channel.send(embed);
    }
    
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    message.react("⏹️")
  }
};
