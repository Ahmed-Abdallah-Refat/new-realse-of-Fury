const { MessageEmbed } = require("discord.js");
const { COLOR, PREFIX } = require("../config.json");
 let embed = new MessageEmbed().setColor(COLOR);
module.exports = {
  name: "drop",
  aliases: ["d", "remove"],
  usage: `${PREFIX}drop`,
  description: "Drop The Song From Queue",
  execute(client, message, args) {
    //IF AUTHOOR NOT IN VOICE CHANNEL
   
     let RE = new MessageEmbed()
    const { channel } = message.member.voice;
    if (!channel) {
      RE.setColor("RED")
      RE.setAuthor("YOU ARE NOT IN VOICE CHANNEL");
      return message.channel.send(RE);
    }
     //IF AUTHOR IS NOT IN SAME VOICE CHANNEL
   const vq = message.client.queue.get(message.guild.id);
     if (vq && channel !== message.guild.me.voice.channel)
      return message.channel.send(` <@!${message.author.id}> SORRY JUST JOIN ${message.client.user} CHANNEL`)
      .catch(console.error);
  
    const serverQueue = client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("NO SONGS IN QUEUE");
      embed.setColor("RED")
      return message.channel.send(embed);
    }
    
     if(isNaN(args[0])) {
      embed.setAuthor("PLEASE ENTRE NUMBERS ONLY")
      embed.setColor("RED")
      return message.channel.send(embed)
    }
   
    if(args[0] > serverQueue.songs.length) {
      embed.setAuthor("CAN'T FIND THE SONG IN LIST")
      embed.setColor("RED")
      return message.channel.send(embed)
    }
    
    
    serverQueue.songs.splice(args[0] - 1, 1)
    embed.setDescription("DROPED THE SONG FROM QUEUE")
    return message.channel.send(embed)
  }
};
