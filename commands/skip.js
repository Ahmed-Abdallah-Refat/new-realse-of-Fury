const { MessageEmbed } = require("discord.js");
const { COLOR, PREFIX } = require("../config.json");
let embed = new MessageEmbed()
.setColor(COLOR)

module.exports = {
  name: "skip",
  aliases: ["s", "next"],
  usage: `${PREFIX}skip`,
  description: "Skip the song or shift song to next",
  execute(client, message, args) {
    
    let RE = new MessageEmbed()
    const { channel } = message.member.voice;
if (!channel) {
     RE.setColor("RED")
     RE.setAuthor("YOU ARE NOT IN VOICE CHANNEL");
      return message.channel.send(RE)
    }
      // IF AUTHOR NOT IN SAME VOICE CHANNEL
        const vq = message.client.queue.get(message.guild.id);
      if (vq && channel !== message.guild.me.voice.channel)
      return message.channel.send(` <@!${message.author.id}> You must be in the same channel as ${message.client.user}`)
      .catch(console.error);
   
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
     embed.setColor("RED")
     embed.setAuthor("NOTHING PLAYING TO SKIP")
      return message.channel.send(embed);
    }

    serverQueue.connection.dispatcher.end();
    message.react("⏭️")
  }
};

