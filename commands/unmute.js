const { MessageEmbed } = require("discord.js");

const { COLOR, PREFIX } = require("../config.json");
module.exports = {
  name: "unmute",
  aliases: ["unsilent", "unmutemusic", "unmu"],
  usage: `${PREFIX}mute`, 
  description: "Mute the volume of the song",
  execute(client, message, args) {
  
    let embed = new MessageEmbed().setColor(COLOR);

   let RE = new MessageEmbed()  
    const { channel } = message.member.voice;
    if (!channel) {
      RE.setColor("RED")
      RE.setAuthor("YOU ARE NOT IN VOICE CHANNEL")
      return message.channel.send(RE);
    }
    
        const vq = message.client.queue.get(message.guild.id);
      if (vq && channel !== message.guild.me.voice.channel)
      return message.channel.send(` <@!${message.author.id}> SORRY JUST JOIN ${message.client.user} CHANNEL`)
  
      .catch(console.error);
  
    
     const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setColor("RED")
      embed.setAuthor("NOTHING PLAYING TO UNMUTE THE VOLUME")
      return message.channel.send(embed);
    }
    
      
    serverQueue.volume = 100
    serverQueue.connection.dispatcher.setVolumeLogarithmic(serverQueue.volume / 100)
    embed.setAuthor("UNMUTED", "https://storage.googleapis.com/discordstreet/emojis/5d3a1892-e10d-4c82-8dce-2d4bd209afec.gif")
    embed.setColor("GREEN")
    message.channel.send(embed)
    
  }
};
