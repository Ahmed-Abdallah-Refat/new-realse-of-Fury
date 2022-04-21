const { MessageEmbed } = require("discord.js");
const { COLOR, PREFIX } = require("../config.json");
let embed = new MessageEmbed()
.setColor(COLOR)

module.exports = {
  name: "resume",
  aliases: ["re", "r", "ru"],
  usage: `${PREFIX}resume`,
  description: "Resume the paused Song",
  execute(client, message, args) {
    
    let RE = new MessageEmbed()
    const { channel } = message.member.voice;
    if (!channel) {
      RE.setColor("RED")
      RE.setAuthor("YOU ARE NOT IN VOICE CHANNEL");
      return message.channel.send(RE)
    }
          //IF AUTHOR IS NOT IN SAME VOICE CHANNEL

            const vq = message.client.queue.get(message.guild.id);
      if (vq && channel !== message.guild.me.voice.channel)
      return message.reply(`SORRY JUST JOIN ${message.client.user} CHANNEL`)
      .catch(console.error);
  

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();

     embed.setDescription(`:play_pause: [${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) - **RESUMED**`)
      return message.channel.send(embed)
    }  
    embed.setColor("RED")
    embed.setAuthor("NOTHING PLAYING TO RESUME");
    message.channel.send(embed)
  }
};
