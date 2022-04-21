const { MessageEmbed } = require("discord.js");
const { COLOR , PREFIX} = require("../config.json");
let embed = new MessageEmbed()
.setColor(COLOR)


module.exports = {
  name: "loop",
  aliases: ["replay", "lo"],
  usage: `${PREFIX}loop/replay`,
  description: "LOOP THE QUEUE",
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
      return message.channel.send(` <@!${message.author.id}> SORRY JUST JOIN ${message.client.user} CHANNEL`)
      .catch(console.error);
  
    
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("NOTHING PLAYING to [ LOOP/REPEAT ]");
      return message.channel.send(embed)
    }
    
    //OOOOF
    serverQueue.loop = !serverQueue.loop
    
    
    
    embed.setAuthor(`Loop is now ${serverQueue.loop ? "**Enabled**" : "**Disabled**"} `)
    message.channel.send(embed)
    
    
    
  }
}
