const { MessageEmbed } = require("discord.js");
const { COLOR, PREFIX } = require("../config.json");
let embed = new MessageEmbed()
.setColor(COLOR)
const discord = require("discord.js");

module.exports = {
  name: "join",
  aliases: ["summon", "jo"],
  usage: `${PREFIX}join/summon`,
  description: "leave the BOT",
  execute(client, message, args) {
      //IF AUTHOR IS NOT IN SAME VOICE CHANNEL
            const serve = message.client.queue.get(message.guild.id);
   const { channel } = message.member.voice;
     if (serve && channel !== message.guild.me.voice.channel)
      return message.reply(`SORRY JUST JOIN ${message.client.user} CHANNEL`)
      .catch(console.error);

 //PER
  let R = new MessageEmbed()
  
  if(!message.member.hasPermission("ADMINISTRATOR")) {
      R.setColor("RED")
      R.setAuthor("SORRY YOU DON'T HAVE [ADMINSTRATOR] PERMISSON")
      return message.channel.send(R)
    }
  
return new Promise((resolve, reject) => {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('YOU ARE NOT IN VOICE CHANNEL');
        voiceChannel.join()
        message.react("758954303917916201")
     .then(connection => resolve(connection)).catch(err => reject(err));
  
  })

}
};
