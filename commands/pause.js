const { MessageEmbed } = require("discord.js");

const { COLOR, PREFIX } = require("../config.json");
let embed = new MessageEmbed()
.setColor(COLOR)

module.exports = {
  name: "pause",
  aliases: ["pu", "pa"],
  usage: `${PREFIX}pause`,
  description: "pause the song",
  execute (client, message, args) {
    
    let RE = new MessageEmbed()
  const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
     RE.setColor("RED") 
     RE.setAuthor("YOU ARE NOT IN VOICE CHANNEL");
      return message.channel.send(RE)
    }
      const vq = message.client.queue.get(message.guild.id);

     if (vq && channel !== message.guild.me.voice.channel)
      return message.reply(`SORRY JUST JOIN ${message.client.user} CHANNEL`)
      .catch(console.error);
   
    
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
     RE.setColor("RED")
     RE.setAuthor ("NOTHING PLAYING TO PAUSE");
      return message.channel.send(RE)
    }
    
    if(serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true)
      embed.setDescription(` :pause_button: [${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) - **PAUSED** `)
     return message.channel.send(embed)
  }  
  }
}
