const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "#",
  aliases: ["t", "say"],
  usage: "OWNER ONLY",
  description: "MAKE `BOT` WRITING",
  execute(client, message, args) {

    if (!args.length) 
      return message.channel.send("Please give a text to **EMBED**")
    
    const prms = message.member.hasPermission("ADMINISTRATOR")
if (!prms)
 return   message.channel.send(":x: you dont have the **ADMINSTRATOR** permission")
    
    let COLOR  = message.member.displayHexColor;

    let embed = new MessageEmbed()
    embed.setDescription(args.join("  "));
    embed.setColor(COLOR)
    message.delete();
   return message.channel.send(embed)
  }
  }

