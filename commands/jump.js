const { MessageEmbed } = require("discord.js")
const { COLOR, PREFIX } = require("../config.json");

module.exports = {
  name: "jump",
  aliases: ["j", "ju", "skipto"],
  usage: `${PREFIX}jump`,
  description: "Jump to any song you like",
  execute (client, message, args) {
    
     let embed = new MessageEmbed()
     .setColor(COLOR);
    
      //IF AUTHOR IS NOT IN VOICE CHANNEL
    const { channel } = message.member.voice;
    if (!channel) {
      embed.setColor("RED")
      embed.setAuthor("YOU ARE NOT IN VOICE CHANNEL")
      return message.channel.send(embed);
    }
         //IF AUTHOR IS NOT IN SAME VOICE CHANNEL
   const vq = message.client.queue.get(message.guild.id);
     if (vq && channel !== message.guild.me.voice.channel)
      return message.channel.send(` <@!${message.author.id}> SORRY JUST JOIN ${message.client.user} CHANNEL`)
      .catch(console.error);
  
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("NOTHING PLAYING TO JUMP")
      return message.channel.send(embed);
    }
     if(!args[0]) {
      embed.setAuthor(`Please Give The Song Number`)
      return message.channel.send(embed)
    }
    
      if(isNaN(args[0])) {
      embed.setAuthor("PLEASE ENTER NUMBERS ONLY")
      return message.channel.send(embed)
    }
    
  if(serverQueue.songs.length < args[0]) {
    embed.setAuthor("CAN'T FIND THIS SONG IN LIST")
    return message.channel.send(embed)  
                                         }
    serverQueue.songs.splice(0, Math.floor(parseInt(args[0] - 1)))
    serverQueue.connection.dispatcher.end()
    
    embed.setDescription(`JUMPED TO THE SONG NUMBER - ${args[0]}`)
    message.channel.send(embed)
    
  }
}
