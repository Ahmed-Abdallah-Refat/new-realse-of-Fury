const { MessageEmbed } = require("discord.js")
const { readdirSync } = require("fs")
const { COLOR, PREFIX } = require("../config.json")

module.exports = {
  name: "help",
  aliases: ["commands", "cmds", "cmd", "h"],
  usage: `${PREFIX}help or ${PREFIX}help [command name]`,
  description: "Get all commands name and description",
  async execute (client, message, args) {
   
 if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(`${command.name}`, `https://cdn.glitch.com/e044e79b-7b61-4ebe-93df-3cb3b79ed768%2Fcircle-300x300.png`)
        .addField("Description", command.description || "Not Provided :(")
        .addField("Usage", "`" + command.usage + "`" || "Not Provied")
        .addField("aliases", "`" + command.aliases + "`" || "Not Provied")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(COLOR)
        .setFooter(`${message.author.tag}`, message.author.avatarURL())
      return message.channel.send(embed);
   } else {
        

let embed = new MessageEmbed()
.setAuthor("HELP SECTION", message.author.displayAvatarURL())
.setThumbnail(client.user.displayAvatarURL())
.setColor(COLOR)
.setTitle('Click to Invite Fury BOT')
.setURL('https://top.gg/bot/708255528106721340')
.addField('Additional Help', `[Support Server](https://discord.gg/PkHFFha) | [Invite](https://discord.com/api/oauth2/authorize?client_id=708255528106721340&permissions=37748672&scope=bot) | [Developer](https://discord.bio/p/fury)`, true)
.setDescription(`\`\`\`css
            Commands Of \[BOT\]

${PREFIX}Play : for playing songs & playlist
${PREFIX}Pause : for Pause songs 
${PREFIX}Resume : for resume songs
${PREFIX}Stop : for Stop music or stop songs
${PREFIX}Search : for Search about songs 
${PREFIX}Join : for Join your Voice channel
${PREFIX}Leave : for leave your Voice channel
${PREFIX}Queue : for list of Songs
${PREFIX}Jump : for skipto another song
${PREFIX}Drop : for drop song from queue
${PREFIX}Repeat : for repeat song or queue
${PREFIX}Shuffle : for shuffle the queue 
${PREFIX}Skip : for next song or end Song
${PREFIX}Volume : for change the song volume
${PREFIX}Mute : for Mute the song volume
${PREFIX}unMute : for unMute the song volume
${PREFIX}Nowplay : for see the song play
${PREFIX}Ping : for seeing the bot speed
${PREFIX}Stats : for BOT Information 
${PREFIX}Server : for Server Information 
${PREFIX}Invite : for invite BOT to your Server
${PREFIX}xo : for Some Fun Time with [ X & O ]

[Aliases] = ${PREFIX}help [ command name ]

\`\`\``)
.setFooter('Created by Ahmed Fury#7700')
.setTimestamp()
return message.channel.send(embed).catch(console.error)
 
   }
    
  }
}
