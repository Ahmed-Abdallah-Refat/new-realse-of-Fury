const { MessageEmbed } = require("discord.js");

const { COLOR, PREFIX } = require("../config.json");
module.exports = {
  name: "volume",
  aliases: ["vol", "v"],
  usage: `${PREFIX}volume`, 
  description: "Manage the volume of the song",
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
      embed.setAuthor("NOTHING PLAYING TO CHANGE THE VOLUME")
      return message.channel.send(embed);
    }
    
    if(!args[0]) {
      embed.setAuthor(`Current Volume : ${serverQueue.volume}`, `https://cdn.glitch.com/e044e79b-7b61-4ebe-93df-3cb3b79ed768%2FSlow.gif`)
      return message.channel.send(embed)
    }
    
    if(isNaN(args[0])) {
      embed.setDescription("PLEASE ENTER A NUMBERS ONLY OR USER REACTIONS [ ➕ / ➖ ]")
      return message.channel.send(embed)
    }
    
    if(args[0] > 1000) {
      embed.setAuthor("JUST BE CAREFUL LAST VOLUME IS [1000] :)")
      return message.channel.send(embed)
    }
    
    serverQueue.volume = args[0]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
    embed.setAuthor(`Volume Changed to ${args[0]}`, `https://cdn.glitch.com/e044e79b-7b61-4ebe-93df-3cb3b79ed768%2FSlow.gif`)
    message.channel.send(embed)
    
  }
};
