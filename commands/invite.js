const { MessageEmbed } = require("discord.js")
let embed = new MessageEmbed()
const { PREFIX, COLOR } = require("../config.json")
module.exports = {
  name: "invite",
  aliases: ["inv", "link", "add"],
  usage: `${PREFIX}invite`, 
  description: "Link of invite",
  async execute(client, message, args ) {
    let embed = new MessageEmbed()
    .setAuthor(`WELCOME : ${message.author.username}`, message.author.displayAvatarURL())
    .setTitle("Add bot to your Server")
    .setURL("https://top.gg/bot/708255528106721340")
    .addField(`Invite Link`, `[**Click Here**](https://discord.com/api/oauth2/authorize?client_id=708255528106721340&permissions=37748672&scope=bot)`, true)
    .addField(`Server Support`, `[**Click here**](https://discord.gg/PkHFFha)`, true)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(COLOR)
    return message.channel.send(embed)
    
  }
}