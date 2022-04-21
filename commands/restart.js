const { COLOR, OWNER_ID, PREFIX } = require("../config.json")
const { MessageEmbed }= require("discord.js")
    let embed = new MessageEmbed()

module.exports = {
  name: "restart",
  aliases: ["reboot", "reset"],
  usage: `${PREFIX}restart`,
  description: "Restart The Bot by OWNER ONLY",
  async execute (client, message, args) {
    embed.setAuthor(`Reboot`, `https://storage.googleapis.com/discordstreet/emojis/acec5afe-54f0-46ab-b503-d341fc0d2665.gif`)
    .setColor(COLOR)
    
      const r = await message.channel.send("Reboot...")
     
      let restembed = new MessageEmbed()
        const owner = `${OWNER_ID}`; // place your discord ID here.
    if (message.author.id === owner) {
        restembed.setAuthor(`Rebooting`, `https://storage.googleapis.com/discordstreet/emojis/c8de6d4f-af63-47d5-a8dc-8f424733fb91.gif`)
        restembed.setDescription(`Dear, ${message.author}, I'll restart this moment....`);
        restembed.setColor("GREEN")
         setTimeout(() => {  process.exit(0)  }   )
    }
         return r.edit(restembed)
    }
  }