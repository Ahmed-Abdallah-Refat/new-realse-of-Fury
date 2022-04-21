const { MessageEmbed } = require("discord.js");
const { COLOR, PREFIX } = require("../config.json");
let embed = new MessageEmbed()
  
module.exports = {
  name: "ping",
  aliases: ["pong", "speed"],
  usage: `${PREFIX}ping`,
  description: "Pinging the bot",
 async execute(client, message) {
  const r = await message.channel.send(`🏓 PONG...`)

   let pingembed = new MessageEmbed()
     const PinG =  `${Date.now() - r.createdTimestamp}`
     const ApL =  `${Math.round(client.ws.ping)}`
     pingembed.setAuthor(`Status.`, `https://storage.googleapis.com/discordstreet/emojis/5d139fb9-7f60-48f4-b513-e43fd21570ce.gif`)
     pingembed.setDescription(`\`\`\`javascript\n› Time : ${PinG} ms.\n› Ping : ${ApL} ms.\`\`\``)
     pingembed.setColor(COLOR)

     return  r.edit(pingembed)
       .catch( err => message.replay("sorry i dont have premission"))
  }
};
 
